import json
import asyncio
from typing import AsyncGenerator
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from app.rag.llm_factory import get_llm_provider
from app.schemas.chat import ChatRequest, ChatResponse
from app.services.chat.conversation_service import ConversationService
from app.services.chat.memory import memory_service
from app.services.chat.intent_parser import ChatIntent
from app.services.chat.follow_up import FollowUpGenerator
from app.schemas.rag import RAGQueryRequest
from app.core.logging import logger

class StreamingService:
    """
    Handles Server-Sent Events (SSE) streaming for the chat interface.
    Reuses logic from ConversationService but yields tokens asynchronously.
    """
    def __init__(self):
        self.conv_service = ConversationService()
        self.llm = get_llm_provider()

    async def stream_chat(self, request: ChatRequest) -> AsyncGenerator[str, None]:
        session_id = request.session_id
        
        # Fast path active property
        if request.property_id:
            memory_service.set_active_property(session_id, request.property_id)
            
        active_prop = memory_service.get_active_property(session_id)
        
        intent, filters = await self.conv_service.intent_parser.parse_intent(request.question, has_active_property=bool(active_prop))
        
        memory_service.add_message(session_id, "user", request.question)
        history = memory_service.get_history(session_id)
        chat_history_str = "\n".join([f"{msg.role}: {msg.content}" for msg in history[:-1]])

        citations = []
        follow_ups = []
        context_str = ""

        # Setup context similar to conversation service
        if intent == ChatIntent.PROPERTY_SEARCH:
            # We don't stream search natively easily without an agent, we just fetch it and stream the explanation
            try:
                collection = self.conv_service.collection_manager.get_collection("properties")
                valid_filters = {k: v for k, v in filters.items() if v}
                where_clause = valid_filters if valid_filters else None
                results = await asyncio.to_thread(collection.get, where=where_clause, limit=10) if collection else {"metadatas": []}
                
                properties_found = results.get("metadatas", [])
                context_str = f"Evidence (Search Results): {json.dumps(properties_found, indent=2)}"
                citations.append({"source": "Property Search Query", "filters": valid_filters, "results_count": len(properties_found)})
                follow_ups = ["Tell me more about the first property.", "Can we adjust the search criteria?"]
            except Exception as e:
                logger.error(f"Search failed during stream: {e}")
        else:
            if active_prop:
                report = await self.conv_service._get_report(active_prop)
                context_str += f"\n--- PROPERTY INTELLIGENCE REPORT FOR {active_prop} ---\n"
                context_str += report.model_dump_json(indent=2)
                follow_ups = FollowUpGenerator.generate(report)
                citations.append({"source": "Property Intelligence Engine", "property_id": active_prop})

        prompt = ChatPromptTemplate.from_messages([
            ("system", "You are the InfoLand AI Property Assistant. Be concise, helpful, and grounded in the provided Context."),
            ("user", "History:\n{history}\n\nContext:\n{context}\n\nQuestion: {question}")
        ])
        
        chain = prompt | self.llm | StrOutputParser()
        
        full_answer = ""
        
        try:
            # Stream tokens
            async for chunk in chain.astream({"history": chat_history_str, "context": context_str, "question": request.question}):
                full_answer += chunk
                yield f"data: {json.dumps({'chunk': chunk})}\n\n"
                
            # Stream completion with metadata
            completion_data = {
                "chunk": "",
                "is_complete": True,
                "citations": citations,
                "suggested_follow_ups": follow_ups,
                "property_id": active_prop
            }
            yield f"data: {json.dumps(completion_data)}\n\n"
            
            # Save to memory
            memory_service.add_message(session_id, "assistant", full_answer)
            
        except asyncio.CancelledError:
            logger.warning(f"Client disconnected during streaming for session {session_id}")
            # Save whatever we generated so far
            memory_service.add_message(session_id, "assistant", full_answer)
            raise
        except Exception as e:
            logger.error(f"Streaming error: {e}")
            yield f"data: {json.dumps({'error': str(e)})}\n\n"

import asyncio
import json
from typing import Dict, Any, List, Optional
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from app.rag.llm_factory import get_llm_provider
from app.schemas.chat import ChatRequest, ChatResponse, ChatMessage
from app.services.chat.memory import memory_service
from app.services.chat.intent_parser import IntentParser, ChatIntent
from app.services.chat.follow_up import FollowUpGenerator
from app.services.intelligence.report_generator import ReportGeneratorService
from app.services.rag_service import RAGService
from app.schemas.rag import RAGQueryRequest
from app.storage.vector_store.collections import get_collection_manager
from app.core.logging import logger

class ConversationService:
    """
    Orchestrates the conversational assistant logic.
    Maintains memory, handles context switching, routing, and explainability.
    """
    def __init__(self):
        self.intent_parser = IntentParser()
        self.report_generator = ReportGeneratorService()
        self.rag_service = RAGService()
        self.llm = get_llm_provider()
        self.collection_manager = get_collection_manager()
        
        # Cache for deterministic reports to avoid regenerating within the same session
        self._report_cache = {}

    async def _get_report(self, property_id: str):
        if property_id not in self._report_cache:
            # Generate deterministically without LLM summary overhead
            self._report_cache[property_id] = await self.report_generator.generate_report(
                property_id, 
                include_timeline=True, 
                include_recommendations=True, 
                include_ai_summary=False
            )
        return self._report_cache[property_id]

    async def _handle_property_search(self, filters: Dict[str, Any], question: str) -> ChatResponse:
        logger.info(f"Executing deterministic property search with filters: {filters}")
        collection = self.collection_manager.get_collection("properties")
        
        # Clean up empty filters
        valid_filters = {k: v for k, v in filters.items() if v}
        
        if not collection:
            results = {"metadatas": []}
        else:
            try:
                # Query ChromaDB directly for deterministic match
                where_clause = valid_filters if valid_filters else None
                results = await asyncio.to_thread(
                    collection.get,
                    where=where_clause,
                    limit=10
                )
            except Exception as e:
                logger.error(f"Search failed: {e}")
                results = {"metadatas": []}
                
        properties_found = results.get("metadatas", [])
        evidence_str = json.dumps(properties_found, indent=2)
        
        prompt = ChatPromptTemplate.from_messages([
            ("system", "You are an AI Property Assistant. Explain the search results to the user based on the evidence. Do not fabricate properties. Keep it concise."),
            ("user", "Question: {question}\n\nEvidence:\n{evidence}")
        ])
        
        chain = prompt | self.llm | StrOutputParser()
        answer = await chain.ainvoke({"question": question, "evidence": evidence_str})
        
        citations = [{"source": "Property Search Query", "filters": valid_filters, "results_count": len(properties_found)}]
        
        return ChatResponse(
            session_id="", # filled by caller
            answer=answer,
            citations=citations,
            suggested_follow_ups=["Tell me more about the first property.", "Can we adjust the search criteria?"],
            property_id=None
        )

    async def process_message(self, request: ChatRequest) -> ChatResponse:
        session_id = request.session_id
        
        # Update active property if explicitly provided
        if request.property_id:
            memory_service.set_active_property(session_id, request.property_id)
            
        active_prop = memory_service.get_active_property(session_id)
        
        # Parse intent
        intent, filters = await self.intent_parser.parse_intent(request.question, has_active_property=bool(active_prop))
        
        # Add user message to history
        memory_service.add_message(session_id, "user", request.question)
        history = memory_service.get_history(session_id)
        
        # Format history for LLM
        chat_history_str = "\n".join([f"{msg.role}: {msg.content}" for msg in history[:-1]])

        if intent == ChatIntent.PROPERTY_SEARCH:
            response = await self._handle_property_search(filters, request.question)
            response.session_id = session_id
            memory_service.add_message(session_id, "assistant", response.answer)
            return response
            
        # For Specific Property or general knowledge, we use Context
        context_str = ""
        citations = []
        follow_ups = []
        
        if active_prop and (intent == ChatIntent.SPECIFIC_PROPERTY or intent == ChatIntent.GENERAL_KNOWLEDGE):
            # Fetch deterministic report
            report = await self._get_report(active_prop)
            context_str += f"\n--- PROPERTY INTELLIGENCE REPORT FOR {active_prop} ---\n"
            context_str += report.model_dump_json(indent=2)
            
            # Use deterministic follow-ups
            follow_ups = FollowUpGenerator.generate(report)
            citations.append({"source": "Property Intelligence Engine", "property_id": active_prop})
            
            # If the user asks a deep question that might need RAG
            # E.g. "What does the sale deed say about boundaries?"
            if "say about" in request.question.lower() or "document" in request.question.lower():
                try:
                    rag_req = RAGQueryRequest(query=request.question, collection_name="documents")
                    rag_res = await self.rag_service.generate_response(rag_req)
                    context_str += f"\n--- ADDITIONAL RAG CONTEXT ---\n{rag_res.answer}"
                    citations.extend(rag_res.citations)
                except Exception as e:
                    logger.error(f"Optional RAG call failed: {e}")

        # Assemble prompt
        prompt = ChatPromptTemplate.from_messages([
            ("system", "You are the InfoLand AI Property Assistant.\n"
                       "You are a helpful, professional real estate advisor.\n"
                       "You MUST base your answers strictly on the provided Context and Conversation History.\n"
                       "If explaining a risk score or verification status, cite the exact rules or missing documents from the Context.\n"
                       "NEVER fabricate or recalculate scores. Do not pretend to have external knowledge.\n\n"
                       "--- CONVERSATION HISTORY ---\n{history}\n\n"
                       "--- CONTEXT ---\n{context}"),
            ("user", "{question}")
        ])
        
        chain = prompt | self.llm | StrOutputParser()
        answer = await chain.ainvoke({"history": chat_history_str, "context": context_str, "question": request.question})
        
        memory_service.add_message(session_id, "assistant", answer)
        
        return ChatResponse(
            session_id=session_id,
            answer=answer,
            citations=citations,
            suggested_follow_ups=follow_ups,
            property_id=active_prop
        )

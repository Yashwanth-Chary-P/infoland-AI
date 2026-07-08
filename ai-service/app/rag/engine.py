from typing import Dict, Any, Optional
from langchain_core.runnables import RunnablePassthrough
from langchain_core.output_parsers import StrOutputParser
from app.rag.retriever import InfoLandRetriever
from app.rag.context_builder import ContextBuilder
from app.rag.prompts import get_rag_prompt_template
from app.rag.llm_factory import get_llm_provider
from app.rag.validator import ResponseValidator
from app.rag.citations import CitationEngine
from app.core.logging import logger

class RAGEngine:
    """
    Orchestrates the entire RAG pipeline:
    Query -> Retrieve -> Context Builder -> Prompt -> LLM -> Validator -> Citation -> Output
    """
    
    def __init__(self):
        # The LLM provider is initialized here. It will throw if configuration is invalid.
        self.llm = get_llm_provider()
        self.prompt = get_rag_prompt_template()

    async def generate_answer(self, query: str, collection_name: str, top_k: int = 3, filters: Optional[Dict[str, Any]] = None, provider: Optional[str] = None, model: Optional[str] = None) -> Dict[str, Any]:
        """
        Executes the RAG pipeline.
        Returns the answer, citations, and processed docs.
        """
        logger.info(f"Executing RAG pipeline for query: '{query}' in '{collection_name}' (Provider: {provider}, Model: {model})")
        
        # 1. Retrieve Context
        retriever = InfoLandRetriever(collection_name=collection_name, top_k=top_k, filter_metadata=filters)
        documents = await retriever.ainvoke(query)
        logger.info(f"Retriever returned {len(documents)} documents.")
        
        # 2. Build Context String
        context_str = ContextBuilder.build(documents)
        
        # 3. Formulate Pipeline dynamically
        # Only use the LLM if we have context. 
        if not ResponseValidator.validate_context(documents):
            # Short-circuit logic handles this gracefully by returning fallback.
            raw_response = ResponseValidator.INSUFFICIENT_CONTEXT_MSG
        else:
            llm = get_llm_provider(provider, model)
            chain = self.prompt | llm | StrOutputParser()
            
            logger.info("Calling LLM with structured context.")
            try:
                raw_response = await chain.ainvoke({"context": context_str, "question": query})
            except Exception as e:
                logger.error(f"LLM Generation Failed: {e}")
                # Fallback on LLM failure
                raw_response = ResponseValidator.INSUFFICIENT_CONTEXT_MSG
            
        logger.debug(f"Raw LLM Response: {raw_response}")
        
        # 4. Validate Response
        validated_response = ResponseValidator.validate_llm_response(raw_response, len(documents))
        
        # 5. Extract Citations
        citations = CitationEngine.generate_citations(documents)
        
        # If the validator overwrote it to "insufficient info", clear citations.
        if validated_response == ResponseValidator.INSUFFICIENT_CONTEXT_MSG:
            citations = []
            
        return {
            "answer": validated_response,
            "citations": citations,
            "retrieved_documents_count": len(documents)
        }

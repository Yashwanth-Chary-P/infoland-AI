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

    async def generate_answer(
        self, 
        query: str, 
        collection_name: str = "properties", 
        top_k: int = 5, 
        filters: Optional[Dict[str, Any]] = None
    ) -> Dict[str, Any]:
        """
        Executes the RAG pipeline end-to-end.
        """
        logger.info(f"RAGEngine executing for query: '{query}' in collection '{collection_name}'")
        
        # 1. Retrieve
        retriever = InfoLandRetriever(
            collection_name=collection_name, 
            top_k=top_k, 
            filter_metadata=filters
        )
        
        # In LangChain, we can invoke the retriever asynchronously
        documents = await retriever.ainvoke(query)
        
        # 2. Pre-Validate Context
        if not ResponseValidator.validate_context(documents):
            return {
                "answer": ResponseValidator.INSUFFICIENT_CONTEXT_MSG,
                "citations": [],
                "retrieved_documents_count": 0
            }
            
        # 3. Build Context
        context_str = ContextBuilder.build(documents)
        
        # 4. Generate Citations
        citations = CitationEngine.generate_citations(documents)
        
        # 5. Build Chain (Prompt -> LLM -> Parser)
        # Using LCEL (LangChain Expression Language)
        chain = self.prompt | self.llm | StrOutputParser()
        
        # 6. Execute Chain
        try:
            logger.info("Calling LLM with structured context.")
            raw_response = await chain.ainvoke({"context": context_str, "question": query})
        except Exception as e:
            logger.error(f"LLM Generation failed: {e}")
            raise RuntimeError(f"LLM Provider Error: {str(e)}")
            
        # 7. Post-Validate Response
        final_answer = ResponseValidator.validate_llm_response(raw_response)
        
        # If the validator overwrote it to "insufficient info", clear citations.
        if final_answer == ResponseValidator.INSUFFICIENT_CONTEXT_MSG:
            citations = []
            
        return {
            "answer": final_answer,
            "citations": citations,
            "retrieved_documents_count": len(documents)
        }

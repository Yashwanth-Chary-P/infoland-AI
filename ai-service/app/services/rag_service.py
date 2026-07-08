import time
from fastapi import HTTPException
from app.rag.engine import RAGEngine
from app.schemas.rag import RAGQueryRequest, RAGQueryResponse
from app.core.logging import logger

class RAGService:
    """
    Service layer interacting with the RAG Engine.
    Handles timing, error standardization, and execution.
    """
    
    def __init__(self):
        # Initialize engine lazily or directly. We do it directly to fail fast if LLM config is bad.
        try:
            self.engine = RAGEngine()
        except Exception as e:
            logger.error(f"Failed to initialize RAG Engine: {e}")
            raise RuntimeError("RAG Engine Initialization Failed")

    async def generate_response(self, request: RAGQueryRequest) -> RAGQueryResponse:
        """
        Executes the query and returns the standardized response model.
        """
        start_time = time.time()
        
        try:
            result = await self.engine.generate_answer(
                query=request.query,
                collection_name=request.collection_name,
                top_k=request.top_k,
                filters=request.filters,
                provider=request.provider,
                model=request.model
            )
            
            processing_time = round(time.time() - start_time, 3)
            logger.info(f"RAG query completed in {processing_time}s.")
            
            return RAGQueryResponse(
                answer=result["answer"],
                citations=result["citations"],
                processing_time=processing_time,
                retrieved_documents_count=result["retrieved_documents_count"]
            )
            
        except Exception as e:
            logger.error(f"RAG Service encountered an error: {str(e)}")
            # Surface a 500 error for LLM failures or system issues
            raise HTTPException(status_code=500, detail=str(e))

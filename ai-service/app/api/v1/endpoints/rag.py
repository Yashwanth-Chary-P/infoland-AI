from fastapi import APIRouter, Depends, HTTPException
from app.schemas.rag import RAGQueryRequest, RAGQueryResponse
from app.services.rag_service import RAGService
from app.core.logging import logger

router = APIRouter()

def get_rag_service() -> RAGService:
    """
    Dependency injection for RAGService.
    """
    try:
        return RAGService()
    except Exception as e:
        logger.error(f"Failed to inject RAGService: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error: AI Engine Unavailable")


@router.post("/ask", response_model=RAGQueryResponse)
async def ask_question(
    request: RAGQueryRequest,
    rag_service: RAGService = Depends(get_rag_service)
):
    """
    Ask a question against the InfoLand AI knowledge base.
    """
    logger.info(f"Received RAG query: '{request.query}' for collection '{request.collection_name}'")
    
    # Execution
    response = await rag_service.generate_response(request)
    
    return response

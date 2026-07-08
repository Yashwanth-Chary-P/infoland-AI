from fastapi import APIRouter, Depends, HTTPException
from app.schemas.rag import RAGQueryRequest, RAGQueryResponse
from app.services.rag_service import RAGService
from app.core.logging import logger

router = APIRouter()

from functools import lru_cache

@lru_cache()
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

from pydantic import BaseModel
from typing import List

class ProviderResponse(BaseModel):
    default_provider: str
    available_providers: List[str]
    current_model: str

@router.get("/providers", response_model=ProviderResponse)
async def get_providers():
    """
    Returns the currently configured LLM provider and available options.
    """
    from app.core.config import settings
    return ProviderResponse(
        default_provider=settings.llm_provider,
        available_providers=["ollama", "groq", "openai", "anthropic"],
        current_model=settings.llm_model
    )

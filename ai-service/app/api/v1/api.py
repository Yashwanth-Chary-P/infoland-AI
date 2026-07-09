from fastapi import APIRouter
from app.api.v1.endpoints import health, rag, intelligence, chat

api_router = APIRouter()

api_router.include_router(health.router, prefix="", tags=["health"])
api_router.include_router(rag.router, prefix="/rag", tags=["rag"])
api_router.include_router(intelligence.router, prefix="/properties", tags=["intelligence"])
api_router.include_router(chat.router, prefix="/chat", tags=["chat"])

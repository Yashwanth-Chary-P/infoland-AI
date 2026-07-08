from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.core.logging import logger
from app.core.exceptions import (
    InfoLandException,
    global_exception_handler,
    infoland_exception_handler,
)
from app.api.v1.api import api_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    logger.info(f"Starting {settings.app_name} v{settings.app_version}")
    logger.info(f"Debug Mode: {settings.debug}")
    
    # Warm up expensive dependencies
    from app.services.embeddings.factory import get_embedding_provider
    from app.storage.vector_store.collections import get_collection_manager
    from app.rag.llm_factory import get_llm_provider
    from app.storage.vector_store.chroma import chroma_client
    
    logger.info("Initializing cached singletons for warmup...")
    get_embedding_provider()
    get_collection_manager()
    get_llm_provider()
    
    from app.storage.vector_store.search import get_search_service
    get_search_service()
    
    from app.api.v1.endpoints.rag import get_rag_service
    get_rag_service()
    
    logger.info("Application startup complete.")
    yield
    # Shutdown
    logger.info("Application shutting down.")


# Initialize FastAPI application
app = FastAPI(
    title=settings.app_name,
    version=settings.app_version,
    description="InfoLand AI Service - Intelligence & Verification",
    docs_url="/docs",
    redoc_url="/redoc",
    lifespan=lifespan,
)

# CORS Middleware (Configure appropriately for production)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Exception Handlers
app.add_exception_handler(Exception, global_exception_handler)
app.add_exception_handler(InfoLandException, infoland_exception_handler)

# Include API Routers
app.include_router(api_router, prefix="/api/v1")


@app.get("/", tags=["root"])
async def root():
    """Root endpoint for the API."""
    return {
        "service": settings.app_name,
        "version": settings.app_version,
        "status": "operational",
    }

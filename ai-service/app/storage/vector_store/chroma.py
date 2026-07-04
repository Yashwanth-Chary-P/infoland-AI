import chromadb
from chromadb.config import Settings
from app.core.config import settings
from app.core.logging import logger


def get_chroma_client() -> chromadb.PersistentClient:
    """Returns a persistent ChromaDB client."""
    logger.info(
        f"Initializing ChromaDB PersistentClient at {settings.chroma_persist_directory}"
    )
    client = chromadb.PersistentClient(
        path=settings.chroma_persist_directory,
        settings=Settings(anonymized_telemetry=False),
    )
    return client


chroma_client = get_chroma_client()

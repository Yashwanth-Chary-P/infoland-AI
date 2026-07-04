from typing import List
from sentence_transformers import SentenceTransformer
import asyncio
from app.services.embeddings.base import EmbeddingProvider
from app.core.config import settings
from app.core.logging import logger


class HuggingFaceEmbeddingProvider(EmbeddingProvider):
    """
    Local embedding provider using sentence-transformers.
    Runs locally, fast for development.
    """

    def __init__(self, model_name: str = None):
        self.model_name = model_name or settings.embedding_model
        logger.info(
            f"Initializing HuggingFace Embedding Provider with model: {self.model_name}"
        )
        self.model = SentenceTransformer(self.model_name)

    async def embed_query(self, text: str) -> List[float]:
        # Offload sync CPU-bound task to thread
        embedding = await asyncio.to_thread(
            self.model.encode, text, convert_to_numpy=True
        )
        return embedding.tolist()

    async def embed_documents(self, texts: List[str]) -> List[List[float]]:
        embeddings = await asyncio.to_thread(
            self.model.encode, texts, convert_to_numpy=True
        )
        return embeddings.tolist()

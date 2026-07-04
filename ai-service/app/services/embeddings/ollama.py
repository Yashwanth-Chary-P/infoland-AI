import httpx
from typing import List
from app.services.embeddings.base import EmbeddingProvider
from app.core.config import settings
from app.core.logging import logger


class OllamaEmbeddingProvider(EmbeddingProvider):
    """
    Local embedding provider using Ollama HTTP API.
    """

    def __init__(self, model_name: str = None):
        self.model_name = model_name or settings.embedding_model
        self.base_url = settings.ollama_base_url.rstrip("/")
        logger.info(
            f"Initializing Ollama Embedding Provider with model: {self.model_name}"
        )

    async def embed_query(self, text: str) -> List[float]:
        url = f"{self.base_url}/api/embeddings"
        payload = {"model": self.model_name, "prompt": text}
        async with httpx.AsyncClient() as client:
            response = await client.post(url, json=payload, timeout=30.0)
            response.raise_for_status()
            data = response.json()
            return data["embedding"]

    async def embed_documents(self, texts: List[str]) -> List[List[float]]:
        embeddings = []
        for text in texts:
            embeddings.append(await self.embed_query(text))
        return embeddings

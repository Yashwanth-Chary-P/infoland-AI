from typing import List
from openai import AsyncOpenAI
from app.services.embeddings.base import EmbeddingProvider
from app.core.config import settings
from app.core.logging import logger


class OpenAIEmbeddingProvider(EmbeddingProvider):
    """
    Embedding provider using OpenAI's API.
    """

    def __init__(self, model_name: str = None):
        self.model_name = model_name or settings.embedding_model
        self.api_key = settings.openai_api_key
        if not self.api_key:
            logger.warning(
                "OpenAI API Key is missing. Provider will fail on execution."
            )
        self.client = AsyncOpenAI(api_key=self.api_key)

    async def embed_query(self, text: str) -> List[float]:
        response = await self.client.embeddings.create(
            input=[text], model=self.model_name
        )
        return response.data[0].embedding

    async def embed_documents(self, texts: List[str]) -> List[List[float]]:
        response = await self.client.embeddings.create(
            input=texts, model=self.model_name
        )
        return [data.embedding for data in response.data]

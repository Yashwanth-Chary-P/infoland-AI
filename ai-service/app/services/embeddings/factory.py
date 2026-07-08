from app.core.config import settings
from app.core.logging import logger
from app.services.embeddings.base import EmbeddingProvider
from app.services.embeddings.huggingface import HuggingFaceEmbeddingProvider
from app.services.embeddings.openai import OpenAIEmbeddingProvider
from app.services.embeddings.ollama import OllamaEmbeddingProvider


from functools import lru_cache

@lru_cache()
def get_embedding_provider() -> EmbeddingProvider:
    """
    Factory method to retrieve the configured embedding provider.
    Changes here do not affect application code.
    """
    provider = settings.embedding_provider.lower()

    if provider == "huggingface":
        return HuggingFaceEmbeddingProvider()
    elif provider == "openai":
        return OpenAIEmbeddingProvider()
    elif provider == "ollama":
        return OllamaEmbeddingProvider()
    else:
        logger.error(f"Unknown embedding provider configured: {provider}")
        raise ValueError(f"Unsupported embedding provider: {provider}")

from abc import ABC, abstractmethod
from typing import List


class EmbeddingProvider(ABC):
    """Base interface for all embedding providers."""

    @abstractmethod
    async def embed_query(self, text: str) -> List[float]:
        """Generate an embedding for a single search query."""
        pass

    @abstractmethod
    async def embed_documents(self, texts: List[str]) -> List[List[float]]:
        """Generate embeddings for a batch of document chunks."""
        pass

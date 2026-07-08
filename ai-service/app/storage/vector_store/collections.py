from typing import Optional
from chromadb import Collection
from app.core.config import settings
from app.core.logging import logger
from app.storage.vector_store.chroma import chroma_client


class CollectionManager:
    """Manages the lifecycle of ChromaDB collections."""

    def __init__(self):
        self.client = chroma_client
        self.required_collections = settings.collections
        self._ensure_collections_exist()

    def _ensure_collections_exist(self):
        """Creates required collections if they do not exist."""
        existing_names = [c.name for c in self.client.list_collections()]
        for name in self.required_collections:
            if name not in existing_names:
                logger.info(f"Creating missing collection: {name}")
                self.client.create_collection(
                    name=name, metadata={"description": f"Collection for {name}"}
                )

    def get_collection(self, name: str) -> Optional[Collection]:
        """Retrieves a specific collection by name."""
        try:
            return self.client.get_collection(name=name)
        except Exception as e:
            logger.error(f"Failed to get collection {name}: {e}")
            return None

    def delete_collection(self, name: str):
        """Deletes a collection."""
        try:
            self.client.delete_collection(name=name)
            logger.info(f"Deleted collection: {name}")
        except Exception as e:
            logger.error(f"Failed to delete collection {name}: {e}")

    def recreate_collection(self, name: str) -> Optional[Collection]:
        """Deletes and recreates a collection. Used for full rebuilds."""
        self.delete_collection(name)
        logger.info(f"Recreating collection: {name}")
        return self.client.create_collection(name=name)

from functools import lru_cache

@lru_cache()
def get_collection_manager() -> CollectionManager:
    """Returns a cached singleton of the CollectionManager."""
    return CollectionManager()

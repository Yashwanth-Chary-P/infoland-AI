from typing import List, Dict, Any
from app.storage.vector_store.collections import CollectionManager
from app.services.embeddings.factory import get_embedding_provider
from app.core.logging import logger


class SemanticSearchService:
    """Performs semantic similarity search over collections without LLM generation."""

    def __init__(self):
        self.collection_manager = CollectionManager()
        self.embedding_provider = get_embedding_provider()

    async def search(
        self,
        collection_name: str,
        query: str,
        top_k: int = 5,
        filter_metadata: Dict[str, Any] = None,
    ) -> List[Dict[str, Any]]:
        """
        Retrieves the most semantically relevant chunks for a given query.
        """
        collection = self.collection_manager.get_collection(collection_name)
        if not collection:
            raise ValueError(f"Collection {collection_name} does not exist.")

        logger.info(f"Generating embedding for query: '{query}'")
        query_embedding = await self.embedding_provider.embed_query(query)

        logger.info(
            f"Searching collection '{collection_name}' for top {top_k} results."
        )
        results = collection.query(
            query_embeddings=[query_embedding], n_results=top_k, where=filter_metadata
        )

        formatted_results = []
        if results and results["ids"] and len(results["ids"][0]) > 0:
            for i in range(len(results["ids"][0])):
                formatted_results.append(
                    {
                        "id": results["ids"][0][i],
                        "content": results["documents"][0][i],
                        "metadata": results["metadatas"][0][i],
                        "distance": results["distances"][0][i]
                        if results["distances"]
                        else None,
                    }
                )

        return formatted_results

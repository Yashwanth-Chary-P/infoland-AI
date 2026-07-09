import asyncio
from typing import Dict, Any, List
from app.storage.vector_store.collections import get_collection_manager
from app.utils.metadata_utils import MetadataParser
from app.core.logging import logger
from app.core.config import settings

class IntelligenceRetrievalService:
    """
    Retrieves all available context chunks for a given property across all collections.
    Parses the ChromaDB metadata strings back into native Python dictionaries safely.
    """
    
    def __init__(self):
        self.collection_manager = get_collection_manager()
        self.parser = MetadataParser()

    async def fetch_collection_data(self, collection_name: str, property_id: str) -> List[Dict[str, Any]]:
        """
        Fetches all documents for a property from a specific collection deterministically.
        """
        collection = self.collection_manager.get_collection(collection_name)
        if not collection:
            return []

        # Use deterministic get instead of semantic query
        # Since this might block, we wrap it in a thread if needed, but collection.get is very fast.
        try:
            results = await asyncio.to_thread(
                collection.get,
                where={"property_id": property_id}
            )
        except Exception as e:
            logger.error(f"Error fetching from {collection_name} for {property_id}: {e}")
            return []
            
        parsed_results = []
        if results and results.get("metadatas"):
            for i, metadata in enumerate(results["metadatas"]):
                # Parse stringified metadata back to dict/list
                parsed_meta = self.parser.parse(metadata)
                
                # Attach content for LLM grounding
                parsed_meta["_raw_content"] = results["documents"][i] if results.get("documents") else ""
                parsed_results.append(parsed_meta)
                
        return parsed_results

    async def get_all_property_data(self, property_id: str) -> Dict[str, List[Dict[str, Any]]]:
        """
        Concurrently fetches data from all collections for the property.
        """
        collections = settings.collections
        
        # Concurrently fetch from all collections
        tasks = [self.fetch_collection_data(c, property_id) for c in collections]
        results = await asyncio.gather(*tasks, return_exceptions=True)
        
        aggregated_data = {}
        for idx, col in enumerate(collections):
            res = results[idx]
            if isinstance(res, Exception):
                logger.error(f"Failed to aggregate {col} for {property_id}: {res}")
                aggregated_data[col] = []
            else:
                aggregated_data[col] = res
                
        return aggregated_data

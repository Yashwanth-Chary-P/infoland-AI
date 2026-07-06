import asyncio
from typing import List, Dict, Any, Optional
from langchain_core.retrievers import BaseRetriever
from langchain_core.callbacks import CallbackManagerForRetrieverRun, AsyncCallbackManagerForRetrieverRun
from langchain_core.documents import Document
from pydantic import Field
from app.storage.vector_store.search import SemanticSearchService
from app.core.logging import logger


class InfoLandRetriever(BaseRetriever):
    """
    A LangChain-compatible Retriever that wraps the existing
    SemanticSearchService from Module 02.
    """
    
    collection_name: str = "properties"
    top_k: int = 5
    filter_metadata: Optional[Dict[str, Any]] = None
    
    # We instantiate the service once. Pydantic requires fields, but this is an internal service.
    # Exclude it from the Pydantic field validation.
    search_service: SemanticSearchService = Field(default_factory=SemanticSearchService, exclude=True)

    def _get_relevant_documents(
        self, query: str, *, run_manager: CallbackManagerForRetrieverRun
    ) -> List[Document]:
        """
        Sync retrieval. Since the underlying service is async, we run it in a new event loop.
        However, LangChain prefers async when dealing with async underlying APIs.
        """
        loop = asyncio.get_event_loop()
        if loop.is_running():
            # In a running loop, we shouldn't block, but LangChain's sync caller might force it.
            # We'll raise an error or try to run it safely. Better to just rely on _aget_relevant_documents.
            import nest_asyncio
            nest_asyncio.apply()
        
        results = loop.run_until_complete(
            self.search_service.search(
                collection_name=self.collection_name,
                query=query,
                top_k=self.top_k,
                filter_metadata=self.filter_metadata
            )
        )
        return self._format_results(results)

    async def _aget_relevant_documents(
        self, query: str, *, run_manager: AsyncCallbackManagerForRetrieverRun
    ) -> List[Document]:
        """
        Async retrieval leveraging the SemanticSearchService.
        """
        logger.info(f"InfoLandRetriever: Retrieving top {self.top_k} for query: '{query}' in '{self.collection_name}'")
        try:
            results = await self.search_service.search(
                collection_name=self.collection_name,
                query=query,
                top_k=self.top_k,
                filter_metadata=self.filter_metadata
            )
            return self._format_results(results)
        except Exception as e:
            logger.error(f"Error during retrieval: {e}")
            # If collection doesn't exist or DB is down, return empty to be handled by Validator.
            return []

    def _format_results(self, raw_results: List[Dict[str, Any]]) -> List[Document]:
        """
        Converts raw dictionaries from SemanticSearchService into LangChain Documents.
        Preserves metadata exactly as retrieved.
        """
        documents = []
        for res in raw_results:
            metadata = res.get("metadata", {})
            metadata["_distance"] = res.get("distance")
            metadata["_chunk_id"] = res.get("id")
            
            doc = Document(
                page_content=res.get("content", ""),
                metadata=metadata
            )
            documents.append(doc)
            
        logger.info(f"Retriever built {len(documents)} LangChain Documents.")
        return documents

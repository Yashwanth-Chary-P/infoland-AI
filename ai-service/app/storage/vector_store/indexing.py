from typing import List, Dict
from app.services.data_resolver import DataSourceResolver
from app.services.chunking.document import Document
from app.services.chunking.normalizer import Normalizer
from app.services.chunking.chunker import ChunkBuilder
from app.services.chunking.metadata import MetadataExtractor
from app.services.embeddings.factory import get_embedding_provider
from app.storage.vector_store.collections import CollectionManager
from app.core.config import settings
from app.core.logging import logger
import asyncio


class IndexBuilder:
    """
    Orchestrates the ingestion pipeline:
    Loader -> Normalizer -> DocumentBuilder -> ChunkBuilder -> Embedder -> ChromaDB
    """

    def __init__(self):
        self.resolver = DataSourceResolver()
        self.chunk_builder = ChunkBuilder()
        self.embedding_provider = get_embedding_provider()
        self.collection_manager = CollectionManager()
        self.batch_size = settings.batch_size

    async def build_index(
        self, dataset_name: str, collection_name: str, document_type: str = "record"
    ):
        """Ingests a dataset into a ChromaDB collection."""
        collection = self.collection_manager.get_collection(collection_name)
        if not collection:
            logger.error(f"Collection {collection_name} not found.")
            return

        try:
            records = await self.resolver.get_dataset(dataset_name)
        except Exception as e:
            logger.error(f"Skipping indexing for {dataset_name}: {e}")
            return

        if isinstance(records, dict):
            records = [records]

        logger.info(
            f"Loaded {len(records)} records from {dataset_name}. Starting pipeline."
        )

        import uuid
        all_chunks = []
        for record in records:
            # Construct a robust, unique document ID based on whatever PK fields might exist
            pk = (
                record.get("id") or 
                record.get("event_id") or 
                record.get("loan_id") or 
                record.get("tax_id") or 
                record.get("document_id") or 
                record.get("owner_id")
            )
            prop = record.get("property_id", "GLOBAL")
            
            if pk:
                doc_id = f"{prop}_{pk}"
            else:
                doc_id = f"{prop}_{uuid.uuid4().hex[:8]}"
                
            content = Normalizer.normalize_record(record)
            doc = Document(id=doc_id, content=content, metadata=record)

            chunks = self.chunk_builder.chunk_document(doc)

            for chunk in chunks:
                chunk.metadata = MetadataExtractor.extract(
                    chunk, dataset_name, document_type
                )

            all_chunks.extend(chunks)

        logger.info(
            f"Generated {len(all_chunks)} chunks for {dataset_name}. Embedding in batches of {self.batch_size}."
        )

        for i in range(0, len(all_chunks), self.batch_size):
            batch = all_chunks[i : i + self.batch_size]
            texts = [c.content for c in batch]
            ids = [c.chunk_id for c in batch]
            metadatas = [c.metadata for c in batch]

            try:
                embeddings = await self.embedding_provider.embed_documents(texts)
                await asyncio.to_thread(
                    collection.upsert,
                    ids=ids,
                    documents=texts,
                    metadatas=metadatas,
                    embeddings=embeddings,
                )
                logger.debug(f"Upserted batch {i // self.batch_size + 1}")
            except Exception as e:
                logger.error(f"Failed to upsert batch starting at index {i}: {e}")

        logger.info(f"Finished indexing {dataset_name} into {collection_name}.")


class SynchronizationService:
    """Handles index synchronization (Full rebuilds)."""

    def __init__(self):
        self.index_builder = IndexBuilder()
        self.collection_manager = CollectionManager()

    async def full_rebuild(self, mappings: List[Dict[str, str]]):
        """
        Rebuilds collections from scratch based on a list of mappings.
        mappings: [{"dataset_name": "...", "collection_name": "...", "document_type": "..."}]
        """
        recreated = set()
        for mapping in mappings:
            col = mapping["collection_name"]
            if col not in recreated:
                self.collection_manager.recreate_collection(col)
                recreated.add(col)

        for mapping in mappings:
            await self.index_builder.build_index(
                dataset_name=mapping["dataset_name"],
                collection_name=mapping["collection_name"],
                document_type=mapping.get("document_type", "record"),
            )

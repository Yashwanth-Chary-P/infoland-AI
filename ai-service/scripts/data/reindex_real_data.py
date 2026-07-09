import asyncio
from app.storage.vector_store.indexing import SynchronizationService

async def reindex():
    mappings = [
        {"dataset_name": "documents/documents_all", "collection_name": "documents"}
    ]
    sync = SynchronizationService()
    print("Rebuilding index for missing collections...")
    await sync.full_rebuild(mappings)
    print("Done rebuilding index.")

if __name__ == "__main__":
    asyncio.run(reindex())

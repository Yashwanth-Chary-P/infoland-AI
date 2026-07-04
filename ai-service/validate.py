import asyncio
from app.storage.vector_store.chroma import chroma_client
from app.storage.vector_store.collections import CollectionManager
from app.services.embeddings.factory import get_embedding_provider
from app.services.chunking.document import Document
from app.services.chunking.chunker import ChunkBuilder
from app.services.chunking.metadata import MetadataExtractor
from app.core.config import settings

async def main():
    print("Validating Module 02 Components...")
    
    print("\n1. Testing ChromaDB Initialization")
    cm = CollectionManager()
    print("Collections available:", [c.name for c in cm.client.list_collections()])
    
    print("\n2. Testing Embedding Provider Initialization")
    provider = get_embedding_provider()
    print("Provider loaded:", type(provider).__name__)
    
    print("\n3. Testing Chunking Logic")
    doc = Document(id="test_123", content="This is a test document. It is long enough to be chunked into multiple pieces depending on our chunk size configuration.")
    builder = ChunkBuilder(chunk_size=30, chunk_overlap=10)
    chunks = builder.chunk_document(doc)
    print("Number of chunks:", len(chunks))
    for i, chunk in enumerate(chunks):
        meta = MetadataExtractor.extract(chunk, dataset_name="test_dataset")
        print(f" Chunk {i}: '{chunk.content}' (Meta keys: {list(meta.keys())})")
    
    print("\nValidation complete!")

if __name__ == "__main__":
    asyncio.run(main())

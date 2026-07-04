import asyncio
import os
import chromadb
from app.storage.vector_store.indexing import IndexBuilder
from app.storage.vector_store.search import SemanticSearchService

async def main():
    print("\n--- STEP 5: Minimal ChromaDB Test ---")
    try:
        temp_dir = "./chroma_temp_test"
        client = chromadb.PersistentClient(path=temp_dir)
        collection = client.get_or_create_collection("test_collection")
        collection.upsert(
            ids=["doc1"],
            documents=["This is a test document about artificial intelligence."],
            metadatas=[{"source": "test"}]
        )
        results = collection.query(
            query_texts=["What is this document about?"],
            n_results=1
        )
        print("Minimal ChromaDB test successful. Results:", results['documents'])
    except Exception as e:
        print("Minimal ChromaDB test failed:", e)

    print("\n--- STEP 8: Verify IndexBuilder with real dataset ---")
    try:
        builder = IndexBuilder()
        # We use a small dataset to make indexing fast
        dataset_name = "synthetic_pois" 
        collection_name = "location"
        await builder.build_index(dataset_name, collection_name)
        print("IndexBuilder completed without exceptions.")
    except Exception as e:
        print("IndexBuilder failed:", e)

    print("\n--- STEP 9: Verify SemanticSearchService ---")
    try:
        search_service = SemanticSearchService()
        query = "hospital"
        results = await search_service.search(collection_name="location", query=query, top_k=2)
        print(f"Search results for '{query}':")
        for res in results:
            print(f" - ID: {res['id']}")
            print(f"   Content snippet: {res['content'][:100]}...")
    except Exception as e:
        print("SemanticSearchService failed:", e)

if __name__ == "__main__":
    asyncio.run(main())

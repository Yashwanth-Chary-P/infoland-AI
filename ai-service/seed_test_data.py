from app.storage.vector_store.collections import get_collection_manager
from app.storage.vector_store.search import get_search_service

def seed_db():
    print("Seeding test data into ChromaDB...")
    mgr = get_collection_manager()
    collection = mgr.get_collection("properties")
    
    # Check if empty
    count = collection.count()
    if count > 0:
        print(f"Collection already has {count} items.")
    else:
        # Seed test items
        collection.add(
            ids=["doc1", "doc2", "doc3", "doc4"],
            documents=[
                "City Care Hospital is a premier healthcare facility located in Kokapet. It has 500 beds.",
                "Kokapet is a rapidly developing suburb in Hyderabad. It is known for IT parks and hospitals.",
                "The Global Edge School is a well-known international school located in Mokila.",
                "Mokila is a residential suburb offering villas and plots, close to major schools."
            ],
            metadatas=[
                {"property_id": "P001", "dataset": "amenities", "source_file": "city_care.json"},
                {"property_id": "P002", "dataset": "location", "source_file": "kokapet.json"},
                {"property_id": "P003", "dataset": "amenities", "source_file": "global_edge.json"},
                {"property_id": "P004", "dataset": "location", "source_file": "mokila.json"}
            ]
        )
        print("Data seeded.")

if __name__ == "__main__":
    seed_db()

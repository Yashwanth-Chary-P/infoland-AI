import asyncio
from app.storage.vector_store.collections import get_collection_manager

def debug_chroma():
    cm = get_collection_manager()
    col = cm.get_collection("properties")
    
    if not col:
        print("Collection 'properties' not found.")
        return
        
    print(f"Total documents in 'properties' collection: {col.count()}")
    
    # Get just 2 items to inspect metadata
    results = col.get(limit=2)
    
    if results and results.get("metadatas"):
        for i, meta in enumerate(results["metadatas"]):
            print(f"\nDocument {i+1} Metadata Keys: {list(meta.keys())}")
            if "property_id" in meta:
                print(f"  property_id = {meta['property_id']}")
            elif "id" in meta:
                print(f"  id = {meta['id']}")
            else:
                print("  No property_id or id found.")
            
            print(f"  Full metadata:\n{meta}")

if __name__ == "__main__":
    debug_chroma()

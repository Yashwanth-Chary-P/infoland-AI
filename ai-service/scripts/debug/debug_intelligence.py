import asyncio
from app.services.intelligence.retrieval import IntelligenceRetrievalService
from app.services.intelligence.report_generator import ReportGeneratorService
from app.core.config import settings

async def debug():
    property_id = "PROP-KOK-000001"
    print(f"--- DEBUGGING PROPERTY: {property_id} ---")
    
    # 1. Check Retrieval
    retrieval = IntelligenceRetrievalService()
    print("\n[STEP 1] Fetching across all collections...")
    
    collections = settings.collections
    print(f"Collections configured: {collections}")
    
    data_map = await retrieval.get_all_property_data(property_id)
    
    for col in collections:
        docs = data_map.get(col, [])
        print(f"Collection '{col}': Retrieved {len(docs)} documents.")
        if docs:
            print(f"  Sample metadata keys for first doc: {list(docs[0].keys())}")
            # check property id in metadata
            print(f"  property_id in metadata: {docs[0].get('property_id')}")
            # check the actual parsed metadata types
            print(f"  Sample metadata dict preview: {{k: type(v).__name__ for k, v in docs[0].items()}}")
            for k, v in docs[0].items():
                if k != "_raw_content":
                    print(f"    {k}: {type(v).__name__}")
    
    # Check if we have ANY data
    total_docs = sum(len(d) for d in data_map.values())
    print(f"\nTotal documents retrieved across all collections: {total_docs}")

if __name__ == "__main__":
    asyncio.run(debug())

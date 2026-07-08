import asyncio
import httpx
import json

async def main():
    queries = [
        "hospital",
        "school",
        "City Care Hospital",
        "commercial hub",
        "Kokapet",
        "Mokila",
        "Shankarpally",
        "property"
    ]
    
    url = "http://127.0.0.1:8000/api/v1/rag/query"
    
    async with httpx.AsyncClient(timeout=60.0) as client:
        for q in queries:
            print(f"\n{'='*50}\nQUERY: {q}\n{'='*50}")
            req = {
                "query": q,
                "collection_name": "location",
                "top_k": 3
            }
            try:
                # Based on the user's uvicorn logs, the endpoint is likely available. 
                # Note: We are using "location" because the "properties" collection was empty.
                response = await client.post(url, json=req)
                if response.status_code == 200:
                    data = response.json()
                    print(f"Retrieved docs: {data.get('retrieved_documents_count')}")
                    print(f"Answer: {data.get('answer')}")
                    print(f"Citations: {len(data.get('citations', []))}")
                else:
                    print(f"Failed: {response.status_code} - {response.text}")
            except Exception as e:
                print(f"Exception: {e}")

if __name__ == "__main__":
    asyncio.run(main())

import asyncio
from app.schemas.rag import RAGQueryRequest
from app.services.rag_service import RAGService
from app.core.config import settings

async def main():
    print("Testing RAG Engine...")
    print(f"Provider: {settings.llm_provider}")
    print(f"Model: {settings.llm_model}")
    
    rag = RAGService()
    
    queries = [
        "Who owns this property?",
        "Tell me about property XYZ123.",
    ]
    
    for q in queries:
        print(f"\n--- Query: {q} ---")
        req = RAGQueryRequest(query=q, collection_name="properties", top_k=3)
        try:
            res = await rag.generate_response(req)
            print("Answer:", res.answer)
            print("Citations:", [c.model_dump() for c in res.citations])
            print("Processing Time:", res.processing_time)
            print("Retrieved Docs:", res.retrieved_documents_count)
        except Exception as e:
            print("Error:", e)

if __name__ == "__main__":
    asyncio.run(main())

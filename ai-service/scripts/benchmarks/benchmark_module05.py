import asyncio
import time
import httpx
from colorama import Fore, Style, init

from app.main import app

init(autoreset=True)

async def run_benchmark():
    print(f"\n{Fore.CYAN}====================================================")
    print(f"{Fore.CYAN} MODULE 05 - AI ASSISTANT BENCHMARK")
    print(f"{Fore.CYAN}====================================================\n")

    transport = httpx.ASGITransport(app=app)
    async with httpx.AsyncClient(transport=transport, base_url="http://test") as client:
        
        session_id = "bench-session-999"
        
        # 1. Natural Language Search (Intent: property_search)
        print(f"{Fore.YELLOW}Testing: Natural Language Search")
        start = time.time()
        res = await client.post("/api/v1/chat", json={
            "session_id": session_id,
            "question": "Find properties in Kokapet"
        })
        latency = (time.time() - start) * 1000
        assert res.status_code == 200, f"Failed: {res.text}"
        data = res.json()
        print(f"{Fore.GREEN}OK Search succeeded in {latency:.2f}ms")
        print(f"  AI Answer: {data['answer'][:100]}...")
        assert len(data['citations']) > 0
        
        # 2. Specific Property Context (Intent: specific_property)
        property_id = "PROP-KOK-000001"
        print(f"\n{Fore.YELLOW}Testing: Specific Property Query")
        start = time.time()
        res = await client.post("/api/v1/chat", json={
            "session_id": session_id,
            "property_id": property_id,
            "question": "Who owns this property?"
        })
        latency = (time.time() - start) * 1000
        assert res.status_code == 200, f"Failed: {res.text}"
        data = res.json()
        print(f"{Fore.GREEN}OK Property query succeeded in {latency:.2f}ms")
        print(f"  AI Answer: {data['answer']}")
        print(f"  Follow-ups generated: {len(data['suggested_follow_ups'])}")
        
        # 3. Memory & Context Follow-up (Intent: general_knowledge but with active property)
        print(f"\n{Fore.YELLOW}Testing: Follow-up Question (Memory)")
        start = time.time()
        res = await client.post("/api/v1/chat", json={
            "session_id": session_id,
            "question": "Does it have any active loans?"
        })
        latency = (time.time() - start) * 1000
        assert res.status_code == 200, f"Failed: {res.text}"
        data = res.json()
        print(f"{Fore.GREEN}OK Memory query succeeded in {latency:.2f}ms")
        print(f"  AI Answer: {data['answer']}")
        assert data['property_id'] == property_id

        # 4. Property Comparison
        compare_ids = ["PROP-KOK-000001", "PROP-MOK-000090"]
        print(f"\n{Fore.YELLOW}Testing: Property Comparison")
        start = time.time()
        res = await client.post("/api/v1/properties/compare", json={
            "properties": compare_ids
        })
        latency = (time.time() - start) * 1000
        assert res.status_code == 200, f"Failed: {res.text}"
        data = res.json()
        print(f"{Fore.GREEN}OK Comparison succeeded in {latency:.2f}ms")
        assert len(data['comparisons']) == 2
        for comp in data['comparisons']:
            print(f"  - {comp['property_id']}: Risk Tier={comp['risk_tier']}, Owner={comp['current_owner']}")

        # 5. Streaming Endpoint
        print(f"\n{Fore.YELLOW}Testing: Streaming Response")
        start = time.time()
        async with client.stream("POST", "/api/v1/chat/stream", json={
            "session_id": session_id,
            "question": "Summarize the legal history of the property."
        }) as response:
            assert response.status_code == 200
            print(f"{Fore.GREEN}OK Stream connected")
            async for chunk in response.aiter_text():
                # Just verify it's streaming Server-Sent Events
                if chunk.strip():
                    assert chunk.startswith("data: ")
            latency = (time.time() - start) * 1000
            print(f"{Fore.GREEN}OK Stream completed successfully in {latency:.2f}ms")

        print(f"\n{Fore.GREEN}====================================================")
        print(f"{Fore.GREEN} ALL MODULE 05 BENCHMARKS PASSED")
        print(f"{Fore.GREEN}====================================================\n")

if __name__ == "__main__":
    asyncio.run(run_benchmark())

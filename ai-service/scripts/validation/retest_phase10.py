import asyncio
from colorama import Fore, init
import httpx
from app.main import app

init(autoreset=True)

async def run_phase_10():
    print(f"\n{Fore.CYAN}--- RE-TEST PHASE 10: NEGATIVE TESTS ---")
    transport = httpx.ASGITransport(app=app)
    async with httpx.AsyncClient(transport=transport, base_url="http://test") as client:
        # Invalid property
        res1 = await client.post("/api/v1/chat", json={"session_id": "neg1", "property_id": "INVALID-PROP", "question": "Hello"})
        assert res1.status_code == 404, f"Expected 404, got {res1.status_code}. Detail: {res1.text}"
        print(f"{Fore.GREEN}OK Negative tests successfully threw 404 on invalid property.")

if __name__ == "__main__":
    asyncio.run(run_phase_10())

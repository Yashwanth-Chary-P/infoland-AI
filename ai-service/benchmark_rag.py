import time
import requests
import json
import statistics

API_URL = "http://localhost:8000/api/v1/rag/ask"

QUERIES = [
    "hospital",
    "school",
    "City Care Hospital",
    "Kokapet",
    "Mokila",
    "fake_property_123"
]

def run_benchmark(provider, model):
    print(f"\n==================================================")
    print(f"Starting Benchmark... [Provider: {provider} | Model: {model}]")
    print(f"==================================================")
    
    # 1. Cold Start
    start_time = time.time()
    try:
        res = requests.post(API_URL, json={"query": QUERIES[0], "top_k": 3, "provider": provider, "model": model}, timeout=60)
        res.raise_for_status()
    except Exception as e:
        print(f"Cold start failed: {e}")
        return
    cold_start_time = time.time() - start_time
    print(f"Cold Start Time (first request): {cold_start_time:.3f}s")
    
    # 2. Warm Requests (Regression Test)
    warm_times = []
    print("\nRunning Warm Queries:")
    for query in QUERIES:
        start_time = time.time()
        res = requests.post(API_URL, json={"query": query, "top_k": 3, "provider": provider, "model": model})
        elapsed = time.time() - start_time
        
        if res.status_code == 200:
            data = res.json()
            answer = data.get("answer", "")
            citations = data.get("citations", [])
            proc_time = data.get("processing_time")
            retrieved = data.get("retrieved_documents_count")
            
            # Simple hallucination check
            has_fallback = "I don't have sufficient information" in answer
            if retrieved == 0 and not has_fallback:
                print(f"  [ERROR] Hallucination detected for '{query}'. 0 docs but answered: {answer[:30]}...")
                
            print(f"  '{query}' -> {elapsed:.3f}s (Proc: {proc_time}s) | Docs: {retrieved} | Citations: {len(citations)}")
            print(f"    Ans: {answer[:60]}...")
            
            warm_times.append(elapsed)
        else:
            print(f"  '{query}' -> FAILED with status {res.status_code}")
            
    print("\n" + "="*50)
    print(f"Average Warm Request Time: {statistics.mean(warm_times):.3f}s")
    print(f"Min Warm Request Time: {min(warm_times):.3f}s")
    print(f"Max Warm Request Time: {max(warm_times):.3f}s")
    
if __name__ == "__main__":
    time.sleep(1)
    run_benchmark("ollama", "qwen2.5:1.5b")
    run_benchmark("groq", "llama-3.1-8b-instant")

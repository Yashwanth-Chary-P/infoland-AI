import asyncio
import time
import psutil
import httpx
import json
import statistics

# Set up process monitor for the running backend process.
# Since we are testing against the running Uvicorn server on port 8000,
# we need to find its PID or just measure system-wide/script impact.
# A better way is to hit the API, measuring time, and sampling system resources.

API_URL = "http://localhost:8000/api/v1/rag/ask"

QUERIES = [
    "hospital",
    "school"
]

def get_system_resources():
    return {
        "cpu": psutil.cpu_percent(interval=0.1),
        "ram_percent": psutil.virtual_memory().percent,
        "ram_mb": psutil.virtual_memory().used / (1024 * 1024)
    }

async def make_request(query: str, is_cold: bool = False):
    start_time = time.time()
    
    # Start background resource monitoring
    cpu_samples = []
    ram_samples = []
    
    # Fire the request
    async with httpx.AsyncClient(timeout=None) as client:
        payload = {
            "query": query,
            "collection_name": "location"  # we use location for the mock data
        }
        
        # Start a quick task to sample while the request runs
        async def monitor():
            while True:
                res = get_system_resources()
                cpu_samples.append(res["cpu"])
                ram_samples.append(res["ram_mb"])
                await asyncio.sleep(0.5)
                
        monitor_task = asyncio.create_task(monitor())
        
        response = await client.post(API_URL, json=payload)
        
        monitor_task.cancel()
        
    duration = time.time() - start_time
    
    if response.status_code == 200:
        data = response.json()
        print(f"[{'COLD' if is_cold else 'WARM'}] '{query}' completed in {duration:.2f}s")
    else:
        print(f"[{'COLD' if is_cold else 'WARM'}] '{query}' FAILED: {response.text}")
        
    return {
        "duration": duration,
        "avg_cpu": statistics.mean(cpu_samples) if cpu_samples else 0,
        "peak_cpu": max(cpu_samples) if cpu_samples else 0,
        "avg_ram": statistics.mean(ram_samples) if ram_samples else 0,
        "peak_ram": max(ram_samples) if ram_samples else 0
    }

async def run_benchmark():
    print("Starting Benchmark...")
    print("--------------------------------------------------")
    
    # 1. Cold Start
    print("Measuring Cold Start...")
    cold_stats = await make_request(QUERIES[0], is_cold=True)
    print(f"Cold Start: {cold_stats['duration']:.2f}s (Avg CPU: {cold_stats['avg_cpu']:.1f}%, Peak RAM: {cold_stats['peak_ram']:.0f}MB)\n")
    
    # 2. Warm Requests
    print("Measuring Warm Requests...")
    warm_stats_list = []
    for query in QUERIES[1:]:
        stats = await make_request(query, is_cold=False)
        warm_stats_list.append(stats)
        
    # Aggregate
    avg_warm_duration = statistics.mean([s["duration"] for s in warm_stats_list])
    avg_warm_cpu = statistics.mean([s["avg_cpu"] for s in warm_stats_list])
    peak_warm_cpu = max([s["peak_cpu"] for s in warm_stats_list])
    avg_warm_ram = statistics.mean([s["avg_ram"] for s in warm_stats_list])
    peak_warm_ram = max([s["peak_ram"] for s in warm_stats_list])
    
    print("\n--------------------------------------------------")
    print("BENCHMARK RESULTS")
    print("--------------------------------------------------")
    print(f"Cold Start Time:    {cold_stats['duration']:.2f} seconds")
    print(f"Warm Request (Avg): {avg_warm_duration:.2f} seconds")
    print(f"Peak CPU Usage:     {max(cold_stats['peak_cpu'], peak_warm_cpu):.1f}%")
    print(f"Average CPU Usage:  {statistics.mean([cold_stats['avg_cpu'], avg_warm_cpu]):.1f}%")
    print(f"Peak RAM Usage:     {max(cold_stats['peak_ram'], peak_warm_ram):.0f} MB")
    print(f"Average RAM Usage:  {statistics.mean([cold_stats['avg_ram'], avg_warm_ram]):.0f} MB")
    print("--------------------------------------------------")
    
    # Save to file
    with open("benchmark_results_before.json", "w") as f:
        json.dump({
            "cold_start_time": cold_stats['duration'],
            "warm_request_avg": avg_warm_duration,
            "peak_cpu": max(cold_stats['peak_cpu'], peak_warm_cpu),
            "avg_cpu": statistics.mean([cold_stats['avg_cpu'], avg_warm_cpu]),
            "peak_ram": max(cold_stats['peak_ram'], peak_warm_ram),
            "avg_ram": statistics.mean([cold_stats['avg_ram'], avg_warm_ram]),
        }, f, indent=4)

if __name__ == "__main__":
    asyncio.run(run_benchmark())

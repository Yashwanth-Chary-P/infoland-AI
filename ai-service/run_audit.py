import json
import time
import requests

def audit():
    report = {}
    
    # 1. API Endpoints from OpenAPI
    try:
        res = requests.get('http://127.0.0.1:8000/openapi.json')
        openapi = res.json()
        report['endpoints'] = openapi['paths']
    except Exception as e:
        report['endpoints_error'] = str(e)
        
    # 3. Benchmark Endpoints
    benchmarks = {}
    
    # Health endpoint
    try:
        t0 = time.time()
        requests.get('http://127.0.0.1:8000/api/v1/')
        t1 = time.time()
        benchmarks['health'] = t1 - t0
    except:
        pass
        
    # Health check endpoint
    try:
        t0 = time.time()
        requests.get('http://127.0.0.1:8000/api/v1/health')
        t1 = time.time()
        benchmarks['api_v1_health'] = t1 - t0
    except:
        pass
        
    report['benchmarks'] = benchmarks
    
    with open('audit_results.json', 'w') as f:
        json.dump(report, f, indent=2)

if __name__ == "__main__":
    audit()

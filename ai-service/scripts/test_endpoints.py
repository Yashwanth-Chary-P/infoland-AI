import sys
import os
import asyncio
import time
import random
import requests
import json
from pathlib import Path
from rich.console import Console
from rich.table import Table

console = Console()
API_BASE = "http://127.0.0.1:8000/api/v1"

def test_compare(prop_ids):
    if len(prop_ids) < 2: return
    p1, p2 = prop_ids[0], prop_ids[1]
    res = requests.post(f"{API_BASE}/properties/compare", json={"property_ids": [p1, p2]})
    if res.status_code == 200:
        data = res.json()
        print(f"Compare: OK. Latency: {res.elapsed.total_seconds():.2f}s")
    else:
        print(f"Compare Failed: {res.status_code} - {res.text}")

def test_stream(prop_id):
    res = requests.post(f"{API_BASE}/chat/stream", json={
        "session_id": "test_stream_1",
        "property_id": prop_id,
        "question": "What is the timeline of this property?"
    }, stream=True)
    
    if res.status_code == 200:
        chunks = 0
        for line in res.iter_lines():
            if line: chunks += 1
        print(f"Stream: OK. Chunks received: {chunks}")
    else:
        print(f"Stream Failed: {res.status_code} - {res.text}")

def test_errors():
    # invalid prop
    res = requests.get(f"{API_BASE}/properties/INVALID_PROP/intelligence-report")
    print(f"Error test 1 (Invalid Prop): {res.status_code}") # Should be 404 or 400
    
    # invalid chat payload
    res = requests.post(f"{API_BASE}/chat", json={})
    print(f"Error test 2 (Empty Payload): {res.status_code}") # Should be 422
    
def get_props():
    try:
        import chromadb
        client = chromadb.PersistentClient('./chroma_data')
        c = client.get_collection('properties')
        res = c.get(limit=100)
        return list(set(m['property_id'] for m in res['metadatas']))
    except:
        return ["PROP-KOK-000001", "PROP-KOK-000002"]

if __name__ == "__main__":
    props = get_props()
    if props:
        print(f"Testing with property: {props[0]}")
        test_stream(props[0])
        test_compare(props)
        test_errors()
    else:
        print("No properties found.")

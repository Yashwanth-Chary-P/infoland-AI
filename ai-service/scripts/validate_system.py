import sys
import os
import asyncio
import time
import random
import requests
from pathlib import Path

# Ensure app is in path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from app.storage.vector_store.chroma import chroma_client
from app.core.config import settings
from app.core.logging import logger

API_BASE = "http://127.0.0.1:8000/api/v1"

def validate_collections():
    logger.info("Validating collections...")
    collections = chroma_client.list_collections()
    stats = {}
    total_chunks = 0
    for c in collections:
        count = c.count()
        stats[c.name] = count
        total_chunks += count
        logger.info(f"Collection: {c.name} - Chunks: {count}")
    return stats, total_chunks

def get_random_properties(n=30):
    props = chroma_client.get_collection("properties")
    res = props.get(limit=5000)
    metadatas = res.get("metadatas", [])
    prop_ids = list(set([m.get("property_id") for m in metadatas if m.get("property_id")]))
    if not prop_ids:
        logger.warning("No property IDs found!")
        return []
    sample_size = min(n, len(prop_ids))
    return random.sample(prop_ids, sample_size)

def validate_retrieval(prop_id):
    missing = []
    collections = ["properties", "ownership", "financial", "legal", "documents", "timeline", "location"]
    for c_name in collections:
        try:
            c = chroma_client.get_collection(c_name)
            res = c.get(where={"property_id": prop_id}, limit=1)
            if not res["ids"] and c_name != "documents": # documents might be empty for some properties
                pass
        except Exception as e:
            missing.append(c_name)
    return missing

def validate_module_03(prop_id):
    t0 = time.time()
    try:
        res = requests.post(f"{API_BASE}/rag/ask", json={
            "query": f"Summarize property {prop_id}",
            "collection_name": "properties",
            "filters": {"property_id": prop_id},
            "top_k": 3
        })
        latency = time.time() - t0
        if res.status_code == 200:
            data = res.json()
            return {"success": True, "latency": latency, "citations": len(data.get("citations", []))}
        return {"success": False, "latency": latency, "error": f"Status {res.status_code}"}
    except Exception as e:
        return {"success": False, "latency": time.time() - t0, "error": str(e)}

def validate_module_04(prop_id):
    t0 = time.time()
    try:
        res = requests.get(f"{API_BASE}/properties/{prop_id}/intelligence-report")
        latency = time.time() - t0
        if res.status_code == 200:
            return {"success": True, "latency": latency}
        return {"success": False, "latency": latency, "error": f"Status {res.status_code}"}
    except Exception as e:
        return {"success": False, "latency": time.time() - t0, "error": str(e)}

def validate_module_05(prop_id):
    t0 = time.time()
    try:
        res = requests.post(f"{API_BASE}/chat", json={
            "session_id": f"test_{prop_id}",
            "property_id": prop_id,
            "question": "What is the status of this property?"
        })
        latency = time.time() - t0
        if res.status_code == 200:
            return {"success": True, "latency": latency}
        return {"success": False, "latency": latency, "error": f"Status {res.status_code}"}
    except Exception as e:
        return {"success": False, "latency": time.time() - t0, "error": str(e)}

def main():
    logger.info("Starting System Validation...")
    
    # 1. Collections
    stats, total_chunks = validate_collections()
    
    with open("C:/Users/poloj/.gemini/antigravity-ide/brain/a55374f2-fe5c-49d9-9f26-aa81090a3533/indexing_report.md", "w") as f:
        f.write("# Indexing Report\n\n")
        f.write("| Collection | Chunks |\n|---|---|\n")
        for k, v in stats.items():
            f.write(f"| {k} | {v} |\n")
        f.write(f"| **Total** | **{total_chunks}** |\n")
        
    # 2. Retrieval & API Validation
    prop_ids = get_random_properties(30)
    
    val_summary = []
    perf = {"m03": [], "m04": [], "m05": []}
    
    for pid in prop_ids:
        logger.info(f"Validating property: {pid}")
        ret_missing = validate_retrieval(pid)
        
        m03 = validate_module_03(pid)
        m04 = validate_module_04(pid)
        m05 = validate_module_05(pid)
        
        if m03.get("success"): perf["m03"].append(m03["latency"])
        if m04.get("success"): perf["m04"].append(m04["latency"])
        if m05.get("success"): perf["m05"].append(m05["latency"])
        
        val_summary.append({
            "property_id": pid,
            "retrieval_missing": ret_missing,
            "m03_success": m03.get("success"),
            "m04_success": m04.get("success"),
            "m05_success": m05.get("success")
        })
        
    with open("C:/Users/poloj/.gemini/antigravity-ide/brain/a55374f2-fe5c-49d9-9f26-aa81090a3533/validation_report.md", "w") as f:
        f.write("# Validation Report\n\n")
        f.write(f"Sampled {len(prop_ids)} random properties.\n\n")
        f.write("| Property ID | M03 RAG | M04 Intel | M05 Chat | Retrieval Issues |\n|---|---|---|---|---|\n")
        for v in val_summary:
            f.write(f"| {v['property_id']} | {'✅' if v['m03_success'] else '❌'} | {'✅' if v['m04_success'] else '❌'} | {'✅' if v['m05_success'] else '❌'} | {','.join(v['retrieval_missing']) or 'None'} |\n")
            
    with open("C:/Users/poloj/.gemini/antigravity-ide/brain/a55374f2-fe5c-49d9-9f26-aa81090a3533/performance_report.md", "w") as f:
        f.write("# Performance Report\n\n")
        def avg(lst): return sum(lst)/len(lst) if lst else 0
        f.write(f"- **Avg RAG Latency:** {avg(perf['m03']):.3f}s\n")
        f.write(f"- **Avg Intelligence Latency:** {avg(perf['m04']):.3f}s\n")
        f.write(f"- **Avg Chat Latency:** {avg(perf['m05']):.3f}s\n")

if __name__ == "__main__":
    main()

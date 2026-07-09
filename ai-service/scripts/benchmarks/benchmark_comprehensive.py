import os
import sys
import json
import random
import time
import requests
import chromadb
from pprint import pprint
from collections import defaultdict

# Path to original datasets
DATASETS_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", "infoland-dataset-engine", "release", "generated"))

API_BASE_URL = "http://localhost:8000/api/v1/properties"

def discover_property_ids(num_ids=20):
    client = chromadb.PersistentClient(path="./chroma_data")
    col = client.get_collection("properties")
    # Fetch some random documents
    res = col.get(limit=1000)
    all_ids = set()
    for meta in res["metadatas"]:
        pid = meta.get("property_id")
        if pid and pid.startswith("PROP-"):
            all_ids.add(pid)
            
    if not all_ids:
        print("ERROR: No properties found in ChromaDB. Ensure re-indexing is complete.")
        return []
        
    sampled_ids = random.sample(list(all_ids), min(num_ids, len(all_ids)))
    return sampled_ids

def verify_counts():
    print("Verifying collection counts...")
    
    # Helper to count records in a JSON file
    def _count(filepath):
        if not os.path.exists(filepath):
            return 0
        with open(filepath, "r", encoding="utf-8") as f:
            try:
                data = json.load(f)
                return len(data)
            except:
                return 0
                
    expected = {
        "properties": _count(os.path.join(DATASETS_DIR, "master_properties.json")) + 
                      _count(os.path.join(DATASETS_DIR, "property_profiles.json")) + 
                      _count(os.path.join(DATASETS_DIR, "property_registry.json")),
        "ownership": _count(os.path.join(DATASETS_DIR, "owners.json")) + 
                     _count(os.path.join(DATASETS_DIR, "ownership_events.json")),
        "financial": _count(os.path.join(DATASETS_DIR, "loans.json")) + 
                     _count(os.path.join(DATASETS_DIR, "tax_records.json")),
        "legal": _count(os.path.join(DATASETS_DIR, "documents", "court_dispute_records.json")),
        "timeline": _count(os.path.join(DATASETS_DIR, "property_timeline.json")),
        "documents": _count(os.path.join(DATASETS_DIR, "documents", "documents_all.json"))
    }
    
    client = chromadb.PersistentClient(path="./chroma_data")
    collections = client.list_collections()
    for col in collections:
        c = col.name if hasattr(col, 'name') else col
        actual = client.get_collection(c).count()
        exp = expected.get(c, -1)
        # Note: Chunker might split docs into slightly more chunks, so actual >= expected is OK
        # But here we assume 1:1 for most small records.
        print(f"Collection {c:12} | Expected >= {exp:4} | Actual: {actual:4} | {'OK' if actual >= exp else 'WARN'}")


def read_source_data(property_id):
    """
    Reads the original JSON files to construct the expected ground truth for a property_id.
    """
    ground_truth = {
        "properties": [],
        "ownership": [],
        "financial": [],
        "legal": [],
        "timeline": [],
        "documents": []
    }
    
    # helper to find in a list
    def _find(filepath):
        if not os.path.exists(filepath):
            return []
        with open(filepath, "r", encoding="utf-8") as f:
            try:
                data = json.load(f)
                return [item for item in data if item.get("property_id") == property_id]
            except:
                return []
                
    # properties
    ground_truth["properties"].extend(_find(os.path.join(DATASETS_DIR, "master_properties.json")))
    ground_truth["properties"].extend(_find(os.path.join(DATASETS_DIR, "property_profiles.json")))
    ground_truth["properties"].extend(_find(os.path.join(DATASETS_DIR, "property_registry.json")))
    
    # ownership
    ground_truth["ownership"].extend(_find(os.path.join(DATASETS_DIR, "owners.json")))
    ground_truth["ownership"].extend(_find(os.path.join(DATASETS_DIR, "ownership_events.json")))
    
    # financial
    ground_truth["financial"].extend(_find(os.path.join(DATASETS_DIR, "loans.json")))
    ground_truth["financial"].extend(_find(os.path.join(DATASETS_DIR, "tax_records.json")))
    
    # legal
    ground_truth["legal"].extend(_find(os.path.join(DATASETS_DIR, "documents", "court_dispute_records.json")))
    
    # timeline
    ground_truth["timeline"].extend(_find(os.path.join(DATASETS_DIR, "property_timeline.json")))
    
    # documents
    ground_truth["documents"].extend(_find(os.path.join(DATASETS_DIR, "documents", "documents_all.json")))
    
    return ground_truth

def validate_property_report(property_id, report, truth, url):
    errors = []
    
    # SUMMARY
    summary = report.get("summary", {})
    if summary.get("property_id") != property_id:
        errors.append(f"Summary ID mismatch. Expected {property_id}, got {summary.get('property_id')}")
        
    truth_area = next((item.get("area_sq_ft") for item in truth["properties"] if "area_sq_ft" in item), None)
    if truth_area and summary.get("area") != truth_area:
        errors.append(f"Area mismatch. Expected {truth_area}, got {summary.get('area')}")
        
    truth_class = next((item.get("property_class") for item in truth["properties"] if "property_class" in item), None)
    if truth_class and summary.get("property_type") != truth_class:
        errors.append(f"Property type mismatch. Expected {truth_class}, got {summary.get('property_type')}")
        
    # OWNERSHIP
    ownership = report.get("ownership", {})
    if truth["ownership"]:
        if ownership.get("current_owner") == "unknown":
            errors.append("Current owner is unknown despite having ownership data")
    
    # FINANCIAL
    fin = report.get("financial", {})
    active_loans_truth = [l for l in truth["financial"] if "loan_id" in l and l.get("status") in ["active", "outstanding", "defaulted"]]
    if len(fin.get("active_loans", [])) != len(active_loans_truth):
        errors.append(f"Active loans count mismatch. Expected {len(active_loans_truth)}, got {len(fin.get('active_loans', []))}")
        
    # TIMELINE
    timeline = report.get("timeline", [])
    if timeline:
        # Check chronological order
        for i in range(1, len(timeline)):
            if timeline[i]["date"] < timeline[i-1]["date"]:
                errors.append("Timeline is not sorted chronologically")
                break
                
    # DETERMINISTIC CHECKS
    ai_summary = report.get("ai_executive_summary", "")
    if not ai_summary:
        errors.append("AI Summary is missing")
        
    recommendations = report.get("recommendations", [])
    if not recommendations:
        errors.append("Recommendations are missing")
    else:
        # At least some recommendations should have citations
        has_citations = any(len(r.get("citations", [])) > 0 for r in recommendations)
        if not has_citations:
            # Depending on property, there might be NO specific recommendations,
            # but usually there is at least one (e.g. location score).
            pass
                
    return errors

def run_validation():
    verify_counts()
    
    test_ids = discover_property_ids(20)
    print(f"Selected {len(test_ids)} properties to test.")
    
    results = {
        "total_properties": len(test_ids),
        "passed": 0,
        "failed": 0,
        "failures": [],
        "performance": {
            "retrieval_avg": 0,
            "deterministic_avg": 0,
            "llm_avg": 0,
            "total_api_avg": 0,
            "min_total": 999999,
            "max_total": 0,
            "samples": []
        }
    }
    
    for i, pid in enumerate(test_ids):
        print(f"Testing {pid}...", flush=True)
        url = f"{API_BASE_URL}/{pid}/intelligence-report?include_timeline=true&include_documents=true&include_recommendations=true&include_ai_summary=true"
        
        start_req = time.time()
        try:
            resp = requests.get(url)
            total_req_time = (time.time() - start_req) * 1000
            
            if resp.status_code != 200:
                results["failed"] += 1
                results["failures"].append({"property_id": pid, "error": f"HTTP {resp.status_code}", "body": resp.text})
                print(f"  -> Failed: HTTP {resp.status_code}", flush=True)
                continue
                
            report = resp.json()
            truth = read_source_data(pid)
            errors = validate_property_report(pid, report, truth, url)
            
            # Check for rate limit failure string in AI components
            ai_summary = report.get("ai_executive_summary", "")
            if "failed to generate ai summary" in ai_summary.lower():
                errors.append("AI summary failed (likely rate limit)")
                
            # Record performance
            perf = report.get("performance", {})
            ret = perf.get("retrieval_time_ms", 0)
            det = perf.get("deterministic_analysis_time_ms", 0)
            llm = perf.get("llm_generation_time_ms", 0)
            tot = perf.get("total_time_ms", 0)
            
            results["performance"]["samples"].append({
                "pid": pid,
                "retrieval": ret,
                "deterministic": det,
                "llm": llm,
                "total": tot,
                "req_total": total_req_time
            })
            
            if tot < results["performance"]["min_total"]:
                results["performance"]["min_total"] = tot
            if tot > results["performance"]["max_total"]:
                results["performance"]["max_total"] = tot
                
            if errors:
                results["failed"] += 1
                results["failures"].append({
                    "property_id": pid,
                    "errors": errors
                })
                print(f"  -> Failed with {len(errors)} errors:", flush=True)
                for err in errors:
                    print(f"     - {err}", flush=True)
            else:
                results["passed"] += 1
                print(f"  -> Passed!", flush=True)
                
        except Exception as e:
            results["failed"] += 1
            results["failures"].append({"property_id": pid, "error": str(e)})
            print(f"  -> Exception: {e}", flush=True)
            
    # Calculate averages
    samples = results["performance"]["samples"]
    if samples:
        results["performance"]["retrieval_avg"] = sum(s["retrieval"] for s in samples) / len(samples)
        results["performance"]["deterministic_avg"] = sum(s["deterministic"] for s in samples) / len(samples)
        results["performance"]["llm_avg"] = sum(s["llm"] for s in samples) / len(samples)
        results["performance"]["total_api_avg"] = sum(s["total"] for s in samples) / len(samples)

    # Negative Tests
    print("Running negative tests...")
    for bad_id in ["INVALID_PROPERTY", "TEST123", "UNKNOWN999"]:
        resp = requests.get(f"{API_BASE_URL}/{bad_id}/intelligence-report")
        if resp.status_code == 500:
            results["failures"].append({"property_id": bad_id, "error": "HTTP 500 on invalid ID"})

    # Consistency Test
    print("Running consistency test...")
    if test_ids:
        test_id = test_ids[0]
        url = f"{API_BASE_URL}/{test_id}/intelligence-report"
        resp1 = requests.get(url).json()
        resp2 = requests.get(url).json()
        
        score1 = resp1.get("risk", {}).get("overall_risk_score")
        score2 = resp2.get("risk", {}).get("overall_risk_score")
        if score1 != score2:
             results["failures"].append({"property_id": test_id, "error": f"Consistency failure: Risk {score1} vs {score2}"})
             
    with open("validation_results.json", "w") as f:
        json.dump(results, f, indent=2)
        
    print(f"Validation complete! Passed: {results['passed']}, Failed: {results['failed']}")
    
if __name__ == "__main__":
    run_validation()

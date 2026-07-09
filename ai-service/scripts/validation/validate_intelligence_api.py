import requests
import json

def test_api():
    url = "http://localhost:8000/api/v1/properties/PROP-KOK-000001/intelligence-report?include_timeline=true&include_documents=true&include_recommendations=true&include_ai_summary=true"
    print(f"GET {url}")
    response = requests.get(url)
    
    if response.status_code == 200:
        data = response.json()
        print("\n--- SUMMARY ---")
        print(json.dumps(data.get("summary", {}), indent=2))
        print("\n--- OWNERSHIP ---")
        print(json.dumps(data.get("ownership", {}), indent=2))
        print("\n--- FINANCIAL ---")
        print(json.dumps(data.get("financial", {}), indent=2))
        print("\n--- LEGAL ---")
        print(json.dumps(data.get("legal", {}), indent=2))
        print("\n--- DOCUMENTATION ---")
        print(json.dumps(data.get("documentation", {}), indent=2))
        print("\n--- TIMELINE (first 3) ---")
        print(json.dumps(data.get("timeline", [])[:3], indent=2))
        print("\n--- VERIFICATION ---")
        print(json.dumps(data.get("verification", {}), indent=2))
        print("\n--- RISK ---")
        print(json.dumps(data.get("risk", {}), indent=2))
        print("\n--- RECOMMENDATIONS ---")
        print(json.dumps(data.get("recommendations", []), indent=2))
        print("\n--- AI SUMMARY ---")
        print(data.get("ai_executive_summary", ""))
    else:
        print(f"Error: {response.status_code}")
        print(response.text)

if __name__ == "__main__":
    test_api()

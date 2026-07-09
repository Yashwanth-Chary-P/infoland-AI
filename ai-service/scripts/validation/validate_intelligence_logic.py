import asyncio
import json
from app.services.intelligence.report_generator import ReportGeneratorService

async def test_logic():
    print("Testing logic directly for PROP-KOK-000001")
    gen = ReportGeneratorService()
    report = await gen.generate_report("PROP-KOK-000001")
    
    data = report.model_dump()
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
    
    print("\nValidation completed!")

if __name__ == "__main__":
    asyncio.run(test_logic())

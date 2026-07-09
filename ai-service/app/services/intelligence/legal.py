from typing import Dict, Any, List
from app.schemas.intelligence import LegalAnalysis

class LegalAnalysisService:
    @staticmethod
    def analyze(legal_data: List[Dict[str, Any]]) -> LegalAnalysis:
        analysis = LegalAnalysis()
        
        if not legal_data:
            return analysis
            
        active = []
        historical = []
        categories = set()
        severity = "low"
        status = "clear"
        
        for data in legal_data:
            case_status = data.get("case_status", "unknown")
            doc_status = data.get("status", "unknown").lower()
            if case_status:
                case_status = case_status.lower()
                
            cat = data.get("case_type") or data.get("category")
            if cat:
                categories.add(cat)
                
            if case_status in ["active", "pending", "ongoing", "appealed"]:
                active.append(data)
                status = "litigation_pending"
                
                # Check severity
                sev = data.get("severity", "low").lower()
                if sev == "critical":
                    severity = "critical"
                elif sev == "high" and severity != "critical":
                    severity = "high"
                elif sev == "medium" and severity not in ["critical", "high"]:
                    severity = "medium"
            else:
                historical.append(data)
                
        analysis.active_litigation = active
        analysis.historical_disputes = historical
        analysis.case_categories = list(categories)
        analysis.court_status = status
        analysis.legal_severity = severity
        
        return analysis

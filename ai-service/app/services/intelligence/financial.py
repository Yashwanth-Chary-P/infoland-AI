from typing import Dict, Any, List
from app.schemas.intelligence import FinancialAnalysis

class FinancialAnalysisService:
    @staticmethod
    def analyze(financial_data: List[Dict[str, Any]]) -> FinancialAnalysis:
        analysis = FinancialAnalysis()
        
        if not financial_data:
            return analysis
            
        active_loans = []
        loan_history = []
        tax_history = []
        outstanding = 0.0
        tax_defaults = 0
        
        for data in financial_data:
            # Identify loan objects
            if "loan_id" in data:
                status = data.get("status", "unknown").lower()
                if status in ["active", "defaulted", "outstanding"]:
                    active_loans.append(data)
                    amt = data.get("outstanding_amount") or data.get("loan_amount", 0)
                    try:
                        outstanding += float(amt)
                    except ValueError:
                        pass
                else:
                    loan_history.append(data)
                    
            # Identify tax records
            if "tax_id" in data:
                tax_history.append(data)
                status = data.get("status", "unknown").lower()
                amt = data.get("pending_amount") or data.get("tax_amount", 0)
                try:
                    if float(amt) > 0:
                        tax_defaults += 1
                        outstanding += float(amt)
                except ValueError:
                    pass
                        
        analysis.active_loans = active_loans
        analysis.loan_history = loan_history
        analysis.tax_history = tax_history
        analysis.outstanding_liabilities = outstanding
        analysis.tax_defaults = tax_defaults
        
        # Simple deterministic scoring
        score = 100.0
        score -= (len(active_loans) * 10)
        score -= (tax_defaults * 20)
        score = max(0.0, score)
        
        analysis.financial_health_score = score
        
        return analysis

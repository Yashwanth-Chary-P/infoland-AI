from app.schemas.intelligence import RiskSummary, PropertySummary, OwnershipAnalysis, FinancialAnalysis, LegalAnalysis, DocumentationAnalysis

class RiskAnalysisService:
    @staticmethod
    def analyze(
        summary: PropertySummary,
        ownership: OwnershipAnalysis,
        financial: FinancialAnalysis,
        legal: LegalAnalysis,
        docs: DocumentationAnalysis
    ) -> RiskSummary:
        risk = RiskSummary()
        
        # 1. Ownership Risk
        if ownership.missing_registry_entries:
            risk.ownership_risk += 50.0
        if ownership.frequent_ownership_transfers:
            risk.ownership_risk += 20.0
            
        # 2. Financial Risk
        if financial.tax_defaults > 0:
            risk.financial_risk += min(50.0, financial.tax_defaults * 25.0)
        if len(financial.active_loans) > 0:
            risk.financial_risk += 10.0
            
        # 3. Legal Risk
        if legal.court_status != "clear":
            if legal.legal_severity == "critical":
                risk.legal_risk = 100.0
            elif legal.legal_severity == "high":
                risk.legal_risk = 75.0
            elif legal.legal_severity == "medium":
                risk.legal_risk = 50.0
            else:
                risk.legal_risk = 25.0
                
        # 4. Documentation Risk
        if len(docs.invalid_documents) > 0:
            risk.documentation_risk += 60.0
        risk.documentation_risk += (len(docs.missing_documents) * 15.0)
        risk.documentation_risk += (len(docs.expired_documents) * 10.0)
        
        # Cap sub-scores at 100
        risk.ownership_risk = min(100.0, risk.ownership_risk)
        risk.financial_risk = min(100.0, risk.financial_risk)
        risk.legal_risk = min(100.0, risk.legal_risk)
        risk.documentation_risk = min(100.0, risk.documentation_risk)
        
        # 5. Location Risk (Deterministic pass-through from PropertySummary)
        if summary.future_risk_tier.lower() == "high":
            risk.location_risk = 75.0
        elif summary.future_risk_tier.lower() == "critical":
            risk.location_risk = 100.0
        
        # Overall Risk Calculation (Weighted)
        overall = (
            (risk.ownership_risk * 0.25) +
            (risk.legal_risk * 0.35) +
            (risk.financial_risk * 0.15) +
            (risk.documentation_risk * 0.20) +
            (risk.location_risk * 0.05)
        )
        risk.overall_risk_score = round(overall, 2)
        
        # Deterministic Risk Tier
        if risk.overall_risk_score >= 75.0:
            risk.risk_tier = "Critical"
        elif risk.overall_risk_score >= 50.0:
            risk.risk_tier = "High"
        elif risk.overall_risk_score >= 25.0:
            risk.risk_tier = "Medium"
        else:
            risk.risk_tier = "Low"
            
        return risk

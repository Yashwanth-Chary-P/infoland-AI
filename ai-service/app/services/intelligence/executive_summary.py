from app.schemas.intelligence import (
    PropertySummary, OwnershipAnalysis, FinancialAnalysis, LegalAnalysis,
    DocumentationAnalysis, VerificationSummary, RiskSummary
)

class ExecutiveSummaryGenerator:
    @staticmethod
    def generate(
        summary: PropertySummary,
        ownership: OwnershipAnalysis,
        financial: FinancialAnalysis,
        legal: LegalAnalysis,
        docs: DocumentationAnalysis,
        verification: VerificationSummary,
        risk: RiskSummary
    ) -> str:
        """
        Generates a deterministic Executive Summary using structured templates.
        No LLM calls are made here.
        """
        text = f"This property has a {risk.risk_tier} Risk score of {int(risk.overall_risk_score)}.\n\n"
        
        text += "Verification Status:\n"
        text += f"{verification.verification_status}.\n\n"
        
        text += "Ownership:\n"
        owner_desc = "Single owner" if len(ownership.previous_owners) == 0 else f"{len(ownership.previous_owners)} previous owner(s)"
        text += f"Current owner is {ownership.current_owner} with {owner_desc}. "
        if ownership.missing_registry_entries:
            text += "Missing registry entries detected."
        else:
            text += "Registry appears complete."
        text += "\n\n"
        
        text += "Financial:\n"
        if not financial.active_loans:
            text += "No active loans.\n\n"
        else:
            text += f"{len(financial.active_loans)} active loan(s).\n\n"
            
        text += "Legal:\n"
        if not legal.active_litigation:
            text += "No active disputes.\n\n"
        else:
            text += f"{len(legal.active_litigation)} active litigation case(s).\n\n"
            
        text += "Documentation:\n"
        text += f"{int(docs.documentation_completeness_score)}% complete."
        
        return text

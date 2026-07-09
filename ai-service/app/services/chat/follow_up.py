from typing import List
from app.schemas.intelligence import PropertyIntelligenceReport

class FollowUpGenerator:
    """
    Deterministically generates follow-up questions based on the contents 
    of the Property Intelligence Report to guide the user conversation.
    """

    @staticmethod
    def generate(report: PropertyIntelligenceReport) -> List[str]:
        suggestions = set()

        # Ownership triggers
        if report.ownership.frequent_ownership_transfers:
            suggestions.add("Explain the frequent ownership transfers.")
        if len(report.ownership.chain_of_title) > 2:
            suggestions.add("Show the ownership timeline.")
        if report.ownership.missing_registry_entries:
            suggestions.add("Why are registry entries missing?")

        # Financial triggers
        if len(report.financial.active_loans) > 0:
            suggestions.add("Explain the active financial liabilities.")
        if report.financial.tax_defaults > 0:
            suggestions.add("Are there any tax defaults?")

        # Legal triggers
        if len(report.legal.active_litigation) > 0:
            suggestions.add("Can you detail the active legal disputes?")

        # Documentation triggers
        if len(report.documentation.missing_documents) > 0:
            suggestions.add("Which documents are missing?")
            suggestions.add("How does missing documentation affect verification?")
        if len(report.documentation.invalid_documents) > 0:
            suggestions.add("Why were some documents flagged as invalid?")

        # Verification triggers
        if report.verification.verification_status == "Partially Verified":
            suggestions.add("Why is the property only partially verified?")
        elif report.verification.verification_status == "Verification Failed":
            suggestions.add("Why did the property fail verification?")

        # Risk triggers
        if report.risk.risk_tier in ["Medium", "High", "Critical"]:
            suggestions.add(f"Why is the risk tier {report.risk.risk_tier}?")

        # Fallback suggestions if we don't have enough specific ones
        if len(suggestions) < 2:
            suggestions.add("Summarize the ownership history.")
            suggestions.add("Is this property a good investment?")
            suggestions.add("What are the recommendations for buyers?")

        # Limit to top 3-4 suggestions for UX purposes
        return list(suggestions)[:4]

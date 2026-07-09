from app.schemas.intelligence import VerificationSummary, PropertySummary, OwnershipAnalysis, FinancialAnalysis, DocumentationAnalysis

class VerificationService:
    @staticmethod
    def analyze(
        summary: PropertySummary,
        ownership: OwnershipAnalysis,
        financial: FinancialAnalysis,
        docs: DocumentationAnalysis
    ) -> VerificationSummary:
        
        verification = VerificationSummary()
        score = 100.0
        
        # 1. Owner Mismatch
        # E.g. Check if the name on the sale deed matches the current owner in registry
        # We don't have deeply parsed sale deed contents right now, but if we did, we'd check here.
        if ownership.missing_registry_entries:
            verification.registry_inconsistencies = True
            score -= 30.0
            
        if docs.verification_status == "Verification Failed":
            verification.document_inconsistencies = True
            score -= 40.0
        elif docs.verification_status == "Partially Verified":
            verification.document_inconsistencies = True
            score -= 20.0
            
        if financial.tax_defaults > 0:
            verification.tax_inconsistencies = True
            score -= 10.0
            
        # Determine status based on score and flags
        verification.verification_score = max(0.0, score)
        
        if score == 100.0:
            verification.verification_status = "Verified"
        elif score >= 60.0:
            verification.verification_status = "Partially Verified"
        else:
            verification.verification_status = "Verification Failed"
            
        return verification

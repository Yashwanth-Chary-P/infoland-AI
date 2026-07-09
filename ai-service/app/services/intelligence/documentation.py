from typing import Dict, Any, List
from app.schemas.intelligence import DocumentationAnalysis

class DocumentationAnalysisService:
    REQUIRED_DOCS = ["Sale Deed", "Encumbrance Certificate", "Tax Receipt", "Mutation Record"]
    
    @staticmethod
    def analyze(documents_data: List[Dict[str, Any]]) -> DocumentationAnalysis:
        analysis = DocumentationAnalysis()
        
        if not documents_data:
            analysis.missing_documents = DocumentationAnalysisService.REQUIRED_DOCS.copy()
            analysis.verification_status = "Verification Failed"
            return analysis
            
        found_docs = set()
        expired = []
        invalid = []
        
        for data in documents_data:
            doc_type = data.get("document_type") or data.get("type")
            if doc_type == "record" and "_raw_content" in data:
                import re
                match = re.search(r"Document Type:\s*(.+)", data["_raw_content"], re.IGNORECASE)
                if match:
                    doc_type = match.group(1).strip()
            
            if not doc_type:
                continue
                
            status = data.get("status", "available").lower()
            
            # Naive matching
            for req in DocumentationAnalysisService.REQUIRED_DOCS:
                # Replace underscores in JSON document_type with spaces for comparison
                normalized_doc_type = str(doc_type).lower().replace("_", " ")
                if req.lower() in normalized_doc_type:
                    if status != "missing":
                        found_docs.add(req)
                    
            if status == "expired":
                expired.append(doc_type)
            elif status in ["invalid", "fake", "rejected"]:
                invalid.append(doc_type)
                
        analysis.missing_documents = [d for d in DocumentationAnalysisService.REQUIRED_DOCS if d not in found_docs]
        analysis.expired_documents = expired
        analysis.invalid_documents = invalid
        
        # Calculate completeness
        score = (len(found_docs) / len(DocumentationAnalysisService.REQUIRED_DOCS)) * 100.0
        analysis.documentation_completeness_score = score
        
        if len(invalid) > 0 or len(analysis.missing_documents) == len(DocumentationAnalysisService.REQUIRED_DOCS):
            analysis.verification_status = "Verification Failed"
        elif len(analysis.missing_documents) > 0 or len(expired) > 0:
            analysis.verification_status = "Partially Verified"
        else:
            analysis.verification_status = "Verified"
            
        return analysis

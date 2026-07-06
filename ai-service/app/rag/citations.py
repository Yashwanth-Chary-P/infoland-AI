from typing import List, Dict, Any
from langchain_core.documents import Document

class CitationEngine:
    """
    Generates structured citations from retrieved LangChain Documents.
    """

    @staticmethod
    def generate_citations(documents: List[Document]) -> List[Dict[str, Any]]:
        """
        Extracts metadata from documents to form structured citations.
        Includes: dataset, property_id, document_type, chunk_id, source_file
        """
        citations = []
        seen = set()

        for doc in documents:
            chunk_id = doc.metadata.get("_chunk_id", "unknown")
            if chunk_id in seen:
                continue
            
            seen.add(chunk_id)
            
            citation = {
                "dataset": doc.metadata.get("dataset", "InfoLand DB"),
                "property_id": doc.metadata.get("property_id", "unknown"),
                "document_type": doc.metadata.get("document_type", "unknown"),
                "chunk_id": chunk_id,
                "source_file": doc.metadata.get("source_file", "unknown")
            }
            citations.append(citation)
            
        return citations

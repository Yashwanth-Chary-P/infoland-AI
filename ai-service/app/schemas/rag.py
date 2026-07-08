from typing import List, Dict, Any, Optional
from pydantic import BaseModel, Field

class RAGQueryRequest(BaseModel):
    """Request model for the RAG Ask endpoint."""
    query: str = Field(..., description="The user's question.")
    collection_name: Optional[str] = Field("properties", description="The ChromaDB collection to search.")
    top_k: Optional[int] = Field(3, description="Number of context chunks to retrieve.")
    filters: Optional[Dict[str, Any]] = Field(None, description="Metadata filters for retrieval.")
    provider: Optional[str] = Field(None, description="The LLM provider to use (e.g. ollama, groq).")
    model: Optional[str] = Field(None, description="The specific LLM model to use.")

class CitationModel(BaseModel):
    """Model representing a single citation."""
    dataset: str
    property_id: str
    document_type: str
    chunk_id: str
    source_file: str

class RAGQueryResponse(BaseModel):
    """Response model for the RAG Ask endpoint."""
    answer: str = Field(..., description="The generated answer from the LLM.")
    citations: List[CitationModel] = Field(default_factory=list, description="List of structured citations.")
    processing_time: float = Field(..., description="Time taken to generate the response in seconds.")
    retrieved_documents_count: int = Field(..., description="Number of documents retrieved for context.")

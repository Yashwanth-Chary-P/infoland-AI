from pydantic import BaseModel, Field
from typing import Dict, Any


class Document(BaseModel):
    """Represents a full document before chunking."""

    id: str
    content: str
    metadata: Dict[str, Any] = Field(default_factory=dict)


class Chunk(BaseModel):
    """Represents a semantically meaningful chunk of a document."""

    chunk_id: str
    document_id: str
    content: str
    metadata: Dict[str, Any] = Field(default_factory=dict)

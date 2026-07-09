from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any

class ChatMessage(BaseModel):
    role: str = Field(..., description="Role of the sender (user, assistant, system)")
    content: str = Field(..., description="Message content")

class ChatRequest(BaseModel):
    session_id: str = Field(..., description="Unique session identifier for memory")
    property_id: Optional[str] = Field(None, description="Optional property ID. If provided, anchors the conversation to this property.")
    question: str = Field(..., description="The user's query")

class ChatResponse(BaseModel):
    session_id: str = Field(..., description="Session identifier")
    answer: str = Field(..., description="The AI's response text")
    citations: List[Dict[str, Any]] = Field(default_factory=list, description="Citations used in the answer")
    suggested_follow_ups: List[str] = Field(default_factory=list, description="Deterministic follow-up questions")
    property_id: Optional[str] = Field(None, description="The currently active property in the session context")

class CompareRequest(BaseModel):
    properties: List[str] = Field(..., description="List of property IDs to compare", min_length=2, max_length=5)

class PropertyComparison(BaseModel):
    property_id: str
    region: Optional[str]
    area: Optional[float]
    property_type: Optional[str]
    estimated_value: Optional[float]
    sale_status: Optional[str]
    location_score: Optional[float]
    future_risk_tier: Optional[str]
    overall_health: Optional[str]
    current_owner: str
    active_loans_count: int
    active_litigations_count: int
    missing_documents_count: int
    verification_status: str
    overall_risk_score: float
    risk_tier: str

class CompareResponse(BaseModel):
    comparisons: List[PropertyComparison] = Field(..., description="Deterministic comparison of requested properties")

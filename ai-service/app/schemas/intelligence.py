from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any

class PropertySummary(BaseModel):
    property_id: str = Field(..., description="Unique property identifier")
    region: Optional[str] = Field(None, description="Region where property is located")
    area: Optional[float] = Field(None, description="Property area")
    property_type: Optional[str] = Field(None, description="Type of property")
    estimated_value: Optional[float] = Field(None, description="Estimated value")
    sale_status: Optional[str] = Field(None, description="Current sale status")
    location_score: Optional[float] = Field(None, description="Overall location score")
    future_risk_tier: Optional[str] = Field(None, description="Future risk classification")
    overall_health: Optional[str] = Field(None, description="Overall property health")

class OwnershipAnalysis(BaseModel):
    current_owner: str = Field("unknown", description="Current registered owner")
    current_owner_id: Optional[str] = Field(None, description="Current registered owner ID")
    current_owner_name: Optional[str] = Field(None, description="Current registered owner name")
    previous_owners: List[str] = Field(default_factory=list, description="List of previous owners")
    ownership_duration: int = Field(0, description="Duration of current ownership in months")
    chain_of_title: List[str] = Field(default_factory=list, description="Chronological ownership chain")
    ownership_anomalies: List[str] = Field(default_factory=list, description="Detected anomalies in ownership")
    missing_registry_entries: bool = Field(False, description="Whether registry entries are missing")
    frequent_ownership_transfers: bool = Field(False, description="Whether frequent transfers were detected")

class FinancialAnalysis(BaseModel):
    active_loans: List[Dict[str, Any]] = Field(default_factory=list, description="Currently active loans")
    loan_history: List[Dict[str, Any]] = Field(default_factory=list, description="Historical loans")
    outstanding_liabilities: float = Field(0.0, description="Total outstanding liabilities")
    tax_history: List[Dict[str, Any]] = Field(default_factory=list, description="Tax payment history")
    tax_defaults: int = Field(0, description="Number of tax defaults")
    financial_health_score: float = Field(0.0, description="Calculated financial health score")

class LegalAnalysis(BaseModel):
    active_litigation: List[Dict[str, Any]] = Field(default_factory=list, description="Active court cases")
    historical_disputes: List[Dict[str, Any]] = Field(default_factory=list, description="Closed disputes")
    case_categories: List[str] = Field(default_factory=list, description="Types of cases involved")
    court_status: str = Field("clear", description="Current court status")
    legal_severity: str = Field("low", description="Severity of legal issues")
    legal_explanation: str = Field("", description="AI-generated explanation of legal status")

class DocumentationAnalysis(BaseModel):
    missing_documents: List[str] = Field(default_factory=list, description="Required documents that are missing")
    expired_documents: List[str] = Field(default_factory=list, description="Documents that have expired")
    invalid_documents: List[str] = Field(default_factory=list, description="Documents flagged as invalid")
    verification_status: str = Field("unknown", description="Overall documentation status")
    documentation_completeness_score: float = Field(0.0, description="Score based on available required docs")

class TimelineEvent(BaseModel):
    date: str = Field(..., description="ISO format date of the event")
    event_type: str = Field(..., description="Type of event (Registration, Loan, Tax, etc.)")
    description: str = Field(..., description="Description of the event")
    metadata: Dict[str, Any] = Field(default_factory=dict, description="Additional event context")

class VerificationSummary(BaseModel):
    verification_score: float = Field(0.0, description="Score out of 100")
    verification_status: str = Field("unknown", description="Verified, Partially Verified, or Verification Failed")
    owner_mismatch: bool = Field(False, description="Owner mismatch detected")
    duplicate_entries: bool = Field(False, description="Duplicate entries detected")
    registry_inconsistencies: bool = Field(False, description="Registry inconsistencies detected")
    loan_inconsistencies: bool = Field(False, description="Loan inconsistencies detected")
    tax_inconsistencies: bool = Field(False, description="Tax inconsistencies detected")
    document_inconsistencies: bool = Field(False, description="Document inconsistencies detected")

class RiskSummary(BaseModel):
    overall_risk_score: float = Field(0.0, description="Deterministic overall risk score")
    risk_tier: str = Field("Unknown", description="Low, Medium, High, Critical")
    ownership_risk: float = Field(0.0, description="Ownership risk sub-score")
    financial_risk: float = Field(0.0, description="Financial risk sub-score")
    legal_risk: float = Field(0.0, description="Legal risk sub-score")
    documentation_risk: float = Field(0.0, description="Documentation risk sub-score")
    location_risk: float = Field(0.0, description="Location risk sub-score")
    explanation: str = Field("", description="AI-generated explanation of the risk score")

class Recommendation(BaseModel):
    target_audience: str = Field(..., description="Buyer, Investor, Bank, or Legal Team")
    recommendation_text: str = Field(..., description="Deterministic or AI recommendation")
    citations: List[Dict[str, Any]] = Field(default_factory=list, description="Citations supporting the recommendation")

class PerformanceMetrics(BaseModel):
    retrieval_time_ms: float = 0.0
    deterministic_analysis_time_ms: float = 0.0
    llm_generation_time_ms: float = 0.0
    total_time_ms: float = 0.0

class PropertyIntelligenceReport(BaseModel):
    property_id: str
    generated_at: str
    summary: PropertySummary
    ownership: OwnershipAnalysis
    financial: FinancialAnalysis
    legal: LegalAnalysis
    documentation: DocumentationAnalysis
    timeline: List[TimelineEvent] = []
    verification: VerificationSummary
    risk: RiskSummary
    recommendations: List[Recommendation] = []
    ai_executive_summary: str = Field("", description="High-level AI summary of the property")
    performance: PerformanceMetrics = Field(default_factory=PerformanceMetrics)

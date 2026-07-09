import asyncio
from typing import List, Dict, Any
from app.schemas.intelligence import (
    Recommendation, PropertySummary, OwnershipAnalysis, FinancialAnalysis,
    LegalAnalysis, DocumentationAnalysis, VerificationSummary, RiskSummary
)
from app.rag.llm_factory import get_llm_provider
from app.rag.prompts import INTELLIGENCE_RECOMMENDATION_TEMPLATE
from langchain_core.prompts import PromptTemplate
from langchain_core.output_parsers import StrOutputParser
from app.core.logging import logger
from app.core.config import settings

class RuleContext:
    def __init__(self, property_id: str, summary: PropertySummary, ownership: OwnershipAnalysis, 
                 financial: FinancialAnalysis, legal: LegalAnalysis, docs: DocumentationAnalysis, 
                 verification: VerificationSummary, risk: RiskSummary):
        self.property_id = property_id
        self.summary = summary
        self.ownership = ownership
        self.financial = financial
        self.legal = legal
        self.docs = docs
        self.verification = verification
        self.risk = risk

class RecommendationRule:
    def evaluate(self, ctx: RuleContext) -> List[Recommendation]:
        raise NotImplementedError

class MissingSaleDeedRule(RecommendationRule):
    def evaluate(self, ctx: RuleContext) -> List[Recommendation]:
        recs = []
        is_missing = any("sale deed" in doc.lower() for doc in ctx.docs.missing_documents)
        if is_missing:
            recs.append(Recommendation(
                target_audience="Buyer",
                recommendation_text="Obtain and verify the Sale Deed before purchasing.",
                citations=[{
                    "dataset": "documents",
                    "record_id": "MISSING-SALE-DEED",
                    "property_id": ctx.property_id,
                    "source_file": "documents.json"
                }]
            ))
        return recs

class ActiveLoanRule(RecommendationRule):
    def evaluate(self, ctx: RuleContext) -> List[Recommendation]:
        recs = []
        if ctx.financial.active_loans:
            citations = []
            for loan in ctx.financial.active_loans:
                citations.append({
                    "dataset": "financial",
                    "record_id": loan.get("loan_id", "Unknown"),
                    "property_id": ctx.property_id,
                    "source_file": "financials.json"
                })
            
            recs.append(Recommendation(
                target_audience="Buyer",
                recommendation_text="Ensure the outstanding loan is cleared or transferred before registration.",
                citations=citations
            ))
            recs.append(Recommendation(
                target_audience="Bank",
                recommendation_text="Request updated No Objection Certificate before approving financing.",
                citations=citations
            ))
        return recs

class PendingTaxRule(RecommendationRule):
    def evaluate(self, ctx: RuleContext) -> List[Recommendation]:
        recs = []
        if ctx.financial.outstanding_liabilities > 0:
            citations = [{
                "dataset": "financial",
                "record_id": "TAX-LIABILITY",
                "property_id": ctx.property_id,
                "source_file": "financials.json"
            }]
            recs.append(Recommendation(
                target_audience="Buyer",
                recommendation_text="Clear pending property taxes before completing the transaction.",
                citations=citations
            ))
            recs.append(Recommendation(
                target_audience="Investor",
                recommendation_text="Factor outstanding tax liabilities into investment cost.",
                citations=citations
            ))
        return recs

class CourtDisputeRule(RecommendationRule):
    def evaluate(self, ctx: RuleContext) -> List[Recommendation]:
        recs = []
        if ctx.legal.active_litigation:
            citations = []
            for case in ctx.legal.active_litigation:
                citations.append({
                    "dataset": "legal",
                    "record_id": case.get("case_id", case.get("dispute_id", "Unknown")),
                    "property_id": ctx.property_id,
                    "source_file": "legal.json"
                })
            
            recs.append(Recommendation(
                target_audience="Legal Team",
                recommendation_text="Review active litigation before any ownership transfer.",
                citations=citations
            ))
            recs.append(Recommendation(
                target_audience="Buyer",
                recommendation_text="Delay purchase until legal disputes are resolved.",
                citations=citations
            ))
        return recs

class LowVerificationScoreRule(RecommendationRule):
    def evaluate(self, ctx: RuleContext) -> List[Recommendation]:
        recs = []
        if ctx.verification.verification_score < 60:
            citations = [{
                "dataset": "verification",
                "record_id": "LOW-SCORE",
                "property_id": ctx.property_id,
                "source_file": "deterministic"
            }]
            recs.append(Recommendation(
                target_audience="Buyer",
                recommendation_text="Conduct additional due diligence.",
                citations=citations
            ))
            recs.append(Recommendation(
                target_audience="Bank",
                recommendation_text="Require manual verification.",
                citations=citations
            ))
        return recs

class CriticalRiskRule(RecommendationRule):
    def evaluate(self, ctx: RuleContext) -> List[Recommendation]:
        recs = []
        if ctx.risk.risk_tier.lower() == "critical":
            citations = [{
                "dataset": "risk",
                "record_id": "CRITICAL-RISK",
                "property_id": ctx.property_id,
                "source_file": "deterministic"
            }]
            recs.append(Recommendation(
                target_audience="Investor",
                recommendation_text="High investment risk. Proceed only after resolving critical issues.",
                citations=citations
            ))
        return recs

class HighInvestmentPotentialRule(RecommendationRule):
    def evaluate(self, ctx: RuleContext) -> List[Recommendation]:
        recs = []
        if ctx.summary.location_score > 85 and ctx.risk.risk_tier.lower() == "low":
            citations = [{
                "dataset": "properties",
                "record_id": "HIGH-POTENTIAL",
                "property_id": ctx.property_id,
                "source_file": "properties.json"
            }]
            recs.append(Recommendation(
                target_audience="Investor",
                recommendation_text="Property demonstrates strong investment potential.",
                citations=citations
            ))
        return recs

class RecommendationRuleEngine:
    def __init__(self):
        self.rules: List[RecommendationRule] = [
            MissingSaleDeedRule(),
            ActiveLoanRule(),
            PendingTaxRule(),
            CourtDisputeRule(),
            LowVerificationScoreRule(),
            CriticalRiskRule(),
            HighInvestmentPotentialRule()
        ]

    def generate(self, property_id: str, summary: PropertySummary, ownership: OwnershipAnalysis, 
                 financial: FinancialAnalysis, legal: LegalAnalysis, docs: DocumentationAnalysis, 
                 verification: VerificationSummary, risk: RiskSummary) -> List[Recommendation]:
        """Generates recommendations strictly using deterministic rules."""
        ctx = RuleContext(property_id, summary, ownership, financial, legal, docs, verification, risk)
        
        raw_recs = []
        for rule in self.rules:
            try:
                res = rule.evaluate(ctx)
                if res:
                    raw_recs.extend(res)
            except Exception as e:
                logger.error(f"Rule evaluation failed: {e}")
                
        # Group by target audience
        grouped: Dict[str, Dict[str, Any]] = {}
        for r in raw_recs:
            if r.target_audience not in grouped:
                grouped[r.target_audience] = {"texts": [], "citations": []}
            grouped[r.target_audience]["texts"].append(r.recommendation_text)
            grouped[r.target_audience]["citations"].extend(r.citations)
            
        final_recs = []
        for aud, data in grouped.items():
            final_recs.append(Recommendation(
                target_audience=aud,
                recommendation_text=" ".join(data["texts"]),
                citations=data["citations"]
            ))
            
        # Ensure default audiences always exist
        existing_audiences = {r.target_audience for r in final_recs}
        default_audiences = ["Buyer", "Investor", "Bank", "Legal Team"]
        for aud in default_audiences:
            if aud not in existing_audiences:
                final_recs.append(Recommendation(
                    target_audience=aud,
                    recommendation_text="No specific recommendations at this time based on deterministic analysis.",
                    citations=[]
                ))
                
        return final_recs

class RecommendationService:
    @staticmethod
    async def generate_ai_explanation(context_str: str, base_recommendations: List[Recommendation]) -> List[Recommendation]:
        """
        Uses LLM to optionally rephrase deterministic recommendations.
        It must never add facts, change risk, or drop citations.
        """
        llm = get_llm_provider()
        prompt = PromptTemplate.from_template(
            "You are a Property Intelligence rephraser.\n"
            "Here are the deterministic recommendations generated by our engine:\n"
            "{base_recs}\n\n"
            "Rephrase the recommendations to sound more professional and natural for the {audience}.\n"
            "Do NOT add new facts. Do NOT change scores. Do NOT invent citations.\n"
            "Output ONLY the rephrased text."
        )
        chain = prompt | llm | StrOutputParser()
        
        async def _rephrase(rec: Recommendation) -> Recommendation:
            if "No specific recommendations" in rec.recommendation_text:
                return rec
            try:
                # We do not pass evidence context_str here because the LLM is only rephrasing the rule output,
                # ensuring it cannot invent facts or citations.
                res = await chain.ainvoke({
                    "audience": rec.target_audience,
                    "base_recs": rec.recommendation_text
                })
                # Preserve exact citations from deterministic engine
                return Recommendation(
                    target_audience=rec.target_audience,
                    recommendation_text=res.strip(),
                    citations=rec.citations
                )
            except Exception as e:
                logger.error(f"Failed to rephrase recommendation for {rec.target_audience}: {e}")
                return rec # Fallback to deterministic
                
        tasks = [_rephrase(rec) for rec in base_recommendations]
        return await asyncio.gather(*tasks)

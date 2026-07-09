import json
import asyncio
from datetime import datetime, timezone
from typing import Optional

from app.schemas.intelligence import PropertyIntelligenceReport
from app.services.intelligence.retrieval import IntelligenceRetrievalService
from app.services.intelligence.summary import PropertySummaryService
from app.services.intelligence.ownership import OwnershipAnalysisService
from app.services.intelligence.financial import FinancialAnalysisService
from app.services.intelligence.legal import LegalAnalysisService
from app.services.intelligence.documentation import DocumentationAnalysisService
from app.services.intelligence.timeline import TimelineAnalysisService
from app.services.intelligence.verification import VerificationService
from app.services.intelligence.risk import RiskAnalysisService
from app.services.intelligence.recommendation import RecommendationService

from app.rag.llm_factory import get_llm_provider
from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import PromptTemplate
from app.rag.prompts import INTELLIGENCE_SUMMARY_TEMPLATE
from app.core.logging import logger

class ReportGeneratorService:
    def __init__(self):
        self.retrieval_service = IntelligenceRetrievalService()
        self.llm = get_llm_provider()
        self.summary_prompt = PromptTemplate.from_template(INTELLIGENCE_SUMMARY_TEMPLATE)

    async def _generate_executive_summary_rephrase(self, deterministic_summary: str) -> str:
        """Rephrases the deterministic summary using AI. Adds no new facts."""
        prompt = PromptTemplate.from_template(
            "You are a professional real estate analyst.\n"
            "Here is the deterministic summary generated for a property:\n"
            "{base_summary}\n\n"
            "Rewrite this summary into a cohesive, professional Executive Summary paragraph.\n"
            "Do NOT add new facts. Do NOT change any scores or metrics.\n"
            "Output ONLY the rephrased paragraph."
        )
        chain = prompt | self.llm | StrOutputParser()
        try:
            return await chain.ainvoke({"base_summary": deterministic_summary})
        except Exception as e:
            logger.error(f"AI Summary rephrase failed: {e}")
            return deterministic_summary

    async def generate_report(self, property_id: str, include_timeline: bool = True, include_recommendations: bool = True, include_ai_summary: bool = True) -> PropertyIntelligenceReport:
        import time
        start_total = time.perf_counter()
        
        # 1. Concurrent Retrieval
        logger.info(f"Retrieving datasets for property {property_id}")
        start_retrieval = time.perf_counter()
        data_map = await self.retrieval_service.get_all_property_data(property_id)
        retrieval_time = (time.perf_counter() - start_retrieval) * 1000
        
        # 2. Run Deterministic Analyses
        start_det = time.perf_counter()
        properties_data = data_map.get("properties", [])
        if not properties_data:
            raise ValueError(f"Property {property_id} not found in dataset.")
            
        summary = PropertySummaryService.analyze(property_id, properties_data)
        ownership = OwnershipAnalysisService.analyze(data_map.get("ownership", []))
        financial = FinancialAnalysisService.analyze(data_map.get("financial", []))
        legal = LegalAnalysisService.analyze(data_map.get("legal", []))
        docs = DocumentationAnalysisService.analyze(data_map.get("documents", []))
        
        timeline = []
        if include_timeline:
            timeline = TimelineAnalysisService.analyze(data_map)
            
        verification = VerificationService.analyze(summary, ownership, financial, docs)
        risk = RiskAnalysisService.analyze(summary, ownership, financial, legal, docs)
        det_time = (time.perf_counter() - start_det) * 1000
        
        # 3. Assemble Context for AI
        context_parts = []
        for dataset, items in data_map.items():
            for item in items:
                content = item.get("_raw_content", "")
                if content:
                    context_parts.append(f"[{dataset.upper()} EVIDENCE]: {content}")
        context_str = "\n".join(context_parts)
        
        from app.services.intelligence.executive_summary import ExecutiveSummaryGenerator
        from app.services.intelligence.recommendation import RecommendationRuleEngine
        from app.core.config import settings

        # 4. Deterministic Engines
        start_llm = time.perf_counter()
        
        rule_engine = RecommendationRuleEngine()
        recs = rule_engine.generate(property_id, summary, ownership, financial, legal, docs, verification, risk)
        
        ai_summary = ExecutiveSummaryGenerator.generate(summary, ownership, financial, legal, docs, verification, risk)

        # 5. Optional AI Explanations
        if settings.enable_ai_explanations:
            if include_recommendations:
                try:
                    recs = await RecommendationService.generate_ai_explanation(context_str, recs)
                except Exception as e:
                    logger.error(f"AI Recommendation enhancement failed: {e}")
            
            if include_ai_summary:
                try:
                    ai_summary = await self._generate_executive_summary_rephrase(ai_summary)
                except Exception as e:
                    logger.error(f"AI Summary enhancement failed: {e}")
                    
        llm_time = (time.perf_counter() - start_llm) * 1000
        
        total_time = (time.perf_counter() - start_total) * 1000
        
        from app.schemas.intelligence import PerformanceMetrics
        perf = PerformanceMetrics(
            retrieval_time_ms=round(retrieval_time, 2),
            deterministic_analysis_time_ms=round(det_time, 2),
            llm_generation_time_ms=round(llm_time, 2),
            total_time_ms=round(total_time, 2)
        )
        
        # 5. Assemble Final Report
        report = PropertyIntelligenceReport(
            property_id=property_id,
            generated_at=datetime.now(timezone.utc).isoformat(),
            summary=summary,
            ownership=ownership,
            financial=financial,
            legal=legal,
            documentation=docs,
            timeline=timeline,
            verification=verification,
            risk=risk,
            recommendations=recs,
            ai_executive_summary=ai_summary,
            performance=perf
        )
        
        return report

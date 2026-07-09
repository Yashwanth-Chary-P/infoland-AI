import asyncio
from typing import List
from app.schemas.chat import CompareResponse, PropertyComparison
from app.services.intelligence.report_generator import ReportGeneratorService
from app.core.logging import logger

class PropertyComparisonService:
    """
    Deterministically compares multiple properties using their Property Intelligence Reports.
    """

    def __init__(self):
        self.report_generator = ReportGeneratorService()

    async def compare_properties(self, property_ids: List[str]) -> CompareResponse:
        logger.info(f"Comparing properties: {property_ids}")
        
        # Concurrently generate reports for all requested properties
        # Disable AI summary and recommendations during generation for raw speed/determinism
        tasks = [
            self.report_generator.generate_report(
                pid, 
                include_timeline=False, 
                include_recommendations=False, 
                include_ai_summary=False
            ) 
            for pid in property_ids
        ]
        
        reports = await asyncio.gather(*tasks, return_exceptions=True)
        
        comparisons = []
        for i, report in enumerate(reports):
            if isinstance(report, Exception):
                logger.error(f"Failed to generate report for {property_ids[i]} during comparison: {report}")
                continue
                
            # Extract key metrics deterministically
            comparisons.append(PropertyComparison(
                property_id=report.property_id,
                region=report.summary.region,
                area=report.summary.area,
                property_type=report.summary.property_type,
                estimated_value=report.summary.estimated_value,
                sale_status=report.summary.sale_status,
                location_score=report.summary.location_score,
                future_risk_tier=report.summary.future_risk_tier,
                overall_health=report.summary.overall_health,
                current_owner=report.ownership.current_owner,
                active_loans_count=len(report.financial.active_loans),
                active_litigations_count=len(report.legal.active_litigation),
                missing_documents_count=len(report.documentation.missing_documents),
                verification_status=report.verification.verification_status,
                overall_risk_score=report.risk.overall_risk_score,
                risk_tier=report.risk.risk_tier
            ))
            
        return CompareResponse(comparisons=comparisons)

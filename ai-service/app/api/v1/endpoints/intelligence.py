from fastapi import APIRouter, HTTPException, Query, Depends
from typing import Optional
from app.schemas.intelligence import PropertyIntelligenceReport
from app.services.intelligence.report_generator import ReportGeneratorService

router = APIRouter()

def get_report_generator() -> ReportGeneratorService:
    return ReportGeneratorService()

@router.get("/{property_id}/intelligence-report", response_model=PropertyIntelligenceReport)
async def get_property_intelligence_report(
    property_id: str,
    include_timeline: bool = Query(True, description="Include chronological timeline"),
    include_documents: bool = Query(True, description="Include document analysis"),
    include_recommendations: bool = Query(True, description="Include AI recommendations"),
    include_ai_summary: bool = Query(True, description="Include AI executive summary"),
    generator: ReportGeneratorService = Depends(get_report_generator)
):
    """
    Generate a comprehensive Property Intelligence Report.
    Retrieves data across all deterministic datasets and generates AI grounded recommendations.
    """
    try:
        report = await generator.generate_report(
            property_id=property_id,
            include_timeline=include_timeline,
            include_recommendations=include_recommendations,
            include_ai_summary=include_ai_summary
        )
        return report
    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Failed to generate intelligence report: {str(e)}")

from app.schemas.chat import CompareRequest, CompareResponse
from app.services.intelligence.comparison import PropertyComparisonService

def get_comparison_service() -> PropertyComparisonService:
    return PropertyComparisonService()

@router.post("/compare", response_model=CompareResponse)
async def compare_properties(
    request: CompareRequest,
    compare_service: PropertyComparisonService = Depends(get_comparison_service)
):
    """
    Compare multiple properties deterministically.
    """
    try:
        return await compare_service.compare_properties(request.properties)
    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Property comparison failed: {str(e)}")

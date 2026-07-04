from fastapi import APIRouter
from app.schemas.health_schema import HealthResponse, StatusResponse
from app.core.config import settings

router = APIRouter()


@router.get("/health", response_model=HealthResponse)
async def health_check() -> HealthResponse:
    """
    Basic health check endpoint.
    Used by orchestrators (e.g. Kubernetes) to determine if the container is running.
    """
    return HealthResponse(status="ok", message="AI Service is healthy")


@router.get("/status", response_model=StatusResponse)
async def system_status() -> StatusResponse:
    """
    Detailed status endpoint.
    Returns version and configuration environment details.
    """
    return StatusResponse(
        status="ok",
        version=settings.app_version,
        environment="development" if settings.debug else "production",
        debug_mode=settings.debug,
    )

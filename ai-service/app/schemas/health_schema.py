from pydantic import BaseModel


class HealthResponse(BaseModel):
    """Schema for basic health check response."""

    status: str
    message: str


class StatusResponse(BaseModel):
    """Schema for detailed service status response."""

    status: str
    version: str
    environment: str
    debug_mode: bool

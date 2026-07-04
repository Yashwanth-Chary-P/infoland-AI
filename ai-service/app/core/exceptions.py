from fastapi import Request, status
from fastapi.responses import JSONResponse
from app.core.logging import logger


class InfoLandException(Exception):
    """Base exception for all InfoLand AI specific exceptions."""

    def __init__(
        self, message: str, status_code: int = status.HTTP_500_INTERNAL_SERVER_ERROR
    ):
        self.message = message
        self.status_code = status_code
        super().__init__(self.message)


class DataUnavailableException(InfoLandException):
    """Raised when the Data Source Resolver fails to locate any valid source."""

    def __init__(
        self,
        message: str = "Requested data source is unavailable across all priority levels.",
    ):
        super().__init__(
            message=message, status_code=status.HTTP_503_SERVICE_UNAVAILABLE
        )


class DatasetNotFoundException(InfoLandException):
    """Raised when a specific dataset file cannot be found."""

    def __init__(self, dataset_name: str):
        super().__init__(
            message=f"Dataset not found: {dataset_name}",
            status_code=status.HTTP_404_NOT_FOUND,
        )


class ConfigurationException(InfoLandException):
    """Raised when an environment variable or config value is missing or invalid."""

    def __init__(self, message: str):
        super().__init__(
            message=message, status_code=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


async def global_exception_handler(request: Request, exc: Exception):
    """
    Catches all unhandled exceptions, logs them securely without exposing
    the stack trace to the client, and returns a standardized JSON response.
    """
    logger.critical(
        f"Unhandled server error at {request.url.path}: {str(exc)}", exc_info=True
    )
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={"detail": "Internal server error. Please try again later."},
    )


async def infoland_exception_handler(request: Request, exc: InfoLandException):
    """
    Handles custom application exceptions and returns formatted JSON.
    """
    logger.error(f"InfoLandException at {request.url.path}: {exc.message}")
    return JSONResponse(status_code=exc.status_code, content={"detail": exc.message})

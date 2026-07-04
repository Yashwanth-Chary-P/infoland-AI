import logging
import sys
from app.core.config import settings


def setup_logging():
    """
    Configures structured logging for the application based on the
    global log level defined in the environment configuration.
    """
    logger = logging.getLogger("infoland")

    # Don't add multiple handlers if already set up
    if logger.handlers:
        return logger

    numeric_level = getattr(logging, settings.log_level.upper(), logging.INFO)
    logger.setLevel(numeric_level)

    # Create console handler
    console_handler = logging.StreamHandler(sys.stdout)
    console_handler.setLevel(numeric_level)

    # Create formatter and add it to the handler
    formatter = logging.Formatter(
        "%(asctime)s | %(levelname)-8s | %(name)s:%(module)s:%(lineno)d | %(message)s",
        datefmt="%Y-%m-%d %H:%M:%S",
    )
    console_handler.setFormatter(formatter)

    logger.addHandler(console_handler)

    # Mute noisy third-party loggers if necessary
    logging.getLogger("uvicorn.access").setLevel(logging.WARNING)
    logging.getLogger("uvicorn.error").setLevel(logging.WARNING)
    logging.getLogger("httpx").setLevel(logging.WARNING)

    return logger


logger = setup_logging()

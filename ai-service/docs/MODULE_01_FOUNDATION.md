# Module 01: Foundation

This module establishes the core infrastructure for the InfoLand AI Service. It sets up the environment, the web framework, and the crucial mechanisms for loading data.

## Topics Covered

- **Python & Virtual Environment**: Strict isolation of dependencies using Python 3.10+ and `venv`.
- **FastAPI**: Implementation of the high-performance ASGI web framework.
- **Project Structure**: Scaffolding the directories (`routers`, `services`, `schemas`, etc.) to enforce separation of concerns.
- **Configuration**: Using Pydantic `BaseSettings` to manage environment variables safely.
- **Logging**: Implementing structured logging across all service layers.
- **Data Source Resolver**: The core service that implements the Data Access Strategy (Priority 1, Priority 2, Priority 3).
- **Dataset Loader**: Utilities to parse JSON dataset files robustly.
- **Health API**: A basic endpoint (`/health`) to verify service status.
- **Swagger**: Verification that OpenAPI documentation is automatically generating correctly.

## Deliverables
1. Initialized Python project with `requirements.txt`.
2. Standardized folder structure.
3. `main.py` configuring the FastAPI application.
4. `core/config.py` handling environment variables.
5. `services/data_resolver.py` capable of finding datasets.
6. A working `/health` endpoint.

## Acceptance Criteria
- [ ] The service can be started using `uvicorn main:app`.
- [ ] The swagger documentation is accessible at `/docs`.
- [ ] The `Data Source Resolver` correctly identifies when to use Priority 1 vs Priority 2.
- [ ] The API responds to the health check within 50ms.

## Validation Checklist
- Are all dependencies pinned in `requirements.txt`?
- Is there a `.env.example` file?
- Do all functions have type hints and docstrings?
- Are global configurations managed via Pydantic instead of `os.getenv`?

## Future Integration
Once the foundation is solid, this module provides the configuration and data-loading capabilities required by Module 02 (Vector Database) to begin ingesting the data.

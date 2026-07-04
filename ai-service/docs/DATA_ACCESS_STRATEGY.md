# Development Rules & Engineering Standards

To maintain a scalable, professional, and reliable AI Service, all development must strictly adhere to the following rules.

## Data Integrity & Access
1. **Single Source of Truth**: The Dataset Engine is the absolute single source of truth.
2. **Read-Only**: The AI Service must NEVER modify, mutate, or delete original datasets.
3. **No Hardcoding**: Never hardcode property information, user data, or dataset paths. Use the Data Source Resolver and environment variables.

## AI & Prompting Rules
4. **No Fabrication**: Never fabricate or hallucinate AI responses. If the data is missing, the AI must respond stating that the information is unavailable.
5. **Grounded Responses**: AI responses must always be strictly grounded in the retrieved context (RAG).
6. **Citation Requirement**: Where possible, the AI must cite the dataset or document it used to formulate its answer.

## Architectural Rules
7. **Separation of Concerns**: Strictly separate API routing (FastAPI routers), business logic (services), storage access (database), and AI orchestration layers.
8. **Dependency Injection**: Use FastAPI's `Depends()` for dependency injection to make components modular and easily testable.
9. **Reusable Services**: Write small, modular, reusable services. Never duplicate business logic.
10. **Backward Compatibility**: Always preserve backward compatibility for API endpoints. Version endpoints (e.g., `/api/v1/...`) if breaking changes are necessary.

## Code Quality & Style
11. **Keep Functions Small**: A single function should do exactly one thing. If a function exceeds 50 lines, reconsider its design.
12. **Mandatory Documentation**: Every endpoint must be documented using FastAPI's built-in OpenAPI integration.
13. **Mandatory Docstrings**: Every public function, class, and module must have a standard docstring.
14. **Production-Quality Code**: Treat every commit as if it is going straight to production. No placeholder code or "TODO" hacks in main branch.
15. **Type Safety**: Enforce strict Python type hints. Use Pydantic schemas for all API inputs and outputs.
16. **Fail Fast**: Validate inputs immediately. If a required parameter is missing or malformed, return a 400 Bad Request immediately.

## Error Handling & Logging
17. **Graceful Degradation**: If a non-critical component fails, the service should still operate in a degraded state rather than crashing completely.
18. **No Silent Failures**: Catch specific exceptions, log them with appropriate severity, and return standardized HTTP error responses.
19. **Secure Logging**: Never log PII (Personally Identifiable Information), passwords, or API keys.

## Testing & Review
20. **Test Coverage**: New features must include corresponding unit tests.
21. **Code Review**: All code must be reviewed by another architect/developer before merging into the main branch.

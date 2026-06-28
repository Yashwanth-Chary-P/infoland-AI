# Backend Phase 2 – Engineering Playbook & Guidelines

## 1. Project Overview
Backend Phase 2 implements the InfoLand AI Verification and Risk ecosystems. It consumes data from the Dataset Engine (single source of truth) and exposes robust APIs to power intelligence dashboards.

## 2. Backend Architecture
The backend strictly follows a layered REST architecture:
- **Routes**: Define HTTP endpoints, attach middleware and validators.
- **Controllers**: Handle HTTP requests/responses, extract parameters, send JSON output. **NO BUSINESS LOGIC HERE.**
- **Services**: Contain all core business logic, integrations, and orchestration.
- **Repositories**: Handle all MongoDB data access operations. Abstract database complexity.

## 3. Folder Structure
```text
backend/
├── src/
│   ├── routes/
│   ├── controllers/
│   ├── services/
│   ├── repositories/
│   ├── models/
│   ├── validators/
│   ├── middleware/
│   └── utils/
└── docs/
    └── backend-phase2/
        ├── PROMPTS/
        ├── MODULES/
        └── REPORTS/
```

## 4. Coding Standards
- Use modern JavaScript (ES Modules, async/await).
- Use clear, descriptive variable names.
- Document complex logic with inline comments.

## 5. Repository Pattern Standards
- Repositories are the only layer allowed to import Mongoose models.
- Methods should return plain JS objects (`.lean()`) for read operations.
- Avoid N+1 query problems.

## 6. Controller Standards
- Must only parse requests and return `apiResponse` formatted responses.
- Delegate all logic to services.
- Ensure proper HTTP status codes (200, 400, 404, 500).

## 7. Service Standards
- Services should be stateless.
- Compute all derived fields here (Computed Backend Fields). Do not assume they exist in MongoDB.
- Separate logic into modular, testable private methods where necessary.

## 8. Validator Standards
- Use Joi or the existing validation framework for all incoming data.
- Centralize schema definitions in `src/validators/`.

## 9. Error Handling Standards
- Use centralized error handling via `asyncWrapper` and custom error classes (e.g., `http-errors`).
- Never expose stack traces in production responses.

## 10. Logging Standards
- Use Winston (or the project's default logger) for critical errors and service transitions.
- Do not use `console.log` for production logic.

## 11. MongoDB Standards
- Inspect the database before writing code.
- Assume missing fields could occur; handle nulls/undefined gracefully.
- Ensure proper indexing for frequently queried fields.

## 12. Swagger Standards
- Every endpoint must have complete OpenAPI/Swagger documentation.
- Use **real MongoDB examples** (never fabricated data).
- Clearly denote Computed Backend Fields vs. Database Fields.

## 13. Documentation Standards
- Keep documentation Markdown compliant.
- Generate Module Plans and Reports alongside implementation.

## 14. Testing & Regression Standards
- Write unit tests for services.
- Run integration tests to ensure existing APIs are unbroken.
- Validate manually with real property IDs.

## 15. Performance Standards
- Minimize database trips.
- Use `Promise.all` for parallel independent queries.
- Use MongoDB aggregation pipelines for complex reporting (e.g., Module 8).

## 16. Security Standards
- Do not log sensitive user data.
- Ensure validation middleware runs before controllers.

## 17. Git Standards
- Commit only after successful local completion and verification.
- Use conventional commits (e.g., `feat(verification): implement module 1`).
- **DO NOT PUSH** to GitHub until the entire module is verified.

## 18. Verification Standards
- Datasets are the single source of truth.
- Verify against release reports (`dataset_summary.json`, etc.).
- If discrepancies exist between DB and Dataset Engine docs, STOP and resolve.

## 19. Lessons Learned From Phase 1
- Never assume fields.
- Never assume IDs.
- Never fabricate Swagger examples.
- Never hardcode statistics.
- Never duplicate business logic.
- Never place business logic inside controllers.
- Always inspect MongoDB first.
- Always inspect Dataset Engine first.
- Always verify against release reports.
- Always update Swagger with implementation.
- Always generate documentation alongside implementation.
- Always perform regression testing.
- Never break existing APIs.
- Never push code without verification.

## 20. Definition of Done
- Code implemented per architecture.
- Tests pass.
- Swagger updated.
- Documentation generated.
- No existing APIs broken.
- Report Template filled out.
- Local Git commit created.

# AI Coding Assistant Rules

Before writing any code:

1. Inspect MongoDB collections, indexes, relationships, field names and sample documents.
2. Inspect Dataset Engine documentation.
3. Inspect Dataset Engine Release Reports.
4. Inspect the existing backend implementation.
5. Never assume schemas, IDs, enums or workflows.
6. Never fabricate Swagger examples.
7. Never hardcode statistics.
8. Never duplicate business logic.
9. Never modify existing architecture.
10. Never break existing APIs.
11. Always update Swagger together with implementation.
12. Always update documentation together with implementation.
13. Always run regression tests.
14. Always verify against MongoDB before Dataset Engine.
15. Release Reports are verification baselines only.
16. Never push to GitHub.

---

# Definition of Done

A module is complete only if:

- Architecture preserved
- MongoDB inspected
- Dataset Engine inspected
- Release Reports verified
- Swagger updated
- Documentation completed
- Unit Tests passed
- Integration Tests passed
- Regression Tests passed
- Existing APIs unaffected
- Report completed
- Local Git commit created
- No GitHub push

## Standard Module Architecture

Every Backend Phase 2 module shall expose

1. Detailed Endpoints

2. Validation Endpoint

3. Summary Endpoint

4. Statistics Endpoint

Each module is the single source of truth for its domain.

Future modules must consume previous modules rather than querying domain collections directly.

All values must be computed dynamically from MongoDB.

Never hardcode Dataset Engine statistics.

Separate Database Fields from Computed Backend Fields.

Never expose MongoDB internal fields unless explicitly required.


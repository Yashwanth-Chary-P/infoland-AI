# Development & Contributor Guide

## Project Structure
- Source code lives in `src/`.
- Docs live in `docs/`.
- All environment variables are stored in `.env`.

## Naming Conventions
- **Files**: Use `camelCase.type.js` (e.g., `owner.controller.js`, `property.repository.js`).
- **Variables**: `camelCase` for instances, `PascalCase` for classes.
- **Constants**: `UPPER_SNAKE_CASE` (e.g., `CANONICAL_DOCUMENT_TYPES`).

## Branch Strategy
- `main`: Production-ready code.
- `backend-phase2`: Active development branch for Phase 2 backend features.

## Commit Message Convention
Follow Conventional Commits:
- `feat(module): description` for new features.
- `fix(module): description` for bug fixes.
- `docs: description` for documentation changes.
- `refactor: description` for code restructuring.

## Layer Responsibilities
- **Controllers**: Express HTTP parsing and mapping. No logic.
- **Services**: The Brain. Performs logic, computations, array filtering.
- **Repositories**: MongoDB interactions ONLY. Returns raw DB objects or Mongoose docs via `.lean()`.

## Repository Rules
- Do NOT perform complex MongoDB aggregation pipelines (`$lookup`) unless strictly required for performance, as they couple domains. Prefer fetching collections in parallel and combining in the Service layer.

## Swagger Rules
- All new routes must be annotated inside the `.routes.js` file.
- Clearly differentiate `Database Fields` vs `Computed Backend Fields` in parameter/response descriptions.
- Supply real examples (e.g., `PROP-KOK-000041`).

## MongoDB Rules
- Never fabricate fields. Always adhere strictly to the Dataset Engine schema.
- Internal fields (`_id`, `__v`) must be stripped before being returned to the frontend.

## Validation Rules
- All IDs (`propertyId`) must be validated.
- Services should throw explicitly with `.statusCode = 404` for missing records.

## Testing Strategy
- Create local node scripts (e.g. `test_module_6.js`) during development.
- Target edge case properties (e.g., active disputes, missing documents) to validate dynamic computed logic.

## Code Review Checklist
- Does this bypass the Service Layer? (If yes, reject).
- Does this introduce N+1 queries? (If yes, reject).
- Does this store computed states in the DB? (If yes, reject).
- Are internal DB fields leaking? (If yes, reject).

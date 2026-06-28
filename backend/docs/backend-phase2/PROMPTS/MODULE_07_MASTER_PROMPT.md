# Module 7 Master Prompt: Risk Assessment Engine

## Objective
Implement **ONLY Backend Phase 2 – Module 7 (Risk Assessment Engine)**. 

## Module Scope
- Rule-based risk engine
- Risk score
- Risk level
- Risk factors
- Explainable deductions
- Recommendations

## Inter-Module Dependencies
Consumes APIs/Services from:
- Module 2 (Document Verification)
- Module 3 (Ownership & Registry)
- Module 4 (Financial Verification)
- Module 5 (Legal Verification)
- Module 6 (Location Intelligence)

**CRITICAL RULE:**
- No ML.
- No AI.
- Completely deterministic rule-based algorithms.

## MongoDB & Dataset Engine Inspection Rules
- Inspect MongoDB collections, indexes, relationships, and field names before coding.
- Verify against Dataset Engine `FIELD_REFERENCE.md` and release reports.
- Never assume field existence.

## Release Report Verification
- Do not hardcode values from `release/reports/`.
- Compute everything dynamically from MongoDB and compare with reports.

## Architecture Rules
- Strictly adhere to Routes -> Controllers -> Services -> Repositories -> MongoDB.

## Repository, Controller, Service & Validation Rules
- Follow existing patterns.
- Do not duplicate business logic.
- Validate inputs using centralized validation.
- Avoid N+1 queries; use `Promise.all`.

## Swagger Requirements
- Update Swagger professionally with summary, descriptions, tags, and request/response schemas.
- Use **real MongoDB examples**.
- Clearly document Computed Backend Fields.

## Testing & Regression
- Run unit/integration tests.
- Ensure no existing Phase 1 endpoint is broken.

## Final Verification Checklist
- [ ] Architecture preserved
- [ ] MongoDB & Dataset Engine inspected
- [ ] Real MongoDB examples used in Swagger
- [ ] Documentation completed
- [ ] Unit & regression tests passed
- [ ] Local Git commit created
- [ ] No GitHub push performed

## Git Rules
- Local commit only (`feat(verification): implement backend phase 2 module 7`).
- DO NOT push.

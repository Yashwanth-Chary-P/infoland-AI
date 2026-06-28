# Module 6 Master Prompt: Location Intelligence Engine

## Objective
Implement **ONLY Backend Phase 2 – Module 6 (Location Intelligence Engine)**. 

## Module Scope
- Location scores
- Nearby POIs
- Accessibility
- Region intelligence
- Future development indicators
- Property surroundings

## Collections
- `location_scores`
- `synthetic_pois`
- Related location datasets (e.g. from `master_properties`)

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
- Local commit only (`feat(verification): implement backend phase 2 module 6`).
- DO NOT push.

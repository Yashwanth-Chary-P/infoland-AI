# Module 1 Master Prompt: Verification Foundation Engine

## Objective
Implement **ONLY Backend Phase 2 – Module 1 (Verification Foundation Engine)**. Do NOT implement any functionality from Modules 2–8.

## Module Scope
- Verification framework
- Verification signals
- Verification workflow
- Common verification utilities
- Shared verification services

## Collections
- `property_profiles`
- `property_metadata`
- `property_health_summary`
- `master_properties`

## MongoDB & Dataset Engine Inspection Rules
- Inspect MongoDB collections, indexes, relationships, and field names before coding.
- Verify against Dataset Engine `FIELD_REFERENCE.md` and release reports.
- Never assume field existence.

## Release Report Verification
- Do not hardcode values from `release/reports/`.
- Compute everything dynamically from MongoDB and compare with reports.

## Architecture Rules
- Strictly adhere to Routes -> Controllers -> Services -> Repositories -> MongoDB.
- Controllers: HTTP only.
- Services: Business logic only.

## MongoDB Inspection Checklist

Before implementation verify:

- Collection names
- Field names
- Field data types
- Required fields
- Relationships
- Indexes
- Existing enums
- Existing workflows
- Sample property documents
- Sample health summary documents

Never assume any field exists.

If uncertainty exists,

inspect MongoDB first.

## Repository, Controller, Service & Validation Rules
- Follow existing patterns.
- Do not duplicate business logic.
- Validate `propertyId` using centralized validation.
- Avoid N+1 queries; use `Promise.all`.

## Swagger Requirements
- Update Swagger professionally with summary, descriptions, tags, and request/response schemas.
- Use **real MongoDB examples**.
- Clearly document Computed Backend Fields.

## Swagger Quality Requirements

Every endpoint must contain

- Summary
- Description
- Tags
- Parameters
- Parameter descriptions
- Request schema
- Response schema
- Error schema
- 200 Example
- 400 Example
- 404 Example
- 500 Example
- Real MongoDB examples
- Computed Backend Fields documentation

## Testing & Regression
- Run unit/integration tests.
- Ensure no existing Phase 1 endpoint is broken.

## Dataset Verification

After implementation verify

- Property Counts
- Collection Counts
- Workflow Distribution
- Relationships
- Sample Property
- Sample Health Summary
- Data Integrity

Compare the computed backend results with

- MongoDB
- Dataset Engine
- Release Reports

If any mismatch exists,

STOP.

Document the mismatch.

Do not continue.

## Final Verification Checklist
- [ ] Architecture preserved
- [ ] MongoDB & Dataset Engine inspected
- [ ] Real MongoDB examples used in Swagger
- [ ] Documentation completed
- [ ] Unit & regression tests passed
- [ ] Local Git commit created
- [ ] No GitHub push performed

## Git Rules
- Local commit only (`feat(verification): implement backend phase 2 module 1`).
- DO NOT push.

## Self Audit

Before declaring Module 1 complete

Review every instruction in this document.

Verify every requirement has been implemented.

If anything is partially implemented,

fix it before reporting completion.

Do not claim completion until the self audit passes.

---

## Definition of Done

Module 1 is complete only if

- All endpoints implemented
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

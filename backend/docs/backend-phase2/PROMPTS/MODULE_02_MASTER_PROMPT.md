# Module 2 Master Prompt: Document Verification Engine

## Objective
Implement **ONLY Backend Phase 2 – Module 2 (Document Verification Engine)**. 

## Module Scope
- Available documents
- Missing documents
- Expired documents
- Mandatory document validation
- Document completeness
- Document verification summary

## Repository Strategy

Use `documents_all` as the primary repository.

Only access the individual document collections when detailed document information is required.

Do not perform unnecessary queries against all document collections.

Use Promise.all only when multiple independent lookups are required.

Prevent N+1 query patterns.

## Collections
- `documents_all`
- All 18 document collections (e.g. `sale_deeds`, `mother_deeds`, etc.)

## MongoDB & Dataset Engine Inspection Rules
- Inspect MongoDB collections, indexes, relationships, and field names before coding.
- Verify against Dataset Engine `FIELD_REFERENCE.md` and release reports.
- Never assume field existence.

## Release Report Verification
- Do not hardcode values from `release/reports/` (e.g. `document_stats.json`).
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

## Response Design

Separate

Database Fields

from

Computed Backend Fields.

Never expose MongoDB internal fields

- _id
- __v
- createdAt
- updatedAt

unless explicitly required.

Expose only business-relevant information.

## Testing & Regression
- Run unit/integration tests.
- Ensure no existing Phase 1 endpoint is broken.

## Mandatory Document Rules

Determine mandatory documents from the Dataset Engine.

Never hardcode document names.

If mandatory document definitions change in the Dataset Engine, the backend must automatically reflect them.

Missing documents should be computed dynamically.

Expired documents should be computed dynamically.

Completeness percentage should be derived from MongoDB only.

## Final Verification Checklist
- [ ] Architecture preserved
- [ ] MongoDB & Dataset Engine inspected
- [ ] Real MongoDB examples used in Swagger
- [ ] Documentation completed
- [ ] Unit & regression tests passed
- [ ] Local Git commit created
- [ ] No GitHub push performed

## Git Rules
- Local commit only (`feat(verification): implement backend phase 2 module 2`).
- DO NOT push.

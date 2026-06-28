# Module 3 Master Prompt: Ownership & Registry Engine

## Objective
Implement **ONLY Backend Phase 2 – Module 3 (Ownership & Registry Engine)**. 

## Module Scope
- Current owner
- Ownership history
- Ownership timeline (historical timeline)
- Registry verification
- Transfer history
- Property registry validation

## Aggregated Endpoints

Implement two aggregated endpoints:

### GET /api/ownership/:propertyId/summary

Returns a concise ownership summary for frontend dashboards and future modules.

### GET /api/ownership/:propertyId/statistics

Returns ownership statistics computed dynamically from MongoDB.

Example response:

```json
{
  "property_id": "PROP-KOK-000001",
  "current_owner": "OWNER-000123",
  "total_owners": 3,
  "ownership_transfers": 2,
  "registry_status": "matched",
  "ownership_validation": "valid"
}
```

Never hardcode these values.

Always compute them dynamically from:

- owners
- ownership_events
- property_registry

## Ownership Rules

Determine

Current Owner

Ownership Chain

Transfer History

Registry Alignment

Timeline

Ownership Validation

Ownership Statistics

Never invent ownership records.

Never reorder historical events.

Always sort ownership history chronologically.

Never fabricate registry mismatches.

Compute validation dynamically.

## Collections
- `owners`
- `ownership_events`
- `property_registry`

## MongoDB & Dataset Engine Inspection Rules
- Inspect MongoDB collections, indexes, relationships, and field names before coding.
- Verify against Dataset Engine `FIELD_REFERENCE.md` and release reports.
- Never assume field existence.

## Release Report Verification
- Do not hardcode values from `release/reports/` (e.g. `owner_stats.json`).
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

## API Design

Separate

Database Fields

from

Computed Backend Fields.

Never expose

_id

__v

createdAt

updatedAt

Only expose business fields.

Responses must remain consistent with Modules 1 and 2.

## Testing & Regression
- Run unit/integration tests.
- Ensure no existing Phase 1 endpoint is broken.

## Ownership Verification

Verify

Current Owner

Historical Owners

Transfer Count

Registry Consistency

Timeline Order

Ownership Relationships

Ownership Statistics

Compare results with

MongoDB

Dataset Engine

Release Reports

Document any mismatch.

Do not continue if inconsistencies exist.

## Final Verification Checklist
- [ ] Architecture preserved
- [ ] MongoDB & Dataset Engine inspected
- [ ] Real MongoDB examples used in Swagger
- [ ] Documentation completed
- [ ] Unit & regression tests passed
- [ ] Local Git commit created
- [ ] No GitHub push performed

## Git Rules
- Local commit only (`feat(verification): implement backend phase 2 module 3`).
- DO NOT push.

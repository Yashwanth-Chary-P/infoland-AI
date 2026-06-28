# Module 1 Plan: Verification Foundation Engine

## Purpose
Provide the top-level entry point for assessing a property's verification health and establish the foundational signals for downstream modules.

## Business Objective
Expose verification signals and workflows so that future modules (Documents, Ownership, Financial, Legal) can integrate naturally. 

## Collections Used
- `property_profiles`
- `property_metadata`
- `property_health_summary`
- `master_properties`

## Dependencies
None. This is the foundational module.

## Expected APIs
- `GET /api/verification/:propertyId/status`
- `GET /api/verification/:propertyId/summary`
- `GET /api/verification/:propertyId/details`
- `GET /api/verification/:propertyId/signals`
- `GET /api/verification/:propertyId/workflow`

## Service & Repository Design
- **VerificationService**: Computes backend fields (progress, status, workflow mapping) and formats responses. Exposes foundational methods for retrieving signals (initially returning `pending` for unbuilt domains).
- **VerificationRepository**: Abstracts access to profile, metadata, and health summary collections.

## Swagger Coverage
- Complete schemas for all 5 endpoints.
- Detailed parameter definitions.

## Testing Strategy
- Unit test signal calculations.
- Integration test API responses for existing vs. missing properties.

## Verification Strategy
- Compare response counts against dataset engine JSONs.
- Ensure the structural schema matches dataset expectations.

## Performance Strategy

- Use Promise.all for independent queries.
- Avoid duplicate MongoDB queries.
- Reuse repository methods.
- Prevent N+1 query patterns.
- Only fetch required fields.

## Future Integration
- Modules 2-5 will consume and populate the signal fields exposed by this module.

## Dependencies for Future Modules

This module provides foundational verification services for

- Module 2
- Module 3
- Module 4
- Module 5
- Module 6
- Module 7
- Module 8

Future modules must reuse this module instead of duplicating logic.

# Module 3 Plan: Ownership & Registry Engine

## Purpose
Validate ownership records, historical transfers, and registry alignment for a property.

## Business Objective
Determine current owner, ownership history, transfer anomalies, and validate the property registry. Incorporates historical timeline.

## Collections Used
- `owners`
- `ownership_events`
- `property_registry`

## Collection Strategy

The Ownership Verification Engine is the single source of truth for all ownership-related verification.

Collections

owners

ownership_events

property_registry

The repository should retrieve ownership information efficiently using reusable methods.

Historical ownership should be constructed from ownership_events.

Current ownership should be determined from owners.

Registry validation should compare owners against property_registry.

Avoid duplicate queries.

Use Promise.all where independent queries exist.

Prevent N+1 query patterns.

## Dependencies
- Module 1 (Verification Foundation Engine)

## Expected APIs

- `GET /api/ownership/:propertyId/current`
- `GET /api/ownership/:propertyId/history`
- `GET /api/ownership/:propertyId/timeline`
- `GET /api/ownership/:propertyId/registry`
- `GET /api/ownership/:propertyId/validation`
- `GET /api/ownership/:propertyId/summary`
- `GET /api/ownership/:propertyId/statistics`

## Service & Repository Design
- **OwnershipService**: Computes chronological timeline, verifies valid transfer chains, and ensures property registry matches current owners.
- **OwnershipRepository**: Interacts with `owners`, `ownership_events`, and `property_registry`.

## Swagger Coverage
- Complete schemas for ownership endpoints.
- Detailed parameter definitions.

## Testing Strategy
- Unit test transfer history chain logic.
- Integration test API responses for existing vs. missing properties.

## Verification Strategy
- Compare response counts against dataset engine JSONs (`owner_stats.json`).
- Ensure the structural schema matches dataset expectations.

## Future Integration
- Module 7 & 8 will consume ownership validation signals to influence risk scores and the final report.

## Future Module Integration

Module 7 (Risk Engine)

Consumes

ownership validation

ownership inconsistencies

ownership chain

transfer history

Module 8 (Unified Report)

Consumes

ownership summary

ownership statistics

ownership validation

No future module should directly query

owners

ownership_events

property_registry

All ownership verification must pass through this module.

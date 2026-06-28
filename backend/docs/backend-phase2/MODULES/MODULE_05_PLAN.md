# Module 5 Plan: Legal Verification Engine

## Purpose
Assess the legal standing of a property by surfacing active or historical litigation.

## Business Objective
Provide legal verification signals focusing on court disputes and other legal encumbrances.

## Collections Used
- `court_disputes`

## Dependencies
- Module 1 (Verification Foundation Engine)

## Expected APIs
- `GET /api/legal/:propertyId/disputes`
- `GET /api/legal/:propertyId/summary`

## Service & Repository Design
- **LegalService**: Aggregates disputes by status and severity, and generates a legal health summary.
- **LegalRepository**: Interacts with the `court_disputes` collection.

## Swagger Coverage
- Complete schemas for legal endpoints.
- Detailed parameter definitions.

## Testing Strategy
- Unit test legal aggregation logic.
- Integration test API responses for properties with and without disputes.

## Verification Strategy
- Compare response counts against dataset engine JSONs (`court_dispute_stats.json`).
- Ensure the structural schema matches dataset expectations.

## Future Integration
- Module 7 & 8 will heavily weigh active legal disputes when generating the final risk score.

# Module 5 Plan: Legal and Historical Timeline Engine

## Purpose
Provide a canonical legal verification and ownership timeline engine for each property.

This module computes legal status, dispute context, ownership transfer flow, and historical event timelines as reusable backend outputs.

---

## Business Objective
Deliver legal and timeline intelligence that downstream modules consume without directly querying legal collections.

Module 6 must consume Module 5 outputs for final risk and unified assessment.

---

## Collections Used
- court_disputes
- ownership_events
- property_registry
- owners

---

## Collection Strategy
- court_disputes provides legal case status and court event context.
- ownership_events provides event-level ownership history and transfer signals.
- property_registry provides canonical registry anchors.
- owners provides owner identity linkage for timeline enrichment.

Repositories should expose reusable property-scoped read methods.

Use Promise.all where reads are independent.

Avoid duplicate queries and N+1 patterns.

---

## Dependencies
- Module 1
- Module 2
- Module 3
- Module 4

---

## Expected APIs
GET /api/ownership/:propertyId/timeline

GET /api/ownership/:propertyId/transfers

GET /api/ownership/:propertyId/history

GET /api/verification/:propertyId/legal

GET /api/verification/:propertyId/legal-summary

GET /api/verification/:propertyId/legal-statistics

---

## Service Responsibilities
Module 5 service should compute

- legal verification

- court case verification

- legal status

- legal summary

- ownership timeline

- transfer timeline

- historical events

- legal statistics

- timeline statistics

All outputs must be computed dynamically from MongoDB reads.

---

## Repository Responsibilities
Ownership and legal repositories should provide

- property-scoped legal record retrieval

- property-scoped ownership event retrieval

- reusable lightweight projections

---

## Computed Backend Fields
Document and verify

- legal_status
- legal_summary
- legal_risk_flags
- ownership_timeline
- transfer_timeline
- historical_events
- legal_statistics
- timeline_statistics

---

## Swagger Coverage
Every endpoint must include

- Summary
- Description
- Tags
- Parameters
- Response Schemas
- Error Schemas
- Real MongoDB-like examples
- Computed Backend Fields

---

## Testing Strategy
Run

- Unit Tests
- Integration Tests
- Regression Tests

Verify

- Legal status mapping
- Timeline ordering
- Transfer chain continuity
- Statistics integrity

---

## Dataset Verification
Compare dynamically against

- MongoDB data
- Dataset artifacts
- Release reports

Never compare against hardcoded constants.

---

## Release Report Verification
Reconcile

- dispute status counts
- timeline event counts
- ownership transfer counts

Document mismatches and resolutions.

---

## Performance Notes
- Parallelize legal and ownership fetches.
- Aggregate in memory after one read per collection.
- Keep timeline sort deterministic.

---

## Future Integration
Module 6 consumes

- legal_status
- legal_summary
- legal_risk_flags
- timeline_statistics

No downstream module should directly query court_disputes or ownership_events for final assessment workflows.

---

## Known Limitations
- Incomplete date fields can reduce timeline precision.
- Source status variance may require strict normalization rules.

---

## Lessons Learned
- Legal and historical computations are most reliable when event models are unified before aggregation.

# Module 5: Legal and Historical Timeline Engine

## Architecture
Module 5 provides the legal and ownership history source of truth for a property.

The engine centralizes court and ownership timeline computation so downstream modules do not directly query legal collections. It should be implemented as a service-first module with repository-backed reads and deterministic runtime computation.

Primary flow

1. Validate property input.
2. Query legal and ownership collections in parallel.
3. Normalize heterogeneous events into a unified timeline model.
4. Compute legal status, summary, and statistics.
5. Expose reusable outputs for Module 6.

## Collections
- court_disputes
- ownership_events
- property_registry
- owners

## Repository Strategy
- Reuse existing repositories where methods already exist.
- Add narrowly scoped repository methods only when required for legal timeline outputs.
- Fetch from court_disputes and ownership_events in parallel to reduce latency.
- Avoid N+1 access patterns by loading all property-scoped records once per request and aggregating in service layer.
- Keep repositories read-only for this module scope.

## Business Rules
- Legal verification must be computed dynamically from MongoDB collections.
- Court case verification must distinguish active, resolved, and unknown case states from real case status fields.
- Legal status should represent the strongest legal signal for a property.
- Legal summary should include concise legal outcome and open risk flags.
- Ownership timeline must order events chronologically using verified event date precedence.
- Transfer timeline must identify ownership transfer chain and detect missing handoff segments.
- Historical events must merge ownership and legal milestones into one timeline response.
- Legal statistics and timeline statistics must be derived at request time and never hardcoded.

## Expected APIs
Planned module routes under api ownership and legal domains

- GET /api/ownership/:propertyId/timeline
- GET /api/ownership/:propertyId/transfers
- GET /api/ownership/:propertyId/history
- GET /api/verification/:propertyId/legal
- GET /api/verification/:propertyId/legal-summary
- GET /api/verification/:propertyId/legal-statistics

## Computed Backend Fields
Computed at runtime and not stored in MongoDB

- legal_status
- legal_summary
- active_dispute_count
- resolved_dispute_count
- legal_risk_flags
- ownership_timeline
- transfer_timeline
- historical_events
- first_recorded_event_date
- latest_event_date
- transfer_count
- timeline_gap_count

## Swagger Requirements
- Define all Module 5 endpoints with summaries, descriptions, tags, and path parameter schemas.
- Separate raw database attributes from computed backend fields in response documentation.
- Provide 200, 400, 404, and 500 examples for each endpoint.
- Examples must be based on real MongoDB-compatible payload structures and real property id formats.
- Document legal status mapping rules and timeline ordering semantics.

## Testing Strategy
- Unit tests for legal status mapper, timeline merger, sorting, and statistics calculators.
- Integration tests for property-level end-to-end legal timeline responses.
- Regression tests to guarantee response compatibility with Modules 1 to 4 conventions.
- Edge-case tests for missing owner records, incomplete registry segments, and mixed dispute statuses.

## Dataset Verification
- Confirm court_disputes and ownership_events dataset fields align with repository projections.
- Validate date field quality and null handling strategy used by timeline ordering.
- Verify property_id consistency across property_registry and owners links.
- Ensure no computed field depends on fabricated or static constants.

## Release Report Verification
- Reconcile expected counts and status distributions against release report artifacts.
- Verify timeline event totals and dispute status totals match import summaries.
- Record mismatches with root-cause notes before release sign-off.

## Performance Notes
- Use Promise.all for legal and ownership reads.
- Normalize and sort timeline once per request.
- Avoid per-event database calls during timeline assembly.
- Keep response payload bounded with optional pagination strategy for very long timelines.

## Future Integration
- Module 6 must consume legal_status, legal_summary, legal_risk_flags, and timeline statistics from Module 5.
- Module 5 outputs should be treated as canonical legal context in final assessment workflows.

## Known Limitations
- Timeline quality depends on source event date completeness.
- Inconsistent upstream status labels may require controlled normalization rules.
- Historical sequencing can be partially ambiguous when multiple events share the same timestamp.

## Lessons Learned
- Legal and ownership signals are more reliable when normalized into one event model.
- A strict separation of database fields and computed fields improves API consistency.
- Early validation of date and status quality prevents unstable timeline outputs.

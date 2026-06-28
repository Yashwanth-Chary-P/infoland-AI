# Module 6: Location Intelligence and Final Assessment Engine

## Architecture
Module 6 is the final backend module for Phase 2. It consumes verified outputs from Modules 1 to 5 and combines them with location intelligence datasets to produce a unified property assessment.

Primary flow

1. Validate property input.
2. Read location and profile collections.
3. Ingest upstream verification outputs, including Module 5 legal context.
4. Compute risk indicators and final assessment metrics.
5. Return dashboard-ready summary and unified verification report.

## Collections
- location_scores
- synthetic_pois
- property_profiles
- property_health_summary
- documents_all
- owners
- loans
- tax_records
- court_disputes

## Repository Strategy
- Reuse existing repositories for documents, ownership, and financial collections.
- Add read-only location intelligence repository methods for location_scores and synthetic_pois.
- Execute independent collection reads in parallel.
- Prevent duplicate fetches by using one property-scoped data load per endpoint request.
- Keep aggregation and scoring logic in service layer, not repository layer.

## Business Rules
- Location intelligence must combine proximity, infrastructure, and quality signals from location_scores and synthetic_pois.
- Nearby POIs must be grouped by category and distance bands.
- Future risk indicators must include legal, financial, document, and location-derived signals.
- Risk assessment must expose both component scores and final weighted outcome.
- Unified verification report must summarize module-level verification outcomes in one response.
- Dashboard summary must be concise, deterministic, and suitable for frontend cards.
- Property assessment must expose final status and prioritized risk drivers.

## Expected APIs
Planned final module routes

- GET /api/verification/:propertyId/location-intelligence
- GET /api/verification/:propertyId/risk-assessment
- GET /api/verification/:propertyId/dashboard-summary
- GET /api/verification/:propertyId/unified-report
- GET /api/verification/:propertyId/final-assessment

## Computed Backend Fields
Computed at runtime and never persisted

- location_intelligence
- nearby_pois
- location_score_normalized
- future_risk_indicators
- document_risk_component
- ownership_risk_component
- financial_risk_component
- legal_risk_component
- location_risk_component
- composite_risk_score
- risk_level
- verification_confidence
- dashboard_summary
- final_assessment

## Swagger Requirements
- Document all final module endpoints with stable response schemas.
- Include computed field descriptions and score interpretation notes.
- Provide 200, 400, 404, and 500 examples for each endpoint.
- Ensure examples align with real payload shapes and property id formats.
- Document dependency relationship showing Module 6 consumption of Module 5 legal outputs.

## Testing Strategy
- Unit tests for risk aggregation, weighting, normalization, and assessment classification.
- Integration tests for final report composition with upstream module dependencies.
- Regression tests for response compatibility and deterministic score generation.
- Boundary tests for sparse location data and missing upstream module segments.

## Dataset Verification
- Verify index and schema expectations for location_scores and synthetic_pois.
- Validate joins by property_id across profile, health, and verification collections.
- Confirm documents_all, owners, loans, tax_records, and court_disputes compatibility with aggregation contracts.
- Ensure final scoring uses runtime data only and no hardcoded release values.

## Release Report Verification
- Reconcile assessment distributions against release summaries before rollout.
- Validate risk component counts and category distribution using import statistics.
- Record and resolve any mismatch between computed outputs and release artifacts.

## Performance Notes
- Load independent data sources concurrently.
- Cache intermediate module outputs per request scope only.
- Minimize repeated transformations by using normalized internal DTOs.
- Add pagination and result-size guards for POI-heavy properties.

## Future Integration
- Module 6 is the terminal backend module in Phase 2.
- Frontend consumers should use unified-report and dashboard-summary as primary integration surfaces.
- Any Phase 3 extension should build on Module 6 computed outputs instead of querying raw collections directly.

## Known Limitations
- Composite scoring quality depends on upstream module completeness.
- Sparse location datasets may reduce confidence for some properties.
- Weight tuning may require iterative calibration after production feedback.

## Lessons Learned
- Final assessment engines are more stable when all upstream modules expose standardized contracts.
- Explicit risk components improve explainability and stakeholder trust.
- Performance improves significantly when cross-collection reads are parallelized and normalized once.

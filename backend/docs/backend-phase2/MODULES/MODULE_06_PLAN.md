# Module 6 Plan: Location Intelligence and Final Assessment Engine

## Purpose
Deliver the final backend assessment module that combines location intelligence with outputs from Modules 1 to 5.

This module produces the unified verification report, dashboard summary, and final property assessment.

---

## Business Objective
Create a deterministic final assessment surface for frontend and platform consumers.

Module 6 is the terminal module in Backend Phase 2.

---

## Collections Used
- location_scores
- synthetic_pois
- property_profiles
- property_health_summary
- documents_all
- owners
- loans
- tax_records
- court_disputes

---

## Collection Strategy
- location_scores and synthetic_pois drive location intelligence.
- property_profiles and property_health_summary provide profile and health baseline.
- documents_all, owners, loans, tax_records, court_disputes provide cross-module verification context.

Use repository-level reusable reads and service-level aggregation.

Parallelize independent reads.

Avoid duplicate collection queries.

---

## Dependencies
- Module 1
- Module 2
- Module 3
- Module 4
- Module 5

---

## Expected APIs
GET /api/verification/:propertyId/location-intelligence

GET /api/verification/:propertyId/risk-assessment

GET /api/verification/:propertyId/dashboard-summary

GET /api/verification/:propertyId/unified-report

GET /api/verification/:propertyId/final-assessment

---

## Service Responsibilities
Module 6 service should compute

- location intelligence

- nearby POIs summary

- future risk indicators

- risk assessment

- unified verification report

- dashboard summary

- property final assessment

All values must be dynamically computed from runtime MongoDB reads and upstream module outputs.

---

## Repository Responsibilities
Repositories should provide

- property-scoped location score retrieval

- nearby POI retrieval

- profile and health retrieval

- reusable downstream verification data access

---

## Computed Backend Fields
Document and verify

- location_intelligence
- nearby_pois
- future_risk_indicators
- risk_components
- composite_risk_score
- risk_level
- verification_confidence
- dashboard_summary
- unified_verification_report
- final_assessment

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
- Score interpretation notes

---

## Testing Strategy
Run

- Unit Tests
- Integration Tests
- Regression Tests

Verify

- score normalization
- risk aggregation
- unified report composition
- deterministic final assessment

---

## Dataset Verification
Compare dynamically against

- MongoDB data
- Dataset artifacts
- Release reports

Never use hardcoded score outputs.

---

## Release Report Verification
Reconcile

- assessment distribution
- risk category counts
- module dependency coverage

Document all mismatches before release sign-off.

---

## Performance Notes
- Fetch independent collections in parallel.
- Normalize DTOs once and reuse through computation pipeline.
- Guard against large POI payload expansion.

---

## Future Integration
Module 6 is the final backend module for Phase 2 and the primary integration target for frontend dashboards and consolidated verification views.

---

## Known Limitations
- Sparse data in one input domain can lower confidence scoring.
- Weight tuning for risk components may evolve after production calibration.

---

## Lessons Learned
- Explainable risk components increase confidence in final assessment decisions.

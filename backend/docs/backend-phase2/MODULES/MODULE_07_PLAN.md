# Module 7 Plan: Risk Assessment Engine

## Purpose
Evaluate and quantify property risk through a deterministic, rule-based scoring engine. 

## Business Objective
Calculate a definitive risk score and risk level (e.g., High, Medium, Low), itemize explicit risk factors with explainable deductions, and generate actionable recommendations.

## Collections Used
- Consumes aggregated data from other domain repositories/services (Documents, Owners, Loans, Tax, Disputes).

## Dependencies
- Module 2 (Documents)
- Module 3 (Ownership)
- Module 4 (Financial)
- Module 5 (Legal)
- Module 6 (Location)

## Expected APIs
- `GET /api/risk/:propertyId/score`
- `GET /api/risk/:propertyId/factors`
- `GET /api/risk/:propertyId/recommendations`
- `GET /api/risk/:propertyId/summary`

## Service & Repository Design
- **RiskService**: Integrates outputs from `DocumentService`, `OwnershipService`, `FinancialService`, `LegalService`, and `LocationService`. Applies a hardcoded, deterministic ruleset to deduce points and assign risk tiers. No ML/AI allowed.
- **RiskRepository**: Minor usage; mostly aggregates from other repositories if needed, but primarily driven by the Service layer orchestrating cross-domain checks.

## Swagger Coverage
- Complete schemas for risk endpoints.
- Detailed parameter definitions outlining the deterministic nature of the score.

## Testing Strategy
- Unit test the deterministic rule engine thoroughly using mock data.
- Integration test API responses for edge cases (e.g., a property with max deductions vs. zero deductions).

## Verification Strategy
- Compare final scoring outputs across a diverse set of properties to ensure consistency and explainability.

## Future Integration
- Module 8 will wrap these risk scores into the final unified dashboard report.

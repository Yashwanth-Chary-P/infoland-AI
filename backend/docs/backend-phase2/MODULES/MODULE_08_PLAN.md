# Module 8 Plan: Unified Report & Dashboard Engine

## Purpose
Generate unified verification reports and power dashboard analytics using high-performance database queries.

## Business Objective
Provide dashboard APIs, regional analytics, risk statistics, and an export-ready unified verification report for any given property.

## Collections Used
- All major domain collections (`master_properties`, `owners`, `documents_all`, `court_disputes`, `loans`, `tax_records`, `location_scores`).

## Dependencies
- All prior modules.

## Expected APIs
- `GET /api/reports/verification/:propertyId`
- `GET /api/dashboard/analytics/region/:region`
- `GET /api/dashboard/analytics/risk`
- `GET /api/dashboard/analytics/verification`

## Service & Repository Design
- **ReportService**: Orchestrates the dashboard responses and final exportable verification report.
- **ReportRepository**: Uses complex **MongoDB aggregation pipelines** exclusively. No manual looping/merging in JS for the analytics APIs.

## Swagger Coverage
- Complete schemas for reporting and dashboard endpoints.
- Detailed parameter definitions.

## Testing Strategy
- Unit test aggregation pipeline performance and results mapping.
- Integration test API responses for complex dashboards.

## Verification Strategy
- Compare response counts against dataset engine JSONs (e.g. `dataset_summary.json`).
- Ensure the structural schema matches dataset expectations.

## Future Integration
- Acts as the final data provider for frontend clients rendering the application UI and exporting PDFs.

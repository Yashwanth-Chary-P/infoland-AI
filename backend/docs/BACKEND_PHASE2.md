# Backend Phase 2

## Overview
Backend Phase 2 transforms the foundational property APIs from Phase 1 into a dynamic, multi-dimensional verification engine. It computes real-time health, risk, and timeline metrics without storing redundant state in the database.

## Modules Summary

### Module 1: Verification Foundation
- **Purpose**: Establishes the core layout for property profiles and verification signals.
- **Collections**: `master_properties`, `property_profiles`, `property_metadata`, `property_health_summary`.
- **APIs**: `/api/verification/:id/status`, `/summary`, `/details`, `/signals`, `/workflow`.
- **Computed Fields**: `status`, `progress`.

### Module 2: Document Verification
- **Purpose**: Evaluates document completeness and identifies missing/expired documents.
- **Collections**: `documents_all`.
- **APIs**: `/api/documents/:propertyId/status`, `/completeness`, `/mandatory`, `/missing`, `/expired`, `/summary`, `/details`, `/statistics`.
- **Computed Fields**: `verification_state`, `completeness_percentage`.

### Module 3: Ownership & Registry
- **Purpose**: Tracks ownership transfer chains and registry mismatches.
- **Collections**: `owners`, `ownership_events`, `property_registry`.
- **APIs**: `/api/ownership/:propertyId/transfers`, `/current`, `/history`, `/registry`, `/mismatches`, `/summary`.
- **Computed Fields**: `transfers` (merged owners), `mismatch_flags`.

### Module 4: Financial Verification
- **Purpose**: Validates encumbrances and active property tax liabilities.
- **Collections**: `loans`, `tax_records`.
- **APIs**: `/api/financial/:propertyId/encumbrances`, `/validation`, `/summary`, `/statistics`.
- **Computed Fields**: `financial_state`, `loan_outstanding`, `pending_tax`.

### Module 5: Legal & Historical Timeline
- **Purpose**: Tracks active court disputes and builds a unified chronological history.
- **Collections**: `court_disputes`, `ownership_events`.
- **APIs**: `/api/verification/:propertyId/legal`, `/legal-summary`, `/legal-statistics`, `/legal-details`.
- **Computed Fields**: `active_dispute_count`, `timeline` (merged events).

### Module 6: Risk Assessment & Final Verification
- **Purpose**: Aggregates all preceding modules into a definitive risk score and recommendation.
- **Collections**: Consumes data exclusively via Service Layer integrations.
- **APIs**: `/api/assessment/:propertyId/risk-score`, `/risk-factors`, `/recommendation`, `/summary`, `/final-report`, `/dashboard`.
- **Computed Fields**: `risk_score`, `verification_grade`, `recommendation`, `confidence_level`.

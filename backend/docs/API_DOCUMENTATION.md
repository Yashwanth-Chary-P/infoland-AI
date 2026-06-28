# API Documentation Catalog

This document organizes the core endpoints exposed by the Infoland-AI Backend. For fully interactive definitions, parameter schemas, and response shapes, please use the Swagger UI (`http://localhost:5000/api-docs`).

## 1. Verification
Base Route: `/api/verification/:propertyId`
- `GET /status` - Retrieves foundational verification state.
- `GET /summary` - Retrieves high-level verification and health snapshot.
- `GET /details` - Detailed verification breakdown including signals and metadata.
- `GET /signals` - Property health signal flags.
- `GET /workflow` - Current verification workflow steps.

## 2. Documents
Base Route: `/api/documents/:propertyId`
- `GET /status` - Completeness status of documents.
- `GET /completeness` - Raw completeness percentage.
- `GET /mandatory` - List of system mandatory documents.
- `GET /missing` - Identifies missing required documents.
- `GET /expired` - Identifies expired document records.
- `GET /summary` - Aggregated count summary.
- `GET /details` - Full document payload.
- `GET /statistics` - Statistical breakdown of document status.

## 3. Ownership
Base Route: `/api/ownership/:propertyId`
- `GET /current` - Fetches the active owner.
- `GET /history` - Fetches all ownership transfer events.
- `GET /registry` - Fetches official government property registry details.
- `GET /mismatches` - Compares active owner against official registry to flag discrepancies.
- `GET /summary` - Overview of ownership history.
- `GET /transfers` - Chronological mapping of transfer events infused with owner details.

## 4. Financial
Base Route: `/api/financial/:propertyId`
- `GET /encumbrances` - Identifies active loans preventing sale.
- `GET /validation` - Validates tax and loan standings.
- `GET /summary` - Computes total outstanding debt across loans and taxes.
- `GET /statistics` - High-level metrics on paid vs pending financial records.

## 5. Legal
Base Route: `/api/verification/:propertyId`
- `GET /legal` - High level legal dispute status.
- `GET /legal-summary` - Summary of active legal risks.
- `GET /legal-statistics` - Dispute resolution rates.
- `GET /legal-details` - Provides the chronological unified timeline merging ownership transfers and court disputes.

## 6. Assessment
Base Route: `/api/assessment/:propertyId`
- `GET /risk-score` - Computes dynamic 0-100 risk score.
- `GET /risk-factors` - Identifies distinct severity-weighted risk items.
- `GET /recommendation` - Generates purchase recommendation (e.g., Safe, High Risk).
- `GET /summary` - Returns grade and confidence level.
- `GET /final-report` - Complete dossier of Modules 1-6.
- `GET /dashboard` - Single unified payload for frontend aggregation.

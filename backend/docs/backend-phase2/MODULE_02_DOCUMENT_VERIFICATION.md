# Module 2: Document Verification Engine

## Overview
The Document Verification Engine evaluates a property's document completeness dynamically. It queries the canonical `documents_all` MongoDB collection, avoiding N+1 queries across the 18 specific document type collections. It determines what documents are mandatory, missing, or expired based entirely on existing dataset schemas.

## Architecture
- **Repository Strategy**: Uses `documents_all` as the single canonical source of truth for all verification steps.
- **Service Layer**: Handles stripping out internal MongoDB fields (`_id`, `__v`) and computes values dynamically.
- **Backward Compatibility**: Phase 1 APIs (`/api/documents/:propertyId`) have been preserved alongside the new verification APIs.

## API Documentation
The following endpoints were added under `/api/documents/:propertyId`:
- `GET /status`: Returns `verification_state` (complete, incomplete, pending).
- `GET /completeness`: Returns `completeness_percentage`.
- `GET /mandatory`: Returns the fixed canonical universe of 18 `document_type`s based on Dataset Engine guidelines.
- `GET /missing`: Returns lightweight objects `[{ document_type: "...", status: "missing" }]`.
- `GET /expired`: Returns detailed info for expired documents.
- `GET /summary`: Aggregates the state, completeness, and counts of documents.
- `GET /details`: Full array of cleaned document records.
- `GET /statistics`: Returns total, available, missing, and expired counts along with completeness percentage.

## Data Source Strategy
- Dataset Engine configuration strictly sets the canonical list of documents to exactly 18 types.
- The `documents_all` collection is leveraged for all Module 2 queries.

## Performance
- Prevented N+1 queries by eliminating the need to poll individual `sale_deeds`, `khata_extracts`, etc. for high-level aggregated verifications.

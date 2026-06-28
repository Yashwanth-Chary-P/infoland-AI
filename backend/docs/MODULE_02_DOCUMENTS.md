# Module 2: Document Verification

## Overview
Module 2 is responsible for evaluating the completeness of a property's document portfolio. It maps available documents against a canonical list of required documents to identify missing and expired assets.

## Architecture
- **Routes:** `document.routes.js`
- **Controllers:** `document.controller.js`
- **Services:** `document.service.js`
- **Repositories:** `document.repository.js`

## Collections
- `documents_all`

## Business Rules
- Property must have 100% of mandatory documents to be considered `complete`.
- An absence of one or more documents sets state to `incomplete`.
- Missing documents are dynamically flagged for UI consumption.

## Computed Backend Fields
- `verification_state` (complete, incomplete, pending)
- `completeness_percentage` (0-100)
- `missing_documents`
- `expired_documents`

## Endpoints
- `GET /api/documents/:propertyId/status`
- `GET /api/documents/:propertyId/completeness`
- `GET /api/documents/:propertyId/mandatory`
- `GET /api/documents/:propertyId/missing`
- `GET /api/documents/:propertyId/expired`
- `GET /api/documents/:propertyId/summary`
- `GET /api/documents/:propertyId/details`
- `GET /api/documents/:propertyId/statistics`

## Future Integration
- Consumed by Module 6 (Assessment) to deduct risk points for missing and expired documents.

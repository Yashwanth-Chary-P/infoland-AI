# Module 2 Plan: Document Verification Engine

## Purpose
Assess the completeness, validity, and status of all legal and property documents associated with a property.

## Business Objective
Determine available, missing, and expired documents, validating against mandatory document requirements.

## Collections Used
- `documents_all`
- 18 document collections

## Collection Strategy

The primary source for document verification shall be `documents_all`.

The individual document collections (sale_deeds, mother_deeds, khata_certificates, etc.) are secondary sources and should only be queried when:

- detailed document information is requested,
- a document reference in `documents_all` requires expansion,
- verification of an aggregated record is necessary.

Avoid querying all 18 collections for every request.

The repository should prioritize `documents_all` to minimize database operations.

## Dependencies
- Module 1 (Verification Foundation Engine)

## Expected APIs

GET /api/documents/:propertyId/status

GET /api/documents/:propertyId/completeness

GET /api/documents/:propertyId/mandatory

GET /api/documents/:propertyId/missing

GET /api/documents/:propertyId/expired

GET /api/documents/:propertyId/summary

GET /api/documents/:propertyId/details

## Service & Repository Design
- **DocumentService**: Implements business logic for determining mandatory documents, verifying expirations, and generating the completeness summary.
- **DocumentRepository**: Fetches records from `documents_all` and the 18 specific document collections.

## Swagger Coverage
- Complete schemas for document endpoints.
- Detailed parameter definitions.

## Testing Strategy
- Unit test document completeness logic.
- Integration test API responses for existing vs. missing properties.

## Verification Strategy
- Compare response counts against dataset engine JSONs (`document_stats.json`).
- Ensure the structural schema matches dataset expectations.

## Future Integration
- Module 7 & 8 will consume the completeness summary to influence risk scores and the final report.

## Future Module Integration

Module 6 (Risk Assessment Engine)

Consumes

- missing documents

- expired documents

- completeness

- mandatory document verification

Module 8 (Unified Report Engine)

Consumes

- document summary

- document verification status

- document completeness

No future module should directly query the document collections.

All document-related information must flow through the Document Verification Engine.
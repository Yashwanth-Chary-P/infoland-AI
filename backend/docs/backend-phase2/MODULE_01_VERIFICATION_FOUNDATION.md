# Module 1: Verification Foundation Engine

## Overview
This module exposes the core Verification endpoints. It acts as the backbone for subsequent verification modules (Documents, Ownership, Financial, Legal) which will enrich the foundational state exposed here.

## Architecture
- **Routes**: `src/routes/verification.routes.js` – Defines endpoints and Swagger documentation.
- **Controllers**: `src/controllers/verification.controller.js` – Handles HTTP req/res lifecycle.
- **Services**: `src/services/verification.service.js` – Contains business logic for signals and state computation.
- **Repositories**: `src/repositories/verification.repository.js` – Data access layer fetching from Mongo collections in parallel.

## Collections Accessed
- `property_profiles`
- `property_metadata`
- `property_health_summary`
- `master_properties`

## Database Fields
- `property_id`
- `verification_workflow` (from `property_profiles`)

## Computed Backend Fields
- `status`: Derived foundational state (e.g., `pending` if profile exists, `unverified` otherwise).
- `progress`: Currently returns `null` as requested by business rules since it cannot be cleanly derived yet.
- `signals`: Object exposing `documents`, `ownership`, `financial`, `legal` states mapped to `pending`.

## API Documentation
The following endpoints are exposed:
- `GET /api/verification/:propertyId/status`: High-level verification status.
- `GET /api/verification/:propertyId/summary`: Summary including health stats.
- `GET /api/verification/:propertyId/details`: Comprehensive verification details including metadata, profile, and signals.
- `GET /api/verification/:propertyId/signals`: Domain-specific signals.
- `GET /api/verification/:propertyId/workflow`: Workflow mapping for frontend clients.

## Validation
Utilizes the centralized `propertyIdParamSchema` to ensure valid `propertyId` format before hitting the controller logic. 

## Testing and Verification
- Confirmed against MongoDB collections.
- Regression testing confirms Phase 1 APIs are not impacted.

## Future Integration
Modules 2-5 will integrate directly by enriching the specific signals returned in the `getVerificationSignals` and `getVerificationDetails` payloads.

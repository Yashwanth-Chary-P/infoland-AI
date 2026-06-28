# Module 1: Verification Foundation

## Overview
Module 1 establishes the foundational verification layout. It parses the base property datasets and sets up the preliminary verification workflow state, acting as the starting point for all downstream validations.

## Architecture
- **Routes:** `verification.routes.js`
- **Controllers:** `verification.controller.js`
- **Services:** `verification.service.js`
- **Repositories:** `verification.repository.js`

## Collections
- `master_properties`
- `property_profiles`
- `property_metadata`
- `property_health_summary`

## Business Rules
- Status defaults to `unverified`.
- Progress is computed dynamically based on workflow completeness.
- Exposes base "signals" (`documents`, `ownership`, `financial`, `legal`) in a `pending` state to be enriched by downstream modules.

## Computed Backend Fields
- `status`
- `progress`
- `workflow`
- `signals`

## Endpoints
- `GET /api/verification/:propertyId/status`
- `GET /api/verification/:propertyId/summary`
- `GET /api/verification/:propertyId/details`
- `GET /api/verification/:propertyId/signals`
- `GET /api/verification/:propertyId/workflow`

## Performance
- Fetches base property profile and health summaries using a unified `Promise.all` block.

## Future Integration
- Consumed by Module 6 (Assessment) to append foundational workflow states to the final verification dossier.

# Module 3: Ownership & Registry

## Overview
Module 3 tracks the chain of title. It provides APIs to chronologically view ownership transfers and actively flags mismatches between the current owner and the government registry.

## Architecture
- **Routes:** `owner.routes.js`, `ownership.routes.js`
- **Controllers:** `owner.controller.js`
- **Services:** `owner.service.js`
- **Repositories:** `owner.repository.js`

## Collections
- `owners`
- `ownership_events`
- `property_registry`

## Business Rules
- Compares the active `owner` against `property_registry` to compute mismatches.
- Transfers are returned chronologically by combining `ownership_events` and resolving `from_owner_id` / `to_owner_id`.

## Computed Backend Fields
- `mismatch_flags`
- `transfers` (aggregated timeline)

## Endpoints
- `GET /api/ownership/:propertyId/current`
- `GET /api/ownership/:propertyId/history`
- `GET /api/ownership/:propertyId/registry`
- `GET /api/ownership/:propertyId/mismatches`
- `GET /api/ownership/:propertyId/summary`
- `GET /api/ownership/:propertyId/transfers`

## Performance
- Prevents N+1 queries by fetching `ownership_events` and `owners` in bulk and mapping relationships in-memory using a dictionary.

## Future Integration
- Consumed by Module 5 (Legal Timeline) to construct a master chronological timeline.
- Consumed by Module 6 (Assessment) to deduct risk points for ownership mismatches.

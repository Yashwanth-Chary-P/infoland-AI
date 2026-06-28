# Module 5: Legal & Historical Timeline Engine

## Overview
Module 5 introduces the Legal & Historical Timeline Engine, which is responsible for computing the dynamic legal status of properties and constructing a unified chronological timeline combining ownership transfers and legal events (e.g., court disputes). 

This module adheres to a strict read-only architecture where dynamic legal fields are computed at runtime without duplicating data into new collections or triggering N+1 queries.

## Architecture
- **Routes:** Extends `verification.routes.js` to expose canonical legal APIs. Extends `ownership.routes.js` to expose ownership transfers.
- **Controllers:** `verification.controller.js` and `owner.controller.js` handle request mapping and response formatting.
- **Services:** `legal.service.js` introduced as the canonical engine for legal logic.
- **Repositories:** `legal.repository.js` interacts with the `court_disputes` collection. Reuse of `owner.repository.js` for `ownership_events`.

## Computed Fields
- `status`: Derived from `court_disputes`. Possible outputs: `clear`, `active_dispute`, `resolved_dispute`.
- `active_dispute_count`: Count of disputes not in `closed` or `resolved` status.
- `resolved_dispute_count`: Count of disputes in `closed` or `resolved` status.
- `legal_risk_flags`: Array of active dispute types/IDs.
- `legal_summary`: Human-readable summary of the property's legal health.
- `timeline`: Unified historical timeline combining normalized `ownership_events` and `court_disputes`, sorted chronologically in memory.

## Collections Utilized
1. `court_disputes`: Source of legal events.
2. `ownership_events`: Source of ownership transfer events.

## Endpoints
### Ownership
- `GET /api/ownership/:propertyId/transfers`: Returns continuous chain of ownership transfers.

### Legal Verification
- `GET /api/verification/:propertyId/legal`: Returns high-level legal status.
- `GET /api/verification/:propertyId/legal-summary`: Returns a concise summary of legal status and risk flags.
- `GET /api/verification/:propertyId/legal-statistics`: Returns statistical breakdown of past and present disputes.
- `GET /api/verification/:propertyId/legal-details`: Returns full details including the unified historical timeline.

## Performance Considerations
- Uses `Promise.all` to fetch collections in parallel.
- One database read per collection in `getLegalDetails` logic.
- Sorting of the unified timeline is performed once in memory.
- No N+1 queries.

## Known Limitations
- `CourtDispute` documents currently rely on the `createdAt` timestamp if an explicit event date is not provided in the dataset.
- Large timelines are not currently paginated, as properties typically have a bounded number of historical events.

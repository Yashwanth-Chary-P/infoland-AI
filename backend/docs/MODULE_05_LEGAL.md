# Module 5: Legal & Historical Timeline Engine

## Overview
Module 5 acts as the legal engine, tracking court disputes and merging them with the ownership timeline to provide a unified historical timeline of the property.

## Architecture
- **Routes:** `verification.routes.js`
- **Controllers:** `verification.controller.js`
- **Services:** `legal.service.js`
- **Repositories:** `legal.repository.js`

## Collections
- `court_disputes`
- `ownership_events` (via `owner.service.js`)

## Business Rules
- Statuses dynamically evaluate to `clear`, `active_dispute`, or `resolved_dispute`.
- Events are formatted and chronologically sorted in-memory.

## Computed Backend Fields
- `active_dispute_count`
- `resolved_dispute_count`
- `legal_risk_flags`
- `legal_summary`
- `timeline` (Unified chronological array)

## Endpoints
- `GET /api/verification/:propertyId/legal`
- `GET /api/verification/:propertyId/legal-summary`
- `GET /api/verification/:propertyId/legal-statistics`
- `GET /api/verification/:propertyId/legal-details`

## Performance
- Performs one database read per collection. Uses `Promise.all`. Sorts timeline completely in-memory.

## Future Integration
- Consumed by Module 6 (Assessment) to deduct significant risk points for active legal litigation.

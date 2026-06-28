# Module 3: Ownership & Registry Engine

## Overview
The Ownership & Registry Engine evaluates a property's current owner, verifies registry alignment, constructs chronological historical ownership timelines, and calculates ownership statistics. It exclusively uses `owners`, `ownership_events`, and `property_registry` collections, guaranteeing that future modules securely retrieve uniform ownership rules without duplicating database queries.

## Architecture
- **Repository Strategy**: Pulls concurrently from `owners`, `ownership_events`, and `property_registry` utilizing `Promise.all` wherever independent queries are needed.
- **Service Layer**: Ensures dynamic validations, chronological alignment, timeline normalization, and internal field stripping.
- **Backward Compatibility**: Preserved Phase 1 API `/api/ownership/history/:propertyId` exactly as is to guarantee uninterrupted frontend operations.

## API Documentation
The following endpoints were added under `/api/ownership/:propertyId`:
- `GET /current`: Returns the current active owner from `owners`.
- `GET /history`: Returns a cleaned list of ownership events from `ownership_events`.
- `GET /timeline`: Normalizes events into chronological blocks yielding `event_date`, `event_type`, `from_owner`, `to_owner`, and `document_reference`.
- `GET /registry`: Returns canonical property registry identifiers from `property_registry`.
- `GET /validation`: Compares ALL overlapping keys dynamically between the current owner (`owners`) and the registry (`property_registry`) and flags the ownership as `verified`, `mismatch`, or `pending`.
- `GET /summary`: Aggregates the `ownership_state`, `registry_status`, `current_owner`, `ownership_transfers`, and `total_owners`.
- `GET /statistics`: Reports metrics mirroring the dataset engine stats dynamically.

## Data Source Strategy
- **Current Owner**: Direct from `owners`.
- **Registry**: Direct from `property_registry`.
- **History & Timeline**: Direct from `ownership_events`, inherently preserving chronological sort orders.

## Performance
- Eliminates potential N+1 bottlenecks by pre-fetching unique owners from an aggregated `Set` extracted out of `ownership_events` during timeline normalizations.

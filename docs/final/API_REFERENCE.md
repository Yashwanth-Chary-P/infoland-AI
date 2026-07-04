# API Reference

The InfoLand AI backend exposes a RESTful API. Base URL: `http://localhost:5000/api/v1`

## 1. Properties
Endpoints for fetching geographical and metadata records for land plots.

### `GET /properties`
Fetches a paginated list of master properties. Used by the Explore Workspace.
*   **Query Params:** `page`, `limit`, `region`, `status`
*   **Response:** Array of GeoJSON properties with basic metadata.

### `GET /properties/:id`
Fetches a deep-populated profile for a single property. Used by the Property Intelligence Report.
*   **Path Param:** `id` (e.g., `PROP-KOK-000101`)
*   **Response:** Aggregated object containing `profile`, `ownership_history`, `documents`, `court_cases`, and `timeline`.

## 2. Analytics
Endpoints for fetching pre-aggregated business intelligence data.

### `GET /analytics/dashboard-stats`
Fetches high-level KPIs.
*   **Response:** `{ totalProperties, verifiedProperties, totalArea, activeCourtCases }`

### `GET /analytics/property-types`
Fetches grouping of properties by type. Used by Donut charts.
*   **Response:** `[{ _id: 'Residential', count: 450 }, ...]`

### `GET /analytics/verification-status`
Fetches verification pipeline status counts.
*   **Response:** `[{ _id: 'Verified', count: 320 }, ...]`

### `GET /analytics/recent-properties`
Fetches the 10 most recently added or modified properties for activity feeds.

## 3. Sub-Resources (Verification, Ownership, Documents, Timeline, Location)
Currently, sub-resources are returned as populated arrays within the `GET /properties/:id` endpoint via MongoDB `$lookup` aggregations to reduce network roundtrips. Future iterations may break these out into nested routes (e.g., `GET /properties/:id/documents`) if payload sizes become too large.

## 4. System
### `GET /health`
Validates that the Node.js event loop is unblocked and database connection is active.

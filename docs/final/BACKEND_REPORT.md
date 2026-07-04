# Backend Engineering Report

## Executive Summary
The InfoLand AI Backend (Node.js/Express) serves as the Single Source of Truth for the entire application. Designed over two core phases, it strictly follows a layered architecture (Repository -> Service -> Controller) to separate database interactions from business logic and HTTP transport.

---

## Phase 1: Core API & Database Architecture

Phase 1 focused on laying the foundation for data ingestion, validation, and standard RESTful interactions.

### MongoDB Models
We implemented normalized Mongoose schemas designed for read-heavy geospatial queries:
*   `MasterProperty`: The root record (contains Plot ID, geospatial coordinates, Area).
*   `PropertyProfile`: Metadata, verification status, and physical attributes.
*   `OwnershipHistory`: Array of past and current owners.
*   `Document`: Legal and government verification documents (RERA, HMDA).
*   `CourtCase`: Active and historical legal disputes attached to properties.
*   `PropertyTimeline`: Historical events related to the land.

### Repository Pattern
Direct `Model.find()` calls were banned inside controllers. Instead, all database interactions happen in repository files (e.g., `property.repository.js`). This made the codebase highly testable and decoupled the business logic from Mongoose.

### Validation & Documentation
*   **Joi:** Implemented strict schema validation on all incoming request parameters and bodies.
*   **Swagger/OpenAPI:** Generated comprehensive API documentation (`/api-docs`) to facilitate seamless frontend integration.

---

## Phase 2: Analytics & Aggregation Engine

Phase 2 focused on transforming raw property data into actionable business intelligence.

### Aggregation APIs
We bypassed standard Mongoose populate methods in favor of high-performance MongoDB Aggregation Pipelines (`$match`, `$group`, `$lookup`, `$project`).

### Completed APIs
1.  **`/api/v1/analytics/dashboard-stats`**: Calculates total properties, verified properties, total area, and active court cases.
2.  **`/api/v1/analytics/property-types`**: Groups properties by type (Residential, Commercial, Agricultural) for donut chart rendering.
3.  **`/api/v1/analytics/verification-status`**: Aggregates properties by verification workflow state.
4.  **`/api/v1/analytics/recent-properties`**: Fetches the latest added/modified properties for dashboard feeds.

### Performance Optimizations
*   Applied compound indexes to MongoDB collections (e.g., indexing `property_id` alongside `status` for faster aggregations).
*   Reduced API response payloads by projecting only the necessary fields required by the frontend charts.

---

## Pending Phase 3
With Phases 1 and 2 complete, the Node.js API is mature. Phase 3 will introduce a secondary backend microservice (Python/FastAPI) dedicated strictly to AI Operations, ChromaDB vector indexing, and LangChain LLM orchestration.

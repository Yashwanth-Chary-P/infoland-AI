# Database Reference

InfoLand AI utilizes MongoDB Atlas as its persistence layer. The database schema is highly normalized to prevent document size limits and allow targeted indexing, but relies heavily on the Aggregation framework to serve unified documents to the frontend.

## Core Collections

### 1. `master_properties`
The root collection identifying a unique plot of land.
*   **Key Fields:** `property_id` (String, Indexed, Unique), `coordinates` (GeoJSON Polygon), `area` (Number).
*   **Purpose:** Base table for geospatial queries and map rendering.

### 2. `property_profiles`
Detailed metadata about a specific property.
*   **Relationships:** 1-to-1 with `master_properties` (via `property_id`).
*   **Key Fields:** `property_type`, `zoning`, `verification_workflow`, `location_score`.
*   **Purpose:** Used to populate the "Overview" and "Verification" tabs.

### 3. `ownership_histories`
Records of past and present owners.
*   **Relationships:** 1-to-Many from `master_properties`.
*   **Key Fields:** `owner_name`, `purchase_date`, `sale_date`, `is_current_owner`.
*   **Purpose:** Tracks chain of title for the "Ownership" tab.

### 4. `documents`
Government and legal verification files associated with a property.
*   **Relationships:** 1-to-Many from `master_properties`.
*   **Key Fields:** `document_type` (e.g., EC, RERA), `url`, `status` (verified/missing).
*   **Purpose:** Populates the "Documents" tab.

### 5. `court_cases`
Legal disputes tied to a property.
*   **Relationships:** 1-to-Many from `master_properties`.
*   **Key Fields:** `case_number`, `court`, `status`, `plaintiff`, `defendant`.
*   **Purpose:** Risk assessment in the "Court Cases" tab.

### 6. `property_timelines`
Chronological events related to physical changes or transactions.
*   **Relationships:** 1-to-Many from `master_properties`.
*   **Key Fields:** `date`, `event_type`, `description`.
*   **Purpose:** Renders the "Timeline" tab.

## Indexing Strategy
*   **Unique Index:** `property_id` across all collections ensures rapid O(1) lookups and `$lookup` aggregations.
*   **Compound Indexes:** Used on collections like `court_cases` (indexing `property_id` and `status`) to rapidly aggregate active legal disputes for the analytics dashboard.

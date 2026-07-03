# Module 04 API Reference

The following APIs were successfully engineered directly in the Express backend using MongoDB aggregation pipelines (`analytics.repository.js`) to serve real data to the frontend in a highly optimized manner.

## `GET /api/analytics/overview`
- **Purpose**: High-level platform statistics (total indexed, verified, health).
- **MongoDB Aggregation**: `$group` and `$sum` across `MasterProperty`, `PropertyProfile`, and `PropertyHealthSummary`.
- **Response Format**: 
  ```json
  { "total_properties": 1633, "verified_properties": 1633, "dataset_health": 74, "regions": [...], "property_classes": [...] }
  ```

## `GET /api/analytics/regions`
- **Purpose**: Regional intelligence, displaying property distribution per zone.
- **MongoDB Aggregation**: `$lookup` between `MasterProperty` and `PropertyProfile` to calculate `avg_location_score` and group by `source_region`.
- **Response Format**: Array of objects containing `region`, `count`, `avg_location_score`, `high_risk_count`.

## `GET /api/analytics/verification`
- **Purpose**: Analytics on system verification workflows.
- **MongoDB Aggregation**: `$group` by `verification_workflow` in `PropertyProfile`.
- **Response Format**: Array of `workflow` and `count`.

## `GET /api/analytics/ownership`
- **Purpose**: Owner demographic distribution.
- **MongoDB Aggregation**: `$group` by `owner_type` in the `Owner` collection.
- **Response Format**: Array of `type` and `count`.

## `GET /api/analytics/financial`
- **Purpose**: Encumbrance and loan statistics across the dataset.
- **MongoDB Aggregation**: Conditional `$sum` based on `$gt` comparisons in `PropertyHealthSummary.active_loan_count`.
- **Response Format**: Single object containing properties with and without loans.

## `GET /api/analytics/documents`
- **Purpose**: Calculates document completeness.
- **MongoDB Aggregation**: `$sum` of `document_count` vs `missing_document_count`.
- **Response Format**: Single object with `total_available` and `total_missing`.

## `GET /api/analytics/risk`
- **Purpose**: Future risk tier distribution.
- **MongoDB Aggregation**: `$group` by `future_risk_tier` in `PropertyProfile`.
- **Response Format**: Array of `tier` and `count`.

## `GET /api/analytics/dashboard/summary`
- **Purpose**: User-specific dashboard metrics.
- **Response Format**: Combines global metrics with placeholder user metrics (`watched_properties`, `alerts`) pending auth implementation in a future module.

# Changelog

All notable changes to the InfoLand AI project will be documented in this file.

## [v1.0.0] - 2026-07-03 - Frontend Frozen
### Added
*   Complete PAT (Production Acceptance Testing) validation across the stack.
*   Production Error Boundary, 404, and 500 routing pages.
*   React Helmet Async integration for SEO metadata.
*   Standardized `<EmptyState />` UI components.
*   Final QA and documentation generation.

## [v0.4.0] - Analytics & Dataset Intelligence
### Added
*   Backend Aggregation APIs (Dashboard stats, Property Types, Verifications).
*   Frontend `/dashboard` and `/insights` routes.
*   Chart.js integrations rendering backend aggregations.

## [v0.3.0] - Property Intelligence Workspace
### Added
*   Backend deep-populate endpoints for `/properties/:id`.
*   Frontend `/property/:id` dynamic route.
*   Tabbed interface mapping normalized data to Overview, Ownership, Documents, Financial, Court Cases, and Timeline panels.

## [v0.2.0] - Landing & Map Experience
### Added
*   Geospatial MongoDB queries.
*   React-Leaflet map integration (`/explore`).
*   Marketing landing pages (Home, About, Contact).
*   Dark-mode glassmorphism styling via Tailwind CSS.

## [v0.1.0] - Foundation (Backend Phases 1 & 2)
### Added
*   Dataset Engine ingestion scripts.
*   MongoDB normalized schemas (`master_properties`, `property_profiles`, `court_cases`, etc.).
*   Express API framework with Repository/Service/Controller pattern.
*   Joi validation and Swagger API documentation.

# FRONTEND_MODULE_01.md

# InfoLand AI – Frontend Module 1 Implementation Plan

**Module:** 01

**Title:** Frontend Backend Integration

**Status:** Not Started

**Phase:** Frontend Phase

**Prerequisites:**

* Dataset Engine Completed
* MongoDB Imported
* Backend Phase 1 Completed
* Backend Phase 2 Completed
* Frontend Audit Completed

---

# 1. Module Overview

Module 1 is responsible for connecting the existing React frontend with the completed Express backend.

The objective is **NOT** to redesign the frontend.

The objective is **NOT** to create dashboards.

The objective is **NOT** to introduce AI.

Instead, Module 1 replaces every mock dataset with real backend APIs while preserving the existing frontend architecture.

---

# 2. Module Objectives

After Module 1 the frontend should

* communicate with the backend
* remove dependency on mock JSON files
* use Redux with backend APIs
* render live property data
* render backend GeoJSON
* support property search
* support property details
* support property map
* provide loading states
* provide error handling

Authentication is intentionally **excluded** from Module 1.

---

# 3. Scope

Included

* API Integration
* Axios Client
* Service Layer
* Redux Integration
* Property Listing
* Property Details
* Search
* Map Integration
* Loading States
* Error Handling
* Mock Data Removal

Excluded

* Authentication
* Verification Dashboard
* Risk Dashboard
* Analytics
* AI
* FastAPI
* Deployment

---

# 4. Implementation Philosophy

The frontend must adapt to the backend.

The backend must **never** be changed for frontend convenience.

Implementation Order

```text
Inspect

↓

Understand

↓

Integrate

↓

Test

↓

Commit
```

Never implement before understanding the backend.

---

# 5. Golden Rules

## Rule 1

Backend is the source of truth.

---

## Rule 2

Never invent response fields.

---

## Rule 3

Never invent endpoints.

---

## Rule 4

Read Swagger before implementation.

---

## Rule 5

Read backend response before writing UI.

---

## Rule 6

One completed feature at a time.

---

## Rule 7

Commit after every verified feature.

---

## Rule 8

Never remove mock implementation before backend implementation works.

---

# 6. Current Frontend Architecture

```text
React

↓

Pages

↓

Components

↓

Redux

↓

Services

↓

datasetClient

↓

Mock JSON
```

Target

```text
React

↓

Pages

↓

Components

↓

Redux AsyncThunk

↓

Services

↓

Axios Client

↓

Backend

↓

MongoDB
```

---

# 7. Existing Assets to Preserve

Do NOT redesign

* Navbar
* Footer
* Plot Cards
* Plot Grid
* Plot Details
* Leaflet Map
* Sidebar
* Tailwind Layout
* Routing

Only the data source changes.

---

# 8. Existing Services

Reuse

* PropertyService
* PropertySubService
* OwnerService
* MetadataService
* TimelineService
* LoanService
* TaxService
* CourtDisputeService
* POIService

Replace only the internal data-fetching implementation.

---

# 9. Existing Redux

Reuse

* plotsSlice
* detailedPlotsSlice

Update async thunks to consume backend APIs.

Avoid changing store architecture unless necessary.

---

# 10. Existing Pages

Pages to integrate

* CardSelection
* PlotGrid
* PlotCard
* PlotDetailsPage
* PlotMap
* MapSelection

Public informational pages remain unchanged.

---

# 11. Existing Components

Reusable

* Navbar
* Footer
* PlotCard
* PlotGrid
* DynamicFieldList
* LandInfoSidebar

Avoid duplication.

Extend existing components when possible.

---

# 12. Module Tasks

## Task 1

Backend Inspection

Objectives

* Review Swagger
* Review backend routes
* Review response schema
* Verify field names

Deliverable

Frontend understands backend completely.

---

## Task 2

Axios Client

Objectives

* Create centralized Axios client
* Configure base URL
* Configure common headers
* Configure response handling

Deliverable

Single HTTP client used by all services.

---

## Task 3

Service Layer Integration

Objectives

Replace datasetClient with backend communication.

Update

* PropertyService
* OwnerService
* MetadataService
* TimelineService
* LoanService
* TaxService
* CourtDisputeService
* POIService

Deliverable

Services communicate with backend.

---

## Task 4

Redux Integration

Objectives

Update async thunks.

Maintain existing Redux architecture.

Deliverable

Redux receives backend responses.

---

## Task 5

Property Listing

Objectives

Replace mock property listing.

Backend endpoint becomes data source.

Deliverable

Property grid loads backend data.

---

## Task 6

Property Details

Objectives

Load property details from backend.

Display backend information.

Deliverable

Property Details page fully functional.

---

## Task 7

Property Search

Objectives

Integrate backend search API.

Replace frontend filtering if necessary.

Deliverable

Search uses backend.

---

## Task 8

Map Integration

Objectives

Render backend GeoJSON.

Display backend properties.

Display POIs.

Maintain existing interactions.

Deliverable

Interactive backend-powered map.

---

## Task 9

Loading & Error Handling

Objectives

Implement

* Loading
* Empty States
* Error States

Use

* Redux loading
* SweetAlert2
* Existing UI

Deliverable

Professional user experience.

---

## Task 10

Mock Data Cleanup

Objectives

Remove

* datasetClient
* unnecessary JSON usage
* obsolete fetch logic

Only after backend implementation succeeds.

Deliverable

Frontend completely powered by backend.

---

# 13. Backend Dependencies

Before implementing every task inspect

* Swagger Documentation
* API Documentation
* Backend Module Documentation
* MongoDB Model
* Response Schema

Never assume backend behavior.

---

# 14. Coding Standards

Components

↓

Redux

↓

Services

↓

Axios

↓

Backend

Never bypass this flow.

---

# 15. Success Criteria

Module 1 is complete when

✓ All property pages use backend APIs

✓ Redux consumes backend responses

✓ Maps render backend GeoJSON

✓ Search uses backend

✓ Property Details uses backend

✓ Services use Axios

✓ Mock datasets are removed

✓ Existing UI remains unchanged

✓ No frontend assumptions exist

✓ No hardcoded backend fields exist

---

# 16. Risks

## Risk

Backend response mismatch

Mitigation

Read Swagger before implementation.

---

## Risk

Breaking existing UI

Mitigation

Replace data source only.

Do not redesign components.

---

## Risk

Removing mock data too early

Mitigation

Feature-by-feature replacement.

---

## Risk

Large GeoJSON rendering

Mitigation

Use backend optimizations only if necessary after integration.

---

# 17. Out of Scope

The following belong to Module 2 or Module 3 and must **not** be implemented here.

Module 2

* Verification Dashboard
* Risk Dashboard
* Property Health
* Ownership Timeline
* Legal Documents
* Financial Summary
* Analytics
* Charts
* Statistics

Module 3

* AI Integration
* FastAPI
* RAG
* Chat Assistant
* Deployment
* Performance Optimization
* Production Hardening

---

# 18. Completion Checklist

## Backend Integration

* [ ] Backend APIs inspected
* [ ] Swagger reviewed
* [ ] Response schemas verified

## Axios

* [ ] Central Axios client created
* [ ] Services migrated

## Redux

* [ ] Async thunks updated
* [ ] Store verified

## Features

* [ ] Property Listing
* [ ] Property Details
* [ ] Search
* [ ] Map Integration

## User Experience

* [ ] Loading states
* [ ] Error handling
* [ ] Empty states

## Cleanup

* [ ] Mock JSON removed safely
* [ ] datasetClient removed
* [ ] Legacy fetch calls removed

## Validation

* [ ] Manual testing completed
* [ ] Existing UI preserved
* [ ] Backend responses verified
* [ ] No console errors
* [ ] Ready for Module 2

---

# Module 1 Final Deliverable

At the completion of Module 1, the InfoLand AI frontend should function exactly as it does today from a user's perspective, but every property-related interaction will be powered by the completed Express backend instead of static JSON datasets. The architecture, component hierarchy, and user experience remain intact, providing a stable foundation for Module 2, where verification dashboards, risk assessment, analytics, and property intelligence features will be introduced using the real backend data.

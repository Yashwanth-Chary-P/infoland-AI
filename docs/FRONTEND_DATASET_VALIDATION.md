# FRONTEND DATA RENDERING & DATA VALIDATION STANDARD

## Document Information

| Item     | Value                                                                                                                                     |
| -------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| Project  | InfoLand AI                                                                                                                               |
| Document | Frontend Data Rendering & Validation Standard                                                                                             |
| Version  | 2.0                                                                                                                                       |
| Status   | Active Standard                                                                                                                           |
| Purpose  | Define how frontend components consume, validate, and render backend data while maintaining compatibility with evolving dataset versions. |

---

# Purpose

The purpose of this document is to establish the official frontend data rendering standard for InfoLand AI.

The frontend must never assume the existence of backend fields.

Instead, it must dynamically adapt to the actual schema returned by the backend and Dataset Engine.

This guarantees

* Forward Compatibility
* Dataset Version Compatibility
* Schema Evolution Support
* Reduced Maintenance
* Accurate Rendering
* Zero Placeholder Data

---

# Core Principles

The frontend must always follow these principles.

## 1. Backend is the Single Source of Truth

Never invent frontend fields.

Never hardcode values.

Never fabricate missing information.

Everything displayed must originate from the backend.

---

## 2. Dynamic Rendering First

Whenever possible

Render data dynamically instead of assuming field names.

Avoid

```text
profile.area
profile.ownerName
profile.surveyNo
```

Prefer

Generic rendering utilities capable of adapting to new fields automatically.

---

## 3. Never Hallucinate Fields

The UI must never display

* fake values
* placeholder numbers
* empty labels
* "Unknown" unless explicitly returned
* non-existent backend properties

If a field is absent

Do not render it.

---

## 4. Graceful Schema Evolution

Future dataset versions may

* add fields
* remove fields
* rename fields
* extend objects

The frontend should continue functioning without modification whenever possible.

---

# Rendering Architecture

Frontend

↓

Services

↓

API Response

↓

Validation

↓

Transformation (only when required)

↓

Dynamic Rendering Components

↓

UI

Business logic must never exist inside UI components.

---

# Dynamic Rendering Standard

Reusable components should be responsible for rendering unknown datasets.

Examples

* DynamicFieldList
* DynamicTable
* DynamicTimeline
* DynamicMetadata
* DynamicCardGrid

These components should

* iterate fields
* format labels
* hide empty values
* support nested objects
* support arrays
* support future schema expansion

---

# Data Validation Rules

Before rendering

Every response should be validated.

Check

* null
* undefined
* empty strings
* empty arrays
* empty objects

Invalid values should not render.

---

# Display Rules

Render only

* meaningful values
* verified backend fields
* supported data types

Do not render

* MongoDB internal fields
* UUIDs
* ObjectIds
* Internal identifiers
* Debug fields
* Temporary fields

unless explicitly required.

---

# Hidden System Fields

Examples include

* _id
* __v
* property_id
* owner_id
* dispute_id
* loan_id
* document_id
* metadata_id

These should remain available internally but should not be displayed to end users by default.

---

# Property Rendering Standard

Property pages should display

Overview

Verification

Ownership

Financial

Documents

Timeline

Location

Insights

Future AI

Each section should render only the fields actually available for that property.

---

# Timeline Standard

Timeline combines multiple backend sources.

Examples

* Ownership Events
* Registry Events
* Property Timeline
* Verification Events (future)
* AI Insights (future)

Display them chronologically.

Never assume event types.

---

# Collection Rendering Strategy

Each dataset collection should have its own rendering strategy.

## Property Profile

Dynamic metadata rendering.

---

## Property Metadata

Configuration-driven rendering.

---

## Health Summary

Metrics rendering.

---

## Ownership

Dynamic owner information.

---

## Registry

Dynamic registry information.

---

## Documents

Dynamic document cards.

Document types should automatically adapt to new document categories.

---

## Loans

Dynamic financial cards.

---

## Taxes

Dynamic tax summaries.

---

## Court Disputes

Timeline + dispute cards.

---

## POIs

Grouped by category.

Support future POI types automatically.

---

# Empty State Policy

If data does not exist

Do NOT display

Blank labels

Empty cards

Placeholder values

Instead

Hide the section

or

Display

"No verified information available."

---

# Error Handling

Unexpected schema

↓

Log error

↓

Continue rendering remaining data

↓

Never crash the page

---

# Performance Rules

Avoid unnecessary rerenders.

Use

* Memoization
* Lazy rendering
* Virtualization for large datasets
* Pagination
* Incremental rendering

---

# Future Dataset Compatibility

Future dataset versions may introduce

* AI fields
* Verification history
* Risk explanation
* Property recommendations
* Similar properties
* Investment scores

Dynamic rendering should support these additions with minimal changes.

---

# AI Compatibility

Future AI responses should be rendered using the same principles.

Examples

AI Summary

AI Recommendation

AI Risk Explanation

AI Confidence

These should be treated as additional data sections rather than special-case UI.

---

# Rendering Quality Checklist

Before approving any frontend page

Verify

* No hardcoded backend fields
* No placeholder data
* No empty labels
* No fake statistics
* No fabricated values
* Dynamic rendering where appropriate
* Hidden system identifiers
* Proper loading states
* Proper empty states
* Proper error handling

---

# Engineering Rules

Frontend developers must

✓ Trust the backend schema

✓ Render only available information

✓ Build reusable rendering components

✓ Design for schema evolution

✓ Avoid coupling UI to a fixed dataset version

✓ Keep rendering logic generic whenever practical

---

# Success Criteria

The frontend is considered compliant when

* Every page renders only backend-provided data.
* Schema updates require minimal UI changes.
* New dataset fields appear automatically where appropriate.
* Removed backend fields do not break the UI.
* No placeholder or fabricated values exist.
* Dynamic rendering components are reusable across the application.
* The platform remains compatible with future Dataset Engine and AI releases.

---

# Final Principle

**The frontend should be data-driven, not schema-driven.**

The UI must adapt to the data provided by the platform rather than forcing the platform to conform to a rigid frontend model.

This ensures long-term maintainability, future AI integration, and compatibility with evolving datasets while preserving a professional user experience.

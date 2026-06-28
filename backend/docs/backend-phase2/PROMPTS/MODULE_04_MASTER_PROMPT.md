# Module 4 Master Prompt: Financial Verification Engine

## Objective

Implement **ONLY Backend Phase 2 – Module 4 (Financial Verification Engine).**

Do **NOT** implement Modules 5–8.

Module 4 must become the **single source of truth** for all financial verification.

Future modules (Legal, Risk Assessment, Unified Report) must consume Module 4 instead of querying financial collections directly.

---

# Branch Rules

Before writing any code

* Verify the active branch is `backend-phase2`
* Do **NOT** create a new branch
* Do **NOT** modify `main`
* Do **NOT** push to GitHub

Create **one local commit only** after all verification passes.

---

# Read Before Implementation

Read completely before writing code.

## Engineering Documents

* PHASE2_GUIDELINES.md
* ENGINEERING_DECISIONS.md

## Previous Modules

* MODULE_01_VERIFICATION_FOUNDATION.md
* MODULE_02_DOCUMENT_VERIFICATION.md
* MODULE_03_OWNERSHIP_REGISTRY.md

## Current Module

* MODULE_04_PLAN.md
* MODULE_04_REPORT_TEMPLATE.md

---

# Dataset Engine Inspection

Before implementation inspect

* FIELD_REFERENCE.md
* DATA_MODEL.md
* PROJECT_CONTEXT_FOR_AI.md
* PIPELINE_DOCUMENTATION.md
* LESSONS_LEARNED.md
* README_DATASET_ENGINE.md

Inspect Release Reports

* dataset_summary.json
* mongodb_import_summary.json
* loan_stats.json
* tax_stats.json
* consistency_report.json

Never hardcode report values.

Always compute everything dynamically from MongoDB.

---

# MongoDB Inspection

Inspect

* loans
* tax_records

Verify

* schema
* indexes
* relationships
* property_id
* loan status
* tax status
* pending amounts
* outstanding balances

Never assume field names.

Never fabricate values.

---

# Module Scope

Implement ONLY

* Loan Verification
* Tax Verification
* Loan Encumbrances
* Outstanding Amount
* Pending Taxes
* Financial Validation
* Financial Summary
* Financial Statistics

---

# Repository Strategy

Collections

* loans
* tax_records

Repositories must

* expose reusable methods
* avoid duplicate queries
* use Promise.all whenever possible
* prevent N+1 queries

Do not duplicate repository logic.

---

# Expected APIs

Implement ONLY

GET /api/financial/:propertyId/loans

GET /api/financial/:propertyId/taxes

GET /api/financial/:propertyId/encumbrances

GET /api/financial/:propertyId/validation

GET /api/financial/:propertyId/summary

GET /api/financial/:propertyId/statistics

Do not add additional endpoints.

---

# Business Rules

Compute dynamically

* active loans
* closed loans
* outstanding balances
* pending taxes
* financial encumbrances
* financial validation
* financial summary
* financial statistics

Never

* fabricate balances
* hardcode totals
* assume loan status
* assume tax status

Always compute directly from MongoDB.

---

# Validation Rules

Reuse centralized validation.

Validate

* propertyId
* invalid IDs
* missing properties

Do not duplicate validators.

---

# API Design

Separate

**Database Fields**

from

**Computed Backend Fields**

Never expose

* _id
* __v
* createdAt
* updatedAt

unless explicitly required.

Responses must remain consistent with Modules 1–3.

---

# Swagger Requirements

Every endpoint must include

* Summary
* Description
* Tags
* Parameters
* Request Schema
* Response Schema
* Error Schema
* 200 Example
* 400 Example
* 404 Example
* 500 Example
* Real MongoDB Examples
* Real Property IDs
* Computed Backend Fields documentation

Never fabricate Swagger examples.

---

# Documentation

Generate

MODULE_04_FINANCIAL_VERIFICATION.md

Complete

MODULE_04_REPORT.md

Document

* Architecture
* Collections
* Repository Strategy
* Business Rules
* Database Fields
* Computed Backend Fields
* Swagger Coverage
* Validation
* Testing
* Performance
* Future Integration
* Known Limitations

---

# Testing

Run

* Unit Tests
* Integration Tests
* Regression Tests

Verify

* Loans
* Taxes
* Encumbrances
* Validation
* Summary
* Statistics
* Swagger

Ensure Modules 1–3 continue functioning correctly.

---

# Dataset Verification

Compare dynamically against

* MongoDB
* Dataset Engine
* Release Reports

Verify

* Active Loans
* Closed Loans
* Pending Taxes
* Outstanding Amount
* Financial State

Document any mismatch before reporting completion.

---

# Lessons Learned

Do not repeat previous mistakes.

Never

* Assume fields
* Assume balances
* Assume loan status
* Assume tax status
* Hardcode Dataset statistics
* Expose MongoDB internals
* Duplicate business logic
* Break previous modules
* Skip Swagger
* Skip testing
* Skip documentation

---

# Git Rules

Remain on

backend-phase2

Create one local commit only.

Do NOT push.

Suggested commit

feat(financial): implement backend phase 2 module 4 financial verification engine

---

# Self Audit

Before reporting completion

Review

* PHASE2_GUIDELINES.md
* ENGINEERING_DECISIONS.md
* MODULE_04_PLAN.md
* MODULE_04_REPORT_TEMPLATE.md

Verify every checklist item has been completed.

If anything is partially implemented,

complete it before reporting success.

---

# Final Output

Provide

1. Implementation Summary
2. Files Created
3. Files Modified
4. Routes Added
5. Controllers Added
6. Services Added
7. Repositories Added
8. Validators Added
9. Swagger Changes
10. Documentation Generated
11. MongoDB Verification
12. Dataset Engine Verification
13. Release Report Verification
14. Unit Test Results
15. Integration Test Results
16. Regression Test Results
17. Performance Notes
18. Known Limitations
19. Self Audit Results
20. Local Git Commit Hash
21. Active Branch Confirmation

Stop after Module 4.

Wait for explicit approval before proceeding to Module 5.

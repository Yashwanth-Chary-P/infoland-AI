# Module 4 Plan: Financial Verification Engine

## Purpose

Provide the single source of truth for all financial verification related to a property.

This module evaluates loans, taxes, encumbrances, outstanding dues, and overall financial health.

---

## Business Objective

Provide reusable financial verification services that can be consumed by:

- Module 7 (Risk Engine)
- Module 8 (Unified Report Engine)

Future modules must never query financial collections directly.

---

## Collections Used

- loans
- tax_records

---

## Collection Strategy

The Financial Verification Engine is the canonical source of financial information.

Loans provide

- Active loans
- Closed loans
- Outstanding balances
- Financial encumbrances

Tax Records provide

- Tax status
- Pending taxes
- Outstanding dues

Repositories should expose reusable methods.

Avoid duplicate queries.

Use Promise.all whenever possible.

Prevent N+1 queries.

---

## Dependencies

- Module 1
- Module 2
- Module 3

---

## Expected APIs

GET /api/financial/:propertyId/loans

GET /api/financial/:propertyId/taxes

GET /api/financial/:propertyId/encumbrances

GET /api/financial/:propertyId/validation

GET /api/financial/:propertyId/summary

GET /api/financial/:propertyId/statistics

---

## Service Responsibilities

FinancialService should compute

- active loans

- inactive loans

- outstanding balance

- pending taxes

- financial encumbrances

- financial state

- summary

- statistics

Everything must be computed dynamically.

Never hardcode values.

---

## Repository Responsibilities

FinancialRepository

- loan retrieval

- tax retrieval

- reusable aggregation methods

---

## Swagger Coverage

Every endpoint must include

- Summary

- Description

- Tags

- Parameters

- Response Schemas

- Error Schemas

- Real MongoDB Examples

- Computed Backend Fields

---

## Testing Strategy

Run

- Unit Tests

- Integration Tests

- Regression Tests

Verify

- Loans

- Taxes

- Encumbrances

- Validation

- Summary

- Statistics

---

## Verification Strategy

Compare dynamically against

- MongoDB

- Dataset Engine

- Release Reports

Never compare against hardcoded values.

---

## Future Integration

Module 7 consumes

- financial_state

- loan encumbrances

- pending taxes

Module 8 consumes

- financial summary

- financial statistics

No future module may directly query

- loans

- tax_records
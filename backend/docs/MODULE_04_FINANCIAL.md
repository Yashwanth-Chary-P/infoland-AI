# Module 4: Financial Verification

## Overview
Module 4 handles encumbrances and financial liabilities. It checks for active loans against the property and validates that all property taxes are paid up to date.

## Architecture
- **Routes:** `financial.routes.js`
- **Controllers:** `financial.controller.js`
- **Services:** `financial.service.js`
- **Repositories:** `financial.repository.js`

## Collections
- `loans`
- `tax_records`

## Business Rules
- An active loan flags the property as `encumbered`.
- A pending tax record flags the property as `pending`.
- Computes aggregate outstanding balances.

## Computed Backend Fields
- `financial_state` (clear, encumbered, pending)
- `loan_outstanding`
- `pending_tax`
- `total_due`

## Endpoints
- `GET /api/financial/:propertyId/encumbrances`
- `GET /api/financial/:propertyId/validation`
- `GET /api/financial/:propertyId/summary`
- `GET /api/financial/:propertyId/statistics`

## Future Integration
- Consumed by Module 6 (Assessment) to deduct risk points heavily for active loans and pending taxes.

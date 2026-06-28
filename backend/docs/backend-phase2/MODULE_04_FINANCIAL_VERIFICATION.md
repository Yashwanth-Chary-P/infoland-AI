# Module 4: Financial Verification Engine

## Architecture Overview
The Financial Verification Engine serves as the single source of truth for all financial verification related to a property. It abstracts the MongoDB `loans` and `tax_records` collections from downstream modules (like Risk Assessment and Unified Report) to prevent duplicate queries and hardcoded data models. 
The module leverages existing Phase 1 components such as `financial.service.js` and `financial.repository.js`, extending them with dedicated methods for encumbrance calculation, financial state validation, summary creation, and statistics generation.

## Collections Used
- `loans`: Source of truth for property loan status, outstanding amounts, lenders, etc.
- `tax_records`: Source of truth for property tax compliance and pending amounts.

## Repository Strategy
We use `FinancialRepository` located at `src/repositories/financial.repository.js`.
The strategy is:
- **Expose reusable methods**: Re-use `findLoansByPropertyId` and `findTaxRecordsByPropertyId`.
- **Avoid N+1 queries**: Retrieve array of documents once per collection, then process dynamically in memory using `filter` and `reduce` in the Service layer.
- **Use Promise.all**: Fetch loans and taxes in parallel for validation, summary, and statistics.

## Business Rules
- **Active Loans**: Computed dynamically by filtering loans where `status === 'active'`.
- **Closed Loans**: Computed dynamically by filtering loans where `status === 'closed'`.
- **Pending Taxes**: Computed dynamically by filtering taxes where `status === 'pending'`.
- **Outstanding Amount**: Aggregated via `reduce` over active loans' `outstanding_amount`.
- **Financial State**:
  - `encumbered`: If there is at least one active loan.
  - `pending`: If there are pending taxes but no active loans.
  - `clear`: If there are no active loans and no pending taxes.

## Database Fields vs Computed Backend Fields
**Database Fields**:
- Loans: `loan_id`, `property_id`, `status`, `loan_type`, `outstanding_amount`
- TaxRecords: `tax_id`, `property_id`, `status`, `pending_amount`

**Computed Backend Fields** (Never stored in DB, computed at runtime):
- `financial_state`
- `active_loans`, `closed_loans`
- `loan_outstanding`
- `pending_tax`
- `total_due`
- `financial_health`

## Swagger Coverage
Endpoints implemented under `/api/financial`:
- `GET /api/financial/:propertyId/loans`
- `GET /api/financial/:propertyId/taxes`
- `GET /api/financial/:propertyId/encumbrances`
- `GET /api/financial/:propertyId/validation`
- `GET /api/financial/:propertyId/summary`
- `GET /api/financial/:propertyId/statistics`
Swagger annotations document all requests/responses including specific DTOs (`FinancialEncumbrances`, `FinancialValidation`, `FinancialSummary`, `FinancialStatistics`).

## Validation Strategy
Reused centralized validation schemas (`propertyIdParamSchema`) via `validateRequest` middleware to ensure standardized input and error handling.

## Future Integration
- **Module 7 (Risk Engine)** will consume the `financial_state`, `active_loans` and `pending_tax`.
- **Module 8 (Unified Report)** will consume the `FinancialSummary` payload to display property financials cleanly.

# Frontend Module 2 Implementation Plan

# Property Verification Dashboard & Analytics

---

# 1. Objectives

Transform the current **Property Details Page** into a professional Property Verification Dashboard.

The dashboard should provide a complete legal, financial, ownership and verification view of a property while maintaining a clean, modular architecture.

Module 2 focuses on **visualization**, **usability**, and **data organization**, not backend integration.

---

# 2. Current Status

Completed (Module 1)

* Backend API Integration
* Axios Client
* Redux Integration
* Property Grid
* Interactive Map
* Progressive Loading
* Property Details Fetching
* Search
* Stable Pagination

Module 2 starts from this completed foundation.

---

# 3. Scope

Primary

* PlotDetailsPage.jsx

Secondary

* StatsPage.jsx
* DynamicFieldList.jsx
* Property Details Components
* Charts
* Analytics

---

# 4. Primary Goal

Instead of displaying one long scrolling page,

convert Property Details into a professional dashboard.

The UI should be modular.

The code should remain maintainable.

---

# 5. Dashboard Structure

Create a tab-based dashboard.

Example

Overview

Ownership

Documents

Financial

Timeline

Analytics

Each tab should render independently.

Changing tabs must NOT trigger unnecessary API requests.

---

# 6. Overview Tab

Display

Property Summary

Current Owner

Verification Workflow

Property Class

Sale Status

Construction Status

Area

Region

Zone

Location Score

Future Risk Tier

Property Age

Health Summary

Document Summary

Quick Status Cards

Missing Documents

Loans

Pending Taxes

Court Cases

Do NOT show raw JSON.

Use clean cards.

---

# 7. Ownership Tab

Display

Current Owner

Owner Type

Ownership Timeline

Registry Information

Ownership History

Use a clean timeline/table layout.

---

# 8. Documents Tab

Display every document in categorized cards.

Example

Identity

Registration

Tax

Building

Survey

Certificates

Each document should display

Status

Available

Missing

Expired

Issue Date

Issuing Authority

Last Updated

Remarks

Add icons.

Use colored badges.

Do NOT display huge JSON blobs.

---

# 9. Financial Tab

Display

Loans

Taxes

Pending Amount

Loan Count

Tax Status

Court Disputes

If no records exist,

display friendly empty states.

---

# 10. Timeline Tab

Create a vertical timeline.

Example

2016

Hospital Established

↓

2017

Occupancy Certificate

↓

2021

Ownership Transfer

↓

2025

Latest Verification

Timeline should automatically sort by date.

---

# 11. Analytics Tab

Use Chart.js

Display

Document Availability

Property Health

Risk Distribution

Document Completion

Verification Progress

Missing Documents

Use

Bar Charts

Pie Charts

Doughnut Charts

Keep charts responsive.

---

# 12. Global Analytics

Upgrade StatsPage.

Replace static content with backend analytics.

Possible cards

Total Properties

Property Classes

Region Distribution

Document Availability

Loans

Court Cases

Verification Status

Do NOT hardcode numbers.

Always consume backend APIs.

---

# 13. Components

Break PlotDetailsPage into reusable components.

Create

src/components/PropertyDetails/

Suggested components

OverviewTab

OwnershipTab

DocumentsTab

FinancialTab

TimelineTab

AnalyticsTab

SummaryCards

StatusBadge

DocumentCard

PropertyInfoCard

HealthCard

VerificationCard

---

# 14. Charts

Create

src/components/Charts/

Reusable charts

PieChart

BarChart

LineChart

DoughnutChart

Never duplicate chart logic.

---

# 15. Redux

Do NOT refetch property details when changing tabs.

Cache property details.

Only request additional data if absolutely required.

---

# 16. Services

Continue using the existing modular service architecture.

Do NOT make API calls directly inside components.

Always use

Redux

or

Services

---

# 17. UI Guidelines

Professional

Government-style

Simple

Readable

Responsive

Use

Cards

Badges

Icons

Tables

Charts

Timeline

Avoid large scrolling JSON.

---

# 18. Empty States

Every section must gracefully handle

No Documents

No Loans

No Court Cases

No Timeline

No Taxes

Never crash.

---

# 19. Error Handling

Network Error

Backend Error

Missing Data

Display proper messages.

No console spam.

---

# 20. Performance

Lazy render heavy tabs.

Memoize expensive charts.

Avoid unnecessary rerenders.

Do not reload the same property repeatedly.

---

# 21. Validation

Verify

Overview

Ownership

Documents

Financial

Timeline

Analytics

Charts

Responsive Layout

Tab Switching

Property Navigation

No Console Errors

No Network Errors

No Duplicate Requests

---

# 22. Completion Checklist

Module 2 is complete when

✓ Property Dashboard is modular.

✓ PlotDetailsPage no longer contains one massive component.

✓ Every section displays backend data cleanly.

✓ Charts render correctly.

✓ Timeline works.

✓ Documents are categorized.

✓ Ownership visualization works.

✓ Financial section works.

✓ Analytics section works.

✓ StatsPage uses backend analytics.

✓ No mock data remains.

✓ Build passes.

✓ Manual verification completed.

---

# 23. Important Constraints

Do NOT redesign the application.

Do NOT change backend APIs.

Do NOT introduce new endpoints.

Do NOT implement AI.

Do NOT implement Rule-Based Risk Score.

The Rule-Based Risk Engine belongs to Backend Phase 2 Module 6 and will be integrated later.

This module is strictly focused on presenting existing backend data in a professional dashboard.

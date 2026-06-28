# Engineering Decisions

Decision 001

Verification Engine exposes signals instead of risk.

Reason

Allows future modules to integrate cleanly.

------------------------------------------------

Decision 002

Risk Engine is deterministic.

Reason

ML is prohibited.

------------------------------------------------

Decision 003

Dataset Engine is the single source of truth.

Reason

Prevent schema drift.

------------------------------------------------

Decision 004

Release Reports are verification baselines only.

Reason

Statistics must always be computed dynamically.

------------------------------------------------

Decision 005

No backend module may assume MongoDB fields.

Reason

Backend must remain synchronized with Dataset Engine.

Decision 007

The Document Verification Engine shall use `documents_all` as the canonical document source.

Reason

The Dataset Engine already aggregates document information into `documents_all`, avoiding unnecessary queries across all individual document collections while keeping the architecture efficient and maintainable.

## Decision 009

The Ownership & Registry Engine is the single source of truth for ownership verification.

### Reason

Future modules (Risk Assessment and Unified Report) must consume ownership information only through the Ownership Engine.

No future module should directly query:

- owners
- ownership_events
- property_registry

This centralizes ownership business logic, prevents duplication, and ensures consistent ownership validation across the platform.

## Decision 010

The Financial Verification Engine is the single source of truth for financial verification.

Future modules must consume financial information through Module 4.

No future module should directly query

- loans

- tax_records

This centralizes business rules and avoids duplicated calculations.

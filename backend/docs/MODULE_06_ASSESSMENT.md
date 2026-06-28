# Module 6: Risk Assessment & Final Verification Engine

## Overview
Module 6 acts as the final aggregation layer for property verification, consuming outputs from Modules 1-5 to dynamically generate a risk score, recommendation, and comprehensive final dossier payload. 

## Architecture
- **Routes:** `assessment.routes.js` maps endpoints for risk, recommendation, and final reports.
- **Controllers:** `assessment.controller.js` serves as a thin request handler.
- **Services:** `assessment.service.js` consumes `document.service`, `owner.service`, `financial.service`, `legal.service`, and `verification.service`.
- **Repositories:** Module 6 does not query repositories directly. It reuses existing service integrations.

## Risk Algorithm
The engine computes risk dynamically starting at a baseline of 100 points, deducting points for runtime anomalies:
- Missing mandatory documents: `-3 points` each
- Expired documents: `-2 points` each
- Active loans: `-15 points` each
- Pending taxes: `-10 points`
- Active legal disputes: `-30 points` each

## Computed Backend Fields
No fields in the assessment payload are stored in MongoDB. The following are dynamically generated:
- `risk_score`: Numeric base-100 score.
- `verification_grade`: Letter grade (A, B, C, D, F).
- `confidence_level`: Represents completeness of underlying module responses.
- `overall_status`: High-level workflow status.
- `verification_summary`: Human-readable explanation.
- `recommendation`: Contextual risk tier ('Safe to Purchase', 'High Risk', etc).

## Performance Notes
- Strictly uses `Promise.all` across service calls.
- Constructs final payloads purely in-memory.
- Avoids N+1 queries.
- Reads underlying collections at most once per module per request.

# Module 04: Property Intelligence

This module implements specific business logic to generate deep, multi-faceted analytical reports on properties. It shifts from generic Q&A to structured intelligence.

## Topics Covered

- **Property Summary**: Synthesizing basic property facts from `master_properties` and `property_metadata`.
- **Ownership Analysis**: Analyzing the `owners` and `ownership_events` datasets to summarize the chain of title.
- **Financial Analysis**: Using `loans` and `tax_records` to generate insights on financial health and obligations.
- **Legal Analysis**: Scanning `court_disputes` to highlight active or historical legal risks.
- **Timeline Analysis**: Creating a chronological narrative of the property using `property_timeline`.
- **Verification Summary**: Cross-referencing data to assign confidence scores.
- **Risk Explanation**: An AI-generated narrative explaining potential red flags.
- **Recommendation Engine**: Suggesting next steps for a buyer/investor based on the risk profile.
- **Report Generator**: Combining all analyses into a single, comprehensive JSON response.

## Deliverables
1. Dedicated analysis services for Financial, Legal, and Ownership domains.
2. A master `ReportGeneratorService` that orchestrates these sub-analyses.
3. Pydantic schemas defining the complex, nested structure of the Property Intelligence Report.
4. API endpoint: `GET /api/v1/properties/{property_id}/intelligence-report`

## Acceptance Criteria
- [ ] The intelligence endpoint returns a fully structured JSON report matching the defined Pydantic schemas.
- [ ] The AI correctly identifies and highlights legal or financial risks if present in the data.
- [ ] The endpoint execution completes within acceptable timeout limits.

## Validation Checklist
- Is the AI avoiding hallucination in the risk analysis?
- Is the data being pulled accurately from the datasets via the Data Source Resolver?
- Are multiple LLM calls running concurrently (async) to improve report generation speed?

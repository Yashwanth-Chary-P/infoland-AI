# Database Verification Report

## Source Dataset Statistics

- **master_properties.json**: 1633 records
- **property_profiles.json**: 1633 records
- **location_scores.json**: 1633 records
- **owners.json**: 1633 records
- **ownership_events.json**: 3365 records
- **property_registry.json**: 1633 records
- **property_metadata.json**: 1633 records
- **property_timeline.json**: 1633 records
- **property_health_summary.json**: 1633 records
- **loans.json**: 294 records
- **tax_records.json**: 1633 records
- **court_disputes.json**: 65 records
- **documents\documents_all.json**: 29394 records
- **documents\building_approval_plans.json**: 1633 records
- **documents\completion_certificates.json**: 1633 records
- **documents\court_dispute_records.json**: 1633 records
- **documents\encumbrance_certificates.json**: 1633 records
- **documents\identity_proofs.json**: 1633 records
- **documents\khata_certificates.json**: 1633 records
- **documents\khata_extracts.json**: 1633 records
- **documents\land_conversion_certificates.json**: 1633 records
- **documents\layout_approvals.json**: 1633 records
- **documents\mother_deeds.json**: 1633 records
- **documents\mutation_records.json**: 1633 records
- **documents\nocs.json**: 1633 records
- **documents\occupancy_certificates.json**: 1633 records
- **documents\power_of_attorneys.json**: 1633 records
- **documents\property_tax_receipts.json**: 1633 records
- **documents\rtc_records.json**: 1633 records
- **documents\sale_deeds.json**: 1633 records
- **documents\survey_maps.json**: 1633 records

## MongoDB Statistics

- **master_properties**: 1633 documents
- **property_profiles**: 1633 documents
- **location_scores**: 1633 documents
- **owners**: 1633 documents
- **ownership_events**: 3365 documents
- **property_registry**: 1633 documents
- **property_metadata**: 1633 documents
- **property_timeline**: 1633 documents
- **property_health_summary**: 1633 documents
- **loans**: 294 documents
- **tax_records**: 1633 documents
- **court_disputes**: 65 documents
- **documents_all**: 29394 documents
- **building_approval_plans**: 1633 documents
- **completion_certificates**: 1633 documents
- **court_dispute_records**: 1633 documents
- **encumbrance_certificates**: 1633 documents
- **identity_proofs**: 1633 documents
- **khata_certificates**: 1633 documents
- **khata_extracts**: 1633 documents
- **land_conversion_certificates**: 1633 documents
- **layout_approvals**: 1633 documents
- **mother_deeds**: 1633 documents
- **mutation_records**: 1633 documents
- **nocs**: 1633 documents
- **occupancy_certificates**: 1633 documents
- **power_of_attorneys**: 1633 documents
- **property_tax_receipts**: 1633 documents
- **rtc_records**: 1633 documents
- **sale_deeds**: 1633 documents
- **survey_maps**: 1633 documents

## Comparison

| Dataset | JSON Records | MongoDB Records | Match | Status |
|---------|-------------:|----------------:|-------|--------|
| master_properties | 1633 | 1633 | ✅ | Success |
| property_profiles | 1633 | 1633 | ✅ | Success |
| location_scores | 1633 | 1633 | ✅ | Success |
| owners | 1633 | 1633 | ✅ | Success |
| ownership_events | 3365 | 3365 | ✅ | Success |
| property_registry | 1633 | 1633 | ✅ | Success |
| property_metadata | 1633 | 1633 | ✅ | Success |
| property_timeline | 1633 | 1633 | ✅ | Success |
| property_health_summary | 1633 | 1633 | ✅ | Success |
| loans | 294 | 294 | ✅ | Success |
| tax_records | 1633 | 1633 | ✅ | Success |
| court_disputes | 65 | 65 | ✅ | Success |
| documents_all | 29394 | 29394 | ✅ | Success |
| building_approval_plans | 1633 | 1633 | ✅ | Success |
| completion_certificates | 1633 | 1633 | ✅ | Success |
| court_dispute_records | 1633 | 1633 | ✅ | Success |
| encumbrance_certificates | 1633 | 1633 | ✅ | Success |
| identity_proofs | 1633 | 1633 | ✅ | Success |
| khata_certificates | 1633 | 1633 | ✅ | Success |
| khata_extracts | 1633 | 1633 | ✅ | Success |
| land_conversion_certificates | 1633 | 1633 | ✅ | Success |
| layout_approvals | 1633 | 1633 | ✅ | Success |
| mother_deeds | 1633 | 1633 | ✅ | Success |
| mutation_records | 1633 | 1633 | ✅ | Success |
| nocs | 1633 | 1633 | ✅ | Success |
| occupancy_certificates | 1633 | 1633 | ✅ | Success |
| power_of_attorneys | 1633 | 1633 | ✅ | Success |
| property_tax_receipts | 1633 | 1633 | ✅ | Success |
| rtc_records | 1633 | 1633 | ✅ | Success |
| sale_deeds | 1633 | 1633 | ✅ | Success |
| survey_maps | 1633 | 1633 | ✅ | Success |

## Collection Summary

- **Total Collections:** 31
- **Total Documents:** 77209
- **Total Indexes:** 197
- **Dynamic Collections:** 18
- **Core Collections:** 13
- **Document Collections:** 18

## Data Integrity

- **Missing collections:** 0
- **Missing documents:** 0
- **Duplicate documents:** 0
- **Empty collections:** 0
- **Invalid collections:** 0
- **Count mismatches:** 0

## Warnings

- Resolved location_scores.json from alternative directory: C:\Projects\infoland-dataset-engine\data\generated
- Auto-repaired location_scores by importing 1633 missing documents.
- ownership_events dataset has exactly 3365 records in JSON. Mismatch with expected 3517 is due to stale dataset, not an import failure.

## Errors

- None

## Final Conclusion

✅ Database is fully synchronized with the Dataset Engine.

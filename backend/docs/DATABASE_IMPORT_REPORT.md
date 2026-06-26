# Database Import Report

## MongoDB Information

- **Project Name:** InfoLand AI
- **Cluster Name:** ac-5pnvcds-shard-00-00.joyzfet.mongodb.net
- **Database Name:** infoland_ai
- **Import Date:** 2026-06-26
- **Import Time:** 10:57:18
- **Import Duration:** 20.05 seconds
- **Connection Status:** Success

---

# Existing Database Statistics

## Before Import

- **Total Collections:** 13
- **Total Documents:** 46182

### Existing Collections

| Collection Name | Existing Documents | Status |
|-----------------|-------------------:|--------|
| court_disputes | 65 | Already Existing |
| documents_all | 29394 | Already Existing |
| loans | 294 | Already Existing |
| location_scores | 0 | Already Existing |
| master_properties | 1633 | Already Existing |
| owners | 1633 | Already Existing |
| ownership_events | 3365 | Already Existing |
| property_health_summary | 1633 | Already Existing |
| property_metadata | 1633 | Already Existing |
| property_profiles | 1633 | Already Existing |
| property_registry | 1633 | Already Existing |
| property_timeline | 1633 | Already Existing |
| tax_records | 1633 | Already Existing |

---

# Newly Imported Collections

| Dataset File | Collection Name | Documents Found | Documents Inserted | Indexes Created | Status |
|--------------|-----------------|----------------:|-------------------:|----------------:|--------|
| building_approval_plans.json | building_approval_plans | 1633 | 1633 | 8 | Success |
| completion_certificates.json | completion_certificates | 1633 | 1633 | 8 | Success |
| court_dispute_records.json | court_dispute_records | 1633 | 1633 | 8 | Success |
| encumbrance_certificates.json | encumbrance_certificates | 1633 | 1633 | 8 | Success |
| identity_proofs.json | identity_proofs | 1633 | 1633 | 8 | Success |
| khata_certificates.json | khata_certificates | 1633 | 1633 | 8 | Success |
| khata_extracts.json | khata_extracts | 1633 | 1633 | 8 | Success |
| land_conversion_certificates.json | land_conversion_certificates | 1633 | 1633 | 8 | Success |
| layout_approvals.json | layout_approvals | 1633 | 1633 | 8 | Success |
| mother_deeds.json | mother_deeds | 1633 | 1633 | 8 | Success |
| mutation_records.json | mutation_records | 1633 | 1633 | 8 | Success |
| nocs.json | nocs | 1633 | 1633 | 8 | Success |
| occupancy_certificates.json | occupancy_certificates | 1633 | 1633 | 8 | Success |
| power_of_attorneys.json | power_of_attorneys | 1633 | 1633 | 8 | Success |
| property_tax_receipts.json | property_tax_receipts | 1633 | 1633 | 8 | Success |
| rtc_records.json | rtc_records | 1633 | 1633 | 8 | Success |
| sale_deeds.json | sale_deeds | 1633 | 1633 | 8 | Success |
| survey_maps.json | survey_maps | 1633 | 1633 | 8 | Success |

---

# Existing Collections Summary

| Collection Name | Existing Documents | Status |
|-----------------|-------------------:|--------|
| master_properties | 1633 | Skipped (Already Imported) |
| property_profiles | 1633 | Skipped (Already Imported) |
| owners | 1633 | Skipped (Already Imported) |
| ownership_events | 3365 | Skipped (Already Imported) |
| property_registry | 1633 | Skipped (Already Imported) |
| property_metadata | 1633 | Skipped (Already Imported) |
| property_timeline | 1633 | Skipped (Already Imported) |
| property_health_summary | 1633 | Skipped (Already Imported) |
| loans | 294 | Skipped (Already Imported) |
| tax_records | 1633 | Skipped (Already Imported) |
| court_disputes | 65 | Skipped (Already Imported) |
| documents_all | 29394 | Skipped (Already Imported) |

---

# Final Database Statistics

| Collection | Document Count |
|------------|---------------:|
| building_approval_plans | 1633 |
| completion_certificates | 1633 |
| court_dispute_records | 1633 |
| court_disputes | 65 |
| documents_all | 29394 |
| encumbrance_certificates | 1633 |
| identity_proofs | 1633 |
| khata_certificates | 1633 |
| khata_extracts | 1633 |
| land_conversion_certificates | 1633 |
| layout_approvals | 1633 |
| loans | 294 |
| location_scores | 0 |
| master_properties | 1633 |
| mother_deeds | 1633 |
| mutation_records | 1633 |
| nocs | 1633 |
| occupancy_certificates | 1633 |
| owners | 1633 |
| ownership_events | 3365 |
| power_of_attorneys | 1633 |
| property_health_summary | 1633 |
| property_metadata | 1633 |
| property_profiles | 1633 |
| property_registry | 1633 |
| property_tax_receipts | 1633 |
| property_timeline | 1633 |
| rtc_records | 1633 |
| sale_deeds | 1633 |
| survey_maps | 1633 |
| tax_records | 1633 |

---

# Overall Summary

- **Total JSON Files Processed:** 31
- **Core Dataset Files:** 13
- **Document Dataset Files:** 18
- **Collections Before Import:** 13
- **Collections After Import:** 31
- **New Collections Created:** 18
- **Existing Collections Skipped:** 12
- **Total Documents Before Import:** 46182
- **Total Documents Imported:** 29394
- **Total Documents After Import:** 75576
- **Indexes Created:** 144
- **Warnings:** 1
- **Errors:** 0
- **Import Duration:** 20.05 seconds


# InfoLand AI - MongoDB Integration & Dataset Import

## Overview
This document covers the MongoDB Atlas configuration and dataset import mechanism for InfoLand AI.

## Architecture

- **Project:** InfoLand AI
- **Cluster:** Cluster0 / ac-5pnvcds-shard-00-00.joyzfet.mongodb.net
- **Database:** infoland_ai

### Connection Setup
The application uses Mongoose to connect to the MongoDB Atlas cluster. The database connection script (`src/config/database.js`) handles:
- Reusable connection with a robust retry mechanism (5 attempts by default).
- Detailed logging for successful and failed connections.
- Graceful shutdown listening to `SIGINT`, terminating the DB connection properly when the app process stops.

### Core Mongoose Models
The following Mongoose models are explicitly defined for core datasets:

- `MasterProperty` (`master_properties`)
- `PropertyProfile` (`property_profiles`)
- `LocationScore` (`location_scores`)
- `Owner` (`owners`)
- `OwnershipEvent` (`ownership_events`)
- `PropertyRegistry` (`property_registry`)
- `PropertyMetadata` (`property_metadata`)
- `PropertyTimeline` (`property_timeline`)
- `PropertyHealthSummary` (`property_health_summary`)
- `Loan` (`loans`)
- `TaxRecord` (`tax_records`)
- `CourtDispute` (`court_disputes`)
- `Document` (`documents_all`)

### Dynamic Document Collections
The import script dynamically discovers all `.json` files inside the dataset engine's `documents/` folder. It automatically creates dynamic flexible schemas (`strict: false`) and provisions indexes for these fields if present: `property_id`, `document_id`, `document_number`, `document_type`, `owner_id`, `issue_date`, `expiry_date`, `registration_number`.

Current dynamically imported collections (Total 18):
- `building_approval_plans`
- `completion_certificates`
- `court_dispute_records`
- `encumbrance_certificates`
- `identity_proofs`
- `khata_certificates`
- `khata_extracts`
- `land_conversion_certificates`
- `layout_approvals`
- `mother_deeds`
- `mutation_records`
- `nocs`
- `occupancy_certificates`
- `power_of_attorneys`
- `property_tax_receipts`
- `rtc_records`
- `sale_deeds`
- `survey_maps`

**Total Collections:** 31

## Dataset Source
Datasets are expected to be located in the sibling `infoland-dataset-engine` repository.

By default, the script looks in:
`../infoland-dataset-engine/release/generated/`

## Import Workflow

To initiate the import, a Node.js script reads the generated JSON files and pushes them to Atlas.

### Environment Variables
Ensure your `.env` contains the following:
```env
MONGODB_URI=mongodb+srv://<user>:<pass>@<cluster-url>/infoland_ai?appName=Cluster0
DATASET_ENGINE_PATH=../../infoland-dataset-engine/release/generated
```

### Running the Import
Use the following command from the `backend/` directory:
```bash
npm run import-data
```
*(Or if npm scripting execution is restricted by your system policy: `node src/scripts/importDatasets.js`)*

### Import Behavior
- **Dynamic Discovery**: Scans `documents/` for all datasets and generates equivalent collections.
- **Before/After Statistics**: Evaluates MongoDB state before executing, and logs a comprehensive breakdown after execution.
- **Idempotency**: The script checks if a collection is already populated (`count > 0`). If it is, the file is skipped to avoid duplication.
- **Batching**: Large datasets are inserted in batches of 5000 to prevent out-of-memory errors and timeout issues.
- **Error Handling**: Missing files are skipped without breaking the import. Any other errors are caught and logged.
- **Reporting**: Generates a massive before/after summary report automatically at `docs/DATABASE_IMPORT_REPORT.md` on every run.

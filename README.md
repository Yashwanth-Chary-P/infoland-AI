# InfoLand AI Backend

## Phase 1 Implementation

This repository contains the backend for InfoLand AI, an AI-powered Property Verification and Risk Assessment Platform. 
Phase 1 focuses on building the backend foundation and core read-only APIs using the existing MongoDB dataset.

### Architecture & Folder Structure

The project follows a clean architecture pattern:
- `backend/src/config/` - Environment variables, Database connection, Firebase setup, Swagger configuration
- `backend/src/controllers/` - Express route handlers focusing on HTTP request/response handling
- `backend/src/services/` - Business logic and data consolidation
- `backend/src/repositories/` - Data access layer directly interacting with Mongoose models
- `backend/src/models/` - Mongoose schemas mapping to MongoDB collections
- `backend/src/routes/` - API route definitions
- `backend/src/middleware/` - Custom middleware (Authentication, Error Handling, Validation, 404)
- `backend/src/validators/` - Joi schemas for request validation
- `backend/src/utils/` - Shared utilities like Logger, API response formatter, and Query helpers

### Installation & Running

1. Install dependencies:
   ```bash
   cd backend
   npm install
   ```

2. Environment Variables (`backend/.env`):
   ```env
   PORT=5000
   MONGODB_URI=<your-mongodb-uri>
   ```

3. Start the server:
   ```bash
   # Development (with nodemon)
   npm run dev

   # Production
   npm start
   ```

### Implemented APIs (Phase 1)

#### Health
- `GET /api/health` - Server health check

#### Properties
- `GET /api/properties` - List properties with pagination, sorting, and filtering
- `GET /api/properties/search` - Search properties
- `GET /api/properties/:propertyId` - Consolidated details (Master Property, Profile, Metadata, Location Score, Current Owner, Health Summary)

#### Owners
- `GET /api/owners/:propertyId` - Current owner of a property
- `GET /api/ownership/history/:propertyId` - Ownership history, timeline, and chain

#### Documents
- `GET /api/documents/:propertyId` - All documents for a property grouped by type
- `GET /api/documents/document/:documentId` - Single document details
- `GET /api/documents/missing/:propertyId` - Available, expired, and missing documents overview

#### Financial & Legal
- `GET /api/loans/:propertyId` - Active and closed loans
- `GET /api/tax/:propertyId` - Tax payment records
- `GET /api/disputes/:propertyId` - Court disputes

#### Property Health
- `GET /api/property-health/:propertyId` - Aggregated summary of documents, loans, taxes, and disputes with an overall health score.

### API Documentation
Interactive Swagger documentation is available at `/api-docs` when the server is running.

### Authentication
Firebase authentication is integrated. API endpoints require a valid Firebase ID token passed in the `Authorization` header as a Bearer token.

### Database Collections Used
- `master_properties`
- `property_profiles`
- `owners`
- `ownership_events`
- `property_registry`
- `property_metadata`
- `property_timeline`
- `property_health_summary`
- `documents_all`
- `loans`
- `tax_records`
- `court_disputes`
- `location_scores`
- `synthetic_pois`

### Current Progress
Phase 1 (Backend Foundation and Core Read-Only APIs) is fully completed. The backend has a robust structure, clean architecture, and exposes properties, financial details, documents, and ownership through REST APIs.
ntainer section here.

---

If you'd like, I can also add a `CONTRIBUTING.md` file or a `LICENSE` file based on your preferred license. What would you like me to do next?




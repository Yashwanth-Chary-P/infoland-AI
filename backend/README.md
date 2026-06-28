# Infoland-AI Backend

## Project Overview
Infoland-AI is an advanced property verification platform designed to ingest, process, and analyze property datasets across various domains (Ownership, Documents, Financial, Legal). The backend acts as the core engine powering the verification algorithms, timeline generation, and risk assessment payloads.

## Features
- Foundational property search and retrieval.
- Document completeness evaluation.
- Ownership transfer timeline analysis.
- Encumbrance and tax verification.
- Legal dispute timeline and mapping.
- Dynamic risk assessment and grading engine.

## Tech Stack
- **Node.js & Express.js:** API architecture.
- **MongoDB:** NoSQL Database for robust, schema-flexible storage.
- **Swagger:** Interactive API Documentation.
- **Mongoose:** Object Data Modeling (ODM).

## Backend Architecture
See [ARCHITECTURE.md](docs/ARCHITECTURE.md) for full details. The project strictly follows a multi-tier service pattern:
`Routes -> Controllers -> Services -> Repositories -> MongoDB`

## Folder Structure
```
backend/
├── src/
│   ├── config/       # Environment & Database Configurations
│   ├── controllers/  # Request Handlers (Thin Layer)
│   ├── middleware/   # Custom Express Middlewares (Auth, Error, 404)
│   ├── models/       # Mongoose Schemas
│   ├── repositories/ # Data Access Layer
│   ├── routes/       # API Routing Definitions
│   ├── services/     # Business Logic & Aggregations
│   └── utils/        # Helpers (Pagination, Responses)
├── docs/             # Technical Documentation
└── server.js         # Entry Point
```

## Installation
1. Clone the repository.
2. Ensure Node.js (v18+) is installed.
3. Run `npm install`.

## Running the Project
- **Development:** `npm run dev`
- **Production:** `npm start`

## Environment Variables
Create a `.env` file referencing `.env.example`. Required variables:
- `PORT`
- `MONGODB_URI`

## API Documentation
The APIs are fully documented using Swagger UI.
- Local URL: `http://localhost:5000/api-docs`
- See [API_DOCUMENTATION.md](docs/API_DOCUMENTATION.md) for a summary.

## Backend Modules
The backend has completed Phase 2, which introduces 6 core modules:
1. Verification Foundation
2. Document Verification
3. Ownership & Registry
4. Financial Verification
5. Legal & Historical Timeline
6. Risk Assessment & Final Verification

See [BACKEND_PHASE2.md](docs/BACKEND_PHASE2.md) for details.

## Future Roadmap
- Integration with an external Dataset Engine for real-time synchronization.
- Frontend dashboard integration consuming the Module 6 aggregation payloads.

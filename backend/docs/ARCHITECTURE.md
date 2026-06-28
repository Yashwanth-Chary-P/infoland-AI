# System Architecture

## Layered Architecture
Infoland-AI follows a strict multi-tier, read-optimized layered architecture to ensure separation of concerns and high performance.

**Routes → Controllers → Services → Repositories → MongoDB**

1. **Routes (`src/routes/`)**
   - Declares the RESTful paths.
   - Contains Swagger documentation blocks mapping endpoints to schemas.
   - Routes requests directly to controllers.

2. **Controllers (`src/controllers/`)**
   - Thin wrappers responsible exclusively for HTTP transport.
   - Extracts `req.params`, `req.query`, and `req.body`.
   - Invokes the appropriate Service.
   - Uses `successResponse()` and `errorResponse()` utility formats.
   - Must **never** contain business logic.

3. **Services (`src/services/`)**
   - The core brain of the backend.
   - Handles all computations, data aggregation, formatting, and risk algorithms.
   - Calls multiple repositories if necessary (e.g., using `Promise.all`).
   - Translates raw database documents into Computed Backend Fields.

4. **Repositories (`src/repositories/`)**
   - The sole layer permitted to interact with MongoDB.
   - Exposes clean methods like `findDocumentsByPropertyId`.
   - Does not perform business logic. Strictly handles data access (`.find()`, `.lean()`, `.countDocuments()`).
   - Read-heavy optimization.

5. **MongoDB (`src/models/`)**
   - Defines Mongoose schemas matching the Dataset Engine.
   - Enforces strict typing but avoids complex pre/post hooks to keep the data layer dumb and fast.

## Request Lifecycle
1. Request hits `/api/...` in Express.
2. Global middleware applies CORS and Morgan logging.
3. Route catches the endpoint and executes the Controller.
4. Controller passes ID to the Service.
5. Service orchestrates `Promise.all` across Repositories.
6. Repositories query MongoDB and return raw objects.
7. Service dynamically computes statuses (e.g. `active_dispute`, `risk_score`), strips internal fields (`_id`), and returns the payload.
8. Controller wraps payload in standard JSON and sends response.

## Design Principles
- **No N+1 Queries**: Data is mapped in-memory after single bulk fetches.
- **Promise.all Heavy**: Cross-collection aggregations are fetched concurrently.
- **Computed Fields over Stored States**: Risk, recommendations, and aggregated health scores are NEVER stored in MongoDB. They are evaluated at runtime to guarantee accuracy against live underlying collection states.

## Error Handling
- A `globalErrorHandler` catches all uncaught exceptions in Express.
- Not Found (404) requests are intercepted by `notFoundHandler`.
- Services explicitly throw standard `Error` objects with `.statusCode` properties to bubble up clean HTTP errors.

## Logging Strategy
- Morgan is used for HTTP request logging in development.
- Errors are output to `console.error` alongside structured JSON traces.

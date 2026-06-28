# Lessons Learned

## 1. Repository Pattern
Strict adherence to the repository pattern proved essential. Keeping Mongoose/MongoDB logic strictly confined to the `repositories/` directory allowed the `services/` layer to remain database-agnostic. This became crucial when we needed to reuse data across modules (e.g., Module 6 consuming outputs from Modules 1-5 without re-querying the database).

## 2. Promise.all and Concurrent Fetching
Using `Promise.all` for parallel data fetching significantly reduced latency. Instead of awaiting ownership, then financial, then legal collections sequentially, fetching them concurrently proved to be a major performance optimization.

## 3. Avoiding N+1 Queries
We completely avoided N+1 queries by fetching arrays of events (e.g., all `ownership_events` for a property) in a single query, and mapping them in-memory against a dictionary of `owners` fetched in a second single query. 

## 4. Computed Fields vs Database Storage
A core architectural decision was to NEVER store dynamic risk scores, recommendations, or active dispute counts in the database. Computing these at runtime ensures that the verification dashboard always perfectly reflects the live state of the underlying `court_disputes` and `documents_all` collections, preventing data synchronization bugs.

## 5. Layer Separation
Ensuring that Express Controllers remained extremely thin (just extracting `req.params` and returning `res.json`) made the system highly testable. Service methods could be invoked directly via local node scripts without needing to spin up an HTTP server or mock request objects.

## 6. Swagger Best Practices
Adding Swagger definitions directly above the route definitions in `*.routes.js` kept documentation synced with the code. Explicitly documenting which fields were "Database Fields" vs "Computed Backend Fields" greatly improved frontend integration clarity.

## 7. MongoDB Internal Field Leaks
We discovered that `find().lean()` returns internal MongoDB fields (`_id`, `__v`). We implemented an aggressive `_stripInternalFields` normalization layer in our services to ensure frontend clients only received business-domain IDs (e.g., `event_id`, `property_id`).

## 8. Graceful Fallbacks for Missing Data
Because the Dataset Engine does not always provide exact dates for court disputes, we learned to gracefully fall back to the `createdAt` timestamp. Similarly, computing `confidence_level` dynamically based on collection availability prevents the backend from crashing when dealing with incomplete property datasets.

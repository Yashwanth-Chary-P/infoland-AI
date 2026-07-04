# Frontend Architecture

The InfoLand AI Frontend leverages a modern React ecosystem optimized for complex state mapping and enterprise-grade performance.

## Core Technologies
*   **Framework:** React 18
*   **Build Tool:** Vite
*   **Routing:** React Router v6
*   **State Management:** Redux Toolkit (RTK)
*   **Styling:** Tailwind CSS (utility-first)
*   **Mapping:** Leaflet & React-Leaflet
*   **Analytics:** Chart.js & react-chartjs-2

## Routing & Lazy Loading
The `AppRouter.jsx` explicitly wraps application routes in `React.lazy()` and `<Suspense>`.
*   **Why?** The mapping (Leaflet) and chart (Chart.js) libraries are heavy. By lazy-loading routes like `/explore` and `/dashboard`, marketing pages (`/`, `/about`) load instantly without fetching mapping binaries.
*   **NProgress:** We integrated `nprogress` via `RouteProgress.jsx` to show a slim loading bar at the top of the viewport when chunk loading occurs.

## Redux & State Flow
Redux Toolkit manages all asynchronous data interactions via Thunks.
### Slices
1.  **`propertiesSlice`**: Manages the paginated array of `master_properties`. Keeps the Map and Sidebar synchronized.
2.  **`detailedPlotsSlice`**: Caches the deep-populated property objects. Prevents redundant API calls when a user navigates from the Map to the Report and back.
3.  **`analyticsSlice`**: Fetches and stores the dashboard KPI datasets (Dashboard stats, Property Types, Verifications).

## Component Hierarchy & Organization
```text
frontend/src/
  ├── components/        # Reusable UI (Buttons, Badges, EmptyStates)
  │   ├── common/        # Dumb presentation components
  │   └── layout/        # AppLayout, Navbar, Footer
  ├── pages/             # Smart components mapped to routes
  │   ├── Explore/       # Container for Map + Sidebar
  │   ├── PropertyReport/# Dynamic layout with specific Tabs (Ownership, Docs)
  │   └── Dashboard/     # Analytics container
  └── features/          # Redux slices and Thunks
```

## Error Handling
*   **`ErrorBoundary.jsx`**: Wraps the root. Catches React rendering errors, preventing the "White Screen of Death".
*   **404 Not Found**: Catches undefined URLs.
*   **500 Server Error**: Handled via routing when backend APIs throw catastrophic failures.
*   **Notifications**: Handled globally by `react-hot-toast`, exposing simple `toast.success()`, `toast.error()`, and `toast.info()` methods.

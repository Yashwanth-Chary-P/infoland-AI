# InfoLand AI Frontend

This is the production-ready frontend for the InfoLand AI application.

## Architecture
- **Framework**: React.js with Vite
- **Routing**: React Router DOM (with route-level code splitting)
- **State Management**: Redux Toolkit (with data caching)
- **Styling**: Tailwind CSS & vanilla CSS
- **Maps**: React Leaflet
- **Charts**: Chart.js & react-chartjs-2

## Folder Structure
```
src/
├── components/   # Reusable UI components (Navbar, Footer, PlotDetails)
├── features/     # Redux slices
├── pages/        # Main route components (lazy loaded)
├── routers/      # Application routing and lazy-loading boundaries
└── services/     # API Axios client and endpoints
```

## Environment Variables
The application requires the following environment variables to be set (typically in `.env`):
- `VITE_API_BASE_URL`: The backend API base URL (e.g., `http://localhost:5000/api/v1`)

## Build Instructions
1. Install dependencies: `npm install`
2. Run local development server: `npm run dev`
3. Create a production build: `npm run build`

## Optimization Summary (Module 3)
- **Chunk Splitting**: Heavy dependencies like React, Leaflet, and Chart.js are chunked separately via `vite.config.js` to improve initial load time.
- **Lazy Loading**: Route-level React.lazy() and Suspense boundaries prevent downloading massive map and analytics scripts on the homepage.
- **Accessibility**: Keyboard focus rings and aria-labels have been polished.
- **Responsiveness**: Tailored to gracefully scale down from large desktops to 320px mobile devices without horizontal overflow.
- **State Caching**: The Redux architecture automatically caches and reuses fetched data to prevent duplicate network calls.

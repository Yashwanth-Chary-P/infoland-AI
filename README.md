# infoLand

![Stack](https://img.shields.io/badge/stack-Node.js%20%7C%20React%20%7C%20Vite-blue)
![License](https://img.shields.io/badge/license-See%20README-lightgrey)

Shortland: A full-stack project for managing and exploring land plot data with a React + Vite frontend and an Express + MongoDB backend.

## Overview

infoLand is a compact platform that provides an API for land plot data (basic and detailed) and a React-based frontend for browsing, mapping, and inspecting plots. The repository contains two main parts:

- `backend/` — Express server, MongoDB models, and API routes for plot data.
- `frontend/` — React + Vite application with map views, plot selection UI, and authentication scaffolding.

## Objectives & Problem Statement

Many land administration and mapping tools are complex and heavyweight. infoLand aims to provide a minimal, developer-friendly platform to:

- Store and expose land plot records (both summary/basic and detailed survey geometries).
- Provide a lightweight UI to explore plots on a map and view details.
- Serve as a starting point for internships, technical interviews, and demo portfolios showcasing full-stack skills.

## Key Features (from repository)

- REST API with endpoints for basic and detailed plot records (`/api/plots/basic`, `/api/plots/detailed`).
- Mongoose data models for `PlotBasic` and `PlotDetailed` including coordinate geometry.
- React frontend using Vite, with map integration (Leaflet), Redux Toolkit slices for plots, and Firebase authentication scaffolding.
- Modern front-end tooling: Tailwind CSS, Vite, and ESLint.
- Backend dotenv support and MongoDB connectivity.

## Prerequisites

- Node.js (v16+ recommended)
- npm or yarn
- MongoDB instance (local or Atlas)
- (Optional) Firebase project for frontend authentication

## Installation

1. Clone the repository:

	 git clone <repo-url>
	 cd infoLand

2. Install dependencies for backend and frontend:

	 # Backend
	 cd backend && npm install

	 # Frontend
	 cd ../frontend && npm install

3. Create environment variable files as needed (see Environment Variables below).

## Environment Variables

This project expects environment variables for backend and frontend.

- Backend (`backend/.env`):

	- `MONGO_URI` — MongoDB connection string (required)
	- `PORT` — optional server port (default 5000)

- Frontend (Vite `.env` or `.env.local` in `frontend/`):

	- `VITE_API_KEY` — Firebase API key
	- `VITE_AUTH_DOMAIN` — Firebase auth domain
	- `VITE_PROJECT_ID` — Firebase project ID
	- `VITE_STORAGE_BUCKET` — Firebase storage bucket
	- `VITE_MESSAGING_SENDERID` — Firebase messaging sender id
	- `VITE_APPID` — Firebase app id

These keys are referenced by `frontend/src/firebase/firebase.config.js` and the backend reads `MONGO_URI` from `process.env` in `backend/server.js`.

## Local development

- Start the backend server (from `backend/`):

	npm run dev

- Start the frontend (from `frontend/`):

	npm run dev

Both servers can run concurrently; frontend expects the backend API under `/api/plots/*` (relative path used in the app).

## Build & Run (Production)

- Build frontend (from `frontend/`):

	npm run build

- Serve backend (from `backend/`):

	npm start

## Architecture

The project follows a simple full-stack separation:

- Backend (Express + MongoDB): exposes REST endpoints under `/api/plots/*` and contains Mongoose models for plot data.
- Frontend (React + Vite): single-page application that consumes the backend API, displays maps (Leaflet), and provides UI for selection and details.

### Technology Stack

| Layer | Primary Technologies |
|---|---|
| Backend | Node.js, Express, Mongoose, MongoDB |
| Frontend | React, Vite, Tailwind CSS, Leaflet, Redux Toolkit |
| Authentication | Firebase (client-side auth configured) |

### Repository Structure (top-level)

```
infoLand/
├─ backend/
│  ├─ src/
│  │  ├─ models/
│  │  │  ├─ PlotBasic.model.js
│  │  │  └─ PlotDetailed.model.js
│  │  └─ routers/
│  │     ├─ plotBasic.router.js
│  │     └─ plotDetailed.router.js
│  ├─ package.json
│  └─ server.js
├─ frontend/
│  ├─ src/
│  │  ├─ app/
│  │  ├─ components/
│  │  ├─ features/
│  │  ├─ pages/
│  │  └─ firebase/
│  ├─ package.json
│  └─ vite.config.js
├─ colony-map.html
```

### Major modules

- `backend/src/models` — Mongoose schemas defining `PlotBasic` and `PlotDetailed` records.
- `backend/src/routers` — Express routers exposing GET endpoints for listing and fetching plots by id.
- `frontend/src/pages` & `frontend/src/components` — UI pages (Home, MapSelection, PlotDetails) and shared components (Navbar, Footer, PlotCard).
- `frontend/src/features` — Redux slices for plot data (listed as `plots` and `detailedPlots`).

## API Reference

All backend API routes are mounted under `/api/plots` (see `backend/server.js`). The project exposes two routers:

- `/api/plots/basic` — basic plot summaries (uses `PlotBasic` model)
- `/api/plots/detailed` — detailed plot records including coordinate geometry (uses `PlotDetailed` model)

### Endpoints

- GET `/api/plots/basic` — List all basic plots

	Response (200): JSON array of `PlotBasic` objects. Fields:

	- `plotId` (Number)
	- `owner` (String)
	- `soilType` (String)
	- `area` (Number)
	- `suitability` (String)
	- `recommendations` (Array of { type, builder })

	Example response:

	```json
	[
		{
			"plotId": 101,
			"owner": "Alice",
			"soilType": "Loam",
			"area": 2500,
			"suitability": "High",
			"recommendations": [{ "type": "Crop", "builder": "Local" }]
		}
	]
	```

- GET `/api/plots/basic/:id` — Get a single basic plot by `plotId`

- GET `/api/plots/detailed` — List all detailed plots

	Response (200): JSON array of `PlotDetailed` objects. Key fields:

	- `id` (Number)
	- `Owner`, `SurveyNo`, `Area`, `Village`, `District`, `Type`, `RegistrationYear`, `Status`
	- `Coordinates` — array of coordinate pairs (e.g. `[[lat, lon], [lat, lon], ...]`)

	Example response:

	```json
	[
		{
			"id": 201,
			"Owner": "Bob",
			"SurveyNo": "S-123",
			"Area": "1.5 Acres",
			"Village": "ExampleVillage",
			"District": "ExampleDistrict",
			"Type": "Agriculture",
			"RegistrationYear": 2010,
			"Status": "Registered",
			"Coordinates": [[12.34, 56.78], [12.35, 56.79]]
		}
	]
	```

### Notes

- The backend routers only implement `GET` operations for listing and fetching by id. No create/update/delete endpoints are present in the current codebase.

## Usage Examples

- Example `curl` to get all basic plots (backend running on default port 5000):

	```bash
	curl http://localhost:5000/api/plots/basic
	```

- Example `curl` to fetch a detailed plot by id:

	```bash
	curl http://localhost:5000/api/plots/detailed/201
	```

- Frontend: run the frontend dev server (`npm run dev` in `frontend/`) and open the app in the browser. Use the UI to navigate to map and plot details — the frontend consumes the above API endpoints.

### Screenshots

Screenshots are not included in the repository. Placeholder images can be added under `docs/` and referenced here.

## Contributing

Contributions are welcome. This repository is documented as a learning/demo project. If you'd like to contribute:

1. Fork the repository and create a feature branch: `git checkout -b feat/your-change`
2. Make changes limited to documentation or clearly scoped enhancements. Do not modify business logic unless discussed with maintainers.
3. Open a pull request describing your changes and include screenshots or examples where applicable.

Please follow the existing code style and commit message conventions used in this repository (e.g., `docs:`, `feat:`, `fix:` prefixes).

## Development Workflow

- Use branches for feature work and keep `main` stable.
- Run backend and frontend locally while developing documentation or UI changes.
- Linting and formatting are configured in the frontend; run `npm run lint` in `frontend/` when changing front-end code.

## License

No license file is included in the repository. If you maintain this project, add a `LICENSE` file to clarify reuse terms. A common choice is the MIT license.

## Acknowledgements

- Built with open-source libraries: Express, Mongoose, React, Vite, Leaflet, Tailwind CSS, and Firebase.

## Author / Maintainers

This repository contains work organized into `backend/` and `frontend/`. The commit history contains author information for code contributions. If you are the repository owner, please add contact info or a maintainer section here.

---

If you'd like, I can also add a `CONTRIBUTING.md` file or a `LICENSE` file based on your preferred license. What would you like me to do next?




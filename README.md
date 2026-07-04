<div align="center">
  <img src="https://via.placeholder.com/150" alt="InfoLand AI Logo" width="150" height="150" />
  <h1>InfoLand AI</h1>
  <p><strong>AI-powered Property Verification & Real Estate Intelligence Platform</strong></p>

  [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
  [![Frontend](https://img.shields.io/badge/Frontend-React%20%7C%20Vite-61DAFB?logo=react&logoColor=white)](#)
  [![Backend](https://img.shields.io/badge/Backend-Node.js%20%7C%20Express-339933?logo=node.js&logoColor=white)](#)
  [![Database](https://img.shields.io/badge/Database-MongoDB-47A248?logo=mongodb&logoColor=white)](#)
  [![Status](https://img.shields.io/badge/Status-Frontend%20Frozen-success)](#)
</div>

---

## 📖 Project Overview

**InfoLand AI** is a comprehensive, scalable, and intelligent platform designed to streamline real estate property verification, analytics, and intelligence. 

### The Problem
Traditional property verification involves massive amounts of fragmented data across multiple authorities (RERA, HMDA, DHARANI, Court Cases). Identifying clean properties, historical ownership, and legal disputes is highly manual, error-prone, and time-consuming.

### The Solution
InfoLand AI ingests, normalizes, and aggregates vast datasets of real estate data, transforming it into a seamless, interactive Property Intelligence Workspace. It provides investors, buyers, and authorities with an unprecedented level of transparency via geospatial mapping, deep-dive property reports, and real-time market analytics.

---

## ⚡ Key Features

### 🏢 Backend

* **Dataset Engine**: Automated ingestion, validation, and normalization of raw property datasets.
* **Property APIs**: Robust RESTful APIs delivering paginated, filterable, and deep-populated property profiles.
* **Analytics APIs**: High-performance MongoDB aggregation pipelines computing market KPIs and trends on the fly.
* **Aggregation Engine**: Advanced $lookup and $group queries mapping complex relationships (e.g., plots to projects, owners to court cases).

### 🖥️ Frontend

* **Landing Experience**: High-conversion marketing pages with dark-mode aesthetic and sleek interactions.
* **Explore Workspace**: Interactive Leaflet map synchronized with an advanced sidebar for searching and filtering properties geographically.
* **Property Intelligence Report**: A detailed, multi-tab interface (Overview, Ownership, Documents, Court Cases, Financials, Timeline) rendering enterprise-grade property data.
* **Dashboard & Insights**: Chart.js integrations rendering dynamic backend aggregations (Property Types, Verifications, Regional Stats).

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 18, Vite, React Router 6, Redux Toolkit, Tailwind CSS, Leaflet, Chart.js, React Helmet Async, Lucide Icons |
| **Backend** | Node.js, Express.js, Cors, Helmet, Joi (Validation), Swagger UI |
| **Database** | MongoDB Atlas, Mongoose ODM |
| **Future AI Layer** | FastAPI, Python, LangChain, ChromaDB (Vector Store), RAG |

---

## 🏗️ Architecture

```mermaid
graph TD
    subgraph Frontend [Frontend (React + Redux)]
        UI[React UI Components]
        State[Redux Store]
        UI <--> State
    end

    subgraph Backend [Backend (Node.js + Express)]
        Routes[API Routes]
        Controllers[Controllers]
        Services[Business Logic]
        Repos[Repository Layer]
        
        Routes --> Controllers
        Controllers --> Services
        Services --> Repos
    end

    subgraph Database [Data Layer]
        Mongo[(MongoDB)]
        Dataset[Dataset Engine Scripts]
        Dataset --> Mongo
    end

    subgraph Future [Phase 3: AI Layer]
        FastAPI[FastAPI Service]
        Chroma[(ChromaDB)]
        LangChain[LangChain RAG]
        FastAPI <--> Chroma
        FastAPI <--> LangChain
    end

    State <--> |REST API / JSON| Routes
    Repos <--> |Mongoose ODM| Mongo
    Backend -.- Future
```

---

## 📂 Folder Structure

```text
infoland-AI/
├── backend/
│   ├── src/
│   │   ├── config/          # Environment & Database config
│   │   ├── controllers/     # Route handlers
│   │   ├── middlewares/     # Error handling, validation
│   │   ├── models/          # Mongoose schemas
│   │   ├── repositories/    # Database abstraction layer
│   │   ├── routes/          # Express routing
│   │   ├── services/        # Business logic & aggregations
│   │   └── app.js           # Express app setup
│   └── dataset_engine/      # Scripts for data ingestion
├── frontend/
│   ├── src/
│   │   ├── app/             # Redux store config
│   │   ├── components/      # Reusable UI components
│   │   ├── features/        # Redux slices
│   │   ├── pages/           # Route views (Home, Explore, Dashboard)
│   │   ├── routers/         # Application routing logic
│   │   ├── services/        # API integration layer
│   │   └── utils/           # Helper functions (e.g., toast)
│   └── index.html           # Vite entry point
├── docs/
│   └── final/               # Final project documentation
└── README.md                # This file
```

---

## 🔌 API Overview

InfoLand AI operates via a structured REST API. For full details, see the Swagger documentation (`/api-docs`).

* **`/api/v1/properties`**: Search, filter, and paginate master properties.
* **`/api/v1/properties/:id`**: Deep retrieval of a specific property including joined relationships (Ownership, Timeline, Documents).
* **`/api/v1/analytics`**: Aggregation endpoints for Dashboard and Insights (e.g., `/api/v1/analytics/dashboard-stats`, `/api/v1/analytics/property-types`).
* **`/api/v1/health`**: System health check.

---

## 🚀 Installation & Run Instructions

### 1. Prerequisites
- Node.js (v18+)
- MongoDB Atlas Account (or Local MongoDB)
- Git

### 2. Environment Variables
**Backend (`backend/.env`)**
```env
PORT=5000
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/infoland
NODE_ENV=development
```

**Frontend (`frontend/.env`)**
```env
VITE_API_BASE_URL=http://localhost:5000/api/v1
```

### 3. Running Locally

**Terminal 1: Backend**
```bash
cd backend
npm install
npm run dev
```

**Terminal 2: Frontend**
```bash
cd frontend
npm install
npm run dev
```

Visit `http://localhost:5173` to view the application.

---

## 📈 Development Workflow & Data Flow

1. **Dataset Engine**: Raw JSON/CSV files are processed and seeded into MongoDB collections (`master_properties`, `property_profiles`, `ownership_histories`, etc.).
2. **Backend**: Express exposes this data via the Repository-Service-Controller pattern, ensuring clean separation of concerns and robust error handling.
3. **Frontend**: React components dispatch Redux Thunks. The `apiClient` fetches data from Express, normalizes it, and stores it in Redux slices. The UI reacts to state changes (loading, success, error) dynamically.

---

## 🗺️ Future Roadmap

### ✅ Completed
- [x] Backend Phase 1: Core API & Database Architecture
- [x] Backend Phase 2: Analytics & Aggregation Engine
- [x] Frontend Module 01: Map & Region Navigation
- [x] Frontend Module 02: Landing Experience
- [x] Frontend Module 03: Property Intelligence Workspace
- [x] Frontend Module 04: Analytics & Dataset Intelligence
- [x] Frontend Module 05: Production QA & Freeze

### 🚧 Backend Phase 3 (Next)
- [ ] Implement FastAPI Python Service
- [ ] LangChain & ChromaDB Integration for Vector Search
- [ ] RAG (Retrieval-Augmented Generation) for AI Property Summaries
- [ ] OCR pipeline for Legal Document extraction

### 🔮 Future
- [ ] User Authentication & Authorization (JWT/OAuth)
- [ ] Premium Subscription & Payments Integration
- [ ] Cloud Deployment (AWS/GCP) & CI/CD Pipelines
- [ ] Real-time monitoring and alerting

---

## 👥 Contributors

* **Yashwanth-Chary-P** - *Project Author & Lead Architect*

---

## 📄 License

This project is licensed under the **MIT License**.

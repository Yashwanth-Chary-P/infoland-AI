# System Architecture

The InfoLand AI architecture is designed to handle complex geospatial data, legal property histories, and dynamic analytics. It operates on a robust, decoupled microservice-like strategy separating the UI, API, Data, and (future) AI layers.

## High-Level Architecture Flow

```mermaid
flowchart TD
    %% Frontend Components
    subgraph Frontend [Presentation Layer (React + Vite)]
        Router[React Router]
        UI[UI Components]
        Redux[(Redux Store)]
        
        Router --> UI
        UI <--> Redux
    end

    %% Network
    Client[Web Client] <--> |HTTPS| Router
    Redux <--> |REST / Axios| API Gateway

    %% Backend Components
    subgraph Backend [Backend Service (Node.js + Express)]
        direction TB
        Controllers[API Controllers]
        Services[Business Logic Layer]
        Repositories[Data Access Layer]
        
        Controllers --> Services
        Services --> Repositories
    end

    %% Database
    subgraph Database [Persistence Layer]
        Mongo[(MongoDB Atlas)]
    end

    %% Dataset Engine
    subgraph Ingestion [Dataset Engine]
        ETL[Python/Node ETL Scripts]
        ETL --> |Raw Data| Mongo
    end

    %% Future AI
    subgraph Future_AI [AI Layer (FastAPI) - Phase 3]
        FastAPI[Python FastAPI]
        VectorStore[(ChromaDB)]
        LLM[LangChain RAG]
        
        FastAPI <--> VectorStore
        FastAPI <--> LLM
    end

    %% Connections
    Repositories <--> |Mongoose ODM| Mongo
    Backend -.- |Future Internal Network| Future_AI
```

## Layer Breakdown

### 1. Presentation Layer (Frontend)
Built with **React 18** and **Vite**.
*   **Routing:** React Router manages views (Map, Dashboard, Intelligence Report). Lazy loading is implemented at the route level to split JavaScript chunks.
*   **State Management:** Redux Toolkit handles asynchronous API calls (thunks) and caches property data, preventing redundant network requests when switching between the Map and the Sidebar.
*   **UI Libraries:** Tailwind CSS handles responsive styling, Leaflet handles geospatial rendering, and Chart.js manages visual analytics.

### 2. Application API Layer (Backend)
Built with **Node.js** and **Express.js**.
*   **Controller:** Parses HTTP requests, validates input using `Joi`, and returns standardized JSON responses.
*   **Service:** Contains the core business logic, orchestrating calls between various repositories (e.g., fetching a property, then fetching its associated court cases).
*   **Repository:** The exclusive layer for Mongoose ODM interactions. Handles complex `$lookup` and `$group` MongoDB aggregation pipelines.

### 3. Persistence Layer (Database)
Hosted on **MongoDB Atlas**.
*   **Design:** Data is normalized across specific collections (`master_properties`, `ownership_histories`, `documents`, `court_cases`) to prevent document bloat, but heavily indexed to allow rapid aggregations.

### 4. Dataset Engine (Ingestion)
Scripts responsible for parsing massive CSV/JSON files provided by government datasets, cleaning the data, and inserting it into the MongoDB schemas.

### 5. AI Layer (Future - Phase 3)
A decoupled **Python/FastAPI** service.
*   It will watch MongoDB for updates, embed property legal text into **ChromaDB**, and use **LangChain** to perform Retrieval-Augmented Generation (RAG) to provide natural language property summaries.

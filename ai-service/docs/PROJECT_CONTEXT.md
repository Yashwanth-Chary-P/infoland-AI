# Project Context

# InfoLand AI – AI Service

Version: 1.0

Status: Planning Phase

---

# Project Overview

InfoLand AI is an AI-powered Property Verification and Real Estate Intelligence Platform built specifically for the Indian real estate ecosystem.

Unlike traditional property listing platforms, InfoLand AI focuses on answering one primary question:

> "Is this property legally, financially, and ownership-wise safe to purchase?"

The AI Service extends the existing MERN application by providing semantic search, explainable AI, property intelligence, conversational assistance, and Retrieval-Augmented Generation (RAG).

The AI Service never replaces the backend.

It enhances the backend with AI capabilities.

---

# System Architecture

```
                            InfoLand AI

                    React Frontend (Vite)
                              │
                              ▼
                    Express Backend (Node.js)
                              │
          ┌───────────────────┼───────────────────┐
          │                   │                   │
          ▼                   ▼                   ▼
      MongoDB            release/         Dataset Engine
          │                                   │
          └───────────────────┬───────────────┘
                              │
                              ▼
                    FastAPI AI Service
                              │
          ┌───────────────────┼───────────────────┐
          │                   │                   │
          ▼                   ▼                   ▼
         RAG              ChromaDB          LLM Provider
                              │
                              ▼
                   AI Reports & AI Assistant
```

---

# Project Goals

The AI Service exists to transform structured property information into understandable intelligence.

Primary objectives

- Explain complex property information.
- Generate professional property reports.
- Perform semantic search across datasets.
- Provide conversational AI.
- Generate grounded AI responses.
- Explain verification status.
- Explain ownership history.
- Explain financial and legal risks.
- Produce trustworthy recommendations.

The AI Service should never invent property information.

---

# Existing Project Components

## Frontend

Technology

- React
- Vite
- Redux Toolkit
- Tailwind CSS
- React Router

Responsibilities

- Dashboard
- Property Report
- Explore Workspace
- AI Chat Interface
- Report Viewer

---

## Backend

Technology

- Node.js
- Express
- MongoDB
- Mongoose

Responsibilities

- CRUD APIs
- Authentication
- Business Logic
- Property APIs
- Ownership APIs
- Financial APIs
- Verification APIs
- Analytics APIs

The backend remains the primary business service.

---

## Dataset Engine

The Dataset Engine is an independent repository.

Location

```
../infoland-dataset-engine/
```

Responsibilities

- Geo preprocessing
- Dataset synthesis
- Ownership generation
- Document generation
- Financial datasets
- Legal datasets
- Metadata generation
- Timeline generation
- Release generation

The Dataset Engine is the only system responsible for generating datasets.

---

## Release Folder

Location

```
InfoLand-AI/release/
```

Purpose

Contains exported production-ready datasets.

The AI Service should prefer this location during production deployments.

---

# AI Service Responsibilities

The AI Service is responsible only for AI-related functionality.

Responsibilities include

- Dataset ingestion
- Data validation
- Data normalization
- Embedding generation
- ChromaDB indexing
- Semantic retrieval
- Context construction
- Prompt orchestration
- LLM communication
- Property report generation
- AI assistant
- Explainability

The AI Service must remain stateless whenever possible.

---

# Available Datasets

The following datasets already exist.

- master_properties
- property_profiles
- owners
- ownership_events
- property_registry
- property_metadata
- property_timeline
- property_health_summary
- documents_all
- loans
- tax_records
- court_disputes
- location_scores
- synthetic_pois

These datasets are read-only.

The AI Service must never modify them.

---

# Data Sources

The AI Service supports multiple sources.

Priority 1

release/

↓

Priority 2

Dataset Engine

↓

Priority 3

Express Backend APIs

Data loading should always follow this order.

---

# AI Pipeline

```
Datasets

↓

Loader

↓

Normalizer

↓

Chunk Builder

↓

Embedding Generator

↓

ChromaDB

↓

Retriever

↓

Context Builder

↓

LLM

↓

Grounded Response
```

Every AI response must pass through the complete pipeline.

---

# Module Roadmap

## Module 01

Foundation

Responsibilities

- FastAPI
- Configuration
- Logging
- Dataset Loader
- Data Source Resolver
- Health APIs
- Swagger

---

## Module 02

Vector Database

Responsibilities

- Embeddings
- Chunk Builder
- Metadata
- ChromaDB
- Index Builder
- Synchronization

---

## Module 03

RAG Engine

Responsibilities

- LangChain
- Retriever
- Prompt Templates
- Context Builder
- LLM Integration
- Citation Support

---

## Module 04

Property Intelligence

Responsibilities

- Executive Summary
- Ownership Analysis
- Financial Analysis
- Legal Analysis
- Timeline Analysis
- Verification Summary
- Risk Explanation
- Recommendation Engine
- Property Report Generator

---

## Module 05

AI Assistant

Responsibilities

- Conversational AI
- Property Chat
- Streaming Responses
- Follow-up Questions
- Explainability
- Frontend Integration

---

# Folder Structure

```
ai-service/

├── app/
│   ├── api/
│   ├── core/
│   ├── config/
│   ├── services/
│   ├── storage/
│   ├── rag/
│   ├── schemas/
│   ├── models/
│   ├── utils/
│   ├── tests/
│   └── main.py
│
├── docs/
│
├── requirements.txt
├── .env.example
└── README.md
```

---

# Development Workflow

Development must always follow this sequence.

Module 01

↓

Module 02

↓

Module 03

↓

Module 04

↓

Module 05

A module cannot begin until the previous module satisfies its validation checklist and acceptance criteria.

---

# Long-Term Vision

The AI Service should become the intelligence layer of InfoLand AI.

Future capabilities include

- Property Report Generation
- Explainable AI
- Semantic Search
- Document Question Answering
- Risk Explanation
- Recommendation Engine
- Multi-property Comparison
- AI Property Advisor
- Predictive Analytics
- Multi-agent Workflows

---

# Development Philosophy

The AI Service exists to explain verified information.

It does not replace business logic.

It does not replace the backend.

It does not generate synthetic facts.

Every response must be

- grounded
- explainable
- deterministic where possible
- reproducible
- production-ready

The ultimate goal is to build a scalable AI platform that augments the existing InfoLand AI ecosystem without compromising data integrity or architectural simplicity.
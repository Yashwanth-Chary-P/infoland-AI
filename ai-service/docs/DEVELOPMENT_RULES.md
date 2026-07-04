# Development Rules

## Purpose

This document defines the engineering standards for the InfoLand AI Service.

Every module, feature, endpoint, and AI component must follow these rules.

These rules take precedence over implementation convenience.

---

# Core Principles

## Rule 1

Dataset Engine is the only source responsible for generating datasets.

The AI Service is a consumer only.

---

## Rule 2

Never modify

- Dataset Engine
- Release datasets
- MongoDB business data

The AI Service is strictly read-only.

---

## Rule 3

Never hardcode

- dataset paths
- property IDs
- document names
- owner names
- risk scores
- AI responses

Everything must come from real data.

---

# Architecture Rules

Maintain strict separation.

```
API

↓

Services

↓

Storage

↓

AI

↓

Utilities
```

No shortcuts.

No mixed responsibilities.

---

## API Layer

Responsible only for

- receiving requests
- validating requests
- calling services
- returning responses

No business logic.

---

## Service Layer

Contains

- business logic
- orchestration
- report generation
- AI workflow

No HTTP code.

---

## Storage Layer

Responsible for

- loading datasets
- backend communication
- caching
- vector database

No business logic.

---

## AI Layer

Responsible for

- embeddings
- retrieval
- prompt generation
- LLM interaction
- response generation

No HTTP code.

---

# AI Rules

AI must never hallucinate.

Every answer must be grounded using retrieved context.

If information cannot be verified

Respond

"I don't have sufficient verified information."

Never fabricate

- ownership
- legal history
- loans
- taxes
- documents
- verification status

Always prefer factual responses over confident responses.

---

# Code Standards

Use

- Python type hints
- Pydantic models
- async/await where appropriate
- dependency injection
- reusable services

Every public function

Must contain

- docstring
- parameter description
- return description

---

# Logging

Use structured logging.

Never print.

Log levels

DEBUG

INFO

WARNING

ERROR

CRITICAL

Never log

- API keys
- passwords
- tokens
- sensitive user data

---

# Error Handling

Catch specific exceptions.

Never use

```
except:
```

Always provide meaningful error messages.

Fail fast.

Return standardized responses.

---

# Performance

Avoid duplicate dataset loading.

Reuse loaded datasets.

Reuse ChromaDB connections.

Avoid unnecessary embeddings.

Use lazy loading where possible.

Prefer streaming for large responses.

---

# Testing

Every module must include

- unit tests
- integration tests
- validation tests

AI responses should be validated against known datasets.

---

# Documentation

Every public API

Must appear in

Swagger

Every module

Must include

- README
- Architecture
- Workflow
- Examples

---

# Security

Never expose

- filesystem paths
- internal exceptions
- environment variables

Validate every request.

Sanitize user input.

Limit prompt injection risks.

---

# Development Philosophy

The AI Service exists to explain data.

It does not invent data.

It does not replace business logic.

Business rules belong in the backend.

AI adds intelligence, summarization, reasoning, and explainability on top of verified information.

---

# Long-Term Vision

The project should remain

- modular
- testable
- explainable
- scalable
- production-ready

Every architectural decision should prioritize maintainability over short-term implementation speed.
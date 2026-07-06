# Module 03 — RAG Engine

Version: 1.0

Status: Ready for Implementation

---

# Overview

Module 03 transforms the semantic knowledge created in Module 02 into a Retrieval-Augmented Generation (RAG) system.

This module introduces the complete retrieval pipeline that connects the Large Language Model (LLM) with the vector database.

The AI must never answer from its own knowledge when property information is required.

Every response must be grounded in the retrieved context from the InfoLand datasets.

If sufficient context cannot be retrieved, the AI must explicitly state that the requested information is unavailable.

---

# Objectives

Build a production-ready Retrieval-Augmented Generation pipeline.

The pipeline should

User Query

↓

Embedding Generation

↓

Semantic Retrieval

↓

Metadata Filtering

↓

Context Builder

↓

Prompt Template

↓

LLM

↓

Grounded Response

↓

Citation Generation

---

# Learning Goals

Develop understanding of

- Retrieval-Augmented Generation (RAG)
- LangChain
- Retrievers
- Prompt Engineering
- Context Engineering
- LLM Integration
- AI Guardrails
- Hallucination Prevention
- Explainable AI
- Token Management

---

# Scope

This module includes

✅ LangChain Integration

✅ Retriever

✅ Context Builder

✅ Prompt Templates

✅ LLM Provider Abstraction

✅ RAG Pipeline

✅ Citation Support

✅ Conversation Service

✅ Response Validation

---

This module explicitly excludes

❌ Property Intelligence Reports

❌ AI Recommendation Engine

❌ Financial Analysis

❌ Legal Analysis

❌ Streaming Chat

❌ Session Memory

❌ Multi-Agent Workflows

These belong to later modules.

---

# Architecture

```
User Question

↓

Embedding

↓

Semantic Search

↓

Top-K Chunks

↓

Metadata Filter

↓

Context Builder

↓

Prompt Template

↓

LLM

↓

Grounded Response

↓

Citation Generator
```

---

# Components To Build

## Retriever

Responsibilities

- Query ChromaDB
- Retrieve relevant chunks
- Apply metadata filtering
- Rank results
- Return Top-K documents

No AI generation.

---

## Context Builder

Responsibilities

Convert retrieved chunks into clean context.

The context should

- remove duplicates
- preserve ordering
- preserve metadata
- respect token limits
- maintain readability

---

## Prompt Templates

Create reusable prompt templates.

Examples

- Property Question
- Ownership Question
- Financial Question
- Legal Question
- General Question

Prompt templates should be stored separately from business logic.

---

## LLM Provider

Support provider abstraction.

Supported providers

- OpenAI
- Ollama
- Anthropic

The provider should be configurable.

No hardcoded provider logic.

---

## RAG Engine

Responsible for

User Query

↓

Retrieve

↓

Build Context

↓

Generate Prompt

↓

Call LLM

↓

Validate Response

↓

Return Response

---

## Citation Engine

Every response should include

- source dataset
- document type
- property_id
- chunk reference

Responses must be explainable.

---

## Response Validator

Validate

- Context exists
- LLM response generated
- Response references retrieved information
- Hallucination detection

If context is insufficient

Return

"I don't have sufficient information in the available datasets."

Never fabricate answers.

---

# Prompt Engineering Rules

The system prompt must enforce

- Only answer using retrieved context.
- Never invent facts.
- Never guess.
- State when information is unavailable.
- Preserve factual accuracy.
- Cite supporting documents.

The LLM is an assistant, not the source of truth.

The datasets remain the source of truth.

---

# Retrieval Strategy

Workflow

Generate Query Embedding

↓

Semantic Search

↓

Top-K Retrieval

↓

Metadata Filtering

↓

Context Assembly

↓

Prompt Construction

↓

LLM

Top-K should remain configurable.

Default

Top-K = 5

---

# Token Management

Support

- Context truncation
- Prompt size limits
- Configurable token budgets

Never exceed the configured model context window.

---

# Error Handling

Gracefully handle

Missing context

Empty retrieval

LLM failures

Timeouts

Rate limits

Malformed responses

Return standardized API errors.

---

# Deliverables

By completion the project contains

- LangChain Integration
- Retriever
- Context Builder
- Prompt Templates
- LLM Provider
- Citation Engine
- Response Validator
- RAG Engine
- Conversation Service

---

# Acceptance Criteria

The module is complete when

✅ User questions retrieve relevant context

✅ Prompt built correctly

✅ LLM returns grounded responses

✅ Responses include citations

✅ Hallucinations prevented

✅ Unknown properties return "information unavailable"

✅ Token limits respected

✅ Error handling works

---

# Validation Checklist

Verify

- Retriever accuracy
- Context quality
- Prompt quality
- Citation generation
- LLM provider switching
- Hallucination prevention
- Token usage
- Response validation
- API performance
- Error handling

---

# Output

At completion

```
User Question

↓

Retriever

↓

Context

↓

Prompt

↓

LLM

↓

Grounded Response

↓

Citation
```

The AI Service now supports grounded conversational property intelligence.

---

# Future Integration

Module 04 depends on

- Retriever
- Context Builder
- Prompt Templates
- Citation Engine
- LLM Provider

Module 04 should only consume these services.

No architectural redesign should be required.

---

# Success Criteria

Module 03 is considered complete when the AI Service can

- Understand natural language questions
- Retrieve relevant property information
- Build contextual prompts
- Generate grounded responses
- Prevent hallucinations
- Cite supporting information
- Handle missing data safely

without introducing property-specific business intelligence.

This module establishes the complete Retrieval-Augmented Generation layer upon which Property Intelligence (Module 04) will be built.
# Module 05: AI Property Assistant & Conversational Intelligence

This module transforms the deterministic Property Intelligence Engine into an interactive AI Property Assistant capable of answering natural-language questions, maintaining conversational context, and explaining property intelligence reports using grounded evidence.

Unlike Module 03 (single-turn RAG) and Module 04 (deterministic report generation), this module focuses on multi-turn conversations, explainability, streaming responses, and user interaction while preserving deterministic business logic.

---

# Module Goals

Create an AI Assistant that allows users to naturally converse with the InfoLand AI platform about one or more properties.

The assistant must:

- Answer questions using the existing Property Intelligence Engine.
- Maintain conversation context across multiple turns.
- Explain deterministic risk and verification results.
- Compare multiple properties.
- Provide evidence-backed responses.
- Never hallucinate.
- Preserve citations for every factual claim.

The assistant is responsible for communication—not business decision making.

---

# Topics Covered

## 1. Conversational AI

Transform the current single-turn RAG workflow into a multi-turn conversational assistant.

Support:

- Follow-up questions
- Clarifications
- Context-aware conversations
- Session-based chat

Example:

User:

> Tell me about PROP-KOK-000001.

Assistant:

(Property report)

User:

> Who owns it?

Assistant:

(Current owner)

User:

> Is it safe to buy?

Assistant:

(Explains deterministic report)

---

## 2. Property-aware Assistant

The assistant must understand property-specific conversations.

Examples:

- Explain this property.
- Why is the risk score medium?
- Show missing documents.
- Explain verification.
- Why is this property partially verified?
- Summarize ownership history.
- Explain financial liabilities.

The assistant should retrieve the existing deterministic report rather than recomputing it.

---

## 3. Conversation Memory

Implement conversation memory.

The assistant should remember:

- current property
- compared properties
- previous questions
- previous answers
- conversation history

Support:

- in-memory storage
- Redis (optional future backend)

Memory should automatically expire after configurable inactivity.

---

## 4. Property Comparison

Implement intelligent comparison between multiple properties.

Example:

Compare:

PROP-KOK-000001

vs

PROP-MOK-000090

Compare:

- location
- ownership
- documentation
- financial health
- legal status
- verification
- risk
- recommendations

Generate deterministic comparison tables.

---

## 5. Explainability Engine

Every AI response must include:

- supporting evidence
- citations
- retrieved datasets
- deterministic values

The assistant must explain:

- why the risk score exists
- why recommendations were generated
- why verification failed or passed

Never invent explanations.

---

## 6. Follow-up Question Generator

Automatically generate contextual follow-up questions.

Examples:

After discussing ownership:

- Show ownership timeline.
- Explain ownership transfers.
- Are there legal disputes?

After discussing documentation:

- Which documents are missing?
- Why is documentation incomplete?
- How can verification be improved?

Suggestions must be deterministic.

---

## 7. Streaming Responses

Implement streaming responses.

Support:

Server Sent Events (SSE)

or

WebSockets.

The frontend should receive tokens progressively.

Final payload should include:

- response
- citations
- evidence
- suggested follow-up questions

---

## 8. Explain Risk

The assistant should explain deterministic outputs.

Example:

User:

Why is the risk score only 12?

Assistant:

The score is based on:

- documentation completeness
- ownership history
- financial records
- legal records

The assistant explains the existing score.

It never recalculates it.

---

## 9. Report Q&A

Allow users to ask questions about any section of the Property Intelligence Report.

Examples:

Explain the timeline.

Who owns this property?

Why is verification partial?

Which documents are missing?

Is this property a good investment?

Should a bank finance this property?

---

## 10. Natural Language Property Search

Support queries such as:

Properties in Kokapet

Properties with low risk

Properties having disputes

Properties with missing documents

Properties above location score 80

Properties with no loans

Convert these into structured retrieval operations.

---

## 11. Explainable Recommendations

The Recommendation Engine from Module 04 remains deterministic.

Module 05 only explains:

- why recommendations exist
- which evidence triggered them
- which rules fired

---

## 12. Frontend Integration

Design APIs specifically for the React/Vite frontend.

Responses should support:

- streaming
- citations
- markdown
- follow-up suggestions
- structured metadata

---

# Deliverables

## Conversation Manager

Manage:

- sessions
- context
- conversation history
- active property
- compared properties

---

## Memory Service

Implement:

- in-memory session store
- configurable expiration
- Redis-compatible abstraction

---

## Chat Service

Create:

ConversationService

Responsibilities:

- retrieve context
- call Property Intelligence Engine
- call RAG when necessary
- assemble evidence
- generate response

---

## Follow-up Generator

Generate deterministic follow-up suggestions.

---

## Explainability Service

Package:

- citations
- datasets
- evidence
- retrieved documents
- rule explanations

---

## Streaming Service

Implement:

POST /api/v1/chat/stream

Support:

- SSE

or

- WebSockets

---

## Chat Endpoint

POST

/api/v1/chat

Example:

```json
{
  "session_id": "abc123",
  "property_id": "PROP-KOK-000001",
  "question": "Why is this property low risk?"
}
```

---

## Compare Endpoint

POST

/api/v1/properties/compare

Example:

```json
{
  "properties": [
    "PROP-KOK-000001",
    "PROP-MOK-000090"
  ]
}
```

---

# Acceptance Criteria

- Multi-turn conversations work correctly.

- Property context persists.

- Follow-up questions work.

- Conversation memory expires correctly.

- Property comparison is deterministic.

- Streaming responses function correctly.

- Citations accompany every factual response.

- Risk explanations remain grounded.

- Recommendations are explained without modification.

- No hallucinations.

- Existing Module 03 RAG continues working.

- Existing Module 04 Property Intelligence continues working.

---

# Validation Checklist

## Conversation

- Can the assistant answer follow-up questions?

- Does it remember the current property?

- Does it switch context correctly?

---

## Memory

- Is memory isolated per session?

- Does memory expire?

- Does memory avoid excessive growth?

---

## Streaming

- Handles disconnects.

- Handles reconnects.

- Sends citations at stream completion.

---

## Explainability

- Every factual answer includes citations.

- No fabricated facts.

- No unsupported claims.

---

## Regression

Verify that:

Module 03 APIs continue working.

Module 04 APIs continue working.

No performance regressions.

---

## Performance

Measure:

Average chat latency

Average streaming latency

Memory usage

Context retrieval time

LLM generation time

Total response time

---

# Success Criteria

A successful Module 05 implementation should allow users to naturally converse with InfoLand AI while leveraging the deterministic Property Intelligence Engine developed in Module 04.

The AI Assistant must remain grounded, explainable, deterministic where required, conversational, and production-ready.

The LLM is responsible only for communication and explanation.

All business logic, scoring, recommendations, and verification remain deterministic and continue to be handled by Module 04.
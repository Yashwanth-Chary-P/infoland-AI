# Module 05: AI Assistant

This module adds conversational interfaces and stateful interactions, allowing users to chat naturally with the InfoLand AI about properties.

## Topics Covered

- **Conversational AI**: Transitioning from single-turn RAG to multi-turn conversational agents.
- **Property Chat**: Specific agents tuned for discussing individual properties.
- **Follow-up Questions**: System logic to generate suggested follow-up questions for the user based on the current context.
- **Streaming Responses**: Utilizing Server-Sent Events (SSE) or WebSockets to stream LLM tokens back to the frontend in real-time, improving perceived performance.
- **Conversation Memory**: Storing conversation history so the LLM understands pronouns ("who is the owner of *it*?") and context.
- **Frontend Integration**: Ensuring the API is structured optimally for consumption by the React/Vite frontend.
- **Explainability**: Returning the source documents/citations alongside the conversational response so the user can verify the AI's claims.

## Deliverables
1. Memory management service (e.g., Redis or in-memory session store).
2. Streaming API endpoint (e.g., `POST /api/v1/chat/stream`).
3. Explainability utility to package citations with responses.
4. System prompts tuned for conversational tone and helpfulness.

## Acceptance Criteria
- [ ] A user can ask a question, receive a response, and ask a follow-up question that relies on context from the first interaction.
- [ ] The response is streamed token-by-token to the client.
- [ ] Citations (sources) are included in the final payload of the stream.

## Validation Checklist
- Is memory being cleared or expired appropriately to prevent ballooning costs and context window overflow?
- Does the streaming connection handle client disconnects gracefully?
- Is the conversational tone professional and objective?

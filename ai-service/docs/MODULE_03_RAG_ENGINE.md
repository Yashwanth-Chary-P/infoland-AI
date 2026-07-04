# Module 03: RAG Engine

This module connects the LLM to our local data. It builds the pipeline that takes a user query, retrieves relevant context from the Vector Database, and generates a grounded response.

## Topics Covered

- **LangChain**: Utilization of the LangChain framework to orchestrate the RAG pipeline.
- **Retriever**: Wrapping the ChromaDB vector store into a LangChain retriever interface.
- **Prompt Templates**: Designing strict system prompts that instruct the LLM on how to behave, emphasizing that it must only answer based on the provided context.
- **Context Builder**: Logic to take raw retrieved chunks and format them cleanly into the prompt string.
- **LLM**: Integration with the generative AI model (e.g., OpenAI GPT-4o, Anthropic Claude).
- **Retrieval Pipeline**: The end-to-end chain: `Query -> Retrieve -> Format -> Prompt -> Generate`.
- **Conversation Flow**: Handling basic question-and-answer interactions.

## Deliverables
1. LangChain initialization and configuration.
2. Custom Retrieval QA Chain optimized for property data.
3. System prompt templates defined in a dedicated configuration file or module.
4. An internal API or service method capable of executing a RAG query.

## Acceptance Criteria
- [ ] The RAG engine successfully queries the LLM and returns a response.
- [ ] The LLM response is demonstrably based on the retrieved context, not prior pre-training knowledge.
- [ ] If queried about a property not in the database, the LLM correctly states it does not have the information.

## Validation Checklist
- Are prompts structured to strictly prevent hallucination?
- Is the context window limit of the LLM being respected?
- Are errors from the LLM provider handled and surfaced appropriately via FastAPI?

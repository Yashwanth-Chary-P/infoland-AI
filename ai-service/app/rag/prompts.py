from langchain_core.prompts import ChatPromptTemplate, SystemMessagePromptTemplate, HumanMessagePromptTemplate

# The System Prompt is strict about grounding the response.
SYSTEM_TEMPLATE = """You are InfoLand AI, an expert property intelligence assistant.
Your task is to answer the user's question based strictly on the provided context.

CRITICAL INSTRUCTIONS:
1. Answer ONLY using the information provided in the context below.
2. Do NOT invent, fabricate, or guess any information.
3. If the context does not contain sufficient information to answer the question, you must respond EXACTLY with:
   "I don't have sufficient information in the available datasets."
4. Include inline citations to the Property ID or Source when referring to specific facts.
5. Do not include your own prior knowledge. The datasets remain the single source of truth.

CONTEXT:
{context}
"""

HUMAN_TEMPLATE = """Question: {question}"""

def get_rag_prompt_template() -> ChatPromptTemplate:
    """
    Returns the standard RAG ChatPromptTemplate.
    """
    return ChatPromptTemplate.from_messages([
        SystemMessagePromptTemplate.from_template(SYSTEM_TEMPLATE),
        HumanMessagePromptTemplate.from_template(HUMAN_TEMPLATE)
    ])

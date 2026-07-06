from typing import List
from langchain_core.documents import Document
from app.core.logging import logger

class ResponseValidator:
    """
    Validates RAG responses and ensures strict adherence to hallucination prevention rules.
    """

    INSUFFICIENT_CONTEXT_MSG = "I don't have sufficient information in the available datasets."

    @staticmethod
    def validate_context(documents: List[Document]) -> bool:
        """
        Returns True if sufficient context exists.
        """
        if not documents or len(documents) == 0:
            logger.warning("No context retrieved. Short-circuiting response.")
            return False
        return True

    @staticmethod
    def validate_llm_response(response_text: str) -> str:
        """
        Validates the text returned by the LLM.
        """
        if not response_text or not response_text.strip():
            logger.error("LLM returned an empty response.")
            return ResponseValidator.INSUFFICIENT_CONTEXT_MSG
        
        # If the LLM itself claims it doesn't have the info, we ensure it matches the standard response.
        lower_resp = response_text.lower()
        if "i don't know" in lower_resp or "sufficient information" in lower_resp or "not provided in the context" in lower_resp:
            return ResponseValidator.INSUFFICIENT_CONTEXT_MSG
            
        return response_text

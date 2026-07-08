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
    def validate_llm_response(response_text: str, num_retrieved_docs: int) -> str:
        """
        Validates the text returned by the LLM.
        """
        if num_retrieved_docs == 0:
            logger.warning("No context retrieved. Forcing fallback.")
            return ResponseValidator.INSUFFICIENT_CONTEXT_MSG

        if not response_text or not response_text.strip():
            logger.error("LLM returned an empty response.")
            return ResponseValidator.INSUFFICIENT_CONTEXT_MSG
        
        # If the LLM itself claims it doesn't have the info EXACTLY, we ensure it matches the standard response.
        lower_resp = response_text.strip().lower()
        fallback_msg = ResponseValidator.INSUFFICIENT_CONTEXT_MSG.lower()
        
        # Strip punctuation to do an exact match check against the core fallback message
        import string
        lower_resp_clean = lower_resp.translate(str.maketrans('', '', string.punctuation))
        fallback_msg_clean = fallback_msg.translate(str.maketrans('', '', string.punctuation))

        if lower_resp_clean == fallback_msg_clean:
            return ResponseValidator.INSUFFICIENT_CONTEXT_MSG
            
        return response_text

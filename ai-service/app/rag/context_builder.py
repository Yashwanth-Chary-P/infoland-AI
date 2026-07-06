from typing import List
from langchain_core.documents import Document
from app.core.logging import logger

class ContextBuilder:
    """
    Takes retrieved chunks, deduplicates them, preserves ordering,
    respects limits, and formats them into a clean string for the LLM.
    """
    
    @staticmethod
    def build(documents: List[Document], max_tokens: int = 4000) -> str:
        """
        Builds the context string.
        """
        if not documents:
            return ""

        # 1. Deduplicate by chunk_id
        seen_chunks = set()
        unique_docs = []
        for doc in documents:
            chunk_id = doc.metadata.get("_chunk_id", hash(doc.page_content))
            if chunk_id not in seen_chunks:
                seen_chunks.add(chunk_id)
                unique_docs.append(doc)
                
        # 2. Preserve ordering (assuming they were returned in distance order by retriever, 
        # we will keep the ranking order).
        
        # 3. Format into a clean, readable context string
        context_parts = []
        # Rough token estimation: 1 word ~ 1.3 tokens
        current_token_estimate = 0
        
        for doc in unique_docs:
            source = doc.metadata.get("source_file", "Unknown Source")
            prop_id = doc.metadata.get("property_id", "Unknown ID")
            content = doc.page_content.strip()
            
            chunk_text = f"--- SOURCE: {source} | PROPERTY ID: {prop_id} ---\n{content}\n"
            
            # Simple token limit check
            estimated_tokens = len(chunk_text.split()) * 1.3
            if current_token_estimate + estimated_tokens > max_tokens:
                logger.warning("Context truncated to respect max_tokens limit.")
                break
                
            context_parts.append(chunk_text)
            current_token_estimate += estimated_tokens

        final_context = "\n".join(context_parts)
        logger.info(f"Built context with {len(unique_docs)} unique chunks. Estimated tokens: {int(current_token_estimate)}")
        
        return final_context

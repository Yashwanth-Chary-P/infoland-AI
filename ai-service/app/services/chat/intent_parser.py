import json
from typing import Dict, Any, Optional, Tuple, List
from langchain_core.prompts import PromptTemplate
from langchain_core.output_parsers import JsonOutputParser
from app.rag.llm_factory import get_llm_provider
from app.core.logging import logger

class ChatIntent:
    SPECIFIC_PROPERTY = "specific_property"
    PROPERTY_SEARCH = "property_search"
    COMPARISON = "comparison"
    GENERAL_KNOWLEDGE = "general_knowledge"

class IntentParser:
    """
    Parses a user's natural language request to detect the intent and extract relevant metadata filters 
    or property IDs if a search or comparison is requested.
    """

    def __init__(self):
        self.llm = get_llm_provider()
        
        self.intent_prompt = PromptTemplate.from_template(
            "You are a real estate intent classification system.\n"
            "Analyze the following user question and categorize it into exactly one of these intents:\n"
            "- 'specific_property': Asking about a specific property ID (e.g., PROP-KOK-000001) or referring to 'this property' or 'it'.\n"
            "- 'property_search': Searching for properties matching certain criteria (e.g., 'properties in Kokapet', 'low risk properties', 'properties with missing documents').\n"
            "- 'comparison': Asking to compare two or more specific properties.\n"
            "- 'general_knowledge': Asking general questions about real estate concepts or the platform.\n\n"
            "If the intent is 'property_search', extract the search criteria into a dictionary of exact match filters. "
            "Supported filter keys: 'region', 'future_risk_tier', 'sale_status', 'property_class'. "
            "Leave the dictionary empty if no exact match filters apply.\n\n"
            "Output MUST be a valid JSON object with the following structure:\n"
            "{{\n"
            "  \"intent\": \"<intent_name>\",\n"
            "  \"filters\": {{\"key\": \"value\"}} \n"
            "}}\n\n"
            "User Question: {question}\n"
        )
        self.chain = self.intent_prompt | self.llm | JsonOutputParser()

    async def parse_intent(self, question: str, has_active_property: bool) -> Tuple[str, Dict[str, Any]]:
        """
        Returns the intent string and any extracted metadata filters.
        """
        try:
            # If the user says "Who owns it?" and we have an active property, we can fast-track to specific_property
            # but let's just let the LLM decide.
            result = await self.chain.ainvoke({"question": question})
            
            intent = result.get("intent", ChatIntent.GENERAL_KNOWLEDGE)
            
            # If the LLM thinks it's a specific property but we don't have one and there isn't a PROP- string, it might be confused
            if intent == ChatIntent.SPECIFIC_PROPERTY and not has_active_property and "PROP-" not in question.upper():
                intent = ChatIntent.GENERAL_KNOWLEDGE
                
            filters = result.get("filters", {})
            return intent, filters
            
        except Exception as e:
            logger.error(f"Intent parsing failed: {e}")
            # Fallback
            if has_active_property:
                return ChatIntent.SPECIFIC_PROPERTY, {}
            return ChatIntent.GENERAL_KNOWLEDGE, {}

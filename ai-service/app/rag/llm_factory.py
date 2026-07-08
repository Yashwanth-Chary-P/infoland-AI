from langchain_core.language_models.chat_models import BaseChatModel
from langchain_ollama import ChatOllama
from langchain_openai import ChatOpenAI
from langchain_anthropic import ChatAnthropic
from langchain_groq import ChatGroq
from app.core.config import settings
from app.core.logging import logger


from functools import lru_cache

@lru_cache(maxsize=16)
def get_llm_provider(provider: str = None, model: str = None) -> BaseChatModel:
    """
    Factory function to return the configured LLM provider.
    Supports Ollama, OpenAI, Anthropic, and Groq.
    """
    provider = (provider or settings.llm_provider).lower()
    model = model or settings.llm_model
    
    if provider == "openai":
        if not settings.openai_api_key:
            raise ValueError("openai_api_key must be set in settings when using OpenAI.")
        logger.info(f"Initializing OpenAI Chat Model: {model}")
        return ChatOpenAI(
            model=model,
            temperature=settings.llm_temperature,
            api_key=settings.openai_api_key
        )
        
    elif provider == "anthropic":
        if not settings.anthropic_api_key:
            raise ValueError("anthropic_api_key must be set in settings when using Anthropic.")
        logger.info(f"Initializing Anthropic Chat Model: {model}")
        return ChatAnthropic(
            model=model,
            temperature=settings.llm_temperature,
            api_key=settings.anthropic_api_key
        )
        
    elif provider == "groq":
        if not settings.groq_api_key:
            raise ValueError("groq_api_key must be set in settings when using Groq.")
        logger.info(f"Initializing Groq Chat Model: {model}")
        return ChatGroq(
            model=model,
            temperature=settings.llm_temperature,
            api_key=settings.groq_api_key
        )
        
    elif provider == "ollama":
        # We attempt to use the configured model, and let LangChain handle errors.
        # Fallback to mistral will be handled at the service level if a connection or model error occurs.
        logger.info(f"Initializing Ollama Chat Model: {model} at {settings.ollama_base_url}")
        return ChatOllama(
            model=model,
            base_url=settings.ollama_base_url,
            temperature=settings.llm_temperature
        )
    else:
        raise ValueError(f"Unsupported LLM provider: {provider}")

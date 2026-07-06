from langchain_core.language_models.chat_models import BaseChatModel
from langchain_ollama import ChatOllama
from langchain_openai import ChatOpenAI
from langchain_anthropic import ChatAnthropic
from app.core.config import settings
from app.core.logging import logger


def get_llm_provider() -> BaseChatModel:
    """
    Factory function to return the configured LLM provider.
    Supports Ollama, OpenAI, and Anthropic.
    """
    provider = settings.llm_provider.lower()
    
    if provider == "openai":
        if not settings.openai_api_key:
            raise ValueError("openai_api_key must be set in settings when using OpenAI.")
        logger.info(f"Initializing OpenAI Chat Model: {settings.llm_model}")
        return ChatOpenAI(
            model=settings.llm_model,
            temperature=settings.llm_temperature,
            api_key=settings.openai_api_key
        )
        
    elif provider == "anthropic":
        if not settings.anthropic_api_key:
            raise ValueError("anthropic_api_key must be set in settings when using Anthropic.")
        logger.info(f"Initializing Anthropic Chat Model: {settings.llm_model}")
        return ChatAnthropic(
            model=settings.llm_model,
            temperature=settings.llm_temperature,
            api_key=settings.anthropic_api_key
        )
        
    elif provider == "ollama":
        # We attempt to use the configured model, and let LangChain handle errors.
        # Fallback to mistral will be handled at the service level if a connection or model error occurs.
        logger.info(f"Initializing Ollama Chat Model: {settings.llm_model} at {settings.ollama_base_url}")
        return ChatOllama(
            model=settings.llm_model,
            base_url=settings.ollama_base_url,
            temperature=settings.llm_temperature
        )
    else:
        raise ValueError(f"Unsupported LLM provider: {provider}")

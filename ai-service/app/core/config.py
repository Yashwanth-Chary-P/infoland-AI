from typing import List
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """
    Centralized configuration management.
    Never hardcode these values anywhere else.
    """

    app_name: str = "InfoLand AI Service"
    app_version: str = "1.0.0"
    debug: bool = False
    log_level: str = "INFO"

    # Data Source Paths
    release_path: str = "../release"
    dataset_engine_path: str = "../../infoland-dataset-engine"
    backend_api_url: str = "http://localhost:5000/api"

    # Vector DB Config
    chroma_persist_directory: str = "./chroma_data"

    # Embedding Config
    embedding_provider: str = "huggingface"
    embedding_model: str = "sentence-transformers/all-MiniLM-L6-v2"
    openai_api_key: str = ""
    ollama_base_url: str = "http://localhost:11434"

    # LLM Provider Config
    llm_provider: str = "ollama"
    llm_model: str = "qwen2.5:1.5b"
    llm_temperature: float = 0.0
    anthropic_api_key: str = ""
    groq_api_key: str = ""
    
    # Optional AI Config
    enable_ai_explanations: bool = False

    # Chunking Config
    chunk_size: int = 1000
    chunk_overlap: int = 200

    # Indexing Config
    batch_size: int = 100

    # Collection Config
    collections: List[str] = [
        "properties",
        "ownership",
        "documents",
        "financial",
        "legal",
        "timeline",
        "location",
    ]

    model_config = SettingsConfigDict(
        env_file=".env", env_file_encoding="utf-8", extra="ignore"
    )


settings = Settings()

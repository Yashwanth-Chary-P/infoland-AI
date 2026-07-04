import asyncio
import orjson
from pathlib import Path
from typing import Any, Dict, List, Union
from app.core.logging import logger
from app.core.exceptions import DatasetNotFoundException


class DatasetLoader:
    """
    Utility class for loading JSON datasets efficiently using orjson.
    Does not contain any business logic or AI logic.
    """

    @staticmethod
    def _read_json_sync(file_path: Path) -> Union[Dict[str, Any], List[Any]]:
        """Synchronous file reading helper."""
        if not file_path.exists():
            raise DatasetNotFoundException(dataset_name=file_path.name)

        try:
            with open(file_path, "rb") as f:
                content = f.read()
                return orjson.loads(content)
        except orjson.JSONDecodeError as e:
            logger.error(f"Failed to parse JSON file {file_path}: {e}")
            raise ValueError(f"Invalid JSON format in {file_path}") from e

    @classmethod
    async def load_json(cls, file_path: Path) -> Union[Dict[str, Any], List[Any]]:
        """
        Asynchronously loads a JSON file by offloading the blocking I/O
        to a separate thread.
        """
        logger.debug(f"Loading dataset from: {file_path}")
        return await asyncio.to_thread(cls._read_json_sync, file_path)

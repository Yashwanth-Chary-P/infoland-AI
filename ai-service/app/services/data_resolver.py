import httpx
from pathlib import Path
from typing import Any, Dict, List, Union
from app.core.config import settings
from app.core.logging import logger
from app.core.exceptions import DataUnavailableException
from app.storage.dataset_loader import DatasetLoader


class DataSourceResolver:
    """
    Responsible for resolving dataset loading across Priority 1, 2, and 3.
    It does not perform AI processing or vectorization.
    """

    def __init__(self):
        self.release_path = Path(settings.release_path)
        self.engine_path = Path(settings.dataset_engine_path)
        self.backend_url = settings.backend_api_url

    async def get_dataset(self, dataset_name: str) -> Union[Dict[str, Any], List[Any]]:
        """
        Attempts to load a dataset following the priority fallback strategy.

        Priority 1: release/
        Priority 2: ../infoland-dataset-engine/
        Priority 3: Express Backend APIs
        """
        filename = f"{dataset_name}.json"

        # Priority 1
        p1_file = self.release_path / filename
        if p1_file.exists():
            logger.info(f"Source resolved (Priority 1): {p1_file}")
            return await DatasetLoader.load_json(p1_file)

        # Priority 2
        p2_file = self.engine_path / filename
        if p2_file.exists():
            logger.info(f"Source resolved (Priority 2): {p2_file}")
            return await DatasetLoader.load_json(p2_file)

        # Priority 3 (Fallback)
        logger.warning(
            f"Dataset {dataset_name} not found locally. Falling back to Backend API (Priority 3)."
        )
        try:
            return await self._fetch_from_backend(dataset_name)
        except Exception as e:
            logger.error(f"Priority 3 fallback failed for {dataset_name}: {e}")
            raise DataUnavailableException(
                message=f"Dataset {dataset_name} is unavailable across all priority levels."
            ) from e

    async def _fetch_from_backend(
        self, dataset_name: str
    ) -> Union[Dict[str, Any], List[Any]]:
        """Fetches dataset from the Express backend via HTTP GET."""
        url = f"{self.backend_url}/datasets/{dataset_name}"
        logger.info(f"Calling backend API: {url}")
        async with httpx.AsyncClient() as client:
            response = await client.get(url, timeout=10.0)
            response.raise_for_status()
            return response.json()

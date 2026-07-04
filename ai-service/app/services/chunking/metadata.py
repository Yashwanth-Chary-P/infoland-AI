from datetime import datetime, timezone
from typing import Dict, Any
from app.services.chunking.document import Chunk


class MetadataExtractor:
    """Injects and normalizes metadata for chunks before embedding."""

    @staticmethod
    def extract(
        chunk: Chunk, dataset_name: str, document_type: str = "record"
    ) -> Dict[str, Any]:
        """
        Enhances the chunk metadata with required system fields.
        """
        meta = chunk.metadata.copy()

        meta["chunk_id"] = chunk.chunk_id
        meta["dataset"] = dataset_name
        meta["document_type"] = document_type
        meta["created_at"] = datetime.now(timezone.utc).isoformat()

        if "property_id" not in meta:
            meta["property_id"] = meta.get("id", "unknown")

        if "region" not in meta:
            meta["region"] = "global"

        if "source_file" not in meta:
            meta["source_file"] = f"{dataset_name}.json"

        cleaned_meta = {}
        for k, v in meta.items():
            if isinstance(v, (str, int, float, bool)):
                cleaned_meta[k] = v
            else:
                cleaned_meta[k] = str(v)

        return cleaned_meta

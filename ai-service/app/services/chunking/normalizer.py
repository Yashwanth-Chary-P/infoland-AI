from typing import Dict, Any
import json


class Normalizer:
    """Normalizes raw dataset records into flat text representations."""

    @staticmethod
    def normalize_record(record: Dict[str, Any]) -> str:
        """
        Converts a JSON record into a string representation that preserves key-value context.
        """
        lines = []
        for key, value in record.items():
            if isinstance(value, (dict, list)):
                val_str = json.dumps(value, ensure_ascii=False)
            else:
                val_str = str(value)
            lines.append(f"{key.replace('_', ' ').title()}: {val_str}")
        return "\n".join(lines)

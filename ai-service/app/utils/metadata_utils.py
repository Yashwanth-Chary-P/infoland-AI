import ast
from typing import Any, Dict
from app.core.logging import logger

class MetadataParser:
    """
    Utility to safely parse metadata strings extracted from ChromaDB back into structured data.
    ChromaDB flattens complex types into strings, so we must safely evaluate them.
    """

    @staticmethod
    def parse(metadata: Dict[str, Any]) -> Dict[str, Any]:
        """
        Parses all values in the dictionary safely.
        """
        if not metadata:
            return {}

        parsed_data = {}
        for key, value in metadata.items():
            if isinstance(value, str):
                # Only attempt to parse if it looks like a list or dict
                val_stripped = value.strip()
                if (val_stripped.startswith("{") and val_stripped.endswith("}")) or \
                   (val_stripped.startswith("[") and val_stripped.endswith("]")):
                    try:
                        parsed_data[key] = ast.literal_eval(val_stripped)
                    except (ValueError, SyntaxError) as e:
                        # If parsing fails, identify why
                        logger.error(f"MetadataParser failed to evaluate literal for key '{key}': {e}. Original string: {val_stripped[:100]}...")
                        parsed_data[key] = value
                    except Exception as e:
                        logger.error(f"MetadataParser unexpected error for key '{key}': {e}")
                        parsed_data[key] = value
                else:
                    parsed_data[key] = value
            else:
                parsed_data[key] = value

        return parsed_data

import sys
import os
import asyncio
import time
from pathlib import Path

# Ensure app is in path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from app.core.logging import logger
from app.storage.vector_store.indexing import SynchronizationService
from app.core.config import settings

def get_datasets(generated_dir: Path):
    datasets = []
    if not generated_dir.exists():
        logger.error(f"Generated directory not found: {generated_dir}")
        return datasets

    for file_path in generated_dir.rglob("*.json"):
        if "documents_all.json" in file_path.name:
            continue
            
        # Calculate dataset name relative to the engine path to pass to DataSourceResolver
        # We need the form "release/generated/.../filename_without_ext"
        # Engine path: c:\Projects\infoland-dataset-engine
        # Generated dir: c:\Projects\infoland-dataset-engine\release\generated
        engine_path = generated_dir.parent.parent
        rel_path = file_path.relative_to(engine_path)
        dataset_name = str(rel_path.with_suffix("")).replace("\\", "/")
        
        filename = file_path.name
        
        # Mapping logic
        if "propert" in filename and "timeline" not in filename and "tax" not in filename and "registry" not in filename:
            collection = "properties"
        elif "owner" in filename:
            collection = "ownership"
        elif "location" in filename or "poi" in filename:
            collection = "location"
        elif "loan" in filename or "tax" in filename:
            collection = "financial"
        elif "court" in filename or "registry" in filename:
            collection = "legal"
        elif "timeline" in filename:
            collection = "timeline"
        elif "documents" in str(file_path):
            collection = "documents"
        else:
            collection = "properties" # default fallback
            
        datasets.append({
            "dataset_name": dataset_name,
            "collection_name": collection,
            "document_type": filename.replace(".json", "")
        })
        
    return datasets

async def run_ingestion():
    start_time = time.time()
    logger.info("Starting production data ingestion pipeline...")
    
    # Path to infoland-dataset-engine
    # Since ai-service is in c:\Projects\infoland-AI\ai-service
    # And dataset-engine is in c:\Projects\infoland-dataset-engine
    engine_path = Path(settings.dataset_engine_path).resolve()
    generated_dir = engine_path / "release" / "generated"
    
    mappings = get_datasets(generated_dir)
    logger.info(f"Discovered {len(mappings)} datasets.")
    for m in mappings:
        logger.info(f"Mapping: {m['dataset_name']} -> {m['collection_name']}")
        
    sync_service = SynchronizationService()
    
    # Note: We do full_rebuild but instead of recreating collections, we will just use build_index directly to be idempotent and non-destructive.
    # SynchronizationService.full_rebuild recreates collections. We just want to upsert!
    from app.storage.vector_store.indexing import IndexBuilder
    builder = IndexBuilder()
    
    total_time = 0
    for mapping in mappings:
        try:
            logger.info(f"Indexing {mapping['dataset_name']} into {mapping['collection_name']}")
            t0 = time.time()
            await builder.build_index(
                dataset_name=mapping["dataset_name"],
                collection_name=mapping["collection_name"],
                document_type=mapping["document_type"]
            )
            total_time += (time.time() - t0)
        except Exception as e:
            logger.error(f"Failed indexing {mapping['dataset_name']}: {e}")
            
    logger.info(f"Ingestion pipeline completed in {time.time() - start_time:.2f} seconds.")

if __name__ == "__main__":
    asyncio.run(run_ingestion())

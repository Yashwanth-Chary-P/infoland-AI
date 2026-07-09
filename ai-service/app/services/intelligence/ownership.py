from typing import Dict, Any, List
from app.schemas.intelligence import OwnershipAnalysis

class OwnershipAnalysisService:
    @staticmethod
    def analyze(ownership_data: List[Dict[str, Any]]) -> OwnershipAnalysis:
        analysis = OwnershipAnalysis()
        
        if not ownership_data:
            analysis.missing_registry_entries = True
            return analysis
            
        owners = set()
        chain = []
        
        # Look for owners, events, registry details
        for data in ownership_data:
            # Check ownership events
            if "transfer_type" in data:
                buyer = data.get("to_owner_id")
                seller = data.get("from_owner_id")
                date = data.get("transfer_date")
                
                if buyer:
                    owners.add(buyer)
                    if seller:
                        chain.append(f"{date or 'Unknown Date'}: {seller} -> {buyer}")
                    else:
                        chain.append(f"{date or 'Unknown Date'}: Registered to {buyer}")
                        
            # Check owner profiles
            if "owner_id" in data:
                owner_id = data["owner_id"]
                owners.add(owner_id)
                name = data.get("full_name") or data.get("owner_name")
                
                if name:
                    if not analysis.current_owner or analysis.current_owner == "unknown" or analysis.current_owner == owner_id:
                        analysis.current_owner_id = owner_id
                        analysis.current_owner_name = name
                        analysis.current_owner = f"{name} ({owner_id})"
                else:
                    if not analysis.current_owner or analysis.current_owner == "unknown":
                        analysis.current_owner = owner_id
                
        # Deduplicate and sort chain chronologically if dates exist
        chain.sort()
        analysis.chain_of_title = chain
        
        if owners:
            owners_list = list(owners)
            if analysis.current_owner == "unknown" and owners_list:
                # Naive assumption if explicit current_owner is missing: the latest in chain
                analysis.current_owner = owners_list[-1]
            
            # Previous owners are anyone not the current owner
            analysis.previous_owners = [o for o in owners_list if o != analysis.current_owner]
            
        if len(chain) > 3:
            analysis.frequent_ownership_transfers = True
            analysis.ownership_anomalies.append("High number of ownership transfers detected.")
            
        if not chain:
            analysis.missing_registry_entries = True
            
        return analysis

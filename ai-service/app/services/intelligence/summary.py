from typing import Dict, Any, List
from app.schemas.intelligence import PropertySummary

class PropertySummaryService:
    @staticmethod
    def analyze(property_id: str, properties_data: List[Dict[str, Any]]) -> PropertySummary:
        """
        Extracts high-level summary facts from the `properties` collection data.
        """
        summary = PropertySummary(property_id=property_id)
        
        if not properties_data:
            return summary
            
        merged_prop = {}
        for prop in properties_data:
            for k, v in prop.items():
                if v and (k not in merged_prop or not merged_prop[k]):
                    merged_prop[k] = v
                    
        # Extract region correctly (prefer source_region over region since region="global")
        summary.region = merged_prop.get("source_region") or merged_prop.get("region")
        if summary.region == "global":
            summary.region = None # don't use global placeholder
            
        summary.area = merged_prop.get("area_sq_ft") or merged_prop.get("area")
        if summary.area is not None:
            try:
                summary.area = float(summary.area)
            except ValueError:
                summary.area = None
                
        summary.property_type = merged_prop.get("property_class") or merged_prop.get("property_type")
        summary.sale_status = merged_prop.get("sale_status")
        if not summary.sale_status and "is_for_sale" in merged_prop:
            summary.sale_status = "Available" if merged_prop.get("is_for_sale") else "Not for Sale"
            
        summary.future_risk_tier = merged_prop.get("future_risk_tier")
        summary.location_score = merged_prop.get("location_score")
        summary.overall_health = merged_prop.get("overall_health")
        
        val = merged_prop.get("estimated_value") or merged_prop.get("price")
        if val is not None:
            try:
                summary.estimated_value = float(val)
            except ValueError:
                summary.estimated_value = None
                
        return summary

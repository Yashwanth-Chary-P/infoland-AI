from typing import Dict, Any, List
from app.schemas.intelligence import TimelineEvent

class TimelineAnalysisService:
    @staticmethod
    def analyze(all_data: Dict[str, List[Dict[str, Any]]]) -> List[TimelineEvent]:
        events = []
        
        # We can extract dates from any dataset that has events
        
        # 1. Ownership events
        for data in all_data.get("ownership", []):
            date = data.get("transfer_date")
            if date:
                evt_type = data.get("transfer_type", "Ownership Transfer").title()
                desc = f"Ownership event involving {data.get('to_owner_id', 'Unknown')}"
                events.append(TimelineEvent(date=date, event_type=evt_type, description=desc, metadata=data))
                
        # 2. Financial events (usually no direct dates, but check just in case)
        for data in all_data.get("financial", []):
            date = data.get("date") or data.get("issue_date")
            if date:
                evt_type = data.get("type", "Financial Event").title()
                amt = data.get("pending_amount") or data.get("outstanding_amount")
                desc = f"{evt_type} recorded"
                if amt:
                    desc += f" for amount {amt}"
                events.append(TimelineEvent(date=date, event_type=evt_type, description=desc, metadata=data))
                
        # 3. Legal events
        for data in all_data.get("legal", []):
            date = data.get("issue_date") or data.get("last_updated") or data.get("filing_date")
            if date:
                evt_type = data.get("case_type", "Legal Dispute").title()
                desc = f"Legal case: {data.get('case_status', 'Unknown')}"
                events.append(TimelineEvent(date=date, event_type=evt_type, description=desc, metadata=data))
                
        # 4. Timeline collection specifically
        for data in all_data.get("timeline", []):
            timeline_events = data.get("events", [])
            for t_evt in timeline_events:
                date = t_evt.get("event_date")
                if date:
                    evt_type = t_evt.get("event_type", "General Event").title().replace("_", " ")
                    desc = t_evt.get("description", "Event occurred")
                    events.append(TimelineEvent(date=date, event_type=evt_type, description=desc, metadata=t_evt))
                
        # Sort chronologically by date
        # Assuming ISO 8601 string dates like "2023-01-15"
        events.sort(key=lambda x: x.date)
        
        return events

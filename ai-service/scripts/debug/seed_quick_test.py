import json
import chromadb

def quick_seed():
    print("Seeding PROP-KOK-000001 directly into local ChromaDB for testing...")
    client = chromadb.PersistentClient(path="./chroma_data")
    
    # 1. properties
    col = client.get_or_create_collection("properties")
    col.upsert(
        ids=["PROP-KOK-000001", "PROP-KOK-000001_profile"],
        documents=["Master Property Record", "Property Profile"],
        metadatas=[
            {"property_id": "PROP-KOK-000001", "area_sq_ft": 1547.87, "feature_category": "property_candidate"},
            {"property_id": "PROP-KOK-000001", "property_class": "residential_plot", "future_risk_tier": "low", "location_score": 84, "sale_status": "not_for_sale"}
        ]
    )
    
    # 2. ownership
    col = client.get_or_create_collection("ownership")
    col.upsert(
        ids=["OWN-KOK-000001", "OE-KOK-000001-01"],
        documents=["Owner Profile", "Ownership Event"],
        metadatas=[
            {"property_id": "PROP-KOK-000001", "owner_id": "OWN-KOK-000001", "owner_name": "Rajesh Sharma", "owner_type": "individual"},
            {"property_id": "PROP-KOK-000001", "transfer_type": "sale", "transfer_date": "2012-07-11", "from_owner_id": "HOWN-KOK-000001-00", "to_owner_id": "HOWN-KOK-000001-01"}
        ]
    )
    
    # 3. financial
    col = client.get_or_create_collection("financial")
    col.upsert(
        ids=["TAX-KOK-000001", "LOAN-KOK-000005"],
        documents=["Tax Record", "Loan Record"],
        metadatas=[
            {"property_id": "PROP-KOK-000001", "tax_id": "TAX-KOK-000001", "status": "paid", "pending_amount": 0},
            {"property_id": "PROP-KOK-000001", "loan_id": "LOAN-KOK-000005", "status": "active", "outstanding_amount": 2425000}
        ]
    )
    
    # 4. legal
    col = client.get_or_create_collection("legal")
    col.upsert(
        ids=["DOC-COURT-DISPUTE-RECORD-KOK-000001"],
        documents=["Court Dispute"],
        metadatas=[
            {"property_id": "PROP-KOK-000001", "case_status": "unknown", "status": "missing", "case_type": "unknown"}
        ]
    )
    
    # 5. documents
    col = client.get_or_create_collection("documents")
    col.upsert(
        ids=["DOC-SALE-DEED-KOK-000001"],
        documents=["Sale Deed"],
        metadatas=[
            {"property_id": "PROP-KOK-000001", "document_type": "sale_deed", "status": "available"}
        ]
    )
    
    # 6. timeline
    col = client.get_or_create_collection("timeline")
    col.upsert(
        ids=["TL-KOK-000001"],
        documents=["Timeline"],
        metadatas=[
            {"property_id": "PROP-KOK-000001", "events": "[{'event_type': 'ownership_transfer', 'event_date': '2012-07-11', 'description': 'Sold'}]"}
        ]
    )
    
    print("Seed complete.")

if __name__ == "__main__":
    quick_seed()

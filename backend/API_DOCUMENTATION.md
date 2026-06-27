# InfoLand AI Backend - API Documentation (Phase 1)

This document provides a comprehensive API reference for the InfoLand AI Phase 1 Backend. 

## Base URL
All API requests should be prefixed with the base URL of the running server.
Example: `http://localhost:5000`

---

## 1. System Health

### Endpoint Name
GET /api/health

### Purpose
Check if the server is up and running. Used for basic uptime monitoring.

### URL
`http://localhost:5000/api/health`

### Method
GET

### Query Parameters
None

### Path Parameters
None

### Example Request
`GET http://localhost:5000/api/health`

### Example Success Response
```json
{
  "success": true,
  "message": "Server is up and running",
  "data": null,
  "pagination": null,
  "timestamp": "2026-06-27T03:03:41.000Z"
}
```

### Example Error Responses
**500 Internal Server Error**
```json
{
  "success": false,
  "message": "Internal server error",
  "errors": [],
  "timestamp": "2026-06-27T10:30:00Z"
}
```

### Notes
This is an unauthenticated, public endpoint.

---

## 2. Properties

### Endpoint Name
GET /api/properties

### Purpose
Retrieve a paginated list of all properties in the system.

### URL
`http://localhost:5000/api/properties`

### Method
GET

### Query Parameters
| Parameter | Description | Type | Required | Default | Example |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `page` | Page number | integer | No | 1 | 1 |
| `limit` | Items per page | integer | No | 10 | 10 |
| `sort` | Field to sort by | string | No | -createdAt | createdAt |

### Path Parameters
None

### Example Request
`GET http://localhost:5000/api/properties?page=1&limit=1`

### Example Success Response
```json
{
  "success": true,
  "message": "Properties retrieved successfully",
  "data": [
    {
      "_id": "6a3e5894329775f2d27289b4",
      "property_id": "PROP-KOK-000001",
      "region": "kokapet",
      "property_class": "residential_plot",
      "sale_status": "not_for_sale",
      "__v": 0,
      "createdAt": "2026-06-26T10:46:44.205Z",
      "updatedAt": "2026-06-26T10:46:44.205Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 1,
    "total": 1633,
    "totalPages": 1633
  },
  "timestamp": "2026-06-27T03:03:41.500Z"
}
```

### Example Error Responses
**400 Bad Request** (Invalid pagination)
```json
{
  "success": false,
  "message": "Validation error",
  "errors": [
    {
      "field": "query.limit",
      "message": "\"limit\" must be less than or equal to 100"
    }
  ],
  "timestamp": "2026-06-27T10:30:00Z"
}
```

**500 Internal Server Error**
```json
{
  "success": false,
  "message": "Internal server error",
  "errors": [],
  "timestamp": "2026-06-27T10:30:00Z"
}
```

### Notes
Supports standard pagination. Only master property details are returned in the list view to minimize payload size.

---

### Endpoint Name
GET /api/properties/search

### Purpose
Search properties using a keyword (e.g., region name, property ID).

### URL
`http://localhost:5000/api/properties/search`

### Method
GET

### Query Parameters
| Parameter | Description | Type | Required | Default | Example |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `q` | Search keyword | string | Yes | - | kokapet |
| `page` | Page number | integer | No | 1 | 1 |
| `limit` | Items per page | integer | No | 10 | 10 |

### Path Parameters
None

### Example Request
`GET http://localhost:5000/api/properties/search?q=kokapet&limit=1`

### Example Success Response
```json
{
  "success": true,
  "message": "Properties retrieved successfully",
  "data": [
    {
      "_id": "6a3e5894329775f2d27289b4",
      "property_id": "PROP-KOK-000001",
      "region": "kokapet",
      "property_class": "residential_plot",
      "sale_status": "not_for_sale",
      "__v": 0,
      "createdAt": "2026-06-26T10:46:44.205Z",
      "updatedAt": "2026-06-26T10:46:44.205Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 1,
    "total": 12,
    "totalPages": 12
  },
  "timestamp": "2026-06-27T03:03:41.500Z"
}
```

### Example Error Responses
**400 Bad Request**
```json
{
  "success": false,
  "message": "Validation error",
  "errors": [
    {
      "field": "query.q",
      "message": "\"q\" is required"
    }
  ],
  "timestamp": "2026-06-27T10:30:00Z"
}
```

### Notes
Search performs a regex text match across `property_id` and `region`.

---

### Endpoint Name
GET /api/properties/{propertyId}

### Purpose
Retrieve complete, detailed property information including its profile, metadata, owner, health summary, and location score.

### URL
`http://localhost:5000/api/properties/PROP-KOK-000001`

### Method
GET

### Query Parameters
None

### Path Parameters
| Parameter | Description | Type | Example |
| :--- | :--- | :--- | :--- |
| `propertyId` | Unique property ID | string | PROP-KOK-000001 |

### Example Request
`GET http://localhost:5000/api/properties/PROP-KOK-000001`

### Example Success Response
```json
{
  "success": true,
  "message": "Property details retrieved successfully",
  "data": {
    "master": {
      "_id": "6a3e5894329775f2d27289b4",
      "property_id": "PROP-KOK-000001",
      "region": "kokapet",
      "property_class": "residential_plot",
      "sale_status": "not_for_sale"
    },
    "profile": {
      "_id": "6a3e5896329775f2d2729a61",
      "property_id": "PROP-KOK-000001",
      "property_type": "plot",
      "sub_type": "residential_plot",
      "layout_type": "hmda_approved",
      "zoning": "residential",
      "area_sqyd": 171.99,
      "survey_number": "SY-KOK-0001",
      "plot_number": "PL-0001",
      "dimensions": {
        "frontage_ft": 25,
        "depth_ft": 61.92
      },
      "facing": "east",
      "road_width_ft": 40,
      "corner_plot": false
    },
    "metadata": {
      "_id": "6a3e5896329775f2d2729a62",
      "property_id": "PROP-KOK-000001",
      "created_at": "2021-06-20T05:32:04Z",
      "last_updated": "2023-01-20T17:09:59Z",
      "source": "generated",
      "data_quality_score": 91,
      "verification_status": "verified"
    },
    "owner": {
      "_id": "6a3e5895329775f2d2729023",
      "owner_id": "OWN-KOK-000001",
      "property_id": "PROP-KOK-000001",
      "name": "Vikram Menon",
      "ownership_type": "individual",
      "acquisition_date": "2012-07-26",
      "share_percentage": 100,
      "status": "active"
    },
    "locationScore": {
      "_id": "6a3e5896329775f2d2729bb5",
      "property_id": "PROP-KOK-000001",
      "overall_score": 82,
      "accessibility_score": 85,
      "amenities_score": 80
    },
    "healthSummary": {
      "documentSummary": {
        "total": 18,
        "available": 12,
        "expired": 1,
        "missing": 5
      },
      "loanSummary": {
        "total": 0,
        "active": 0
      },
      "taxSummary": {
        "totalRecords": 1,
        "pending": 0
      },
      "courtSummary": {
        "total": 0,
        "active": 0
      },
      "overallHealthSummary": {
        "score": 80,
        "status": "Fair"
      }
    }
  },
  "pagination": null,
  "timestamp": "2026-06-27T03:03:41.550Z"
}
```

### Example Error Responses
**404 Not Found**
```json
{
  "success": false,
  "message": "Property not found",
  "errors": [],
  "timestamp": "2026-06-27T10:30:00Z"
}
```

---

## 3. Owners & Ownership

### Endpoint Name
GET /api/owners/{propertyId}

### Purpose
Retrieve the current owner of a specified property.

### URL
`http://localhost:5000/api/owners/PROP-KOK-000001`

### Method
GET

### Query Parameters
None

### Path Parameters
| Parameter | Description | Type | Example |
| :--- | :--- | :--- | :--- |
| `propertyId` | Unique property ID | string | PROP-KOK-000001 |

### Example Request
`GET http://localhost:5000/api/owners/PROP-KOK-000001`

### Example Success Response
```json
{
  "success": true,
  "message": "Current owner retrieved successfully",
  "data": {
    "_id": "6a3e5895329775f2d2729023",
    "owner_id": "OWN-KOK-000001",
    "property_id": "PROP-KOK-000001",
    "name": "Vikram Menon",
    "ownership_type": "individual",
    "acquisition_date": "2012-07-26",
    "share_percentage": 100,
    "status": "active"
  },
  "pagination": null,
  "timestamp": "2026-06-27T03:03:41.600Z"
}
```

### Example Error Responses
**404 Not Found**
```json
{
  "success": false,
  "message": "Owner not found for this property",
  "errors": [],
  "timestamp": "2026-06-27T10:30:00Z"
}
```

---

### Endpoint Name
GET /api/ownership/history/{propertyId}

### Purpose
Retrieve the history of ownership events/transfers for a specified property.

### URL
`http://localhost:5000/api/ownership/history/PROP-KOK-000001`

### Method
GET

### Query Parameters
None

### Path Parameters
| Parameter | Description | Type | Example |
| :--- | :--- | :--- | :--- |
| `propertyId` | Unique property ID | string | PROP-KOK-000001 |

### Example Request
`GET http://localhost:5000/api/ownership/history/PROP-KOK-000001`

### Example Success Response
```json
{
  "success": true,
  "message": "Ownership history retrieved successfully",
  "data": [
    {
      "_id": "6a3e5895329775f2d2729024",
      "event_id": "EVT-KOK-000001",
      "property_id": "PROP-KOK-000001",
      "event_type": "sale",
      "event_date": "2012-07-26",
      "previous_owner_id": "OWN-KOK-PREV-000001",
      "new_owner_id": "OWN-KOK-000001",
      "document_id": "DOC-SALE-DEED-KOK-000001",
      "transaction_value": 7223580,
      "__v": 0,
      "createdAt": "2026-06-26T10:46:45.319Z",
      "updatedAt": "2026-06-26T10:46:45.319Z"
    }
  ],
  "pagination": null,
  "timestamp": "2026-06-27T03:03:41.650Z"
}
```

### Example Error Responses
**400 Bad Request**
```json
{
  "success": false,
  "message": "Validation error",
  "errors": [
    {
      "field": "params.propertyId",
      "message": "\"propertyId\" is required"
    }
  ],
  "timestamp": "2026-06-27T10:30:00Z"
}
```

---

## 4. Documents

### Endpoint Name
GET /api/documents/{propertyId}

### Purpose
Retrieve all documents for a given property grouped dynamically by document type, along with lists of expired and missing documents.

### URL
`http://localhost:5000/api/documents/PROP-KOK-000001`

### Method
GET

### Query Parameters
None

### Path Parameters
| Parameter | Description | Type | Example |
| :--- | :--- | :--- | :--- |
| `propertyId` | Unique property ID | string | PROP-KOK-000001 |

### Example Request
`GET http://localhost:5000/api/documents/PROP-KOK-000001`

### Example Success Response
```json
{
  "success": true,
  "message": "Documents retrieved successfully",
  "data": {
    "availableDocuments": [
      {
        "_id": "6a3e5896329775f2d2729d5b",
        "document_id": "DOC-SALE-DEED-KOK-000001",
        "property_id": "PROP-KOK-000001",
        "document_type": "sale_deed",
        "status": "available",
        "issue_date": "2012-07-26",
        "last_updated": "2014-07-26",
        "issuing_authority": "Kokapet Sub-Registrar Office",
        "document_number": "REG-KOK-000001"
      }
    ],
    "expiredDocuments": [
      {
        "_id": "6a3e5896329775f2d2729d5e",
        "document_id": "DOC-MUTATION-RECORD-KOK-000001",
        "property_id": "PROP-KOK-000001",
        "document_type": "mutation_record",
        "status": "expired"
      }
    ],
    "missingDocuments": [
      "building_approval_plan",
      "occupancy_certificate",
      "completion_certificate"
    ],
    "counts": {
      "total": 18,
      "available": 12,
      "expired": 1,
      "missing": 5
    }
  },
  "pagination": null,
  "timestamp": "2026-06-27T03:03:41.700Z"
}
```

---

### Endpoint Name
GET /api/documents/document/{documentId}

### Purpose
Retrieve the details of a single document by its unique document ID.

### URL
`http://localhost:5000/api/documents/document/DOC-SALE-DEED-KOK-000001`

### Method
GET

### Query Parameters
None

### Path Parameters
| Parameter | Description | Type | Example |
| :--- | :--- | :--- | :--- |
| `documentId` | Unique document ID | string | DOC-SALE-DEED-KOK-000001 |

### Example Request
`GET http://localhost:5000/api/documents/document/DOC-SALE-DEED-KOK-000001`

### Example Success Response
```json
{
  "success": true,
  "message": "Document retrieved successfully",
  "data": {
    "_id": "6a3e5896329775f2d2729d5b",
    "document_id": "DOC-SALE-DEED-KOK-000001",
    "property_id": "PROP-KOK-000001",
    "document_type": "sale_deed",
    "status": "available",
    "issue_date": "2012-07-26",
    "last_updated": "2014-07-26",
    "issuing_authority": "Kokapet Sub-Registrar Office",
    "document_number": "REG-KOK-000001",
    "remarks": "Available in generated source packet",
    "registration_date": "2012-07-26",
    "transaction_value": 7223580,
    "stamp_duty_paid": 541768,
    "__v": 0,
    "createdAt": "2026-06-26T10:46:46.896Z",
    "updatedAt": "2026-06-26T10:46:46.896Z"
  },
  "pagination": null,
  "timestamp": "2026-06-27T03:03:41.750Z"
}
```

### Example Error Responses
**404 Not Found**
```json
{
  "success": false,
  "message": "Document not found",
  "errors": [],
  "timestamp": "2026-06-27T10:30:00Z"
}
```

---

### Endpoint Name
GET /api/documents/missing/{propertyId}

### Purpose
Retrieve an array of missing document types for a specific property.

### URL
`http://localhost:5000/api/documents/missing/PROP-KOK-000001`

### Method
GET

### Query Parameters
None

### Path Parameters
| Parameter | Description | Type | Example |
| :--- | :--- | :--- | :--- |
| `propertyId` | Unique property ID | string | PROP-KOK-000001 |

### Example Request
`GET http://localhost:5000/api/documents/missing/PROP-KOK-000001`

### Example Success Response
```json
{
  "success": true,
  "message": "Missing documents retrieved successfully",
  "data": [
    "building_approval_plan",
    "occupancy_certificate",
    "completion_certificate",
    "noc",
    "court_dispute_record"
  ],
  "pagination": null,
  "timestamp": "2026-06-27T03:03:41.800Z"
}
```

---

## 5. Financials

### Endpoint Name
GET /api/loans/{propertyId}

### Purpose
Retrieve all active and closed loans for a property.

### URL
`http://localhost:5000/api/loans/PROP-KOK-000001`

### Method
GET

### Query Parameters
None

### Path Parameters
| Parameter | Description | Type | Example |
| :--- | :--- | :--- | :--- |
| `propertyId` | Unique property ID | string | PROP-KOK-000001 |

### Example Request
`GET http://localhost:5000/api/loans/PROP-KOK-000001`

### Example Success Response
```json
{
  "success": true,
  "message": "Loans retrieved successfully",
  "data": [],
  "pagination": null,
  "timestamp": "2026-06-27T03:03:41.940Z"
}
```

---

### Endpoint Name
GET /api/tax/{propertyId}

### Purpose
Retrieve tax records for a property.

### URL
`http://localhost:5000/api/tax/PROP-KOK-000001`

### Method
GET

### Query Parameters
None

### Path Parameters
| Parameter | Description | Type | Example |
| :--- | :--- | :--- | :--- |
| `propertyId` | Unique property ID | string | PROP-KOK-000001 |

### Example Request
`GET http://localhost:5000/api/tax/PROP-KOK-000001`

### Example Success Response
```json
{
  "success": true,
  "message": "Tax records retrieved successfully",
  "data": [
    {
      "_id": "6a3e5895329775f2d27296b4",
      "tax_id": "TAX-KOK-000001",
      "property_id": "PROP-KOK-000001",
      "status": "paid",
      "pending_amount": 0,
      "__v": 0,
      "createdAt": "2026-06-26T10:46:45.721Z",
      "updatedAt": "2026-06-26T10:46:45.721Z"
    }
  ],
  "pagination": null,
  "timestamp": "2026-06-27T03:03:42.042Z"
}
```

---

### Endpoint Name
GET /api/disputes/{propertyId}

### Purpose
Retrieve court disputes registered for a property.

### URL
`http://localhost:5000/api/disputes/PROP-KOK-000001`

### Method
GET

### Query Parameters
None

### Path Parameters
| Parameter | Description | Type | Example |
| :--- | :--- | :--- | :--- |
| `propertyId` | Unique property ID | string | PROP-KOK-000001 |

### Example Request
`GET http://localhost:5000/api/disputes/PROP-KOK-000001`

### Example Success Response
```json
{
  "success": true,
  "message": "Disputes retrieved successfully",
  "data": [],
  "pagination": null,
  "timestamp": "2026-06-27T03:03:42.146Z"
}
```

---

## 6. Property Health

### Endpoint Name
GET /api/property-health/{propertyId}

### Purpose
Retrieve a synthesized overall health summary of a property, consisting of documents, loans, taxes, and court summaries.

### URL
`http://localhost:5000/api/property-health/PROP-KOK-000001`

### Method
GET

### Query Parameters
None

### Path Parameters
| Parameter | Description | Type | Example |
| :--- | :--- | :--- | :--- |
| `propertyId` | Unique property ID | string | PROP-KOK-000001 |

### Example Request
`GET http://localhost:5000/api/property-health/PROP-KOK-000001`

### Example Success Response
```json
{
  "success": true,
  "message": "Property health retrieved successfully",
  "data": {
    "documentSummary": {
      "total": 18,
      "available": 12,
      "expired": 1,
      "missing": 5
    },
    "loanSummary": {
      "total": 0,
      "active": 0
    },
    "taxSummary": {
      "totalRecords": 1,
      "pending": 0
    },
    "courtSummary": {
      "total": 0,
      "active": 0
    },
    "overallHealthSummary": {
      "score": 80,
      "status": "Fair"
    }
  },
  "pagination": null,
  "timestamp": "2026-06-27T03:03:42.255Z"
}
```

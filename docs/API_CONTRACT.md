# Executive Dashboard — Spring Boot REST API Contract

This document specifies the REST API endpoints required by the React Executive Dashboard front-end. The backend is built using Spring Boot.

- **Base URL**: `/api` (or configured via `VITE_API_BASE_URL`, default: `http://localhost:8080/api`)
- **Content-Type**: `application/json`
- **Response Format**: Direct JSON DTO payloads (HTTP 200 OK) or standard Spring error payload.

---

## 1. Common Query Parameters

All dashboard endpoints accept optional filtering query parameters:

| Parameter | Type | Example | Description |
| :--- | :--- | :--- | :--- |
| `businessLine` | `string` | `Private Equity` | Filter by account category/line. Omitted or `"All lines"` indicates all. |
| `ownerId` | `string` | `usr-1` | Filter by user ID of account or follow-up owner. |
| `tier` | `string` | `TIER_1` | Tier filter (`TIER_1`, `TIER_2`, `TIER_3`). |
| `dealSide` | `string` | `BUY_SIDE` | Deal orientation (`BUY_SIDE`, `SELL_SIDE`). |
| `country` | `string` | `United States` | Filter by account country of incorporation. |

---

## 2. Endpoints Specification

### 2.1 KPI Cards Summary
- **Method**: `GET`
- **Path**: `/api/dashboard/kpis`
- **Query Parameters**: Common filters (see section 1)
- **Response JSON (200 OK)**:
```json
{
  "totalAccounts": 134,
  "peopleNamed": 178,
  "meetings": 24,
  "overdueCount": 12
}
```

---

### 2.2 Outreach Funnel Progression
- **Method**: `GET`
- **Path**: `/api/dashboard/funnel`
- **Query Parameters**: Common filters
- **Response JSON (200 OK)**:
```json
[
  {
    "stage": "TO_CONTACT",
    "label": "To contact",
    "count": 169,
    "percentage": 100
  },
  {
    "stage": "CONNECTED",
    "label": "Connected",
    "count": 121,
    "percentage": 72
  },
  {
    "stage": "MESSAGED",
    "label": "Messaged",
    "count": 75,
    "percentage": 44
  },
  {
    "stage": "MEETINGS",
    "label": "Meetings",
    "count": 39,
    "percentage": 23
  }
]
```

---

### 2.3 Follow-Ups Action Tracker
- **Method**: `GET`
- **Path**: `/api/dashboard/follow-ups`
- **Query Parameters**: Common filters
- **Response JSON (200 OK)**:
```json
[
  {
    "id": "flw-1",
    "contact_id": "cnt-1",
    "contact_name": "Alexander Vance",
    "company_id": "acc-1",
    "company_name": "Apex Capital",
    "action": "Send revised draft of non-disclosure agreement",
    "due_date": "2026-10-08",
    "last_contacted_date": "2026-10-04",
    "owner_id": "usr-1",
    "status_category": "OVERDUE"
  },
  {
    "id": "flw-13",
    "contact_id": "cnt-13",
    "contact_name": "Eleanor Hastings",
    "company_id": "acc-13",
    "company_name": "Bluecrest Ventures",
    "action": "Confirm attendee list for partner pitch next Thursday",
    "due_date": "2026-10-12",
    "last_contacted_date": "2026-10-08",
    "owner_id": "usr-3",
    "status_category": "TODAY"
  },
  {
    "id": "flw-25",
    "contact_id": "cnt-25",
    "contact_name": "Sebastian Chen",
    "company_id": "acc-25",
    "company_name": "Atlas Equity",
    "action": "Deliver updated synergy breakdown model",
    "due_date": "2026-10-16",
    "last_contacted_date": "2026-10-12",
    "owner_id": "usr-2",
    "status_category": "THIS_WEEK"
  }
]
```

---

### 2.4 Dashboard Charts Breakdown
- **Method**: `GET`
- **Path**: `/api/dashboard/charts`
- **Query Parameters**: Common filters
- **Response JSON (200 OK)**:
```json
{
  "relationshipTemperature": [
    { "status": "HOT", "count": 72 },
    { "status": "WARM", "count": 58 },
    { "status": "COLD", "count": 48 }
  ],
  "accountsByTier": [
    { "tier": "Tier 1", "count": 27 },
    { "tier": "Tier 2", "count": 36 },
    { "tier": "Tier 3", "count": 71 }
  ],
  "dealSideDistribution": [
    { "dealSide": "Buy-Side", "count": 67 },
    { "dealSide": "Sell-Side", "count": 67 }
  ]
}
```

---

### 2.5 Priority Contacts
- **Method**: `GET`
- **Path**: `/api/dashboard/priority-contacts`
- **Query Parameters**: Common filters
- **Response JSON (200 OK)**:
```json
[
  {
    "id": "cnt-1",
    "name": "Alexander Vance",
    "company_id": "acc-1",
    "company_name": "Apex Capital",
    "tier": "TIER_1",
    "relationship_status": "HOT",
    "next_step": "Review teaser & preliminary valuation",
    "is_closed": false,
    "title": "Managing Director",
    "email": "alexander.vance@apexcapital.com"
  }
]
```

---

### 2.6 Recently Updated Accounts
- **Method**: `GET`
- **Path**: `/api/dashboard/recent-accounts`
- **Query Parameters**: Common filters
- **Response JSON (200 OK)**:
```json
[
  {
    "id": "acc-1",
    "name": "Apex Capital",
    "country": "United States",
    "tier": "TIER_1",
    "deal_side": "BUY_SIDE",
    "owner_id": "usr-1",
    "owner_name": "Sarah Jenkins",
    "category": "Private Equity",
    "updated_at": "2026-10-12T14:30:00Z"
  }
]
```

---

### 2.7 Filter Options Metadata
- **Method**: `GET`
- **Path**: `/api/dashboard/filter-options`
- **Query Parameters**: None
- **Response JSON (200 OK)**:
```json
{
  "businessLines": [
    "All lines",
    "Private Equity",
    "M&A Advisory",
    "Corporate Strategy",
    "Capital Markets"
  ],
  "owners": [
    { "id": "usr-1", "name": "Sarah Jenkins" },
    { "id": "usr-2", "name": "Michael Chang" },
    { "id": "usr-3", "name": "Elena Rostova" },
    { "id": "usr-4", "name": "David Adeleke" },
    { "id": "usr-5", "name": "Sophia Patel" }
  ],
  "tiers": ["TIER_1", "TIER_2", "TIER_3"],
  "dealSides": ["BUY_SIDE", "SELL_SIDE"],
  "countries": [
    "United States",
    "United Kingdom",
    "Germany",
    "Singapore",
    "France",
    "Japan",
    "Switzerland",
    "Canada",
    "Australia",
    "Netherlands"
  ]
}
```

---

## 3. Standard Error Structure

When any request fails (e.g. 400 Bad Request, 500 Internal Error):
```json
{
  "timestamp": "2026-10-12T15:30:00.000+00:00",
  "status": 500,
  "error": "Internal Server Error",
  "message": "Database query timeout",
  "path": "/api/dashboard/kpis"
}
```
The React frontend handles errors on a per-widget basis with retry capabilities without crashing adjacent widgets.

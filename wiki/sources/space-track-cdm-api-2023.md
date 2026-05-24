---
type: source
title: "Space-Track.org REST API Documentation — CDM Classes and Operator Data"
author: "United States Space Force / 18 SDS / Space-Track.org"
date: "2023-04-01"
ingested: "2026-05-24"
tags: [conjunction, cdm, ssa, space-track, space-debris, mission-desk, firefly, api]
---

# Space-Track.org — CDM API Documentation

The authoritative documentation for accessing Conjunction Data Messages and related space surveillance data via the Space-Track.org REST API, operated by the 18th Space Defense Squadron (18 SDS) of the US Space Force.

**Primary URL**: https://www.space-track.org/documentation

Supplemental: Space-Track Spaceflight Safety Handbook for Satellite Operators v1.7 (April 2023): https://www.space-track.org/documents/SFS_Handbook_For_Operators_V1.7.pdf

## Authentication

Space-Track requires account registration (free) at space-track.org. Authentication uses **TLS-secured username/password POST** to the `/ajaxauth/login` endpoint — not OAuth, not API key. Session cookie is returned and must be maintained for subsequent requests.

```python
# Minimal auth pattern
import requests
s = requests.Session()
s.post("https://www.space-track.org/ajaxauth/login",
       data={"identity": "user@example.com", "password": "password"})
```

The `python-spacetrack` client library (`pip install spacetrack`) wraps this with automatic session management and rate-limit sleeping.

## CDM Endpoints

Two CDM classes are available:

| Class | Controller | Access Level | Description |
|---|---|---|---|
| `cdm_public` | `basicspacedata` | All registered accounts | Public subset: TCA, miss distance, Pc, object NORAD IDs, relative speed. Omits secondary object state/covariance for non-operator accounts. |
| `cdm` | `expandedspacedata` | Operator accounts (primary object registered with 18 SDS) | Full CDM: both object states, covariance matrices, supplemental data |

### URL Pattern

```
https://www.space-track.org/basicspacedata/query/class/cdm_public/
  [predicates]/
  orderby/[field]/[asc|desc]/
  limit/[n]/
  format/[json|xml|csv|kvn|html]
```

### Example Queries

Get 10 most-recent public CDMs ordered by TCA descending (JSON):
```
/basicspacedata/query/class/cdm_public/orderby/TCA desc/limit/10/format/json
```

Get all cdm_public events with Pc above 1e-5 in last 7 days:
```
/basicspacedata/query/class/cdm_public/
  TCA/>now-7/
  PC/>0.00001/
  orderby/PC desc/
  format/json
```

Get CDMs for a specific NORAD object as primary:
```
/basicspacedata/query/class/cdm_public/
  SAT_1_ID/25544/
  orderby/TCA desc/
  limit/20/format/json
```

## Available Fields in `cdm_public`

Confirmed from Space-Track documentation and Python spacetrack library source:

| Field | Type | Description |
|---|---|---|
| `CDM_ID` | integer | Unique event identifier |
| `CREATED` | datetime | CDM generation timestamp |
| `EMERGENCY_REPORTABLE` | boolean | Flag for high-risk events |
| `TCA` | datetime (UTC) | Time of Closest Approach |
| `MISS_DISTANCE` | float (m) | Miss distance at TCA |
| `PC` | float | Probability of Collision |
| `SAT_1_ID` | integer | Primary object NORAD catalog number |
| `SAT_1_NAME` | string | Primary object name |
| `SAT_2_ID` | integer | Secondary object NORAD catalog number |
| `SAT_2_NAME` | string | Secondary object name |
| `SAT_2_EXCL_VOL` | float | Secondary exclusion volume radius (m) |
| `SAT_1_EXCL_VOL` | float | Primary exclusion volume radius (m) |
| `RELATIVE_SPEED` | float (m/s) | Relative speed at TCA |

The `cdm` class (operator access) additionally includes full state vectors, covariance matrices (21 elements per object), `HARD_BODY_RADIUS`, `AREA_PC`, and maneuver/operator metadata.

## Rate Limits (Critical for Agent Loops)

| Limit | Value |
|---|---|
| Max requests per minute | 30 |
| Max requests per hour | 300 |
| Recommended CDM poll cadence | ≤ 3/day for constellation-wide retrieval (once every 8 h) |
| Per-event monitoring | ≤ 1/hour per individual conjunction |

Violation triggers account suspension. The `python-spacetrack` library automatically sleeps to respect rate limits. The Firefly agent **must not** run a tight polling loop — schedule CDM retrieval on an 8-hour cron with event-driven re-polling only for known high-Pc events.

## MVP Retrieval Recipe

Minimal working CDM retrieval with the `python-spacetrack` library:

```python
import asyncio
from spacetrack import SpaceTrackClient

async def fetch_high_risk_cdms():
    async with SpaceTrackClient(
        identity="user@example.com",
        password="password"
    ) as st:
        cdms = await st.cdm_public(
            tca=">now",
            pc=">0.00001",
            orderby="PC desc",
            limit=100,
            format="json"
        )
    return cdms
```

Returns JSON list; parse `TCA`, `MISS_DISTANCE`, `PC`, `SAT_1_ID`, `SAT_2_ID` as minimum viable fields for the triage decision verb.

## Operator Registration Requirement

A free account at space-track.org requires:
1. Register at https://www.space-track.org/auth/createAccount
2. Agree to the User Agreement (US Government data; non-commercial use; no re-distribution)
3. Access is typically approved within 24–48 hours

Operators who register a satellite NORAD catalog number with 18 SDS (via the CA Support program) gain access to the full `cdm` class with covariance data for their objects.

## Data Lag and Freshness

Space-Track CDMs are updated approximately every 8 hours. The most recent CDM for a given event pair may lag real-world orbital changes by up to 8 hours. Commercial providers (LeoLabs, COMSPOC) offer sub-hourly updates for high-risk events.

## See Also

- [[entities/18-sds]] — the organisation operating Space-Track
- [[sources/ccsds-508-cdm-2013]] — the CDM format standard
- [[sources/tracss-oasis-announcement-2024]] — future TraCSS.gov interface replacing Space-Track for civil operators
- [[synthesis/cdm-pc-decisioning]] — complete MVP recipe using this API

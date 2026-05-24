---
type: concept
tags: [conjunction, cdm, ssa, ccsds, space-debris, mission-desk, firefly, space-track, tracss]
---

# CDM — Conjunction Data Message

The Conjunction Data Message (CDM) is the standard information-exchange product for a predicted close-approach event between two resident space objects (RSOs). It is the single most operational signal a satellite operator acts on during on-orbit operations. The CDM format is governed by [[sources/ccsds-508-cdm-2013|CCSDS 508.0-B-1]] (June 2013 Blue Book; draft revision 508.0-P-11 under review as of February 2025).

This page is the navigation hub for CDM-related wiki coverage. See linked pages for field-level depth, Pc mathematics, and the complete operator workflow.

## What a CDM Contains

A CDM describes a single conjunction event between exactly two objects: OBJECT1 (the primary, typically the operator's satellite) and OBJECT2 (the secondary, any other tracked object). Every CDM is a snapshot computed at a specific `CREATION_DATE`; operators receive a stream of CDMs for the same event as orbital solutions are updated.

### Header Block

| Field | Required | Description |
|---|---|---|
| `CCSDS_CDM_VERS` | Yes | Format version ("1.0") |
| `CREATION_DATE` | Yes | UTC timestamp of message creation |
| `ORIGINATOR` | Yes | Creating agency (e.g., "JSPOC", "TraCSS") |
| `MESSAGE_ID` | Yes | Unique event identifier |
| `MESSAGE_FOR` | No | Target spacecraft name |

### Relative Metadata Block

| Field | Required | Description |
|---|---|---|
| `TCA` | Yes | Time of Closest Approach (UTC, sub-second) — see [[concepts/tca-time-of-closest-approach]] |
| `MISS_DISTANCE` | Yes | Scalar miss distance at TCA (metres) |
| `RELATIVE_SPEED` | No | Relative speed at TCA (m/s); typically 10–15 km/s in LEO |
| `RELATIVE_POSITION_R/T/N` | No | RTN frame components of miss vector |
| `COLLISION_PROBABILITY` | No | Pc value (dimensionless, 0–1) — see [[concepts/pc-probability-of-collision]] |
| `COLLISION_PROBABILITY_METHOD` | No | Algorithm string (e.g., `FOSTER-1992`, `CHAN-1997`, `ALFANO-2005`) |

### Per-Object Blocks (OBJECT1 and OBJECT2)

Each object block contains:

**Mandatory identification:**
- `OBJECT` (OBJECT1 / OBJECT2)
- `OBJECT_DESIGNATOR` (NORAD catalog number)
- `CATALOG_NAME`, `OBJECT_NAME`
- `INTERNATIONAL_DESIGNATOR` (COSPAR ID)
- `EPHEMERIS_NAME`, `COVARIANCE_METHOD`
- `MANEUVERABLE` (YES / NO / N/A)
- `REF_FRAME` (GCRF or ITRF)

**State vector (mandatory, at TCA):**
- Position: X, Y, Z (km)
- Velocity: X_DOT, Y_DOT, Z_DOT (km/s)

**Covariance matrix (required for Pc calculation):**

All 21 elements of the 6×6 lower-triangular [[concepts/covariance-ellipsoid|covariance]] in RTN frame:

```
CR_R
CT_R   CT_T
CN_R   CN_T   CN_N
CRDOT_R  CRDOT_T  CRDOT_N  CRDOT_RDOT
CTDOT_R  CTDOT_T  CTDOT_N  CTDOT_RDOT  CTDOT_TDOT
CNDOT_R  CNDOT_T  CNDOT_N  CNDOT_RDOT  CNDOT_TDOT  CNDOT_NDOT
```

A CDM without covariance for either object cannot support Pc computation — miss distance alone is used for risk assessment in that case.

**Optional physical parameters:** `AREA_PC`, `AREA_DRG`, `MASS`, `HARD_BODY_RADIUS` (km)

**Optional OD quality fields (TraCSS CDM Spec v2.1, July 2025 extension):** `OD_QUALITY` (`GOOD`/`FAIR`/`POOR`/`UNKNOWN`), `TIME_LASTOB_START`, `TIME_LASTOB_END`, `OBS_USED`, `RESIDUALS_ACCEPTED`

## Serialisation Formats

| Format | Source | Notes |
|---|---|---|
| KVN (Keyword = Value Notation) | CCSDS 508.0-B-1 | Human-readable `FIELD = VALUE` per line; default CCSDS text encoding |
| XML | CCSDS 508.0-B-1 | Schema-defined; `<header>`, `<body>`, two `<segment>` blocks |
| JSON (Space-Track) | Space-Track extension | Non-CCSDS extension; field names match KVN keys; most convenient for API consumers |
| CSV | Space-Track extension | Tabular; one row per CDM |
| TraCSS-unique JSON | TraCSS-Spec-001 | Adds `OD_QUALITY`, operator contacts, maneuver-plan fields |

### Minimal KVN fragment

```
CCSDS_CDM_VERS = 1.0
CREATION_DATE = 2010-03-12T22:31:12.000
ORIGINATOR = JSPOC
MESSAGE_ID = 201113719185
TCA = 2010-03-13T22:37:52.618
MISS_DISTANCE = 715
COLLISION_PROBABILITY = 4.835E-05
COLLISION_PROBABILITY_METHOD = FOSTER-1992
```

### Minimal JSON (Space-Track `cdm_public` response)

```json
{
  "CDM_ID": "201113719185",
  "CREATED": "2010-03-12T22:31:12.000",
  "TCA": "2010-03-13T22:37:52.618",
  "MISS_DISTANCE": "715.0",
  "PC": "4.835e-05",
  "SAT_1_ID": "12345",
  "SAT_1_NAME": "SATELLITE-A",
  "SAT_2_ID": "67890",
  "SAT_2_NAME": "DEBRIS-B",
  "RELATIVE_SPEED": "14870.0"
}
```

## CDM Generation Pipeline

CDMs are produced by upstream conjunction screening providers — operators receive them, they do not run screening themselves:

```
Space Surveillance Catalog (TLEs / SP vectors)
  |
  Propagation (7-day look-ahead for 18 SDS)
  |
  Screening Volume filter (2 km R × 25 km IT × 25 km CT, LEO)
  — every secondary entering the box generates a CDM —
  |
  Pc computation (Foster-1992 / Alfano two-dimensional method)
  |
  CDM written (CCSDS 508.0-B-1)
  |
  Distributed to operator (Space-Track.org / TraCSS.gov / commercial API)
```

Update cadence: 18 SDS / Space-Track batch-refreshes CDMs approximately every **8 hours**. Commercial providers (LeoLabs) can deliver updated CDMs within **5 minutes** of new observations.

## Pc Thresholds and Operator Action

The [[concepts/pc-probability-of-collision|Pc]] field drives the operational response:

| Tier | Pc Range | Required Action |
|---|---|---|
| **Red** | Pc ≥ 1×10⁻⁴ | Mandatory risk mitigation maneuver (NASA NPR 8079.1; ESA HIE threshold) |
| **Yellow** | 7×10⁻⁵ ≤ Pc < 1×10⁻⁴ | Maneuver analysis initiated; enhanced monitoring (NASA CARA default yellow threshold) |
| **Green** | 1×10⁻⁷ ≤ Pc < 1×10⁻⁵ | Monitoring warranted |
| **Noise** | Pc < 1×10⁻⁷ | Generally no action |

JAXA uses 1×10⁻³ as its maneuver threshold (more conservative). SpaceX Starlink uses the Alfano two-dimensional method; its specific maneuver threshold is not publicly disclosed.

## Manoeuvre Decision Lifecycle

1. **CDM receipt (T-72h to T-7d)**: First CDM for the event arrives; initial Pc assessment; mark for monitoring if Pc ≥ 1×10⁻⁷.
2. **Enhanced monitoring (T-24h to T-72h)**: If Pc is in or approaching Yellow, begin maneuver analysis. Covariance quality checked. Coordinate with secondary operator if possible.
3. **Decision window (T-12h to T-24h)**: Go / no-go maneuver decision required. Final updated CDMs inform the decision.
4. **Emergency window (T < 12h)**: Maneuver execution only if thrusters are available and delta-V budget allows. Optimal maneuver epoch is typically ¼–½ orbit before TCA, not at TCA itself.
5. **Post-conjunction**: Confirm no impact; update orbital state; file CDM outcome for dataset.

The **HIE (High Interest Event)** classification is triggered when Pc meets the agency-specific red threshold — at NASA and ESA, Pc ≥ 1×10⁻⁴.

## Effect of the May 2024 G5 Storm

The May 2024 G5 geomagnetic storm (Kp = 9, strongest since 2003 Halloween storms) highlighted a structural weakness in conjunction assessment pipelines:

- Atmospheric heating caused sudden density increases in the upper thermosphere, accelerating orbital decay across the entire LEO population simultaneously.
- Thousands of satellites executed autonomous orbit-maintenance maneuvers (led by Starlink) within hours of the storm onset.
- The mass maneuvering invalidated most active CDMs — pre-storm conjunction predictions became unreliable because all tracked objects had shifted to new, incompletely observed positions.
- After the storm, the conjunction assessment pipeline had to **restart from new initial states** for all LEO objects before reliable CDMs could be regenerated.
- Sources of CDM unreliability during storm conditions: initial measurement error, space weather index forecasting error, atmospheric density model error (density models may under-predict heating by 2–4× in extreme storm conditions), and satellite ballistic coefficient uncertainty.

This episode is the operational reason why [[concepts/swpc-space-weather-feeds|SWPC space weather feeds]] must be fused with CDM data — an operator receiving a low-Pc CDM during active G4/G5 conditions should treat it as unreliable until the post-storm catalog has restabilised (typically 12–24 hours after storm peak).

## CDM in the Spacesharks / Firefly Context

CDM is Phase 4 (on-orbit ops) of the [[synthesis/spacesharks-mission-desk-hackathon-plan|Spacesharks Mission Desk]] lifecycle. The Firefly conjunction agent:

1. Ingests CDMs via the Space-Track `cdm_public` endpoint (free tier; no secondary covariance)
2. Tiers events by Pc (Red/Yellow/Green) using NASA CARA thresholds
3. Flags covariance quality limitations inherent in `cdm_public`
4. Generates a structured decision record for each high-Pc event
5. Triggers a Nemotron-powered operator brief in the "Brief" verb format

The full implementation recipe is at [[synthesis/cdm-pc-decisioning]].

## See Also

- [[sources/ccsds-508-cdm-2013]] — CDM Blue Book format specification
- [[sources/space-track-cdm-api-2023]] — Space-Track REST API for CDM retrieval
- [[sources/nasa-cara-handbook-2023]] — NASA operational Pc thresholds and procedures
- [[sources/tracss-oasis-announcement-2024]] — TraCSS CDM spec extension and transition timeline
- [[sources/leolabs-conjunction-alerts-2025]] — commercial CDM upgrade path
- [[entities/18-sds]] — primary US government CDM source
- [[entities/space-track-19sds]] — 18 SDS / 19 SDS operational roles
- [[entities/leolabs]] — commercial CDM provider
- [[entities/slingshot-aerospace]] — CDM fleet management platform
- [[concepts/conjunction-screening-providers]] — full comparison table of all providers
- [[concepts/pc-probability-of-collision]] — Pc computation, methods, and thresholds
- [[concepts/tca-time-of-closest-approach]] — TCA and decision urgency
- [[concepts/covariance-ellipsoid]] — covariance structure and realism
- [[concepts/hard-body-radius]] — collision disk in Pc integral
- [[concepts/screening-volume]] — upstream CDM generation filter
- [[concepts/solar-cycle-25-leo-radiation]] — SC25 density context for CDM reliability
- [[concepts/orbital-data-center]] — the orbital assets being protected
- [[concepts/swpc-space-weather-feeds]] — space weather fusion for CDM quality assessment
- [[synthesis/cdm-pc-decisioning]] — end-to-end operator workflow and Python recipe
- [[synthesis/spacesharks-mission-desk-hackathon-plan]] — Phase 4 on-orbit ops context

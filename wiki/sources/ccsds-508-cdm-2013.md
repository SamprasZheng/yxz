---
type: source
title: "Conjunction Data Message, Recommended Standard CCSDS 508.0-B-1"
author: "CCSDS (Consultative Committee for Space Data Systems)"
date: "2013-06-01"
ingested: "2026-05-24"
tags: [conjunction, cdm, pc, ssa, space-debris, mission-desk, firefly, standard, ccsds]
---

# CCSDS 508.0-B-1 — Conjunction Data Message Standard

The primary international standard governing the format of Conjunction Data Messages (CDMs). Published by the Consultative Committee for Space Data Systems (CCSDS) and maintained under the CCSDS Space Operations Area. The "Blue Book" designation means it is a Recommended Standard. A draft revision (508.0-P-11, February 2025) is under review as of 2026.

**URL**: https://ccsds.org/Pubs/508x0b1e2s.pdf (Edition 2 with supplement)

## Scope

CCSDS 508.0-B-1 specifies:
- The Conjunction Data Message as a standard information exchange product for two-object close-approach events
- Required and optional fields
- Reference frames and units
- KVN (Keyword = Value Notation) and XML encoding

The standard was developed to replace ad-hoc bilateral CDM agreements between agencies. All 18 SDS (Space-Track) CDMs, TraCSS CDMs, and commercial provider CDMs (LeoLabs, COMSPOC) reference this standard.

## Required Fields (Key Subset)

| Field | Description | Example |
|---|---|---|
| `TCA` | Time of Closest Approach (UTC) | `2010-03-13T22:37:52.618` |
| `MISS_DISTANCE` | Scalar miss distance at TCA (m) | `715` |
| `RELATIVE_SPEED` | Relative speed at TCA (m/s) | `14 870` |
| `COLLISION_PROBABILITY` | Pc value (dimensionless) | `4.835E-05` |
| `COLLISION_PROBABILITY_METHOD` | Algorithm used | `FOSTER-1992` |
| `OBJECT1/OBJECT2` | Identity of each object | NORAD catalog ID, name |
| `STATE_VECTOR` | Cartesian position + velocity at TCA (m, m/s) | per-object |
| Covariance matrix (6×6) | 21-element lower-triangular, RTN frame | per-object |

Additional fields: `HARD_BODY_RADIUS` (optional, km), `SCREENING_VOLUME_SHAPE` (optional), object attitude/maneuverability indicators, data creation date, event ID.

## Covariance Requirement

All 21 elements of the 6×6 position/velocity covariance submatrix are required for both objects. A CDM without populated covariance cannot support Pc calculation. CCSDS 508.0-B-1 specifies the RTN (Radial, Transverse, Normal) frame as the required reference for covariance reporting.

## Encoding Formats

The standard formally defines two encodings:
- **KVN (Keyword = Value Notation)**: human-readable text, line-by-line key-value pairs; used in Space-Track download
- **XML (eXtensible Markup Language)**: machine-readable, schema-defined

Space-Track additionally provides JSON (non-CCSDS extension) and CSV for modern programmatic use.

## Update and Revision History

| Version | Date | Notes |
|---|---|---|
| CCSDS 508.0-B-1 | June 2013 | Original Blue Book |
| 508.0-B-1 Edition 2 | ~2019 | Minor corrections |
| 508.0-P-11 (Draft) | February 2025 | Under public review; adds new fields for maneuverability, sensor type, covariance quality |

The TraCSS CDM Specification (TraCSS-Spec-001 v2.1, July 2025) is a US DoC derivative that extends CCSDS 508.0-B-1 with additional fields including `OD_QUALITY`, operator identifiers, and maneuver plan sharing metadata.

## Relation to Other Standards

- **CCSDS 502.0-B**: Orbit Data Messages (OMMs/OEMs) — precursor format that CDM builds on for state vector representation
- **ISO 26900**: Orbital data message ISO adoption of CCSDS standards
- **Space-Track KVN format**: verbatim CCSDS KVN; the `cdm_public` and `cdm` classes return CCSDS-compliant content

## Parser Notes for Firefly Agent

A minimal Python CDM parser needs to handle:
1. KVN or JSON encoding (Space-Track returns JSON in API v2)
2. Extract: `TCA`, `MISS_DISTANCE`, `COLLISION_PROBABILITY`, `COLLISION_PROBABILITY_METHOD`, `OBJECT1_DESIGNATOR`, `OBJECT2_DESIGNATOR`, covariance block (21 elements per object if present)
3. Flag missing covariance (cannot compute Pc; miss-distance-only event)
4. Parse UTC TCA string to datetime with sub-second precision

## See Also

- [[sources/space-track-cdm-api-2023]] — Space-Track API that distributes CCSDS-format CDMs
- [[sources/tracss-oasis-announcement-2024]] — TraCSS CDM spec extending this standard
- [[concepts/pc-probability-of-collision]] — the Pc field and its interpretation
- [[concepts/covariance-ellipsoid]] — covariance field structure
- [[concepts/tca-time-of-closest-approach]] — TCA field definition
- [[synthesis/cdm-pc-decisioning]] — full operational workflow

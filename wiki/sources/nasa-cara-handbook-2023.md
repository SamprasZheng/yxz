---
type: source
title: "NASA Spacecraft Conjunction Assessment and Collision Avoidance Best Practices Handbook"
author: "NASA CARA Team (M.D. Hejduk, L.C. Johnson et al.), GSFC"
date: "2023-02-24"
ingested: "2026-05-24"
tags: [conjunction, cdm, pc, ssa, space-debris, mission-desk, firefly, nasa, cara]
---

# NASA CARA Handbook (2023)

The NASA Spacecraft Conjunction Assessment and Collision Avoidance Best Practices Handbook is the primary operational reference document for NASA's Conjunction Assessment Risk Analysis (CARA) programme. It defines risk thresholds, procedures, covariance handling, hard-body radius methodology, and the three-step conjunction assessment process used for all NASA robotic missions.

**Primary URL**: https://nodis3.gsfc.nasa.gov/OCE_docs/OCE_51.pdf  
**Alternate (2023 version)**: https://ntrs.nasa.gov/api/citations/20230002470/downloads/CA_Handbook_CM%20Version%202-24-23.docx.pdf  
**NASA CARA page**: https://www.nasa.gov/conjunction-assessment/  
**CARA Publications index**: https://www.nasa.gov/cara/cara-publications/

## CARA Programme Overview

NASA's Conjunction Assessment Risk Analysis (CARA) programme provides Agency-wide conjunction assessment services for **all NASA robotic missions** under NASA Procedural Requirements NPR 8079.1. CARA operates under NASA's Goddard Space Flight Center (GSFC). 

CARA ingests CDMs from [[entities/18-sds|18 SDS]] via Space-Track and performs its own independent analysis, supplemented by high-fidelity covariance sources where available. CARA analysts provide:
- Risk assessment against action thresholds
- Maneuver recommendations
- Post-event analysis and ground-truth scoring

## Pc Risk Thresholds (Verified)

NASA CARA uses a three-tier risk categorisation based on operationally-computed Pc:

| Tier | Pc Range | Definition | Action |
|---|---|---|---|
| **Red (High Risk)** | Pc ≥ 1×10⁻⁴ | Warning/Remediation threshold; per NPR 8079.1, risk mitigation maneuver must be executed | Mandatory maneuver execution (unless operationally infeasible) |
| **Yellow (Moderate)** | 7×10⁻⁵ ≤ Pc < 1×10⁻⁴ (default; mission-specific values negotiated with CARA) | Event has potential to become high risk; enhanced monitoring; maneuver analysis initiated | Maneuver analysis; operator/CARA review; additional CDM monitoring |
| **Green (Low)** | Pc < 1×10⁻⁵ | Operational attention warranted above 1×10⁻⁷; below 1×10⁻⁷ generally not actionable | No action below 1×10⁻⁷; monitoring between 1×10⁻⁷ and threshold |

**Key clarification on Yellow threshold**: The "default" yellow/green boundary per CARA architecture documentation (NTRS 20190029214) is **7×10⁻⁵**, not 1×10⁻⁵. However, individual NASA missions negotiate mission-specific thresholds during the "Orbital Collision Avoidance Planning" (OCAP) process — some high-value missions may have a lower yellow threshold. The 1×10⁻⁵ figure sometimes cited in secondary literature reflects a rounded approximation.

⚠️ For Firefly agent implementation: use 1×10⁻⁴ as the verified Red threshold. Use 7×10⁻⁵ as the default Yellow threshold but flag in agent output that mission-specific thresholds may differ.

## Three-Step CARA Process

1. **Step 1 — Screening**: 18 SDS screens all tracked objects against the predicted trajectory using the standard [[concepts/screening-volume|screening volume]] (2 km R × 25 km IT × 25 km CT for LEO). CDMs are generated and pushed to Space-Track.
2. **Step 2 — Close Approach Risk Assessment**: CARA analysts evaluate CDM Pc against thresholds; assess covariance realism; flag dilution-region events; determine risk tier; issue risk notifications to mission teams.
3. **Step 3 — Risk Mitigation**: If Red threshold triggered, CARA analysts coordinate with mission operations to plan and execute a Collision Avoidance Maneuver (CAM).

## Hard-Body Radius Methodology

The handbook defines HBR as the radius of the circumscribing sphere around a spacecraft. Three setting approaches are documented:
1. Circumscribing sphere (most conservative)
2. RMS effective radius (statistically motivated)
3. Cross-section-weighted average (used when attitude is known)

For unknown debris secondaries, 18 SDS derives HBR from RCS estimates. The CARA programme maintains HBR values for all NASA primary objects in a mission database.

## Covariance Realism in CARA Operations

CARA does not blindly trust 18 SDS covariances. Analysts apply:
- **Covariance scaling**: inflate or deflate reported covariances based on historical tracking quality for object type
- **Alternative covariance sources**: high-fidelity orbit determination (HOD) using ground-based radar tasking for pre-maneuver decisions
- **Uncertainty inflation**: for TLE-based covariances (especially non-cooperative debris), CARA applies inflation factors

This is why CARA sometimes issues different Pc values from those in the raw Space-Track CDM.

## Dilution Region Events

CARA flags "dilution region" events — conjunctions where miss distance >> covariance scale length. In this regime, Pc is numerically sensitive to small covariance changes, making it an unreliable risk metric. CARA analysts use supplemental geometric miss distance and covariance realism assessments for dilution-region events rather than Pc alone.

## CARA Publications Cited

Key operational-parameters papers from the CARA publications index (all on NTRS):
- NTRS 20190029214: "NASA CARA Updated Requirements Architecture" — defines current thresholds and CONOPS
- NTRS 20190028904: "Recommended Methods for Setting Mission Hard Body Radii"
- NTRS 20170007928: "Conjunction Assessment Screening Volume Sizing"
- NTRS 20190028900: "Implementation Recommendations for Two-Dimensional Pc Calculation"
- NTRS 20160006111: "CARA Risk Assessment Thresholds"

## See Also

- [[entities/18-sds]] — CDM source for CARA
- [[sources/ccsds-508-cdm-2013]] — CDM format standard
- [[concepts/pc-probability-of-collision]] — Pc methods and thresholds
- [[concepts/hard-body-radius]] — HBR as defined by CARA
- [[concepts/screening-volume]] — screening dimensions used upstream of CARA
- [[synthesis/cdm-pc-decisioning]] — Firefly agent implementation of CARA-aligned thresholds

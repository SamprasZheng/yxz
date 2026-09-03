---
type: entity
tags: [conjunction, cdm, ssa, space-track, space-debris, mission-desk, firefly, us-space-force, 18-sds, 19-sds, tracss]
---

# Space-Track.org / 18 SDS / 19 SDS — US Space Force Conjunction Operations

This page covers the operational structure of US Space Force conjunction screening: the [[entities/18-sds|18th Space Defense Squadron (18 SDS)]] that maintains the public catalog and Space-Track.org portal, the 19th Space Defense Squadron (19 SDS) that conducts conjunction assessment, and the ongoing transition of civil Space Traffic Management (STM) authority to the [[sources/tracss-oasis-announcement-2024|TraCSS]] system operated by NOAA's Office of Space Commerce.

## Space-Track.org

**URL**: https://www.space-track.org  
**Operator**: 18th Space Defense Squadron (18 SDS), US Space Force, under USSPACECOM  
**Access**: Free, registration required; additional Operator Panel access for satellite owner/operators who register their satellites

Space-Track.org is the primary public portal for:
- Two-Line Element (TLE) sets for all catalogued objects (~27,000+ as of 2024–2026)
- Conjunction Data Messages (CDMs) via the `cdm_public` and `cdm` API classes
- Close Approach Notifications (CAN emails) sent to registered satellite operators
- Reentry and breakup assessments
- Special Perturbations (SP) vectors for registered operators

Access to the full `cdm` class (with secondary object state vectors and covariance matrices) requires registering a NORAD catalog number with 18 SDS through the Spaceflight Safety program.

## 18th Space Defense Squadron (18 SDS)

| Attribute | Value |
|---|---|
| Designation | 18th Space Defense Squadron |
| Previous designation | 18th Space Control Squadron (renamed 13 April 2022) |
| Location | Vandenberg Space Force Base, California |
| Parent command | Space Operations Command (SpOC) / Space Delta 2 |
| Activated | 22 July 2016 (re-activation; original lineage from 18th Surveillance Squadron, 1966) |
| Multinational context | Participates in the Combined Space Operations Center (CSpOC) at Vandenberg |

**Primary missions:**

1. **Space Surveillance Network (SSN) command and control**: Tasks ~30 contributing ground-based radar and optical sensors against catalog maintenance and special-tasking priorities — and, since **2026-08-10**, a **space-based GEO node**: the **SĀCHI** optical SDA payload (MIT Lincoln Laboratory; USSF Mission Delta 2) hosted on Japan's **QZS-7** in quasi-zenith orbit over the Indo-Pacific, feeding GEO-object tracking into the SSN in near-real-time (to Schriever SFB). The final of two launches under the QZSS Hosted-Payload (QZSS-HP) program — the first bilateral US-Japan national-security space effort. Full six-region framing: [[synthesis/space-situational-awareness-six-region]] §1b
2. **Resident Space Object (RSO) catalog maintenance**: Maintains the authoritative public catalog of tracked space objects
3. **SSA data sharing**: Operates Space-Track.org; manages the SSA sharing program with allied nations and commercial operators; direct interface between satellite operators and the US DoD
4. **Human spaceflight support**: Provides conjunction assessment for ISS and crewed vehicles on priority basis

**CDM generation process**: 18 SDS propagates catalog TLEs (or SP vectors for registered operators) forward 7 days and applies the standard LEO screening volume (2 km radial × 25 km in-track × 25 km cross-track). Every secondary object entering the screening box generates a CDM. Pc is computed using the Foster/Alfano 2-D method applied to the combined positional covariance. CDMs are batch-updated approximately every **8 hours** and pushed to Space-Track.org.

The 2024 SIA Leadership in Government Award recognised 18 SDS for "day-to-day data sharing and support" and its role as "the direct interface between satellite operators and the US Department of Defense."

## 19th Space Defense Squadron (19 SDS)

| Attribute | Value |
|---|---|
| Designation | 19th Space Defense Squadron |
| Location | Naval Support Facility Dahlgren, Virginia |
| Parent command | Space Delta 2 |
| Role | Primary conjunction assessment and collision avoidance |
| Active in CA role | Since 2022 (conjunction assessment functions) |

19 SDS performs the **conjunction assessment (CA)** mission — the prediction of close approaches and collision probability computation — operating as a complement to 18 SDS:

- **18 SDS** maintains the catalog and operates Space-Track.org (data sharing and SSN command)
- **19 SDS** performs Conjunction Assessments including launch and on-orbit assessments and collision avoidance functions

The 2024 SIA award noted that 19 SDS "performs Conjunction Assessments including launch and on-orbit assessments and collision avoidance functions" and "maintains custody of orbiting objects, processes space events, and predicts collision likelihood."

The split between these two squadrons is operational within Space Delta 2. From an operator's perspective, CDMs arriving via Space-Track.org reflect the combined output of both units.

### Launch Conjunction Assessment

19 SDS provides launch conjunction assessment (launch COLA — COnflict of Launch Area), generating screening results for planned launches to ensure the launch vehicle trajectory does not create a high-risk conjunction with existing catalogued objects. Operators planning launches submit their trajectory to 19 SDS for screening.

## CDM Delivery Mechanism

Operators receive CDMs via two paths:

**1. Email (Close Approach Notifications / CDM notifications)**

When a CDM is generated or updated for a registered satellite, all users with "CDM Notification" permissions on the Operator Panel receive an email notification. The email indicates that new CDMs are available on Space-Track — it does not contain the full CDM. The Operator Panel on Space-Track.org (accessible only to registered satellite owner/operators) provides:
- CDM management and viewing
- Close Approach Notifications
- Operator directory for secondary-operator coordination

**2. REST API**

```
# Free public CDMs (no secondary covariance)
GET https://www.space-track.org/basicspacedata/query/class/cdm_public/...

# Full CDMs for registered operators (with state vectors + covariance)
GET https://www.space-track.org/expandedspacedata/query/class/cdm/...
```

Authentication: TLS-secured username/password POST to `/ajaxauth/login`. Session cookie maintained for subsequent requests. Rate limit: 30 requests/minute, 300 requests/hour.

## TraCSS Transition

Under Space Policy Directive-3 (2018), the civil STM mission has been transitioning from DoD/18 SDS to the Department of Commerce **Office of Space Commerce (OSC)** via TraCSS:

- DoD retains the **Space Domain Awareness (SDA)** mission for national security objects
- DoC takes the **civil/commercial conjunction screening** mission
- Some functions are also being shifted to DoC, as acknowledged in the SIA 2024 award

**Status (mid-2026) — the transition is now budget-contested, not a scheduled completion.** TraCSS pilot participation grew from 17 organisations (early 2026) to **52 pilot users + the first two national-government accounts (UK, Australia), ~11,125 satellites**, registering directly via TraCSS.gov. But NOAA's FY2026 budget proposal (mid-2025) sought to *terminate* federal TraCSS funding; the Space Force opposed the cut; Congress restored the money at **$52.5M enacted for FY2026** — while the **FY2027 request again seeks ~$11M to OSC (≈80% cut)**, the "fully operational by January 2026" target slipped, a **user-fee** model is under study, and a **2025-08-13 EO** elevated OSC to report directly to the Secretary of Commerce (out from under NOAA; Taylor Jordan named director 2025-12-02). The full TraCSS.gov interface is intended to serve civil operators once production is declared, but no fixed date should be assumed; 18 SDS and 19 SDS continue as the military SDA mission providers regardless. Canonical fact-check: [[concepts/conjunction-screening-providers]] §"The 2025–2026 budget near-death and rescue"; geopolitical framing: [[synthesis/space-situational-awareness-six-region]] §2.

## International Context

18/19 SDS produce the only CDM stream with *legal* standing for US-licensed operators, and de-facto the global default — but they are one of six regional SSA systems. Europe runs a **federated** EU SST Partnership (**19 members**, new agreement in force 2026-04-12; GESTRA/GRAVES/TIRA), China a **sovereign, data-closed** CNSA + APSCO/APOSOS network **now adding a commercial space-based tier** (Gande Constellation, 120 sats, first launch 2026-07-24), Japan a fast-building civil-military system (JAXA + FY2026 SDA satellite, and host of the US SĀCHI/QZS-7 payload), Korea an astronomy-institute-led optical network (KASI OWL-Net + Sejong/Geochang SLR), and Taiwan is effectively a **consumer** of US SDA + commercial data. The contrast between Space-Track's *open* posture and China's *closed* catalog is itself a strategic choice. Full six-region map + governance models + the 100-year Kessler view: [[synthesis/space-situational-awareness-six-region]].

## See Also

- [[entities/18-sds]] — 18 SDS detailed entity page
- [[synthesis/space-situational-awareness-six-region]] — where the US system sits among the six regional SSA programs
- [[sources/space-track-cdm-api-2023]] — Space-Track REST API documentation
- [[sources/tracss-oasis-announcement-2024]] — TraCSS transition details
- [[concepts/cdm-conjunction-data-message]] — CDM format reference
- [[concepts/conjunction-screening-providers]] — full comparison with commercial alternatives
- [[concepts/screening-volume]] — the geometric filter 18 SDS applies
- [[concepts/pc-probability-of-collision]] — Pc computation by 18 SDS/19 SDS
- [[synthesis/cdm-pc-decisioning]] — how Firefly agents consume this output

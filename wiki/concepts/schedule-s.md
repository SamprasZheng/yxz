---
type: concept
tags: [fcc, ibfs, regulatory, spectrum, satellite, part-25, schedule-s, orbital-parameters, mission-desk]
---

# Schedule S

Schedule S is the technical annex to FCC Form 312, the application form for satellite space station (and certain earth station) licenses under Part 25 of the FCC's rules (47 CFR Part 25; see [[sources/fcc-part-25-2024]]). It defines the structured data format that an operator must submit to obtain a satellite license in the United States, and its fields directly populate the ITU coordination package the FCC submits on the operator's behalf.

As of 2025, the FCC proposed in its *Space Modernization for the 21st Century* NPRM (FCC 24-97, Dec 2024) to eventually replace Schedule S with two new schedules — Schedule O (orbital information) and Schedule F (frequency information) — to modernise the data model. Until those replacement rules are finalised, Schedule S remains the operative technical disclosure form.

> **Update (2026):** The modernization push escalated sharply. In October 2025 FCC Chair Brendan Carr launched "Space Month," and the follow-on NPRM proposes to **replace the entire Part 25 rule set with a new "Part 100 — Space and Earth Station Services,"** introduce a **"default-to-yes" licensing assembly line** (straightforward requests presumed in the public interest and expedited), and a **modular single-Form-312** model in which an entity files its main form once and associates all future license requests with it. Comments were due **2026-01-20**, reply comments **2026-02-18**. **Status update (2026-07):** the proceeding has advanced to adoption — a **Space Modernization Order is scheduled for a full-Commission vote at the 2026-07-22 Open Meeting** (a July 2026 FCC fact sheet accompanies it), establishing the Part 100 "licensing assembly line" with default **Nationwide, Non-site** registration rules and a modular single-Form-312 model. The Schedule S → O/F split is subsumed into this larger Part 25 → Part 100 transition; if adopted, the structured single-form model replaces the Form-312-plus-Schedule-S filing pattern described below. *(Sources: [FCC Space Modernization NPRM](https://www.fcc.gov/document/space-modernization-21st-century-nprm); [SatNews — FCC Part 100 rulemaking](https://news.satnews.com/2025/12/10/fcc-initiates-part-100-rulemaking-to-overhaul-space-licensing-framework/); [Via Satellite — Carr Space Month](https://www.satellitetoday.com/government-military/2025/10/07/fcc-chair-targets-satellite-licensing-and-spectrum-reform-in-space-month/), accessed 2026-07-03.)*

**Schedule S is the US national instance of a universal pattern.** Every ITU member administration that files satellite networks maintains an equivalent national technical-disclosure form whose fields map into the *same* [[concepts/ngso-gso-coordination|API → CR → Notification]] package and ITU SNS database — China via MIIT, Japan via MIC, Korea via MSIT, Taiwan via NCC, and each European state via its national regulator. The form differs by administration; the ITU package it feeds does not. See [[synthesis/space-regulatory-regimes-six-region]] for the six-region (台美日韓中國歐洲) comparison of who files for whom.

## Sections and Key Fields

### 1. Orbit Type Selection
The filer selects either **geostationary orbit (GSO)** or **non-geostationary orbit (NGSO)**. This selection gates which downstream fields apply and which ITU coordination pathway is triggered.

### 2. Space Station or Satellite Network Name
A unique human-readable network name (e.g., `STARLINK-GEN2`) used throughout the ITU Space Network System (SNS) database to identify the network in coordination correspondence.

### 3. Orbital Parameters (NGSO)
For each orbital plane:
- Semi-major axis or mean altitude (km)
- Inclination (degrees)
- Mean anomaly at epoch date (degrees)
- Eccentricity
- RAAN (right ascension of ascending node)
- Number of satellites per plane; number of planes

For GSO: nominal orbital position (degrees East longitude).

### 4. Spacecraft Physical / Electrical Characteristics
- Mass at beginning of life (kg) and fuel mass in orbit
- Deployed solar array area (m²)
- Spacecraft dimensions (for debris casualty area)

### 5. Frequency Bands — Transmit and Receive
For each frequency band:
- Uplink / downlink band designation (Ku / Ka / V / Q / other)
- Channel bandwidth and modulation
- For bands below 15 GHz: maximum EIRP density in **dBW/4 kHz**
- For bands at and above 15 GHz: maximum EIRP density in **dBW/MHz**
- Maximum total EIRP per beam

### 6. Antenna Beam Characteristics
For each transmit and receive beam:
- Beam name and coverage area (geographic footprint)
- Antenna pattern reference (diagram and numerical data file)
- Maximum power flux density (PFD) at Earth's surface
- Off-axis gain envelope for interference analysis

### 7. EIRP and EPFD Declarations
- Maximum EIRP (dBW) per beam per band
- For NGSO systems: a commitment that the system will comply with ITU Article 22 [[concepts/epfd-equivalent-power-flux-density|EPFD]] limits, supported by time-domain simulation outputs

### 8. Call Sign
Assigned by the FCC upon grant, not on filing. The call sign anchors the license record in IBFS and in the ITU SNS database notification record.

### 9. Fee Assignment
Application filing fees are set by 47 CFR Part 1 Appendix B. The fee for a Part 25 space station license application (SAT-LOA filing type) as of 2024 is in the range of several thousand dollars; exact fee tiers depend on band, orbit type, and constellation size. ITU cost-recovery fees are separate and billed by the ITU directly to the FCC, which passes them to the operator.

## Technical Attachments
The Schedule S main form is always supplemented by exhibits, commonly called the "Technical Annex," providing:
- Detailed antenna pattern data files (gain vs. off-axis angle)
- EPFD compliance calculations (software output files for ITU validation)
- Orbital debris mitigation plan
- Power spectral density plots for SEM compliance

## ITU Data Handoff
The Schedule S data is the primary source from which the FCC's Space Bureau constructs the ITU filing package (API → CR → Notification). The satellite network name, orbital parameters, frequency bands, and EIRP/EPFD values map directly into the ITU SNS database fields. See [[synthesis/fcc-ibfs-filings-coordination]] for the full handoff workflow.

## Proposed Replacement: Schedule O and Schedule F
Under FCC 24-97 (NPRM, Dec 2024), the FCC proposed:
- **Schedule O**: All orbital information (replaces orbital parameter sections of Schedule S)
- **Schedule F**: All frequency and technical information (replaces frequency/EIRP sections of Schedule S)

This split is intended to make machine-readable ingestion easier and to allow earth station applicants to cross-reference space station orbital data without duplicating it.

## Relevance to Mission-Desk / NemoClaw
- The Schedule S orbital parameters section is the **primary structured source** for constellation geometry queries (altitude, inclination, RAAN, sat count per plane).
- Frequency band and EIRP declarations in Schedule S are the **ground truth** for link-budget and interference-attribution tasks in the [[synthesis/spacesharks-mission-desk-hackathon-plan|Mission Desk]].
- Public IBFS search at `licensing.fcc.gov/myibfs/` exposes Schedule S exhibits as downloadable PDF attachments for granted licenses — no authentication required.
- Cross-reference [[concepts/aesa]] and [[concepts/hybrid-phased-array]] for antenna pattern interpretation; EIRP / PFD figures in Schedule S bear directly on receive-antenna design at a ground terminal.

## See Also
- [[synthesis/fcc-ibfs-filings-coordination]]
- [[synthesis/space-regulatory-regimes-six-region]]
- [[concepts/epfd-equivalent-power-flux-density]]
- [[concepts/ngso-gso-coordination]]
- [[concepts/processing-round]]
- [[sources/fcc-ibfs-portal-2023]]
- [[sources/fcc-part-25-2024]]

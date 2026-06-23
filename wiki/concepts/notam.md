---
type: concept
tags: [notam, faa, aviation, airspace, regulatory, space-launch, mission-desk]
---

# NOTAM — Notice to Air Missions

A **NOTAM** (Notice to Air Missions; formerly Notice to Airmen) is an official notice distributed by a national aeronautical information service that warns pilots and other aviation stakeholders of unanticipated or temporary hazards, changes, or closures affecting the National Airspace System (NAS). For space-launch operations, NOTAMs are the primary airspace-hazard publication mechanism that downstream orbital-data-center mission-desk agents must ingest to score slip probability and conjunction risk.

## 1. Regulatory basis

NOTAMs are issued under FAA Order 7930.2S (Notices to Air Missions) and are legally required by 14 CFR Part 450 for commercial orbital launches (see [[concepts/launch-window-slip]] and [[sources/faa-part-450-2020]]). For international operations, ICAO Annex 15 (Aeronautical Information Services) governs NOTAM format and distribution.

## 2. NOTAM number format

A domestic US NOTAM identifier follows the pattern:

```
<series-letter><4-digit-sequence>/<2-digit-year>
```

Examples from verified FAA NOTAM Search records:
- `A1559/25` — Starship IFT-9 launch hazard area, May 2025, filed under MUFH (Mexico City FIR, Boca Chica region)
- `B0824/24` — Starship Flight 5 (IFT-5) launch, October 2024
- `F3682/24` — Starship IFT-5 Stage 2 atmospheric re-entry and splashdown area
- `B0423/26` — Rocket Lab Electron launch, New Zealand temporary danger area, 2026

The series letter indicates the ARTCC or FIR of origin (KZJX = Jacksonville ARTCC for Eastern Range / Cape Canaveral; KZMA = Miami ARTCC for Gulf of Mexico overflights; MUFH = Mexico City FIR for Boca Chica trajectories). Space launch NOTAMs that require widespread airspace management are often filed as **FDC NOTAMs** under the `KFDC` location indicator when they affect instrument procedures or en-route airspace nationally.

## 3. NOTAM types

| Type code | Meaning |
|-----------|---------|
| `NOTAMN` | New NOTAM — first publication |
| `NOTAMR` | Replacement NOTAM — supersedes a prior NOTAM by number |
| `NOTAMC` | Cancellation NOTAM — explicitly cancels a prior NOTAM |

When a launch slips, the operator (or its range/ARTCC liaison) issues a `NOTAMR` referencing the original number, or a `NOTAMC` followed by a fresh `NOTAMN` with the new window. See slip-mechanics detail in [[concepts/launch-window-slip]].

## 4. NOTAM structure (ICAO format)

A space-launch NOTAM has the following fields:

```
<number> NOTAMN
Q) <FIR>/<Q-code>/<traffic>/<purpose>/<scope>/<lower-FL>/<upper-FL>/<coordinates><radius>
A) <location ICAO>
B) <effective time YYMMDDHHmm>
C) <expiry time YYMMDDHHmm> [PERM | EST]
D) <schedule — blank or day/time schedule for multi-day windows>
E) <plain-language description>
```

**Q-line Q-codes relevant to space launch:**

| Q-code | Subject |
|--------|---------|
| `QRDCA` | Danger Area — active (primary code for orbital launch hazard areas) |
| `QRDXX` | Danger Area — plain-language description (used when no standard code fits) |
| `QRTCA` | Temporary Reserved/Restricted Area |
| `QWULW` | Unmanned aircraft activity (used for some suborbital/rocket tests) |

The `E)` field for an orbital launch contains: the launch vehicle name, flight designation, launch site coordinates, hazard polygon vertices in lat/lon, altitude extent ("SURFACE TO UNLIMITED" or expressed in Flight Levels), and backup-window language.

**Verified example — A1559/25 (Starship IFT-9, May 2025):**
```
A1559/25 NOTAMN
Q) MUFH/QRDXX/IV/BO/W/000/999/2400N07952W...
A) MUFH
B) 2505132330  (2025 May 13 23:30 UTC)
C) 2505140135  (2025 May 14 01:35 UTC)
D) [backup windows May 14-17 at same hours]
E) DANGER ZONE - DUE TO SPACE LAUNCH FROM BOCA CHICA, TX.
   HAZARD AREA: [polygon coordinates]
   BACKUP LAUNCH DATES: 2505142330-2505150135,
   2505152330-2505160135, 2505162330-2505170135.
```

Coordinates extracted from this NOTAM: 2400N07952W, 2318N07658W, 2211N07525W, 2320N07951W, 2340N08121W, 2346N08205W, 2400N08302W.

## 5. Aircraft Hazard Area vs Temporary Flight Restriction

Space launch NOTAMs often implement an **Aircraft Hazard Area (AHA)** — a mosaic of airspace tools (TFRs, Warning Areas, ATCAAs, ALTRVs) rather than a single TFR. The AHA extends from the surface to unlimited altitude. The distinction:

- **TFR** (Temporary Flight Restriction, 14 CFR 91.137-91.145): general-purpose airspace tool; used for security, VIP movement, disasters; smaller/simpler geometry
- **AHA**: specific to space launch debris risk; sized by flight safety analysis per § 450.133; may cover hundreds of nautical miles of ocean

For Starship IFT-9, the AHA extended over a portion of the Bahamas and Turks & Caicos Islands, affecting more than 175 airline flights (average 40-minute delay per flight per FAA environmental assessment May 2025).

Long-term Starbase TFRs (standing restrictions at low altitude) have been issued to allow non-flight testing without per-event filings:
- TFR 5/3678: 2026-01-01 to 2027-01-01, surface to 2,000 ft
- TFR 5/3679: 2026-01-01 to 2027-01-01, surface to 5,000 ft
- TFR 6/9795: 2026-05-12 to 2026-05-25, surface to 10,000 ft

## 6. Retrieval methods

**Public (no auth):**
- **FAA NOTAM Search** at `notams.aim.faa.gov/notamSearch/` — web UI; search by ICAO location, keyword ("space launch", "Boca Chica", "rocket"), or date range. Returns raw NOTAM text and downloadable PDFs.
- **DINS** (Defense Internet NOTAM Service) at `notams.faa.gov/dinsQueryWeb/` — older interface; query by multiple ICAO codes (e.g., `KZMA+KZJX+KTFP+KNGP`).
- **FAA TFR Map** at `tfr.faa.gov/tfr3/` — graphic display of active TFRs.

**Programmatic (requires registration):**
- **FAA SWIM / FNS** (Federal NOTAM System): subscribe via SCDS at `scds.faa.gov`; receive full NOTAM database via SFTP initial load (FIL) + JMS push updates. Reference client: `github.com/faa-swim/fns-client`. Requires a SWIM account and AIM FNS subscription.
- **FAA API Gateway** at `api.faa.gov`: prototype REST endpoints including NOTAM data; evolving coverage.

See [[sources/faa-notam-search-2024]] for access details.

## 7. Six-region context — one global format, six national issuers

The NOTAM is a **globally harmonized** instrument: every region above publishes launch hazards under the same [ICAO Annex 15 / PANS-AIM (Doc 10066)](https://www.icao.int/airnavigation/aeronautical-information-management) grammar (NOTAM series, Q-codes, FIR boundaries, AIRAC cycle). The US FAA NOTAM Search above is one national instance; the issuing authority differs by region but the parse logic does not.

| Region | Issuer | Launch-NOTAM origin FIR(s) |
|---|---|---|
| US | FAA AIM (NMS, 2026) | KZ** ARTCCs |
| Europe | EUROCONTROL **EAD** repository + national ANSPs | EGPX (SaxaVord), ESAA (Esrange), ENOR (Andøya) |
| China | **CAAC** (state) | ZBPE/ZSHA/ZGZU — short-notice, land drop-zones |
| Japan | **JCAB** | RJJJ (Fukuoka) |
| Korea | **KOCA/MOLIT** | RKRR (Incheon) |
| Taiwan | **CAA/MOTC** | RCAA (Taipei) — *receives* PRC launch NOTAMs; rarely originates |

The full comparison — who originates vs. receives, the three governance models, and the digital-AIM/100-year trajectory — is in [[synthesis/space-launch-airspace-integration-six-region]]. The same standard moving from telex text → **digital AIM** (AIXM 5.1, machine-readable NOTAM) is the once-in-a-generation modernization tracked on [[concepts/notam-space-operations]] §5.

## 8. Related pages

- [[synthesis/space-launch-airspace-integration-six-region]] — six-region air-navigation deconfliction map (台美日韓中國歐洲)
- [[concepts/launch-window-slip]] — slip/scrub mechanics and NOTAM lifecycle during a launch delay
- [[sources/faa-part-450-2020]] — regulatory basis (14 CFR Part 450)
- [[sources/faa-ast-launch-licensing-2025]] — AST license chain that authorises the launch the NOTAM covers
- [[sources/faa-notam-search-2024]] — retrieval recipe for agents
- [[sources/notam-starship-ift8-2025]] — concrete scrub/replace example
- [[synthesis/faa-notam-launch-lifecycle]] — end-to-end integration for mission-desk agents
- [[concepts/orbital-data-center]] — downstream consumer of launch-window signals
- [[concepts/leo-value-chain]] — where launch-window uncertainty sits in the LEO stack
- [[synthesis/spacesharks-mission-desk-hackathon-plan]] — agent that queries this concept

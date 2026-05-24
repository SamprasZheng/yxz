---
type: source
title: "FAA NOTAM Search and SWIM FNS — Programmatic Access Reference"
author: "FAA Air Traffic Organization / AIM"
date: "2024-01-01"
ingested: "2026-05-24"
tags: [faa, notam, api, swim, space-launch, mission-desk, firefly, retrieval]
---

# FAA NOTAM Search and SWIM FNS — Programmatic Access Reference

**Primary URLs:**
- [notams.aim.faa.gov/notamSearch/](https://notams.aim.faa.gov/notamSearch/) — public web search
- [notams.faa.gov/dinsQueryWeb/](https://www.notams.faa.gov/dinsQueryWeb/) — DINS legacy interface
- [scds.faa.gov](https://scds.faa.gov) — SWIM Cloud Distribution Service (requires account)
- [github.com/faa-swim/fns-client](https://github.com/faa-swim/fns-client) — FNS Java client reference implementation
- [tfr.faa.gov/tfr3/](https://tfr.faa.gov/tfr3/) — TFR graphic display

## 1. FAA NOTAM Search (public, no authentication)

The **Federal NOTAM System (FNS)** public interface at `notams.aim.faa.gov/notamSearch/` is the authoritative public access point for all active and recently expired US NOTAMs. It supports:

- **Location search** by ICAO identifier or ARTCC code
- **Keyword search** — enter "space launch", "rocket", "Boca Chica", "SpaceX", "Rocket Lab", "Falcon 9", etc. to retrieve space-related NOTAMs
- **Date/time filter** — search for NOTAMs effective within a date range
- **NOTAM number direct lookup** — retrieve a specific NOTAM by number (e.g., A1559/25)
- **PDF download** — each NOTAM is downloadable as a PDF via a transaction ID URL

**Agent recipe for space-launch NOTAM polling:**
```
GET https://notams.aim.faa.gov/notamSearch/
  → search keyword: "space launch" OR "rocket launch"
  → filter by location ICAO: KZJX (Eastern Range), KZMA (Gulf of Mexico), MUFH (Boca Chica)
  → sort by effective time descending
  → parse E) field for: vehicle name, launch site, window B)/C), backup dates, coordinates
```

**Important ICAO codes for US orbital launches:**

| ICAO / FIR | Coverage |
|------------|----------|
| `KZJX` | Jacksonville ARTCC — Eastern Range (Cape Canaveral, KSC) |
| `KZMA` | Miami ARTCC — Falcon 9/Heavy launches over Atlantic/Caribbean |
| `MUFH` | Mexico City FIR — Starship IFT launches over Gulf of Mexico |
| `KZHU` | Houston ARTCC — Texas/Gulf region |
| `KZLA` | Los Angeles ARTCC — Vandenberg/Western Range |
| `KZSE` | Seattle ARTCC — Pacific Northwest |
| `KZOA` | Oakland ARTCC — Pacific overflights |
| `KFDC` | FDC NOTAM location — national-scope instrument procedure and airspace changes |

## 2. DINS (Defense Internet NOTAM Service)

Legacy URL: `notams.faa.gov/dinsQueryWeb/queryRetrievalMapAction.do?method=displayByICAOs&reportType=RAW&formatType=DOMESTIC&retrieveLocId=KNGP+KVCT+KCLL+KCRP+KZHU+KTFP+KRKP`

The DINS interface allows multi-location queries by concatenating ICAO codes with `+`. The `RAW` format returns plain NOTAM text suitable for regex parsing. Still functional as of 2025 but SWIM is the strategic replacement.

## 3. FAA SWIM / FNS (System Wide Information Management)

**SWIM** is the FAA's enterprise data distribution platform. The **FNS JMS** (Federal NOTAM System Java Messaging Service) service provides:

- **FIL** (FNS Initial Load): complete dump of all active NOTAMs, delivered via SFTP
- **FNS JMS**: real-time incremental NOTAM updates via publish-subscribe JMS topics
- **FnsRestApi**: wrapper REST API (reference implementation in `faa-swim/fns-client` GitHub repo)

**Access procedure:**
1. Create account at `scds.faa.gov` (SWIM Cloud Distribution Service)
2. Request subscription for the **AIM FNS** service
3. Receive credentials for SFTP (FIL) and JMS endpoint
4. Run `faa-swim/fns-client` reference implementation to build local NOTAM database
5. Query local DB via REST for "space launch" keyword or location ICAO filter

**Java client GitHub:** `github.com/faa-swim/fns-client` — Apache-licensed reference implementation. The `FnsRestApi` sub-module provides a basic REST query layer over the local NOTAM database.

Third-party wrapper: `github.com/SkyLink-API/notam-api` — lightweight wrapper around FAA SWIM for airport-level NOTAM queries; returns parsed fields (NOTAM ID, type, location, effective/expiry times, body).

## 4. FAA API Gateway

URL: `api.faa.gov/s/` — prototype REST API catalogue. Evolving coverage; includes some NOTAM endpoints. Not yet production-stable for high-frequency agent polling as of 2025.

## 5. TFR graphic and XML feed

`tfr.faa.gov/tfr3/` — interactive TFR map. FAA also publishes TFR data in XML format accessible at `tfr.faa.gov/save_pages/detail_<number>.xml`. TFR numbers follow the format `Y/NNNN` (e.g., 5/3678 for Starbase standing TFR). The graphic site shows active TFRs including SpaceX Starbase long-term TFRs.

## 6. NOTAM parsing schema (for agent implementation)

A space-launch NOTAM E) field can be parsed for:

```python
# Pseudo-code for mission-desk agent
import re

def parse_space_launch_notam(notam_text: str) -> dict:
    return {
        "notam_number": re.search(r'([A-Z]\d{4}/\d{2})', notam_text).group(1),
        "notam_type": re.search(r'NOTAM([NRC])', notam_text).group(1),  # N/R/C
        "fir": re.search(r'Q\) (\w+)/', notam_text).group(1),
        "effective_utc": re.search(r'B\) (\d{10})', notam_text).group(1),
        "expiry_utc": re.search(r'C\) (\d{10})', notam_text).group(1),
        "vehicle": re.search(r'(FALCON|STARSHIP|ELECTRON|VULCAN|NEW GLENN)', notam_text, re.I).group(1),
        "backup_windows": re.findall(r'\d{10}-\d{10}', notam_text),
        "hazard_coords": re.findall(r'\d{4}[NS]\d{5}[EW]', notam_text),
    }
```

Key agent heuristics:
- `notam_type == 'C'` → launch cancelled or scrubbed; re-poll for replacement
- `notam_type == 'R'` → slip; new window in B)/C) fields
- Multiple entries in `backup_windows` → operator has pre-declared slip options (common for Starship)
- Gap between last NOTAM expiry and stated NET date → regulatory or technical hold likely

## 7. Coast Guard NOTMAR parallel feed

Space launch operators file parallel Notices to Mariners (NOTMARs) with the USCG via Letters of Intent. These are published at:
- `navcen.uscg.gov` — Coast Guard Navigation Center; search "Broadcast Notice to Mariners"
- NAVTEX broadcasts for mariners at sea
- NAVAREA IV (Western North Atlantic) and NAVAREA XII (North Pacific) advisories

Agent recipe: cross-check USCG NAVCEN for `navcen.uscg.gov/broadcast-notice-to-mariners-message` when a NOTAM covers ocean hazard areas.

## 8. Related pages

- [[concepts/notam]] — NOTAM structure and format details
- [[concepts/launch-window-slip]] — slip/scrub mechanics
- [[sources/faa-ast-launch-licensing-2025]] — licensing context
- [[sources/notam-starship-ift8-2025]] — concrete example usage
- [[synthesis/faa-notam-launch-lifecycle]] — agent integration guide

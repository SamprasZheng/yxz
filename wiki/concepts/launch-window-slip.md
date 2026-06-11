---
type: concept
tags: [space-launch, notam, faa, slip, scrub, mission-desk, firefly, regulatory]
---

# Launch Window Slip

A **launch window slip** is any postponement of a scheduled T-0 (lift-off time) to a later instantaneous moment or window, whether within the same day, to the next day, or to a future date. Scrubs (same-day aborts after count has started), slips (pre-count rescheduling), and holds (intra-count pauses) have distinct NOTAM implications that downstream orbital-data-center mission-desk agents must track to score slip probability and update conjunction-avoidance timelines.

## 1. Window taxonomy

| Term | Definition | NOTAM consequence |
|------|-----------|-------------------|
| **Instantaneous launch window** | A single second of T-0 — the only moment when the vehicle will achieve the desired orbit (phasing, Sun-synchronous plane, rendezvous). Any delay of 1 second misses the window. | New NOTAM required for each daily instantaneous attempt |
| **Launch window** | A continuous span of minutes to hours during which launch is acceptable (less-critical phasing). | One NOTAM covers the window; slip within window has no NOTAM consequence |
| **Hold** | Countdown pause at a pre-defined T-minus mark (T-9 min for Falcon 9, T-40 s for Starship). | No NOTAM change during a hold; if hold extends past window expiry the NOTAM lapses |
| **Scrub** | Launch attempt terminated; rescheduled to a later day. | Original NOTAM is cancelled (NOTAMC) or allowed to expire; new NOTAM filed for next attempt |
| **Slip** | Rescheduling before count started; window moved forward 1+ days. | NOTAMR (replacement) referencing original NOTAM number, or fresh NOTAMN for new window |
| **Wave-off** | Abort just before or during ignition sequence; emergency hold. | Existing NOTAM cancelled; new NOTAM filed for rescue window if within same day |

## 2. Slip mechanics — what triggers a slip

Slip drivers fall into five categories (from mission-desk perspective):

1. **Regulatory**: FAA license not yet issued or modified; mishap investigation open (e.g., SpaceX could not launch IFT-9 until FAA closed the IFT-8 mishap investigation, May 2025). FAA license modification for IFT-9 issued May 15, 2025 — launch NET May 22.
2. **Weather**: Range safety weather rules (upper-level winds, anvil cloud, lightning); launch-site surface winds. Weather scrubs are the most frequent same-day cause.
3. **Technical / vehicle**: Subsystem anomaly found during terminal count (e.g., IFT-8 scrub March 3 2025: unacceptable pressures on ground spin-start system for two outer booster engines — traced to ground hardware misconfiguration, fixed overnight; launched March 6).
4. **Range / airspace conflict**: Aircraft intrusion into hazard area forces scrub (documented example in FAA Safety Briefing: GA aircraft penetrated AHA, launch scrubbed, new NOTAMs required). Coast Guard maritime patrol conflict can similarly force a wave-off.
5. **Conjunction / collision avoidance**: LCOLA (Launch Conjunction/Collision Avoidance) analysis detects unacceptable probability of collision with existing on-orbit assets during ascent phase; operator delays until conjunction clears. TraCSS (NOAA) provides LCOLA screenings; SpaceX joined as beta user 2024.

## 3. NOTAM lifecycle during a slip

```
L-72h (earliest)
 └─ Operator / range files NOTAM (NOTAMN)
    Window: B) = T-0 UTC, C) = T-0 + window duration
    E) field includes backup dates
        │
    T-0 window opens
        │
   ┌────┴──────────────────────────────────────────────────┐
   │  LAUNCH occurs ──► NOTAM expires / auto-cancels        │
   │                                                        │
   │  HOLD within window                                    │
   │    No NOTAM change if window still active              │
   │                                                        │
   │  SCRUB within window                                   │
   │    NOTAMC issued cancelling original                   │
   │    Operator prepares new NOTAMN for next attempt       │
   │                                                        │
   │  SLIP (pre-count, >24h)                                │
   │    NOTAMR issued — replaces original, new B)/C)        │
   │    Original NOTAM number referenced in header          │
   └────────────────────────────────────────────────────────┘
```

**IFT-8 concrete example (verified):**
- Original NOTAM window: March 3, 2025 23:15 UTC – March 4 01:09 UTC (Gulf of Mexico TFR issued)
- IFT-8 scrubbed March 3 at T-40s hold
- New NOTAM published for March 4 window (18:12–21:05 CST / ~00:12–03:05 UTC March 5)
- Backup dates in NOTAM: March 3, 4, 5, 6, 7 as listed in original Notice to Mariners
- Launch occurred March 6, 2025 23:31 UTC

**IFT-9 concrete example (verified):**
- NOTAM A1559/25: effective 2025-05-13 23:30 UTC, expiry 2025-05-14 01:35 UTC
- Backup windows: May 14, 15, 16, 17 at same hours embedded in E) field
- Actual launch: May 27, 2025 23:36 UTC — the ~2-week gap reflects FAA license modification (May 15) + mishap investigation closure

## 4. Timeline from L-30 to T-0

| Milestone | Typical calendar | Actor |
|-----------|-----------------|-------|
| L-180 to L-90 | FAA begins Part 450 license review (statutory 180-day clock; average 151 days per FAA 2024 data) | FAA AST |
| L-30 | Operator submits flight safety analysis update; range safety meeting | Operator + range |
| L-7 to L-5 | Environmental assessment / EA FONSI confirmed if needed | FAA AST |
| L-72h | NOTAM filed (latest per 14 CFR 450.161 guidance; in practice 48–72h) | ARTCC + operator |
| L-72h | Coast Guard NOTMAR issued via LOI; maritime hazard areas published | USCG |
| L-24h | Final weather assessment; launch readiness review (LRR) | Range + operator |
| L-2h | Hazard area surveillance begins (sea/air sweep) | Range safety |
| L-45 min | Airspace closure enforcement begins; ATC reroutes traffic | ARTCC |
| T-0 | Launch — or hold/scrub trigger | Operator / range safety |
| T+0 to T+30 min | Hazard area maintained through max debris risk period | Range safety |
| Post-launch | NOTAM cancelled or expires; maritime areas cleared | ARTCC / USCG |

## 5. Slip probability scoring for the mission-desk agent

The mission-desk agent scores slip probability using a weighted signal model:

```
P(slip) = w_reg × P_regulatory + w_wx × P_weather + w_tech × P_technical
         + w_conj × P_conjunction + w_hist × P_historical
```

Signals and data sources:

| Signal | Source | Update cadence |
|--------|--------|---------------|
| FAA license status | FAA AST (`faa.gov/space/stakeholder_engagement`) | Per event |
| Active mishap investigation | FAA press statements | Per event |
| NOTAM filed / not yet filed | NOTAM Search (`notams.aim.faa.gov`) | ~72h pre-launch |
| Marine area NOTMAR issued | USCG NAVCEN (`navcen.uscg.gov`) | ~72h pre-launch |
| Launch-site weather | NOAA/NWS, 45 WS Spaceflight Met | Hourly |
| Historical slip rate by vehicle/operator | Launch manifest history (Space-Track, Spaceflight Now) | Cumulative |
| LCOLA conjunction warning | TraCSS via Space-Track | T-24h to T-0 |

The **NOTAM-filed flag** is the highest-confidence binary signal: if a NOTAM has been published for a specific window the probability of an attempt (not necessarily launch) within that window is ~0.85 (allowing for same-day scrubs). Absence of a NOTAM for a stated NET date is an early slip signal.

## 6. Downstream conjunction pipeline impact

When a launch slips:
1. The ascent trajectory moves to a new epoch — all LCOLA screenings must be rerun against updated TLE catalogue
2. Orbital insertion time changes → initial orbit differs → conjunction data messages (CDMs) for on-orbit assets near the planned orbit become stale
3. The mission-desk agent should flag: "NOTAM replaced/cancelled — rerun TraCSS screening for new T-0"

See [[concepts/pc-probability-of-collision]], [[concepts/tca-time-of-closest-approach]], and [[sources/ccsds-508-cdm-2013]] for CDM format details.

## 6a. Jurisdiction note

The slip/scrub/hold taxonomy and its NOTAM finite-state machine above are **US-airspace-specific** — built on FAA AHA NOTAMs, USCG NOTMAR, and ARTCC coordination. A launch from another jurisdiction generates the equivalent slip signal through its own national clearance chain (UK CAA range licence under the Space Industry Act 2018; Japan MIC + Cabinet Office; etc.). The mission-desk agent must pick the right national signal source per launch site. See [[synthesis/space-regulatory-regimes-six-region]] for the six-region (台美日韓中國歐洲) launch + spectrum regulatory comparison.

## 7. Related pages

- [[concepts/notam]] — NOTAM structure, format, and retrieval
- [[synthesis/space-regulatory-regimes-six-region]] — six-region launch + spectrum regulatory map
- [[sources/faa-part-450-2020]] — regulatory basis for hazard area and NOTAM obligations
- [[sources/faa-ast-launch-licensing-2025]] — licensing chain upstream of each launch
- [[sources/notam-starship-ift8-2025]] — IFT-8 scrub/replace concrete example
- [[synthesis/faa-notam-launch-lifecycle]] — end-to-end integration guide
- [[concepts/pc-probability-of-collision]] — conjunction risk concept
- [[concepts/tca-time-of-closest-approach]] — conjunction timing
- [[synthesis/spacesharks-mission-desk-hackathon-plan]] — mission-desk agent that consumes these signals

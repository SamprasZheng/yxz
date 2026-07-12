---
type: source
title: "Starship IFT-8 NOTAM and Scrub Lifecycle — March 2025 Case Study"
author: "FAA / SpaceX / SpacePolicyOnline / Starship SpaceX Wiki"
date: "2025-03-06"
ingested: "2026-05-24"
tags: [faa, notam, space-launch, starship, spacex, scrub, slip, mission-desk, case-study]
---

# Starship IFT-8 NOTAM Lifecycle — March 2025 Case Study

**Primary source URLs:**
- [SpacePolicyOnline IFT-8 event page](https://spacepolicyonline.com/events/starship-ift-8-feb-28-2025-boca-chica-tx-630-pm-et/)
- [Starship SpaceX Wiki — IFT-8](https://starship-spacex.fandom.com/wiki/Starship_Flight_Test_8)
- [Starbase TFR tracker](https://starbasestatus.com/tfrs/)
- [FAA Stakeholder Engagement — Starship](https://www.faa.gov/space/stakeholder_engagement/spacex_starship)

This page documents the NOTAM / TFR / NOTMAR lifecycle for SpaceX Starship Integrated Flight Test 8 (IFT-8) in March 2025, providing a verified concrete example of how a scrub and multi-day slip manifest in the airspace-hazard publication system.

## 1. Background

IFT-8 was the eighth full-stack Starship/Super Heavy integrated flight test from Starbase, Boca Chica, Texas. It flew on March 6, 2025 after a scrub on March 3 and further delays. This flight ended in failure (Starship vehicle broke up approximately 3 minutes after losing telemetry), which triggered an FAA mishap investigation that subsequently delayed IFT-9.

## 2. NOTAM / TFR timeline

### Original window — February 28, 2025

A **Notice to Mariners** was filed by SpaceX with the USCG indicating:
- Target launch: February 28, 2025 between 23:30 UTC (February 28) and 01:09 UTC (March 1)
- Backup launch dates: March 3, 4, 5, 6, 7, 2025

This represents the standard multi-day backup window structure embedded in the initial filing.

### March 3, 2025 — First scrub

- **TFR issued**: Gulf of Mexico TFR effective March 3, 2025 at 23:15 UTC — March 4, 2025 at 01:09 UTC
- **Scrub**: SpaceX held the countdown at approximately T-40 seconds; scrub called due to unacceptable pressures on the ground spin-start system for two outer Super Heavy booster engines
- **Root cause**: misconfiguration on ground hardware (not a vehicle deficiency); repaired overnight
- **NOTAM action**: TFR for March 3 window allowed to expire / cancelled; new NOTAM published for next attempt

### March 4, 2025 — Second attempt, weather scrub

- New NOTAM filed for window: March 4 18:12–21:05 CST (approximately 00:12–03:05 UTC March 5)
- Scrub due to weather at launch site
- New NOTAM published for March 6 window

### March 6, 2025 — Successful launch (partial success)

- **Launch time**: 17:30:33 CT = 23:30:33 UTC on March 6, 2025
- NOTAM active for this window
- Vehicle was lost approximately T+8:26 after launch (Starship Ship 35 breakup)

## 3. Key slip mechanics illustrated

This case demonstrates all the principal slip types:

1. **Pre-window slip** (Feb 28 → March 3): Original Notice to Mariners had backup dates pre-embedded — no new NOTAM was required when the initial attempt moved to March 3; backup dates in the original NOTMAR covered it.
2. **Same-day scrub** (March 3): TFR issued and then allowed to expire after the scrub. New NOTAM issued for March 4.
3. **Weather scrub** (March 4): Second new NOTAM issued for March 6.
4. **Multi-day gap** between March 4 scrub and March 6 launch: operator filed fresh NOTAM for each new window.

Total delays: 6 days from first attempt to launch.

## 4. IFT-9 downstream NOTAM chain (brief)

IFT-8's in-flight failure triggered:
- FAA mishap investigation opened
- SpaceX submitted mishap report May 14, 2025
- FAA license modification (5 → 25 annual launches; expanded AHA over Bahamas/Turks & Caicos): May 15, 2025
- **NOTAM A1559/25** (NOTAMN, type MUFH/QRDXX): effective May 13 23:30 UTC, expiry May 14 01:35 UTC; backup windows May 14–17 at same hours
  - Coordinates: 2400N07952W, 2318N07658W, 2211N07525W, 2320N07951W, 2340N08121W, 2346N08205W, 2400N08302W
  - ⚠️ This NOTAM predates the FAA mishap investigation closure — SpaceX apparently filed it speculatively; the actual IFT-9 launch did not occur until May 27, 2025.
- IFT-9 actual launch: May 27, 2025 23:36 UTC — approximately 14 days after the first NOTAM window, reflecting the regulatory hold.

This illustrates a key agent heuristic: **a filed NOTAM does not guarantee an imminent launch** when a mishap investigation is open or a license modification is pending.

## 4a. Post-IFT-9 cadence (2025–2026) — extending the case study

Carrying the NOTAM/AHA record forward past this case study (verified against SpaceX/Spaceflight Now/SpacePolicyOnline):

| Flight | Launch (UTC) | NOTAM/AHA note | Outcome |
|---|---|---|---|
| **IFT-9** | 2025-05-27 23:36 | NOTAM A1559/25 filed ~14 days early during the mishap hold; new Bahamas/Turks & Caicos AHA | Loss of attitude control; no Starlink-sim deploy |
| **IFT-10** | 2025-08-26 23:30 | recovered after two August scrubs; standard Gulf + downrange AHA | **Success** — first clean 8-Starlink-sim deploy; B16 hard splashdown |
| **IFT-11** | 2025-10-13 | nominal single-window attempt; final Block 2 flight | **Success** — booster soft splashdown; ship suborbital splashdown +1h06 |
| **Flight 12 (V3)** | 2026-05-22 22:30 | scrub 2026-05-21, launched next day; **new Launch Pad 2**; wider AHA for the larger V3 energy | **Partial** — Ship 39 reached payload deploy (20 sims + 2 modified Starlink V3); Booster 19 broke up over the Gulf |

**Two agent-relevant lessons from the extended record:**
1. **The 7-month IFT-11 → Flight 12 gap was a first-of-type / new-pad bring-up, not a mishap hold** — distinct from the IFT-9 regulatory tail. Agents should separate *investigation-driven* slips (bounded by FAA closure) from *program-schedule* slips (bounded by hardware readiness), which have very different priors.
2. **AHA grows at each vehicle-version step.** The IFT-9 Bahamas/Turks & Caicos expansion (§6) was the first instance; Starship V3 (407 ft, 33 Raptor 3, ~18M lbf thrust) repeats the pattern from a new pad. Parse and diff the E)-field polygon at each version boundary — a widening hazard area is an early, machine-readable signal of a more energetic vehicle.

## 5. Agent inference rules

From this case, the mission-desk agent should encode:

```
IF NOTAM filed AND mishap_investigation_open == True
  THEN P(launch_in_window) ~= 0.05  # near-zero; regulatory block
  
IF NOTAM filed AND license_modification_pending == True
  THEN P(launch_in_window) ~= 0.10  # very unlikely; mod not yet complete

IF NOTAM_filed AND no_regulatory_hold AND weather_nominal
  THEN P(launch_in_window) ~= 0.85  # baseline attempt probability

IF NOTAM_filed AND prior_same_window_scrub == True
  THEN P(scrub_again) += 0.15  # elevated scrub risk on retry
  
IF NOTAMC_issued AND no_replacement_NOTAM
  THEN slip_duration_estimate = 24h to 72h  # pending new NOTAM
  
IF NOTAMC_issued AND NOTAMR_follows_within_6h
  THEN slip_duration_estimate = 24h  # routine same-window scrub
```

## 6. Institutional lesson: AHA expansion

IFT-9 license modification introduced a new AHA extending over the Bahamas and Turks & Caicos Islands — a geographic expansion required because Starship's improved trajectory put Stage 2 reentry debris over that region. This affected 175+ airline flights with average 40-minute delays. The FAA environmental assessment was a required step before the license modification.

**Mission-desk implication:** When a vehicle family's trajectory changes, the AHA polygon changes. NOTAM coordinates in E) field are the authoritative polygon — agents should parse and compare against prior launches to detect expanded hazard areas.

## 7. Related pages

- [[concepts/notam]] — NOTAM structure
- [[concepts/launch-window-slip]] — slip/scrub mechanics framework
- [[sources/faa-ast-launch-licensing-2025]] — licensing context
- [[sources/faa-part-450-2020]] — regulatory basis
- [[sources/faa-notam-search-2024]] — retrieval recipe
- [[synthesis/faa-notam-launch-lifecycle]] — end-to-end guide

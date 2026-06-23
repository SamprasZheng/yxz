---
type: synthesis
tags: [faa, notam, space-launch, regulatory, slip, mission-desk, firefly, nemoclaw, openclaw, hermes-agent-framework, orbital-data-center]
---

# FAA NOTAM — Space-Launch Lifecycle: End-to-End Guide for Mission-Desk Agents

**繁體中文摘要：** 本頁整合美國聯邦航空總署 (FAA) 在軌道商業發射流程中的 NOTAM（航空公告）機制，從 AST 發射許可核發，到 NOTAM 發布、發射嘗試、延遲或取消後的 NOTAM 替換流程，乃至下游軌道碰撞分析 (LCOLA/CDM) 的銜接方式。任務桌代理人（Spacesharks Mission Desk、Firefly launch_planner.py）可依本頁食譜從公開管道（NOTAM Search、AST Stakeholder Pages）讀取發射窗口訊號，評估延遲機率，並在窗口更動時觸發重新篩選程序。此頁亦涵蓋 USCG NOTMAR 海域危險區公告、FCC 頻率授權的平行時程，以及符合 NVIDIA Agent Challenge 2026 截止日需求的 MVP 食譜。

---

## 1. Why this matters for ODC mission planning

An orbital data center satellite's journey from integration to on-orbit revenue begins with a launch window — and that window is a probabilistic object, not a fixed timestamp. The FAA NOTAM publication chain is the single most reliable real-time signal of whether an attempt is imminent (or blocked), and the slip/scrub history is the primary training signal for estimating how many days a delayed mission actually slips.

For the Firefly / NemoClaw mission-desk stack:
- `launch_planner.py` needs to query NOTAM status to determine launch probability for Phase 1 (Pre-launch) of the satellite lifecycle
- [[synthesis/spacesharks-mission-desk-hackathon-plan]] identifies FAA NOTAM as one of the key signal sources for the `slip-probability score` decision verb
- [[concepts/nemoclaw]] provides the sandboxed tool-calling environment; [[concepts/hermes-agent-framework]] provides the agent loop; [[concepts/openclaw]] is the default shell inside the sandbox

This page is the canonical retrieval document for all three agent personas.

## 2. Regulatory chain: who authorises a launch

```
Congress (51 U.S.C. § 50901)
    └─► FAA / Office of Commercial Space Transportation (AST)
            └─► Part 450 Vehicle Operator License (up to 5 years)
                     └─► License Modification (new trajectory / higher launch rate)
                              └─► Environmental Assessment / NEPA
                                       └─► NOTAM issuance authority
                                                └─► T-0 launch commit
```

Parallel regulatory tracks (not FAA AST):
- **FCC** — radio frequency authorization for payload TT&C and on-orbit comms; Special Temporary Authority (STA) for early operations
- **USCG** — Notice to Mariners (NOTMAR) for maritime hazard areas; coordinated via LOI with launch operator
- **ITU** — orbital slot and frequency coordination; administrated via FCC for US operators
- **NOAA/TraCSS** — LCOLA (Launch Collision Avoidance) conjunction screening; Part 450 requires analysis, TraCSS provides the service

All four must clear before launch commit. The **Part 450 license must be current and unencumbered** (no open mishap investigation, no pending required modification) before any NOTAM publication is meaningful.

## 3. Timeline: L-180 to T+30

| Milestone | Typical timing | Actor | Agent signal |
|-----------|---------------|-------|-------------|
| License application submitted | L-180 to L-90 | Operator | FAA AST docket |
| FAA completeness check | L-150 to L-90 | FAA AST | — |
| Safety / NEPA review | L-90 to L-30 | FAA AST | EA/EIS published on faa.gov/space/stakeholder_engagement |
| License issued or modified | L-30 to L-7 | FAA AST | Press release / FAA stakeholder page update |
| Mishap investigation closed (if applicable) | Variable | FAA AST | FAA press statement |
| LCOLA conjunction screening | L-24h to L-0 | Operator + TraCSS/NOAA | Space-Track CDM feed |
| **NOTAM filed** | L-48h to L-72h | ARTCC (on behalf of operator) | notams.aim.faa.gov |
| **NOTMAR filed** | L-48h to L-72h | USCG (via operator LOI) | navcen.uscg.gov |
| Weather go/no-go | L-24h | Range weather officer | NWS/45 WS public forecast |
| Hazard area surveillance begins | L-2h | Range safety | — |
| Airspace closures enforced | L-45 min | ARTCC | NOTAM active; TFR status |
| T-0 | — | — | — |
| NOTAM expires / cancelled | T+0 to T+30 min | ARTCC | NOTAM search shows expiry |

## 4. NOTAM lifecycle states (finite state machine)

```
[NOT_FILED]
    │  (L-72h to L-48h: operator + ARTCC coordination)
    ▼
[NOTAM_FILED / ACTIVE]  ← series letter + 4-digit sequence + /YY, type = NOTAMN
    │
    ├─────────────────────────────────────────────────────────────┐
    │  LAUNCH OCCURS                                              │  HOLD (within window)
    ▼                                                             │  No NOTAM change
[NOTAM_EXPIRED]  ← auto-expiry at C) field time                  │
                                                                  ▼
                                              [WINDOW_PASSING_WITHOUT_LAUNCH]
                                                    │
                                    ┌───────────────┴────────────────────────┐
                                    │                                        │
                         SCRUB (same-day)                       SLIP (pre-count)
                                    │                                        │
                    [NOTAMC issued] / [NOTAM expires]         [NOTAMR issued, new B/C fields]
                                    │                                        │
                    New NOTAMN for next window                 Or: NOTAMC + fresh NOTAMN
```

NOTAM type codes:
- `NOTAMN` — new NOTAM; first publication for a window
- `NOTAMR NNNN/YY` — replaces the NOTAM with that number; same subject, new time window
- `NOTAMC NNNN/YY` — cancels the NOTAM with that number; launch not happening in that window

## 5. NOTAM data shape for agents

A space-launch NOTAM parsed to agent-usable fields:

```json
{
  "notam_number": "A1559/25",
  "notam_type": "N",
  "fir": "MUFH",
  "q_code": "QRDXX",
  "effective_utc": "2025-05-13T23:30Z",
  "expiry_utc": "2025-05-14T01:35Z",
  "backup_windows": [
    {"start": "2025-05-14T23:30Z", "end": "2025-05-15T01:35Z"},
    {"start": "2025-05-15T23:30Z", "end": "2025-05-16T01:35Z"},
    {"start": "2025-05-16T23:30Z", "end": "2025-05-17T01:35Z"}
  ],
  "hazard_polygon": [
    "2400N07952W", "2318N07658W", "2211N07525W",
    "2320N07951W", "2340N08121W", "2346N08205W", "2400N08302W"
  ],
  "altitude_lower_ft": 0,
  "altitude_upper": "UNLIMITED",
  "vehicle": "STARSHIP",
  "flight": "IFT-9",
  "launch_site": "BOCA CHICA TX"
}
```

Key fields for slip-probability model:
- `notam_type == 'C'` → launch opportunity gone; monitor for replacement
- `backup_windows` populated → operator has pre-cleared airspace for multiple days; reduces slip cost
- Gap between `expiry_utc` and stated NET date longer than 48h → likely regulatory/technical hold

## 6. Aircraft Hazard Area (AHA) vs TFR — operational distinction

| Dimension | AHA | TFR (standalone) |
|-----------|-----|-----------------|
| Scope | Surface to UNLIMITED altitude | Usually limited altitude band or smaller area |
| Geometry | Trajectory-derived debris footprint; may span hundreds of NM | Smaller, purpose-specific |
| Size driver | Part 450 flight hazard analysis (EC ≤ 10⁻⁴ criterion) | Regulatory intent (security, VIP, disaster) |
| Implementation | Mosaic: TFRs + Warning Areas + ATCAAs + ALTRVs | Single TFR filing |
| Scrub handling | AHA components each need cancellation or expiry | Single NOTAMC sufficient |
| Example | Starship IFT-9: Bahamas + Turks & Caicos (175+ flights affected, avg 40 min delay) | Starbase standing TFR 5/3678 (2026: 0–2,000 ft, facility security) |

## 7. Maritime parallel: USCG NOTMAR

For ocean-trajectory launches (most orbital launches from CCAFS/KSC, Vandenberg, Starbase), the operator must file a **Notice to Mariners** with the USCG via a pre-agreed Letter of Intent (LOI). The LOI defines:
- Who files (operator's range safety / USCG District coordinator)
- Lead time (typically matches NOTAM: 48–72h)
- Distribution channels: Local Notice to Mariners (LNM), Broadcast Notice to Mariners (BNM), NAVTEX
- Backup date scope (mirrors NOTAM backup windows)

USCG NAVCEN at `navcen.uscg.gov` publishes live BNM messages. For Boca Chica launches, relevant district is **District 8** (Gulf of Mexico). For Eastern Range launches, **District 7** (Southeast).

NAVAREA coverage: NAVAREA IV (Western North Atlantic) covers Atlantic-trajectory launches from Eastern Range; NAVAREA XII (North Pacific) covers Vandenberg.

Agent recipe: when a NOTAM for an ocean-trajectory launch appears, also query `navcen.uscg.gov` for the matching NOTMAR to cross-validate the window and confirm maritime areas are cleared.

## 8. FCC parallel track (brief)

The FCC licenses the satellite's radio-frequency use separately from the FAA launch license. Key FCC instruments:
- **IBFS license** (International Bureau Filing System): authorises the satellite system's frequency/orbital parameters; filed years before launch
- **STA** (Special Temporary Authority): stopgap permission for early on-orbit operations before the full IBFS license is complete; typically 180-day grant

The FCC clock runs independently of the FAA clock — an operator can hold a valid Part 450 launch license but be unable to launch legally because the FCC STA has not yet been granted. The mission-desk agent should maintain a `{faa_license_clear: bool, fcc_auth_clear: bool}` status tuple per mission.

Full FCC/IBFS coverage: [[synthesis/fcc-ibfs-filings-coordination]].
<!-- deduped → [[synthesis/fcc-ibfs-filings-coordination]] -->

## 9. Conjunction pipeline handoff (LCOLA → CDM)

When a launch NOTAM is filed, it signals that an ascent is imminent. The downstream conjunction-avoidance pipeline must:

1. **Receive LCOLA screening result** from TraCSS/NOAA for the filed launch window. A failed LCOLA (conjunction probability exceeding threshold) is a regulatory-force slip driver.
2. **On launch**: update the TLE catalogue with the newly inserted object(s); begin CDM generation for on-orbit assets in the injection orbit neighbourhood.
3. **On slip (NOTAMR/NOTAMC)**: discard the prior LCOLA result; re-run with the new window T-0 epoch (orbital positions of potential conjunctors change with epoch).
4. **On scrub**: same as slip handling; treat NOTAMC as an epoch-reset trigger.

Key data formats: [[sources/ccsds-508-cdm-2013]] (CDM standard), [[concepts/pc-probability-of-collision]], [[concepts/tca-time-of-closest-approach]].

## 10. MVP cookbook — agent implementation with only public data

The following recipe works with **zero paid subscriptions**. It is the minimum viable implementation for the Spacesharks Mission Desk / Firefly `launch_planner.py` agent.

### Step 1 — Monitor AST stakeholder pages

```
Poll: https://www.faa.gov/space/stakeholder_engagement/{operator_slug}
  Operators: spacex_starship, spacex_falcon, rocket_lab, blue_origin, etc.
  Watch for: license modification announcements, mishap investigation status, EA publications
  Cadence: daily
  Signal: license_clear = True when "license amendment" or "return to flight" language appears
```

### Step 2 — Poll NOTAM Search for each operator/site

```
Poll: notams.aim.faa.gov/notamSearch/
  Keywords: ["space launch", "rocket launch", "SpaceX", "Rocket Lab", "Falcon 9", "Starship"]
  Location: KZJX, KZMA, KZLA, MUFH (rotate through)
  Cadence: every 12h routinely; every 1h when NET date is within 5 days
  Parse: notam_number, notam_type (N/R/C), effective_utc, expiry_utc, backup_windows, vehicle, flight_id
  Output: {notam_status: "active"|"replaced"|"cancelled"|"none", window_start_utc, window_end_utc}
```

### Step 3 — Check USCG NAVCEN for maritime confirmation

```
Fetch: navcen.uscg.gov/broadcast-notice-to-mariners-message
  Filter: messages mentioning "rocket", "launch", "SpaceX", launch site region
  Cadence: daily (slower cadence; NOTMAR usually filed same day as NOTAM)
  Signal: notmar_filed = True → corroborates NOTAM; absence is a weak warning signal
```

### Step 4 — Compute slip probability

```python
def slip_probability(vehicle: str, mission: dict) -> float:
    p = 0.0
    
    # Regulatory hold — near-certain slip
    if mission["mishap_investigation_open"]:
        return 0.95  # near-certain slip; very unlikely to launch
    if not mission["license_clear"]:
        return 0.90
    
    # NOTAM state
    if mission["notam_status"] == "none" and mission["days_to_net"] <= 3:
        p += 0.60  # No NOTAM filed 3 days out = very likely to slip
    elif mission["notam_status"] == "active":
        p += 0.15  # baseline scrub risk even with NOTAM filed
    elif mission["notam_status"] in ["replaced", "cancelled"]:
        p += 0.35  # already slipped once; elevated risk
    
    # Historical vehicle scrub rate
    historical_rates = {"Falcon 9": 0.08, "Starship": 0.35, "Electron": 0.12, "Vulcan": 0.40}
    p += historical_rates.get(vehicle, 0.20)
    
    # Weather (simplified — would query 45 WS or NWS for launch site)
    p += mission.get("weather_risk_score", 0.10)
    
    return min(p, 0.99)
```

### Step 5 — Trigger CDM re-screen on slip

```python
def on_notam_state_change(old_state: str, new_state: str, mission_id: str):
    if new_state in ["replaced", "cancelled"]:
        # Slip detected — queue conjunction re-screening
        conjunction_pipeline.rescreen(mission_id, reason="NOTAM_SLIP")
        log.warning(f"Mission {mission_id}: NOTAM {new_state}; CDM re-screen queued")
```

### Upgrade path

| Capability | Public MVP | Upgrade |
|-----------|-----------|---------|
| NOTAM retrieval | NOTAM Search web scrape | FAA SWIM FNS subscription (scds.faa.gov) — real-time JMS push |
| Launch schedule | AST stakeholder page polling | Launch manifests from Space-Track, RocketLaunch.live |
| Conjunction screening | Manual Space-Track CDM download | TraCSS CRADA (requires agreement with NOAA) |
| FCC status | FCC IBFS web search | FCC IBFS API (public, query by CALLSIGN or SATNAME) |
| Maritime confirmation | USCG NAVCEN web scrape | NAVTEX subscription (maritime safety broadcast) |

## 11. Integration with Firefly / NemoClaw / Hermes stack

The `launch_planner.py` agent (`agents/src/firefly/agents/launch_planner.py`) should:

1. At agent boot: load this wiki page as retrieval context
2. For each mission in the pipeline: call the public NOTAM Search endpoint via [[concepts/openclaw]] CDP tool (web scrape) or a dedicated HTTP tool
3. Maintain a state dict per launch: `{notam_status, license_status, fcc_status, slip_count, last_checked_utc}`
4. Emit a `slip_probability_score` event to the mission desk dashboard for each launch
5. On NOTAM state change: emit `conjunction_rescreen_required` event to the orbit-ops agent
6. Store NOTAM snapshots in the [[concepts/obsidian-llm-knowledge-base]] under `wiki/sources/notam-<vehicle>-<flight>-<year>.md` (this ingest creates the template)

The [[concepts/nemoclaw]] OpenShell sandbox provides the network-isolation layer: the agent can reach public FAA endpoints (`notams.aim.faa.gov`) via the credential proxy without exposing auth tokens. The [[concepts/hermes-agent-framework]] learning loop can improve the slip_probability model over time as the agent accumulates launch history in the dataset.

## 12. Cross-references

- [[synthesis/spacesharks-mission-desk-hackathon-plan]] — Phase 1 (Pre-launch) signals and decision verbs this page supports
- [[synthesis/cdm-pc-decisioning]] — downstream conjunction triage pipeline triggered by NOTAM slip
- [[synthesis/fcc-ibfs-filings-coordination]] — parallel FCC spectrum-licensing substrate
- [[concepts/notam]] — NOTAM structure detail
- [[concepts/launch-window-slip]] — slip/scrub mechanics
- [[sources/faa-ast-launch-licensing-2025]] — AST licensing chain
- [[sources/faa-notam-search-2024]] — retrieval recipe with code
- [[sources/faa-part-450-2020]] — regulatory basis
- [[sources/notam-starship-ift8-2025]] — IFT-8 scrub case study
- [[sources/nvidia-agent-challenge-2026]] — hackathon deadline context
- [[concepts/orbital-data-center]] — downstream beneficiary of accurate launch windows
- [[concepts/leo-value-chain]] — where launch-window uncertainty sits in the stack
- [[concepts/nemoclaw]] — sandbox runtime for agent tool calls
- [[concepts/openclaw]] — default agent profile inside NemoClaw
- [[concepts/hermes-agent-framework]] — agent learning loop
- [[concepts/pc-probability-of-collision]] — conjunction risk concept
- [[concepts/tca-time-of-closest-approach]] — conjunction timing
- [[sources/ccsds-508-cdm-2013]] — CDM format for LCOLA output
- [[synthesis/space-regulatory-regimes-six-region]] — six-region (台美日韓中國歐洲) generalization: this page is the US instance of the launch-authorization axis
- [[synthesis/space-launch-airspace-integration-six-region]] — six-region generalization of the **air-navigation/NOTAM** axis specifically: this page is the US instance of how launch hazards reach pilots

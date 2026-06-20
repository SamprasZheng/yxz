---
type: synthesis
tags: [conjunction, cdm, pc, ssa, space-track, space-debris, mission-desk, firefly, nemoclaw, openclaw, hermes]
---

# CDM → Pc → Maneuver Decision: End-to-End Workflow

Canonical operational reference for the Spacesharks Mission Desk conjunction triage verb. Covers: the Conjunction Data Message format, Pc computation, maneuver decision thresholds, MVP retrieval from public Space-Track data, and the commercial upgrade path for production use. Integrates with `agents/src/firefly/agents/launch_planner.py` and the broader Firefly orchestrator.

> **繁體中文摘要**
> 本頁是火衛（Firefly）聯合偵測代理人的操作參考文件。近接事件（conjunction）的標準資料格式為 CCSDS CDM（CCSDS 508.0-B-1），由 18 SDS（美國太空部隊第 18 太空防衛中隊）透過 Space-Track.org 發布。碰撞機率（Pc）以二維高斯積分計算，NASA CARA 以 Pc ≥ 1×10⁻⁴ 為紅色高風險門檻（必須機動），7×10⁻⁵ ≤ Pc < 1×10⁻⁴ 為黃色監測門檻。美國商務部辦公室正推進 TraCSS（預計 2026 年正式上線）逐步取代 Space-Track 作為民用太空交通管理介面。MVP 驗證階段使用免費 Space-Track `/class/cdm_public` 端點即可；付費升級路徑為 LeoLabs（協方差品質更優、更新頻率高達 400%）或 Slingshot Beacon（支援機動協調）。

## 1. The Signal Chain: CDM → Pc → Decision

```
18 SDS Sensor Network
        |
   Space Surveillance Catalog (TLE/SP)
        |
   Screening (2km R × 25km IT × 25km CT, 7-day look-ahead)
        |
   CDM generated (per CCSDS 508.0-B-1)
        |
   Space-Track.org API (/class/cdm_public or /class/cdm)
        |
   [Firefly ingestor] → parse TCA, miss distance, Pc, object IDs
        |
   Pc evaluation → risk tier (Red/Yellow/Green)
        |
   Covariance quality check → confidence flag
        |
   Maneuver recommendation → operator brief
```

## 2. CDM Format Essentials

The Conjunction Data Message standard ([[sources/ccsds-508-cdm-2013|CCSDS 508.0-B-1]], June 2013) carries:

**Mandatory fields for Firefly triage:**

| Field | Description | Operational Significance |
|---|---|---|
| `TCA` | Time of Closest Approach (UTC) | Anchor for all downstream calculations; determines decision urgency |
| `MISS_DISTANCE` | Miss distance at TCA (m) | Geometric risk; covariance-independent |
| `COLLISION_PROBABILITY` | Pc (dimensionless decimal) | Primary risk metric |
| `COLLISION_PROBABILITY_METHOD` | Algorithm string (e.g., `FOSTER-1992`) | Tells agent which method produced Pc |
| `OBJECT1/2 DESIGNATOR` | NORAD catalog numbers | Identifies which objects |
| Covariance matrix (6×6) | 21 elements per object, RTN frame | Required for independent Pc recalculation |
| `HARD_BODY_RADIUS` | Collision sphere radius (km, optional) | If absent, apply default from size table |

Space-Track `cdm_public` omits the secondary object's full covariance for non-operator accounts. This limits agents using only `cdm_public` to trusting the reported Pc without independent recomputation.

## 3. Pc Computation Methods

The standard short-encounter assumption (relative velocity >> positional uncertainty growth during flyby) reduces Pc to a **2-D integral** of the combined position-error PDF over the collision disk:

```
Pc = ∫∫_{collision_disk} f(x,y | μ, C_combined) dx dy
```

Where:
- `C_combined` = C_primary + C_secondary (both projected onto encounter plane)
- Collision disk radius = HBR_combined = HBR_primary + HBR_secondary
- `μ` = relative position at TCA projected onto encounter plane

Five methods in common use (see [[concepts/pc-probability-of-collision|detailed breakdown]]):
- **Foster-Estes (1992)**: 18 SDS/JSpOC baseline; 2-D numerical quadrature
- **Akella-Alfriend (2000)**: Reformulated Foster; equivalent result
- **Chan (analytic)**: Rician transformation; fast approximation
- **Alfano (error-function series)**: SpaceX Starlink CDM Pc field uses this method
- **Patera (numerical)**: High accuracy; higher compute cost

For the Firefly agent MVP, implementing Chan's analytic series or Alfano's series is sufficient for triage. Defer high-fidelity Monte Carlo to near-TCA decisions (< 12 h) on Red events.

## 4. Maneuver Decision Thresholds

### NASA CARA Verified Thresholds (primary reference)

| Tier | Pc Range | Required Action |
|---|---|---|
| **Red** | Pc ≥ 1×10⁻⁴ | Mandatory maneuver (NASA NPR 8079.1); ESA uses same threshold for High Impact Events (HIE) |
| **Yellow** | 7×10⁻⁵ ≤ Pc < 1×10⁻⁴ | Maneuver analysis; enhanced monitoring; mission-specific negotiation with CARA |
| **Green** | Pc < 1×10⁻⁵ | Operational attention warranted above 1×10⁻⁷; no action below |

⚠️ **Yellow threshold ambiguity**: The CARA architecture documentation (NTRS 20190029214) states the default yellow threshold is **7×10⁻⁵**. Some secondary literature rounds this to 1×10⁻⁵. The Firefly agent outputs both the Pc value and this flag when Pc falls between 1×10⁻⁵ and 1×10⁻⁴.

### Cross-Operator Comparison

| Operator | Maneuver Threshold | Source |
|---|---|---|
| NASA missions (CARA-supported) | Pc ≥ 1×10⁻⁴ (mandatory); 7×10⁻⁵ (analysis start) | NASA CARA handbook |
| ESA operational satellites | Pc ≥ 1×10⁻⁴ (HIE) | ESA SDC-8 proceedings |
| JAXA | Pc ≥ 1×10⁻³ | ESA SDC-8 survey paper |
| SpaceX Starlink | Not publicly disclosed | ⚠️ |
| Planet, Maxar, Iridium | Typically 1×10⁻⁵–1×10⁻⁴ range; not publicly disclosed | ⚠️ |

Commercial operators have no mandated threshold. The Firefly agent uses NASA CARA thresholds as the default and flags operator-specific calibration as a configuration parameter.

## 5. Decision Quality Factors

Pc alone is insufficient. The Firefly agent produces a structured decision record incorporating four factors:

```json
{
  "event_id": "CDM_ID",
  "tca": "2026-05-30T14:22:15.000Z",
  "time_to_tca_hours": 38.5,
  "miss_distance_m": 215,
  "pc": 3.2e-5,
  "pc_method": "FOSTER-1992",
  "pc_tier": "yellow",
  "covariance_confidence": "low",
  "covariance_note": "secondary is TLE-only; no covariance in cdm_public → Pc may be unreliable",
  "hbr_combined_m": 2.1,
  "hbr_source": "default_lookup",
  "objects": ["primary_norad_12345", "debris_norad_67890"],
  "recommended_action": "monitor_enhanced",
  "maneuver_window_opens": "2026-05-29T18:00:00Z",
  "delta_v_estimate_ms": 0.12,
  "agent_confidence": "medium",
  "flags": ["covariance_tdm_only", "yellow_threshold_ambiguity"]
}
```

Confidence factors:
1. **Covariance completeness**: Full covariance (both objects) → high. TLE-only secondary → medium/low.
2. **Covariance realism**: 18 SDS TLE-based is often optimistic. Flag for operator awareness.
3. **Time to TCA**: > 72 h = early; 24–72 h = decision window; < 12 h = emergency.
4. **Object size confidence**: Known HBR → high; default lookup → medium.

## 6. MVP Recipe — Public Space-Track CDMs Only

This section answers: **"Given only free Space-Track data, what can the Firefly agent actually do?"**

### What you can do with `cdm_public` (free, registration only)

1. **Retrieve CDMs**: All conjunction events where your registered satellite is the primary object, plus public-subset CDMs for any object pair (with limited secondary data)
2. **Apply Pc thresholds**: The `PC` field is populated in `cdm_public` if 18 SDS computed it; use directly for Red/Yellow/Green tiering
3. **Time-to-TCA urgency**: Parse `TCA` minus `now` to classify decision urgency
4. **Miss distance screening**: `MISS_DISTANCE` available — useful for sanity-checking Pc
5. **Trend monitoring**: Poll every 8 h; track Pc evolution per `CDM_ID` event over successive CDMs; rising Pc trend is a red flag independent of absolute value
6. **Operator brief generation**: Enough data for a human-readable daily conjunction summary

### What you cannot do with `cdm_public` only

- **Independent Pc recomputation**: Secondary covariance not available → cannot verify 18 SDS Pc
- **Maneuver optimisation**: Without full state vectors for secondary, cannot compute optimal CAM delta-V
- **Covariance realism scoring**: Only available with full covariance data (operator `cdm` class)

### Minimal Python implementation

```python
import asyncio
from datetime import datetime, timezone, timedelta
from spacetrack import SpaceTrackClient

YELLOW_THRESHOLD = 7e-5
RED_THRESHOLD = 1e-4
ATTENTION_THRESHOLD = 1e-7

async def fetch_and_triage_cdms(identity: str, password: str):
    """
    Fetch CDMs from the last 7 days with Pc >= 1e-7.
    Return tiered list sorted by Pc descending.
    Rate limits: 30 req/min, 300 req/hr — this runs once per 8h cron job.
    """
    async with SpaceTrackClient(identity=identity, password=password) as st:
        cdms = await st.cdm_public(
            tca=f">now",
            pc=f">{ATTENTION_THRESHOLD}",
            orderby="PC desc",
            limit=200,
            format="json"
        )

    results = []
    now = datetime.now(timezone.utc)

    for cdm in cdms:
        pc = float(cdm.get("PC") or 0)
        tca = datetime.fromisoformat(cdm["TCA"].replace("Z", "+00:00"))
        time_to_tca_h = (tca - now).total_seconds() / 3600

        tier = "green"
        if pc >= RED_THRESHOLD:
            tier = "red"
        elif pc >= YELLOW_THRESHOLD:
            tier = "yellow"

        results.append({
            "cdm_id": cdm["CDM_ID"],
            "tca": cdm["TCA"],
            "time_to_tca_h": round(time_to_tca_h, 1),
            "miss_distance_m": float(cdm.get("MISS_DISTANCE") or 0),
            "pc": pc,
            "pc_tier": tier,
            "primary": cdm.get("SAT_1_NAME"),
            "secondary": cdm.get("SAT_2_NAME"),
            "covariance_note": "cdm_public: secondary covariance unavailable; Pc is 18SDS estimate only"
        })

    return sorted(results, key=lambda x: x["pc"], reverse=True)
```

### Cron schedule for the Firefly agent

- **Normal cadence**: Every 8 hours (matches 18 SDS CDM update frequency)
- **High-Pc event detected**: Switch to every 1 hour for that specific CDM pair (≤ 1 req/hr per event = within rate limits)
- **< 12 h to TCA on Red event**: Every 30 minutes (still within 30 req/min limit)

### Output schema for `lifecycle-events.jsonl`

Each CDM triage event appended as one line:

```jsonl
{"phase": "on-orbit-ops", "event_type": "conjunction", "sat_id": "SAT_1_ID", "tca": "...", "pc": 3.2e-5, "pc_tier": "yellow", "miss_distance_m": 215.0, "primary": "...", "secondary": "...", "time_to_tca_h": 38.5, "recommended_action": "monitor_enhanced", "flags": ["cdm_public_only", "yellow_threshold_ambiguity"], "source": "space-track.org/cdm_public", "ingested_at": "..."}
```

## 7. Commercial Upgrade Path

Once the MVP validates on free Space-Track data, three upgrade tiers exist:

| Tier | Provider | Key Unlock | Rough Cost |
|---|---|---|---|
| **Tier 0 (MVP)** | Space-Track.org (18 SDS) | Free; basic Pc; no covariance for secondary | Free |
| **Tier 1** | LeoLabs Conjunction Alerts | 400% more frequent updates; < 5 min CDM delivery; real covariance for high-risk events; independent Pc | Commercial subscription — pricing not public; contact sales |
| **Tier 2** | Slingshot Beacon | Fleet-scale CDM management; secondary operator coordination; API integration | Commercial — pricing not public |
| **Tier 3** | COMSPOC, NorthStar, Privateer Wayfinder | Specialised covariance sources, space-based optical tracking, AI-augmented threat ranking | Commercial — pricing not public |

⚠️ **Privateer Wayfinder** pricing and API capabilities: not confirmed in public sources as of 2026-05-24. NULL result — do not cite specific Privateer capabilities without verification.

## 8. Integration with Firefly / NemoClaw Stack

### `agents/src/firefly/agents/` integration points

The CDM triage function slots into the on-orbit operations phase of the satellite lifecycle (Phase 4 in [[synthesis/spacesharks-mission-desk-hackathon-plan|the mission desk plan]]). Target integration:

- **`risk.py`** (the `RiskAgent`): owns the CDM lookup; wired into `orchestrator.py` as the `debris_risk` output, alongside `orbit_designer` / `launch_planner` / `power_thermal` / `narrator`
- **Firefly orchestrator** (`agents/src/firefly/orchestrator.py`): CDM context feeds the on-orbit risk note — if a target orbit altitude/inclination has high historical CDM density, flag it in the deployment risk brief
- **NemoClaw sandbox policy** (`firefly-sandbox.yaml`): `space-track.org` on the egress allowlist for the CDM tool call
- **Nemotron prompt for operator brief**: inject the CDM summary into the Nemotron context; prompt the model to draft a human-readable conjunction note in the "Brief" verb format

### Implementation reality (code↔concept, 2026-06-20)

A reconciliation against the actual repo (read-only; no code edited) shows the build is **deliberately coarser than this synthesis prescribes** — useful for the owner to know exactly what is and isn't wired:

| This synthesis / concept pages prescribe | What `agents/` actually does today |
|---|---|
| CDM lookup in `launch_planner.py` (§8, prior text) | CDM lookup is in **`agents/src/firefly/agents/risk.py`** (`RiskAgent`), not `launch_planner.py` — corrected above |
| Per-event tiered triage record (Red/Yellow/Green, `pc_tier`, `recommended_action`) per §5–6 | A **30-day shell aggregate**: `cdm_30d_summary` (`tools/space_track.py`) returns `cdm_count_30d` + `highest_pc` for an altitude±50 km / incl±5° band — no per-CDM tiering |
| Read `PC` field from `cdm_public` (§6 MVP code) | Code reads **`PC_BIN1`** and takes its max as `highest_pc` — ⚠️ **owner to verify** whether `PC_BIN1` is the precise Pc or a coarse binned value in `cdm_public` (Space-Track field docs are auth-walled; could not confirm publicly) |
| Covariance-realism scoring, `OD_QUALITY` rejection, default-HBR, maneuver-epoch output | **None implemented** — the RiskAgent consumes a pre-computed probability and writes a ≤4-bullet Markdown note; it never computes Pc, covariance, HBR, or CAM timing |
| Offline behaviour | ✅ matches: missing `SPACETRACK_USER/PASS` → clearly flagged `status: "offline"` stub so the loop never crashes (consistent with the trust-stack abstention philosophy) |

The shell-aggregate design is a reasonable MVP (it answers "is this orbit busy?" cheaply), but it is **not** the conjunction-triage verb this synthesis describes. The single highest-leverage upgrade is to replace `cdm_30d_summary`'s count-and-max with the per-CDM tiered parser from §6 (carrying `pc_tier`, `time_to_tca_h`, covariance flags into `lifecycle-events.jsonl`).

### NemoClaw egress allowlist entry (sandbox YAML)

```yaml
network:
  egress:
    - space-track.org          # CDM retrieval (free)
    - api.leolabs.space        # LeoLabs CDM API (paid upgrade)
    - beacon.slingshot.space   # Slingshot Beacon (paid upgrade)
```

### Hermes skill skeleton

A Hermes skill at `~/.hermes/skills/triage_conjunction_cdm/skill.md`:

```markdown
# triage_conjunction_cdm
Fetch current CDMs from Space-Track, tier by Pc, flag covariance quality, 
and produce a 5-item JSON list of highest-risk events with recommended actions.
Threshold: Red ≥ 1e-4, Yellow ≥ 7e-5, attention ≥ 1e-7.
Rate limit: max 1 call per 8 h except for Red-tier events (max 1 call per 30 min).
```

## 9. Known Limitations and Flags for Agent Output

Every agent output that cites Pc should include:

```
⚠️ Source: 18 SDS / Space-Track cdm_public (free tier)
⚠️ Secondary covariance: not available in cdm_public — Pc is 18 SDS estimate, cannot independently verify
⚠️ Yellow threshold: 7e-5 (NASA default) — your mission may use a different value
⚠️ Covariance realism: 18 SDS TLE-based covariances are known to be optimistic; Pc may be underestimated for small debris secondaries
⚠️ TraCSS transition: Space-Track CDM API endpoint will migrate to TraCSS.gov (production target 2026)
```

## See Also

- [[synthesis/space-situational-awareness-six-region]] — geopolitical companion: who runs the catalogs behind the CDM chain, by region, + the 100-year Kessler view
- [[synthesis/faa-notam-launch-lifecycle]] — upstream launch-clearance and LCOLA pipeline that feeds the CDM chain
- [[synthesis/fcc-ibfs-filings-coordination]] — spectrum-coordination substrate (parallel regulatory layer to conjunction risk)
- [[concepts/pc-probability-of-collision]] — Pc computation detail and threshold table
- [[concepts/tca-time-of-closest-approach]] — TCA and decision urgency
- [[concepts/covariance-ellipsoid]] — covariance quality and its effect on Pc
- [[concepts/hard-body-radius]] — HBR role in the Pc integral
- [[concepts/screening-volume]] — upstream filter that generates CDMs
- [[sources/ccsds-508-cdm-2013]] — CDM format standard
- [[sources/space-track-cdm-api-2023]] — Space-Track API recipe
- [[sources/nasa-cara-handbook-2023]] — NASA threshold source of truth
- [[sources/tracss-oasis-announcement-2024]] — upcoming interface transition
- [[sources/leolabs-conjunction-alerts-2025]] — commercial upgrade path
- [[entities/18-sds]] — CDM source organisation
- [[entities/leolabs]] — commercial upgrade provider
- [[entities/slingshot-aerospace]] — coordination layer provider
- [[synthesis/spacesharks-mission-desk-hackathon-plan]] — parent plan for the conjunction triage verb
- [[concepts/orbital-data-center]] — orbital context for which conjunction risk matters
- [[concepts/leo-value-chain]] — supply chain context
- [[concepts/nemoclaw]] — sandbox runtime for the CDM ingestor
- [[concepts/openclaw]] — default agent profile running in the sandbox
- [[concepts/hermes-agent-framework]] — persistent memory and skill framework
- [[entities/starcloud]] — example primary satellite for conjunction triage
- [[entities/ada-space]] — large LEO constellation generating CDMs at scale

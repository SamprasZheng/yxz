---
type: concept
tags: [satellite-operations, digital-twin, llm-agent, telemetry, competitive-intel, ground-station]
---

# Satellite Digital Twin (SDT)

A **Satellite Digital Twin** (SDT) is a continuously synchronized virtual replica of a physical spacecraft that mirrors its real-time state through a combination of: (1) live telemetry ingestion, (2) a validated physics / orbital dynamics model, and (3) an operational history log. The twin enables operators to simulate what-if scenarios, predict subsystem failures, and run anomaly root-cause analysis without executing commands on the real satellite.

## Definition Layers

The concept operates at three levels of fidelity that are often conflated in vendor marketing:

| Level | What it mirrors | Data sources | On-board vs ground |
|---|---|---|---|
| **L1 — Telemetry mirror** | Current parameter values (voltages, temperatures, pointing) | Raw housekeeping TM | Ground-only |
| **L2 — Physics twin** | Orbital mechanics + subsystem dynamics (thermal, power, attitude) | TM + propagator + subsystem models | Ground simulation |
| **L3 — Operational twin** | Full lifecycle history: commands issued, anomalies, maneuvers, aging effects | TM + command history + anomaly log | Ground + on-board state sync |

Most published "satellite digital twin" work targets L1–L2. The full L3 operational twin is rare outside flagship missions.

## Academic Background

The digital twin concept for aerospace was proposed by NASA in 2002 for Integrated Vehicle Health Management (IVHM). The space-specific "Satellite Digital Twin" framing gained traction in 2024–2025 publications:

- **[[sources/developing-ai-agents-satellite-ops-2025]]** (Journal of Space Operations, Vol. 21 No. 3, 2025) frames the SDT as a "human feedback loop" layer that reviews LLM agent actions and generates RLHF training signal. This is a functional framing (SDT as oversight mechanism) rather than a physics framing.
- **ConstellAI project** (arXiv 2507.15574, July 2025) discusses AI role in managing satellite constellations, including digital twin adjacencies.
- **"Toward Trusted Onboard AI: Advancing Small Satellite Operations using Reinforcement Learning"** (arXiv 2507.22198, July 2025) treats on-board RL agents as a form of adaptive twin behavior.

## Who Is Building Satellite Digital Twins

### ESA — TRANTOR Demo

⚠️ **Unconfirmed name**: "TRANTOR" SDT demo cited in some sources but not verified in indexed ESA publications as of 2026-05-24. ESA does have active digital twin initiatives under its PhiLab and Φ-sat programme. Treat TRANTOR as unverified until a primary ESA source is found.

### NASA Goddard — Spacecraft Cognitive Architecture

NASA's Goddard Space Flight Center has published on autonomous spacecraft operations and "spacecraft cognitive architecture" — effectively an on-board digital twin that plans its own operations. The SpaceOps-2025 paper (JPL ai.jpl.nasa.gov, FAME system) discusses AI-driven mission automation with memory and state-tracking properties analogous to a digital twin.

### Boeing Phantom Works

⚠️ **Unconfirmed**: Boeing Phantom Works is widely cited as working on satellite digital twins for their 702 and 702SP bus programs, but no public-indexed documentation of a "satellite digital twin" product was found in indexed sources as of 2026-05-24. Boeing's internal Phantom Works work is likely under NDA.

### Slingshot Aerospace — Space Simulator

Slingshot Aerospace holds a **$25.2M US Space Force contract** to build a "digital twin space simulator" — the largest confirmed public digital twin contract in the commercial sector. This is an environment-level twin (model the orbital environment and object behaviors) rather than a per-satellite asset twin. See [[entities/slingshot-aerospace]].

### AIKO — GENE as a Partial Twin

AIKO's [[entities/aiko-space|gifted_GENE]] platform implements the telemetry-mirror level (L1) of the digital twin concept: it ingests live telemetry streams, builds statistical models of normal subsystem behavior, and detects deviations. This is the closest production deployment of a functional satellite digital twin that has been publicly validated. The 4-of-5 anomaly detection result in 3 minutes (Tyvak International) demonstrates L1 digital twin fidelity in production.

**Forward trajectory (verified 2026-07-07):** AIKO pairs `gifted_GENE` (predictive maintenance / anomaly) with **`orbital_OLIVER`**, an *onboard operating system* for autonomous spacecraft operation — the L1-mirror twin evolving toward an on-board L2/L3 planning twin that can act during comms blackout. In 2026 AIKO leads **ASIMOV**, an **Italian Space Agency (ASI)**-funded program applying this autonomy stack to **rendezvous and proximity operations (RPO)** — the highest-consequence closed-loop use of an on-board twin (a wrong prediction risks a collision, not just a missed alert). This is the clearest European datapoint that on-board autonomy is climbing the twin-fidelity ladder from *detect* (GENE) → *operate* (OLIVER) → *maneuver-in-proximity* (ASIMOV). Funding is modest (€6.5M total, Series A €3.5M Oct 2024), underlining that the European edge here is agency-anchored program access, not capital scale — see [[synthesis/llm-satellite-operations-six-region]].

## Where MCP and LLM Fit

The 2025 Journal of Space Operations paper ([[sources/developing-ai-agents-satellite-ops-2025]]) proposes the most developed published architecture for LLM + SDT integration:

1. **MCP as the integration layer**: Model Context Protocol connects LLM agents to ground-system components (telemetry databases, command libraries, FDIR logs). The SDT is the persistent state object the MCP tools read from and write to.
2. **ReAct agent pattern**: The LLM reasons about telemetry anomalies (from the SDT's live mirror) and produces candidate commands or summaries.
3. **SDT as RLHF mechanism**: Human operators review the agent's reasoning traces using the SDT as context, generating correction labels that improve the agent over time.

This architecture is proposed/theoretical in the paper — no production deployment is documented.

## On-Board vs Ground Split

A key architectural question for any satellite digital twin is where the twin lives:

| Placement | Advantages | Disadvantages |
|---|---|---|
| **Ground-only** | No space-qualification constraints, unlimited compute, easy updates | Latency to act (contact windows), no autonomy during comms blackout |
| **On-board** | Enables autonomous action during blackout, sub-second response | Radiation-hardened compute constraints, update cycle slow, AIKO GENE is the rare production example |
| **Hybrid (ground primary + on-board shadow)** | Best of both; on-board state machine acts on basic rules, ground twin handles complex reasoning | Two systems to keep synchronized, most complex to validate |

AIKO is the only known commercial vendor to have deployed on-board AI at scale. Most other vendors (Cognitive Space, Kayhan, LeoLabs) are ground-only.

### On-board vs ground split has a geographic signature

Where the twin/autonomy lives correlates with regional strategy (full map: [[synthesis/llm-satellite-operations-six-region]]):

- **On-board autonomy leads in Europe + Japan** — [[entities/aiko-space|AIKO]] (Italy) is the production exemplar (safety-envelope-bounded on-board deep learning); JAXA on-board FDIR and Astroscale RPO autonomy sit here. The **agency-anchored on-board autonomy** archetype.
- **Ground-side reasoning leads in the US** — the defense SDA copilots ([[entities/msbai|MSBAI]], Cognitive Space, Slingshot) are ground-only, trading autonomy for unlimited compute + classified data access. The **defense-funded vertical SDA copilot** archetype.
- **China** pursues *both* simultaneously — in-orbit edge AI (Three-Body / Star-Compute) plus ground LLM-agent autonomy (Air Target Agent System) on a domestic Ascend stack. The **sovereign full-stack autonomy** archetype.
- **Taiwan**'s [[synthesis/spacesharks-mission-desk-hackathon-plan|Spacesharks]] is a *ground-desk-only L3 sparse twin* built from public signals (no telemetry access, no on-board compute) — the structurally-accessible option for a non-operator.

## Relevance to Spacesharks Mission Desk

[[synthesis/spacesharks-mission-desk-hackathon-plan]] implicitly implements a **lifecycle-level (L3) digital twin** for each tracked satellite in its event schema: every row captures satellite identifier + mission phase + signal tier + agent action + confidence + source citation. This is a sparse operational history twin, not a physics twin. The Spacesharks thesis is that the **labeled event dataset** accumulated over time becomes the SDT equivalent for operators who lack internal telemetry access — an externally-sourced behavioral twin derived from public signals.

## See Also

- [[concepts/llm-satellite-operations-landscape]] — competitive map of who is building what
- [[sources/developing-ai-agents-satellite-ops-2025]] — closest academic treatment of LLM + SDT
- [[concepts/domain-specific-llm-agents]] — methodology framing
- [[entities/aiko-space]] — production L1 SDT in GENE
- [[entities/slingshot-aerospace]] — environment-level digital twin (Space Force contract)
- [[concepts/spacesharks-mission-desk-event-schema]] — Spacesharks' L3 dataset schema
- [[synthesis/llm-satellite-operations-six-region]] — six-region ops-AI map; on-board vs ground split by region

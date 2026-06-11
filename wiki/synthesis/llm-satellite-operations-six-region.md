---
type: synthesis
tags: [six-region, llm-agent, satellite-operations, satops, netops, sda, space-domain-awareness, competitive-intel, mission-desk, spacesharks, taiwan, us, china, japan, korea, europe, market-map]
sources:
  - "[[sources/msbai-orbitguard-dod-contract-2025]]"
  - "[[sources/scnoc-agentic-sun-2025]]"
  - "[[sources/developing-ai-agents-satellite-ops-2025]]"
  - "[[sources/llm-expert-agent-mission-ops-2025]]"
concepts:
  - "[[concepts/llm-satellite-operations-landscape]]"
  - "[[concepts/jepa-sda-multi-agent-rl]]"
  - "[[concepts/satellite-netops-agents]]"
  - "[[concepts/satellite-digital-twin]]"
  - "[[concepts/mcp-aerospace-applications]]"
---

# AI-Agents / LLM for Satellite Operations — Six-Region Map (台美日韓中國歐洲)

This is the six-region (Taiwan / US / Japan / Korea / China / Europe) map of the **applied AI-agent / LLM-for-satellite-operations software layer** — the copilots, autonomy stacks, anomaly-detection engines, and NetOps/SDA agents that *operate* satellites, as distinct from the underlying base models or the tracking hardware. It answers: **who builds the agentic software that flies, defends, and triages satellites, by region, and why the data-access asymmetry (not the model) is the moat.**

Position in the corpus:

- It is the **applied-software sibling** of [[synthesis/open-weight-llm-agent-stack-six-region]] (which maps the *base models* an agent stack runs on) — this page maps what those models are *deployed to do* in space ops.
- It is the **AI-software companion** to [[synthesis/space-situational-awareness-six-region]] (which maps the *sensor/catalog hardware*) — the SSA page maps who *tracks* objects; this page maps who builds the *agentic reasoning* over those tracks.
- It is the global landscape behind [[synthesis/spacesharks-mission-desk-hackathon-plan]] (the owner's Taiwan entry) — see also the US-centric competitive map [[concepts/llm-satellite-operations-landscape]].

Last researched / verified: 2026-06-10.

---

## 1. The six-region table

| Region | Lead actors (ops-AI software) | What they build | Compute / model base | Strategy archetype | Frontier gap |
|---|---|---|---|---|---|
| **🇺🇸 US** | [[entities/msbai]] (OrbitGuard), [[entities/lockheed-martin-space]] (iSpace), [[entities/cognitive-space]], [[entities/slingshot-aerospace]], [[entities/kayhan-space]], [[entities/privateer-space]]; JPL FAME, NASA Goddard, CU Boulder | Defense SDA copilots (JEPA+MARL maneuver-intent), collection scheduling, autonomous collision avoidance, fleet/digital-twin sim | NVIDIA GPU + [[concepts/nemotron|Nemotron]]/closed frontier; classified UDL data | **Defense-funded vertical SDA copilot** | LLM *reasoning* layer still thin — most "AI" is classical ML/RL/optimizer |
| **🇨🇳 China** | "Air Target Agent System" (2026-05), [[sources/scnoc-agentic-sun-2025|SCNOC-Agentic]], Three-Body / Star-Compute in-orbit AI | LLM "brain + tool army" for autonomous targeting/surveillance; NetOps agent (intent + graph-RAG); in-orbit edge AI | Huawei Ascend + Chinese open-weight (Qwen/DeepSeek) — outside US export control | **Sovereign full-stack autonomy** | Data-closed; capability claims unverifiable externally |
| **🇪🇺 Europe** | [[entities/aiko-space]] (GENE/OLIVER/DANA, Italy), ESA PhiLab / Φ-sat, Vyoma (DE) | On-board + ground anomaly detection, autonomous replanning, RPO; only production on-board deep-learning at scale | ESA/agency compute; deep-learning/RL (no LLM layer) | **Agency-anchored on-board autonomy** | No LLM-reasoning layer; institutional market only |
| **🇯🇵 Japan** | Synspective (SAR + MoD constellation), JAXA on-board FDIR, Astroscale (RPO autonomy) | SAR-data autonomy for sovereign reconnaissance; on-orbit servicing/rendezvous autonomy | Domestic + commercial GPU | **Sovereign-reconnaissance autonomy** | Ops-AI is SAR/imagery-centric, not a lifecycle copilot |
| **🇰🇷 Korea** | Hanwha Systems (SAR + near-real-time AI intel), TelePIX (TetraPLEX edge AI), KARI | AI-on-imagery + edge on-board analytics; near-real-time anomaly/intel from SAR | Domestic + edge accelerators | **AI-on-imagery + edge analytics** | Ops-copilot / decision layer nascent |
| **🇹🇼 Taiwan** | TASA (institutional); **Spacesharks Mission Desk** (individual builder, owner) | No institutional ops-AI product; Spacesharks = external-signal-fusion lifecycle copilot, non-operator-accessible | Public signals + [[concepts/nemoclaw|NemoClaw]]/[[concepts/hermes-agent-framework|Hermes]] stack | **Upstream-supply + individual-builder** | No sovereign ops-AI vendor; component/compute supply only |

(Region flags are labels, not endorsements; "lead actors" = best-documented public actors, not exhaustive.)

---

## 2. Three strategy archetypes

The twelve+ actors above resolve into **three structural bets** on who controls the ops-AI layer — the same trichotomy that recurs across the corpus's space domains ([[synthesis/space-situational-awareness-six-region]], [[synthesis/radiation-test-rad-hard-six-region]]):

1. **Defense-funded vertical SDA copilot (US).** The moat is *classified labeled data + sensor access + security clearance*, not the model. [[entities/msbai|MSBAI OrbitGuard]] fuses IR/CelesTrak/EO with JEPA world models + RL planning agents, reports 94–98% anomaly accuracy across ~15,000 objects, and is scaling to >20,000 RSOs at two-minute latency under its $1.2M DoD CDAO SBIR (kickoff Sept 2025). The barrier to a hackathon entrant is structural — see the moat analysis in [[concepts/jepa-sda-multi-agent-rl]].

2. **Agency-anchored on-board autonomy (Europe + Japan).** ESA/CNES/JAXA fund *safety-framed* on-board AI bounded by mission rules. [[entities/aiko-space|AIKO]] (Italy) is the flagship — the first European company to run deep learning in orbit, with GENE in production at Tyvak International (4-of-5 anomalies in 3 min, ≤4-day-ahead prediction, >30% operator-workload reduction). Japan's Synspective + JAXA FDIR sit here too, but tuned to sovereign SAR reconnaissance rather than generic ops. The bet: autonomy with the agency as anchor customer and the safety envelope as the product.

3. **Sovereign full-stack autonomy (China).** A *domestic compute + domestic open-weight model* stack deliberately outside US export controls. The May 2026 "Air Target Agent System" chains multiple LLMs on Huawei Ascend hardware as a "brain plus tool army" — an LLM coordinator directing specialized tools that breaks down tasks, selects algorithms, and recovers from failures *without human handoff* (it self-diagnosed a GPU-contention failure mid-test and switched models). [[sources/scnoc-agentic-sun-2025|SCNOC-Agentic]] is the civil NetOps analog (Qwen2.5-70B, task-planning accuracy 15.6%→32.2%). The bet: own every layer (Ascend silicon → Chinese base model → agent), accept data-closure as the price.

Korea (AI-on-imagery + edge analytics) and Taiwan (upstream-supply + individual-builder) are **niche contributors** to the three primary bets rather than holders of a fourth model — Korea feeds the imagery-analytics layer, Taiwan the component/compute supply, with the owner's Spacesharks as the lone Taiwan-side ops-AI software effort.

---

## 3. The binding invariant — data-access asymmetry, not model access

Every region can now obtain a capable base model (Nemotron, Qwen, DeepSeek, Llama — see [[synthesis/open-weight-llm-agent-stack-six-region]]). What they cannot equally obtain is **labeled operator-decision and maneuver-intent ground truth**:

- Real maneuver events with verified intent labels live behind DoD classified catalogs, operator notifications, or `cdm` (operator-only) Space-Track access — see the two-tier structure in [[concepts/cdm-conjunction-data-message]].
- MSBAI's best public dataset is ~800 real labeled events + ~200K GMAT-simulated — *thin even for the leader*, illustrating how scarce the ground truth is.
- The covariance realism that makes any of this work ([[concepts/covariance-ellipsoid]]) requires a dense calibrated sensor network ([[entities/leolabs|LeoLabs]], Space Fence) that is itself a sovereignty asset ([[synthesis/space-situational-awareness-six-region]]).

So the ops-AI moat is **downstream of catalog authority**: whoever holds the catalog + sensor net + labeled-event history holds the high-value SDA layer. This is why the US leads despite a thin LLM-reasoning layer (it owns the data), why China builds a full sovereign stack (it cannot get US data and refuses to depend on US compute), and why the **structurally accessible opening** is the *public-signal, non-operator* layer — exactly the [[synthesis/spacesharks-mission-desk-hackathon-plan|Spacesharks]] design choice: fuse SWPC + NOTAM + CDM-public + FCC events into a lifecycle copilot that needs no operator telemetry, and let the *labeled lifecycle-event dataset* ([[concepts/spacesharks-mission-desk-event-schema]]) become the moat that public signals can actually support.

---

## 4. 100-year structural view (labeled scenario — projection, not fact)

The slow invariant is the **data-access asymmetry** above, layered on the physical invariants of the adjacent domains (Kessler debris growth → [[synthesis/space-situational-awareness-six-region]]; σT⁴ heat ceiling → [[synthesis/orbital-data-center-six-region]]). Two forks:

| Horizon | Optimistic — *democratized copilot layer* | Pessimistic — *enclosed ops-AI* |
|---|---|---|
| **~2030s** | Open MCP aerospace tool layer ([[concepts/mcp-aerospace-applications]]) + public-signal datasets let non-operator desks (Spacesharks-style) proliferate; commodity copilots for small operators | Defense/operator data moats keep the high-value SDA layer locked to primes + sovereign militaries; autonomy-without-human-handoff (China model) spreads |
| **~2050s** | Shared labeled-event commons (à la space-weather pooling, [[synthesis/space-weather-forecasting-six-region]]) emerges for collision-avoidance as a safety necessity | Three walled stacks (US-classified / China-sovereign / Europe-agency) harden; cross-stack interoperability fails |
| **~2100** | Catalog + maneuver-intent data treated as a global commons; ops-AI a regulated utility | Ops-AI mirrors the orbital-slot enclosure ([[synthesis/space-regulatory-regimes-six-region]]) — the actor holding the data holds the autonomy |

The open governance question — unique to *this* domain — is **autonomy escalation**: the China Air Target Agent System already acts "without human handoff." Whether the human-in-the-loop norm survives is an *institutional* choice, not a physical limit — the same structure as the SSA catalog-authority and ITU orbital-enclosure questions, but with the added stakes of autonomous action in a militarized domain.

---

## 5. Falsifier table

What would overturn the claims on this page:

| Claim | Falsified if… | Status (2026-06-10) |
|---|---|---|
| US leads but its LLM-*reasoning* layer is thin | A US vendor ships a production LLM-reasoning sat-ops copilot (not classical ML) | Holding — all confirmed US "AI" is ML/RL/optimizer ([[concepts/llm-satellite-operations-landscape]]) |
| China has the most aggressive *autonomous-action* ops-AI | The Air Target Agent System is shown to be a demo/overclaim | Holding — reported by SCMP/IE (secondary press), not independently verified |
| Europe = on-board autonomy, no LLM layer | AIKO or an EU lab ships an LLM-reasoning ops agent | Holding — AIKO is deep-learning/RL, no LLM |
| The moat is data access, not model access | A team with only public data + open model matches MSBAI on maneuver-intent | Holding — MSBAI's own dataset is thin but UDL-backed |
| Taiwan has no sovereign ops-AI vendor | A TASA/Taiwan firm ships an ops-AI product | Holding — Spacesharks (individual) is the only Taiwan ops-AI effort |

---

## 6. See also

- [[concepts/llm-satellite-operations-landscape]] — US-centric competitive map (academic / commercial / hyperscaler / structural-gap)
- [[concepts/jepa-sda-multi-agent-rl]] — the SDA-AI moat analysis (MSBAI / Lockheed / DARPA Hallmark)
- [[concepts/satellite-netops-agents]] — NetOps vs SatOps; SCNOC-Agentic
- [[concepts/satellite-digital-twin]] — SDT levels; where on-board AI lives by region
- [[concepts/mcp-aerospace-applications]] — the tool layer that could democratize the copilot
- [[synthesis/spacesharks-mission-desk-hackathon-plan]] — the Taiwan-side entry this map situates
- [[synthesis/open-weight-llm-agent-stack-six-region]] — base-model sibling (what these agents run on)
- [[synthesis/space-situational-awareness-six-region]] — sensor/catalog-hardware companion
- [[synthesis/cdm-pc-decisioning]] — the technical workflow these copilots automate
- [[synthesis/leo-taiwan-odc-gap]] — the upstream-strong/midstream-absent pattern Taiwan repeats here

---
type: synthesis
tags: [six-region, llm-agent, satellite-operations, satops, netops, sda, space-domain-awareness, competitive-intel, mission-desk, spacesharks, taiwan, us, china, japan, korea, europe, market-map]
sources:
  - "[[sources/msbai-orbitguard-dod-contract-2025]]"
  - "[[sources/scnoc-agentic-sun-2025]]"
  - "[[sources/developing-ai-agents-satellite-ops-2025]]"
  - "[[sources/llm-expert-agent-mission-ops-2025]]"
  - "[[sources/astrea-orbital-thermal-autonomy-2025]]"
  - "[[sources/navi-orbital-vlm-earth-obs-2026]]"
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

Last researched / verified: 2026-06-10; fact-refreshed 2026-08-11 (Slingshot MENTAT/Talos); **deepened 2026-09-01** — the **proposal-vs-flown split closed**: two agentic LLM/VLM systems *flew* in orbit — [[sources/astrea-orbital-thermal-autonomy-2025|ASTREA]] (Thales Alenia Space / Europe, first agentic **LLM** on flight-heritage hardware TRL 9, live **thermal control** aboard the **ISS**, Qwen2.5-1.5B) and [[sources/navi-orbital-vlm-earth-obs-2026|NAVI-Orbital]] (**NASA JPL** / US, first in-orbit **VLM** — Gemma 3 + LangGraph on a Loft Orbital YAM-9, EO tasking + dialogue, 2026-04-16). These add a **flown-vs-proposed axis** to the map and nuance two load-bearing rows (Europe "no LLM layer"; US "thin live-ops reasoning"). Also: [[entities/slingshot-aerospace|Slingshot]] **TALOS acronym decoded** — "**T**hinking **A**gent for **L**ogical **O**perations and **S**trategy" (still training/rehearsal-scoped); China Three-Body Constellation running **8-B-parameter models in orbit** (99.99% laser-link uptime over 8 days) + Shanghai space-computing hub (2026-09-01).

---

## 1. The six-region table

| Region | Lead actors (ops-AI software) | What they build | Compute / model base | Strategy archetype | Frontier gap |
|---|---|---|---|---|---|
| **🇺🇸 US** | [[entities/msbai]] (OrbitGuard), [[entities/lockheed-martin-space]] (iSpace), [[entities/cognitive-space]], [[entities/slingshot-aerospace]] (Beacon + **MENTAT/Talos**), [[entities/kayhan-space]], [[entities/privateer-space]]; **[[sources/navi-orbital-vlm-earth-obs-2026|NASA JPL NAVI-Orbital]]**, NASA Goddard, CU Boulder | Defense SDA copilots (JEPA+MARL maneuver-intent), collection scheduling, autonomous collision avoidance, fleet/digital-twin sim, **AI mission-rehearsal/strategy agents (Slingshot Talos)**, **first in-orbit VLM tasking agent (NAVI-Orbital, Gemma 3 + LangGraph, 2026-04)** | NVIDIA GPU + [[concepts/nemotron|Nemotron]]/closed frontier + **open-weight (Gemma 3) on Jetson Orin**; classified UDL data | **Defense-funded vertical SDA copilot** (+ civil-JPL open-weight flown edge) | LLM *reasoning* layer for *live flight-ops copilots* still thin — fielded defense "AI" is classical ML/RL/optimizer; Slingshot Talos is training/rehearsal-scoped; the one flown US agent (NAVI-Orbital) is EO-*tasking*, not a bus-flying copilot |
| **🇨🇳 China** | "Air Target Agent System" (2026-05), [[sources/scnoc-agentic-sun-2025|SCNOC-Agentic]], Three-Body / Star-Compute in-orbit AI (**8-B-param models in orbit, 99.99% laser-link uptime/8 d; Shanghai space-computing hub 2026-09**) | LLM "brain + tool army" for autonomous targeting/surveillance; NetOps agent (intent + graph-RAG); in-orbit edge AI at constellation scale | Huawei Ascend + Chinese open-weight (Qwen/DeepSeek) — outside US export control | **Sovereign full-stack autonomy** | Data-closed; capability claims unverifiable externally |
| **🇪🇺 Europe** | [[entities/aiko-space]] (GENE/OLIVER/DANA, Italy), **Thales Alenia Space ([[sources/astrea-orbital-thermal-autonomy-2025|ASTREA]])**, ESA PhiLab / Φ-sat, Vyoma (DE) | On-board + ground anomaly detection, autonomous replanning, RPO; **first flown agentic-LLM control-supervisor (ASTREA, live thermal control aboard ISS, TRL 9, Qwen2.5-1.5B + RL, 2025-09)** | ESA/agency compute; deep-learning/RL + **now a flown edge-LLM supervisor** | **Agency-anchored on-board autonomy** (now with an LLM-supervision layer) | Not "no LLM layer" any longer — ASTREA flew one; but still institutional/single-subsystem, not a lifecycle copilot; the LLM *supervises* an RL loop rather than flying the bus |
| **🇯🇵 Japan** | Synspective (SAR + MoD constellation), JAXA on-board FDIR, Astroscale (RPO autonomy) | SAR-data autonomy for sovereign reconnaissance; on-orbit servicing/rendezvous autonomy | Domestic + commercial GPU | **Sovereign-reconnaissance autonomy** | Ops-AI is SAR/imagery-centric, not a lifecycle copilot |
| **🇰🇷 Korea** | Hanwha Systems (SAR + near-real-time AI intel), TelePIX (TetraPLEX edge AI), KARI | AI-on-imagery + edge on-board analytics; near-real-time anomaly/intel from SAR | Domestic + edge accelerators | **AI-on-imagery + edge analytics** | Ops-copilot / decision layer nascent |
| **🇹🇼 Taiwan** | TASA (institutional); **Spacesharks Mission Desk** (individual builder, owner) | No institutional ops-AI product; Spacesharks = external-signal-fusion lifecycle copilot, non-operator-accessible | Public signals + [[concepts/nemoclaw|NemoClaw]]/[[concepts/hermes-agent-framework|Hermes]] stack | **Upstream-supply + individual-builder** | No sovereign ops-AI vendor; component/compute supply only |

(Region flags are labels, not endorsements; "lead actors" = best-documented public actors, not exhaustive.)

---

## 2. Three strategy archetypes

The twelve+ actors above resolve into **three structural bets** on who controls the ops-AI layer — the same trichotomy that recurs across the corpus's space domains ([[synthesis/space-situational-awareness-six-region]], [[synthesis/radiation-test-rad-hard-six-region]]):

1. **Defense-funded vertical SDA copilot (US).** The moat is *classified labeled data + sensor access + security clearance*, not the model. [[entities/msbai|MSBAI OrbitGuard]] fuses IR/CelesTrak/EO with JEPA world models + RL planning agents, reports 94–98% anomaly accuracy across ~15,000 objects, and is scaling to >20,000 RSOs at two-minute latency under its $1.2M DoD CDAO SBIR (kickoff Sept 2025) — an ops backdrop where active spacecraft are projected to pass **17,000 by 2026**. The barrier to a hackathon entrant is structural — see the moat analysis in [[concepts/jepa-sda-multi-agent-rl]]. The **2026 escalation sits at the *training/rehearsal* edge of this archetype:** [[entities/slingshot-aerospace|Slingshot]] won a **$69.2M USSF SBIR-Phase-III OTTI award (2026-07-15, its largest ever)** for **MENTAT** — an AI mission-rehearsal platform whose core agent **Talos** is billed as an "AI-powered operational training and strategy agent" on a *Sense → Fuse → Decide → Act* loop (following a $27M AI-training-environment award 2026-01-15) — and rebranded itself the leader in **"Space Operations Intelligence & Autonomy (SOIA)."** Scope caveat: Talos *wargames and rehearses* decisions rather than flying a live bus, and Slingshot does not publicly confirm an LLM core — so it *widens* the US deployment lead without yet closing the thin-*live*-reasoning-layer gap (see the falsifier table §5).

2. **Agency-anchored on-board autonomy (Europe + Japan).** ESA/CNES/JAXA fund *safety-framed* on-board AI bounded by mission rules. [[entities/aiko-space|AIKO]] (Italy) is the flagship — the first European company to run deep learning in orbit, with GENE in production at Tyvak International (4-of-5 anomalies in 3 min, ≤4-day-ahead prediction, >30% operator-workload reduction). Japan's Synspective + JAXA FDIR sit here too, but tuned to sovereign SAR reconnaissance rather than generic ops. The bet: autonomy with the agency as anchor customer and the safety envelope as the product. **2025-09 update — Europe's archetype now includes a flown LLM layer:** Thales Alenia Space's [[sources/astrea-orbital-thermal-autonomy-2025|ASTREA]] put a resource-constrained LLM agent (Qwen2.5-1.5B, 4-bit) *supervising* an RL thermal-control loop on flight-heritage hardware **aboard the ISS** (TRL 9) — the first agentic LLM to control a live spacecraft subsystem in orbit. It fits the archetype exactly (agency-adjacent prime, single safety-framed subsystem, LLM as *supervisor* not bus-pilot), but it retires the flat "Europe has no LLM layer" claim the earlier map carried.

### 2b. The flown-vs-proposed inflection (2025-09 → 2026-04)

Until mid-2025 the entire academic frontier ([[concepts/llm-satellite-operations-landscape]]) was *proposals* — architecture papers with no deployment. Two milestones changed that and now anchor the map's credibility:

| System | Region / builder | What flew | Model | Scope | Milestone |
|---|---|---|---|---|---|
| [[sources/astrea-orbital-thermal-autonomy-2025|ASTREA]] (2025-09) | 🇪🇺 Europe — Thales Alenia Space | Agentic **LLM** supervising an RL loop, live **thermal control** aboard the **ISS** (TRL 9) | Qwen2.5-1.5B (4-bit) | Single-subsystem *control supervision* | First flown agentic-LLM for live subsystem control |
| [[sources/navi-orbital-vlm-earth-obs-2026|NAVI-Orbital]] (2026-04) | 🇺🇸 US — NASA JPL + Loft Orbital | **VLM** doing zero-shot scene classification + operator dialogue onboard **YAM-9** (Jetson Orin AGX) | Gemma 3 (open-weight, zero-shot) | **EO tasking + dialogue** | First in-orbit VLM; 88% zero-shot on a 7,960-image benchmark |

Two reads follow. **(a)** The gap is now *scope*, not *existence*: LLM/VLM agents demonstrably run in orbit, but on *one subsystem* (thermal) or *one perception task* (imagery) — neither is the cross-phase lifecycle copilot the [[synthesis/spacesharks-mission-desk-hackathon-plan|Spacesharks]] thesis targets, so the "no fielded lifecycle copilot" opening stands. **(b)** The binding limit surfaced by ASTREA is **inference cadence vs orbital dynamics** — its first ISS run *lost* to baseline until the agent's decision rate was synced to the ~90-minute orbit; capability was never the wall, latency was. Both milestones used **small open-weight models on commodity edge GPUs** (Qwen2.5-1.5B; Gemma 3 on Jetson Orin), which is the democratization signal in §4's optimistic fork, not the classified-moat one.

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

| Claim | Falsified if… | Status (2026-09-01) |
|---|---|---|
| US leads but its LLM-*reasoning* layer for *live flight-ops copilots* is thin | A US vendor/agency ships a production LLM-reasoning *flight-ops lifecycle* copilot (not classical ML, not a training sim, not single-task perception) | Holding but **narrowed** — [[sources/navi-orbital-vlm-earth-obs-2026|NAVI-Orbital]] (NASA JPL) *did* fly a real in-orbit VLM agent (2026-04), but it is **EO-tasking + dialogue**, not a bus-flying lifecycle copilot; Slingshot Talos remains training/rehearsal-scoped. The *live-lifecycle-copilot* gap holds; the flat "no US LLM agent has flown" is now false |
| China has the most aggressive *autonomous-action* ops-AI | The Air Target Agent System is shown to be a demo/overclaim | Holding — re-confirmed across SCMP / Interesting Engineering / The Star (2026-05-28 unveil, port-monitoring test), still secondary-press-only; independently, China's in-orbit *compute* is verifiable (Three-Body 8-B-param models, 99.99% laser-link/8 d) but the *autonomous-targeting* claim is not |
| Europe = on-board autonomy, **no LLM layer** | AIKO or an EU lab/prime ships an LLM-reasoning ops agent | **Partially falsified (2025-09)** — Thales Alenia Space's [[sources/astrea-orbital-thermal-autonomy-2025|ASTREA]] flew an agentic **LLM** (Qwen2.5-1.5B) supervising a live thermal-control loop aboard the ISS (TRL 9). AIKO itself is still deep-learning/RL, but Europe as a region now has a flown LLM ops layer — the claim is retired to "LLM *supervises a subsystem*, not a full copilot" |
| The moat is data access, not model access | A team with only public data + open model matches MSBAI on maneuver-intent | Holding — but note both 2025–26 flown milestones used **open-weight models** (Qwen2.5-1.5B, Gemma 3 zero-shot), reinforcing that *model access* is commoditized; the SDA-*maneuver-intent* moat (labeled classified data) is untouched by either |
| Taiwan has no sovereign ops-AI vendor | A TASA/Taiwan firm ships an ops-AI product | Holding — Spacesharks (individual) is the only Taiwan ops-AI effort; [[entities/liscotech|LiscoTech]] flew Orin-class *compute* (the substrate NAVI-Orbital rides) but not an ops-AI *agent* |

---

## Sources (2026-09 deepen — the two flown milestones)

- **ASTREA — first flown agentic-LLM for live subsystem control** (Thales Alenia Space; Qwen2.5-1.5B + RL supervising thermal control aboard the ISS, TRL 9; arXiv 2509.13380, v1 2025-09-16): [arXiv](https://arxiv.org/abs/2509.13380) — see [[sources/astrea-orbital-thermal-autonomy-2025]]
- **NAVI-Orbital — first in-orbit VLM agent** (NASA JPL + Loft Orbital YAM-9; Gemma 3 zero-shot + LangGraph on Jetson Orin AGX; live 2026-04-16, 88%/7,960-img; arXiv 2606.18271): [IEEE Spectrum](https://spectrum.ieee.org/nasa-ai-satellite-image-analysis), [TechCrunch](https://techcrunch.com/2026/06/15/a-satellite-just-learned-to-find-things-on-its-own-heres-what-that-means/) — see [[sources/navi-orbital-vlm-earth-obs-2026]]

## Sources (2026-08 refresh)

- **Slingshot MENTAT/Talos — $69.2M USSF OTTI SBIR-III** (2026-07-15, 4.5-yr, "AI-powered mission readiness"; core agent Talos on Sense→Fuse→Decide→Act; "Space Operations Intelligence & Autonomy"): [Business Wire](https://www.businesswire.com/news/home/20260715761196/en/Slingshot-Aerospace-Wins-$69.2-Million-U.S.-Space-Force-Contract-to-Advance-AI-Powered-Mission-Readiness-for-Space-Defense), [Via Satellite](https://www.satellitetoday.com/government-military/2026/07/15/slingshot-aerospace-wins-space-force-contract-to-expand-ai-mission-rehearsal/); prior **$27M AI-training-environment** award (2026-01-15): [Business Wire](https://www.businesswire.com/news/home/20260115783294/en/)
- **MSBAI OrbitGuard** — >17,000 active spacecraft by 2026 ops anchor; Graph-JEPA + Patch-Time-Series-Transformer upgrade path; no new award beyond the Sept-2025 $1.2M SBIR as of 2026-08: [PR Newswire](https://www.prnewswire.com/news-releases/msbai-secures-1-2m-dod-contract-to-advance-hybrid-intelligence-orbitguard-empowering-real-time-space-domain-awareness-302543915.html), [SpaceDaily](https://www.spacedaily.com/reports/MSBAI_wins_DoD_contract_to_accelerate_OrbitGuard_hybrid_intelligence_platform_for_space_situational_awareness_999.html)
- **China "Air Target Agent System"** (2026-05-28 unveil, Huawei Ascend, autonomous-action-without-human-handoff, port-monitoring test): [SCMP](https://www.scmp.com/news/china/science/article/3355215/china-unveils-ai-system-automate-satellite-targeting-and-surveillance), [Interesting Engineering](https://interestingengineering.com/space/china-llm-powered-automates-satellite-surveillance)

## 6. See also

- [[sources/astrea-orbital-thermal-autonomy-2025]] — first flown agentic-LLM (Europe/Thales Alenia Space, ISS thermal control)
- [[sources/navi-orbital-vlm-earth-obs-2026]] — first in-orbit VLM agent (US/NASA JPL, Gemma 3 + LangGraph)
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

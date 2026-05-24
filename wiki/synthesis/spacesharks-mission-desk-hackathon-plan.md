---
type: synthesis
tags: [hackathon, nvidia-agent-challenge-2026, sampras, agent, nemotron, nemoclaw, hermes, satellite-lifecycle, space, planning, spacesharks]
---

# Spacesharks Mission Desk — NVIDIA Agent Challenge 2026 Plan

Canonical planning page for [[entities/sampras|Sampras]]'s entry to the **[[sources/nvidia-agent-challenge-2026|NVIDIA Agent Challenge 2026]]** (GTC Taipei, owner-reported deadline 2026-05-28 12:00 PM). Replaces the earlier "port Jamia/Spacesharks GPT onto Nemotron" framing with a behavior-first, lifecycle-data-moat thesis. Cross-links the hackathon stack ([[concepts/nemotron]] / [[concepts/hermes-agent-framework]] / [[concepts/nemoclaw]]) into Sampras's existing satellite / radiation / LEO knowledge base.

## 1. Thesis

**Spacesharks Mission Desk is the satellite-lifecycle decision co-pilot.**

Not a dashboard. Not an investment commentator. The agent operates as **an always-on operations desk** that ingests environmental + telemetry-adjacent signals in real time, reasons about implications **per individual satellite** (orbit, age, subsystem config, mission profile), and produces **executable decisions** (safe-mode triggers, momentum dump windows, manoeuvre options, launch slip pre-alerts) — while quietly accumulating a **structured, source-linked satellite-lifecycle event dataset** that is itself the long-term commercial moat.

Headline pitch:

> *An autonomous AI desk that doesn't just watch the space industry — it predicts every phase of the satellite lifecycle, recommends operator actions, archives every event into a labeled dataset future operators will pay for, and posts its own track record. Powered by [[concepts/nemotron|Nemotron]], sandboxed by [[concepts/nemoclaw|NemoClaw]], persistent via [[concepts/hermes-agent-framework|Hermes]].*

Investment-prediction angle is deliberately de-emphasised: market price moves do not track satellite operational truth tightly enough to be a worthwhile demo signal. Reverting that decision later (post-hackathon, when the dataset has thicker history) is fine; for the four-day build, focus is **operator decisions**, not equities.

## 2. Why this thesis is defensible

1. **Lifecycle data is genuinely scattered.** Source-of-truth signals live across NOAA SWPC, Celestrak, Space-Track, FAA NOTAM, FCC ELS/IBFS, ITU, arXiv, vendor datasheets, and operator press releases. No public product knits them per-satellite, per-phase. The first agent to do so accumulates a moat measured in months of ingest, not days of code.
2. **Sampras's existing wiki is already half the moat.** [[concepts/orbit-dose-budgeting]], [[concepts/solar-cycle-25-leo-radiation]], [[concepts/tid-total-ionizing-dose]], [[concepts/see-single-event-effects]], [[concepts/rha-radiation-hardening]], [[concepts/cots-gpu-radiation-risk]], [[concepts/leo-value-chain]], [[concepts/orbital-data-center]] all pre-existed before the hackathon. The agent gets to retrieve from them on day one.
3. **Operator decisions are concrete demo material.** "Safe-mode trigger recommended for sat X within Y minutes given GOES X-flare class Z" is a screenshot-able artefact. Investment takes are not.
4. **Lifecycle dataset is sellable.** Future small-constellation operators and brokers will pay for curated "what does my orbit + bus + payload actually face?" data. The agent doubles as the data product's continuous ingest engine.

## 3. Lifecycle taxonomy — five phases × actions × dataset

The agent owns five sequential phases of every satellite. Each phase has (a) a defined set of environmental / event signals, (b) at least one decision action the agent produces, and (c) a defined dataset shape the agent appends to over time.

### Phase 1 — Pre-launch
- **Threats / signals:** fairing acoustic profile, integration thermal soak, cleanroom contamination risk, FAA NOTAM, weather, FCC / ITU regulatory clock, insurance milestones.
- **Decision action(s):** slip-probability score per launch (vehicle × pad × weather × historical slip rate), readiness checklist gap flag (e.g., "FCC Part 25 STA not yet filed for D+0 commissioning"), pre-launch survivability brief.
- **Dataset row:** `{launch_id, vehicle, pad, scheduled_t, predicted_slip_prob, actual_t, slip_reason}` with source URLs.

### Phase 2 — Launch & ascent
- **Threats / signals:** max-Q vibration, MECO / stage-sep shock, fairing jettison shock, deployment angle, plume contamination, ascent thermal.
- **Decision action(s):** compare observed telemetry (or operator press release) to that vehicle's historical envelope; flag anomalies; tag affected payload IDs.
- **Dataset row:** `{vehicle, flight_id, event, measured_envelope, historical_envelope, anomaly_score, affected_payload_ids}`.

### Phase 3 — Commissioning (D+0 to D+30)
- **Threats / signals:** first-contact latency, attitude acquisition timing, solar array deploy, RW spin-up, bake-out / outgassing, *the highest anomaly-rate window of the entire mission*.
- **Decision action(s):** day-N anomaly-rate baseline by sat class; alert when a specific bird trails the cohort; suggest hold-points before bumping to nominal ops.
- **Dataset row:** `{sat_id, class, day_n, baseline_anomalies, observed_anomalies, deviation_z, recommended_hold}`.

### Phase 4 — On-orbit operations (multi-year, highest-value phase)
- **Threats / signals:** [[concepts/tid-total-ionizing-dose|TID]] accumulation, [[concepts/see-single-event-effects|SEU/SEL/SEFI/SEB/SEGR]], South Atlantic Anomaly transits, [[concepts/solar-cycle-25-leo-radiation|CME / SEP / X-flare events]], thermal cycles, eclipse-duration variance, drag changes, RW saturation, battery degradation, conjunction CDMs, spectrum interference.
- **Decision action(s) — pick the four highest-value MVPs:**
  1. **Safe-mode trigger recommendation** — fuse Kp + GOES X-ray + SEP flux + SAA position; output `{sat_id, recommended_safe_mode_t, confidence, signal_sources}`. Most demo-able.
  2. **Momentum dump window** — find best moment given upcoming SAA + thermal + solar event.
  3. **Conjunction triage** — ingest CDMs from Space-Track, score Pc, draft manoeuvre options for the operator.
  4. **Interference attribution** — match observed downlink degradation to FCC IBFS / ITU spectrum filings.
- **Dataset row:** `{sat_id, t, event_type, environmental_inputs, decision, confidence, operator_action_taken, outcome}` — this row schema is the moat.

### Phase 5 — EOL & deorbit
- **Threats / signals:** atmospheric density (driven by solar cycle phase), decay rate, ITU frequency-surrender deadlines, debris footprint, casualty risk.
- **Decision action(s):** deorbit-window prediction, passivation-sequence draft, ITU notice timing.
- **Dataset row:** `{sat_id, predicted_decay_t, actual_decay_t, footprint_polygon, casualty_risk, passivation_status}`.

## 4. Agent verbs (replaces "monitor / summarise")

Seven decision-grade behaviours, all distinct from passive dashboards:

| Verb | What the agent does |
|---|---|
| **Predict** | Probabilistic outputs with explicit confidence + source attribution |
| **Recommend** | Action options for an operator (not "FYI"; "if you operate sat X, do Y by T") |
| **Score** | Public scoreboard of own past predictions — accuracy honestly tracked, including hackathon-window misses |
| **Brief** | One-pager survivability report for *future* missions ("if you launch P kg into Y orbit on Z vehicle, here is your radiation / thermal / drag / conjunction budget") — this is the commercial-product face |
| **Patch self** | Hermes skill creation: after N similar events, agent writes a skill into `~/.hermes/skills/` (the existence of agent-authored skills after Day 2 is itself demo material) |
| **Publish selectively** | Only high-significance events trigger `/auto-publish` blog + OG + handdrawn video pipeline ([[concepts/obsidian-llm-knowledge-base|existing infrastructure]]) |
| **Debate** | Two-agent dialectic — [[entities/jamia-gpt|Jamia]] (commercial / policy lens) and [[entities/spacesharks-gpt|Spacesharks]] (operator / engineering lens) argue the same event; transcript is also demo material |

## 5. Build plan — 2 days build + 2 days refine

Deliberate split: half the budget is implementation, half is polish + narrative + recovery. Hackathons that win are not the ones that ship the most code — they are the ones that ship the most legible, demonstrable narrative.

### Day 1 — 2026-05-24 — Sandbox + ingest plumbing
- Install [[concepts/nemoclaw|NemoClaw]] OpenClaw profile; commit `openclaw-sandbox.yaml` with egress allowlist (`celestrak.org`, `space-track.org`, `swpc.noaa.gov`, `tfr.faa.gov`, `fcc.gov`, `nextspaceflight.com`, `build.nvidia.com`); fs allowlist (`/sandbox/captures`, `/sandbox/wiki`).
- Configure [[concepts/nemotron|Nemotron]] routing: `Llama-3.3-Nemotron-Super-49B-v1.5` as orchestrator + `Nemotron Nano 2 9B` as router/classifier; OpenAI-compatible endpoint on `:8642`.
- Hook [[concepts/hermes-agent-framework|Hermes]] to the wiki vault as a retrieval source — KB pages listed below in §7 are first-class context for the agent.
- Build five ingestors: TLE / SWPC space-weather / CDM / NOTAM / launch manifest. Each writes to `/sandbox/lifecycle-events/*.jsonl`.

### Day 2 — 2026-05-25 — Decision loop + dataset shape + publish
- For each of the five phases, ship **one** decision MVP (the four Phase 4 verbs listed above + Phase 1 slip predictor as the fifth). Strict scope discipline: one decision per phase, deep, not ten half-baked.
- Lock the canonical dataset row schema (Phase 4 row in §3 is the template; other phases inherit a subset).
- Wire the [[concepts/obsidian-llm-knowledge-base|existing publish pipeline]] — when an event's significance score crosses threshold, agent auto-drafts a `blog/` markdown + OG image + (stretch) handdrawn video; commits as the agent's own git identity.
- Run continuously for 24 h to confirm daemon stability + cache-warmth + Hermes skill creation begins.

### Day 3 — 2026-05-26 — Polish, story, sandbox-bonus evidence
- Curate the demo timeline from Day 1–2's accumulated events; pick 3–5 best moments for the demo video.
- Deliberately stage **one denied action** in the [[concepts/nemoclaw|NemoClaw]] audit log — agent tries to `curl` a non-allowlisted domain, sandbox refuses, audit log row is captured as a screenshot ([[concepts/nemoclaw-policy-presets|policy-preset]] grading evidence).
- Verify `~/.hermes/skills/` contains ≥ 2 agent-authored skills (skills should emerge naturally from the four MVP decision loops by D+2; if not, lengthen the loop window before manually seeding).
- Stage one [[entities/jamia-gpt|Jamia]] × [[entities/spacesharks-gpt|Spacesharks]] debate transcript on an event from the Day 1–2 window.

### Day 4 — 2026-05-27 — Video, docs, submission
- Record handdrawn video (existing pipeline) walking through a typical "24h in the desk's life".
- Author submission README + architecture diagram; expose public links (scoreboard, dataset preview, NemoClaw audit excerpt).
- Final wiki sync (this synthesis page + log entry).
- Submit before 2026-05-28 12:00 PT (worst-case timezone interpretation per [[sources/nvidia-agent-challenge-2026]]) — i.e., 2026-05-28 03:00 Taipei.

## 6. Demo deliverables (the only five things judges see)

1. **Live scoreboard** — N predictions made over the build window, M honestly scored against reality, no curation.
2. **Git history showing agent-authored commits** — author `spacesharks-mission-desk-bot`, every committed dataset row + every published blog draft.
3. **NemoClaw audit log excerpt** — one denied action visible, proving the policy file is real not permissive ([[concepts/nemoclaw|NemoClaw]] §"Why this earns the bonus" rubric items a-c).
4. **Agent-authored Hermes skills folder** — `~/.hermes/skills/score_launch_slip_probability` etc., dated *after* the build started.
5. **Dataset preview** — `lifecycle-events.jsonl` first 100 rows, each with phase tag + source URL + timestamp. This is the future-commercial face.

## 7. Knowledge-base reach-in points (wiki pages the agent retrieves from)

- [[concepts/orbit-dose-budgeting]] — closed-form TID/SEE trade-study calculators
- [[concepts/solar-cycle-25-leo-radiation]] — SC25 stronger than predicted, May 2024 G5 superstorm transient belts
- [[concepts/tid-total-ionizing-dose]] — Co-60 testing, ELDR effect, Vth drift
- [[concepts/see-single-event-effects]] — SEU / SET / SEFI / SEL / SEB / SEGR full taxonomy
- [[concepts/rha-radiation-hardening]] — RDM, COTS screening, vendor labs
- [[concepts/cots-gpu-radiation-risk]] — H100 / Orin radiation behaviour
- [[concepts/taiwan-radiation-test-ecosystem]] — NSPO / NTU / INER local context
- [[concepts/leo-value-chain]] — upstream / midstream / downstream + Taiwan vendor map
- [[concepts/orbital-data-center]] — ODC commercialisation backdrop
- [[concepts/aesa]] / [[concepts/hybrid-phased-array]] / [[concepts/zero-if-transmitter]] / [[concepts/evm-calibration]] / [[concepts/dpd-digital-predistortion]] — payload-side RF context for spectrum-interference attribution
- [[synthesis/leo-taiwan-odc-gap]] — structural-gap narrative for future-customer briefs
- [[synthesis/sampras-2026-engineering-thesis]] — overarching thesis the desk operationalises

## 8. Explicit non-goals (for hackathon-window scope discipline)

- **No real trades, no real broker emails, no real ground-station commands.** All such actions are drafted to `/sandbox/drafts/` only.
- **No real-time physical ground-station hardware integration.** Optional stretch only; the desk demo must work without RF hardware.
- **No general space news monitoring.** Five phases, defined decision verbs, that is the surface. Adjacent topics get filed to wiki via [[concepts/obsidian-llm-knowledge-base|standard ingest workflow]], not into the desk loop.
- **No investment / trade recommendations as a demo surface.** Track-record scoreboard is for the *prediction* and *recommendation* verbs only. Investment angle is parked for post-hackathon.
- **No silently overwritten claims.** Per the wiki schema (`wiki/AGENTS.md`), when the desk's predictions contradict a prior wiki claim, the older page is flagged with `> **Contradicted** by …`, not edited.

## 9. Risks & mitigations

| Risk | Mitigation |
|---|---|
| Nemotron / Hermes / NemoClaw breakage (stack < 6 months mature; see [[sources/nvidia-agent-challenge-2026]] §"Stack newness risk") | 30% of build budget reserved for integration debug; Day 3–4 polish phase exists specifically to absorb late-breaking issues |
| Daemon crashes after long runs | Continuous test starts Day 1 evening; restart loop with Modal/Daytona-style hibernation backend ([[concepts/hermes-agent-framework]]) as fallback |
| Hermes skill creation does not fire | Pre-seed two reference skills as scaffolding; let the agent grow new ones organically |
| Investment-related KOL noise in retrieval | Wiki-side filter at retrieval time; investment pages tagged out of desk's working context |
| 2026-05-28 deadline timezone ambiguity | Submit by 2026-05-28 03:00 Taipei to satisfy PT-noon worst case |
| Demo storytelling weak | Day 3 dedicated to story curation; handdrawn video pipeline is already proven |

## 10. Decision provenance

This plan replaces an earlier framing (port [[entities/jamia-gpt|Jamia]] / [[entities/spacesharks-gpt|Spacesharks]] GPTs onto the Nemotron stack as the hackathon entry). The owner's objection during the 2026-05-24 planning conversation was correct: porting an existing product is *migration work*, not *agent work*; a hackathon judging "long-running agents that run, persist, perform" rewards behaviour, not product-completion. The owner then refined further: focus on satellite lifecycle, not investment; treat the dataset accumulation as the long-term commercial moat; compress build to 2 days + reserve 2 days for refinement; file the plan into the wiki.

This page is the canonical record of that pivot.

## See also

- [[sources/nvidia-agent-challenge-2026]] — event source of truth (deadline, rules, stack, prize)
- [[concepts/nemotron]] / [[concepts/hermes-agent-framework]] / [[concepts/nemoclaw]] / [[concepts/nemoclaw-policy-presets]] — hackathon stack
- [[concepts/openclaw]] — default agent profile inside the NemoClaw sandbox
- [[concepts/openshell-runtime]] / [[concepts/dgx-spark]] — deployment substrate
- [[entities/sampras]] — entrant
- [[entities/jamia-gpt]] / [[entities/spacesharks-gpt]] — sibling personas used in the debate verb
- [[concepts/domain-specific-llm-agents]] — narrow-agent philosophy the desk operationalises
- [[concepts/obsidian-llm-knowledge-base]] — retrieval substrate + publish pipeline
- [[sources/nemoclaw-hermes-install-runbook-2026]] — operator-level Day 1 install reference

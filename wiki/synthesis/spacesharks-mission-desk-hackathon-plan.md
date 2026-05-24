---
type: synthesis
tags: [hackathon, nvidia-agent-challenge-2026, sampras, agent, nemotron, nemoclaw, hermes, satellite-lifecycle, space, planning, spacesharks]
---

# Spacesharks Mission Desk — NVIDIA Agent Challenge 2026 Plan

Canonical planning page for [[entities/sampras|Sampras]]'s entry to the **[[sources/nvidia-agent-challenge-2026|NVIDIA Agent Challenge 2026]]** (GTC Taipei, owner-reported deadline 2026-05-28 12:00 PM). Replaces the earlier "port Jamia/Spacesharks GPT onto Nemotron" framing with a behavior-first, lifecycle-data-moat thesis. Cross-links the hackathon stack ([[concepts/nemotron]] / [[concepts/hermes-agent-framework]] / [[concepts/nemoclaw]]) into Sampras's existing satellite / radiation / LEO knowledge base.

## 1. Thesis

**Spacesharks Mission Desk is a provenance-rich satellite-lifecycle decision assistant** — internally framed as the "lifecycle-aware mission desk," externally described as a "satellite ops copilot with traceable evidence." All three framings are interchangeable; pick whichever the audience needs.

Not a dashboard. Not an investment commentator. The agent operates as **an always-on operations desk** that ingests environmental + telemetry-adjacent signals in real time, reasons about implications **per individual satellite** (orbit, age, subsystem config, mission profile), and produces **executable decisions** (safe-mode triggers, momentum dump windows, manoeuvre options, launch slip pre-alerts) — while quietly accumulating a **structured, source-linked satellite-lifecycle event dataset** that is itself the long-term commercial moat.

Headline pitch:

> *An autonomous AI desk that doesn't just watch the space industry — it predicts every phase of the satellite lifecycle, recommends operator actions, archives every event into a labeled dataset future operators will pay for, and posts its own track record. Powered by [[concepts/nemotron|Nemotron]], sandboxed by [[concepts/nemoclaw|NemoClaw]], persistent via [[concepts/hermes-agent-framework|Hermes]].*

Reliability-architecture pitch (added 2026-05-24, third refinement):

> *A low-cost, multi-model satellite ops copilot that uses ensemble reasoning, provenance, and safe execution to produce trustworthy recommendations.*

The reliability architecture itself is documented in [[synthesis/spacesharks-trust-stack]] — four interlocking layers (data / model / decision / system) operationalised by [[concepts/small-model-ensemble]], [[concepts/tiered-inference]], [[concepts/calibrated-confidence-llm]], and [[concepts/agentic-provenance]]. The trust stack is the defensibility argument for why a calibrated multi-model system beats "we used the biggest model."

The agent is the visible surface. **The moat is the dataset and the operating loop** — the [[concepts/spacesharks-mission-desk-event-schema|event-schema contract]] guarantees every claim is traceable to a raw source, and the [[concepts/spacesharks-mission-desk-evaluation-rubric|evaluation rubric]] guarantees the scoreboard is honest. The desk is what judges see; the dataset is what future operators buy.

Investment-prediction angle is deliberately de-emphasised: market price moves do not track satellite operational provenance tightly enough to be a worthwhile demo signal. Reverting that decision later (post-hackathon, when the dataset has thicker history) is fine; for the four-day build, focus is **operator decisions**, not equities.

## 2. Why this thesis is defensible

1. **Lifecycle data is genuinely scattered.** Source-of-truth signals live across NOAA SWPC, Celestrak, Space-Track, FAA NOTAM, FCC ELS/IBFS, ITU, arXiv, vendor datasheets, and operator press releases. No public product knits them per-satellite, per-phase. The first agent to do so accumulates a moat measured in months of ingest, not days of code.
2. **Sampras's existing wiki is already half the moat.** [[concepts/orbit-dose-budgeting]], [[concepts/solar-cycle-25-leo-radiation]], [[concepts/tid-total-ionizing-dose]], [[concepts/see-single-event-effects]], [[concepts/rha-radiation-hardening]], [[concepts/cots-gpu-radiation-risk]], [[concepts/leo-value-chain]], [[concepts/orbital-data-center]] all pre-existed before the hackathon. The agent gets to retrieve from them on day one.
3. **Operator decisions are concrete demo material.** "Safe-mode trigger recommended for sat X within Y minutes given GOES X-flare class Z" is a screenshot-able artefact. Investment takes are not.
4. **Lifecycle dataset is sellable.** Future small-constellation operators and brokers will pay for curated "what does my orbit + bus + payload actually face?" data. The agent doubles as the data product's continuous ingest engine.

## 2.5 "Real-time", defined

The plan uses "real-time" loosely; the reviewer correctly flagged that this hides three distinct engineering commitments. The desk operates with the following explicit budgets:

| Tier | Source class | Freshness target | Latency budget (event_time → ingest) | Confidence default |
|---|---|---|---|---|
| T1 | Space weather (NOAA SWPC) | ≤ 5 min | ≤ 90 s | high |
| T2 | Orbit/event (Celestrak / Space-Track) | ≤ 1 h | ≤ 5 min | high |
| T3 | Launch / regulatory (FAA NOTAM, FCC) | ≤ 6 h | ≤ 30 min | medium |
| T4 | Press release / vendor datasheet | ≤ 24 h | ≤ 4 h | medium |
| T5 | Long-tail (insurance, arXiv) | ≤ 7 d | best effort | low |

**Manual review required** for: any T1 event with `confidence: high` and `significance: above-threshold` (safe-mode trigger candidate); any contradiction with prior wiki claim (per `wiki/AGENTS.md`); any debate transcript flagged `resolution: disagreement`.

See [[concepts/spacesharks-mission-desk-event-schema]] for how these tiers map to the row schema, and [[concepts/spacesharks-mission-desk-governance]] for the human-review escalation flow.

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

### Day 1 — 2026-05-24 — Schema, provenance, sandbox
- **Schema first.** Commit [[concepts/spacesharks-mission-desk-event-schema|the event schema]] and `data/lifecycle-events.sqlite` mirror skeleton BEFORE writing any ingestor. Real risk is data structure + source hygiene, not which Nemotron variant routes the calls.
- Install [[concepts/nemoclaw|NemoClaw]] OpenClaw profile; commit `openclaw-sandbox.yaml` with egress allowlist narrowed to the **four first-version sources** (see §8): `celestrak.org`, `swpc.noaa.gov`, `tfr.faa.gov`, `build.nvidia.com`. Other domains stay in the policy file as commented stubs.
- Build **two complete ingestors** (Celestrak orbit + NOAA SWPC space weather) and **three stubs** (CDM, NOTAM, launch manifest — schema-conformant but parsing only the first field, so the data contract is exercised end-to-end). The reviewer's note: 5 half-baked ingestors burn the budget; 2 complete + 3 stubs proves the contract is real without overcommitting.
- [[concepts/nemotron]] routing: defer the choice between Super 49B vs Nano 2 9B to end of Day 1; either works for the Day-2 MVP.
- Hook [[concepts/hermes-agent-framework|Hermes]] to the wiki vault for retrieval; KB pages in §7 are first-class context.

### Day 2 — 2026-05-25 — One primary decision, two supplementary
- **Primary MVP: safe-mode trigger recommendation.** This is the demo's headline. Fuse Kp + GOES X-ray + SEP flux + SAA position → output `{sat_id, recommended_safe_mode_t, confidence, signal_sources}`. Owns the demo video.
- **Secondary: conjunction triage.** Demo-ready because input → output → action is the cleanest causal chain to narrate (ingest CDM → score Pc → draft manoeuvre options).
- **Supplementary: decay ETA.** Built but not given screen time; it sits in the dataset preview as proof of breadth.
- The other Phase-4 verbs (momentum dump, interference attribution) — defer. They are documented in §3 for completeness but not shipped.
- Lock [[concepts/spacesharks-mission-desk-event-schema|the schema]] (no breaking changes after end of Day 2).
- Wire the [[concepts/spacesharks-mission-desk-governance|publish policy]] — every blog draft goes through `draft` status first, never `auto-published` on Day 2.
- Run continuously for 24 h to confirm daemon stability + cache-warmth + first Hermes skills emerge.

### Day 3 — 2026-05-26 — Polish, story, governance evidence
- Curate the demo timeline; pick 3–5 best moments for the video.
- Deliberately stage one denied action in [[concepts/nemoclaw|NemoClaw]] (per [[concepts/spacesharks-mission-desk-governance|governance]]) — agent tries to `curl` non-allowlisted domain, sandbox refuses, audit row captured.
- Verify `~/.hermes/skills/` contains ≥ 2 agent-authored skills.
- Stage one [[entities/jamia-gpt|Jamia]] × [[entities/spacesharks-gpt|Spacesharks]] debate on a Day 1–2 event, with output conforming to [[concepts/spacesharks-mission-desk-governance|the structured debate format]] (debate_id, positions, resolution). No free-form theatre.
- **Promote 1–2 high-confidence above-threshold rows from `draft` to `auto-published` via the 30-min cancel window** — proves the publish policy is real, not just present.

### Day 4 — 2026-05-27 — Video, docs, submission, honest scoreboard
- Architecture must be frozen before this day starts; do not edit the event log shape on Day 4.
- Record handdrawn video walking through "24h in the desk's life."
- Author submission README + architecture diagram; expose public links.
- Scoreboard goes live with the **full metric set from [[concepts/spacesharks-mission-desk-evaluation-rubric|the evaluation rubric]]**: not just `prediction_hit_rate`, but also `calibration_per_tier`, `brier_score`, `recommendation_acceptance_rate`, `source_coverage`, `freshness_p50`/`p95`, `audit_completeness`, `denied_action_count`, `agent_authored_skill_count`. Reviewer's note: hit rate alone is gameable; the supporting metrics are what make the board credible.
- Final wiki sync.
- Submit before 2026-05-28 03:00 Taipei (PT-noon worst case per [[sources/nvidia-agent-challenge-2026]]).

## 6. Demo deliverables (the only five things judges see)

1. **Live scoreboard with the full metric set from [[concepts/spacesharks-mission-desk-evaluation-rubric|the evaluation rubric]]** — prediction hit rate, calibration per confidence tier, recommendation acceptance rate, source coverage, freshness p50/p95, audit completeness, denied-action count. Hackathon-window misses stay on the board; no curation.
2. **Git history showing agent-authored commits** — author `spacesharks-mission-desk-bot`, every committed dataset row + every published blog draft.
3. **NemoClaw audit log excerpt** — one denied action visible, proving the policy file is real not permissive ([[concepts/nemoclaw|NemoClaw]] §"Why this earns the bonus" rubric items a-c).
4. **Agent-authored Hermes skills folder** — `~/.hermes/skills/score_launch_slip_probability` etc., dated *after* the build started.
5. **Dataset preview** — `lifecycle-events.jsonl` first 100 rows, each with phase tag + source URL + timestamp. This is the future-commercial face.
6. **Suggested-publish queue with the 30-min cancel window visible** — judges can see the draft-to-auto-published transition gate in action, per [[concepts/spacesharks-mission-desk-governance|the governance policy]].

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
- **No more than four ingestion sources in the first version.** The desk's first-version source list is locked: Celestrak (orbit/event), NOAA SWPC (space weather), FAA NOTAM (launch/regulatory), and one case-study satellite set as the on-orbit subject. Space-Track, FCC ELS/IBFS, ITU, NextSpaceflight, arXiv, vendor datasheets, insurance feeds — all listed in [[sources/nvidia-agent-challenge-2026|the hackathon stack notes]] and the §3 phase table — are intentionally **schema-conformant stubs only** for the hackathon window. Reviewer's note: 8+ sources eats the entire build budget on ingestion plumbing.
- **No autonomous publishing without a cancel window.** Every blog draft passes through `draft` status first (per [[concepts/spacesharks-mission-desk-governance|the publish policy]]); only `high`-confidence above-threshold rows can `auto-published` after a 30-min human-cancel window, and only ≤ 3/day during the hackathon window.
- **No free-form debate output.** [[entities/jamia-gpt|Jamia]] × [[entities/spacesharks-gpt|Spacesharks]] debates must resolve into the structured artefact defined in [[concepts/spacesharks-mission-desk-governance|the governance page]]; unstructured banter is not shipped.

## 8.5 Companion specification pages

Four explicit specification pages back this synthesis. The synthesis page is the *plan*; the companion pages are the *contracts*:

- [[concepts/spacesharks-mission-desk-event-schema]] — the 11-field row contract every ingestor and every decision agent conforms to; per-phase variants, storage layout, evidence-blob audit trail, schema versioning policy.
- [[concepts/spacesharks-mission-desk-evaluation-rubric]] — how prediction hit rate, calibration per tier, recommendation acceptance, outcome delta, source coverage, freshness, and audit completeness are computed; the honest-scoring guardrails.
- [[concepts/spacesharks-mission-desk-governance]] — the tiered publish policy (high/medium/low confidence routing), the 30-min cancel window for autonomous publishing, the `review_status` lifecycle, debate-output controls, and the denied-action audit.
- [[concepts/nemoclaw-policy-presets]] — the sandbox-side YAML policy file (`openclaw-sandbox.yaml`) is the lower governance surface; the upper governance policy lives in the page above.

If the synthesis page contradicts a companion page, the **companion page wins** — those are the contracts the agent reads from. Update the companion page first, then propagate the wording back here.

## 9. Risks & mitigations

| Risk | Mitigation |
|---|---|
| Nemotron / Hermes / NemoClaw breakage (stack < 6 months mature; see [[sources/nvidia-agent-challenge-2026]] §"Stack newness risk") | 30% of build budget reserved for integration debug; Day 3–4 polish phase exists specifically to absorb late-breaking issues |
| Daemon crashes after long runs | Continuous test starts Day 1 evening; restart loop with Modal/Daytona-style hibernation backend ([[concepts/hermes-agent-framework]]) as fallback |
| Hermes skill creation does not fire | Pre-seed two reference skills as scaffolding; let the agent grow new ones organically |
| Investment-related KOL noise in retrieval | Wiki-side filter at retrieval time; investment pages tagged out of desk's working context |
| 2026-05-28 deadline timezone ambiguity | Submit by 2026-05-28 03:00 Taipei to satisfy PT-noon worst case |
| Demo storytelling weak | Day 3 dedicated to story curation; handdrawn video pipeline is already proven |
| Reviewer-flagged scope creep (8+ ingestors, premature auto-publish, theatrical debate) | First-version sources locked to 4 (§8); publish requires cancel-window gate (§8 + [[concepts/spacesharks-mission-desk-governance|governance]]); debate output is structured (§8 + governance) |

## 10. Decision provenance

This plan replaces an earlier framing (port [[entities/jamia-gpt|Jamia]] / [[entities/spacesharks-gpt|Spacesharks]] GPTs onto the Nemotron stack as the hackathon entry). The owner's objection during the 2026-05-24 planning conversation was correct: porting an existing product is *migration work*, not *agent work*; a hackathon judging "long-running agents that run, persist, perform" rewards behaviour, not product-completion. The owner then refined further: focus on satellite lifecycle, not investment; treat the dataset accumulation as the long-term commercial moat; compress build to 2 days + reserve 2 days for refinement; file the plan into the wiki.

This page is the canonical record of that pivot.

A second review pass on 2026-05-24 (post-initial-commit) flagged five tightening points: "real-time" needed explicit freshness/latency tiers (added as §2.5); the data contract was implied but not written (now [[concepts/spacesharks-mission-desk-event-schema]]); the decision loop lacked an evaluation layer (now [[concepts/spacesharks-mission-desk-evaluation-rubric]]); the publish verb was too autonomous (now [[concepts/spacesharks-mission-desk-governance]] downgrades to suggested-by-default); and the source list was too broad (now §8 locks first-version to four sources, others are schema-conformant stubs). The reviewer's framing — "the moat is the dataset and operating loop, not the agent itself" — is now the headline of §1.

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
- [[concepts/spacesharks-mission-desk-event-schema]] — lifecycle-event row contract
- [[concepts/spacesharks-mission-desk-evaluation-rubric]] — scoreboard metrics and honest-scoring guardrails
- [[concepts/spacesharks-mission-desk-governance]] — tiered publish policy, review_status lifecycle, debate format

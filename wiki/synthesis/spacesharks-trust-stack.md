---
type: synthesis
tags: [hackathon, nvidia-agent-challenge-2026, sampras, agent, trust, reliability, ensemble, calibration, provenance, satellite-lifecycle, spacesharks]
---

# Spacesharks Trust Stack — Reliability by Design, Not by Model Size

Companion synthesis to [[synthesis/spacesharks-mission-desk-hackathon-plan]]. The Mission Desk plan answers *what the agent does*; this page answers *why the agent's output should be trusted*. The four mechanisms below are designed to interlock — each one weakens by itself, each one becomes the dataset moat when stacked.

## 1. Thesis

The Spacesharks Mission Desk does not win the NVIDIA Agent Challenge 2026 by using the largest available model. It wins by demonstrating that a **disciplined, instrumented, multi-model system** produces more trustworthy operator decisions than any single oversized model — at lower cost, with auditable provenance, and with calibrated honesty about what it does not know.

> **Operator pitch (English, hackathon version).** A low-cost, multi-model satellite ops copilot that uses ensemble reasoning, provenance, and safe execution to produce trustworthy recommendations.

> **Operator pitch (long form, Traditional Chinese version per the owner's briefing).** 我們不是依賴單一昂貴模型，而是用一組輕量模型在受控環境中協作、投票與校準，建立一個低成本、可追溯、可擴展的 satellite ops decision system。

The pivot from "use the largest Nemotron" to "use a calibrated multi-model stack" is intentional. Largest-model claims are commoditised — every hackathon entry can rent a 405B endpoint. **Trust architecture is not commoditised**: it requires schema design, evaluation discipline, and the kind of provenance plumbing that only pays off after weeks of accumulated logs. Spacesharks already has that runway.

## 2. The four-layer trust stack

The owner's briefing identifies four trust layers. Each layer has at least one wiki concept page that operationalises it, and at least one rubric metric that makes it visible on the scoreboard.

| Layer | What it guarantees | Concept page | Scoreboard metric |
|---|---|---|---|
| 1. Data trust | Every input is sourced, timestamped, parser-versioned, evidence-anchored | [[concepts/agentic-provenance]] (Layer 1) | `source_coverage`, `freshness_p50`/`p95`, `audit_completeness` |
| 2. Model trust | Multiple specialised small models cross-check each other; cost-aware escalation when they disagree | [[concepts/small-model-ensemble]] + [[concepts/tiered-inference]] | `calibration_per_tier`, `brier_score`, `escalation_rate_per_tier` |
| 3. Decision trust | Every output is (recommendation, confidence, evidence, disagreement, route); abstain is a first-class output | [[concepts/calibrated-confidence-llm]] | `recommendation_acceptance_rate`, `abstention_rate_by_class` |
| 4. System trust | Sandbox audit log is the single source of truth; out-of-process enforcement; tamper-evident policy hash | [[concepts/nemoclaw]] + [[concepts/nemoclaw-policy-presets]] | `audit_completeness`, `denied_action_count` |

The metrics column intentionally pulls from [[concepts/spacesharks-mission-desk-evaluation-rubric]] — this synthesis adds no new metrics. The trust stack is real only if it shows up on the existing scoreboard.

## 3. How the layers interlock

Each layer's output feeds the next layer's input. The chain is what makes the system defensible; any single layer in isolation is unconvincing.

```
Layer 1 (Data)            Layer 2 (Model)              Layer 3 (Decision)      Layer 4 (System)
─────────────────         ────────────────────         ─────────────────       ──────────────────
source_url                model_A.classify()           recommendation          audit_log_id
source_timestamp    ───▶  model_B.score()        ───▶  confidence       ───▶   policy_preset_hash
parser_version            model_C.recommend()          evidence_pointers       denied_actions[]
evidence_hash             arbiter.integrate()          disagreement_level
                          ensemble_disagreement        decision_route
                          tier_used
```

Key invariants:

- **No output without provenance.** If Layer 1 fields are incomplete, Layer 2 refuses to score. This is enforced by [[concepts/spacesharks-mission-desk-event-schema]].
- **No publish without confidence + agreement.** If Layer 3 confidence is below threshold or ensemble disagreement is above ceiling, the decision route is `monitor-only` or `needs-review`, never `publish`. See [[concepts/calibrated-confidence-llm]] §"Abstention as a first-class output".
- **No action without audit.** If Layer 4 cannot write to the audit log, the agent must abort the action — out-of-process enforcement guarantees the agent cannot suppress its own audit trail. See [[concepts/nemoclaw]] §"Why this earns the bonus".

The chain is **fail-closed**: a missing field in any layer downgrades the output, never upgrades it. This is the operational difference between a copilot judges can trust and a demo that looks impressive but cannot be re-derived.

## 4. The three-specialist arbiter

Inside Layer 2, the [[concepts/small-model-ensemble]] arbiter pattern is the engineered version of the "三個臭皮匠勝過諸葛亮" intuition from the briefing:

- **Model A — classifier** (cheap, e.g., Nemotron Nano 2 9B): event type label + confidence
- **Model B — scorer** (cheap-medium, e.g., Hermes-4 14B): risk tier (red/yellow/green) + numeric Pc estimate when CDM
- **Model C — recommender** (cheap-medium): next-action text + confidence
- **Arbiter** (deterministic rule + threshold): integrates A+B+C into `decision_route ∈ {publish / monitor-only / needs-review}` plus `disagreement_score`

This is **not majority vote** — each model has a different role and a different output space. The arbiter weights by role-confidence, not by count. The [[concepts/small-model-ensemble]] page describes the architecture; the practical recommendation is to draw the three specialists from **different base-model families** (Nemotron, Qwen-3, Mistral derivative) so correlated-error failure modes do not silently dominate.

## 5. Tiered inference is the cost-control spine

The arbiter triggers the [[concepts/tiered-inference]] escalation; together they handle 80% of routine satellite-ops queries on Tier 1 and reserve expensive inference for events that warrant it.

| Tier | Model class | Steady-state load | Trigger to escalate |
|---|---|---|---|
| T1 | Nemotron Nano 2 9B / Hermes-4 14B | ~80% (CDM screen, NOTAM parse, FCC summary) | Low inter-model agreement OR confidence below threshold |
| T2 | Nemotron Super 49B / Hermes-4 70B | ~15% (ambiguous classifications) | Red Pc event OR high-impact asset OR T2 itself returns medium-confidence |
| T3 | Nemotron Ultra 253B / Hermes-4 405B (local or sandboxed cloud egress via [[concepts/openshell-runtime]]) | ~5% (red events, crewed proximity, novel event types) | Manual review only |

The cost evidence (FrugalGPT 98% reduction, RouteLLM 75% on MT Bench, Together MoA 65.1% AlpacaEval beating GPT-4o with open-source models) is documented in [[concepts/tiered-inference]] §"Published Analogues and Industry Evidence". The Nemotron token-cost reference table is also there.

**Local-only ceiling.** [[concepts/dgx-spark]] caps local inference at the 128 GB unified-memory footprint; tier-3 models that exceed this egress through the NemoClaw L7 credential proxy and are logged at the network layer — the audit row records both the model identifier and the egress event, satisfying Layer 4 provenance even when the inference itself happens off-box.

## 6. Calibration and abstention are the honesty layer

The trust stack is meaningless if the system claims high confidence on outputs it cannot defend. [[concepts/calibrated-confidence-llm]] specifies the three-class output schema (`answer` / `abstain` / `escalate`) and the calibration techniques (temperature scaling, P(IK), conformal prediction, selective prediction) that make stated confidence empirically meaningful.

The operational test: a 70%-confidence output should be correct ~70% of the time over the live scoreboard window. The `calibration_per_tier` metric in [[concepts/spacesharks-mission-desk-evaluation-rubric]] measures this directly; the `brier_score` metric penalises overconfident wrong answers more than underconfident right answers. Both are computed nightly from event-schema rows — no manual curation.

The owner's invariant from the briefing — "對低一致性的 case 直接 abstain，不要硬答" — is enforced at Layer 3: when the [[concepts/small-model-ensemble]] arbiter's `disagreement_score` exceeds the per-decision-verb-class ceiling, the output is `abstain` with a logged trigger reason, never a published recommendation. Abstention is **auditable evidence that the threshold is real, not decorative**.

## 7. Why this beats "I have the biggest model"

The argument structure for the hackathon submission:

1. **Cost.** Tiered inference + small-model specialists run at a fraction of always-Ultra-253B cost. Energy footprint is materially lower for a 24/7 ops loop on [[concepts/dgx-spark]].
2. **Reliability.** Multiple specialised models cross-check each other; correlated-failure modes are mitigated by drawing from different base-model families. The disagreement signal is a first-order operational input, not a discarded artefact.
3. **Honesty.** Calibrated confidence and explicit abstention make the scoreboard credible — judges and future operators can see what the desk does NOT know, not just what it claims.
4. **Provenance.** Every recommendation is reproducible to a raw byte. The labelled lifecycle-event dataset described in [[synthesis/spacesharks-mission-desk-hackathon-plan]] becomes commercially defensible because each row is independently verifiable, not because it is large.
5. **Containment.** [[concepts/nemoclaw]] enforces the safety boundary out-of-process; the agent cannot suppress its own audit trail. This is the structural property that makes the rest of the stack worth anything — instrumentation an attacker can disable is no instrumentation at all.

**The pitch is not "we used the most powerful model." The pitch is "we built a system that is correct, honest, cheap, and auditable — and the dataset that falls out of it is the moat."**

## 8. Scope reduction — the five words

From the owner's briefing, the scope-discipline distillation:

- `NemoClaw` — sandbox + audit (Layer 4)
- `OpenClaw` — always-on runtime + 24/7 ingest (Layer 1 input loop)
- `small-model ensemble` — multi-model arbiter (Layer 2)
- `provenance` — reproducible evidence chain (Layer 1 + cross-layer)
- `24/7 ops loop` — continuous operation; this is what makes lossy logs catastrophic per [[concepts/agentic-provenance]] §3

If a feature does not directly serve one of these five words, it is out of scope for the hackathon window. See [[synthesis/spacesharks-mission-desk-hackathon-plan]] §8 "Explicit non-goals" for the matching scope-discipline rules at the Mission Desk level.

## 9. Relationship to existing wiki pages

This synthesis intentionally does NOT redefine:

- The lifecycle taxonomy (lives in [[synthesis/spacesharks-mission-desk-hackathon-plan]] §3)
- The row contract (lives in [[concepts/spacesharks-mission-desk-event-schema]])
- The scoreboard metric definitions (live in [[concepts/spacesharks-mission-desk-evaluation-rubric]])
- The publish/review policy (lives in [[concepts/spacesharks-mission-desk-governance]])
- The sandbox runtime mechanics (live in [[concepts/nemoclaw]] and [[concepts/openclaw]])

If anything on this page conflicts with the canonical companion page above, the **companion page wins**.

## 10. Decision provenance

This synthesis was filed on 2026-05-24 after the owner's third refinement of the Mission Desk thesis. The first refinement (earlier same day) pivoted from "port Jamia/Spacesharks GPTs onto Nemotron" to "satellite-lifecycle decision co-pilot." The second refinement de-emphasised the investment-prediction angle in favour of operator decisions and the labelled-lifecycle dataset moat. **This third refinement formalises the reliability stack itself** — small-model ensemble + tiered inference + calibrated confidence + agentic provenance — as the defensibility argument, on the grounds that "we have the biggest model" is not a defensible hackathon claim, but "we have a system that is correct, honest, cheap, and auditable" is.

## See also

- [[synthesis/spacesharks-mission-desk-hackathon-plan]] — canonical Mission Desk plan; this synthesis is the trust-architecture companion
- [[concepts/small-model-ensemble]] — three-specialist arbiter pattern (Layer 2)
- [[concepts/tiered-inference]] — cost-aware model cascade (Layer 2 cost spine)
- [[concepts/calibrated-confidence-llm]] — answer/abstain/escalate three-class output (Layer 3)
- [[concepts/agentic-provenance]] — four-trust-layer model + W3C PROV / C2PA / NIST AI RMF analogues (cross-layer)
- [[concepts/nemoclaw]] / [[concepts/nemoclaw-policy-presets]] — sandbox audit and policy presets (Layer 4)
- [[concepts/openclaw]] — always-on agent profile; 24/7 ops loop
- [[concepts/hermes-agent-framework]] — agent loop driving the multi-model orchestration
- [[concepts/nemotron]] — NVIDIA model family providing the three local inference tiers
- [[concepts/dgx-spark]] — local-only inference ceiling; tier-3 egress trigger
- [[concepts/openshell-runtime]] — sandbox egress path for tier-3 cloud models
- [[concepts/spacesharks-mission-desk-event-schema]] — row contract that operationalises Layer 1 + Layer 3
- [[concepts/spacesharks-mission-desk-evaluation-rubric]] — scoreboard metrics that measure each layer's quality
- [[concepts/spacesharks-mission-desk-governance]] — publish/review policy reading from Layer 3 + Layer 4 outputs
- [[entities/sampras]] — entrant
- [[entities/spacesharks-gpt]] — operator/engineering persona; eventual dataset consumer
- [[entities/jamia-gpt]] — commercial/policy persona; debate-verb counterpart
- [[entities/nvidia]] — model vendor and hackathon host
- [[entities/nous-research]] — Hermes LLM provider for the tier stack
- [[sources/nvidia-agent-challenge-2026]] — event source of truth (deadline, prize, stack)

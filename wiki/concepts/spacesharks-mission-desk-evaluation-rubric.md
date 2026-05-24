---
type: concept
tags: [spacesharks, mission-desk, satellite-lifecycle, evaluation, scoreboard, metrics, hackathon, nvidia-agent-challenge-2026]
---

# Spacesharks Mission Desk — Evaluation Rubric

This page defines the [[synthesis/spacesharks-mission-desk-hackathon-plan|Mission Desk]]'s evaluation layer: the bridge between the predict/recommend/score verbs and any honest answer to "did the desk get it right?" Without this layer the agent is a rules engine that never looks back. The rubric is **honest by construction**: every metric listed here is fully derivable from rows in the [[concepts/spacesharks-mission-desk-event-schema|event schema]] — no manual curation, no cherry-picked windows. If a metric cannot be computed from schema rows, it does not appear on the scoreboard.

---

## 1. Two scoring tracks

All evaluation falls into exactly two tracks, kept separate to avoid conflating different kinds of correctness.

**Prediction track** — falsifiable forecasts committed before the predicted event window opens. Examples: slip-probability at T-48h before launch, decay-ETA for a specific satellite epoch, conjunction Pc 24h before close approach, safe-mode recommendation timing relative to an X-flare. A prediction is only eligible for scoring after its `verifiable_by_t` timestamp has passed. Predictions still inside their window are excluded from the denominator and must not be reported as hits or misses.

**Recommendation track** — operator-facing action proposals generated during Phase 4 on-orbit ops. These are scored two ways simultaneously:

- **Acceptance scoring** — was the recommendation accepted or dismissed by a (simulated) operator before the agent commits its next draft? The desk does not get to observe acceptance before it commits.
- **Outcome scoring** — for every accepted recommendation, did the post-action telemetry and event log improve on the no-action baseline trajectory? This is the only place where the agent's reasoning earns credit beyond surface plausibility.

---

## 2. Prediction hit-rate definition

### Denominator

Every prediction row in the [[concepts/spacesharks-mission-desk-event-schema|event schema]] where `verifiable_by_t` is set and `verifiable_by_t <= now`. Predictions that have not yet reached their verifiable window are excluded. Predictions where `verifiable_by_t` was not set at write time are permanently ineligible — the rubric does not allow backfilling this field after outcomes are known.

### Numerator

- **Probabilistic predictions** — the observed reality falls inside the stated confidence interval (e.g., a predicted Pc of 0.003 ± 0.001 with the CDM-observed Pc at 0.0027 is a hit; 0.0041 is a miss regardless of the direction of error).
- **Classification predictions** — the categorical output matches the observed category (safe-mode-required / safe-mode-not-required; slip / no-slip; etc.). Confidence interval logic does not apply; the label either matches or it does not.

### Calibration check

Raw hit rate is necessary but not sufficient. Predictions must be grouped by their stated `confidence` tier — `high`, `medium`, `low` as defined in the [[concepts/spacesharks-mission-desk-event-schema|event schema]]. The hit rate within each bucket should approximate the confidence tier's nominal threshold:

| Confidence tier | Expected hit rate | Calibration-failure threshold |
|---|---|---|
| `high` | ≥ 80% | < 65% |
| `medium` | 50–79% | < 40% |
| `low` | 30–49% | < 20% |

A `high`-confidence bucket scoring 60% is a calibration failure even when the raw count looks good. Calibration failures are reported on the scoreboard alongside the raw hit rate, not buried.

### Brier score

For every probabilistic prediction, the Brier score is also computed as mean squared error against the binary outcome:

```
brier_score = mean( (predicted_prob - outcome_binary)^2 )
```

Lower is better. The naive baseline for a random binary guess is **0.25**; any score at or above 0.25 means the agent is no better than chance on that prediction class and must be reported as such. The Brier score rewards well-calibrated confidence — a "high-confidence wrong" answer is penalised far more than a "medium-confidence wrong" answer.

---

## 3. Recommendation posterior scoring

### Acceptance rate

```
acceptance_rate = accepted / (accepted + dismissed)
```

Source: the `review_status` field on each recommendation row (transitions managed per [[concepts/spacesharks-mission-desk-governance|governance]]). For the hackathon-window demo, the owner plays the simulated operator. This remains honest because the desk commits its recommendation draft before the operator marks it — there is no feedback loop that leaks the eventual accept/dismiss signal back into the generation step.

Dismissed recommendations are never deleted from history. They remain in the dataset with `review_status: dismissed` and count fully in the denominator.

### Outcome delta

For every accepted recommendation, the post-action state is compared to the estimated baseline trajectory (the counterfactual no-action path projected from signals available at decision time):

```
outcome_delta = baseline_loss - actual_loss
```

Loss is task-specific by Phase 4 decision verb:

| Decision verb | Loss definition |
|---|---|
| Safe-mode trigger | Unsaved telemetry seconds during safe mode vs. estimated radiation-damage seconds avoided |
| Momentum dump window | Wheel saturation minutes if dump had not occurred vs. fuel spent on the dump |
| Conjunction triage | Probability-weighted collision consequence vs. manoeuvre delta-v cost |
| Launch slip pre-alert | Cascade schedule delay seconds (if slip occurred) vs. operator planning cost |

`outcome_delta > 0` means the accepted action improved on the baseline. Aggregate per phase, then normalise by the number of accepted recommendations in that phase. The normalised aggregate is `outcome_delta_aggregate` on the scoreboard.

---

## 4. False positive / false negative handling

For each of the four Phase 4 MVP decisions, false positives and false negatives carry different operational costs. The desk's detection threshold must be set accordingly — not to maximise F1, but to reflect the real asymmetry between FP cost (avoidable operator overhead) and FN cost (uncaught threat).

**False positive** — the desk recommended an action; the predicted threat did not materialise.  
**False negative** — the desk did not recommend an action; the threat did materialise.

| Decision | FP cost | FN cost | Recommended bias |
|---|---|---|---|
| Safe-mode trigger | Low (lost ops minutes) | High (radiation damage, potentially irreversible) | Recall-favoured |
| Momentum dump window | Medium (fuel expenditure) | Medium (wheel saturation, recoverable) | Balanced |
| Conjunction triage | Medium (manoeuvre delta-v) | Catastrophic (collision, total loss) | Recall-favoured |
| Launch slip pre-alert | Low (operator planning time) | Medium (cascade schedule delay) | Precision-favoured |

For recall-favoured decisions, the scoreboard reports precision and recall separately; F1 alone is insufficient because it hides which direction the agent is failing. For precision-favoured decisions, F1 is acceptable as the headline but precision is reported first.

---

## 5. Scoreboard metrics — the public board

The reviewer's core objection: a scoreboard that only shows hit rate is gameable by cherry-picking a small number of obvious predictions. An honest scoreboard shows source coverage and audit completeness alongside hit rate, because a 100% hit rate on three cherry-picked events is worse than 70% on one hundred diverse events. The following ten metrics must appear side by side on the judge-visible scoreboard.

| Metric | Definition | Why it matters |
|---|---|---|
| `prediction_hit_rate` | Numerator / denominator from §2 | The headline number; meaningless without the columns to its right |
| `calibration_per_tier` | Hit rate within each confidence bucket (high / medium / low) | Detects overconfident agent; a high-tier bucket scoring 60% is a red flag |
| `brier_score` | Mean (predicted_prob − outcome_binary)² across all probabilistic predictions | Penalises overconfident wrong answers disproportionately; baseline floor 0.25 |
| `recommendation_acceptance_rate` | Accepted / (accepted + dismissed) from `review_status` | Are recommendations actually useful to a real operator? |
| `outcome_delta_aggregate` | Sum of `outcome_delta` per phase, normalised by accepted recommendation count | Did accepted actions improve on the baseline trajectory? |
| `source_coverage` | Distinct `source_type` values appearing in the last 24h ÷ total `source_type` enum cardinality | Are all five ingest classes (SWPC / TLE / CDM / NOTAM / FCC) still live? |
| `freshness_p50` / `freshness_p95` | Time from `event_time` to first ingest, at median and 95th percentile | Real end-to-end latency, not the advertised feed refresh interval |
| `audit_completeness` | Rows where `evidence_hash` is set and the stored blob resolves successfully ÷ total rows | Provenance audit pass rate; a desk with 100% hit rate but 60% audit completeness is untrustworthy |
| `denied_action_count` | Sandbox-denied tool calls visible in the [[concepts/nemoclaw|NemoClaw]] audit log | Governance is live, not permissive; at least one denied call must appear for the sandbox bonus |
| `agent_authored_skill_count` | Files in `~/.hermes/skills/` with a creation timestamp after build-start | The Hermes self-patch verb is real; zero by Day 3 is a build-plan failure |

All ten metrics are computed nightly from the live event schema. No metric requires manual input from the operator.

---

## 6. Honest-scoring guardrails

These self-imposed constraints exist so the scoreboard cannot be gamed after the fact — by the operator or by the agent itself.

- `confidence` tier on a prediction row is immutable after the row is written. There is no mechanism to relabel a "high" confidence prediction as "medium" after the outcome is known.
- Dismissed recommendations are never deleted. They are marked `review_status: dismissed` and remain in every acceptance-rate denominator permanently.
- `verifiable_by_t` must be set at the time the prediction row is written — before the predicted event window opens. A prediction row written without this field is permanently excluded from scoring.
- A nightly job re-hashes every stored evidence blob. Any mismatch between the stored hash and the recomputed hash flips `review_status` to `needs-human-review` on that row; the row is excluded from `audit_completeness` until a human resolves it.
- Hackathon-window misses remain on the board. Misses during the 2026-05-24 through 2026-05-28 window are not culled when reporting the live demo scoreboard. The synthesis page §4 (Score verb) explicitly commits to this: "accuracy honestly tracked, including hackathon-window misses."

---

## 7. What this rubric is not

The rubric does not cover:

- **Investment or market predictions.** The hackathon-window demo explicitly de-emphasises investment-prediction angle per [[synthesis/spacesharks-mission-desk-hackathon-plan|§1 of the plan]]. If market-facing predictions are added post-hackathon, they must be scored on a separate track with a separate denominator and must not inflate the operator-track hit rate.
- **Retroactive event labelling.** If an event in the schema does not have a matching prediction row committed before `verifiable_by_t`, it cannot be retrospectively claimed as a hit. The schema row and the prediction row are two distinct records.
- **Aggregate averages across phases without phase breakdown.** Aggregated hit rate across all five phases is reported as a secondary figure only. Phase 4 (on-orbit ops) predictions dominate by volume and must be disaggregated from Phase 1 (pre-launch) predictions; they test different agent capabilities.

---

## See also

- [[synthesis/spacesharks-mission-desk-hackathon-plan]] — parent plan; the Score verb and demo deliverable §4 (live scoreboard) are the direct consumer of this rubric
- [[concepts/spacesharks-mission-desk-event-schema]] — every metric here is computable from schema rows; this rubric has no metrics that require out-of-schema data
- [[concepts/spacesharks-mission-desk-governance]] — `review_status` field transitions and the nightly re-hash job are governed here
- [[concepts/nemoclaw]] — `denied_action_count` comes from the NemoClaw audit log
- [[concepts/hermes-agent-framework]] — `agent_authored_skill_count` tracks files written by the Hermes self-patch verb
- [[sources/nvidia-agent-challenge-2026]] — judge evaluation context; calibration and audit completeness metrics are targeted at judge scrutiny of claimed hit rates

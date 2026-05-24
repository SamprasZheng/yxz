---
type: concept
tags: [spacesharks, mission-desk, governance, human-review, publish-policy, safety, hackathon, nvidia-agent-challenge-2026]
---

# Spacesharks Mission Desk — Governance, Human Review, and Publish Policy

This page is the rulebook for the [[synthesis/spacesharks-mission-desk-hackathon-plan|Mission Desk]]'s governance posture: what the desk MAY publish autonomously, what it MUST hold for human review, and how the debate and denied-action verbs surface without becoming noise. The foundational stance is **suggested-by-default, autonomous-by-exception** — a deliberate inversion of the original plan's framing. Noisy automation is the failure mode for always-on agents; a high signal-to-noise scoreboard is more compelling to judges and to future paying operators than a wall of auto-posts. Every mechanism below is designed to keep that ratio high.

---

## 1. Tiered publish policy

The governance layer assigns `review_status` at ingest time based on two orthogonal signals: the `confidence` field (from [[concepts/spacesharks-mission-desk-event-schema|the schema]]) and the event's significance score (unusual magnitude, novel sat/phase combination, or decision confidence ≥ 0.85).

| Confidence | Significance | Destination | Human gate? |
|---|---|---|---|
| `high` | above-threshold | `blog/` draft → auto-published after a 30-min human-cancel window | Soft (auto-publish if no cancel) |
| `high` | below-threshold | `blog/` draft, held indefinitely | Hard (operator MUST approve) |
| `medium` | any | `blog/` draft only, never auto-published | Hard |
| `low` | any | `data/lifecycle-events/*.jsonl` only — internal log, no propagation | N/A (never leaves the desk) |

**Why the 30-min cancel window exists.** The cancel window is the only path to true autonomous publishing during long-running demo windows without reducing the governance layer to theatre. A human who disagrees with a high-confidence, high-significance row has thirty minutes to press cancel; if they do not, the scheduler publishes and logs the non-action as implicit approval. This makes the cancel button the human's tripwire — small enough to respect operators' time, large enough to catch genuine errors before they go public. During the hackathon window the cancel button is a Slack message or a simple CLI flag; the mechanism matters, not the UX.

**Why medium-confidence never auto-publishes.** Confidence calibration is fragile at distribution boundaries. Medium-tier hit rates degrade fastest under distribution shift — a model well-calibrated on Starlink Phase 1 commissioning data will systematically over-trigger on novel smallsat buses. The cost of a false claim under the desk's own byline is reputational, not just operational: the desk's moat is provenance, and a visible miscalibration erodes the trust that makes the dataset commercially valuable. Medium rows stay in `draft` indefinitely until a human confirms them. This is not a limitation — it is a feature the desk advertises to judges as evidence of epistemic humility.

**How the policy interacts with [[concepts/spacesharks-mission-desk-evaluation-rubric|the evaluation rubric]].** If `calibration_per_tier` for the `high` bucket drops below 70% over a rolling 7-day window, all `high` rows MUST auto-downgrade to `medium` policy until calibration recovers. This is enforced by the nightly evaluation job, not by the agent at write time. The agent at ingest time sets `confidence` based on its current model; the nightly job audits those assignments in aggregate and can demote the entire tier. The agent cannot override this demotion — only the operator can restore the `high` tier by explicitly resetting the calibration gate after reviewing the failure cases.

---

## 2. `review_status` lifecycle

The `review_status` enum is defined in [[concepts/spacesharks-mission-desk-event-schema|the schema]] as:
`auto-published | draft | internal-log-only | needs-human-review | dismissed`

The following rules govern every transition. **Who** is responsible for each move is as important as what the move is.

- **Set initially by the governance layer at ingest** based on the table in §1. The agent itself does not set `review_status` directly; the governance layer is a separate code path that reads the agent's output and applies policy.
- **`draft` → `auto-published`** only by the **scheduler** after the 30-min cancel window expires with no human input and provided the tier has not been auto-downgraded (§1 calibration gate). The scheduler SHALL log the transition with a timestamp and the absence of a cancel signal.
- **Any → `needs-human-review`** by:
  - the **nightly evidence re-hash job**, if the `evidence_hash` for a row no longer matches a fresh fetch of `source_url` — meaning the source mutated after ingest; or
  - the **contradiction-detector**, if the row's claims contradict a prior wiki page claim (per `wiki/AGENTS.md` contradiction handling; see §5 below).
  The agent itself MUST NOT set `needs-human-review` on its own output — this would create a trivially gameable self-exemption loop.
- **Any → `dismissed`** only by an **explicit human action**. The desk SHALL NOT dismiss its own rows. Dismissed rows are not deleted; they remain in the JSONL and SQLite mirror with `review_status: dismissed` and a `dismissed_at` timestamp. Deletion of evidence is not permitted.
- **`auto-published` is terminal for the publish pipeline** but the row remains mutable for the evaluation pipeline: `operator_action_taken` and `outcome` are backfilled retrospectively as real-world evidence arrives. `outcome_delta` (the evaluation rubric's retrospective accuracy score) is populated by the nightly evaluation job, not by the agent or the publish scheduler.

---

## 3. Denied-action audit — sandbox-level governance

The [[concepts/nemoclaw|NemoClaw]] sandbox is the lower governance layer. It enforces what the agent is physically allowed to do regardless of what its own policy says. Sandbox enforcement is not a backstop — it is a first-class governance surface, and the desk MUST treat it as such.

- Every denied tool call increments `denied_action_count` on the scoreboard. This metric is defined in [[concepts/spacesharks-mission-desk-evaluation-rubric|the evaluation rubric]] and is visible to judges. A desk that never triggers a denied action has a permissive policy file, not a secure one.
- The agent MUST deliberately stage at least one denied action during the hackathon window (per [[synthesis/spacesharks-mission-desk-hackathon-plan]] §5 Day 3). This is not a demo trick — it is the minimum evidence that the [[concepts/nemoclaw-policy-presets|policy file]] is restrictively configured rather than merely present. The staged denial SHOULD be a `curl` attempt to a non-allowlisted domain; the audit log row MUST be captured and committed.
- A **repeated-denial pattern** (the same domain denied 5 or more times within a 1-hour window) MUST auto-create a `needs-human-review` row with `source_type: derived`. The semantic of this row is a question from the desk to the operator: "Am I hitting a policy gap I should be allowed through, or am I trying to do something I should not be doing?" The desk MAY include the denied domain and the tool call stack in the row's `decision` field to help the operator triage. The operator's response (policy expansion, confirmation of the block, or dismissal) becomes the ground-truth label for that row.

---

## 4. Debate verb output controls

The [[entities/jamia-gpt|Jamia]] × [[entities/spacesharks-gpt|Spacesharks]] debate is good demo material precisely because it surfaces genuine disagreement between a commercial/policy lens and an operator/engineering lens. But free-form transcripts are not demo material — they are theatre. The following constraints transform debate into a structured, reviewable artefact.

Every debate transcript MUST resolve into the following YAML artefact before it is considered complete:

```yaml
debate_id: <ulid>
event_id: <links to a lifecycle event row>
participants: [jamia, spacesharks]
positions:
  jamia: { stance, key_claims: [...], cited_wiki_pages: [...] }
  spacesharks: { stance, key_claims: [...], cited_wiki_pages: [...] }
resolution: agreement | disagreement | escalated-to-human
```

Additional rules:

- Debates that resolve `disagreement` or `escalated-to-human` MUST be surfaced on the scoreboard with their own counter. Disagreement is a feature, not a failure: it proves the desk is not echo-chambering itself. A desk where Jamia and Spacesharks always agree is a desk with a single point of view wearing two hats.
- Debates without a backing `event_id` SHALL NOT be shipped. Pure speculation — a debate about a hypothetical event with no corresponding lifecycle row — does not get a stage. This rule eliminates the main path by which the debate verb becomes theatrical padding.
- A maximum of one published debate transcript per 24-hour window. Additional debates within the same window stay in `internal-log-only`. This rate limit exists to prevent debate spam from crowding out the desk's primary output (decision rows and scored predictions).
- `cited_wiki_pages` on each position MUST contain at least one entry. A position with no cited wiki pages is an opinion, not a reasoned stance. The governance layer MUST reject the debate artefact if either position has an empty `cited_wiki_pages` list.

---

## 5. Contradiction handling — wiki side

The desk follows the contradiction rule from `wiki/AGENTS.md` without exception. When a new event row would contradict a prior wiki claim:

- The **older wiki page** MUST be flagged with the standard inline marker (where `<event_id>` is the lifecycle row's `event_id` field):
  ```
  > **Contradicted** by [lifecycle-events/<event_id>]: <one-line note>
  ```
  This is the same pattern used for all wiki contradictions; the desk does not get a special exemption because the contradicting claim originates from an agent rather than a human.
- The **new event row's `review_status`** MUST be forced to `needs-human-review` even if `confidence` is `high` and significance is above-threshold. Contradictions always escalate. The desk SHALL NOT publish a claim that contradicts an existing wiki page until a human has reviewed and resolved the conflict.
- The desk SHALL NOT silently overwrite. This is non-negotiable. The desk's commercial moat is provenance — the ability for any operator to trace any claim back to its raw source via `evidence_hash`. Silent overwrites destroy provenance by creating a present that is inconsistent with the past. Every rewrite must leave a visible scar.

---

## 6. Hackathon-window posture

The governance posture during the four-day build is deliberately more restrictive than the long-run production posture, for two reasons: the calibration dataset is thin (days of history, not months), and the judges are watching for evidence of thoughtful restraint, not volume.

**During the build (Days 1–4):**
- Human (Sampras) reviews every `draft` row at least once daily; the review queue is a filtered view of the SQLite mirror.
- Auto-publish is throttled to a maximum of 3 rows per day, regardless of how many high-confidence high-significance rows the desk produces.
- Dismissed rows are not deleted; they are preserved with `review_status: dismissed` and a dismissal note. The dismissal note is part of the audit trail.

**During the demo:**
- The scoreboard shows live counts for every `review_status` value. Judges can see the full distribution: how many rows were published, how many are in draft, how many are internal-only.
- Judges MAY click any `auto-published` row and trace it back to the raw source payload via `evidence_hash` (the blob is publicly accessible for the demo window).
- The NemoClaw audit log excerpt showing at least one denied action MUST be linked from the submission README.

**Post-hackathon:**
- The 30-min cancel window MAY be extended or contracted based on calibration history. A desk with a proven 90-day `high`-tier calibration above 85% could justify shortening the window; a desk experiencing distribution shift should lengthen it.
- Multi-operator review (multiple humans in the cancel queue) is a planned future feature and is not in scope for the hackathon submission.
- The nightly calibration gate (§1) remains active indefinitely; it is the primary long-run protection against calibration drift becoming an autonomous publishing risk.

---

## See also

- [[synthesis/spacesharks-mission-desk-hackathon-plan]] — parent plan; §4 agent verbs and §5 build schedule are the operational context for this rulebook
- [[concepts/spacesharks-mission-desk-event-schema]] — defines the `review_status` enum, `confidence` field, and `evidence_hash` provenance trail that this page governs
- [[concepts/spacesharks-mission-desk-evaluation-rubric]] — `calibration_per_tier` feeds the policy auto-downgrade in §1; `denied_action_count` is defined there
- [[concepts/nemoclaw]] — sandbox enforcement layer; physically enforces what the agent is allowed to do regardless of policy
- [[concepts/nemoclaw-policy-presets]] — the YAML policy file is the lower governance surface; the `openclaw-sandbox.yaml` preset is a graded hackathon artefact
- [[concepts/obsidian-llm-knowledge-base]] — the `/auto-publish` pipeline is what this policy gates; the desk's blog output flows through it
- [[entities/jamia-gpt]] — commercial/policy lens participant in the debate verb
- [[entities/spacesharks-gpt]] — operator/engineering lens participant in the debate verb
- [[sources/nvidia-agent-challenge-2026]] — event context; judging rubric that makes governance visible work, not invisible scaffolding

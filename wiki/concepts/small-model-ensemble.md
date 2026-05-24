---
type: concept
tags: [ai-agents, multi-model, ensemble, llm-architecture, spacesharks-mission-desk, nemoclaw, nvidia-agent-challenge-2026]
---

# Small-Model Ensemble + Multi-Model Arbiter Pattern

## Definition

A **small-model ensemble** replaces a single large LLM decision-maker with multiple smaller models, each assigned a **distinct, bounded role**. The outputs are integrated by an **arbiter** module that produces a single final decision — not by counting votes, but by weighting each model's output according to its role-specific confidence.

In agentic operations this pattern matters because:

- No single model call owns the entire reasoning chain. Failures are local and surfaceable.
- Role-specialised models can be smaller and cheaper than a general-purpose model trying to do everything.
- The arbiter's integration step produces **explicit disagreement metadata** — a signal that is discarded in single-model pipelines but is operationally valuable (it is a natural abstention trigger).

This is distinct from *majority vote*: in a majority-vote scheme, models have the same role and the same output space, and the plurality wins. In the arbiter pattern, **each model has a different role** (classification, scoring, recommendation), and the arbiter weights them by **role-confidence**, not by count.

---

## The Arbiter Pattern

The canonical three-model layout used in the Spacesharks Mission Desk and described in the owner's briefing:

```
Model A (Classifier)
  → event type label + confidence_A

Model B (Risk Scorer)
  → risk tier (red / yellow / green) + confidence_B

Model C (Recommendation Generator)
  → next-action text + confidence_C

          ↓
     Arbiter Module
          ↓
  Decision: one of
    - "publish recommendation"   (A,B,C agree, all confidence high)
    - "monitor only"             (A,B agree; C low-confidence or absent)
    - "needs review"             (disagreement above threshold)
  Plus: disagreement_score, confidence_vector, audit_log_row
```

**Why the arbiter is not majority vote.** If all three models voted on "what should we do next?" the recommendation model's broad answer would drown out the tightly scoped classifier and scorer. Instead, each model's output gates the next:

1. If the classifier confidence is below threshold, the whole chain is downgraded to "needs review" regardless of B and C.
2. If the scorer returns "red" and C returns a manoeuvre recommendation, the arbiter can escalate to "publish recommendation" — but only if A is also above threshold.
3. The disagreement score is `1 − mean(pairwise_agreement)` across the three model outputs, computed in a shared label space defined at ingest time.

The arbiter is the **new failure mode**. If the arbiter logic is wrong, all three models can be correct and the system still fails. This is the pattern's primary engineering risk; see §Tradeoffs below.

---

## Published Analogues and Prior Art

### Mixture-of-Agents (MoA) — Wang et al., 2024
Together AI's MoA paper (arXiv [2406.04692](https://arxiv.org/abs/2406.04692), ICLR 2025) is the closest architectural ancestor. MoA runs multiple LLMs as "proposers" in parallel layers, then feeds their outputs to an "aggregator" model in the next layer. The aggregator synthesises the proposals into a final response. On AlpacaEval 2.0, a MoA built only from open-source models achieved 65.1% vs GPT-4o's 57.5%.

**Key difference from the arbiter pattern.** MoA uses homogeneous-role proposers (all are "response generators") aggregated by a single aggregator. The arbiter pattern uses **heterogeneous-role** specialists; the aggregation logic is therefore deterministic/rule-based (role-weighted threshold) rather than generative.

### Panel of LLM evaluators (PoLL) — Verga et al., 2024
"Replacing Judges with Juries: Evaluating LLM Generations with a Panel of Diverse Models" (arXiv [2404.18796](https://arxiv.org/abs/2404.18796)) shows that an ensemble of three small evaluators (command-r + gpt-3.5-turbo + Haiku) outperforms a single GPT-4 judge, exhibits less intra-model bias from using disjoint model families, and costs seven times less. This directly supports the calibration argument: inter-model disagreement is a better signal than any single large model's confidence score.

### Constitutional AI multi-critic structure — Anthropic, 2022
Anthropic's Constitutional AI paper ("Constitutional AI: Harmlessness from AI Feedback", arXiv [2212.08073](https://arxiv.org/abs/2212.08073)) introduced the RLAIF loop where an AI model generates its own critiques and revisions against a written constitution. While this is intra-model (not inter-model), it established the principle that **structured critique passes** — not just generation — are a first-class part of the inference pipeline. CAI's critique model and revision model are role-specialised, which is the conceptual ancestor of role-specialised arbiter architectures.

### Petri (AI safety auditor) — Anthropic, October 2025
Anthropic's open-source Petri framework ([anthropic.com/research/petri-open-source-auditing](https://www.anthropic.com/research/petri-open-source-auditing)) runs an autonomous "Auditor" agent against a "Target" model, with a separate "Judge" agent scoring interactions across a 36-dimension safety rubric. This is a three-role ensemble in production use: Auditor generates stimuli, Target responds, Judge scores. The Judge role is structurally identical to the arbiter. Petri has been applied to 14 leading LLMs including Claude Sonnet 4.5 and GPT-5.

### Self-Consistency Decoding — Wang et al., 2022
"Self-Consistency Improves Chain of Thought Reasoning in Language Models" (arXiv [2203.11171](https://arxiv.org/abs/2203.11171)) samples multiple reasoning paths from a *single* model and marginalises to the most-consistent answer. This is **intra-model**, not inter-model — it improves a single model's output by diversifying its own sampling. The arbiter pattern runs distinct models with distinct weights; self-consistency runs one model multiple times. The patterns are complementary: each small specialist could internally use self-consistency decoding before passing its output to the arbiter.

### Speculative Decoding — Leviathan et al., 2023
"Fast Inference from Transformers via Speculative Decoding" (arXiv [2211.17192](https://arxiv.org/abs/2211.17192)) uses a small draft model to generate candidate tokens that a large verifier model accepts or rejects. This is a **draft-and-verify** speed optimisation, not an ensemble decision pattern. It is included here for disambiguation: the small model in speculative decoding is not an independent decision-maker; it is a throughput accelerator for a single authoritative model. The arbiter pattern uses small models as **independent decision contributors**, not drafts to be overridden.

### FrugalGPT / Model Cascades — Chen et al., 2023
"FrugalGPT: How to Use Large Language Models While Reducing Cost and Improving Performance" (arXiv [2305.05176](https://arxiv.org/abs/2305.05176)) routes queries through a cascade of increasing-capability (and increasing-cost) models, stopping when confidence is sufficient. FrugalGPT achieves GPT-4-level performance with up to 98% cost reduction.

**Key difference.** Model cascades are *sequential* — query enters Model A, if A's confidence is sufficient the query stops there, otherwise it escalates to B. The arbiter pattern is *parallel fan-out* — all specialists run simultaneously, then the arbiter integrates. Cascades optimise for cost by early-exit; ensembles optimise for confidence and disagreement detection by coverage. Cascades are the closest analogue to [[concepts/tiered-inference]] (a companion page covering this pattern in detail); the arbiter pattern is the better fit when role-specialisation (not scale) is the design axis.

---

## Tradeoffs: Where It Shines vs Where It Fails

### Wins

| Advantage | Explanation |
|---|---|
| Lower single-point-of-failure risk | No single model owns the full chain; a bad classification degrades gracefully to "needs review" rather than producing a confident wrong answer |
| Lower per-call cost | Three 7–13B models in parallel cost less than one 70B+ model serially processing the same compound question |
| Interpretable disagreement | `disagreement_score` is a first-class output; operators can set their own abstention threshold per event tier rather than accepting a black-box confidence number |
| Natural abstention signal | When models disagree above threshold, "needs review" is the correct answer, not a failure mode — this is [[concepts/calibrated-confidence-llm|calibrated confidence]] behaviour |
| Audit-trail granularity | Each model's raw output + confidence is logged independently; per [[concepts/agentic-provenance]], every decision step is attributable to a specific model at a specific version |

### Fails

| Risk | Mechanism |
|---|---|
| Sequential latency compounds | If models run one after another (A feeds B, B feeds C), total latency is additive. Mitigation: **parallel fan-out** — all three models called simultaneously, arbiter integrates after all three resolve |
| Correlated errors | When all three specialists share the same base model (e.g., all are Llama-3 finetunes), systematic base-model errors propagate to all three. The disagreement signal is silent because all three are wrong *in the same way* |
| Arbiter is the new failure mode | The arbiter's weighting logic is hand-engineered or learned, and if it is wrong, all three specialist models can be correct and the system still fails. The arbiter itself needs a test harness |
| Correlated training data | Models trained on overlapping corpora can have correlated factual errors even without a shared backbone — especially relevant for domain-narrow event types that are rare in open-domain training sets |

### Open Research Question

**Detecting correlated failures across small models that share a backbone** is an unsolved problem. If Model A, B, and C all finetune from the same Llama-3 checkpoint, they may each report high confidence and agree with each other on a systematically wrong classification, because the error is baked into the shared pretrained representations, not the finetune. The PoLL paper (Verga et al.) specifically recommends using models from **disjoint families** for this reason. For the Spacesharks Mission Desk, this means the classifier, scorer, and recommendation models should ideally come from different base-model lineages (e.g., Nemotron, Qwen-3, and a Mistral derivative), not all three from Llama finetunes.

---

## Spacesharks Mission Desk Application

In the [[synthesis/spacesharks-mission-desk-hackathon-plan]], the three-specialist layout maps directly onto the satellite-ops decision pipeline:

- **Classifier (Model A)** — event type labelling: launch slip, CDM alert, beacon anomaly, regulatory filing, deorbit notice. Confidence threshold gates whether the entire chain escalates or stays at "monitor."
- **Scorer (Model B)** — risk tier assignment (red / yellow / green) using the [[concepts/pc-probability-of-collision]] thresholds (Red ≥ 1×10⁻⁴, Yellow ≥ 7×10⁻⁵) and the geometric-box filter from [[concepts/screening-volume]]. Outputs a tier label + a numeric Pc estimate when a CDM is the triggering event.
- **Recommendation model (Model C)** — next-action synthesis: "monitor / manoeuvre suggestion / file STA / publish to scoreboard." Uses the structured action vocabulary defined in the mission-desk event schema.
- **Arbiter** — decides "publish recommendation" vs "monitor only" vs "needs review" based on the agreement level across A, B, C. The disagreement metric is written into the audit trail stored in the [[concepts/nemoclaw-policy-presets|NemoClaw audit log]], providing the `audit_completeness` and `denied_action_count` inputs to the scoreboard. The calibration output of this pattern — how often the arbiter's confidence tier matches actual operator outcomes — directly feeds the `calibration_per_tier` and `recommendation_acceptance_rate` metrics defined in [[concepts/spacesharks-mission-desk-evaluation-rubric]].

The [[concepts/nemoclaw]] sandbox enforces that no individual specialist model or the arbiter can take external action (outbound HTTP, file write outside `/sandbox`) without passing the policy gate, which means the ensemble's "publish recommendation" output is always an **intent** that the arbiter files to `/sandbox/drafts/`, not a live action. Governance escalation is handled by [[concepts/spacesharks-mission-desk-governance]].

---

## Operator Pitch Line

A low-cost multi-model copilot that fans out specialist reasoning in parallel, integrates it through a calibrated arbiter, and emits auditable decisions with honest confidence — instead of handing a single large model an open-ended question and hoping for the best.

---

## See Also

- [[concepts/nemoclaw]] — sandbox runtime that enforces the arbiter's publish-intent gate
- [[concepts/hermes-agent-framework]] — agent framework that orchestrates the parallel specialist fan-out
- [[concepts/nemotron]] — NVIDIA model family; candidate inference target for one or more specialist roles
- [[concepts/openclaw]] — default agent profile inside the NemoClaw sandbox
- [[concepts/domain-specific-llm-agents]] — narrow-agent philosophy underpinning role specialisation
- [[concepts/tiered-inference]] — sequential cascade pattern (sibling page; different axis than ensemble)
- [[concepts/calibrated-confidence-llm]] — calibration theory for the arbiter's confidence output (sibling page)
- [[concepts/agentic-provenance]] — per-step attribution that the ensemble's audit trail operationalises (sibling page)
- [[concepts/spacesharks-mission-desk-evaluation-rubric]] — `calibration_per_tier` and `recommendation_acceptance_rate` metrics this pattern produces
- [[concepts/spacesharks-mission-desk-governance]] — governance policy layered above the arbiter's output
- [[synthesis/spacesharks-mission-desk-hackathon-plan]] — canonical hackathon plan that this pattern serves
- [[entities/sampras]] — wiki owner and hackathon entrant
- [[entities/spacesharks-gpt]] — operator/engineering persona used in the desk's debate verb

---

## External Sources

- Wang et al. (2024). [Mixture-of-Agents Enhances Large Language Model Capabilities](https://arxiv.org/abs/2406.04692). arXiv:2406.04692. ICLR 2025.
- Verga et al. (2024). [Replacing Judges with Juries: Evaluating LLM Generations with a Panel of Diverse Models](https://arxiv.org/abs/2404.18796). arXiv:2404.18796.
- Bai et al. / Anthropic (2022). [Constitutional AI: Harmlessness from AI Feedback](https://arxiv.org/abs/2212.08073). arXiv:2212.08073.
- Anthropic (2025). [Petri: An open-source auditing tool to accelerate AI safety research](https://www.anthropic.com/research/petri-open-source-auditing).
- Wang et al. (2022). [Self-Consistency Improves Chain of Thought Reasoning in Language Models](https://arxiv.org/abs/2203.11171). arXiv:2203.11171. ICLR 2023.
- Leviathan, Kalman & Matias (2023). [Fast Inference from Transformers via Speculative Decoding](https://arxiv.org/abs/2211.17192). arXiv:2211.17192. ICML 2023.
- Chen, Zaharia & Zou (2023). [FrugalGPT: How to Use Large Language Models While Reducing Cost and Improving Performance](https://arxiv.org/abs/2305.05176). arXiv:2305.05176.
- Together AI (2024). [Together MoA — collective intelligence of open-source models](https://www.together.ai/blog/together-moa). Blog post accompanying the paper.

---
type: concept
tags: [ai-agents, llm-architecture, calibration, abstention, uncertainty-quantification, spacesharks-mission-desk, nvidia-agent-challenge-2026]
---

# Calibrated LLM Confidence and Abstention Policy

A calibrated model is one where the **stated confidence matches empirical accuracy over many predictions**: a 70%-confident output is correct approximately 70% of the time across a reference distribution. Raw LLM confidence is not calibrated by default. Softmax-max probabilities over vocabulary tokens are a proxy for generation fluency, not factual correctness; they correlate weakly with whether the model's answer is actually right. Self-reported confidence ("I'm fairly sure…") inherits the same sycophancy biases as any other chain-of-thought output. For an ops copilot that must choose between publishing a recommendation, monitoring silently, or escalating to a human operator, miscalibrated confidence causes two symmetric harms: overconfident wrong answers are acted on; underconfident right answers are suppressed.

---

## Calibration techniques

### Temperature scaling
Post-hoc single-parameter rescaling of logit magnitudes. A learned scalar T (T > 1 softens the distribution; T < 1 sharpens it) is fit on a held-out validation set to minimise negative log-likelihood. Effective, cheap at inference time (one division), and reversible. Does not change the model's ranking of outputs — only the confidence values. Canonical reference: [Guo et al., "On Calibration of Modern Neural Networks," ICML 2017](https://arxiv.org/abs/1706.04599). Limitation: a single scalar cannot fix systematic over- or under-confidence that varies by input category.

### Platt scaling and isotonic regression
Older baselines originally developed for SVM confidence scores. Platt scaling fits a logistic regression on top of raw scores; isotonic regression is a non-parametric monotone fit. Both require a labelled calibration set. Useful when the validation set is small and temperature scaling overfits, or when domain shift makes a learned scalar unreliable. Inference cost: negligible. Limitation: both assume a single scalar-valued score per prediction; they do not directly extend to multi-class or structured outputs.

### Verbalised confidence and self-evaluation prompting
Instead of reading logit probabilities, ask the model to generate a numeric confidence as part of its response, then calibrate that verbal channel. Prompting approaches include (a) asking the model "how confident are you, 0–100%?" after generating its answer, (b) having a second model pass evaluate the first model's answer, and (c) chain-of-thought elicitation of uncertainty. Canonical reference: [Tian et al., "Just Ask for Calibration," arXiv 2023](https://arxiv.org/abs/2305.14975). Follow-up work (Xiong et al. 2024, "Can LLMs Express Their Uncertainty?") finds that verbally-elicited confidence is better calibrated than softmax-based confidence on factual QA, but degrades on out-of-distribution prompts. Inference cost: one extra generation pass for the confidence token; compatible with any inference backend.

### P(IK) — "Probability of Knowing"
Train (or prompt) the model to predict the binary probability that it will answer a question correctly, before generating the answer. The model produces a scalar P(IK) score alongside its response. When P(IK) is well-calibrated, it is a reliable pre-generation abstention signal. Canonical reference: [Kadavath et al., "Language Models (Mostly) Know What They Know," arXiv 2022, Anthropic](https://arxiv.org/abs/2207.05221). Key finding: large models are better at P(IK) than small ones; the self-knowledge capability is roughly log-linear in model size. Inference cost: one forward pass for the P(IK) head (if fine-tuned) or one extra generation turn (if prompted).

### Conformal prediction for LLMs
Conformal prediction wraps any model in a distribution-free coverage guarantee: given a calibration set, it outputs a **set-valued prediction** (a subset of the output space) such that the true answer is contained with at least 1−α probability. For text generation this typically means returning a set of candidate answers whose combined probability mass covers the threshold. Canonical references: [Quach et al., "Conformal Language Modeling," ICLR 2024](https://arxiv.org/abs/2306.10193); [Kumar et al., "Conformal Prediction with Large Language Models for Multi-Choice Question Answering," arXiv 2023](https://arxiv.org/abs/2305.18404). Key property: the coverage guarantee holds without assumptions about the model or distribution — only the exchangeability of the calibration set is required. Inference cost: calibration is offline; at inference time, the conformal score function adds one forward pass. The output is wider (set-valued) rather than a single scalar confidence.

### Selective prediction / abstention
Rather than outputting a set, the model outputs **nothing** when the confidence is below a threshold. This is the selective prediction framing: define a pair (predictor, selector) where the selector decides whether to answer at all. Canonical reference: [Geifman & El-Yaniv, "Selective Prediction in Deep Neural Networks," NeurIPS 2017](https://arxiv.org/abs/1705.08500); extended to LLMs in [Ren et al., "Out-of-Distribution Detection and Selective Generation for Generative Language Models," ICLR 2023](https://arxiv.org/abs/2209.15558). The key trade-off is the **coverage-risk curve**: as the abstention threshold tightens (more abstentions), the risk (error rate on answered predictions) falls; but coverage (fraction of queries answered) also falls. Choosing the operating point on this curve is a policy decision, not a model decision.

### Brier score and reliability diagrams as evaluation tools
The **Brier score** (mean squared error between predicted probability and binary outcome) rewards calibration: a confident wrong answer is penalised proportionally to the square of the deviation from truth, so overconfident errors cost more than underconfident ones. Naive baseline: 0.25 (random binary guess). The **reliability diagram** bins predictions by stated confidence and plots observed accuracy per bin; a perfectly calibrated model lies on the diagonal. Both tools are already referenced in [[concepts/spacesharks-mission-desk-evaluation-rubric]] — cross-link for metric definitions rather than redefining them here.

---

## Abstention as a first-class output

Raw binary output (answer / no-answer) is insufficient for an operator-facing copilot. A three-class output schema is required:

| Output class | Condition | Operator effect |
|---|---|---|
| **Answer** | Confidence exceeds abstention threshold AND ensemble disagreement is below the disagreement ceiling | Recommendation published to operator queue (subject to governance policy) |
| **Abstain** | Confidence below threshold OR ensemble disagreement above ceiling | Entry logged with trigger reason; no recommendation surface; operator not paged |
| **Escalate** | High-stakes signal (e.g., Pc above Red threshold, X-class flare, SEL risk) OR confidence below threshold AND significance above threshold | Escalated to next inference tier (tiered-inference) OR flagged `needs-human-review` in the audit log |

The abstain output is not a null — it is a durable record. Every abstention is written to the event log with its `trigger_reason` (low confidence / high disagreement / contradictory evidence), its `confidence` value, and the `evidence_hash` of the inputs that caused it. This feeds the `audit_completeness` metric on the scoreboard. An agent that abstains silently is indistinguishable from an agent that never considered the event. An agent that abstains with a logged reason is auditable.

**Relationship to ensemble disagreement.** When the [[concepts/small-model-ensemble]] routing layer produces high inter-model disagreement on a prediction, that disagreement is a first-order abstention trigger independent of any single model's stated confidence. The combination of (low single-model confidence AND high disagreement) is a stronger abstention signal than either alone.

**Relationship to tiered escalation.** The tiered-inference pattern (see [[concepts/tiered-inference]]) defines multiple inference tiers of increasing cost and capability. An abstention at a lower tier does not terminate the query — it triggers promotion to the next tier. An abstention at the highest tier (Ultra-253B or equivalent) produces an **escalate** output routed to the human operator. This prevents the coverage-risk curve from collapsing to zero coverage: the agent answers whenever it can, escalates when it cannot, and never silently drops a query.

**Coverage-risk framing** (Geifman & El-Yaniv 2017): the operating point on the coverage-risk curve is a policy setting, not a fixed model property. For the Spacesharks Mission Desk, safe-mode and conjunction decisions are recall-favoured (wide coverage at the cost of some false positives); launch-slip pre-alerts are precision-favoured (higher abstention rate acceptable because FP cost is low). The abstention threshold is set per decision-verb class, not uniformly across the desk.

---

## Spacesharks Mission Desk application

Every agent output in the Mission Desk emits a four-tuple `(answer, confidence, evidence, disagreement_level)` mandated by [[concepts/spacesharks-mission-desk-event-schema]]. Calibration is evaluated on the live scoreboard via `calibration_per_tier` (hit rate within each confidence bucket) and `brier_score` — both defined in [[concepts/spacesharks-mission-desk-evaluation-rubric]], computed nightly from event schema rows with no manual curation. An abstention triggers promotion to the next inference tier (tiered-inference pattern) or a `needs-human-review` route in [[concepts/spacesharks-mission-desk-governance]]; the audit log records every abstention with its trigger reason, directly feeding the `audit_completeness` rubric metric that penalises black-box answer-dropping. On Day 1 of the hackathon build, calibration is bootstrapped from the existing CDM Red/Yellow/Green ground-truth band labels (NASA CARA thresholds documented in [[concepts/pc-probability-of-collision]]); the long-term calibration training set is the labelled lifecycle-event dataset described in [[synthesis/spacesharks-mission-desk-hackathon-plan]], which accumulates as the commercial moat. The inference routing to [[concepts/nemoclaw]]-sandboxed [[concepts/hermes-agent-framework]] via [[concepts/nemotron]] means the calibration layer is an upstream filter — miscalibrated confidence never reaches the sandbox audit log as a confident answer, because the abstain class intercepts it first.

---

## Operator pitch line

A Mission Desk agent that abstains with a logged reason is more trustworthy than one that answers everything — because every abstention is auditable evidence that the confidence threshold is real, not decorative.

---

## See also

- [[concepts/nemoclaw]]
- [[concepts/hermes-agent-framework]]
- [[concepts/small-model-ensemble]]
- [[concepts/tiered-inference]]
- [[concepts/agentic-provenance]]
- [[concepts/pc-probability-of-collision]]
- [[concepts/spacesharks-mission-desk-evaluation-rubric]]
- [[concepts/spacesharks-mission-desk-event-schema]]
- [[concepts/spacesharks-mission-desk-governance]]
- [[synthesis/spacesharks-mission-desk-hackathon-plan]]
- [[entities/sampras]]

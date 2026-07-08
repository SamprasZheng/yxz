---
type: concept
tags: [ai-agents, llm-architecture, cost-routing, model-cascade, spacesharks-mission-desk, nemoclaw, nvidia-agent-challenge-2026]
---

# Tiered Inference — Cost-Aware Model Cascade Routing

**Tiered inference** is an orchestration strategy that routes each incoming request to the cheapest model capable of answering it adequately, escalating to a more powerful (and more expensive) model only when an explicit trigger condition fires. In the owner's briefing for the [[synthesis/spacesharks-mission-desk-hackathon-plan|Spacesharks Mission Desk]], roughly 80% of satellite-ops requests are expected to stay in the lowest tier; escalation is the exception, not the default.

The decision to escalate is made *between* API calls, at the orchestrator level. This distinguishes tiered inference from three superficially similar ideas:

| Technique | Where gating happens | Unit of decision |
|---|---|---|
| **Tiered inference / model cascade** | Orchestrator, between calls | Whole request |
| **Speculative decoding** | Inside one inference call | Individual token batch |
| **Mixture-of-Experts (MoE)** | Inside the model, per forward pass | Token-level gating weight |

Speculative decoding (e.g., Medusa, draft-then-verify) is a latency optimization within a single call: a small draft model generates candidate tokens that the large verifier accepts or rejects. MoE (e.g., Nemotron 3 Nano's 31.6B-total / 3.2B-active architecture) routes computation inside the model; the caller never sees it. Neither substitutes for tiered inference at the orchestrator level.

## Published Analogues and Industry Evidence

### FrugalGPT (Chen, Zaharia, Zou — Stanford, 2023)

The canonical academic formulation. FrugalGPT implements an LLM cascade that learns which combination of models to route queries through in order to minimize cost while maintaining accuracy. Reported result: **up to 98% cost reduction** versus always calling the best single model (GPT-4 at the time), with parity or better accuracy. Published at arXiv [2305.05176](https://arxiv.org/abs/2305.05176); extended version in TMLR at [lingjiaochen.com/papers/2024_FrugalGPT_TMLR.pdf](https://lingjiaochen.com/papers/2024_FrugalGPT_TMLR.pdf).

The cascade mechanism: submit to the cheapest model; use a learned scorer to evaluate whether the answer is "good enough"; if not, escalate to the next tier. The scorer itself is trained offline on labeled query-answer pairs — which is precisely the cold-start problem for novel domains (see "Where It Fails" below).

### RouteLLM (Ong et al. — UC Berkeley / Anyscale, 2024)

A learned router rather than a cascade: for each incoming query, a classifier predicts the probability that a strong model would outperform a weak model, and a threshold α controls the quality-cost tradeoff. Published at **ICLR 2025**; headline result: a matrix-factorisation router sent only **14% of queries to the strong model** while keeping **95% of GPT-4-Turbo quality on MT Bench** — an **~85% cost reduction** (a sharper figure than the ~75% first reported; on MMLU a BERT classifier reached ~45% at comparable quality). Four router architectures evaluated: similarity-weighted ranking, matrix factorization, BERT classifier, causal-LLM classifier. Open-source at [github.com/lm-sys/RouteLLM](https://github.com/lm-sys/RouteLLM); LMSYS blog: [lmsys.org/blog/2024-07-01-routellm](https://www.lmsys.org/blog/2024-07-01-routellm/); arXiv [2406.18665](https://arxiv.org/abs/2406.18665).

Key insight: RouteLLM uses human preference data (80k Chatbot Arena battles) to train the router rather than requiring labeled task data, partially sidestepping the cold-start problem — but satellite-ops is far enough from chat-arena distribution that domain adaptation would still be needed. **Caveat carried forward:** these figures come from specific benchmark suites at a fixed quality threshold; production query distributions are typically less favourable, so treat 85% as proof the technique works, not the number a deployment will hit.

### Routing benchmarks matured (2024→2026)

The field acquired standard benchmarks, which is the tell that routing crossed from technique to infrastructure: **ROUTERBENCH** (arXiv [2403.12031](https://arxiv.org/pdf/2403.12031), 2024, ~8 datasets/early-gen models) → **LLMRouterBench** (arXiv [2601.07206](https://arxiv.org/abs/2601.07206), 2026 — **400K+ instances, 21 datasets, 33 models**) and **RouterArena** (arXiv [2510.00202](https://arxiv.org/html/2510.00202v1), 2025, open comparison platform). Martian introduced the original **RouterBench** as a commercial anchor.

### Routing became a product default (2025)

By 2025 tiered routing stopped being a bolt-on: **GPT-5 shipped with a built-in router** that silently selects reasoning depth per query, and **OpenRouter's Auto Router (powered by NotDiamond)** exposes a `cost_quality_tradeoff` dial (0 = always most capable → 10 = always cheapest, default 7) at no surcharge. The orchestrator-level cascade this page describes is now, in large part, absorbed *into* the model endpoint — which raises the design question for an ops desk: build your own auditable cascade (tier + reason logged to [[concepts/agentic-provenance]]) or inherit an opaque vendor router you cannot attest. For a provenance-first desk, the auditable self-built cascade wins despite the extra engineering.

### Martian Model Router (commercial, 2023–)

A commercial routing service that claims up to 98% cost savings by dynamically routing any prompt to the best-value model across providers. Accenture invested (September 2024) and is integrating Martian into enterprise "switchboard" services. Free developer tier (2,500 req); paid metered for production. Homepage: [route.withmartian.com](https://route.withmartian.com/); TechCrunch launch coverage: [techcrunch.com/2023/11/15/martians-tool-automatically-switches-between-llms-to-reduce-costs](https://techcrunch.com/2023/11/15/martians-tool-automatically-switches-between-llms-to-reduce-costs/).

### Together AI Mixture-of-Agents (MoA, 2024)

MoA is a complementary pattern: multiple proposer models generate candidate responses in parallel, then an aggregator model synthesizes the best answer. It can be *combined* with a cascade — route cheap queries directly to a single small model, and invoke the full MoA ensemble only for hard queries. Together AI reported MoA at 65.1% on AlpacaEval 2.0 (vs GPT-4o's 57.5%) using only open-source models. Paper: [arxiv.org/abs/2406.04692](https://arxiv.org/html/2406.04692v1); Together AI blog: [together.ai/blog/together-moa](https://www.together.ai/blog/together-moa).

### Anthropic Prompt Caching + Extended Thinking Budget

A different mechanism with the same motivation: reduce average cost per query. Prompt caching stores static context (system prompt, KB chunks, tool definitions) so repeated calls pay only 0.1× the normal input-token price (vs. 1× for fresh processing); cache writes cost 1.25–2×. Extended thinking's `budget_tokens` parameter caps how much chain-of-thought reasoning Claude performs, providing a direct cost-vs-quality dial without changing the model. Not a routing decision — the same model is called, but with cheaper cached context and a capped reasoning budget. Docs: [platform.claude.com/docs/en/build-with-claude/prompt-caching](https://platform.claude.com/docs/en/build-with-claude/prompt-caching).

### OpenAI o-Series Tiered Thinking (2025)

OpenAI's o3 and o4-mini expose explicit compute tiers ("low / medium / high reasoning effort"), giving the caller the same cost-vs-quality dial as extended thinking but packaged as a first-class model parameter. o3 pricing (post-June 2025 cut): $2/M input, $8/M output. The low/medium/high reasoning tiers are essentially a built-in single-model cascade; true tiered inference would pair o4-mini (cheap tier) with o3 (escalation tier). Coverage: [openai.com/index/introducing-o3-and-o4-mini](https://openai.com/index/introducing-o3-and-o4-mini/).

### Nemotron Cost-Per-Token Reference

Current API pricing for the tier mapping (via OpenRouter, **June 2026**). The line refreshed since May 2026: NVIDIA's current family is now **Nemotron 3** (Nano 30B-A3B / Super 120B-A12B / Ultra 550B, all MoE), superseding the Nano-2-9B / Super-49B / Ultra-253B generation the earlier build assumed — the tier ladder holds, the specific SKUs moved up.

| Model (2026 line) | Input $/M | Output $/M | Notes |
|---|---|---|---|
| Nemotron Nano 9B v2 (prior gen) | $0.04 | $0.16 | Still listed; cheapest tier-1 |
| **Nemotron 3 Nano 30B A3B** | $0.05 | $0.20 | Current tier-1; free tier also available |
| Nemotron Super 49B v1.5 (prior gen) | $0.10 | $0.40 | ~48 tok/s hosted |
| **Nemotron 3 Super 120B A12B** | $0.08–0.09 | $0.45 | Current tier-2 |
| **Nemotron 3 Ultra 550B** | up to $0.50 | up to $2.20 | Current tier-3; varies by provider |

Sources: [openrouter.ai/nvidia](https://openrouter.ai/nvidia); [OpenRouter pricing 2026 guide (June update)](https://betonai.net/openrouter-pricing-2026-complete-guide-to-every-model-tier-and-hidden-cost/). The two-order-of-magnitude spread from cheapest tier-1 to tier-3 output tokens (~$0.16 → ~$2.20) is exactly the gradient the cascade exists to exploit.

## Six-region routing-ecosystem read (台美日韓中國歐洲)

Where the routing layer's R&D and commercial supply live — and why the geography matters for a cascade's economics:

| Region | Position | Evidence |
|---|---|---|
| **US** | **Leads** research *and* commercial routing | FrugalGPT (Stanford), RouteLLM (Berkeley/Anyscale, ICLR 2025), Martian/RouterBench, NotDiamond, OpenRouter Auto Router, **GPT-5 built-in router** — routing became a default product feature here first |
| **China** | Makes cascades *economically dominant* from the bottom | The world's cheapest-per-token open-weight frontier (DeepSeek/Qwen/Kimi — see [[synthesis/open-weight-llm-agent-stack-six-region]]) means the tier-1 floor is near-free, so the *savings* from routing are larger where the cheap tier is Chinese-open-weight |
| **Europe** | Sovereignty-framed | Mistral's small/large split is a native two-tier ladder; routing pitched as EU-hosted cost + data-residency control |
| **Japan / Korea** | Consume + integrate | National models (tsuzumi / EXAONE / HyperCLOVA X) can seat the cheap tier for language-sovereign deployments; little native router research |
| **Taiwan** | Largely N/A at the orchestration layer | Upstream compute-supply strength ([[entities/nvidia]] via TSMC) but no domestic router ecosystem — the upstream-strong/midstream-absent pattern of [[synthesis/leo-taiwan-odc-gap]] recurring at the inference-orchestration layer |

The non-obvious point: **cheap-tier economics are set by whoever ships the cheapest capable open-weight model**, and by 2026 that is China — so the *value* a cascade extracts is partly a function of a geopolitically-contested supply. A US-frontier-only stack pays more for its tier-1 floor than a stack willing to route routine load to open-weight Chinese models, which is a policy decision, not just an engineering one.

## Long-horizon trajectory (100-year, labelled scenario)

- **Lineage:** hierarchical/cascade classifiers are decades old in ML (Viola-Jones attentional cascade, 2001); the LLM-era move is that the "cheap classifier vs expensive classifier" gate is now itself a language model. 2023 FrugalGPT → 2024 RouteLLM → 2025 GPT-5 built-in router → the cascade collapsing *into* the endpoint.
- **Forward (scenario):** as per-query capability self-assessment ([[concepts/calibrated-confidence-llm]]) improves, the orchestrator-level router and the in-model router converge — the model routes *itself* by reasoning-budget, and the external cascade survives only where **auditability** (which tier, why) is a hard requirement the vendor router cannot provide. The 100-year invariant is economic, not technical: **there is always a cost gradient across capability, so there is always a routing decision** — the open question is only whether that decision is made in an auditable orchestrator you control or an opaque endpoint you rent. For safety-critical ops (satellite conjunction, launch-slip), the auditable-cascade requirement is structural and does not go away.

## Escalation Triggers

The owner's briefing identifies four triggers that promote a request from a lower tier to a higher one. Each is defined at the orchestrator level, not inside the model:

1. **Low inter-model agreement** — low consensus among a small-model ensemble (see [[concepts/small-model-ensemble]]). If two or three cheap models disagree materially on a classification or recommendation, the case is too ambiguous for the cheap tier to own.

2. **High-risk event** — a conjuction CDM carries a Red Pc (≥ 1 × 10⁻⁴; see [[concepts/pc-probability-of-collision]]) or an X-class solar flare SEP event crosses threshold. Stakes are too high for a small model's error rate.

3. **High-impact satellite** — the satellite in question belongs to a high-value asset class (e.g., flagship telecom satellite, government asset, crewed vehicle proximity). Even a routine CDM for such an asset may warrant tier-2 treatment.

4. **Threshold proximity** — the model's output sits near a decision boundary (e.g., Pc just below Red, launch-slip probability near 50%, confidence tier = medium rather than high or low). The [[concepts/calibrated-confidence-llm]] layer provides the per-token calibration signal that detects this condition.

## Where It Wins

- **Dramatic cost reduction.** FrugalGPT demonstrated 98% cost at accuracy parity; RouteLLM demonstrated >75% cost reduction on MT Bench. Both results are for general-domain tasks; satellite-ops steady-state requests (NOTAM parse, CDM triage, FCC summary) are structurally simpler than hard reasoning tasks, making the cheap-tier hit rate plausibly higher.
- **Lower latency on the common case.** Tier-1 requests (80% of load) return in the time it takes to call a 9B model, not a 49B or 253B model. For an always-on ops desk where operators watch a live feed, this is the difference between a snappy tool and a frustrating one.
- **Energy footprint reduction.** Relevant to the NVIDIA Agent Challenge 2026 24/7 operations framing: running Nemotron Nano 2 on a [[concepts/dgx-spark]] for 80% of load draws far less power than routing every request through Ultra 253B. With a DGX Spark's 128 GB unified memory ceiling, tier-2 and tier-3 models may not fit locally at all — the cascade also determines *where* the inference runs (local vs. cloud egress via [[concepts/openshell-runtime]]).

## Where It Fails

- **The router can be wrong.** A misclassified Red Pc event that stays in tier 1 is a safety incident. Over-triggering sends every borderline event to tier 3 and erodes the cost savings.
- **Escalation latency.** When a trigger fires the request must be re-issued to a larger model, doubling round-trip time. For a time-critical CDM (TCA in < 2 hours; see [[concepts/tca-time-of-closest-approach]]), this latency penalty matters.
- **Calibration is a research problem.** Setting the threshold values (when is inter-model disagreement "low enough"? what Pc delta counts as "threshold proximity"?) requires a labeled validation set. On day one of a new deployment, that set does not exist.
- **Cold-start for novel event types.** FrugalGPT's cascade scorer and RouteLLM's router both train on historical data distributions. Novel event types (new debris cloud from an anti-satellite test, a new constellation class) have no history to calibrate on; the cascade falls back to conservative tier escalation until enough examples accumulate.

## Spacesharks Mission Desk Application

In the Mission Desk architecture, tiered inference is the cost-control spine of the entire inference stack. **Tier 1** (steady-state ~80% of requests): Nemotron Nano 2 (9B v2) or Hermes-4 14B handles CDM first-pass screening, NOTAM parsing, and FCC filing summarization — tasks with well-defined schemas and low ambiguity. **Tier 2** (ambiguous cases): Nemotron Super 49B v1.5 / Hermes-4 70B is called when the tier-1 model returns a medium-confidence classification, or when the inter-model arbiter from [[concepts/small-model-ensemble]] signals low consensus. **Tier 3** (red events and high-impact assets): Nemotron Ultra 253B / Hermes-4 405B — or an external API fallback routed through the NemoClaw L7 credential proxy egress (see [[concepts/nemoclaw]]) — handles Red-Pc conjunctions, X-flare SEP events, and any crewed-vehicle proximity case. The arbiter triggers the tier escalation; the decision *and the tier used* are written to the [[concepts/agentic-provenance]] audit trail, satisfying the audit requirement: operators and judges can see exactly why a 405B-class model was invoked for a specific CDM. Local-only escalation is bounded by the **DGX Spark's 128 GB unified memory ceiling** ([[concepts/dgx-spark]]); models that exceed that footprint must egress via [[concepts/openshell-runtime]]. The [[concepts/spacesharks-mission-desk-evaluation-rubric]] tracks `escalation_rate_per_tier` and `escalation_false_positive_rate` as first-class metrics so calibration drift is visible over time.

## Operator Pitch Line

Small models handle 80% of routine satellite ops; escalation to bigger models fires only when an event smells expensive.

## See Also

- [[concepts/nemoclaw]] — sandbox and L7 credential proxy that mediates tier-3 cloud egress
- [[concepts/hermes-agent-framework]] — agent framework running inside the sandbox; drives the tier-routing logic
- [[concepts/nemotron]] — NVIDIA model family providing all three local tiers
- [[concepts/dgx-spark]] — hardware ceiling for local inference; determines where tier-3 runs
- [[concepts/openshell-runtime]] — egress path when tier-3 model lives off-box
- [[concepts/small-model-ensemble]] — ensemble that provides the inter-model agreement signal for trigger 1
- [[concepts/calibrated-confidence-llm]] — per-output confidence calibration that powers trigger 4
- [[concepts/agentic-provenance]] — audit trail that records which tier was used for each decision
- [[concepts/pc-probability-of-collision]] — the Pc thresholds driving trigger 2
- [[concepts/spacesharks-mission-desk-evaluation-rubric]] — metrics that measure cascade calibration quality
- [[synthesis/spacesharks-mission-desk-hackathon-plan]] — the broader Mission Desk plan this fits into
- [[synthesis/spacesharks-trust-stack]] — reliability architecture where tiered inference is the cost spine
- [[synthesis/open-weight-llm-agent-stack-six-region]] — the open-weight model supply that sets the cheap-tier economics
- [[entities/nvidia]] — model vendor and hackathon host
- [[entities/nous-research]] — Hermes LLM series provider for the tier stack

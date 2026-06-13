---
type: concept
tags: [trading, quant, llm, feature-engineering, alpha, sentiment, ic, rankic, structured-output, pydantic]
---

# LLM-as-Feature-Engineer

## The Core Thesis

**Demote the LLM from decision-maker to feature-engineer.**

A language model is excellent at one thing: reading unstructured text and extracting semantics. It is poor at calibrated numeric decisions, probability estimation, and arithmetic — the exact skills that money management requires. The LLM-as-Feature-Engineer pattern resolves this mismatch by giving each layer what it is good at:

| Layer | Tool | What it does |
|---|---|---|
| Text understanding | LLM (FinGPT-style) | Reads news/filings; emits a structured, continuous sentiment signal |
| Alpha combination | LightGBM / XGBoost on Qlib Alpha158 | Combines LLM sentiment column with 157 price/volume factors; learns non-linear weightings |
| Position sizing | Deterministic Python (`volatility_target.py`) | Converts alpha score to position in σ units |
| Order execution | SDK + `risk_gate.py` | Hard circuit breakers; no AI in the loop |

The LLM's output is **one alpha column in a feature matrix** — never a buy/sell verdict. This is the operating principle of the `trader` agent under `agents/src/trader/`: the analyst sub-agent never calls an order API, and all sizing is expressed in sigma units (see [[concepts/volatility-targeting]]).

This principle formalizes §1.2 of [[synthesis/ai-quant-trading-architecture-improvements]].

---

## Why "Decision-Maker" Fails, Why "Feature-Engineer" Works

### Why LLMs Fail as Direct Decision-Makers

1. **No calibrated numeric outputs**: Asked "what is the probability this stock rises 3% tomorrow?", an LLM produces a verbally plausible number with no grounding in base rates or forward-return distributions. Its "65%" and "70%" are not distinguishable in expectation. See [[concepts/calibrated-confidence-llm]].
2. **Susceptibility to framing**: Minor rephrasing of the same news item can flip the LLM's direction call. Signal is fragile.
3. **No accountability loop**: A direct "BUY / SELL" output from an LLM cannot be back-tested in a standard quant framework; there is no continuous signal to compute Information Coefficient against.
4. **Hallucinated arithmetic**: Position sizing requires floating-point arithmetic with specific precision guarantees. LLMs routinely hallucinate intermediate results under financial math pressure.
5. **Reward-hacking**: An LLM instructed to "maximize PnL" will find linguistic reasons to justify whatever position the prompt context implies — the equivalent of p-hacking in natural language.

### Why Feature-Engineering Succeeds

1. **Testable outputs**: A continuous signal $S \in [-1, 1]$ can be correlated with forward returns to produce an Information Coefficient. If IC ≤ 0 over a statistically meaningful window, the feature has no alpha and is discarded. The test is objective and model-agnostic.
2. **Separation of concerns**: The LLM does language; the gradient-boosted tree does alpha combination; the risk module does sizing. Each can be upgraded, replaced, or ablated independently.
3. **Confidence gating**: A structured output with explicit `confidence ∈ [0, 1]` enables [[concepts/calibrated-confidence-llm]]-style abstention: low-confidence observations are simply not written to the feature matrix for that time step, preventing noise injection.
4. **Provenance chain**: Each sentiment observation carries its source URL, model ID, and prompt version — enabling the [[concepts/agentic-provenance]] audit trail that lets you trace a position back to the exact headline that seeded it.

---

## The Structured Output Contract

The analyst agent **must** emit this JSON schema for every processed news item. The schema is enforced via [Instructor](https://python.useinstructor.com/) + Pydantic; invalid outputs trigger automatic retry up to 3 times; a third failure marks the item `unresolved` for human review.

```json
{
  "event_id":      "uuid4 — unique per news item",
  "source_url":    "canonical URL of the article/filing",
  "ingested_at":   "ISO-8601 UTC timestamp",
  "model_id":      "e.g. fingpt-sentiment_llama3-8b-lora",
  "prompt_version": "semver string, e.g. 1.2.0",
  "sentiment":     "float in [-1.0, 1.0]; negative = bearish, positive = bullish",
  "confidence":    "float in [0.0, 1.0]; model's self-reported certainty",
  "horizon":       "enum: intraday | 1d | 1w | 1m | unknown",
  "sectors":       ["list of affected GICS sector strings"],
  "tickers":       ["list of affected ticker symbols, if identifiable"],
  "rationale":     "1–3 sentence plain-text explanation of the sentiment assignment",
  "abstain":       "boolean; true if confidence < threshold (default 0.35)"
}
```

### Key Contract Rules

- `sentiment` is **continuous**, not a ternary. `+0.12` (mildly positive) is distinguishable from `+0.87` (strongly positive) and should produce different alpha weights downstream.
- `confidence` gates inclusion: items with `abstain: true` are written to the event log but **not** inserted into the Qlib feature matrix. This is the enforcement point for [[concepts/calibrated-confidence-llm]] in the trading context.
- `rationale` is mandatory for [[concepts/agentic-provenance]] — it is the human-readable evidence blob that ties a position decision back to its language-model reasoning. It is stored alongside the `source_url` in the provenance log.
- `horizon` prevents mixing signals of different predictive windows. A 1-month macro sentiment signal and an intraday earnings surprise signal are not additive without horizon tagging.
- The schema is **never** allowed to include order-like fields (`side`, `quantity`, `price`, `order_type`). Any LLM output containing these fields is rejected by the schema validator before it reaches the portfolio layer.

---

## Integration into the Qlib Feature Pipeline

Once validated, the sentiment event is aggregated daily per ticker into a feature column:

```python
# Pseudo-code: daily sentiment aggregation into Qlib expression
def daily_sentiment_feature(ticker: str, date: date) -> float | None:
    events = sentiment_store.query(ticker=ticker, date=date, abstain=False)
    if not events:
        return None  # NaN in the feature matrix; Qlib handles gracefully
    # Confidence-weighted average of the day's sentiment scores
    total_weight = sum(e.confidence for e in events)
    weighted_sum = sum(e.sentiment * e.confidence for e in events)
    return weighted_sum / total_weight
```

This daily scalar becomes a new expression column in the Qlib feature set alongside the built-in Alpha158 factors (e.g., `RESI5`, `WVMA5`, `RSQR5`). The combined feature matrix is then fed to a LightGBM or XGBoost model trained with [[concepts/combinatorial-purged-cross-validation]] to avoid look-ahead contamination.

**The validation gate**: before promoting the sentiment column to production, compute:

```
IC  = Spearman(sentiment_t, return_{t+1})         # next-day forward return
RankIC = Pearson(rank(sentiment_t), rank(return_{t+1}))
ICIR = mean(IC) / std(IC)                          # Information Ratio of the IC series
```

If `mean(IC)` is not statistically significantly greater than zero over the full OOS window, the LLM sentiment feature has no alpha and the investment in the LLM layer is not justified. This is TODO-B in [[synthesis/ai-quant-trading-architecture-improvements]] and the first experiment the `trader` agent is designed to run.

---

## Lineage and Related Work

### FinGPT-style Sentiment Scoring

[[entities/fingpt]] (AI4Finance Foundation, arXiv:2306.06031) pioneered the pattern: fine-tune a small LLM (LLaMA, 7–13B) with LoRA on financial news + social media datasets to produce sentiment classifications at low cost. The FinGPT v3 series achieves best-in-class scores on financial sentiment benchmarks. The limitation is the output is a **ternary class** (positive / neutral / negative); the LLM-as-Feature-Engineer pattern extends this to a continuous score by using the logit/probability output as a confidence-weighted scalar:

```
Sentiment_Signal = confidence · {+1: positive, 0: neutral, −1: negative}
```

This is exactly the formulation used in [arXiv:2510.10526](https://arxiv.org/html/2510.10526v1) where FinGPT feeds a TD3 reinforcement learning agent as one of seven observation features alongside momentum, volatility, and price-volume metrics.

### FinRobot Multi-Agent Extension

[[entities/finrobot]] (AI4Finance, arXiv:2405.14767) wraps FinGPT-style sentiment into a multi-agent platform. The "Market Forecaster" tool aggregates sentiment across multiple news sources before producing the signal. The LLM-as-Feature-Engineer pattern is compatible with FinRobot's brain layer: the structured JSON output replaces FinRobot's free-text forecast and makes the output schema-validated and testable.

### Event-Aware Sentiment Factors (2025)

[arXiv:2508.07408](https://arxiv.org/pdf/2508.07408) takes the pattern further: an LLM annotates each news item with 70+ event-category labels (Rumor/Speculation, Geopolitical Tension, Retail Investor Buzz, etc.) in addition to polarity. The per-event-type IC is computed separately, revealing that sentiment IC is **heterogeneous by event type** — some event labels have statistically significant predictive power, others do not. A baseline sentiment-only strategy achieves 8% annualized return and 5.0 Sharpe ratio. This motivates adding an `event_type` field to the structured output contract in future versions.

### PIXIU/FinMA Benchmark Caveat

[[entities/qlib]]'s Alpha158 baseline and FLARE (the FinMA evaluation suite from [[sources/finma-pixiu-benchmark-2023]]) both confirm that financial LLMs are "strong on text, weak on numerical reasoning." This is the empirical grounding for the demotion thesis: the text-understanding half should stay with the LLM; the numerical combination half should go to gradient-boosted trees or similar.

---

## Safety Guardrails

These constraints are hard-coded in the `trader` agent and cannot be overridden by any LLM output:

1. **No order fields in LLM output** — schema validation rejects any JSON containing `side`, `quantity`, `price`, `order_type`. The LLM is architecturally blind to the order API.
2. **No account balance visibility** — the LLM never receives portfolio balance, unrealized PnL, or current positions as prompt context. It only sees the news text and its own schema. This prevents the "all-in" hallucination described in §4.6 of [[synthesis/ai-quant-trading-architecture-improvements]].
3. **Confidence floor** — items with `confidence < 0.35` are abstained; items with `confidence < 0.20` are logged with a `low_quality` flag for periodic review.
4. **Rationale length cap** — `rationale` is capped at 500 characters to prevent the LLM from producing verbose justifications that might embed implicit order instructions.
5. **Retry limit** — 3 retries on schema validation failure, then `unresolved`; prevents infinite loops on malformed LLM outputs.

---

## Placement in the Three-Layer Architecture

```
[ Perception Layer ]          [ Brain Layer ]          [ Execution Layer ]
  Raw text:                     LLM outputs             Qlib / Backtrader
  - news headlines          --> structured JSON      --> Alpha158 + sentiment
  - earnings filings            (sentiment,              column --> LightGBM
  - macro releases              confidence,          --> volatility_target.py
                                horizon,             --> risk_gate.py
                                rationale)           --> order SDK
                            NO ORDER FIELDS
                            NO ACCOUNT DATA
```

The LLM is entirely within the Brain Layer perception sub-component. It cannot reach across the boundary into Execution.

---

## Validation Loop Summary

```
1. Ingest news items → LLM analyst → structured JSON
2. Schema validation (Pydantic/Instructor) → reject/retry/abstain
3. Confidence gate (abstain if conf < 0.35)
4. Daily aggregation → sentiment feature column
5. IC/RankIC vs forward returns (OOS, not IS)
6. ICIR > threshold? → promote to production feature set
7. ICIR ≤ threshold? → ablate; log as null-result; do not build further infrastructure
```

Step 7 is load-bearing: if the LLM sentiment column has no alpha, the entire event-driven bus (TODO-A in [[synthesis/ai-quant-trading-architecture-improvements]]) should not be built. The batch validation experiment comes first.

---

## Integration Points

- [[synthesis/ai-quant-trading-architecture-improvements]] — §1.2 and TODO-B; this concept is the detailed specification of the LLM feature-engineering layer described there
- [[concepts/event-driven-quant-architecture]] — the `SentimentEvent` this concept produces flows onto the event bus described there
- [[concepts/calibrated-confidence-llm]] — the `confidence` field and abstention logic map directly to the temperature-scaling / selective-prediction toolkit in that page
- [[concepts/agentic-provenance]] — `source_url` + `model_id` + `prompt_version` + `rationale` implement the data/model/decision layers of the four-layer trust model
- [[concepts/volatility-targeting]] — receives the processed alpha score; converts to position in σ units
- [[concepts/combinatorial-purged-cross-validation]] — the OOS validation framework for IC/RankIC; prevents look-ahead contamination in the validation loop
- [[concepts/small-model-ensemble]] — optional upgrade: run 3 small FinGPT-style models with different prompt personas (bullish / bearish / neutral) and majority-vote the sentiment; per §4.2 of [[synthesis/ai-quant-trading-architecture-improvements]]
- [[concepts/tiered-inference]] — routine news → local small model (7B); Fed statement / geopolitical shock → escalate to larger reasoning model
- [[concepts/domain-specific-llm-agents]] — FinGPT-style LoRA fine-tuning is a concrete instance of the narrow LLM agent pattern
- [[entities/fingpt]] — the canonical small LoRA-fine-tuned sentiment model; lineage for the analyst sub-agent
- [[entities/finrobot]] — the multi-agent platform that wraps FinGPT-style sentiment; brain-layer skeleton
- [[entities/qlib]] — the execution/backtest layer that receives the sentiment feature column; Alpha158 is the baseline to beat

## See Also

- [arXiv:2510.10526 — LLM + RL Sentiment-Driven Quant Trading (FinGPT + TD3)](https://arxiv.org/html/2510.10526v1)
- [arXiv:2508.07408 — Event-Aware Sentiment Factors from LLM-Augmented Tweets](https://arxiv.org/pdf/2508.07408)
- [Instructor library — structured outputs for LLMs](https://python.useinstructor.com/)

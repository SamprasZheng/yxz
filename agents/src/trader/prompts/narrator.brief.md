{# Jinja2 template — narrator output. Rendered to Markdown for outputs/ and wiki/synthesis/. #}
# {{ ticker }} — LLM Analyst Brief

*Generated {{ generated_at }} via [[entities/sampras]]'s `trader` agent ({{ llm_backend }}).*

## Verdict

{% if thesis.abstain %}
**Abstain.** {{ thesis.rationale }}
{% else %}
- **Direction:** {{ thesis.direction }}
- **Confidence:** {{ "%.2f"|format(thesis.confidence) }}
- **Suggested size:** {{ "%.2f"|format(thesis.sizing_sigma) }} sigma units (NOT dollars — execution layer parked for v2)
- **Horizon:** {{ thesis.horizon }}

{{ thesis.rationale }}
{% endif %}

{% if thesis.risk_flags %}
**Risk flags:** {{ thesis.risk_flags|join(", ") }}
{% endif %}

{% if thesis.contradictions %}
**Contradictions surfaced:**
{% for c in thesis.contradictions %}
- {{ c }}
{% endfor %}
{% endif %}

## Perception layer

### Price action (deterministic, no LLM)

{% if price %}
- Last close: ${{ "%.2f"|format(price.last_close) }}
- 20-day annualized vol: {{ "%.1f"|format(price.vol_20d * 100) }}%
- 60-day annualized vol: {{ "%.1f"|format(price.vol_60d * 100) }}%
- Trend: {{ price.trend }} | Regime: **{{ price.regime }}**
{% else %}
*Price data unavailable — agent ran on stub OHLCV.*
{% endif %}

### News sentiment ({{ sentiment_rows|length }} rows)

{% if sentiment_rows %}
| Headline | Sentiment | Confidence | Horizon |
|----------|-----------|------------|---------|
{% for s in sentiment_rows %}
| {{ s.rationale }} | {{ "%+.2f"|format(s.sentiment) }} | {{ "%.2f"|format(s.confidence) }} | {{ s.horizon }} |
{% endfor %}
{% else %}
*No headlines scored — news scout returned empty.*
{% endif %}

### Fundamentals

{% if fundamentals %}
- **Filing:** {{ fundamentals.filing_type or "n/a" }} filed {{ fundamentals.latest_filing_date or "?" }}
- **Confidence:** {{ "%.2f"|format(fundamentals.confidence) }}
- **Summary:** {{ fundamentals.summary }}
{% if fundamentals.key_metrics %}
- **Key metrics:**
{% for k, v in fundamentals.key_metrics.items() %}
  - {{ k }}: {{ v }}
{% endfor %}
{% endif %}
{% else %}
*No filing analysis available.*
{% endif %}

## How this was made (provenance)

This brief was produced by a multi-agent LLM pipeline; see [[concepts/agentic-provenance]] for the four-layer trust model. Per-layer attribution:

- **Deterministic (no LLM):** `price_action` (vol / trend / regime computation).
- **Executor LLM ({{ llm_backend }}):** `news_scout` (structured sentiment), `fundamentals_reader` (filing summary).
- **Planner LLM ({{ llm_backend }}):** `analyst` (combined into structured `TradeThesis`, with mandatory abstain guardrails).
- **Template, not LLM:** this very narrator output (Jinja2 from `trader/prompts/narrator.brief.md`).

The analyst was instructed (see `trader/prompts/analyst.system.md`) to **abstain** if confidence < 0.55, regime is extreme without fundamentals, or perception inputs contradict each other strongly. v1 has **no order execution path** — see plan parking lot.

## Related wiki

- [[synthesis/ai-quant-trading-architecture-improvements]] — the three-layer architecture this agent implements
- [[concepts/llm-as-feature-engineer]] — why the LLM is not allowed to be a decision-maker
- [[concepts/calibrated-confidence-llm]] — confidence threshold rationale

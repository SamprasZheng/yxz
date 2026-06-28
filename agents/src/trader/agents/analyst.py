"""Analyst — planner-tier agent. Perception inputs → TradeThesis.

Architecture role (perception → brain → execution): this is the brain. It
reads all upstream perception outputs and emits exactly one structured
`TradeThesis` per ticker.

Critically: an `abstain=True` thesis is a first-class outcome. The system
prompt in `prompts/analyst.system.md` enumerates the mandatory abstain
conditions. THIS MODULE also enforces a belt-and-suspenders abstain post-LLM
— even if the model returns abstain=False, if our hard conditions hold, we
overwrite it to abstain=True. The LLM never has the last word on safety.
"""

from __future__ import annotations

import json
from pathlib import Path
from typing import Any

from pydantic import ValidationError

from trader.llm import LLMRouter
from trader.schemas import (
    Direction,
    FundamentalsBrief,
    Horizon,
    PriceSignal,
    Regime,
    SentimentScore,
    TradeThesis,
)


_SYSTEM_PROMPT_PATH = Path(__file__).resolve().parent.parent / "prompts" / "analyst.system.md"


def run(context: dict[str, Any]) -> dict[str, Any]:
    req = context["request"]
    router: LLMRouter = context["router"]
    sentiment: list[SentimentScore] = context.get("sentiment", [])
    fundamentals: FundamentalsBrief | None = context.get("fundamentals")
    price: PriceSignal | None = context.get("price_signal")

    # Hard-coded short-circuit: if perception is completely absent, abstain
    # immediately without paying for an LLM call.
    if not sentiment and fundamentals is None and price is None:
        thesis = TradeThesis(
            ticker=req.ticker,
            direction=Direction.FLAT,
            confidence=0.0,
            sizing_sigma=0.0,
            abstain=True,
            rationale="No perception inputs were available.",
            risk_flags=["no_data"],
        )
        return {"thesis": thesis}

    thesis = _call_analyst(req.ticker, sentiment, fundamentals, price, router)
    thesis = _enforce_safety_overrides(thesis, sentiment, fundamentals, price)
    return {"thesis": thesis}


# ---------------------------------------------------------------------------
# LLM call + parse
# ---------------------------------------------------------------------------


def _call_analyst(
    ticker: str,
    sentiment: list[SentimentScore],
    fundamentals: FundamentalsBrief | None,
    price: PriceSignal | None,
    router: LLMRouter,
) -> TradeThesis:
    system_prompt = _SYSTEM_PROMPT_PATH.read_text(encoding="utf-8")
    user_payload: dict[str, Any] = {
        "ticker": ticker,
        "sentiment_rows": [s.model_dump(mode="json") for s in sentiment],
        "fundamentals": fundamentals.model_dump(mode="json") if fundamentals else None,
        "price_signal": price.model_dump(mode="json") if price else None,
    }
    messages = [
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": json.dumps(user_payload, ensure_ascii=False, default=str)},
    ]
    call = router.planner(
        messages,
        response_format={"type": "json_object"},
        max_tokens=2048,
    )

    if call.error or not call.content:
        return TradeThesis(
            ticker=ticker,
            direction=Direction.FLAT,
            confidence=0.0,
            sizing_sigma=0.0,
            abstain=True,
            rationale=f"LLM call failed: {call.error or 'empty response'}",
            risk_flags=["llm_error"],
        )

    parsed = _parse(call.content)
    if parsed is None:
        return TradeThesis(
            ticker=ticker,
            direction=Direction.FLAT,
            confidence=0.0,
            sizing_sigma=0.0,
            abstain=True,
            rationale="Planner output did not parse as JSON.",
            risk_flags=["parse_error"],
        )

    try:
        parsed["ticker"] = ticker
        return TradeThesis(**parsed)
    except ValidationError as exc:
        return TradeThesis(
            ticker=ticker,
            direction=Direction.FLAT,
            confidence=0.0,
            sizing_sigma=0.0,
            abstain=True,
            rationale=f"Planner output failed schema validation: {exc.errors()[:3]}",
            risk_flags=["schema_error"],
        )


# ---------------------------------------------------------------------------
# Safety belt — overrides the LLM if the hard abstain conditions hold
# ---------------------------------------------------------------------------


def _enforce_safety_overrides(
    thesis: TradeThesis,
    sentiment: list[SentimentScore],
    fundamentals: FundamentalsBrief | None,
    price: PriceSignal | None,
) -> TradeThesis:
    """Belt-and-suspenders abstain enforcement. The LLM does not have final say."""
    reasons: list[str] = []

    if thesis.confidence < 0.55:
        reasons.append("confidence_below_threshold")

    if price is not None and price.regime in (Regime.EXTREME, Regime.HIGH_VOL):
        if fundamentals is None or fundamentals.confidence < 0.5:
            reasons.append("high_vol_without_fundamentals")

    if not sentiment or all(s.unresolved for s in sentiment):
        reasons.append("no_resolved_sentiment")

    if fundamentals is not None and fundamentals.unresolved:
        reasons.append("fundamentals_unresolved")

    # Sentiment-trend contradiction.
    if sentiment and price is not None:
        avg_sentiment = sum(s.sentiment * s.confidence for s in sentiment if not s.unresolved)
        n = sum(1 for s in sentiment if not s.unresolved)
        if n > 0:
            avg = avg_sentiment / n
            if avg >= 0.5 and price.trend == "down":
                reasons.append("sentiment_trend_contradiction (bullish news, down trend)")
            if avg <= -0.5 and price.trend == "up":
                reasons.append("sentiment_trend_contradiction (bearish news, up trend)")

    if not reasons:
        return thesis

    # Override: force abstain, but preserve the LLM's rationale for debugging.
    merged_flags = list(dict.fromkeys(thesis.risk_flags + reasons))
    merged_contradictions = thesis.contradictions
    new_rat = thesis.rationale or ""
    if not thesis.abstain:
        new_rat = (
            "[safety override → abstain] Reasons: " + ", ".join(reasons)
            + ("\n\nOriginal LLM rationale: " + new_rat if new_rat else "")
        )
    return TradeThesis(
        ticker=thesis.ticker,
        direction=Direction.FLAT,
        confidence=thesis.confidence,
        sizing_sigma=0.0,
        horizon=thesis.horizon if isinstance(thesis.horizon, Horizon) else Horizon.MEDIUM,
        risk_flags=merged_flags,
        abstain=True,
        rationale=new_rat,
        contradictions=merged_contradictions,
    )


def _parse(content: str) -> dict[str, Any] | None:
    text = content.strip()
    if text.startswith("```"):
        lines = [ln for ln in text.splitlines() if not ln.strip().startswith("```")]
        text = "\n".join(lines).strip()
    try:
        return json.loads(text)
    except json.JSONDecodeError:
        start = text.find("{")
        end = text.rfind("}")
        if start >= 0 and end > start:
            try:
                return json.loads(text[start : end + 1])
            except json.JSONDecodeError:
                return None
        return None

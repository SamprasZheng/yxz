"""Pydantic schema contract tests — bounds, validators, round-trip."""

from __future__ import annotations

import pytest
from pydantic import ValidationError

from trader.schemas import (
    Direction,
    Horizon,
    Regime,
    ResearchRequest,
    SentimentScore,
    TradeThesis,
)


def test_research_request_uppercases_ticker() -> None:
    req = ResearchRequest(ticker="nvda")
    assert req.ticker == "NVDA"
    assert req.slug() == "nvda"


def test_research_request_rejects_invalid_ticker() -> None:
    with pytest.raises(ValidationError):
        ResearchRequest(ticker="NV DA")
    with pytest.raises(ValidationError):
        ResearchRequest(ticker="")


def test_sentiment_bounds_enforced() -> None:
    with pytest.raises(ValidationError):
        SentimentScore(event_id="x", sentiment=1.5, confidence=0.5)
    with pytest.raises(ValidationError):
        SentimentScore(event_id="x", sentiment=0.0, confidence=1.5)
    # Inside bounds is fine.
    SentimentScore(event_id="x", sentiment=-1.0, confidence=0.0)
    SentimentScore(event_id="x", sentiment=1.0, confidence=1.0)


def test_trade_thesis_abstain_round_trip() -> None:
    t = TradeThesis(
        ticker="AAPL",
        direction=Direction.FLAT,
        confidence=0.3,
        sizing_sigma=0.0,
        abstain=True,
        rationale="low confidence",
        risk_flags=["confidence_below_threshold"],
    )
    j = t.model_dump_json()
    t2 = TradeThesis.model_validate_json(j)
    assert t2.abstain is True
    assert t2.sizing_sigma == 0.0
    assert t2.direction is Direction.FLAT


def test_trade_thesis_sizing_capped() -> None:
    with pytest.raises(ValidationError):
        TradeThesis(
            ticker="AAPL",
            direction=Direction.LONG,
            confidence=0.9,
            sizing_sigma=5.0,  # > 2.0 cap
        )


def test_horizon_and_regime_enums_serialize_as_strings() -> None:
    t = TradeThesis(
        ticker="AAPL",
        direction=Direction.LONG,
        confidence=0.7,
        sizing_sigma=0.5,
        horizon=Horizon.MEDIUM,
    )
    payload = t.model_dump(mode="json")
    assert payload["horizon"] == "medium"
    assert payload["direction"] == "long"
    # Regime is on PriceSignal, but check string serialization works.
    assert Regime.HIGH_VOL.value == "high_vol"

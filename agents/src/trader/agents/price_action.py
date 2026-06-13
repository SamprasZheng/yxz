"""Deterministic price action agent — NO LLM.

Embodies the architecture synthesis rule: numerical price/vol calculations stay
in confirmed-correct Python; the LLM never gets to do floating-point math on
prices (see [[wiki/synthesis/ai-quant-trading-architecture-improvements]]
section 1.3 — "絕對不該讓 LLM 直接做浮點數計算").

Outputs a `PriceSignal` with annualized realized vol over 20 and 60 sessions,
SMA-based trend tag, and a regime label that the analyst uses as a gating
input.
"""

from __future__ import annotations

import datetime as dt
import math
from typing import Any

from trader.schemas import PriceSignal, Regime
from trader.tools import yfinance_client


# ---------------------------------------------------------------------------
# Public agent entry point
# ---------------------------------------------------------------------------


def run(context: dict[str, Any]) -> dict[str, Any]:
    """Returns `{ "price_signal": PriceSignal | None, "is_stub": bool }`."""
    req = context["request"]  # trader.schemas.ResearchRequest
    ohlcv = yfinance_client.fetch_ohlcv(req.ticker, lookback_days=90)

    closes = ohlcv["close"]
    if len(closes) < 25:
        return {"price_signal": None, "is_stub": ohlcv.get("is_stub", False), "reason": "insufficient history"}

    vol_20d = _annualized_vol(closes[-21:])
    vol_60d = _annualized_vol(closes[-61:]) if len(closes) >= 61 else vol_20d
    sma_20 = sum(closes[-20:]) / 20
    sma_60 = sum(closes[-60:]) / 60 if len(closes) >= 60 else sma_20
    last_close = closes[-1]
    trend = _trend(last_close, sma_20, sma_60)
    regime = _regime(vol_20d, vol_60d, trend)

    as_of = dt.date.fromisoformat(ohlcv["dates"][-1])
    signal = PriceSignal(
        ticker=req.ticker,
        last_close=last_close,
        vol_20d=vol_20d,
        vol_60d=vol_60d,
        sma_20=sma_20,
        sma_60=sma_60,
        trend=trend,
        regime=regime,
        as_of=as_of,
    )
    return {"price_signal": signal, "is_stub": ohlcv.get("is_stub", False)}


# ---------------------------------------------------------------------------
# Math
# ---------------------------------------------------------------------------


def _annualized_vol(closes: list[float]) -> float:
    """Std-dev of log returns × sqrt(252). Returns 0.0 on degenerate input."""
    if len(closes) < 2:
        return 0.0
    rets = [
        math.log(closes[i] / closes[i - 1])
        for i in range(1, len(closes))
        if closes[i - 1] > 0
    ]
    if not rets:
        return 0.0
    mean = sum(rets) / len(rets)
    var = sum((r - mean) ** 2 for r in rets) / max(len(rets) - 1, 1)
    return math.sqrt(var) * math.sqrt(252)


def _trend(last: float, sma_20: float, sma_60: float) -> str:
    if sma_20 > sma_60 * 1.01 and last > sma_20:
        return "up"
    if sma_20 < sma_60 * 0.99 and last < sma_20:
        return "down"
    return "flat"


def _regime(vol_20d: float, vol_60d: float, trend: str) -> Regime:
    """Coarse regime classifier.

    Thresholds picked at typical US large-cap distribution: median annualized
    vol ~22%, p75 ~32%, p95 ~55%. The numbers don't need to be perfect —
    they're a gating signal for the analyst's abstain logic.
    """
    if vol_20d > 0.55:
        return Regime.EXTREME
    if vol_20d > 0.35 or vol_20d > vol_60d * 1.5:
        return Regime.HIGH_VOL
    if trend == "up":
        return Regime.TREND_UP
    if trend == "down":
        return Regime.TREND_DOWN
    return Regime.RANGE

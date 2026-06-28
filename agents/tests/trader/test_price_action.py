"""Price action — math validation on synthetic OHLCV.

`price_action.run` is the only agent module with NO LLM dependency, so its
tests must be tight: the numbers it produces drive the analyst's regime
gate, which in turn drives the abstain decision.
"""

from __future__ import annotations

import math

from trader.agents import price_action
from trader.schemas import Regime, ResearchRequest


def test_synthetic_ohlcv_produces_well_shaped_signal() -> None:
    """The TRADER_OFFLINE stub yields 90 sessions of geometric random walk."""
    ctx = {"request": ResearchRequest(ticker="STUB")}
    out = price_action.run(ctx)
    signal = out["price_signal"]
    assert signal is not None
    # Bounds checks rather than exact values (RNG seeded by hash, but harness-stable).
    assert signal.vol_20d > 0.0
    assert signal.vol_60d > 0.0
    assert signal.last_close > 0.0
    assert signal.regime in set(Regime)
    assert signal.trend in {"up", "down", "flat"}


def test_annualized_vol_zero_on_constant_series() -> None:
    closes = [100.0] * 25
    assert price_action._annualized_vol(closes) == 0.0


def test_annualized_vol_scales_with_sqrt_252() -> None:
    """A 1% daily-stdev log-return series should annualize to ~16%."""
    # Construct a series whose log returns alternate +1% / -1% — stdev ~1%.
    closes = [100.0]
    for i in range(60):
        closes.append(closes[-1] * (math.exp(0.01 if i % 2 == 0 else -0.01)))
    vol = price_action._annualized_vol(closes)
    # 0.01 * sqrt(252) ≈ 0.1587
    assert 0.13 < vol < 0.20


def test_regime_high_vol_when_short_term_spikes() -> None:
    """vol_20d > vol_60d * 1.5 → HIGH_VOL."""
    assert price_action._regime(vol_20d=0.40, vol_60d=0.20, trend="up") in (
        Regime.HIGH_VOL,
        Regime.EXTREME,
    )


def test_regime_extreme_above_threshold() -> None:
    assert price_action._regime(vol_20d=0.60, vol_60d=0.40, trend="up") is Regime.EXTREME


def test_trend_classifier_flat_when_smas_close() -> None:
    assert price_action._trend(last=100.0, sma_20=100.05, sma_60=100.0) == "flat"

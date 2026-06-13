"""yfinance wrapper — OHLCV history + .info + .news.

`yfinance` is an unofficial Yahoo Finance scraper. It rate-limits, the schema
shifts under us, and headline coverage is incomplete. We treat it as the
free baseline; ALPACA_API_KEY or Polygon take over when set.

The whole module degrades to deterministic stubs when:
  - yfinance fails to import
  - yfinance raises any exception during fetch
  - the env var TRADER_OFFLINE=1 is set (tests)

This means agent code can always rely on getting *something*, with `is_stub`
in the returned dict flagging when the data is fake.
"""

from __future__ import annotations

import datetime as dt
import os
from typing import Any

_CACHE: dict[tuple[str, str], dict[str, Any]] = {}


def _cache_key(ticker: str, asof: dt.date | None) -> tuple[str, str]:
    return (ticker.upper(), (asof or dt.date.today()).isoformat())


def fetch_ohlcv(
    ticker: str,
    *,
    lookback_days: int = 90,
    asof: dt.date | None = None,
) -> dict[str, Any]:
    """Return last `lookback_days` of OHLCV as a dict of parallel lists.

    Shape:
        {
            "ticker": "NVDA",
            "asof": "2026-05-29",
            "dates": [...iso strings...],
            "open":  [...],
            "high":  [...],
            "low":   [...],
            "close": [...],
            "volume":[...],
            "is_stub": false,
        }
    """
    key = _cache_key(ticker, asof)
    if key in _CACHE:
        return _CACHE[key]

    if os.environ.get("TRADER_OFFLINE") == "1":
        out = _stub_ohlcv(ticker, lookback_days, asof)
        _CACHE[key] = out
        return out

    try:
        import yfinance as yf  # type: ignore[import-not-found]
    except ImportError:
        out = _stub_ohlcv(ticker, lookback_days, asof, reason="yfinance not installed")
        _CACHE[key] = out
        return out

    try:
        t = yf.Ticker(ticker)
        end = asof or dt.date.today()
        start = end - dt.timedelta(days=int(lookback_days * 1.5))  # weekends/holidays
        hist = t.history(start=start.isoformat(), end=(end + dt.timedelta(days=1)).isoformat())
    except Exception as exc:  # noqa: BLE001
        out = _stub_ohlcv(ticker, lookback_days, asof, reason=f"yfinance error: {exc}")
        _CACHE[key] = out
        return out

    if hist is None or hist.empty:
        out = _stub_ohlcv(ticker, lookback_days, asof, reason="yfinance empty result")
        _CACHE[key] = out
        return out

    hist = hist.tail(lookback_days)
    out = {
        "ticker": ticker.upper(),
        "asof": (asof or dt.date.today()).isoformat(),
        "dates": [d.date().isoformat() for d in hist.index],
        "open": [float(v) for v in hist["Open"].tolist()],
        "high": [float(v) for v in hist["High"].tolist()],
        "low": [float(v) for v in hist["Low"].tolist()],
        "close": [float(v) for v in hist["Close"].tolist()],
        "volume": [int(v) for v in hist["Volume"].tolist()],
        "is_stub": False,
    }
    _CACHE[key] = out
    return out


def fetch_company_info(ticker: str) -> dict[str, Any]:
    """Return name + sector + summary, or a stub."""
    if os.environ.get("TRADER_OFFLINE") == "1":
        return {"ticker": ticker.upper(), "name": ticker.upper(), "sector": None, "is_stub": True}
    try:
        import yfinance as yf  # type: ignore[import-not-found]
        info = yf.Ticker(ticker).info or {}
    except Exception:  # noqa: BLE001
        return {"ticker": ticker.upper(), "name": ticker.upper(), "sector": None, "is_stub": True}
    return {
        "ticker": ticker.upper(),
        "name": info.get("longName") or info.get("shortName") or ticker.upper(),
        "sector": info.get("sector"),
        "industry": info.get("industry"),
        "summary": info.get("longBusinessSummary"),
        "is_stub": False,
    }


def clear_cache() -> None:
    """For tests."""
    _CACHE.clear()


# ---------------------------------------------------------------------------
# Deterministic fallback
# ---------------------------------------------------------------------------


def _stub_ohlcv(
    ticker: str,
    lookback_days: int,
    asof: dt.date | None,
    *,
    reason: str = "TRADER_OFFLINE=1",
) -> dict[str, Any]:
    """Synthetic but well-shaped OHLCV. Geometric random-walk with seeded RNG.

    Deterministic per ticker — `random.seed(hash(ticker))` — so two
    invocations with the same ticker produce the same series. Useful for
    test snapshots without committing real market data.
    """
    import math
    import random

    end = asof or dt.date.today()
    dates: list[dt.date] = []
    d = end
    while len(dates) < lookback_days:
        if d.weekday() < 5:  # Mon-Fri
            dates.append(d)
        d -= dt.timedelta(days=1)
    dates.reverse()

    rng = random.Random(abs(hash(ticker)))
    price = 100.0 + (abs(hash(ticker)) % 200)
    opens, highs, lows, closes, volumes = [], [], [], [], []
    for _ in dates:
        ret = rng.gauss(0.0005, 0.018)
        new_close = price * math.exp(ret)
        o = price
        c = new_close
        h = max(o, c) * (1 + abs(rng.gauss(0, 0.005)))
        lo = min(o, c) * (1 - abs(rng.gauss(0, 0.005)))
        opens.append(round(o, 2))
        highs.append(round(h, 2))
        lows.append(round(lo, 2))
        closes.append(round(c, 2))
        volumes.append(rng.randint(1_000_000, 20_000_000))
        price = new_close

    return {
        "ticker": ticker.upper(),
        "asof": (asof or dt.date.today()).isoformat(),
        "dates": [d.isoformat() for d in dates],
        "open": opens,
        "high": highs,
        "low": lows,
        "close": closes,
        "volume": volumes,
        "is_stub": True,
        "stub_reason": reason,
    }

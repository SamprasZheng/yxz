"""Alpaca market-data wrapper — OPTIONAL, market data only.

v1 deliberately exposes only the market-data surface:

  - `latest_quote(ticker)`  → bid/ask snapshot
  - `latest_bar(ticker)`    → 1-min OHLCV bar

No order endpoints. No `submit_order`. No `cancel_order`. The execution
hook is parked behind an explicit interface that v1 never wires up — see
[plan: parking lot] and [[wiki/synthesis/ai-quant-trading-architecture-improvements]]
section 4.6 ("LLM 永遠不能直接呼叫下單 API").

Gated by `ALPACA_API_KEY` + `ALPACA_API_SECRET`. Install the `paper` extra:
    uv pip install -e '.[paper]'
"""

from __future__ import annotations

import os
from typing import Any


def is_available() -> bool:
    """True iff alpaca-py is importable AND credentials are set."""
    if not (os.environ.get("ALPACA_API_KEY") and os.environ.get("ALPACA_API_SECRET")):
        return False
    try:
        import alpaca  # noqa: F401  type: ignore[import-not-found]
    except ImportError:
        return False
    return True


def latest_quote(ticker: str) -> dict[str, Any] | None:
    """Return `{ bid, ask, bid_size, ask_size, timestamp }` or None if unavailable."""
    if not is_available():
        return None
    try:
        from alpaca.data.historical import StockHistoricalDataClient  # type: ignore[import-not-found]
        from alpaca.data.requests import StockLatestQuoteRequest  # type: ignore[import-not-found]
    except ImportError:
        return None

    client = StockHistoricalDataClient(
        api_key=os.environ["ALPACA_API_KEY"],
        secret_key=os.environ["ALPACA_API_SECRET"],
    )
    try:
        req = StockLatestQuoteRequest(symbol_or_symbols=[ticker.upper()])
        snap = client.get_stock_latest_quote(req)
        q = snap.get(ticker.upper())
        if q is None:
            return None
        return {
            "ticker": ticker.upper(),
            "bid": float(getattr(q, "bid_price", 0.0) or 0.0),
            "ask": float(getattr(q, "ask_price", 0.0) or 0.0),
            "bid_size": int(getattr(q, "bid_size", 0) or 0),
            "ask_size": int(getattr(q, "ask_size", 0) or 0),
            "timestamp": str(getattr(q, "timestamp", "")),
        }
    except Exception:  # noqa: BLE001
        return None


# Intentionally no submit_order / cancel_order / list_positions in v1.
# The execution_hook below is the placeholder for v2.


def execution_hook(*_a: Any, **_kw: Any) -> None:
    """v1 parking-lot stub.

    Calling this raises NotImplementedError. A v2 RL policy or paper-trading
    integration would implement a real Protocol here. Keeping the symbol so
    callers can `from trader.tools.alpaca_client import execution_hook` and
    fail loudly if they reach for it in v1.
    """
    raise NotImplementedError(
        "v1 is analysis-only. Live or paper order submission is parked for v2. "
        "See plan parking lot."
    )

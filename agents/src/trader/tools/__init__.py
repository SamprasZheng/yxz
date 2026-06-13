"""Data tools — market data, news, filings.

Each tool wraps one external source behind a small surface:

  yfinance_client  — OHLCV history + .info + .news (Yahoo, free, no key)
  newsfeed         — headline aggregator (Yahoo + RSS fallback)
  sec_edgar        — 10-K / 10-Q / 8-K filings via sec-edgar-downloader (free)
  alpaca_client    — OPTIONAL: market data only (no order endpoints in v1).
                     Gated by ALPACA_API_KEY. Install via the [paper] extra.

Every tool's primary function accepts an `asof: date | None = None` argument
and caches in-memory keyed by (symbol, asof). Tests inject the cache directly
to keep runs fully offline.
"""

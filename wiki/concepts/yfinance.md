---
type: concept
tags: [trading, market-data, yfinance, python, free-data, ohlcv, equity-research]
---

# yfinance

**yfinance** is an unofficial, community-maintained Python library that provides a convenient interface for fetching market data from Yahoo Finance's publicly available (but undocumented) APIs. It is the de facto free-tier OHLCV source for prototyping equity-analysis agents, including the `trader` agent at `agents/src/trader/`.

## Status: Unofficial and Unsupported by Yahoo

> "yfinance is **not** affiliated, endorsed, or vetted by Yahoo, Inc. It's an open-source tool that uses Yahoo's publicly available APIs, and is intended for research and educational purposes."
> — yfinance README

Yahoo Finance's own official API was decommissioned on May 15, 2017. What yfinance accesses are the internal/undocumented HTTP endpoints that power Yahoo Finance's web interface — endpoints that Yahoo can change, rate-limit, or block without notice and without regard to third-party scrapers.

- **Repository**: [github.com/ranaroussi/yfinance](https://github.com/ranaroussi/yfinance)
- **Maintainer**: Ran Aroussi (community-maintained; pull requests from the broader community)
- **Stars**: ~24K GitHub stars (as of 2026)
- **License**: Apache-2.0
- **Python**: 3.8+

## Core API

### `Ticker.history()` — OHLCV

```python
import yfinance as yf
ticker = yf.Ticker("AAPL")
df = ticker.history(period="1y", interval="1d")
```

Returns a `pandas.DataFrame` indexed by date with columns:

| Column | Description |
|--------|-------------|
| `Open` | Opening price |
| `High` | Intraday high |
| `Low` | Intraday low |
| `Close` | Adjusted close (default: `auto_adjust=True`) |
| `Volume` | Share volume |
| `Dividends` | Dividend per share (if any) |
| `Stock Splits` | Split ratio (if any) |

Key parameters:

| Parameter | Values | Notes |
|-----------|--------|-------|
| `period` | `1d 5d 1mo 3mo 6mo 1y 2y 5y 10y ytd max` | Ignored if `start`/`end` provided |
| `interval` | `1m 2m 5m 15m 30m 60m 90m 1h 1d 5d 1wk 1mo 3mo` | 1m only available for last 7 days; sub-1d only available for last 60 days |
| `start` / `end` | `YYYY-MM-DD` or `datetime` | Alternative to `period` |
| `auto_adjust` | `True` (default) | Adjusts OHLC for splits and dividends |
| `prepost` | `False` (default) | Include pre/post-market data |

### `Ticker.info` — Company Fundamentals

```python
info = ticker.info
```

Returns a large flat dictionary with company metadata and financial fundamentals. Commonly used fields:

| Key | Description |
|-----|-------------|
| `longName` | Full company name |
| `sector` | GICS sector |
| `industry` | GICS industry |
| `marketCap` | Market capitalization (USD) |
| `forwardPE` | Forward price-to-earnings ratio |
| `trailingEps` | Trailing twelve-month EPS |
| `dividendRate` | Annual dividend per share |
| `volume` | Most recent day's volume |
| `averageVolume` | 10-day average volume |
| `fiftyTwoWeekHigh` / `Low` | 52-week price range |
| `fullTimeEmployees` | Headcount |
| `longBusinessSummary` | Text description of the business |

**Caveat**: The `.info` endpoint is particularly fragile. Yahoo has changed the underlying API response structure multiple times; as of early 2024, calls to `.info` were returning errors for extended periods during Yahoo's backend changes. The dictionary key set is not stable across yfinance versions.

### `Ticker.news` — News Headlines

```python
news = ticker.news  # list of dicts
```

Returns a list of recent news items. Each dict typically contains:

| Key | Description |
|-----|-------------|
| `uuid` | Unique article identifier |
| `title` | Headline string |
| `publisher` | Source outlet name |
| `link` | URL to article on Yahoo Finance |
| `providerPublishTime` | Unix timestamp of publication |
| `type` | Article type string (e.g., `"STORY"`) |
| `thumbnail` | Nested dict with image resolutions (URL, width, height) |

The `relatedTickers` field appeared in older versions and may be absent in newer ones — this is a documented example of **schema churn**: the structure of `.news` dicts has changed across Yahoo's backend versions. Any production code that parses `.news` must defensively handle missing keys.

In the `trader` agent, `.news` headlines are passed to the LLM as a short-term sentiment signal alongside the EDGAR fundamentals context from [[entities/sec-edgar]].

## Rate Limiting and 429 Errors

Because yfinance is a scraper rather than a credentialed API client, it is subject to Yahoo Finance's IP-based rate limits:

- Yahoo tightened its limits around **early 2024**, causing even single calls like `yf.Ticker('AAPL').info` to return HTTP 429 errors.
- Around **November 2024**, users observed that after approximately 950 ticker fetches in a session, Yahoo would begin rate-limiting the IP.
- On **February 19, 2025**, a broader outage affected many users, with `ticker.history()` and `download()` returning empty data or `JSONDecodeError`.

There is no published rate-limit threshold from Yahoo — the limits are undocumented and change without notice.

**Mitigations** used in practice:
- Add `time.sleep(0.5–1.0)` between requests.
- Use `yf.download()` for batch downloads instead of per-ticker loops.
- Catch `YFRateLimitError` and implement exponential backoff with jitter.
- Cache results to disk (parquet/SQLite) to avoid re-fetching.

## Known Reliability Issues

| Issue | Description |
|-------|-------------|
| `.info` breakage | Key set changes when Yahoo changes its backend; fields go missing silently |
| `.news` schema churn | Dict key structure has changed multiple times; `relatedTickers` present/absent inconsistently |
| `financials` / `balance_sheet` / `cashflow` | These attributes have returned empty DataFrames for extended periods after Yahoo API changes |
| `JSONDecodeError` on `history()` | Yahoo backend changes cause malformed responses that yfinance cannot parse |
| No SLA | Ran Aroussi maintains the project in his spare time; no guaranteed response to breakage |

## Production Classification: Best-Effort Free Tier

yfinance is appropriate for:

- Rapid prototyping and research where data gaps are acceptable.
- Low-frequency daily/weekly data fetches where occasional failures can be retried.
- Educational and personal use (Yahoo's stated intended use).

yfinance is **not** appropriate for:

- Continuous intraday data collection.
- Mission-critical automated trading where data availability directly drives position management.
- Any commercial application (violates Yahoo's terms of service).

For production-grade market data, the [[synthesis/ai-quant-trading-architecture-improvements]] architecture notes that the free-tier stack (yfinance + [[entities/sec-edgar]]) should be treated as a starting point, with [[entities/polygon-io]] or equivalent as the upgrade path once the agent has demonstrated alpha.

## Relation to [[entities/sec-edgar]]

yfinance and [[entities/sec-edgar]] form the complementary free-data tier of the `trader` agent:

- **yfinance**: OHLCV price history, real-time quote metadata, and news headlines — scraped from Yahoo's private backend.
- **SEC EDGAR**: Authoritative audited financial statements (10-K/10-Q/8-K) — served by the U.S. government with a published SLA-equivalent (10 req/s, stable JSON schema, permanent archiving).

EDGAR is the more reliable of the two: it is operated by a government agency, the endpoints have remained stable since their introduction, and the data is the legal record of corporate disclosures. yfinance is faster to query and covers data not in EDGAR (real-time price, news), but carries significantly more operational risk.

## See Also

- [[entities/sec-edgar]] — Authoritative fundamentals source (10-K/10-Q/8-K)
- [[sources/sec-edgar-api-2025]] — EDGAR REST API and full-text search endpoint reference
- [[synthesis/ai-quant-trading-architecture-improvements]] — Architecture: free-data tier of the `trader` agent
- [[entities/alpaca-markets]] — Broker API sibling in the same stack
- [[entities/polygon-io]] — Commercial market-data upgrade path
- [[concepts/event-driven-quant-architecture]] — System architecture consuming this data
- [[concepts/llm-as-feature-engineer]] — How yfinance news and EDGAR text become structured alpha factors

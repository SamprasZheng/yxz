---
type: source
tags: [trading, market-data, polygon, fintech, api, equity, premium-data]
title: "Polygon.io (Massive) API Documentation and polygon-api-client SDK (2025–2026)"
author: "Polygon.io / Massive (Quinton Pike)"
date: "2025-10-30"
ingested: "2026-05-29"
---

# Polygon.io (Massive) API Documentation and polygon-api-client SDK (2025–2026)

## Primary Sources

- [Massive (formerly Polygon.io) Homepage](https://massive.com/) — primary entry point post-rebrand
- [Polygon.io Docs](https://polygon.io/docs) — redirects to massive.com/docs; `api.polygon.io` base URL still active during transition
- [Pricing](https://massive.com/pricing) — tier comparison (content JS-rendered; not fully extractable at ingest time)
- [polygon-api-client GitHub](https://github.com/massive-com/client-python) — official Python SDK (migrated from polygon repo)
- [Rebrand announcement](https://massive.com/blog/polygon-is-now-massive) — October 30, 2025
- [Polygon.io $6M Series A announcement](https://www.prnewswire.com/news-releases/polygonio-announces-6m-series-a-to-fuel-the-expansion-of-its-financial-data-platform-301151515.html)

## What This Source Covers

Polygon.io's REST API and WebSocket documentation, pricing tier structure, endpoint families, and the Python SDK. Ingested at the moment of the October 2025 rebrand to Massive; supplemented by third-party reviews and comparison articles available through May 2026.

## Key Facts Extracted

### Rebrand

Polygon.io rebranded to **Massive** effective October 30, 2025:
- New domain: massive.com
- New API base: api.massive.com (parallel; api.polygon.io remains active)
- Python SDK migrated to github.com/massive-com/client-python
- All existing API keys, integrations, and accounts continue without interruption

### Company

- Founder and CEO: **Quinton Pike** (ex-Google)
- Founded: 2016–2017 (sources conflict; Crunchbase 2016; Dealroom 2017; treat as UNCONFIRMED)
- Headquarters: Atlanta, Georgia
- Funding: Seed 2019; Series A $6M, 2020; Inc. 5000 list 2022
- Mission: democratize financial market data access

### Data Coverage (confirmed at rebrand)

- Stocks: 32,345+ tickers; 350 billion+ rows since 2003
- Options: 1.67 million+ contracts; 722 billion+ rows since 2014
- Indices: S&P 500, Dow Jones, FTSE
- Forex: major currency pairs
- Crypto: major pairs

Primary strength is US equities and options. International coverage is limited.

### Pricing Tiers

**UNCONFIRMED exact current prices** — the massive.com/pricing page returned no parseable content at ingest time (JavaScript-rendered). Values below are triangulated from multiple third-party sources (AI Fin Hub April 2026, Medium review, comparison articles) and represent the last well-documented Polygon.io era prices. Verify at massive.com/pricing.

| Plan | Price/month | Data freshness | Historical depth | REST rate limit |
|---|---|---|---|---|
| Free | $0 | End-of-day only | ~2 years | 5 req/min |
| Starter | ~$29 | 15-min delayed | 5+ years | Unlimited* |
| Developer | ~$79–$100 | Real-time, full SIP | 15+ years | Unlimited* |
| Advanced | ~$199–$500 | Real-time + tick-level | Full archive from 2003 | Unlimited* |

*"Unlimited" = no quota cap; throttled by HTTP connection concurrency rather than a call count. Parallel bulk pulls can trigger connection-level throttling.

**Key confirmed facts across all sources:**
- Free tier: 5 API calls/minute hard cap; end-of-day data only
- All paid tiers: no per-call quota; unlimited API calls
- Real-time full SIP requires at minimum Developer/mid tier
- Options data (Greeks, IV, OPRA) is a **separate paid tier** not included with stock tiers
- WebSocket streaming available; delayed on Starter, real-time on Developer+

### REST Endpoint Families

Confirmed families across documentation and SDK reference:

| Endpoint family | Key data types |
|---|---|
| Stocks / Aggregates | OHLCV bars (1m, 5m, 1h, 1d, and custom) |
| Stocks / Trades | Tick-level trade prints (price, size, exchange, conditions) |
| Stocks / Quotes | NBBO bid/ask snapshots; real-time on paid tiers |
| Stocks / Snapshots | Full per-ticker snapshot (last trade, last quote, day aggregate) |
| Options / Contracts | Contract details, expiry, strike, type |
| Options / Greeks | Delta, gamma, theta, vega, IV — paid add-on tier |
| Reference / Tickers | Ticker metadata, market cap, primary exchange |
| Reference / Market Status | Is market open? Pre/post-market hours |
| Reference / Splits & Dividends | Corporate actions (dividend data completeness UNCONFIRMED — see below) |
| Indices | Daily values for S&P, Dow, FTSE |
| Forex | FX pair quotes |
| Crypto | Crypto trades and quotes |
| News | `GET /v2/reference/news` — per-ticker news with sentiment analysis summaries |
| Financials | Balance sheets, cash-flow, income statements (added post-2021) |

### WebSocket

Supports streaming for stocks, options, forex, and crypto. Real-time on Developer+ tiers; 15-minute delayed on Starter. Connection-based limit rather than a symbol-count cap (unlike Alpaca's 30-symbol free cap).

### Technical Characteristics

- Response latency: as low as 2 ms on REST calls
- Developer dashboard: full API call history, error monitoring, per-key usage tracking
- MCP server: official read-only Apache-2.0 MCP server ships with the platform; rated Grade A in the Finance MCP Directory (April 2026)
- Data format: JSON (standardized); CSV export available

### Python SDK

```bash
pip install polygon-api-client
# or post-rebrand:
pip install massive  # (verify package name at time of use)
```

Repo: [github.com/massive-com/client-python](https://github.com/massive-com/client-python)

Authentication: pass `POLYGON_API_KEY` (or `MASSIVE_API_KEY`) to the client constructor.

### Comparison vs Alpaca Data

| Dimension | Alpaca Free | Alpaca Algo Trader Plus ($99) | Polygon Developer (~$79–$100) |
|---|---|---|---|
| Equities feed | IEX only | Full SIP | Full SIP |
| Historical depth | 7+ years | 7+ years | 15+ years |
| Options data | Indicative only | Real-time OPRA | Separate tier |
| Tick-level history | No | No | Yes (Developer+) |
| Rate limit | 200/min | 10,000/min | Unlimited (connection-based) |
| WebSocket symbols | 30 max | Unlimited | Unlimited |

For the v1 `trader` agent's analysis-only use case, Alpaca free (IEX) or Algo Trader Plus is sufficient. Polygon/Massive becomes relevant when tick-level historical data, deeper historical depth (15+ years for CPCV), or separate high-quality options Greeks are needed.

## UNCONFIRMED

- Exact founding year (2016 vs 2017)
- Current pricing post-rebrand (massive.com/pricing was JS-rendered; all tier prices UNCONFIRMED; consult directly)
- Whether dividend data gaps (SPY missing 2020 dividends, reported by third-party reviewer) have been resolved
- Exact Options tier pricing (sold separately; multiple sources report different numbers; not verified at ingest)

## Related Wiki Pages

- [[entities/polygon-io]] — entity page
- [[synthesis/ai-quant-trading-architecture-improvements]] — context for Polygon as premium upgrade path
- [[entities/alpaca-markets]] — the free/lower-cost data source implemented in v1
- [[concepts/deep-lob]] — tick-level models that consume Polygon Advanced data
- [[concepts/event-driven-quant-architecture]] — where Polygon WebSocket streaming fits the pipeline

---
type: source
tags: [trading, market-data, alpaca, brokerage, api, sdk, equity]
title: "Alpaca Markets API Documentation and alpaca-py SDK (2025–2026)"
author: "Alpaca Markets / AlpacaDB Inc."
date: "2025-01-01"
ingested: "2026-05-29"
---

# Alpaca Markets API Documentation and alpaca-py SDK (2025–2026)

## Primary Sources

- [Alpaca API Documentation](https://docs.alpaca.markets/us/docs/) — official docs portal
- [About Market Data API](https://docs.alpaca.markets/us/docs/about-market-data-api) — tier comparison
- [Getting Started with Market Data API](https://docs.alpaca.markets/us/docs/getting-started-with-alpaca-market-data) — auth setup
- [alpaca-py GitHub](https://github.com/alpacahq/alpaca-py) — official Python SDK
- [alpaca-py PyPI](https://pypi.org/project/alpaca-py/) — published package
- [Alpaca MCP Server](https://github.com/alpacahq/alpaca-mcp-server) — official MCP integration

## What This Source Covers

Alpaca's developer documentation and the `alpaca-py` SDK (version 0.43.4, released April 29, 2026) for the Trading API, Market Data API, and Broker API. The ingestion focuses on the market-data surface relevant to the `trader` agent data layer.

## Key Facts Extracted

### Market Data Tiers

**Basic / Free plan ($0/month)**:
- Equities: IEX exchange only (real-time via WebSocket; 15-min delayed via REST)
- Options: indicative quotes only (not OPRA)
- Crypto: included (no key required for historical crypto data)
- WebSocket: 30 symbol subscriptions
- REST rate limit: 200 API calls/minute
- Historical depth: 7+ years

**Algo Trader Plus ($99/month)**:
- Equities: full CTA + UTP SIP feed (all US exchanges; 100% market volume)
- Options: real-time OPRA data; 1,000 options quote subscriptions
- REST rate limit: 10,000 API calls/minute
- Historical depth: 7+ years, unrestricted

**Broker API** (partner tiers, $0–~$2,000/month): five plans, 1,000–10,000 req/min; options data ~$1,000/month add-on.

### IEX vs SIP

The free feed routes to IEX (Investors Exchange LLC) — one venue. The SIP (Securities Information Processor) aggregates all 16+ US exchange feeds via CTA (NYSE-administered) and UTP (Nasdaq-administered). For large-caps, IEX mid-quote is practical for analysis; SIP is required for accurate NBBO and multi-exchange volume.

### alpaca-py SDK

Install: `pip install alpaca-py` (Python ≥ 3.8). Clients:

| Client class | Purpose |
|---|---|
| `StockHistoricalDataClient` | Historical bars, quotes, trades |
| `StockDataStream` | Real-time WebSocket equities stream |
| `CryptoHistoricalDataClient` | Historical crypto data |
| `CryptoDataStream` | Real-time crypto stream |
| `OptionHistoricalDataClient` | Historical options data |
| `OptionDataStream` | Real-time options stream |
| `NewsClient` / `NewsDataStream` | News articles with ticker association |
| `TradingClient` | Order submission and account management |
| `BrokerClient` | Multi-user brokerage infrastructure |

Authentication: `ALPACA_API_KEY` + `ALPACA_API_SECRET` passed to each client constructor (or set as environment variables).

Data response objects are convertible to pandas DataFrames via `.df` property.

### Company Facts (from documentation and public sources)

- Legal entities: Alpaca Securities LLC (FINRA/SIPC), Alpaca Crypto LLC (FinCEN NMLS #2160858)
- 2025 milestone: Alpaca Clearing joined OCC, FICC, and Nasdaq Exchange as member
- Funding: ~$320M total; investors include YC, Spark Capital, Tribe Capital, SBI Holdings, Portage Ventures
- Co-founders: Yoshi Yokokawa (CEO), Hitoshi Harada (CPO)
- Scale: 7M+ customers, 40 countries (as of early 2026)
- Paper Trading API: offered by AlpacaDB Inc.; isolated from real-money settlement; simulates live market conditions

### v1 `trader` Agent Integration

In `agents/src/trader/tools/alpaca_client.py`:
- Used for market data **only** — no order submission in v1
- `latest_quote(ticker)`: calls `StockHistoricalDataClient.get_stock_latest_quote()` → returns `{bid, ask, bid_size, ask_size, timestamp}`
- Module gated by `ALPACA_API_KEY` + `ALPACA_API_SECRET` env vars
- `execution_hook()` raises `NotImplementedError` — v1 parking-lot stub for future v2 paper/live order flow
- Install the optional paper extra: `uv pip install -e '.[paper]'`

## UNCONFIRMED

- Exact founding year (2015 vs 2018 FINRA registration); Crunchbase shows first funding October 2015
- Whether the $99/month Algo Trader Plus pricing remains current post-2026 Q1 — pricing pages are subject to change; verify at alpaca.markets/data

## Related Wiki Pages

- [[entities/alpaca-markets]] — entity page
- [[synthesis/ai-quant-trading-architecture-improvements]] — architecture context for data-only v1 use
- [[entities/polygon-io]] — premium data upgrade path
- [[concepts/yfinance]] — free fallback data source in v1

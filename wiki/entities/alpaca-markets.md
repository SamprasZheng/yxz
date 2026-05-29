---
type: entity
tags: [trading, market-data, alpaca, brokerage, fintech, api, equity]
---

# Alpaca Markets

## What It Is

Alpaca (formally AlpacaDB, Inc. / Alpaca Securities LLC) is a developer-first brokerage infrastructure company headquartered in Silicon Valley. It provides REST and WebSocket APIs for commission-free stock, options, and crypto trading, plus a standalone market-data API. The brokerage arm (Alpaca Securities LLC) is a FINRA/SIPC member and SEC-registered broker-dealer. Cryptocurrency services run through Alpaca Crypto LLC, a FinCEN-registered money services business (NMLS #2160858). In 2025, Alpaca Clearing became a member of the OCC, FICC, and Nasdaq Exchange.

## Founders and History

- Co-founders: **Yoshi Yokokawa** (CEO) and **Hitoshi Harada** (CPO).
- Yokokawa previously built an image-recognition product acquired by Kyocera Communication Systems (Japan); he describes Alpaca's long-term goal as the "AWS of Finance."
- First funding round: ~October 2015 (UNCONFIRMED exact founding year; Crunchbase shows 2015 seed; FINRA registration completed 2018).
- Total funding: ~$320 million from Y Combinator, Spark Capital, Tribe Capital, SBI Holdings, Portage Ventures, and others.
- As of early 2026: 7 million+ brokerage customers globally across 40 countries; 5 million accounts claimed.

## Products

| Product | Description |
|---|---|
| Trading API | Commission-free stock, ETF, options, crypto order submission; REST + WebSocket |
| Market Data API | Historical and real-time bars, quotes, trades, news — tiered (free IEX / paid SIP) |
| Broker API | White-label brokerage infrastructure for fintechs and robo-advisors |
| Paper Trading | Simulated environment using live market data; no real capital required |
| Options Trading | Multi-leg strategies (spreads, straddles, condors) |
| Crypto Trading | Via Alpaca Crypto LLC; included in free data tier |

Platform claims: 99.99% uptime (Jan 2026), 1.5 ms order processing, 4x intraday margin, 24/5 trading, $0 borrow fees on 5,000+ easy-to-borrow securities.

## Market Data Tiers

Alpaca offers two data subscription tiers for individual traders using the Trading API:

### Free / Basic Plan ($0/month)
- **Equities feed**: IEX exchange only (not full national SIP tape); real-time via WebSocket, 15-min delay via REST
- **Options feed**: Indicative quotes only (not OPRA)
- **Crypto**: Included; no key required for historical crypto data
- **WebSocket**: 30 symbol subscriptions maximum
- **REST rate limit**: 200 API calls/minute
- **Historical data**: 7+ years available

### Algo Trader Plus ($99/month)
- **Equities feed**: All US exchanges via CTA (NYSE-administered) + UTP (Nasdaq-administered) SIPs — 100% market volume
- **Options feed**: Real-time OPRA data
- **Crypto**: Included
- **WebSocket**: Unlimited symbol subscriptions (1,000 options quotes)
- **REST rate limit**: 10,000 API calls/minute (effectively unlimited)
- **Historical data**: 7+ years, no restrictions

### IEX vs SIP Distinction
The free IEX feed comes from the Investors Exchange LLC only — one venue out of 16+ US equity exchanges. SIP (the Securities Information Processor) consolidates all exchange feeds. For liquid large-caps, IEX mid-quote is serviceable; for multi-exchange lit liquidity, off-exchange prints, and NBBO accuracy, the SIP is required.

## Broker API (Partner Tiers)

For fintech companies building on Alpaca's Broker API, five plans exist from $0 to ~$2,000/month supporting 1,000 to 10,000 requests/minute. Options data costs an additional ~$1,000/month on Standard plans. All standard broker-tier plans provide real-time IEX or 15-minute delayed SIP.

## alpaca-py SDK

Official Python SDK: [github.com/alpacahq/alpaca-py](https://github.com/alpacahq/alpaca-py)

- Install: `pip install alpaca-py` (Python 3.8+)
- Latest release: v0.43.4 (April 29, 2026)
- Key clients:
  - `StockHistoricalDataClient` / `StockDataStream`
  - `CryptoHistoricalDataClient` / `CryptoDataStream`
  - `OptionHistoricalDataClient` / `OptionDataStream`
  - `NewsClient` / `NewsDataStream`
  - `TradingClient`
  - `BrokerClient`
- Data is convertible to pandas DataFrames.
- An official MCP server also exists at `github.com/alpacahq/alpaca-mcp-server`.

Authentication uses `ALPACA_API_KEY` + `ALPACA_API_SECRET` environment variables passed to each client constructor.

## Role in the v1 `trader` Agent

In `agents/src/trader/tools/alpaca_client.py`, Alpaca is used for **market data only** — no order execution:

- `latest_quote(ticker)` → bid/ask snapshot via `StockHistoricalDataClient`
- `latest_bar(ticker)` → 1-min OHLCV bar
- `execution_hook()` → raises `NotImplementedError`; v1 is analysis-only

The module is optional and gated by `ALPACA_API_KEY` + `ALPACA_API_SECRET` env vars (`is_available()` guard). No `submit_order`, `cancel_order`, or position management exists in v1. The execution hook is a parking-lot stub explicitly reserved for a v2 paper-trading or RL-policy integration. See [[synthesis/ai-quant-trading-architecture-improvements]] §4.6 ("LLM 永遠不能直接呼叫下單 API") for the design rationale.

The paper-trading environment is installed separately:

```
uv pip install -e '.[paper]'
```

## See Also

- [[synthesis/ai-quant-trading-architecture-improvements]] — architecture rationale; §3.1 market selection; §4.6 execution guardrails
- [[sources/alpaca-markets-docs-2025]] — source page with API documentation citations
- [[entities/polygon-io]] — premium data upgrade path; used when full SIP tape is needed
- [[concepts/yfinance]] — the free fallback data source used in v1 when Alpaca keys are absent
- [[concepts/event-driven-quant-architecture]] — where Alpaca market-data events fit the broader pipeline

---
type: entity
tags: [trading, market-data, polygon, fintech, api, equity, premium-data]
---

# Polygon.io (now Massive)

## What It Is

Polygon.io is a financial market data platform providing REST APIs and WebSocket streams for US equities, options, indices, forex, and crypto. It is positioned as a premium, developer-first data vendor — comparable in the data-layer hierarchy to Bloomberg/Refinitiv but at SaaS price points accessible to individual developers and quant teams. The platform rebranded to **Massive** (massive.com) effective **October 30, 2025**. API endpoints at `api.polygon.io` continue to work during a transition period; `api.massive.com` is the new canonical base.

## Founders and History

- **Founder and CEO**: Quinton Pike (ex-Google).
- Founded: 2016 or 2017 in Atlanta, Georgia (sources conflict; Crunchbase shows 2016, Dealroom and Clay show 2017).
- Seed funding: 2019; Series A ($6M): 2020.
- Mission: "democratize access to rich financial data — it should be a universal right, not a privilege."
- Made the Inc. 5000 list in 2022 for rapid growth.
- Rebranded to Massive in October 2025 to reflect broader market ambitions; rebrand announced ~October 2025 via press release.

## Data Coverage

As of the rebrand announcement (October 2025):

| Asset class | Coverage |
|---|---|
| Stocks | 32,345+ tickers; 350 billion+ rows since 2003 |
| Options | 1.67 million+ contracts; 722 billion+ rows since 2014 |
| Indices | S&P 500, Dow Jones, FTSE, and others |
| Forex | Major currency pairs |
| Crypto | Major pairs |

Primary focus is **US equities and options**; international coverage is limited.

## Pricing Tiers

Note: Polygon.io rebranded to Massive in October 2025. Pricing below reflects the last well-documented structure from the Polygon.io era and sources from early 2026. **Verify current pricing at massive.com/pricing** — tiers may have changed post-rebrand.

### Stocks Tiers (UNCONFIRMED exact current prices post-rebrand)

| Plan | Price | Data freshness | Historical depth | Rate limit |
|---|---|---|---|---|
| Free | $0/month | End-of-day only | ~2 years | 5 req/min |
| Starter | ~$29/month | 15-min delayed | 5+ years | Unlimited |
| Developer | ~$79–$100/month | Real-time (full SIP) | 15+ years | Unlimited |
| Advanced | ~$199–$500/month | Real-time + tick-level | Full archive | Unlimited |

Multiple third-party reviews and comparison articles as of 2026 cite different exact prices in the $29–$500 range per tier. The search result from the Massive pricing page itself returned no parseable content. **Treat all per-tier dollar figures as UNCONFIRMED until verified at massive.com/pricing.**

What is consistently confirmed across sources:
- Free tier: hard limit of **5 API calls per minute**; EOD data only; 2-year lookback
- Paid tiers: **unlimited API calls** (throttled by HTTP connection, not quota)
- Real-time full SIP tape requires at minimum the Developer/mid tier
- Options data is a **separate paid add-on** tier (not bundled with stock tiers)

### Options Tiers
Options data (Greeks, IV, real-time OPRA) is sold as a separate product. The Advanced / top-tier stocks plan does not include full options Greeks; a dedicated Options tier is required.

## Endpoint Families

REST API families (confirmed across documentation):

| Family | Examples |
|---|---|
| Stocks / Aggregates | Bars (1m/5m/1h/1d), OHLCV |
| Stocks / Trades | Tick-level trade prints |
| Stocks / Quotes | NBBO bid/ask |
| Stocks / Snapshots | Full snapshot per ticker |
| Options | Contracts, Greeks, IV, chains |
| Reference | Tickers, market status, holidays, conditions, splits, dividends |
| Indices | S&P, Dow, FTSE daily |
| Forex | Currency pair quotes |
| Crypto | Crypto trades and quotes |
| News | Per-ticker news with sentiment analysis (`GET /v2/reference/news`) |
| Financials | Balance sheets, cash-flow, income statements (announced post-2021) |

Both REST and WebSocket (real-time streaming) interfaces are available. WebSocket provides streaming on paid tiers; delayed streaming on the Starter tier.

## Technical Characteristics

- Response times as low as 2 ms for REST calls.
- Dashboard with full API call history, error monitoring, per-key usage tracking.
- SDK: official Python client at `github.com/massive-com/client-python` (migrated from `alpacahq/polygon-api-client`).
- An official MCP server (read-only, Apache-2.0) ships with the platform — rated Grade A in the Finance MCP Directory as of April 2026.
- Data format: standardized JSON; CSV export available.

## Known Limitations

- Primarily US stocks; international exchange coverage is limited.
- Dividend data has had reported reliability gaps (missing dividends from 2020 in well-known tickers such as SPY — per third-party review; UNCONFIRMED whether resolved post-rebrand).
- Options Greeks + IV require a separate higher-cost tier.
- For L2 microstructure / full order-book depth, Databento is the more realistic alternative despite higher variable cost.

## Role in the `trader` Agent

Polygon.io is **not implemented in v1** of `agents/src/trader/`. It is documented in [[synthesis/ai-quant-trading-architecture-improvements]] as the **premium data upgrade path** for when the free yfinance or free-tier Alpaca IEX data is insufficient. Specific use cases that would motivate upgrading:

1. Full SIP tape (all 16+ US exchanges) without the $99/month Alpaca Algo Trader Plus subscription
2. Tick-level historical data for DeepLOB or other microstructure models (see [[concepts/deep-lob]])
3. Real-time options Greeks and IV for volatility-targeting strategies (see architecture §1.3)
4. Higher historical depth (15+ years vs 7 years) for CPCV backtesting (see architecture §1.4)

The integration pattern would be: add `POLYGON_API_KEY` env var, install the `polygon-api-client` (or `massive` SDK), and wire a `polygon_client.py` tool analogous to the existing `alpaca_client.py`.

## See Also

- [[synthesis/ai-quant-trading-architecture-improvements]] — §3.3 data source legality/cost; §1.4 CPCV backtesting data requirements
- [[sources/polygon-io-docs-2025]] — source page with API documentation citations
- [[entities/alpaca-markets]] — the free-tier data source actually implemented in v1
- [[concepts/yfinance]] — the zero-cost fallback in v1
- [[concepts/event-driven-quant-architecture]] — where market-data feeds (Polygon WebSocket) fit the broader pipeline
- [[concepts/deep-lob]] — tick-level LOB models that would consume Polygon Advanced tick data

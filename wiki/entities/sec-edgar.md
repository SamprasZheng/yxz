---
type: entity
tags: [trading, filings, sec-edgar, fundamentals, equity-research, free-data]
---

# SEC EDGAR

**Electronic Data Gathering, Analysis, and Retrieval (EDGAR)** is the U.S. Securities and Exchange Commission's mandatory electronic filing and public-disclosure system. Every company whose securities trade publicly in the United States is required to submit periodic financial reports through EDGAR, making it the single authoritative, free source of corporate financial filings for U.S.-listed equities.

## Background

EDGAR was initiated on September 24, 1984 and became mandatory for all U.S. public companies by May 6, 1996 (foreign filers were added November 4, 2002). The system processes approximately 4,700 filings per day, serves roughly 3,000 terabytes of data to the public annually, and accommodates ~40,000 new filers per year. There is no fee, no registration, and no API key required for read access.

## Key Filing Types

| Form | Frequency | Contents |
|------|-----------|----------|
| 10-K | Annual | Audited financial statements, MD&A, risk factors |
| 10-Q | Quarterly | Unaudited interim financials, material updates |
| 8-K | Current / ad hoc | Material events: earnings, M&A, leadership changes, restatements |
| S-1 / S-11 | IPO / offering | Registration statements |
| DEF 14A | Annual | Proxy statement — executive compensation, shareholder votes |

In the context of an LLM equity-analyst agent (e.g., the `trader` agent at `agents/src/trader/`), 10-Q and 10-K filings provide the primary fundamentals context fed to the `fundamentals_reader` component, while 8-K filings surface material events in near-real-time.

## Data Access

EDGAR exposes two access paths:

1. **Full-Text Search (EFTS)** at `https://efts.sec.gov/LATEST/search-index` — keyword and phrase search across the full text of every filing since 2001 (including all exhibits), with sub-60-second indexing latency for new filings.

2. **Structured REST API** at `https://data.sec.gov/` — machine-readable JSON endpoints for company metadata, submission history, and XBRL-tagged financial facts. Documented in full at [[sources/sec-edgar-api-2025]].

## CIK — Central Index Key

Every filer is assigned a numeric CIK. When used in API URLs the CIK must be zero-padded to 10 digits:

```
CIK 320193 (Apple Inc.) → CIK0000320193
```

A full ticker-to-CIK mapping is available at `https://www.sec.gov/files/company_tickers.json`.

## Rate Limits and Fair-Access Policy

SEC EDGAR enforces a maximum of **10 requests per second per IP**. Exceeding this triggers HTTP 429 and a temporary IP block. Every request must carry a descriptive `User-Agent` header identifying the requester:

```
User-Agent: MyApp/1.0 myname@example.com
```

Requests without a valid `User-Agent` return HTTP 403. There are no daily caps, no tiered access, and no authentication tokens — the entire system is free and open.

## Relation to Other Regulatory Filing Systems

EDGAR is the SEC analog for corporate financial disclosures. It is entirely distinct from the FCC IBFS system ([[sources/fcc-ibfs-portal-2023]]), which handles radio spectrum licensing for satellite and terrestrial communications. Both are federal public-data systems with free programmatic access, but they cover different regulatory domains and different underlying statutes.

## Use in the `trader` Agent

The `trader` agent hits EDGAR directly via `httpx`, sending a polite `User-Agent` header, to retrieve the most recent 10-Q, 10-K, or 8-K document excerpt for any equity under analysis. The EFTS full-text search endpoint enables keyword queries (e.g., "revenue declined", "going concern", "supply chain risk") within the filing body, and the submissions JSON endpoint is used to identify the accession number and filing date of the latest periodic report.

## See Also

- [[sources/sec-edgar-api-2025]] — Detailed API endpoint reference, User-Agent policy, XBRL endpoints
- [[concepts/yfinance]] — Companion free-tier market-data source (OHLCV + news) for the same agent
- [[synthesis/ai-quant-trading-architecture-improvements]] — Architecture context: free-data tier of the `trader` agent
- [[entities/alpaca-markets]] — Broker API sibling in the same free-data stack
- [[entities/polygon-io]] — Commercial market-data alternative to the free tier
- [[concepts/event-driven-quant-architecture]] — System architecture that consumes EDGAR events
- [[concepts/llm-as-feature-engineer]] — How LLM-extracted EDGAR text becomes a structured alpha factor

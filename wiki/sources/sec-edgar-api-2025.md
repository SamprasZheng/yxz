---
type: source
title: "SEC EDGAR REST API & Full-Text Search — Official Documentation"
author: "U.S. Securities and Exchange Commission"
date: "2025-01-01"
ingested: "2026-05-29"
tags: [trading, filings, sec-edgar, fundamentals, api, xbrl, free-data]
---

# SEC EDGAR REST API & Full-Text Search — Official Documentation

## Source

Official documentation hosted at [https://www.sec.gov/edgar/sec-api-documentation](https://www.sec.gov/edgar/sec-api-documentation) and [https://efts.sec.gov/LATEST/search-index](https://efts.sec.gov/LATEST/search-index). The data is served by the SEC's `data.sec.gov` infrastructure.

## What This Source Documents

The SEC EDGAR machine-readable API consists of two subsystems:

1. **Structured REST API** (`data.sec.gov`) — XBRL-tagged financial facts and filing metadata in JSON.
2. **Full-Text Search (EFTS)** (`efts.sec.gov`) — full-text keyword search across every filing submitted since 2001.

Both are free, require no API key, and require no registration.

## Rate Limit and User-Agent Policy

- **Hard limit**: 10 requests per second per IP address.
- Exceeding the limit returns **HTTP 429**; the IP is temporarily blocked for approximately 10 minutes.
- A safe practice is to add at least a 0.12-second delay between requests (i.e., ~8 req/s sustained).
- Every request **must** include a descriptive `User-Agent` header. Requests without one return **HTTP 403 Forbidden**.

Acceptable format (name + contact email):

```
User-Agent: MyResearchBot/1.0 researcher@example.com
```

The SEC explicitly requests that the header identify who is making the request. Commercial scrapers that omit or spoof the header are in violation of the fair-access policy.

## Structured REST API Endpoints

All endpoints are under `https://data.sec.gov/`.

### 1. Submissions (Filing History)

```
GET https://data.sec.gov/submissions/CIK{CIK10}.json
```

Returns a JSON object with the company's filing history, including accession numbers, form types, filing dates, and document descriptions. `CIK10` is the CIK zero-padded to 10 digits.

Example (Apple Inc., CIK 320193):

```
https://data.sec.gov/submissions/CIK0000320193.json
```

The `filings.recent` sub-object contains arrays indexed by position: `accessionNumber[]`, `form[]`, `filingDate[]`, `primaryDocument[]`. Older filings are paginated into additional JSON files referenced in `filings.files[]`.

### 2. CompanyFacts (All XBRL Facts)

```
GET https://data.sec.gov/api/xbrl/companyfacts/CIK{CIK10}.json
```

Returns all XBRL-tagged financial facts for a company across every filing, organized by taxonomy and concept. This is the most data-rich single endpoint — a single call returns everything tagged under `us-gaap`, `dei`, and (for foreign filers) `ifrs-full`.

Response structure (top-level keys):

```json
{
  "cik": 320193,
  "entityName": "Apple Inc.",
  "facts": {
    "dei": { ... },
    "us-gaap": {
      "RevenueFromContractWithCustomerExcludingAssessedTax": {
        "label": "Revenue",
        "description": "...",
        "units": {
          "USD": [
            { "val": 394328000000, "accn": "...", "fy": 2022, "fp": "FY",
              "form": "10-K", "filed": "2022-10-28", "frame": "CY2022" }
          ]
        }
      }
    }
  }
}
```

### 3. CompanyConcept (Single Metric Time Series)

```
GET https://data.sec.gov/api/xbrl/companyconcept/CIK{CIK10}/{taxonomy}/{tag}.json
```

Returns a time series of one specific XBRL concept for one company. Useful when you only need a specific metric (e.g., net income over time) rather than the full companyfacts blob.

Example (Apple accounts-payable current):

```
https://data.sec.gov/api/xbrl/companyconcept/CIK0000320193/us-gaap/AccountsPayableCurrent.json
```

Common `us-gaap` concepts used in equity analysis:

| Concept Tag | Meaning |
|-------------|---------|
| `RevenueFromContractWithCustomerExcludingAssessedTax` | Net revenue |
| `NetIncomeLoss` | Net income / (loss) |
| `Assets` | Total assets |
| `Liabilities` | Total liabilities |
| `EarningsPerShareBasic` | Basic EPS |
| `CommonStockSharesOutstanding` | Shares outstanding |
| `OperatingIncomeLoss` | Operating income |
| `GrossProfit` | Gross profit |

### 4. Frames (Cross-Company Snapshot)

```
GET https://data.sec.gov/api/xbrl/frames/{taxonomy}/{tag}/{unit}/CY{YEAR}.json
```

Returns the value of one concept across all companies for a given calendar year. Useful for sector-wide screening.

Example:

```
https://data.sec.gov/api/xbrl/frames/us-gaap/EarningsPerShareBasic/USD%2Fshares/CY2023Q4I.json
```

### 5. Ticker-to-CIK Lookup

```
GET https://www.sec.gov/files/company_tickers.json
```

Returns a mapping of all public company tickers to their CIKs, names, and exchange. Suitable for building a local lookup table. Updated periodically by the SEC.

## Full-Text Search API (EFTS)

```
GET https://efts.sec.gov/LATEST/search-index
```

Indexes the full text of every EDGAR filing (including all exhibits) submitted since **2001**. New filings are indexed within 60 seconds of publication.

### Key Query Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `q` | string | Search query; supports Boolean AND/OR/NOT, exact phrases (`"going concern"`), wildcards |
| `forms` | string | Comma-separated form types to filter (e.g., `10-K,10-Q,8-K`) |
| `dateRange` | string | `custom` to enable date filtering |
| `startdt` | string | Start date `YYYY-MM-DD` (used with `dateRange=custom`) |
| `enddt` | string | End date `YYYY-MM-DD` |
| `from` | integer | Pagination offset (default 0) |
| `size` | integer | Results per page (default 10, max 100) |

Example — search for "going concern" disclosures in 10-K filings in 2024:

```
https://efts.sec.gov/LATEST/search-index?q=%22going+concern%22&forms=10-K&dateRange=custom&startdt=2024-01-01&enddt=2024-12-31
```

### Response Structure

```json
{
  "hits": {
    "total": { "value": 1234 },
    "hits": [
      {
        "_source": {
          "accession_no": "0000320193-24-000123",
          "entity_name": "...",
          "file_date": "2024-11-01",
          "form_type": "10-K",
          "period_of_report": "2024-09-28"
        }
      }
    ]
  }
}
```

The `accession_no` can be used to construct the filing document URL:

```
https://www.sec.gov/Archives/edgar/data/{CIK}/{accession_no_no_dashes}/{primary_document}
```

## Access in the `trader` Agent

The `trader` agent (at `agents/src/trader/`) uses `httpx` with a polite `User-Agent` to:

1. Query the submissions endpoint to find the accession number of the most recent 10-Q/10-K.
2. Fetch the primary document and extract the relevant text excerpt for the `fundamentals_reader`.
3. Optionally use the EFTS search endpoint to surface keyword-specific passages (e.g., "supply chain", "revenue guidance") directly from filing text.

The rate-limit budget (10 req/s) is well within reach for single-stock lookups on demand; bulk-screening of hundreds of tickers in rapid succession requires explicit throttling.

## Contrast With FCC IBFS

EDGAR handles corporate financial disclosure filings under U.S. securities law (Securities Acts of 1933/1934). The [[sources/fcc-ibfs-portal-2023]] system handles radio-spectrum licensing under the Communications Act. Both are free federal public databases with open programmatic access, but they are entirely separate systems covering entirely separate regulatory domains.

## See Also

- [[entities/sec-edgar]] — Entity page: what EDGAR is, history, CIK format, filing types
- [[concepts/yfinance]] — Companion free-tier source for OHLCV + news headlines
- [[synthesis/ai-quant-trading-architecture-improvements]] — Architecture context for the `trader` agent
- [[entities/alpaca-markets]] — Broker API used alongside these data sources
- [[entities/polygon-io]] — Commercial alternative to the free EDGAR + yfinance stack
- [[concepts/event-driven-quant-architecture]] — How filing events flow into the trading pipeline
- [[concepts/llm-as-feature-engineer]] — How LLM-parsed EDGAR text becomes a structured alpha factor

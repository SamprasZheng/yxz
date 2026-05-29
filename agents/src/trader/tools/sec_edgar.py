"""SEC EDGAR filings — latest 10-K / 10-Q / 8-K.

`sec-edgar-downloader` writes filings to disk, which is awkward for a CLI
agent. For v1 we hit the EDGAR JSON metadata endpoint directly via httpx —
no auth required, just a polite User-Agent. We pull only the most recent
filing of each type and return a short excerpt (first ~3 KB) for the LLM
to summarize — full filing parsing is deferred.

Offline mode (TRADER_OFFLINE=1) returns deterministic placeholder filings.
"""

from __future__ import annotations

import datetime as dt
import os
from typing import Any

import httpx

_UA = "yxz-trader-agent/0.1 (contact: sampras2117@gmail.com)"
_EDGAR_TICKER_LOOKUP = "https://www.sec.gov/files/company_tickers.json"
_EDGAR_SUBMISSIONS = "https://data.sec.gov/submissions/CIK{cik}.json"
_CACHE_CIK: dict[str, str] = {}


def fetch_latest_filing(ticker: str, *, form: str = "10-Q") -> dict[str, Any]:
    """Return `{ ticker, form, filed_date, accession, excerpt, is_stub }`."""
    if os.environ.get("TRADER_OFFLINE") == "1":
        return _stub_filing(ticker, form, reason="TRADER_OFFLINE=1")

    try:
        cik = _resolve_cik(ticker)
    except Exception as exc:  # noqa: BLE001
        return _stub_filing(ticker, form, reason=f"cik lookup failed: {exc}")
    if not cik:
        return _stub_filing(ticker, form, reason="ticker not in EDGAR registry")

    try:
        meta = _fetch_submissions(cik)
        accession, filed_date = _pick_latest(meta, form)
        if not accession:
            return _stub_filing(ticker, form, reason=f"no recent {form} for CIK {cik}")
        excerpt = _fetch_excerpt(cik, accession, meta)
    except Exception as exc:  # noqa: BLE001
        return _stub_filing(ticker, form, reason=f"edgar fetch error: {exc}")

    return {
        "ticker": ticker.upper(),
        "form": form,
        "filed_date": filed_date,
        "accession": accession,
        "excerpt": excerpt,
        "is_stub": False,
    }


# ---------------------------------------------------------------------------
# Internals
# ---------------------------------------------------------------------------


def _resolve_cik(ticker: str) -> str:
    upper = ticker.upper()
    if upper in _CACHE_CIK:
        return _CACHE_CIK[upper]
    with httpx.Client(headers={"User-Agent": _UA}, timeout=30.0) as client:
        resp = client.get(_EDGAR_TICKER_LOOKUP)
        resp.raise_for_status()
        registry = resp.json()
    # Registry is a dict of int-string keys → {cik_str, ticker, title}
    for entry in registry.values():
        if (entry.get("ticker") or "").upper() == upper:
            cik = str(entry.get("cik_str") or "").zfill(10)
            _CACHE_CIK[upper] = cik
            return cik
    return ""


def _fetch_submissions(cik: str) -> dict[str, Any]:
    url = _EDGAR_SUBMISSIONS.format(cik=cik)
    with httpx.Client(headers={"User-Agent": _UA}, timeout=30.0) as client:
        resp = client.get(url)
        resp.raise_for_status()
        return resp.json()


def _pick_latest(meta: dict[str, Any], form: str) -> tuple[str, str | None]:
    recent = (meta.get("filings") or {}).get("recent") or {}
    forms = recent.get("form") or []
    accessions = recent.get("accessionNumber") or []
    dates = recent.get("filingDate") or []
    for f, acc, fdate in zip(forms, accessions, dates):
        if (f or "").upper() == form.upper():
            return acc, fdate
    return "", None


def _fetch_excerpt(cik: str, accession: str, meta: dict[str, Any]) -> str:
    """Fetch the filing's primary document and trim to ~3 KB.

    v1 just returns the raw HTML/text trimmed — the LLM is asked to summarize.
    """
    cik_int = str(int(cik))
    acc_nodash = accession.replace("-", "")
    primary = _primary_doc(meta, accession)
    if not primary:
        return ""
    url = (
        f"https://www.sec.gov/Archives/edgar/data/{cik_int}/"
        f"{acc_nodash}/{primary}"
    )
    with httpx.Client(headers={"User-Agent": _UA}, timeout=60.0) as client:
        resp = client.get(url)
        resp.raise_for_status()
        text = resp.text
    # Naive HTML strip — good enough for an LLM to summarize.
    if "<" in text and ">" in text:
        text = _strip_html(text)
    return text[:3000]


def _primary_doc(meta: dict[str, Any], accession: str) -> str:
    recent = (meta.get("filings") or {}).get("recent") or {}
    accessions = recent.get("accessionNumber") or []
    primary_docs = recent.get("primaryDocument") or []
    for acc, doc in zip(accessions, primary_docs):
        if acc == accession:
            return doc or ""
    return ""


def _strip_html(html: str) -> str:
    """Very small HTML stripper — no bs4 dep needed."""
    out: list[str] = []
    depth = 0
    for ch in html:
        if ch == "<":
            depth += 1
        elif ch == ">":
            depth -= 1 if depth > 0 else 0
        elif depth == 0:
            out.append(ch)
    # Collapse whitespace.
    return " ".join("".join(out).split())


def _stub_filing(ticker: str, form: str, *, reason: str) -> dict[str, Any]:
    return {
        "ticker": ticker.upper(),
        "form": form,
        "filed_date": dt.date.today().isoformat(),
        "accession": "0000000000-00-000000",
        "excerpt": (
            f"Placeholder {form} excerpt for {ticker.upper()}. "
            f"Generated because: {reason}. "
            "Revenue and earnings figures are not available offline."
        ),
        "is_stub": True,
        "stub_reason": reason,
    }

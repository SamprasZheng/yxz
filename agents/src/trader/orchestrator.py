"""Orchestrator — runs perception → brain → narrator → wiki_writer for ONE ticker.

Architecture (matches firefly.orchestrator):
    perception tier (parallel-safe, but v1 runs them sequentially for trace
    clarity):
        - news_scout          (executor LLM)
        - fundamentals_reader (executor LLM)
        - price_action        (deterministic, no LLM)
    brain tier:
        - analyst             (planner LLM, with belt-and-suspenders abstain)
    narrator:
        - Jinja2 template (no LLM in v1; see narrator.py docstring)
    wiki_writer:
        - one synthesis page + index/log updates, unless --skip-wiki

Each perception agent's output is folded into the same `context` dict before
the analyst runs. If a perception agent errors, the orchestrator records the
error in `context["errors"]` and continues — the analyst's safety overrides
then ensure the thesis abstains.
"""

from __future__ import annotations

import datetime as dt
from pathlib import Path
from typing import Any

from trader.agents import (
    analyst as analyst_agent,
    fundamentals_reader,
    narrator,
    news_scout,
    price_action,
)
from trader.kb_loader import load_wiki
from trader.llm import LLMRouter
from trader.schemas import ResearchRequest, ResearchResult, ScanRequest, ScanResult
from trader.wiki_writer import write_synthesis


def run_research(req: ResearchRequest, *, write_to_wiki: bool = True) -> dict[str, Any]:
    """Execute the full research pipeline for ONE ticker. Returns collated dict."""
    started = dt.datetime.now(dt.UTC).isoformat()
    kb = load_wiki()
    router = LLMRouter()
    context: dict[str, Any] = {
        "request": req,
        "kb": kb,
        "router": router,
        "errors": [],
    }

    # Perception tier.
    _safe_fold(context, "news_scout", news_scout.run)
    _safe_fold(context, "fundamentals_reader", fundamentals_reader.run)
    _safe_fold(context, "price_action", price_action.run)

    # Brain tier.
    _safe_fold(context, "analyst", analyst_agent.run)

    # Narrator (Jinja2, can't really fail unless template is broken).
    brief_md = narrator.run(context)
    brief_path = Path("outputs") / f"research-{req.slug()}-{dt.date.today().isoformat()}.md"
    brief_path.parent.mkdir(parents=True, exist_ok=True)
    brief_path.write_text(brief_md, encoding="utf-8")

    # Collate into the typed result.
    result = ResearchResult(
        request=req,
        started=started,
        finished=dt.datetime.now(dt.UTC).isoformat(),
        news_items=context.get("news_items", []),
        sentiment=context.get("sentiment", []),
        fundamentals=context.get("fundamentals"),
        price_signal=context.get("price_signal"),
        thesis=context.get("thesis"),
        llm_telemetry=router.summary(),
        brief_path=str(brief_path),
    )

    if write_to_wiki:
        wiki_path = write_synthesis(
            req=req,
            thesis=result.thesis,
            brief_md=brief_md,
            backend_name=router.backend.name,
        )
        if wiki_path is not None:
            result.wiki_synthesis_path = str(wiki_path)

    payload = result.model_dump(mode="json")
    # Stash the errors list separately so the JSON shows them even though
    # ResearchResult itself doesn't declare it (forward-compat).
    if context.get("errors"):
        payload["errors"] = context["errors"]
    return payload


def run_scan(req: ScanRequest, *, write_to_wiki: bool = False) -> dict[str, Any]:
    """Run a quick per-ticker research pass for each ticker in the watchlist.

    v1 just delegates to `run_research` per ticker. A future variant could
    skip fundamentals/EDGAR to keep the scan fast.
    """
    started = dt.datetime.now(dt.UTC).isoformat()
    per_ticker: dict[str, dict[str, Any]] = {}
    for sym in req.tickers:
        rreq = ResearchRequest(
            ticker=sym, window_days=req.window_days, depth="quick"
        )
        per_ticker[sym] = run_research(rreq, write_to_wiki=write_to_wiki)
    finished = dt.datetime.now(dt.UTC).isoformat()
    return {
        "request": req.model_dump(mode="json"),
        "started": started,
        "finished": finished,
        "per_ticker": per_ticker,
    }


# ---------------------------------------------------------------------------
# Internal: safe execution of a perception agent
# ---------------------------------------------------------------------------


def _safe_fold(context: dict[str, Any], name: str, fn: Any) -> None:
    """Run `fn(context)` and merge the returned dict back into context.

    Any exception is captured into `context["errors"]` so the analyst's
    safety overrides downstream can fire (low data → abstain).
    """
    try:
        out = fn(context) or {}
    except Exception as exc:  # noqa: BLE001 — orchestrator is the catchall
        context.setdefault("errors", []).append({"agent": name, "error": str(exc)})
        return
    if isinstance(out, dict):
        for k, v in out.items():
            context[k] = v

"""End-to-end smoke — orchestrator runs to completion with stubs."""

from __future__ import annotations

from pathlib import Path

import pytest

from trader.orchestrator import run_research, run_scan
from trader.schemas import ResearchRequest, ScanRequest


def test_research_runs_end_to_end(tmp_path: Path, monkeypatch: pytest.MonkeyPatch) -> None:
    monkeypatch.chdir(tmp_path)
    req = ResearchRequest(ticker="NVDA", window_days=7, depth="standard")
    result = run_research(req, write_to_wiki=False)

    # Top-level shape — every key the CLI consumer relies on must be present.
    for key in ("request", "started", "finished", "thesis", "brief_path", "llm_telemetry"):
        assert key in result, f"missing key: {key}"

    # Stub backend forces abstain — the safety belt is exercised.
    thesis = result["thesis"]
    assert thesis is not None, "thesis must be populated even when stub"
    assert thesis["abstain"] is True, "stub backend must produce abstain"
    assert thesis["sizing_sigma"] == 0.0, "abstain implies zero sigma"
    assert thesis["direction"] == "flat"

    # Brief was written and contains the verdict.
    brief = Path(result["brief_path"]).read_text(encoding="utf-8")
    assert "NVDA" in brief
    assert "Abstain" in brief or "abstain" in brief


def test_scan_runs_per_ticker(tmp_path: Path, monkeypatch: pytest.MonkeyPatch) -> None:
    monkeypatch.chdir(tmp_path)
    req = ScanRequest(tickers=["AAPL", "MSFT"], window_days=7)
    result = run_scan(req, write_to_wiki=False)

    assert set(result["per_ticker"].keys()) == {"AAPL", "MSFT"}
    for sym, r in result["per_ticker"].items():
        assert r["thesis"]["abstain"] is True
        assert r["thesis"]["direction"] == "flat"


def test_orchestrator_does_not_touch_real_wiki(tmp_path: Path, monkeypatch: pytest.MonkeyPatch) -> None:
    """write_to_wiki=False must not return wiki_synthesis_path."""
    monkeypatch.chdir(tmp_path)
    req = ResearchRequest(ticker="TSLA")
    result = run_research(req, write_to_wiki=False)
    assert result.get("wiki_synthesis_path") is None

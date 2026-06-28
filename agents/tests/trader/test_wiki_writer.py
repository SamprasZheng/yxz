"""Wiki writer — frontmatter, index update, log append (against tmp wiki)."""

from __future__ import annotations

import datetime as dt
from pathlib import Path

import pytest

from trader.schemas import Direction, ResearchRequest, TradeThesis
from trader import wiki_writer


def _setup_tmp_wiki(tmp_path: Path) -> Path:
    """Build a minimal fake wiki tree inside tmp_path and point wiki_writer at it."""
    wiki = tmp_path / "wiki"
    (wiki / "synthesis").mkdir(parents=True)
    (wiki / "index.md").write_text("# YXZ wiki index\n\n## Sources\n\n", encoding="utf-8")
    (wiki / "log.md").write_text("# Wiki activity log\n", encoding="utf-8")
    return wiki


def test_write_synthesis_creates_page_and_updates_index(
    tmp_path: Path, monkeypatch: pytest.MonkeyPatch
) -> None:
    wiki = _setup_tmp_wiki(tmp_path)
    monkeypatch.setattr(wiki_writer, "WIKI_ROOT", wiki)
    monkeypatch.setattr(wiki_writer, "SYNTHESIS_DIR", wiki / "synthesis")
    monkeypatch.setattr(wiki_writer, "INDEX_FILE", wiki / "index.md")
    monkeypatch.setattr(wiki_writer, "LOG_FILE", wiki / "log.md")

    req = ResearchRequest(ticker="NVDA", window_days=7)
    thesis = TradeThesis(
        ticker="NVDA",
        direction=Direction.FLAT,
        confidence=0.2,
        sizing_sigma=0.0,
        abstain=True,
        rationale="test fixture",
        risk_flags=["test_run"],
    )
    path = wiki_writer.write_synthesis(
        req=req,
        thesis=thesis,
        brief_md="# Test brief\n\nbody",
        backend_name="stub",
    )
    assert path is not None
    assert path.exists()

    page = path.read_text(encoding="utf-8")
    # Frontmatter checks
    assert "type: synthesis" in page
    assert "tags: [trading, equity, llm-analyst, nvda, abstain]" in page
    assert "llm_backend: stub" in page
    assert f"date: {dt.date.today().isoformat()}" in page
    # Body
    assert "NVDA — LLM Analyst Brief" in page
    assert "# Test brief" in page

    # index.md was updated under the Trading research header.
    idx = (wiki / "index.md").read_text(encoding="utf-8")
    assert "## Trading research" in idx
    assert "synthesis/trade-nvda-" in idx
    assert "verdict: abstain" in idx

    # log.md got a research entry.
    log = (wiki / "log.md").read_text(encoding="utf-8")
    assert "research | NVDA | LLM_BACKEND=stub" in log
    assert "synthesis/trade-nvda-" in log


def test_write_synthesis_noop_when_wiki_missing(
    tmp_path: Path, monkeypatch: pytest.MonkeyPatch
) -> None:
    fake_root = tmp_path / "wiki_does_not_exist"
    monkeypatch.setattr(wiki_writer, "WIKI_ROOT", fake_root)
    monkeypatch.setattr(wiki_writer, "SYNTHESIS_DIR", fake_root / "synthesis")

    req = ResearchRequest(ticker="AAPL")
    result = wiki_writer.write_synthesis(
        req=req, thesis=None, brief_md="x", backend_name="stub"
    )
    assert result is None

"""News scout — feeds fixture headlines through the stub backend."""

from __future__ import annotations

import datetime as dt

from trader.agents import news_scout
from trader.llm import LLMRouter
from trader.schemas import NewsItem, ResearchRequest, SentimentScore


def test_news_scout_emits_sentiment_rows(monkeypatch) -> None:
    # Inject fixture headlines so we don't depend on yfinance even in offline mode.
    fixture = [
        NewsItem(
            title="NVDA reports Q4 revenue beats by 8%",
            url="https://example.invalid/nvda/1",
            published=dt.datetime.now(dt.UTC),
            source="fixture",
            summary="quarterly beat",
        ),
        NewsItem(
            title="Regulator opens probe into chip exports",
            url="https://example.invalid/nvda/2",
            published=dt.datetime.now(dt.UTC),
            source="fixture",
        ),
    ]

    def _fake_fetch(*args, **kwargs):
        return fixture

    monkeypatch.setattr(news_scout.newsfeed, "fetch_headlines", _fake_fetch)

    router = LLMRouter()
    ctx = {
        "request": ResearchRequest(ticker="NVDA", window_days=7),
        "router": router,
    }
    out = news_scout.run(ctx)
    assert "sentiment" in out
    assert out["news_items"] == fixture

    # Stub backend returns a single low-confidence row. The scout should
    # forward it AND mark the other headline as unresolved.
    sentiments = out["sentiment"]
    assert len(sentiments) >= 1
    for s in sentiments:
        assert isinstance(s, SentimentScore)
        assert -1.0 <= s.sentiment <= 1.0
        assert 0.0 <= s.confidence <= 1.0


def test_news_scout_empty_headlines_returns_empty(monkeypatch) -> None:
    monkeypatch.setattr(news_scout.newsfeed, "fetch_headlines", lambda *a, **k: [])

    router = LLMRouter()
    ctx = {
        "request": ResearchRequest(ticker="QQQ"),
        "router": router,
    }
    out = news_scout.run(ctx)
    assert out == {"news_items": [], "sentiment": []}

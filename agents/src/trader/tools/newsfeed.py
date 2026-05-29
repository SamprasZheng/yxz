"""Headline aggregator.

v1 just wraps `yfinance.Ticker.news`. Real production would layer Reuters /
Bloomberg / RSS / Google Finance on top — that's deliberately out of scope
for v1 so we don't take on news-licensing complexity before we know the
agent's structured sentiment column has any alpha (see
[[wiki/synthesis/ai-quant-trading-architecture-improvements]] section 5).

Returns a list of trader.schemas.NewsItem objects, capped at `limit`.
"""

from __future__ import annotations

import datetime as dt
import os
from typing import Any

from trader.schemas import NewsItem


def fetch_headlines(
    ticker: str,
    *,
    limit: int = 25,
    window_days: int = 7,
) -> list[NewsItem]:
    """Return up to `limit` recent headlines for `ticker`."""
    if os.environ.get("TRADER_OFFLINE") == "1":
        return _stub_headlines(ticker, limit)

    try:
        import yfinance as yf  # type: ignore[import-not-found]
    except ImportError:
        return _stub_headlines(ticker, limit)

    try:
        raw: list[dict[str, Any]] = yf.Ticker(ticker).news or []
    except Exception:  # noqa: BLE001
        return _stub_headlines(ticker, limit)

    cutoff = dt.datetime.now(dt.UTC) - dt.timedelta(days=window_days)
    items: list[NewsItem] = []
    for n in raw[:limit]:
        # yfinance schema shifts; tolerate both old (top-level) and new (nested .content) shapes.
        content = n.get("content") or n
        title = content.get("title") or n.get("title") or ""
        link = (
            (content.get("canonicalUrl") or {}).get("url")
            or content.get("url")
            or n.get("link")
            or ""
        )
        pub_str = content.get("pubDate") or n.get("providerPublishTime") or None
        published = _parse_pub(pub_str)
        if published is not None and published < cutoff:
            continue
        src = (
            (content.get("provider") or {}).get("displayName")
            or n.get("publisher")
            or None
        )
        summary = content.get("summary") or n.get("summary")
        if not title or not link:
            continue
        items.append(
            NewsItem(
                title=title,
                url=link,
                published=published,
                source=src,
                summary=summary,
            )
        )
    return items


def _parse_pub(raw: Any) -> dt.datetime | None:
    if raw is None:
        return None
    # Unix epoch int/float
    if isinstance(raw, (int, float)):
        try:
            return dt.datetime.fromtimestamp(int(raw), tz=dt.UTC)
        except (OSError, OverflowError, ValueError):
            return None
    # ISO 8601 string
    if isinstance(raw, str):
        try:
            return dt.datetime.fromisoformat(raw.replace("Z", "+00:00"))
        except ValueError:
            return None
    return None


def _stub_headlines(ticker: str, limit: int) -> list[NewsItem]:
    """A handful of deterministic placeholder headlines for offline tests."""
    now = dt.datetime.now(dt.UTC)
    base = [
        ("placeholder: quarterly results within expectations", "neutral"),
        ("placeholder: sector outlook stable", "neutral"),
        ("placeholder: minor product update announced", "mild_positive"),
    ]
    return [
        NewsItem(
            title=f"[{ticker.upper()}] {title}",
            url=f"https://example.invalid/{ticker.lower()}/{i}",
            published=now - dt.timedelta(hours=i * 6),
            source="stub",
            summary=f"Synthetic headline ({tag}) — TRADER_OFFLINE stub.",
        )
        for i, (title, tag) in enumerate(base[:limit])
    ]

"""Pydantic v2 schemas — the contract every agent reads / writes.

Design rule (from [[wiki/synthesis/ai-quant-trading-architecture-improvements]]
section 1.2): LLMs never emit free text decisions. Every perception output is
a structured object with explicit `confidence`. The analyst's `TradeThesis`
must include an `abstain` flag — if confidence is low or any risk_flag fires,
the orchestrator skips downstream sizing.

Sizing is expressed in **sigma units**, never in dollars. The execution layer
(reserved for v2) is what maps sigma units → position size via a volatility
target — keeping the LLM out of any floating-point money calculation.
"""

from __future__ import annotations

import datetime as dt
from enum import Enum
from typing import Literal, Optional

from pydantic import BaseModel, Field, field_validator


# ---------------------------------------------------------------------------
# Requests
# ---------------------------------------------------------------------------


class ResearchRequest(BaseModel):
    """A single-ticker deep-dive request."""

    ticker: str = Field(..., description="US equity ticker, uppercase (e.g. NVDA).")
    window_days: int = Field(7, ge=1, le=365, description="News lookback window.")
    depth: Literal["quick", "standard", "deep"] = "standard"

    @field_validator("ticker")
    @classmethod
    def _upper(cls, v: str) -> str:
        v = v.strip().upper()
        if not v or not all(c.isalnum() or c in "-." for c in v):
            raise ValueError(f"invalid ticker: {v!r}")
        return v

    def slug(self) -> str:
        return self.ticker.lower().replace(".", "-")


class ScanRequest(BaseModel):
    """A fast multi-ticker watchlist scan."""

    tickers: list[str] = Field(..., min_length=1, max_length=50)
    window_days: int = Field(7, ge=1, le=90)

    @field_validator("tickers")
    @classmethod
    def _upper_each(cls, v: list[str]) -> list[str]:
        return [t.strip().upper() for t in v if t.strip()]


# ---------------------------------------------------------------------------
# Perception layer outputs
# ---------------------------------------------------------------------------


class Horizon(str, Enum):
    INTRADAY = "intraday"
    SHORT = "short"      # days
    MEDIUM = "medium"    # weeks
    LONG = "long"        # quarters+


class NewsItem(BaseModel):
    """Raw headline tuple — input to news_scout."""

    title: str
    url: str
    published: Optional[dt.datetime] = None
    source: Optional[str] = None
    summary: Optional[str] = None


class SentimentScore(BaseModel):
    """news_scout output — one row per scored headline.

    Section 1.2 of the architecture synthesis: the LLM here is a *feature
    engineer*, not a decision-maker. It outputs a continuous score on [-1, 1]
    with a calibrated confidence, never a "buy/sell" verdict.
    """

    event_id: str
    sentiment: float = Field(..., ge=-1.0, le=1.0)
    confidence: float = Field(..., ge=0.0, le=1.0)
    sectors: list[str] = Field(default_factory=list)
    horizon: Horizon = Horizon.SHORT
    rationale: str = ""
    source_urls: list[str] = Field(default_factory=list)
    unresolved: bool = False  # set true if schema validation failed after retry


class FundamentalsBrief(BaseModel):
    """fundamentals_reader output — one per ticker."""

    ticker: str
    latest_filing_date: Optional[dt.date] = None
    filing_type: Optional[str] = None  # 10-K, 10-Q, 8-K
    summary: str = ""
    key_metrics: dict[str, float] = Field(default_factory=dict)
    confidence: float = Field(0.5, ge=0.0, le=1.0)
    unresolved: bool = False


class Regime(str, Enum):
    TREND_UP = "trend_up"
    TREND_DOWN = "trend_down"
    RANGE = "range"
    HIGH_VOL = "high_vol"
    EXTREME = "extreme"


class PriceSignal(BaseModel):
    """price_action output — deterministic, no LLM involved."""

    ticker: str
    last_close: float
    vol_20d: float = Field(..., description="Annualized realized vol over last 20 sessions.")
    vol_60d: float
    sma_20: float
    sma_60: float
    trend: Literal["up", "down", "flat"]
    regime: Regime
    as_of: dt.date


# ---------------------------------------------------------------------------
# Brain layer output
# ---------------------------------------------------------------------------


class Direction(str, Enum):
    LONG = "long"
    SHORT = "short"
    FLAT = "flat"


class TradeThesis(BaseModel):
    """analyst output — the planner's final structured opinion.

    `sizing_sigma` is the suggested target portfolio sigma contribution from
    this position, NOT a dollar size. The execution layer (parked) converts
    sigma → shares via volatility targeting.

    `abstain=True` is a first-class outcome. The architecture synthesis
    section 4.6 hard-codes this: low confidence or any risk_flag forces
    abstain, and the narrator surfaces it as the conclusion. The orchestrator
    must NEVER overwrite an abstain.
    """

    ticker: str
    direction: Direction
    confidence: float = Field(..., ge=0.0, le=1.0)
    sizing_sigma: float = Field(0.0, ge=0.0, le=2.0, description="Sigma units; 0 if abstain.")
    horizon: Horizon = Horizon.MEDIUM
    risk_flags: list[str] = Field(default_factory=list)
    abstain: bool = False
    rationale: str = ""
    contradictions: list[str] = Field(
        default_factory=list,
        description="Where perception inputs disagreed (e.g. bullish news + bearish trend).",
    )


# ---------------------------------------------------------------------------
# Top-level run result
# ---------------------------------------------------------------------------


class ResearchResult(BaseModel):
    """The collated payload written to outputs/research-<ticker>-<date>.json."""

    request: ResearchRequest
    started: str
    finished: Optional[str] = None
    news_items: list[NewsItem] = Field(default_factory=list)
    sentiment: list[SentimentScore] = Field(default_factory=list)
    fundamentals: Optional[FundamentalsBrief] = None
    price_signal: Optional[PriceSignal] = None
    thesis: Optional[TradeThesis] = None
    llm_telemetry: dict = Field(default_factory=dict)
    brief_path: Optional[str] = None
    wiki_synthesis_path: Optional[str] = None


class ScanResult(BaseModel):
    """The collated payload written to outputs/scan-<date>.json."""

    request: ScanRequest
    started: str
    finished: Optional[str] = None
    per_ticker: dict[str, ResearchResult] = Field(default_factory=dict)
    llm_telemetry: dict = Field(default_factory=dict)

"""Trader — US-equity LLM analyst agent (v1, analysis-only).

Embodies the three-layer "perception → brain → execution" architecture from
[[wiki/synthesis/ai-quant-trading-architecture-improvements]]:

- **Perception** (executor tier or deterministic):
    - news_scout       — news → structured SentimentScore[]
    - fundamentals_reader — EDGAR filings → FundamentalsBrief
    - price_action     — yfinance OHLCV → PriceSignal (pure Python, no LLM)
- **Brain** (planner tier):
    - analyst          — combine perception → TradeThesis with abstain guardrail
- **Execution**:
    - v1 stops at the thesis. A pluggable `execution_hook` interface is
      reserved so a later RL policy or Alpaca paper-trading client can
      drop in without re-architecting.

LLM backend selected via `LLM_BACKEND` env var:
    nemotron (default)  → NemoClaw local Ollama or NVIDIA NIM cloud
    anthropic           → Claude Opus (planner) / Haiku (executor)
    disabled            → deterministic stubs (tests, offline demos)
"""

__version__ = "0.1.0"

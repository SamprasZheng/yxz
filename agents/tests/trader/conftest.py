"""Shared fixtures — every trader test runs offline by default."""

from __future__ import annotations

import pytest


@pytest.fixture(autouse=True)
def _offline_mode(monkeypatch: pytest.MonkeyPatch) -> None:
    """Force every test to use the stub LLM backend + offline data tools.

    Setting these in conftest means no test can accidentally make a real
    network call to Yahoo, EDGAR, NIM, or Anthropic.
    """
    monkeypatch.setenv("LLM_BACKEND", "disabled")
    monkeypatch.setenv("TRADER_OFFLINE", "1")
    # Clear yfinance cache between tests so deterministic seeds are honored.
    from trader.tools import yfinance_client
    yfinance_client.clear_cache()

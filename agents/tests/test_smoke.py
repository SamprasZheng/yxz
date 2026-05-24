"""Day 1 smoke — confirm the orchestrator runs end-to-end with stubs only.

Skips wiki write-back so the test doesn't mutate real wiki files. Forces the
LLM backend to `disabled` so every agent takes its deterministic fallback path
(otherwise local-Ollama or cloud-NIM responses would make the test flaky).
"""

from __future__ import annotations

import pytest

from firefly.orchestrator import MissionRequest, run


@pytest.fixture(autouse=True)
def _disable_llm(monkeypatch: pytest.MonkeyPatch) -> None:
    monkeypatch.setenv("NEMOTRON_BACKEND", "disabled")


def test_orchestrator_runs_with_stubs() -> None:
    req = MissionRequest(from_="Taiwan", to="SSO-600km", window="30d")
    result = run(req, write_to_wiki=False)

    # Top-level shape
    for key in ("request", "orbit", "launch_opportunities", "power_thermal",
                "debris_risk", "dose_estimate", "brief_path"):
        assert key in result, f"missing key: {key}"

    # The killer agent surfaces a real-shaped orbit dict (mocked Day 1)
    orbit = result["orbit"]["orbit"]
    assert orbit["type"].startswith("SSO")
    assert orbit["altitude_km"] == 600
    assert 95 < orbit["inclination_deg"] < 100  # sun-sync band

    # The four stubs are honestly flagged
    assert result["launch_opportunities"]["mvp_stub"] is True
    assert result["power_thermal"]["mvp_stub"] is True
    assert result["debris_risk"]["mvp_stub"] is True


def test_slug_is_filesystem_safe() -> None:
    req = MissionRequest(from_="RocketLab NZ", to="SSO-500km")
    assert req.slug() == "rocketlab-nz-sso-500km"

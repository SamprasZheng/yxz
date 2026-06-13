"""Trader CLI — `trader research` and `trader scan` entry points.

Examples:

    # Offline smoke (uses stubs end-to-end)
    LLM_BACKEND=disabled TRADER_OFFLINE=1 uv run trader research \\
        --ticker AAPL --skip-wiki

    # NemoClaw local Nemotron (default)
    uv run trader research --ticker NVDA

    # Anthropic backend
    LLM_BACKEND=anthropic uv run trader research --ticker NVDA --skip-wiki

    # Multi-ticker scan, no wiki write-back
    uv run trader scan --tickers AAPL,NVDA,TSLA --window 7 --skip-wiki
"""

from __future__ import annotations

import datetime as dt
import json
from pathlib import Path
from typing import Optional

import typer
from dotenv import load_dotenv

from trader.orchestrator import run_research, run_scan
from trader.schemas import ResearchRequest, ScanRequest


load_dotenv()

app = typer.Typer(
    name="trader",
    help="US-equity LLM analyst agent — analysis only, no orders (v1).",
    no_args_is_help=True,
    add_completion=False,
)


@app.command()
def research(
    ticker: str = typer.Option(..., "--ticker", "-t", help="US equity ticker (e.g. NVDA)."),
    window: int = typer.Option(7, "--window", "-w", help="News lookback in days."),
    depth: str = typer.Option("standard", "--depth", help="quick | standard | deep"),
    out: Optional[Path] = typer.Option(
        None, "--out", help="JSON output path. Default: outputs/research-<ticker>-<date>.json"
    ),
    skip_wiki: bool = typer.Option(False, "--skip-wiki", help="Don't write back to wiki/synthesis/."),
) -> None:
    """Run the full LLM analyst pipeline for ONE ticker."""
    req = ResearchRequest(ticker=ticker, window_days=window, depth=depth)
    result = run_research(req, write_to_wiki=not skip_wiki)

    if out is None:
        out = Path("outputs") / f"research-{req.slug()}-{dt.date.today().isoformat()}.json"
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(json.dumps(result, indent=2, ensure_ascii=False, default=str), encoding="utf-8")

    typer.echo(f"[trader] JSON  → {out}")
    if result.get("brief_path"):
        typer.echo(f"[trader] Brief → {result['brief_path']}")
    if result.get("wiki_synthesis_path"):
        typer.echo(f"[trader] Wiki  → {result['wiki_synthesis_path']}")
    thesis = result.get("thesis") or {}
    if thesis.get("abstain"):
        typer.secho(
            f"[trader] Verdict: ABSTAIN  (confidence {thesis.get('confidence', 0):.2f})",
            fg=typer.colors.YELLOW,
        )
    elif thesis:
        typer.secho(
            f"[trader] Verdict: {thesis.get('direction', '?').upper()}  "
            f"(confidence {thesis.get('confidence', 0):.2f}, "
            f"size {thesis.get('sizing_sigma', 0):.2f}σ)",
            fg=typer.colors.GREEN if thesis.get("direction") == "long" else typer.colors.RED,
        )


@app.command()
def scan(
    tickers: str = typer.Option(
        ..., "--tickers", help="Comma-separated tickers, e.g. AAPL,NVDA,TSLA."
    ),
    window: int = typer.Option(7, "--window", "-w", help="News lookback in days."),
    out: Optional[Path] = typer.Option(
        None, "--out", help="JSON output path. Default: outputs/scan-<date>.json"
    ),
    skip_wiki: bool = typer.Option(True, "--skip-wiki", help="Don't write per-ticker wiki pages."),
) -> None:
    """Fan out research across a watchlist. Writes a single scan JSON."""
    syms = [t.strip() for t in tickers.split(",") if t.strip()]
    req = ScanRequest(tickers=syms, window_days=window)
    result = run_scan(req, write_to_wiki=not skip_wiki)

    if out is None:
        out = Path("outputs") / f"scan-{dt.date.today().isoformat()}.json"
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(json.dumps(result, indent=2, ensure_ascii=False, default=str), encoding="utf-8")
    typer.echo(f"[trader] Scan JSON → {out}")
    for sym, r in result["per_ticker"].items():
        thesis = r.get("thesis") or {}
        verdict = "abstain" if thesis.get("abstain") else thesis.get("direction", "?")
        typer.echo(f"  - {sym}: {verdict} (conf {thesis.get('confidence', 0):.2f})")


@app.command()
def version() -> None:
    """Print the trader version."""
    from trader import __version__
    typer.echo(__version__)


if __name__ == "__main__":
    app()

"""Firefly CLI — `firefly plan ...` entry point."""

from __future__ import annotations

import json
from pathlib import Path
from typing import Optional

import typer
from dotenv import load_dotenv

from firefly.orchestrator import MissionRequest, run

load_dotenv()

app = typer.Typer(
    name="firefly",
    help="Unified Firefly — Orbital Data Center Mission Architect.",
    no_args_is_help=True,
    add_completion=False,
)


@app.command()
def plan(
    from_: str = typer.Option(..., "--from", help="Launch site name or country code (e.g. Taiwan, KSC, RocketLab-NZ)."),
    to: str = typer.Option(..., "--to", help="Target orbit class (e.g. SSO-600km, ISS, GEO)."),
    window: str = typer.Option("30d", "--window", help="Launch window length (e.g. 30d, 90d)."),
    out: Optional[Path] = typer.Option(None, "--out", help="JSON output path. Default: outputs/mission-<slug>.json"),
    skip_wiki: bool = typer.Option(False, "--skip-wiki", help="Don't write back to wiki/synthesis/."),
) -> None:
    """Plan an orbital data center mission end-to-end."""
    req = MissionRequest(from_=from_, to=to, window=window)
    result = run(req, write_to_wiki=not skip_wiki)

    if out is None:
        out = Path("outputs") / f"mission-{req.slug()}.json"
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(json.dumps(result, indent=2, ensure_ascii=False), encoding="utf-8")

    typer.echo(f"[firefly] JSON  → {out}")
    if result.get("wiki_synthesis_path"):
        typer.echo(f"[firefly] Wiki  → {result['wiki_synthesis_path']}")
    if result.get("brief_path"):
        typer.echo(f"[firefly] Brief → {result['brief_path']}")


@app.command()
def version() -> None:
    """Print the Firefly version."""
    from firefly import __version__
    typer.echo(__version__)


if __name__ == "__main__":
    app()

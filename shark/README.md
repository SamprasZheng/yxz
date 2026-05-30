# shark/ — Serenity supply-chain investing project

"Serenity"-style **supply-chain bottleneck** equity research for AI / semiconductor
hardware themes. Buy the shovels, not the gold: map a theme's full value chain,
find the bottleneck pick-and-shovel suppliers, name the specific small-cap pure
plays with tickers.

**Research / educational only — not financial advice.**

## Files

- `serenity.md` — the framework (9-step method, reverse-engineered from
  @aleabitoreddit's posts + the Goldman CPO ecosystem map).
- `watchlist.yaml` — seeded ticker map across three themes: CPO, HBM, and
  passives/PCB-drilling. Codes are leads to verify, not facts.

## How to use

Run the `serenity-analyst-agent` (`.claude/agents/serenity-analyst-agent.md`):

> "Use the serenity-analyst-agent to map the CPO supply chain and rank the
> bottleneck names."

It reads both files above, decomposes the theme into layers, names listed
equities per layer with ecosystem exposure, flags bottlenecks, and ranks
conviction tiers — verifying tickers and dating any figures.

Durable research output is saved to `wiki/synthesis/serenity-<theme>.md`.

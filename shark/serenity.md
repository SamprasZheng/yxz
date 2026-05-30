# Serenity — Supply-Chain Bottleneck Investing Framework

> Reverse-engineered from the public posts of **Serenity (@aleabitoreddit)** and
> the Goldman Sachs CPO ecosystem map he references. This is the analytical
> framework the `serenity-analyst-agent` runs.
>
> **Research / educational only — not financial advice.** Nothing here is a
> recommendation to buy or sell any security.

## The one-line thesis

**Buy the shovels, not the gold.** When an AI-hardware theme heats up, the
obvious large-cap endpoint (the GPU, the switch vendor) is already priced. The
asymmetric edge is in the **supply chain** — the specific, often small-cap
suppliers of the *bottleneck* components everyone needs and few can make.

## The framework, step by step

### 1. Pin the theme and the inflection

Start from a real technology transition with a demand cliff, not a vibe.
Recurring Serenity themes:

- **CPO** — co-packaged optics replacing pluggable optics in switches
  (Nvidia Quantum-X / Spectrum-X; Broadcom Bailly / Davisson).
- **HBM4 / HBM4e** — hybrid bonding, advanced packaging, and metrology for
  Samsung / SK Hynix next-gen memory.
- **Passives density** — MLCC and inductor content per AI board exploding.
- **PCB micro-drilling** — drill-bit and process bottleneck for high-layer-count
  AI PCBs.

Always answer *why now* (a node transition, a capacity wall, a qual cycle).

### 2. Decompose the value chain into layers

The canonical AI-networking stack (from the Goldman CPO map):

```
Compute (GPU)
  → Network: Switch ASIC → Switch system
    → Optics / CPO chip: platform → fab → test
      → Components: optical engine, FAU, CPO connector, optical connectors,
        shuffle box, laser sources / CW laser, ELS module, fiber, thermal
        → Equipment: CPO coupling, CPO test
          → System-level assembly
```

Adapt the layers per theme (HBM has its own packaging/metrology stack; passives
have material → component → placement → test).

### 3. Name specific listed equities at every layer

Every layer gets concrete tickers, across whichever exchange the supplier trades:

| Suffix / form | Exchange |
|---|---|
| `.TW` | Taiwan Stock Exchange (TWSE) |
| `.TWO` | Taipei Exchange (TPEx / OTC) |
| `.T` or 4-digit | Japan (TSE) |
| KOSPI / KOSDAQ 6-digit | Korea |
| `.SZ` / `.SS` | China (Shenzhen / Shanghai) |
| `.HK` | Hong Kong |
| plain | US / ADR |

Note **oligopoly structure** and names that recur — e.g. a connector vendor that
also supplies the thermal cage, or a name that sits in *both* the Nvidia and
Broadcom ecosystems (de-risked) vs a single-customer name (higher beta).

### 4. Hunt the bottleneck

The whole point. The component that is (a) on the critical path, (b) hard to
second-source, and (c) capacity-constrained has **pricing power**. Examples
Serenity flags:

- **CW laser sources / ELS modules** in CPO.
- **Glass core** substrates.
- **PCB micro-drill bits** (Union Tool, Topoint).
- **Hybrid-bonding thin-film metrology** for HBM (Auros).

Bottleneck = thesis. Everything else is exposure.

### 5. Prefer second / third-order pure plays

Given a choice, take the **smaller, less-obvious pure play** over the headline
name: smaller TAM, but far more torque to the theme. Tag each name `direct play`
(revenue swings on this one node) vs `diversified` (theme is a small % of sales).

### 6. Map customer / ecosystem exposure

Who does each name actually sell into?

- **Nvidia ecosystem** (Spectrum-X / Quantum-X, closed).
- **Broadcom / open ecosystem** (Tomahawk + Delta, Micas, etc.).
- **Samsung / SK Hynix** (memory / packaging).

Multi-ecosystem names are de-risked; single-customer names are leveraged bets on
that customer's roadmap.

### 7. Comp to a known archetype

Frame each setup against a winner the market already understands:

> "This is like **$SIVE + CPO crossed with $AEHR**, but for memory (and smaller TAM)."

`$AEHR` = burn-in test, `$SIVE` = SiC, `$VSH` = Vishay passives. Pattern-matching
to an archetype communicates the shape of the trade fast.

### 8. Rank conviction — don't just basket

> "There are a lot of these. You can always equal-weight, but I try to pick winners."

Default to an equal-weight basket when genuinely uncertain, but the goal is to
**concentrate into the highest-conviction winner.** Use tiers:

- **T1** — high-conviction bottleneck pure play.
- **T2** — quality exposure, more diversified.
- **T3** — basket-only / lottery ticket.

### 9. Sanity gate before conviction

- Market cap & liquidity (can you actually trade it / is there an ADR?).
- TAM size (acknowledge when it's small).
- **Qualification status** — sampling vs qual testing vs *formal orders / mass
  production*. A name "in qual" is a different risk than one shipping.
- Customer concentration.
- FX exposure.
- **Ticker accuracy** — Serenity openly notes "some tickers are wrong." Verify
  exchange + code before acting.

## Worked archetype — CPO (from the Goldman map)

The Nvidia-vs-Broadcom CPO table is the template: same stack, two customer
columns, specific tickers at every layer (fab = TSMC `2330.TW` for both; CPO
connector + thermal cage = Nextronics `8417.TWO` for Nvidia / COXOC `6205.TW` for
Broadcom; CW laser = Sumitomo, Furukawa, Lumentum, Coherent; assembly = Hon Hai
`2317.TW`, Fabrinet `FN`). See `shark/watchlist.yaml` for the full seeded map
across CPO, HBM, and passives/PCB.

## Disclosure norm

Serenity states longs explicitly: *"if I decide to go long a few, I'll obviously
tell you."* The agent mirrors this: separate **analysis** from any **position**,
and never imply a recommendation.

## Sources

- Goldman Sachs Global Investment Research — Nvidia vs Broadcom CPO ecosystem map
  (company data compiled by GS).
- Serenity (@aleabitoreddit) posts, Apr 2026: Korean HBM supplier list, the
  metrology pick (Auros 322310), and the MLCC / inductor / PCB-drilling list.

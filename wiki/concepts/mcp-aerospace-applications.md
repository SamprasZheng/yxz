---
type: concept
tags: [mcp, aerospace, satellite-netops, llm-agents, tool-protocol, spacesharks, hermes, nemoclaw, openclaw, astrodynamics, ground-station]
---

# MCP in Aerospace — Model Context Protocol Applied to Satellite and Space Operations

## What MCP is (one-paragraph refresher)

The Model Context Protocol (MCP) is an open standard (Anthropic-initiated, November 2024; donated to Linux Foundation Agentic AI Foundation December 2025) for connecting LLM agents to external tools and data sources over a uniform JSON-RPC-style transport. An MCP *server* exposes a set of typed tool descriptions; an MCP *client* (Claude, OpenClaw, Cursor, VS Code Copilot, etc.) discovers those tools and invokes them via natural-language reasoning. The key property is **model-agnostic tool inventory**: the same tool set can be driven by any MCP-compatible LLM without re-writing client code. MCP is used inside [[concepts/openclaw]] as its primary tool-connectivity layer, and [[concepts/hermes-agent-framework]] supports MCP-compatible endpoints. [[concepts/nemoclaw]] enforces L7 policy over outbound calls the sandboxed agent makes, which is architecturally complementary to MCP (NemoClaw polices egress; MCP standardises the tool-call shape). For a protocol-layer contrast, see [[concepts/agentic-payments]] — x402/ACP/AP2 operate at the *payment* layer; MCP operates at the *tool-invocation* layer. These are orthogonal and can compose.

## What MCP brings to aerospace specifically

Aerospace compute workflows involve dozens of domain-specific tools with bespoke APIs: SPICE (NASA/JPL), STK/Ansys, GMAT, FreeFlyer, SpacePy, Space-Track REST, TLE parsers, NOAA SWPC feeds, and ITU filing databases. Before MCP, an LLM agent had to hard-code or custom-wrap each one. MCP lets each tool owner publish a self-describing server once, and any MCP-capable agent — regardless of which underlying model it runs — can discover and invoke those tools at inference time.

Specific aerospace benefits:

1. **Tool inventory portability** — a mission planner switching from Claude 3 to Nemotron or Hermes gets the same STK/SPICE tool set without rewriting the integration layer.
2. **Standardized orbital computation** — SPICE kernels, Keplerian conversions, eclipse-window queries, delta-v calculations can all be exposed as named MCP tools with typed schemas.
3. **Ground station scheduling** — pass prediction, antenna pointing angles, Deep Space Network contact windows can be queried via MCP without operator shell scripting.
4. **Event chaining** — multiple astrodynamics tools can be chained in a single prompt (e.g., "convert epoch → compute transfer → find occultation window") without any application code.
5. **Audit-friendly** — MCP tool calls are structured JSON events, making them loggable for mission assurance purposes — complementary to [[concepts/nemoclaw]]'s audit-log policy enforcement.

## Verified public MCP-aerospace integrations (as of 2026-05-24)

The following integrations are **confirmed to exist** in public repositories or production endpoints. All are open-source and none are enterprise production deployments at named satellite operators.

### 1. IO Aerospace MCP Server

**Builder:** IO Aerospace Software Engineering (community open-source org)
**Repo:** `github.com/IO-Aerospace-software-engineering/mcp-server`
**Production instance:** `mcp.io-aerospace.org` (HTTP transport)
**License:** (not confirmed at ingest; org is open-source)
**First documented:** October 28, 2025

**What it does:** .NET-based MCP server wrapping `IO.Astrodynamics`, a modern wrapper around NASA/JPL's SPICE toolkit. Tools span five categories: (a) celestial mechanics and ephemeris, (b) orbital element / state-vector conversions, (c) event and constraint finding (eclipse windows, launch windows, distance constraints), (d) ground station positioning and pointing angles including DSN stations, (e) time-scale and unit conversions.

**Use cases documented:** AI-assisted mission planning with delta-v calculations; real-time satellite anomaly resolution and pass prediction; orbital mechanics education.

### 2. STK MCP Server (alti3/stk-mcp)

**Builder:** Altaher Emhemed (alti3), Aeronautical Engineering background
**Repo:** `github.com/alti3/stk-mcp` — 32 stars
**License:** MIT
**First documented:** October 28, 2025

**What it does:** Python-based MCP server bridging LLMs with Ansys STK (Systems Tool Kit), the industry-standard Digital Mission Engineering platform used by NASA, ESA, Boeing. Exposes three core tools (`setup_scenario`, `create_location`, `create_satellite`) plus resources for access interval computation, LLA ephemeris, and object listing. Supports STK Desktop (Windows) and STK Engine (Windows + Linux headless).

**Use cases documented:** AI-assisted constellation design from natural language; defense simulation multi-tool workflows; automated orbital trade studies (inclination optimization via iterative LLM iteration).

**Significance:** STK is the incumbent mission engineering tool for government/prime contractors. An MCP wrapper means any MCP-capable LLM can drive professional-grade orbital simulation without STK API expertise.

### 3. aerospace-mcp (cheesejaguar/aerospace-mcp)

**Builder:** cheesejaguar (pseudonymous community developer)
**Repo:** `github.com/cheesejaguar/aerospace-mcp` — 4 stars
**License:** MIT
**Latest release:** v0.0.2 (January 17, 2026)

**What it does:** Python/FastAPI MCP server with 44+ tools spanning aviation and space. Space/orbital subset includes: orbital element conversions, J2-perturbed orbit propagation (RK4), Hohmann transfer calculations, ground track computation, Lambert problem solving, rendezvous planning. Also covers atmospheric modeling, aerodynamic analysis, UAV energy optimization, rocket trajectory simulation. GPU-ready (NumPy/CuPy).

**Significance:** Broadest scope of the three space MCP servers; explicitly aviation + space combined; lowest star count suggests early/personal-project maturity level.

### 4. NASA MCP Server (ProgramComputer/NASA-MCP-server)

**Builder:** ProgramComputer (pseudonymous community developer)
**Repo:** `github.com/ProgramComputer/NASA-MCP-server` — 88 stars
**License:** ISC

**What it does:** MCP server exposing 20+ NASA public APIs including: APOD, DONKI (space weather), TLE data, Near Earth Objects, Mars Rover Photos, EONET (natural events), FIRMS, JPL Solar System Dynamics (SBDB, Close-Approach, Fireball, Scout), Earth Data (GIBS, CMR). Note: this covers NASA *data* APIs, not operational control interfaces.

**Significance:** Highest star count of the four; most NASA-data-fluent; DONKI integration covers solar weather events relevant to [[concepts/solar-cycle-25-leo-radiation]] and safe-mode triggering in [[synthesis/spacesharks-mission-desk-hackathon-plan]].

## What is NOT yet present in MCP-aerospace (as of 2026-05-24)

Based on the research at ingest, these aerospace MCP integrations were **not found**:

- No confirmed AWS Ground Station MCP server (AWS Ground Station exposes its own SDK/CLI; no MCP wrapper found in open repositories)
- No confirmed Azure Orbital MCP integration
- No Space-Track.org MCP server (Space-Track uses a REST API; no confirmed MCP wrapper found)
- No confirmed GMAT or FreeFlyer MCP server
- No enterprise/production deployment at a named satellite operator (Telesat, SES, Eutelsat, SpaceX, AWS, Azure) was found
- No academic paper treating MCP-in-aerospace as a research topic (all MCP-aerospace work is implementation-level, not peer-reviewed research)

The claim in [[sources/nvidia-agent-challenge-2026]] context that "academia has only just started advocating MCP in aerospace" is **approximately accurate** — there is no academic paper on MCP-in-aerospace at ingest time; all implementations are practitioner-built GitHub repos.

## The Spacesharks architectural angle

The owner's claim is:

> "既然學術界剛開始提倡在航太用 MCP（Model Context Protocol），你 Day 1 用 OpenClaw 鎖定白名單、Hermes 架設本地 KB 的做法，在架構上完全領先主流。"
> ("Since academia has only just started advocating MCP in aerospace, your Day 1 approach of using OpenClaw to lock down a whitelist and Hermes to set up a local KB is architecturally leading the mainstream.")

**Honest assessment (do not soften this before writing the README):**

The architectural pattern the owner built — NemoClaw sandbox + OpenClaw MCP whitelist + Hermes local KB — is **ahead of the four GitHub repos above** in one specific way: it combines sandboxed policy enforcement (NemoClaw) with tool-inventory whitelisting (OpenClaw MCP registry) with domain-specific knowledge retrieval (Hermes + wiki). None of the four public MCP-aerospace repos include sandboxing or policy enforcement; they are raw tool servers. That combination is the differentiation.

However, two important qualifications:

1. **The four public MCP-aerospace repos predate or are contemporaneous with the owner's setup.** IO Aerospace and STK-MCP both published in October 2025; aerospace-mcp released v0.0.2 in January 2026. The *tool* layer was not invented by the owner — the differentiation is the *security + KB* layer wrapping those tools.

2. **OpenClaw's MCP implementation is a client-side registry**, not itself an MCP server. The whitelisting the owner calls "OpenClaw whitelist" is NemoClaw's egress policy (declarative YAML, [[concepts/nemoclaw]]) controlling which MCP servers the agent is allowed to reach. This is accurate and architecturally sound, but calling it "OpenClaw whitelist" slightly conflates the layers. The correct framing: NemoClaw enforces policy over MCP tool calls; OpenClaw manages the MCP server registry.

3. **"Leading the mainstream" is defensible as a practitioner claim**, not as a researcher claim. There is no peer-reviewed paper combining MCP + aerospace + sandboxed policy enforcement. The owner's setup is a working implementation of a pattern that the community is converging on but has not yet synthesised into a single coherent stack.

**Recommended README framing:** "We combined a sandboxed MCP tool registry (NemoClaw + OpenClaw) with a domain-specific knowledge base (Hermes + wiki) for satellite lifecycle decision-making — a stack that no current open-source aerospace MCP project includes." This is accurate, specific, and avoids overclaiming "leading the mainstream."

## See also

- [[concepts/satellite-netops-agents]] — the broader NetOps agent landscape (SCNOC-Agentic etc.)
- [[concepts/hermes-agent-framework]] — the Hermes KB + agent runtime in the owner's stack; see §NVIDIA integration for how Hermes uses port 8642 as its MCP-compatible endpoint
- [[concepts/nemoclaw]] — the sandbox runtime that enforces policy over tool calls, including MCP egress
- [[concepts/openclaw]] — the agent that manages the MCP server registry and drives tool calls
- [[concepts/agentic-payments]] — protocol-layer contrast: x402/ACP/AP2 are at the payment layer, MCP is at the tool-invocation layer
- [[synthesis/spacesharks-mission-desk-hackathon-plan]] — the owner's entry using this stack for satellite lifecycle decisions
- [[concepts/nemoclaw-policy-presets]] — the YAML policy layer that whitelists which MCP servers the agent can reach

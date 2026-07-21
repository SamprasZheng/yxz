---
type: synthesis
tags: [fcc, ibfs, regulatory, spectrum, epfd, itu, ngso, mission-desk, firefly, nemoclaw, openclaw, hermes-agent-framework]
---

# FCC IBFS Satellite Filings and Interference Coordination

**Traditional Chinese summary (繁體中文摘要)**：美國聯邦通訊委員會的國際局申報系統（IBFS）是衛星頻譜授權的核心公開資料來源。第25部分（Part 25）規範商業衛星授權，申請者須提交Form 312主表及Schedule S技術附件，內含軌道參數、天線特性、EIRP與EPFD限制等資訊。FCC於2023年4月成立太空局（Space Bureau）專責衛星事務，並在授權後代表業者向ITU提交API→CR→通報（Notification）的國際協調流程。Article 22 EPFD框架是NGSO/GSO干擾防護的核心機制；Resolution 76（Rev.WRC-23）補充了多NGSO系統合計功率限制。對於NemoClaw/OpenClaw/Hermes/Firefly代理人而言，IBFS公開搜尋介面（`licensing.fcc.gov/myibfs/`）加上ITU免費EPFD驗證軟體，可在不需付費訂閱的情況下，完成衛星干擾歸因的基礎查詢；進一步升級路徑為ITU SNS完整訂閱或NSR/SpaceTec等商業頻譜協調服務。

---

## Why This Matters to the Mission Desk

The [[synthesis/spacesharks-mission-desk-hackathon-plan|Mission Desk]] includes "interference attribution — match observed downlink degradation to FCC IBFS / ITU spectrum filings" as a first-class decision verb. This synthesis provides the retrieval substrate: what data exists, where it lives, how the regulatory pipeline works, and what an agent running on [[concepts/nemoclaw|NemoClaw]] + [[concepts/hermes-agent-framework|Hermes]] can do *today* with only public sources.

Cross-reference: [[synthesis/cdm-pc-decisioning]] (conjunction + collision probability — the orbital-mechanics complement to this spectrum-coordination layer) and [[synthesis/faa-notam-launch-lifecycle]] (launch-clearance substrate).

---

## 1. IBFS End-to-End: The Regulatory Pipeline

### 1.1 What IBFS Is

The **International Bureau Filing System (IBFS)** is the FCC's official database, filing, and processing platform for all satellite and international telecommunications services. Since April 2023 it has been administered by the [[sources/fcc-space-bureau-2023|Space Bureau]] (carved out of the former International Bureau).

Public access: `licensing.fcc.gov/myibfs/` (official portal) and `fcc.report/IBFS/` (third-party mirror with RSS feeds).

No authentication is required to read, search, or download filed documents, [[concepts/schedule-s|Schedule S]] exhibits, and grant orders.

### 1.2 Filing Types That Matter for Interference Attribution

| IBFS code | Event | Interference-relevance |
|---|---|---|
| SAT-LOA | New constellation application | Establishes baseline orbital/frequency parameters |
| SAT-MOD | Modification post-grant | Signal of constellation change — altitude, EIRP, sat-count, frequency band |
| SAT-AMD | Amended application (within processing round) | May alter EPFD commitment or orbital geometry |
| SAT-STA | Special Temporary Authority | Short-term operations; may represent test/demo phase before full grant |
| SES-LIC / SES-MOD | Earth station license / modification | Relevant if a ground terminal is the interference origin |

Monitoring RSS feeds for SAT-MOD and SAT-AMD is the lowest-latency trigger for "a neighbour operator just changed something."

### 1.3 What a Filing Contains: Schedule S

Every Part 25 space station application includes [[concepts/schedule-s|Schedule S]], which provides:
- **Orbit type** (GSO / NGSO) and orbital parameters (altitude, inclination, eccentricity, RAAN, mean anomaly at epoch)
- **Frequency bands** with EIRP density (dBW/4 kHz below 15 GHz; dBW/MHz at and above 15 GHz) and maximum total EIRP per beam
- **Antenna beam characteristics** — coverage footprint, off-axis gain envelope, PFD at Earth's surface
- **EPFD commitment** — for NGSO systems, the declaration + supporting simulations that the constellation meets ITU Article 22 limits
- **Call sign** (assigned at grant, not at filing)
- **Network name** — the string used to identify this constellation in the ITU SNS database

Schedule S exhibits (PDFs) are downloadable from individual IBFS records — the orbital parameters section is the structured data an agent needs for link-budget and interference geometry calculations.

### 1.4 FCC → ITU Handoff: API → CR → Notification

When an operator files for a Part 25 satellite license, the FCC Space Bureau constructs an ITU filing package from the Schedule S data:

1. **API (Advance Publication Information)**: Filed by the FCC with the ITU Radiocommunication Bureau (BR) to establish the operator's **ITU priority date**. The ITU publishes the API in the BR IFIC; other administrations have **4 months** to comment identifying potentially affected systems.

2. **Coordination Request (CR/C → CR/D)**: For bands where individual coordination is required (beyond EPFD-compliance blanket coverage), the FCC submits a CR/C. The ITU publishes a CR/D identifying which GSO and NGSO networks the applicant must coordinate with. Bilateral negotiations begin.

3. **Notification (N)**: After the FCC grants the Part 25 licence and coordination is complete, the FCC submits a Notification to the ITU BR. The Notification is registered in the ITU **Master Register** within the **Space Network System (SNS)** database — this is the international right to operate.

The FCC Space Bureau forwards coordination letters to the operator's IBFS point-of-contact, requesting responses 3–4 business days before ITU deadlines.

**Key timing asymmetry**: The API submission (priority date) can precede the FCC domestic grant by months or years. A neighbouring operator may therefore have established ITU priority for a frequency band *before* the FCC has publicly granted their license — visible in the ITU BR IFIC even if the IBFS grant has not yet appeared.

---

## 2. NGSO/GSO and NGSO/NGSO Coordination

### 2.1 EPFD — The Core GSO Protection Mechanism

[[concepts/epfd-equivalent-power-flux-density|EPFD]] (Equivalent Power Flux Density) is the aggregate interference metric from ITU Article 22 that governs NGSO/GSO sharing. An NGSO system that demonstrates EPFD compliance is deemed not to cause unacceptable interference to *any* GSO network worldwide — eliminating the need for bilateral coordination with each GSO operator.

EPFD is calculated via time-domain simulation across the full constellation over ≥ 10 representative days. The ITU provides free EPFD validation software at `itu.int/epfdsupport/` — this is a key public-data tool.

Article 22 establishes per-system EPFD limits; **Resolution 76 (Rev.WRC-23)** adds **aggregate** limits (Tables 1A–1D) for multiple co-frequency NGSO systems combined.

> **Material change (2026-04-30):** the FCC's domestic EPFD framework is no longer a straight adoption of ITU Article 22. In **FCC 26-26** (*Modernizing Spectrum Sharing for Satellite Broadband*, adopted 2026-04-30, effective 2026-07-13) the Commission **replaced fixed EPFD power-density limits with a performance-based GSO-protection framework + mandatory good-faith coordination** in the 10.7–12.7 / 17.3–18.6 / 19.7–20.2 GHz bands. For US interference-attribution work this means the operative test in those bands is now "does the NGSO operation degrade GSO service quality," adjudicated through operator coordination with a technical backstop — not a fixed dBW/m²/MHz cap. The international Notification still runs against Article 22. See [[concepts/epfd-equivalent-power-flux-density]] for the full correction.

### 2.2 NGSO/NGSO Coordination and Processing Rounds

EPFD compliance does not resolve NGSO/NGSO interference (two LEO constellations interfering with each other). For this, the FCC uses the [[concepts/processing-round|processing round]] system: multiple competing NGSO constellation applications in the same band are batched and reviewed concurrently. Grants may be conditioned on bilateral spectrum-sharing agreements.

The **2020 Ku/Ka-band processing round** — encompassing SpaceX Gen2, Kuiper, and OneWeb modification applications — established the current dominant operators in Ku/Ka NGSO spectrum over the US.

> **Regularization ahead (2026-07):** the Part 100 R&O circulated for the 2026-07-22 vote (scheduled, not yet adopted) would adopt a **robust NGSO–NGSO sharing framework** and replace the *highly discretionary* Part 25 processing-round rules with a **rules-based, predictable process** — operators would be able to plan for a round to open rather than depend on staff discretion. For the Mission Desk's early-warning monitoring (§4), this makes the *timing* of contested-band rounds more forecastable. See [[concepts/processing-round]].

---

## 3. Recent Rulings That Shape the Interference Landscape (2020–2026)

Full details in [[sources/fcc-starlink-gen2-kuiper-rulings-2022-2024]]. Summary:

| Operator / action | Grant / event | Sats / effect | Bands | Key date |
|---|---|---|---|---|
| Amazon Kuiper | Initial Part 25 grant (FCC 20-102) | 3,236 | Ka | Jul 2020 |
| SpaceX Starlink | Gen2 partial grant (FCC 22-91) | 7,500 | Ku/Ka | Dec 2022 |
| OneWeb | Expedited partial grant (processing round) | ~648 + Gen2 pending | Ku | Sep 2022 |
| SpaceX Starlink | Gen2 V/E-band partial grant (DA-24-1193) | (part of 7,500) | V/E | Nov 2024 |
| AST SpaceMobile | SCS direct-to-device authorization (DA-24-756) | 248 | 700 MHz / 850 MHz cellular | 2024 |
| **FCC (EPFD reform)** | **R&O FCC 26-26** — fixed EPFD limits → **performance-based GSO protection + good-faith coordination** | rule change (all NGSO/GSO ops in-band) | 10.7–12.7 / 17.3–18.6 / 19.7–20.2 GHz | **adopted 2026-04-30, eff. 2026-07-13** |
| **FCC (Part 100)** | Space Modernization **R&O + FNPRM** (SB Docket 25-306) — Part 25 → **Part 100** "licensing assembly line," default-to-yes, single-Form-312, **20-yr terms**, **regularized NGSO/NGSO processing round**, Variable-Trajectory license, certifications-over-showings | licensing-process overhaul | all satellite/earth-station | **vote scheduled 2026-07-22** (not yet adopted as of 07-21) |

**For interference attribution**: Starlink Gen2 (7,500 sats Ku/Ka + V-band) and Kuiper (3,232 sats Ka) are the dominant co-frequency sources in Ku/Ka bands. AST introduces a new cellular-band (700 MHz / 850 MHz) interference class not previously associated with LEO FSS. [[entities/starcloud]] and [[entities/ada-space]] orbital data center operators in LEO are the most exposed to these interference environments. **New in 2026:** for the Ku/Ka bands above, the attribution test shifts from "did the operator exceed a fixed EPFD limit" to "did it degrade GSO service quality under the performance-based framework, and had good-faith coordination been reached" — a qualitatively different evidentiary question for the Mission Desk verb.

---

## 4. What the Agent Can Do with Public Data Only

### 4.1 MVP Recipe — Public IBFS + ITU Public Data

The following query sequence uses only free, unauthenticated public data:

**Step 1 — Identify the suspected interfering constellation**
- Go to `fcc.report/IBFS/Filing-List/SAT` or `licensing.fcc.gov/myibfs/`
- Search by operator name (e.g., "SpaceX" or "Kuiper Systems")
- Find the relevant SAT-LOA or SAT-MOD file number

**Step 2 — Download the Schedule S exhibit**
- Open the individual IBFS filing record
- Download the Schedule S PDF attachment
- Extract: orbital altitude shell, inclination, EIRP/EIRP-density per beam, frequency bands, antenna pattern reference

**Step 3 — Check for recent modifications**
- Search for SAT-MOD filings by the same operator in the same band
- Sort by date — any SAT-MOD in the last 6 months is a potential cause of a changed interference environment
- Subscribe to the `fcc.report/IBFS/Filing-List/SAT` RSS feed for ongoing monitoring

**Step 4 — Check ITU BR IFIC for priority and coordination status**
- Visit `itu.int/en/ITU-R/space/asreceived/Publication/AsReceived`
- Search for the operator's ITU network name (from Schedule S) in recent BR IFIC issues
- Identify API / CR publication dates — if the API was published recently, the operator may have priority for a new frequency band not yet reflected in the FCC grant

**Step 5 — Run EPFD validation (optional, for quantitative analysis)**
- Download the ITU EPFD validation software from `itu.int/epfdsupport/`
- Input the Schedule S orbital parameters and EIRP values
- Run the time-domain simulation for the observed interference geometry (LEO receiver location + time window)
- Compare computed EPFD against Article 22 Table limits

**Achievable with this MVP workflow**:
- Identify which NGSO operators are licensed to operate in the observed downlink frequency band
- Determine whether a recent SAT-MOD changed EIRP, altitude, or frequency parameters
- Establish whether the suspected operator has valid ITU priority
- Run a quantitative EPFD check to assess whether the operator's declared parameters could produce the observed interference level

### 4.2 Upgrade Path — Paid Services

| Data gap | Paid service |
|---|---|
| Full ITU SNS machine-readable database (all administrations' API/CR/N records) | ITU SpaceExplorer subscription (`itu.int/pub/R-SOFT-SNS`) |
| Geo-specific coordination for non-US-licensed operators | ITU SNS or commercial spectrum databases |
| NSR (Northern Sky Research) / SpaceTec market intelligence | Commercial spectrum-coordination advisory |
| Real-time TLE + IBFS orbital parameter reconciliation | Space-Track.org (free, requires registration) + IBFS Schedule S cross-check |

---

## 5. Integration with NemoClaw / OpenClaw / Hermes / Firefly

The spectrum-coordination substrate built from IBFS maps directly onto the [[synthesis/spacesharks-mission-desk-hackathon-plan|Mission Desk]] architecture:

- **[[concepts/nemoclaw|NemoClaw]]** sandboxes the agent that queries IBFS via HTTP; the `networking.outbound.allowed_hosts` YAML policy permits `licensing.fcc.gov`, `fcc.report`, `itu.int` while blocking credential egress
- **[[concepts/openclaw|OpenClaw]]** provides the browser-automation layer for PDF exhibit retrieval from IBFS records (Schedule S exhibits are PDF-only, not structured JSON)
- **[[concepts/hermes-agent-framework|Hermes]]** stores Schedule S orbital parameter extracts as skills (`.yaml` + `.usage.json`) in `~/.hermes/skills/` so the same constellation geometry is reused across interference-attribution queries without re-fetching
- **[[concepts/nemotron|Nemotron]]** (Llama-3.3-Nemotron-Super-49B-v1.5) performs the reasoning step: given observed downlink degradation event (frequency, time window, terminal location), retrieve relevant IBFS filings, run the EPFD geometry check, and produce an attribution report with a confidence score
- **Firefly agents** (`agents/src/firefly/`) use IBFS data for downlink coordination on the critical path of orbital data center mission planning — the `orbit_designer` agent should query IBFS before finalising frequency band selection for a new ODC terminal

For the [[concepts/aesa|AESA]] / [[concepts/hybrid-phased-array|hybrid phased-array]] antenna designs relevant to LEO terminal engineering at [[entities/win-semiconductors]]-sourced PAs: the Schedule S EIRP and off-axis antenna pattern data are the input to link-margin calculations that determine whether the terminal's G/T is sufficient to operate through the interference environment defined by the IBFS-disclosed NGSO constellation parameters.

---

## 6. Key Facts Verified

- IBFS portal: `licensing.fcc.gov/myibfs/` (successor URL to `apps.fcc.gov/ibfsweb`); 24/7 public access; time-stamps filings to the millisecond
- FCC Space Bureau created April 10–11, 2023, carved from the International Bureau; Chairwoman Rosenworcel's initiative; administers Part 25 SAT-*/SES-* filings
- Schedule S is the mandatory technical annex to FCC Form 312 for space station applications; contains orbital parameters, frequency bands, EIRP density, antenna patterns, EPFD commitment
- Part 25 standard license term: 15 years; small satellite: 6 years; processing time: 6–9 months (uncontested GSO) to 24+ months (NGSO processing round). *(The Part 100 R&O circulated for the 2026-07-22 vote would extend most space/earth-station terms to 20 years — see below.)*
- Part 5 experimental: no commercial service allowed; 2–5 year terms; filing 3–6 months before launch
- ITU Article 22 EPFD limits: per-system limits for NGSO → GSO downlink and uplink interference; Resolution 76 adds aggregate limits for multiple NGSO systems
- ITU coordination pipeline: API establishes priority date (published in BR IFIC); CR/C → CR/D bilateral coordination; Notification → Master Register entry
- Kuiper initial grant: SAT-LOA-20190704-00057, July 30, 2020, FCC 20-102, 3,236 satellites Ka-band
- SpaceX Gen2 partial grant: FCC 22-91, December 1, 2022, 7,500 satellites Ku/Ka-band
- SpaceX Gen2 V/E-band: DA-24-1193, November 26, 2024
- AST SpaceMobile SCS: 248 satellites, 700 MHz / 850 MHz cellular bands, 2024 authorization
- **EPFD reform (FCC 26-26):** adopted 2026-04-30 (3–0), effective 2026-07-13; replaced fixed ITU Article 22 EPFD limits with performance-based GSO protection + mandatory good-faith coordination in 10.7–12.7 / 17.3–18.6 / 19.7–20.2 GHz — first US domestic divergence from the ITU EPFD standard
- **Part 100 (Space Modernization), SB Docket No. 25-306:** Part 25 → Part 100 "licensing assembly line" / default-to-yes / single-Form-312; NPRM comments 2026-01-20, replies 2026-02-18. **A Report and Order + FNPRM is circulated for the full-Commission vote at the 2026-07-22 Open Meeting** (scheduled, *not yet adopted* as of 2026-07-21). Per the July-1-2026 fact sheet, the R&O would (if adopted as circulated) replace Part 25 with Part 100, presume compliant applications in the public interest, **extend most space/earth-station license terms to 20 years** (from 15), **regularize the NGSO/NGSO processing round** via a robust rules-based sharing framework (replacing the discretionary Part 25 process), remove surety-bond requirements for most non-processing-round licenses, add a **Variable Trajectory Space Station** license category, and accept certifications over detailed showings; the FNPRM seeks comment on further Part 100 changes. This is a **process** overhaul distinct from the **FCC 26-26** EPFD interference-rule change above.
- **Processing-round lineage:** four modern Ku/Ka NGSO FSS rounds — 2016 (OneWeb-triggered, closed 2016-11-15; first modern round), 2017, 2020 (Kuiper-triggered), 2021 (~81,195 sats requested); ~43 NGSO FSS applications total; the round is a US-specific instrument with no clean six-region equivalent

---

## See Also

- [[sources/fcc-ibfs-portal-2023]]
- [[sources/fcc-space-bureau-2023]]
- [[sources/fcc-part-25-2024]]
- [[sources/itu-radio-regulations-article-22-2023]]
- [[sources/fcc-starlink-gen2-kuiper-rulings-2022-2024]]
- [[concepts/schedule-s]]
- [[concepts/epfd-equivalent-power-flux-density]]
- [[concepts/processing-round]]
- [[concepts/ngso-gso-coordination]]
- [[concepts/orbital-data-center]]
- [[concepts/leo-value-chain]]
- [[concepts/nemoclaw]]
- [[concepts/openclaw]]
- [[concepts/hermes-agent-framework]]
- [[concepts/nemotron]]
- [[concepts/aesa]]
- [[concepts/hybrid-phased-array]]
- [[entities/starcloud]]
- [[entities/ada-space]]
- [[entities/win-semiconductors]]
- [[synthesis/spacesharks-mission-desk-hackathon-plan]]
- [[synthesis/cdm-pc-decisioning]]
- [[synthesis/faa-notam-launch-lifecycle]]
- [[synthesis/space-regulatory-regimes-six-region]] — six-region (台美日韓中國歐洲) generalization of this US-centric spectrum-filing workflow

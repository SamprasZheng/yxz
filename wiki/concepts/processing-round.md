---
type: concept
tags: [fcc, ibfs, regulatory, spectrum, ngso, processing-round, constellation, mission-desk, firefly]
---

# Processing Round

A **processing round** is the FCC's administrative mechanism for handling multiple competing or potentially interfering satellite license applications that share the same frequency bands. When several operators apply for licences in overlapping spectrum within a defined window, the FCC batches them into a single "round" and reviews them together rather than on a purely first-come-first-served basis.

Processing rounds were formalized for NGSO constellation licensing because the sheer number of proposed constellations (Starlink, Kuiper, OneWeb, Telesat, etc.) made sequential review unworkable and created incentives for premature "placeholder" filings.

## When a Processing Round Is Triggered

Under 47 CFR Part 25 and the FCC's satellite processing procedures, the Satellite Division initiates a processing round when:
1. Multiple NGSO FSS applications seek authorization in the **same frequency bands** (typically Ku / Ka or V band)
2. Applications arrive within a common acceptance window (historically 30 days of the first complete application, though the FCC retains discretion)
3. The applications involve spectrum-sharing interactions that must be evaluated concurrently (co-frequency, co-coverage interference)

A public notice announces the cut-off date for the round; applications filed after the cut-off are placed in a subsequent round.

## Processing-Round Lineage (1990s → 2026)

The processing round is not new — it dates to the first commercial LEO era and has run in four distinct waves for modern broadband NGSO FSS:

| Wave | Year opened | Initiated by | Scope | Outcome |
|---|---|---|---|---|
| **"Big LEO" rounds** | early–mid **1990s** | Iridium / Globalstar / Odyssey / Ellipso era | 1.6/2.4 GHz mobile-satellite | Original processing-round precedent; spectrum split among survivors |
| **First modern Ku/Ka round** | **2016** (closed **2016-11-15**) | OneWeb (petition for 720 sats) | 10.7–12.7 / 14.0–14.5 / 17.8–18.6 / 27.5–30 GHz | 11+ competing applicants filed on the 2016-11-15 cutoff — **Space Norway, O3b, Boeing, SpaceX, Telesat, LeoSat, Kepler, Theia, Karousel**; OneWeb granted **2017-06-23** |
| **2017 round** | **2017** | second-cutoff entrants | Ku/Ka NGSO FSS | additional grants (SpaceX first-gen, Telesat, Kepler, Audacy…) |
| **2020 Ku/Ka round** | **2020** | Kuiper / New Spectrum Satellite / OneWeb | standard Ku/Ka NGSO FSS | 10 applicants; SpaceX Gen2 **7,500** partial grant (Dec 2022), several still pending |
| **2021 round** | **2021** | multiple | Ku/Ka + V-band expansion | drew license requests totalling **~81,195** NGSO satellites |

Across the four modern rounds (2016–2021) the FCC accumulated **~43 NGSO FSS satellite applications**. So the 2020 round detailed below is the **third** and highest-stakes of the modern series — **not** the first (a common misconception; the 2016 OneWeb-triggered round is the true modern precedent). *(Sources: [Payload Research — NGSO FSS spectrum priority](https://payloadspace.com/status-of-ngso-fixed-satellite-service-spectrum-priority-in-the-us-payload-research/); [AIAA — Analysis of FCC NGSO Applications 2000–2022](https://arc.aiaa.org/doi/10.2514/1.A35987); FCC 2016 Ku/Ka processing-round public notice, accessed 2026-07-03.)*

## The 2020 Ku/Ka Processing Round

The highest-stakes modern round — the **third** of the four-wave series above — opened in 2020 for the **10.7–12.7 GHz, 12.75–13.25 GHz, 13.85–14.5 GHz, 17.7–18.6 GHz, 18.8–20.2 GHz, and 27.5–30 GHz** bands (standard Ku/Ka NGSO FSS bands). Participants included:
- **SpaceX Gen2 Starlink** (up to ~30,000 satellites in the most ambitious version; initially 7,500 authorised Dec 2022 as a "partial grant")
- **Amazon Kuiper** (3,236 satellites; initial grant Jul 2020 was in a prior round; Ku/Ka modification applications entered subsequent rounds)
- **WorldVu / OneWeb** (648 satellites; modification applications)
- **New Spectrum Satellite** and others

The round produced:
- SpaceX Gen2 **partial grant** (FCC-22-91, Dec 2022): 7,500 satellites in Ku/Ka; the remaining portion (higher altitudes, V band) deferred
- OneWeb **expedited partial grant** (Sept 2022, DA-23-362): modification granted
- The 2024 SpaceX Gen2 **V-band grant** (Nov 2024): E/V-band operations at 340–360 km altitude authorised

## Processing Round Procedure Steps

1. **Public Notice of Filing**: The Satellite Division publishes an IBFS Notice of Filing announcing the processing round cut-off date and the spectrum/orbit parameters in scope.
2. **Pleading Cycle**: Third parties (other operators, incumbents, federal agencies) file comments and oppositions in the record. Common issues: space safety, [[concepts/epfd-equivalent-power-flux-density|EPFD]] emissions, NGSO–NGSO interference.
3. **Coordinated Technical Review**: Staff reviews all applications concurrently, often requiring operators to negotiate spectrum-sharing agreements with each other. The FCC may condition grants on bilateral coordination being completed post-grant.
4. **Grant, Partial Grant, or Deferral**: The FCC may:
   - Grant the full application
   - Partially grant (e.g., specific altitudes / frequency bands / satellite counts) and defer the rest
   - Defer pending further analysis
5. **Milestone Conditions**: Grants in a processing round typically carry milestone conditions (e.g., 50% of satellites deployed within 6 years of grant, 100% within 9 years) to prevent spectrum warehousing.
6. **Modification Applications**: Post-grant, operators file SAT-MOD applications to adjust orbital parameters, satellite counts, or frequency authorisations. These may trigger a new processing round if they expand into contested spectrum.

## Relationship to ITU Priority

Within the ITU system, filing priority is established by the date of the **API (Advance Publication Information)** submission. The FCC submits APIs for pending applications even before a processing round concludes. This means an operator can have ITU priority established while the FCC domestic review is still ongoing. See [[concepts/ngso-gso-coordination]] for the API → CR → Notification pipeline.

The ITU "processing round" concept is distinct from the FCC processing round: the ITU uses **coordination rounds** under Resolution 76 to manage the aggregate EPFD compliance of multiple NGSO systems.

## Six-Region View — a Uniquely American Instrument (台美日韓中國歐洲)

The processing round has **no clean six-region equivalent** — it is an artifact of the specific position the FCC occupies, and the honest comparison is that most administrations simply don't do this:

| Region | Competitive-batching mechanism? | Why |
|---|---|---|
| **US** | **Yes — the processing round is the mechanism.** | The US is the jurisdiction where the most operators compete for the *same domestic market*; the FCC needs a rule to adjudicate co-frequency co-coverage contention among many private applicants at once. |
| **Europe** | No FCC-style round. | NGSO authorization runs through **national regulators** + **CEPT/ECC** coordination; competing filings are handled by ITU priority + bilateral coordination, not a domestic competitive batch. (The proposed EU Space Act may add EU-level process by ~2030.) |
| **China** | No — state-allocated. | **MIIT** files megablocks (Guowang, CTC-1/CTC-2) directly at the ITU; there is one state-directed program, so no domestic competitive round to run. |
| **Japan / Korea** | No — few operators. | **MIC** (JP) / **MSIT** (KR) license their handful of operators individually; contention is rare enough that no batching rule is needed. |
| **Taiwan** | No — recipient not originator. | **NCC** licenses ground/terminal use; Taiwan files no competing NGSO constellations, so the question does not arise ([[synthesis/leo-taiwan-odc-gap]] pattern at the regulatory layer). |

**Durable finding:** the processing round is downstream of the ITU's global **first-come-first-served** rule (see [[concepts/ngso-gso-coordination]]); it is the *domestic* competition-management layer the US bolts on *because* it hosts the densest cluster of competing commercial applicants. Where the ITU FCFS rule is the 100-year scarcity engine (orbital-slot enclosure, per [[synthesis/space-regulatory-regimes-six-region]]), the processing round is a jurisdiction-specific overlay — which is why deepening it geographically means explaining its *absence* elsewhere, not tabulating parallels.

## Update (2026) — Part 100 and the "Licensing Assembly Line"

The processing-round mechanism is itself in play. Under FCC Chair Brendan Carr's *Space Modernization for the 21st Century* proceeding, the Commission moved to **replace Part 25 wholesale with a new Part 100** and a **"default-to-yes" licensing assembly line** (straightforward requests presumed in the public interest and expedited; a modular single-Form-312 model). The NPRM ran comments **2026-01-20** / replies **2026-02-18**, and a **Space Modernization Order is scheduled for a full-Commission vote at the 2026-07-22 Open Meeting**. The open question this raises for the processing round: a modular "assembly-line" grant model streamlines *uncontested* requests, but co-frequency NGSO contention still needs *some* concurrent-review rule — so the round may be simplified and time-boxed rather than abolished. *(Sources: [FCC Space Modernization NPRM](https://www.fcc.gov/document/space-modernization-21st-century-nprm); [SatNews — FCC Part 100 rulemaking](https://news.satnews.com/2025/12/10/fcc-initiates-part-100-rulemaking-to-overhaul-space-licensing-framework/), accessed 2026-07-03.)* See [[concepts/schedule-s]] for the Part 25 → Part 100 form-model transition and [[concepts/epfd-equivalent-power-flux-density]] for the parallel 2026-04-30 move from fixed EPFD limits to performance-based GSO protection with good-faith coordination — together these mean NGSO/NGSO and NGSO/GSO contention is shifting from FCC *allocation* toward operator *bargaining* with regulatory backstops.

## Long-Horizon View (labelled scenario)

Near term (2026–2030): the round is streamlined under Part 100 and increasingly paired with mandatory good-faith coordination rather than staff-adjudicated splits. Structural fork (not a forecast): either (i) domestic batching **withers** as performance-based, coordination-first rules let operators privately partition shared spectrum — the round becomes a rarely-invoked backstop; or (ii) as LEO Ku/Ka fills and V/Q/E and optical inter-satellite bands contend, batching **intensifies** and other large markets (EU, eventually) grow their own round-like processes. Either way the binding long-run scarcity is not the US round but the ITU FCFS orbital-slot enclosure it sits beneath ([[synthesis/space-regulatory-regimes-six-region]]).

## IBFS Filing Types in a Processing Round

| IBFS type code | Meaning |
|---|---|
| SAT-LOA | Launch and Operate Application (original licence application) |
| SAT-PPL | Petition for Pioneer Preference licence |
| SAT-AMD | Amended application (within a round) |
| SAT-MOD | Modification application (post-grant, may trigger new round) |
| SAT-STA | Special Temporary Authority (short-term ops during a round or pending grant) |

## Relevance to Mission Desk / Firefly Agents

- Monitoring the IBFS for SAT-MOD and SAT-AMD filings by neighbouring constellation operators is a practical **early-warning signal** for potential spectrum environment changes that could affect downlink performance at an orbital data center (see [[concepts/orbital-data-center]])
- Processing round outcomes directly determine which operators hold rights in which frequency bands at which altitudes — key inputs to the [[synthesis/spacesharks-mission-desk-hackathon-plan|Mission Desk]] interference-attribution verb
- The FCC's `fcc.report/IBFS/Filing-List/SAT` mirror provides RSS feeds per filing type, enabling automated ingestion of new SAT-MOD/SAT-AMD events

## See Also
- [[concepts/ngso-gso-coordination]]
- [[concepts/epfd-equivalent-power-flux-density]]
- [[concepts/schedule-s]]
- [[synthesis/fcc-ibfs-filings-coordination]]
- [[synthesis/space-regulatory-regimes-six-region]] — six-region regulatory map; why the round is US-specific and the ITU FCFS enclosure is the long-run scarcity
- [[synthesis/leo-taiwan-odc-gap]] — the "recipient not originator" pattern at the regulatory layer
- [[sources/fcc-part-25-2024]]
- [[sources/fcc-space-bureau-2023]]

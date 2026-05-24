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

## The 2020 Ku/Ka Processing Round

The most consequential modern processing round opened in 2020 for the **10.7–12.7 GHz, 12.75–13.25 GHz, 13.85–14.5 GHz, 17.7–18.6 GHz, 18.8–20.2 GHz, and 27.5–30 GHz** bands (standard Ku/Ka NGSO FSS bands). Participants included:
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
- [[sources/fcc-part-25-2024]]
- [[sources/fcc-space-bureau-2023]]

---
type: concept
tags: [itu, wrc, spectrum, ngso, biu, milestone, paper-satellite, regulatory, mission-desk, firefly]
---

# ITU Bringing-Into-Use (BIU) & Milestone Regime

The **bringing-into-use (BIU) + milestone-based deployment** regime is the set of ITU Radio Regulations (RR) rules that convert a *filed* satellite frequency/orbit claim into a claim that must actually be *flown* — the ITU's principal mechanism against **"paper satellites"** (spectrum/slot warehousing). This page is the **canonical** source for the BIU and milestone mechanics; [[concepts/ngso-gso-coordination]] and [[concepts/epfd-equivalent-power-flux-density]] reference it rather than restating it.

It sits one layer below the [[concepts/ngso-gso-coordination|API → CR → Notification]] pipeline: the pipeline establishes *priority*; BIU + milestones test whether that priority is ever *realized*, and strip it if not.

## Why it exists — the paper-satellite problem

The ITU Master International Frequency Register (MIFR) is allocated **first-come-first-served (FCFS)** on the **Advance Publication Information (API) priority date**, not on deployed hardware (see [[concepts/ngso-gso-coordination]] §FCFS). FCFS rewards *filing early and filing big*: an administration can reserve bands/slots far ahead of — or far in excess of — anything it will build. Combined with the [[concepts/epfd-equivalent-power-flux-density|EPFD]] blanket finding (one compliant NGSO system is deemed non-interfering worldwide), this produced a structural incentive to **warehouse** spectrum. The BIU rule (does a satellite actually occupy the resource?) and the milestone rule (is the notified *constellation* actually being built out?) are the two brakes.

## The two clocks, precisely

### 1. Bringing into use (BIU) — the occupancy test

- **GSO networks (RR No. 11.44):** a frequency assignment must be **brought into use within 7 years** of the date of receipt by the Bureau of the complete coordination/notification information; a GSO assignment is considered brought into use when a space station with the capability of transmitting/receiving it has been **deployed and maintained at the notified orbital position for a continuous period of 90 days**.
- **Non-GSO systems (RR No. 11.44C):** a frequency assignment is brought into use when a space station capable of transmitting/receiving it has been **deployed and maintained on one of the notified orbital plane(s)** of the non-GSO system **for a continuous period of 90 days** — *irrespective of* the notified number of orbital planes and satellites per plane. A **single** 90-day satellite brings the *whole* filing into use.
- **Confirmation:** the notifying administration must inform the Bureau of the confirmation of BIU **within 30 days** of the end of the 90-day period. Suspension/resumption of use is governed by **RR No. 11.49** (an assignment may be suspended for up to 3 years — extendable — before it is cancelled).

### 2. Milestones (Resolution 35, REV.WRC-23) — the build-out test

The 90-day BIU of *one* satellite is necessary but no longer sufficient. For non-GSO systems in the bands/services enumerated in **Resolution 35**, the notified constellation must then be *deployed to scale* on a schedule measured **from the end of the 7-year BIU regulatory period** (i.e., this clock runs *after* the BIU clock, not from the filing date):

| Milestone | Deployment threshold | Deadline (after end of BIU regulatory period) |
|---|---|---|
| Milestone 1 | **10 %** of the notified number of satellites | **+2 years** |
| Milestone 2 | **50 %** | **+5 years** |
| Milestone 3 | **100 %** | **+7 years** |

> **Precision correction (2026-09-12):** earlier wiki phrasing ("10 %/50 %/100 % within 2/5/7 years") omitted the anchor. The milestone clock starts at the **end of the BIU regulatory period**, so in the worst case full deployment is due **up to ~14 years after the API/notification priority date** (7-yr BIU + 7-yr milestone-3), not 7. This matters for the paper-satellite analysis: the regime tolerates a long glide path, which is why an aggressive FCFS filer can hold priority for a decade-plus before the 100 % test bites.

WRC-23 additionally adopted, around the WRC-19 milestone core:

- **Orbital tolerances** — bounded deviations (apogee/perigee altitude, inclination) around the notified orbital values, so a constellation deployed to slightly different orbits than filed is not automatically non-compliant.
- A **post-milestone mechanism** — the MIFR-recorded satellite count is reduced to the number actually deployed at each milestone (the filing is trimmed to reality rather than cancelled outright).
- **Periodic deployment reporting** — a **4-year** reporting cadence (annual if the in-orbit count drops below the notified number), keeping the MIFR reflective of actual deployment over the constellation's life.

**Purpose (ITU framing):** ensure the MIFR "reasonably reflects the actual deployment" of NGSO systems, striking a balance between *preventing spectrum warehousing*, the *proper functioning of coordination*, and the *real operational timelines* of building a constellation.

## WRC lineage & forward trajectory (拉長時間軸)

- **WARC-ORB-85/88, WRC-97, WRC-2000:** the GSO arc and then the EPFD single-global-standard framework ([[concepts/epfd-equivalent-power-flux-density|Article 22 / Resolution 76]]) establish shared-spectrum rules — but with weak anti-warehousing teeth; "paper satellites" become a recognized pathology.
- **WRC-12 / WRC-15 / WRC-19:** BIU tightened toward the 90-day occupancy standard; **WRC-19 introduces Resolution 35** — the milestone-based approach for non-GSO constellations (10 %/50 %/100 %).
- **WRC-23 (Dubai, 2023):** **REV.WRC-23** fine-tunes Resolution 35 — adds orbital tolerances, the post-milestone mechanism, and periodic reporting; leaves the [[concepts/epfd-equivalent-power-flux-density|Article 22 EPFD]] *values* unchanged but **refers an EPFD-limits study to the WRC-27 cycle**. Agenda for WRC-27 set in **Resolution 813 (WRC-23)** (~19 agenda items).
- **WRC-27 (Shanghai, 2027):** the EPFD Article 22 review is "in the spotlight" — studies target the Region 1 & 3 NGSO-FSS EPFD limits; industry expectation is *possible action* at WRC-27 with any **relaxation** potentially deferred to **WRC-31**. **CPM27-2** (the second Conference Preparatory Meeting, which drafts the technical options) is planned for **April 2027**. That the conference reviewing the megaconstellation-constraining EPFD rule is **hosted by China** — the single largest FCFS filer (see below) — is a geopolitically salient alignment, not a coincidence worth ignoring.
- **Long-horizon (labelled scenario, not forecast):** the milestone regime is the *only* live lever that reconnects paper priority to physical build-out. If BR enforcement proves real (filings trimmed at each milestone), FCFS stays a soft claim that decays without hardware; if enforcement is weak against state filers, milestones become a formality and FCFS priority hardens into the "**orbital enclosure**" inherited-property endpoint described in [[synthesis/space-regulatory-regimes-six-region]] §100-year view.

## The extreme case — China's ~193k-satellite filings

China, filing through **MIIT**, is the clearest stress test of whether BIU + milestones can discipline FCFS at scale: Guowang **GW-A59 (6,080) + GW-2 (6,912) = 12,992** (ITU filing 2020-09), then in **December 2025 the CTC-1 / CTC-2 filings of 96,714 satellites each** (≈**193,000** total notional satellites). Under Resolution 35 each of these must eventually clear the 10 %/50 %/100 % milestones or be trimmed — but the ~14-year glide path and the question of how rigorously the BR enforces against a permanent-member administration is exactly the open governance issue. See [[synthesis/space-regulatory-regimes-six-region]] and [[synthesis/space-situational-awareness-six-region]] for the strategic and collision-risk framings.

## Data access

| Artefact | Where | Public? |
|---|---|---|
| BIU / suspension notices, milestone reports | ITU BR **IFIC** (SNS special sections) | IFIC PDFs public; full machine-readable history via ITU SpaceExplorer subscription |
| Notified vs. deployed satellite counts | ITU **SNS / Master Register** | subset public (IFIC), full = subscription |
| Resolution 35 / 40 / RR Article 11 text | ITU Radio Regulations | published (purchase/BR access) |

## Relevance to Mission Desk / Firefly agents

- An **interference-attribution** or **priority** query ([[synthesis/fcc-ibfs-filings-coordination]], [[synthesis/space-regulatory-regimes-six-region]]) must treat a filing's *priority date* and its *BIU/milestone status* as distinct fields: a neighbour's API may hold priority while its milestone clock is running (or lapsed). The agent should surface `{api_priority_date, biu_confirmed?, next_milestone, notified_count, deployed_count}` per competing filing, not priority alone.
- A filing that has missed a milestone is a **degraded claim** — its MIFR count is reduced — which changes whether an interference source has a fully-defensible right to operate.

## See Also
- [[concepts/ngso-gso-coordination]] — the API→CR→Notification priority pipeline this regime gates
- [[concepts/epfd-equivalent-power-flux-density]] — the compliance standard; its WRC-27 review shares the same conference cycle
- [[concepts/processing-round]] — the US domestic analogue (Part 100 bond + milestone conditions)
- [[synthesis/space-regulatory-regimes-six-region]] — six-region (台美日韓中國歐洲) regulatory map; the FCFS/orbital-enclosure 100-year invariant
- [[synthesis/fcc-ibfs-filings-coordination]] · [[synthesis/space-situational-awareness-six-region]]
- [[sources/itu-radio-regulations-article-22-2023]]

## Sources

- **Non-GSO BIU (RR No. 11.44C), 90-day continuous on a notified plane, 30-day confirmation; GSO BIU (11.44) 7-year / 90-day** — ITU Space Services Department BIU briefings; corpus-verified 2026-09-12 via [ITU "Orbital characteristics and operational flexibility in non-GSO space stations" (2023-10)](https://www.itu.int/hub/2023/10/orbital-characteristics-and-operational-flexibility-in-non%E2%80%91gso-space-stations/) and ITU WRS BIU presentations.
- **Milestone-based approach (Resolution 35, REV.WRC-23): 10 %/50 %/100 % at +2/+5/+7 years after the end of the BIU regulatory period; orbital tolerances + post-milestone mechanism** — [ITU, "ITU Members agree to new milestones for non-geostationary satellite deployment" (2020-01, WRC-19 origin)](https://www.itu.int/hub/2020/01/itu-members-agree-to-new-milestones-for-non-geostationary-satellite-deployment/); [ITU Main WRC-23 Results](https://ctu.int/wp-content/uploads/2023/12/Main-WRC-23-Result-20.02.24.pdf); Resolution 35 (REV.WRC-23). Accessed 2026-09-12.
- **WRC-27 agenda (Resolution 813, WRC-23); EPFD Article 22 review; Shanghai host; CPM27-2 April 2027** — [Runway Girl Network, "EPFD limits in the spotlight as ITU selects Shanghai for WRC-27" (2025-12)](https://runwaygirlnetwork.com/2025/12/epfd-limits-in-the-spotlight-as-itu-selects-shanghai-for-wrc-27/); [US National Academies — Views on WRC-27 Agenda Items](https://www.nationalacademies.org/read/28596/chapter/4). Accessed 2026-09-12.
- **China Guowang + CTC-1/CTC-2 ~193k ITU filings** — [SpaceNews — China files for ~200,000 satellites](https://spacenews.com/china-files-itu-paperwork-for-megaconstellations-totaling-nearly-200000-satellites/). Accessed 2026-09-12.

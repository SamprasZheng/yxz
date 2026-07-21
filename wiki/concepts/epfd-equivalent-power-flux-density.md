---
type: concept
tags: [fcc, ibfs, regulatory, spectrum, epfd, itu, ngso, interference, mission-desk, firefly]
---

# EPFD — Equivalent Power Flux Density

Equivalent Power Flux Density (EPFD) is the aggregate interference metric defined in the ITU Radio Regulations to quantify the total downlink (or uplink) power arriving at a geostationary-orbit (GSO) receive station from **all transmitters** within a non-geostationary-orbit (NGSO) satellite system. It accounts for the off-axis gain discrimination of a reference GSO receiving antenna assumed to be pointing in its nominal direction.

EPFD is the governing constraint for all NGSO constellation operators wishing to share spectrum with GSO networks in the Fixed-Satellite Service (FSS) and Broadcasting-Satellite Service (BSS).

## Definition

$$EPFD_{down} = \sum_{i=1}^{N} \frac{P_i \cdot G_{t,i}(\theta_i)}{4\pi d_i^2} \cdot \frac{G_{r}(\phi_i)}{G_{r,max}}$$

Where:
- $P_i$ — transmit power of NGSO satellite $i$
- $G_{t,i}(\theta_i)$ — transmit gain of satellite $i$ toward the GSO earth station
- $d_i$ — slant range from satellite $i$ to the GSO earth station
- $G_r(\phi_i)$ — receive gain of the reference GSO earth station antenna at off-axis angle $\phi_i$
- $G_{r,max}$ — peak gain of the reference GSO earth station antenna
- $N$ — total number of active NGSO satellites in the constellation at the time instant

EPFD is computed as a **time-domain aggregate** across the entire constellation, not per-satellite. This makes it a statistical compliance metric: the NGSO operator must demonstrate that the distribution of EPFD values (across all time, all GSO orbital positions, all geographic locations) stays below the Article 22 limits.

## ITU Article 22 and Resolution 76

**ITU Radio Regulations Article 22** (No. 22.2) states that NGSO systems shall not cause unacceptable interference to and shall not claim protection from GSO networks in the FSS and BSS. Article 22 provides the primary EPFD limit tables.

> **Update (WRC-23 → WRC-27):** WRC-23 left the Article 22 EPFD limit *values* unchanged but **referred a study of those limits to WRC-27** (explicitly *without* committing to regulatory consequences at WRC-27 itself). The same conference tightened the surrounding [[concepts/ngso-gso-coordination|NGSO bringing-into-use / milestone]] framework: a deployment must reach **10 % / 50 % / 100 %** of the notified satellite count within **2 / 5 / 7 years**, with defined **orbital tolerances** (apogee/perigee/inclination) around notified values, a post-milestone mechanism, and **4-year periodic deployment reporting** (annual if the count falls below the notified number). EPFD compliance is therefore necessary but no longer sufficient — the milestone clock now also conditions the right to operate. *(Sources: [ITU Main WRC-23 Results](https://ctu.int/wp-content/uploads/2023/12/Main-WRC-23-Result-20.02.24.pdf); [Digital Regulation Platform](https://digitalregulation.org/regulation-of-ngso-satellite-constellations/), accessed 2026-06-07.)*

**Resolution 76 (Rev.WRC-23)** supplements Article 22 with **aggregate EPFD limits** (Tables 1A–1D in Annex 1) that account for multiple NGSO systems simultaneously interfering with the same GSO receiver. Key resolution tables:
- **Table 1B**: Aggregate downlink EPFD limits on GSO FSS earth stations from all NGSO FSS systems combined
- The resolution also defines the "qualified favorable" finding process at ITU — an NGSO system must submit compliance calculations using **ITU EPFD validation software** to receive this finding

Selected Article 22 downlink EPFD limit values (illustrative; band-dependent):
| Frequency band | EPFD limit (dBW/m²/MHz) | Reference table |
|---|---|---|
| 10.7–12.75 GHz (Ku downlink) | −160 to −175 (varies by elevation) | RR Table 22-1E |
| 17.7–19.7 GHz (Ka downlink) | −164 to −175 (varies) | RR Table 22-2 |

Exact values are elevation-angle and frequency-sub-band dependent; consult the ITU BR EPFD Support site at `itu.int/epfdsupport/` for the current validation software and tables.

## Compliance Approach

NGSO operators demonstrate compliance by:
1. Running a time-domain simulation of the complete constellation geometry over ≥ 10 days (or a statistically representative period) vs. a globally distributed set of reference GSO stations
2. Computing the EPFD cumulative distribution function (CDF)
3. Submitting the simulation outputs to ITU as part of the Coordination Request (CR) and Notification packages — these attach to the [[concepts/schedule-s|Schedule S]] exhibits
4. Receiving a "qualified favorable" finding from the ITU Radiocommunication Bureau (BR) that the system meets Article 22

NGSO systems that demonstrate EPFD compliance are **deemed not to cause unacceptable interference** to any GSO network worldwide — this replaces the need for individual coordination agreements with every GSO operator.

## EPFD Uplink (EPFD↑)

Article 22 also defines EPFD↑ — the aggregate uplink interference from NGSO earth stations into a GSO space station. This is calculated similarly, using the off-axis gain of a reference GSO spacecraft receive antenna.

## FCC Implementation

Historically the FCC incorporated ITU EPFD limits directly into its Part 25 rules. Per 47 CFR § 25.208 and related provisions, NGSO FSS systems must certify EPFD compliance as a condition of license grant, and for most of the 2000–2025 period the FCC set **no independent** EPFD values — it accepted ITU Article 22 as the operative domestic standard.

When the FCC grants a Part 25 NGSO license, the grant order explicitly conditions operations on maintained EPFD compliance and on the operator filing timely ITU notifications. If a subsequent ITU BR review finds the EPFD compliance calculations were inaccurate, the FCC may impose conditions or require modification of the license.

> **Update / correction (2026-04-30) — the US has domestically decoupled from the ITU fixed-limit standard.** In the *Modernizing Spectrum Sharing for Satellite Broadband* R&O (**FCC 26-26**, adopted **2026-04-30** by a 3–0 vote, effective **2026-07-13**; Fed. Reg. 2026-05-13), the FCC **replaced the legacy ITU Article 22 fixed EPFD power-density limits** in the **10.7–12.7 GHz, 17.3–18.6 GHz, and 19.7–20.2 GHz** bands with a **performance-based GSO-protection framework**: instead of applying fixed dBW/m²/MHz caps, the rules now measure whether NGSO operations *degrade GSO service quality*, paired with **mandatory good-faith coordination** between NGSO and GSO operators and **technical backstops** that apply only where private coordination fails. This is the **first time an administration has set its own domestic NGSO-protection criteria distinct from ITU Article 22** — a material crack in what had been the most genuinely supranational piece of space regulation. It supersedes the "FCC sets no independent EPFD limits" claim above *for these three bands* (ITU Article 22 remains the operative standard for all other bands, all other administrations, and the international Notification a US operator still files). *(Sources: [Via Satellite 2026-04-30](https://www.satellitetoday.com/government-military/2026/04/30/fcc-updates-epfd-framework-that-covers-geo-ngso-spectrum-sharing/); [Federal Register — Modernizing Spectrum Sharing for Satellite Broadband](https://www.federalregister.gov/documents/2026/05/13/2026-09565/modernizing-spectrum-sharing-for-satellite-broadband); [FCC 26-26 R&O](https://docs.fcc.gov/public/attachments/FCC-26-26A1.pdf), accessed 2026-07-03.)* See [[synthesis/space-regulatory-regimes-six-region]] — this partially falsifies that synthesis's "spectrum axis converges globally at the ITU" thesis: convergence held for 25 years, then the largest market began to diverge.

> **Do not conflate the two 2026 FCC tracks.** The EPFD change here is **FCC 26-26** (adopted 2026-04-30, effective 2026-07-13) — a change to the **NGSO/GSO interference rule**. It is *distinct* from the **Part 100 "Space Modernization" Report and Order** (SB Docket 25-306, circulated for the **2026-07-22** Open Meeting vote, scheduled not yet adopted as of 2026-07-21), which overhauls the **licensing process** (Part 25 → Part 100 assembly line, 20-year terms, regularized [[concepts/processing-round|processing round]]) and does **not** itself alter EPFD limits. Same modernization agenda, two separate instruments: 26-26 = interference rule; Part 100 = process. See [[concepts/processing-round]] and [[concepts/schedule-s]] for the Part 100 details.

## Constellation-Scale Implications

For large LEO constellations (Starlink Gen2: ~7,500 sats; Kuiper: ~3,236 sats), EPFD becomes the central regulatory design constraint:
- Inclination, altitude, and inter-satellite spacing are all partially optimised to keep aggregate EPFD below Article 22 limits
- Active EPFD control (reducing transmit power or blanking beams when a GSO station is in the interference zone) is a required operational capability
- NGSO–NGSO interference is a separate coordination matter (not covered by Article 22 EPFD) and requires bilateral coordination or processing-round procedures — see [[concepts/ngso-gso-coordination]] and [[concepts/processing-round]]

## Relevance to Mission Desk / Firefly Agents

- EPFD limits constrain the maximum aggregate downlink EIRP density that a LEO orbital data center (see [[concepts/orbital-data-center]]) can receive from its constellation; an unexpected downlink degradation event may correlate with a neighbour satellite's EPFD headroom being reduced by a filing modification
- The public ITU EPFD Support site (`itu.int/epfdsupport/`) provides the validation software and reference antenna pattern files — accessible without ITU SNS subscription
- The [[synthesis/fcc-ibfs-filings-coordination]] synthesis documents the MVP recipe for querying EPFD compliance status via public IBFS + ITU data

## Historical Lineage & Long-Horizon View

- **1995–2000:** the NGSO/GSO sharing problem arrives with the first "Big LEO" and broadband-NGSO filings (Teledesic, SkyBridge). **WRC-2000** adopts the Article 22 EPFD limit tables and **Resolution 76** — the founding act of the single-global-standard regime; the ITU commissions free validation software so any administration can check any filing against identical limits.
- **2000–2019:** EPFD limits are largely static; the megaconstellation era (Starlink/OneWeb/Kuiper) revives the argument that WRC-2000 limits, written for a handful of NGSO systems, are too conservative for aggregate modern deployments.
- **WRC-23 (2023):** leaves the Article 22 *values* unchanged but **refers a study of aggregate NGSO EPFD behaviour to the WRC-27 cycle — explicitly without regulatory consequence at WRC-27**; industry commentary expects no formal limit change before **WRC-31**.
- **2026-04-30:** the FCC breaks ranks domestically (FCC 26-26, above), replacing fixed limits with performance-based GSO protection in three Ku/Ka bands — the first national divergence from the ITU standard.
- **Long-horizon (labelled scenario, not forecast):** two forks. (i) *Re-convergence* — the ITU study cycle folds performance-based criteria into a revised Article 22 at WRC-31/WRC-35, and the FCC pivot becomes the template the world adopts. (ii) *Fragmentation* — each large market sets its own domestic NGSO/GSO protection rules (US performance-based, EU coordination-led, China state-allocated), and EPFD degrades from a global blanket finding into one more nationally-negotiated layer, re-coupling the spectrum axis to the sovereignty logic that already governs launch. Which fork wins is the 100-year question for whether orbital spectrum stays a commons or encloses. See [[synthesis/space-regulatory-regimes-six-region]] §on the "orbital enclosure" invariant.

## Cross-Administration Note

Article 22 EPFD *was*, for 25 years, a **single global standard** — every administration (FCC for the US, MIIT for China, MIC/Cabinet Office for Japan, MSIT for Korea, national European regulators, NCC for Taiwan) filed its operators' NGSO systems against the *same* limits and the *same* validation software, and none set independent EPFD values. This made EPFD the most genuinely supranational piece of space regulation and the reason the spectrum axis — unlike the nationally-divergent launch axis — converged globally. **As of the 2026-04-30 FCC order that convergence is no longer absolute:** for three Ku/Ka bands the US now applies its own performance-based domestic criteria while still filing the *international* Notification against ITU Article 22. The tension between the domestic protection rule and the international filing standard is new and worth watching. See [[synthesis/space-regulatory-regimes-six-region]] for the six-region (台美日韓中國歐洲) comparison of which administration files for whom and how ITU first-come-first-served priority interacts with the EPFD blanket finding.

## See Also
- [[concepts/ngso-gso-coordination]]
- [[concepts/processing-round]]
- [[concepts/schedule-s]]
- [[synthesis/fcc-ibfs-filings-coordination]]
- [[synthesis/space-regulatory-regimes-six-region]]
- [[sources/itu-radio-regulations-article-22-2023]]
- [[concepts/leo-value-chain]]
- [[concepts/hybrid-phased-array]]

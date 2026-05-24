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

The FCC incorporates ITU EPFD limits directly into its Part 25 rules. Per 47 CFR § 25.208 and related provisions, NGSO FSS systems must certify EPFD compliance as a condition of license grant. The FCC does not set independent EPFD limits — it accepts ITU Article 22 as the operative standard.

When the FCC grants a Part 25 NGSO license, the grant order explicitly conditions operations on maintained EPFD compliance and on the operator filing timely ITU notifications. If a subsequent ITU BR review finds the EPFD compliance calculations were inaccurate, the FCC may impose conditions or require modification of the license.

## Constellation-Scale Implications

For large LEO constellations (Starlink Gen2: ~7,500 sats; Kuiper: ~3,236 sats), EPFD becomes the central regulatory design constraint:
- Inclination, altitude, and inter-satellite spacing are all partially optimised to keep aggregate EPFD below Article 22 limits
- Active EPFD control (reducing transmit power or blanking beams when a GSO station is in the interference zone) is a required operational capability
- NGSO–NGSO interference is a separate coordination matter (not covered by Article 22 EPFD) and requires bilateral coordination or processing-round procedures — see [[concepts/ngso-gso-coordination]] and [[concepts/processing-round]]

## Relevance to Mission Desk / Firefly Agents

- EPFD limits constrain the maximum aggregate downlink EIRP density that a LEO orbital data center (see [[concepts/orbital-data-center]]) can receive from its constellation; an unexpected downlink degradation event may correlate with a neighbour satellite's EPFD headroom being reduced by a filing modification
- The public ITU EPFD Support site (`itu.int/epfdsupport/`) provides the validation software and reference antenna pattern files — accessible without ITU SNS subscription
- The [[synthesis/fcc-ibfs-filings-coordination]] synthesis documents the MVP recipe for querying EPFD compliance status via public IBFS + ITU data

## See Also
- [[concepts/ngso-gso-coordination]]
- [[concepts/processing-round]]
- [[concepts/schedule-s]]
- [[synthesis/fcc-ibfs-filings-coordination]]
- [[sources/itu-radio-regulations-article-22-2023]]
- [[concepts/leo-value-chain]]
- [[concepts/hybrid-phased-array]]

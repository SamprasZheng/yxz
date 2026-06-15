---
type: entity
tags: [taiwan, space, rf-hardware, satellite, leo, vendor, phased-array, aesa, counter-uas, defense, ka-band]
---

# Tron Future Tech (創未來科技)

**Tron Future Tech** is a Taiwanese RF / phased-array company founded in **2018** by **Yu-Jiu Wang (王毓駒)**, a former professor in the Department of Electronics Engineering at **National Chiao Tung University (NCTU, now NYCU)**. It is referenced in [[sources/hsieh-xband-leo-transmitter-2020]] as the XT-144 system vendor, and in the wiki graph it is the **industry-side counterpart** to the NCTU/RFVLSI-Lab X-band-transmitter and AESA work — notably the *same NCTU lab lineage* as that thesis source. Its core asset is an **independently developed Active Electronically Scanned Array ([[concepts/aesa|AESA]])** platform reused across counter-drone radar and LEO satellite terminals.

> This page upgrades the earlier graph-stabilizing stub with verified public facts (2026-06-15).

## Why It Matters (System Layer)

Tron Future is the most concrete **counter-example** to the wiki's recurring "Taiwan = strong upstream, absent midstream" thesis ([[synthesis/leo-taiwan-odc-gap]], [[synthesis/phased-array-rf-frontend-supply-chain]]): it is a Taiwanese firm that does *array integration*, not just component foundry — designing and building complete AESA systems (radar + jammer + Ka-band user terminal) in-house. It demonstrates the dual-use convergence that [[concepts/aesa]] describes at the system layer: **one AESA platform** monetised simultaneously as (a) defense counter-UAS radar and (b) commercial LEO-satcom flat-panel terminal — exactly the shared-volume economics that make phased arrays strategically contested. It also makes Tron Future a node in Taiwan's defense-tech and LEO-resilience story (T-Dome counter-drone initiative; subsea-cable-cut comms resilience).

## Product Lines

| Product | Function | Notes |
|---|---|---|
| **T.Radar / T.Radar Pro** | In-house **AESA** counter-drone detection radar | Core of the C-UAS suite, deployed with Taiwan's armed forces |
| **T.Sensor** | Passive RF detection | Complements active radar |
| **T.Jammer** | Drone neutralization (RF jamming) | Effector layer of the kill chain |
| **T.SpaceRouter** | **AESA Ka-band LEO-satcom user terminal** (automotive/vehicular) | TX + RX arrays, **1024 elements each**; ITU Ka-band (DL 17.8–20.2 GHz, UL 27.5–30 GHz); prototype delivered |
| **CubeSAT payloads / SpaceHub** | Space RF payloads + ground/edge nodes | LEO-satellite product line |

## Historical Lineage & Milestones

- **2018** — founded by ex-NCTU professor Yu-Jiu Wang; thesis-era XT-144 phased-array work is the technical seed (links to [[sources/thesis-aesa-modules-zheng-2021]]).
- **2023** — partners on **LEO-satcom testing under the Foxconn-initiated MIH EV project**; presents at EU-Taiwan satellite-industry symposium; demonstrates T.SpaceRouter automotive Ka-band terminal.
- **May 2024** — completes **Series A of ~NT$900 million (≈US$32.4M)**, led by government-backed **Taiwania Capital** + **CID Group** (with Industrial Technology Investment Corp., Taya Venture, Taiwan Cooperative Venture Capital).
- **Jan 2025** — wins a Taiwan military contract for **26 anti-drone systems**; becomes Taiwan's largest C-UAS supplier; reports producing **>100 anti-drone systems/month**; units deployed at critical infrastructure (e.g. Hsinchu Science Park).
- **Oct 2025** — featured in Taiwan's **"T-Dome"** national counter-drone defense initiative.

## Six-Region Context

Tron Future is the **Taiwan** entry in the dual-use AESA picture — the rare *midstream array integrator*, not just an upstream foundry:

| Region | Comparable AESA system integrator | Tron Future's relative position |
|---|---|---|
| **US** | Anduril, RTX, Lockheed counter-UAS + SATCOM phased arrays | Far smaller scale; niche dual-use focus |
| **Europe** | Thales/Leonardo/Hensoldt (radar), Saab | Comparable *niche*, far smaller budget |
| **China** | CETC all-digital phased arrays at volume | Tron Future is a deterrence-side counter to PLA drone/AESA volume |
| **Japan/Korea** | Mitsubishi Electric / Hanwha-LIG Nex1 AESA | Tron is younger, startup-scale |
| **Taiwan** | **Tron Future is effectively the indigenous AESA array integrator** | Closes part of the "absent midstream" gap at the phased-array node |

It sits *downstream* of Taiwan's upstream foundries ([[entities/win-semiconductors]] GaAs/GaN MMIC, which can supply the PA layer) and *alongside* the public-sector demand node [[entities/nspo|TASA]].

## Forward Trajectory (scenario / projection, not fact)

- **2026–2028:** scale C-UAS production under T-Dome; mature T.SpaceRouter toward volume LEO-terminal shipments; potential prime-contractor role if [[entities/nspo|TASA]] pulls system integration domestic.
- **2030s+:** the open question is whether a startup-scale AESA integrator can survive against US/China volume — or whether it becomes an acquisition target / sovereign-defense champion. **Label:** projection from current funding + contract trajectory, not a forecast.

## Sources & Verification (accessed 2026-06-15)

- Founding 2018, founder ex-NCTU professor Yu-Jiu Wang, AESA core, C-UAS + LEO: [DigiTimes, "Tron Future completes Series A round" (2024-05-16)](https://www.digitimes.com/news/a20240516VL202/defense-drone-satellite-tron-future.html); [Taiwania Capital news (2024-05-23)](https://www.taiwaniacapital.com/en/news/category/news/2024/news240523); [CommonWealth, "How a Taiwan professor created a drone defense tower" (2023-10-04)](https://english.cw.com.tw/article/article.action?id=3531)
- Series A ~NT$900M (~US$32.4M), Taiwania + CID lead: as above (DigiTimes / Taiwania)
- Military contract 26 systems + largest C-UAS supplier + >100/month: [DigiTimes, "Taiwan startup secures military contract" (2025-01-21)](https://www.digitimes.com/news/a20250121VL206/drone-military-taiwan.html)
- T.SpaceRouter 1024-element TX/RX Ka-band terminal + LEO/Foxconn MIH test: [DigiTimes, "Tron Future to test LEO satellite communication under Foxconn-initiated EV project" (2023-05-18)](https://www.digitimes.com/news/a20230518VL204/drone-leo-satellite-mih-satellite.html); [NTNU Taiwan Research Highlight, "Taiwan AESA Plays an Important Role in Global LEO Applications"](https://trh.gase.most.ntnu.edu.tw/en/article/content/272)
- T-Dome national counter-drone context: [DroneXL, "Taiwan's New T-Dome" (2025-10-15)](https://dronexl.co/2025/10/15/taiwan-t-dome-counter-drone-defense/)

## Related

- [[sources/hsieh-xband-leo-transmitter-2020]] — XT-144 system context (same NCTU lab lineage)
- [[sources/thesis-aesa-modules-zheng-2021]] — XT-144 / AESA module thesis
- [[entities/nspo]] — public-sector (TASA) counterpart to this private vendor
- [[entities/win-semiconductors]] — upstream GaAs/GaN MMIC foundry that feeds the PA layer
- [[concepts/aesa]] — the array architecture Tron Future builds
- [[concepts/hybrid-phased-array]] — architecture family for its terminals
- [[concepts/zero-if-transmitter]] — transmitter block in such systems
- [[concepts/leo-value-chain]] — midstream node Tron Future partially fills
- [[synthesis/phased-array-rf-frontend-supply-chain]] — six-region RF front-end map
- [[synthesis/leo-taiwan-odc-gap]] — the "absent midstream" thesis Tron Future partially counters
</content>

---
type: concept
tags: [leo, satellite, taiwan, rf-hardware, investment, supply-chain, isl, odc, defense]
---

# LEO Industry Value Chain (Low Earth Orbit Value Chain)

## Overview

The LEO satellite industry can be divided by product lifecycle into upstream, mid-stream (A/B/C), and downstream segments, with significantly different technical barriers and business models across segments. Global LEO investment reached $45 billion in 2025; space data centers are the newest emerging theme in 2026.

---

## Upstream: Raw Materials and Core Components

This segment determines the performance ceiling of satellites and is where Taiwan manufacturers are most competitive.

### RF Components (GaAs PA / Filters)
- **Win Semiconductors ([[entities/win-semiconductors]], 3105)**: Global leader in LEO-spec PA (power amplifier) contract manufacturing
- **Ascend Tech ([[entities/ascend-tech]], 3491)**: Filters, waveguides; has entered Starlink and Amazon Kuiper supply chains; gross margin >50%

### Space-Grade Solar Cells (High-Efficiency GaAs Cells)
As per-satellite power requirements surge from 2 kW to over 10 kW (Starlink V3, AI compute on orbit), high-efficiency GaAs solar cells become an essential need.

### Radiation-Resistant Compute Chips (NVIDIA H100 / Custom GPUs)
The biggest engineering challenge for [[concepts/orbital-data-center]]: balancing commercial off-the-shelf (COTS) against space-hardened components. No Taiwan manufacturers currently dominate this. NVIDIA H100 has validated commercial GPU viability on Starcloud-1. See [[concepts/rha-radiation-hardening]] and [[concepts/see-single-event-effects]] (SEU/SEL risks) for details.

### High-Frequency PCB / Substrates (HDI / Low-Loss Microwave Boards)
High-band (Ka/V) satellite antennas and RF modules require low-loss microwave substrates (Rogers, PTFE series) and HDI multilayer boards, distinct from standard consumer electronics PCBs. [[entities/huatong-pcb]] already has scale advantages in LEO satellite-specific substrates.

---

## Mid-stream A: Satellite Bus Manufacturing and Systems Integration

### PCB and Structural Boards
**[[entities/huatong-pcb]] (Huatong)**: Close to 80% global market share in LEO satellite-specific PCBs (as of end of 2025). LEO satellite board revenue in Q4 2025 exceeded NT$15.5 billion (historical high). Taiwan's PCB manufacturers collectively form a structural advantage.

### Constellation Operator Satellites (Starlink V3 / Amazon Leo)
- Starlink V3 increases the proportion of laser inter-satellite links (ISL), placing higher demands on RF components and thermal management
- Amazon Leo (formerly Project Kuiper) has launched >150 satellites, targeting a 3236-satellite constellation

### On-Board Compute Modules (GPU Cluster / Thermal Management Systems)
On-orbit compute modules are the core hardware units of [[concepts/orbital-data-center]]. Key challenges:
- GPU stability and longevity in radiation environments
- Thermal design (no convection environment; relies entirely on radiative cooling and thermal conduction)
- Power management (10 kW+ power from solar arrays)

### Laser Inter-Satellite Links (ISL) — Optical Communications / Precision Pointing
ISL is the key differentiator for LEO constellation latency performance:
- Speed-of-light transmission (vs. ground fiber requiring routing around Earth)
- Requires high-precision pointing/acquisition/tracking (PAT) systems
- Starlink, Amazon Leo, and [[entities/ada-space]] all use ISL architecture
- Related suppliers: Mynaric, SA Photonics, and other optical communications manufacturers

---

## Mid-stream B: Launch Services and On-Orbit Deployment

### Heavy-Lift Rocket Launch (Falcon 9 / Starship)
- Global LEO investment ~$25 billion in 2024; exceeded $45 billion in 2025
- Continuously declining launch costs (SpaceX) are the key leverage point for lifecycle commercial viability

### Orbital Slots / Spectrum (ITU Ku/Ka/V Band Scarcity)
Per ITU memos from late 2025 to early 2026: commercially valuable 500–1200 km orbital inclinations and Ku/Ka/V frequency bands are approaching exhaustion. Competition for LEO resources has escalated from a technical race to **strategic resource preemption**. ITU first-filed first-served rules give early movers SpaceX and OneWeb significant advantages.

### Lifecycle Management (Deorbiting / Debris Avoidance)
As constellation scale grows, debris management becomes a dual regulatory and engineering challenge:
- ITU/FCC requires commercial satellites to complete deorbit within 5 years of end-of-life
- Active Debris Removal (ADR) technology is still in early commercialization
- Satellite lifetime (3–10 years) determines the constellation replacement cycle and ongoing investment requirements

---

## Mid-stream C: Space Data Centers (Hottest New Theme)

→ See [[concepts/orbital-data-center]] for details

### On-Orbit Compute Nodes (Starcloud H100 / Axiom ODC)
Core logic: Explosive growth in Earth data center energy consumption (2024→2026: 415→650 TWh) × free space solar energy × radiative cooling → long-term cost disruption. Taiwan manufacturers are currently almost absent from this segment.

### Energy Systems (24hr Solar Arrays / Radiative Cooling)
24/7 solar power (no cloud cover) + passive radiative cooling toward the cosmic background is the differentiated energy advantage of ODC.

### Distributed Orbital Networks (China's Three-Body Computing / 2800-Satellite Target)
[[entities/ada-space]]'s 2800-satellite constellation represents the strategic scaling route for ODC.

### AI Inference / Training (Google Suncatcher / TPU / Optical Communications)
[[entities/google-suncatcher]] is a key signal of tech giants entering ODC: Google plans to deploy TPUs to orbit, integrating with ground-based model training infrastructure via optical communications to achieve low-cost large-scale AI compute expansion.

---

## Downstream A: Ground Infrastructure and Receiving Terminals

### User Terminal Equipment (Antenna / LNB / Router)
Consumer-side receiving equipment; Taiwan antenna and LNB manufacturers have some participation here.

### Ground Station Networks (Gateway Stations / Core Networks)
Gateway stations are the bridge between constellations and the core routing of ground internet, requiring global distributed deployment (typically 30–75 stations per constellation), driving demand for satellite ground equipment procurement.

### Hybrid Space-Ground DC Architecture (Hybrid Cloud / Downlink)
Recently emerging model: ODC nodes + ground data centers operating cooperatively, forming a "hybrid space-ground cloud." ODC performs inference/edge tasks, ground DC performs training/storage-intensive tasks, with intermediate results transmitted via high-speed downlink. This is the most likely first commercial landing point for ODC.

---

## Downstream B: Terminal Services and Applications

### Global Broadband Connectivity (D2D / Remote Areas)
Direct-to-device (D2D / NTN) service major camps:

| Camp | Partners |
|------|-------|
| T-Mobile × SpaceX | D2D pioneer |
| AT&T/Verizon × AST SpaceMobile | Alternative major camp |

### Earth Observation AI (Wildfire Detection / Agriculture)
On-orbit AI processing resolves the contradiction of "large data volumes × limited bandwidth × time-critical decisions." Wildfire detection, agricultural monitoring, and vessel identification are the most mature commercial scenarios.

### Defense / Sovereign Cloud (Secure Storage / Edge AI)
Orbital nodes inherently offer: geographic independence (unaffected by ground conflicts), difficult to physically destroy, global coverage. Each nation's sovereign cloud and military ISR are among the earliest paying use cases for ODC.

### Aviation / Maritime (In-Flight Wi-Fi / Fleet)
Starlink Aviation (in-flight Wi-Fi) and Maritime services are already mature markets, providing a stable ARPU base for the constellation.

---

## Taiwan Competitiveness Map

| Segment | Taiwan Presence | Notes |
|------|-----------|------|
| Upstream RF PA | ★★★★★ | Win Semiconductors global leader |
| Upstream filters | ★★★★★ | Ascend Tech >50% gross margin |
| Upstream high-frequency PCB | ★★★★★ | Huatong 80% market share |
| Mid-stream A ISL optical communications | ★★☆☆☆ | Precision optics not a Taiwan strength |
| Downstream ground terminals | ★★★★ | Antenna, LNB, power |
| **Mid-stream C ODC hardware integration** | **★☆☆☆☆** | **Structural gap → potential opportunity** |
| **Radiation testing infrastructure (TID/SEE)** | **★☆☆☆☆** | **Implicit threshold: no local capability; manufacturers must qualify overseas** |

> ⚠️ **Implicit threshold**: All upstream components (RF PA, filters, PCB substrates) entering formal constellation supply chains must pass complete TID / SEE qualification. Taiwan currently has no local heavy-ion accelerator or large Co-60 facility, representing a structural weakness that has not yet been publicly discussed. See [[concepts/rha-radiation-hardening]] for details.

## Related Sources

- [[sources/leo-space-datacenter-analysis-2025]]

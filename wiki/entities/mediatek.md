---
type: entity
tags: [mediatek, semis, taiwan, soc, connectivity, fabless, mobile, wifi, asic, ai-pc, arm]
---

# MediaTek Inc. (聯發科技, TWSE: 2454)

Taiwanese fabless semiconductor designer headquartered in Hsinchu Science Park. Founded 1997 as a spin-off from United Microelectronics Corporation (UMC). By revenue, one of the world's largest fabless IC design houses: full-year 2025 revenue approximately NT$596 billion (~USD $19.1 billion), up ~12% year-over-year (CONFIRMED, 2026-01). Market capitalisation approximately USD $219 billion as of May 2026 (CONFIRMED, 2026-05). All production is outsourced to TSMC and other contract foundries — MediaTek owns no wafer fabs.

## Business Segments

MediaTek's revenue is organised into three reported segments as of H1 2025:

| Segment | Revenue share (approx.) | Description |
|---|---|---|
| Mobile Phone | ~52% (Q4 2025: 59%) | Dimensity smartphone SoCs, 5G modems |
| Smart Edge Platforms | ~38–41% | Wi-Fi/Bluetooth connectivity, Genio IoT, automotive, TV/display, AI-PC (N1X) |
| Power ICs | ~6–8% | PMIC, USB-C power delivery |

The Q4 2025 smartphone share of 59% reflected seasonal flagship demand strength; full-year blended mix sits closer to 52/41/7 (CONFIRMED, 2026 Q4 earnings).

### Dimensity — Mobile SoC

The **Dimensity** brand covers MediaTek's flagship, premium-mid, and entry 5G smartphone SoCs. The Dimensity 9400 (announced October 2024, TSMC 3nm) introduced an all-big-core Arm v9.2 CPU cluster and the first MediaTek APU 890 on-device generative-AI engine. It is the platform on which the confirmed Qorvo Wi-Fi 7 FEM reference design (see below) ships.

### Connectivity — Wi-Fi, Bluetooth, 5G Modem

MediaTek is the world's largest supplier of Wi-Fi chipsets by unit volume. The **MT6653** is its Wi-Fi 7 / Bluetooth 5.4 combo chip, integrated into the Dimensity 9400 platform. Wi-Fi 7 (802.11be) support spans 2.4 / 5 / 6 GHz bands with 320 MHz channels and Multi-Link Operation (MLO). The connectivity segment also includes standalone router chips (Filogic series) and 5G modem IP co-integrated into Dimensity SoCs.

**Wi-Fi 7 RF front-end supply chain:** Qorvo was selected by MediaTek as a key supplier of Wi-Fi 7 front-end modules (FEMs) for the Dimensity 9400 platform, with volume shipments beginning Q4 2024 (CONFIRMED — Qorvo press release, November 2024). Qorvo supplies both linear and non-linear architecture FEMs plus integrated BAW-filter iFEMs. Skyworks separately demonstrated early 6G RF front-end modules (SKYR60002 FR3 LNA/PA and SKY58287-11 UHB PC1 PA) jointly with MediaTek at MWC Barcelona, March 2026, targeting coordinated chipset-to-RFFE validation for 6G (CONFIRMED, 2026-03). These supply relationships illustrate how each MediaTek chipset generation pulls significant RF front-end content from specialist suppliers — see [[entities/qorvo]], [[entities/skyworks]], and [[concepts/rf-front-end-module]].

### Genio — IoT and Smart Edge

The **Genio** platform (Genio 130 through Genio 700/720) targets industrial automation, AIoT kiosks, robotics, and smart-home hubs. Genio 700/720 integrate dedicated NPU blocks for edge generative-AI inference. Genio competes with NXP i.MX, Qualcomm QCS, and Rockchip in the embedded Linux/AIoT space.

## Role in NVIDIA N1X

### What N1X Is

The **N1X** is a heterogeneous multi-chip package (MCP) for Windows-on-Arm laptops and mini-PCs, co-developed by NVIDIA and MediaTek. It was formally unveiled by Jensen Huang at Computex Taipei on 1 June 2026 (CONFIRMED, 2026-06-01). See [[entities/nvidia-n1x]] for the full platform page.

### Division of Labour: Two Chiplets in One Package

The N1X consists of two silicon dies in a 2.5D package on TSMC N3 (3nm), bonded via NVIDIA's NVLink-C2C interconnect at 300 GB/s bidirectional bandwidth:

| Die | Designer | Content |
|---|---|---|
| CPU die | **MediaTek** | 20 Arm v9.2 cores — 10x Cortex-X925 (performance, ~4.0–4.2 GHz) + 10x Cortex-A725 (efficiency); 32 MB shared L3 cache |
| GPU die | **NVIDIA** | Blackwell architecture; 48 Streaming Multiprocessors / 6,144 CUDA cores (matches desktop RTX 5070 core count); 5th-gen Tensor Cores (NVFP4); dedicated RT cores |

Unified LPDDR5X memory up to 128 GB is shared across both dies. The GPU carries NVIDIA's full CUDA software stack. There is no dedicated NPU block reported in confirmed specifications; Tensor Cores serve the AI-inference role.

MediaTek's contribution is the CPU subsystem plus the SoC integration expertise — Arm licensing, power management IP, I/O fabric, and the physical packaging relationship with TSMC. NVIDIA contributes the GPU architecture and CUDA/driver ecosystem. The chip is sold and branded under the NVIDIA N1X name; MediaTek's role is that of a co-design and CPU-die supplier, not the lead brand.

OEM partners developing N1X devices confirmed as of Computex 2026: Dell (XPS / Alienware lines), Lenovo (Legion and Yoga Pro), Asus, and MSI. First retail devices are targeted for October 2026; broad market availability expected early 2027 (CONFIRMED, 2026-06).

### Strategic Significance for MediaTek

1. **Entry into Windows PC compute.** MediaTek has historically been absent from the Windows PC SoC market. The N1X design win marks the company's first CPU footprint in laptop-class Windows hardware — a segment that ships approximately 250–270 million units per year. AI PCs (NPU-equipped) are projected at 143 million units (~55% of total PC market) in 2026 per Gartner (CONFIRMED, August 2025 Gartner release).

2. **ASP and mix-shift uplift.** A Windows AI-PC SoC commands materially higher average selling price than a mid-range smartphone SoC. The N1X CPU die is a premium part on 3nm; even if MediaTek earns silicon margin on the CPU die rather than a full-SoC royalty, the ASP per unit is substantially higher than the blended smartphone SoC ASP.

3. **Co-design credibility for further ASIC wins.** Demonstrating the ability to co-design a complex heterogeneous CPU+GPU package with NVIDIA strengthens MediaTek's pitch to other hyperscalers and OEMs for custom silicon.

### The Margin-vs-Hype Question (Public Framing)

Public analyst commentary and MediaTek's own earnings guidance point to a nuanced margin picture:

- MediaTek's blended gross margin was **~48% in Q1 2025** and guided ~46% ±1.5pp for Q1 2026 (CONFIRMED, Digitimes / earnings, 2025-04-30). The modest sequential compression reflects a richer mix of lower-margin connectivity and ASIC products against a slight flagship-smartphone headwind.
- **ASIC products generally carry lower gross margins than standalone mobile SoCs** — this dynamic is well-documented at Broadcom (see Digitimes, December 2025) and is structurally true for MediaTek's data-centre ASIC work as well. The mechanism: in a co-design or ASIC arrangement the customer (NVIDIA, Google) effectively drives the silicon specification and retains substantial value, leaving the chip supplier with a silicon-fabrication margin rather than the full software/ecosystem premium that a branded SoC commands.
- For the N1X specifically, the commercial arrangement is not publicly disclosed. NVIDIA brands and sells the chip; MediaTek's revenue recognition likely comes from CPU-die silicon sales to the joint-project entity (RUMORED / structure inferred from public statements — exact terms not disclosed, as of 2026-06).
- **The bull case for MediaTek margins:** premium 3nm CPU die at high ASP; potential for a long product cycle given Windows-on-Arm ecosystem lock-in; volume upside if N1X gains PC OEM traction.
- **The bear case:** thin silicon margin vs. NVIDIA's full-stack premium; execution risk on a new product category; Windows-on-Arm software compatibility headwinds that delayed the launch by ~2 quarters.
- Net, the N1X design win is better characterised as an **ASP and TAM expansion play** than a near-term gross-margin expansion story. Its margin contribution depends heavily on volume ramp and the undisclosed revenue-sharing structure.

## AI ASIC Vector — Google TPU

MediaTek is pursuing a second AI-semiconductor revenue stream via hyperscaler ASIC co-design:

- In March 2025, Google tasked MediaTek to design **I/O modules** (SerDes, high-speed interfaces, peripheral data-path) for the **Ironwood** (TPU v7 / 8th-gen) processor (CONFIRMED, multiple trade press, 2025-03).
- MediaTek is reportedly designing the **"Zebrafish"** cost-optimised inference variant of TPU v8, targeting TSMC N2 (2nm) and aimed at a late-2027 production schedule (RUMORED — trendline from multiple trade sources as of early 2026).
- Data-centre ASIC revenue is projected to exceed USD $1 billion in 2026 and grow to multi-billion by 2027–2028, per MediaTek CEO Rick Tsai guidance at Q1 2025 earnings (CONFIRMED).
- The TPU v8i win has reportedly opened conversations with Oracle, Tencent, and ByteDance for custom inference chip designs (RUMORED — trade press, 2026-04).

See [[concepts/asic-penetration-indicator]] for the broader industry framework of fabless ASIC penetration in hyperscaler compute.

## Financial Snapshot

| Metric | Value | Period | Status |
|---|---|---|---|
| Full-year revenue | NT$596 billion (~USD $19.1B) | FY2025 | CONFIRMED |
| Revenue growth | +12.3% YoY | FY2025 | CONFIRMED |
| Q1 2026 revenue | NT$149.2 billion | Q1 2026 | CONFIRMED |
| Q1 2025 gross margin | 48% | Q1 2025 | CONFIRMED |
| Q1 2026 gross margin guidance | 46% ±1.5pp | Q1 2026 | CONFIRMED |
| Global smartphone SoC share | ~38% by volume | Q3 2025 | CONFIRMED |
| Market cap | ~USD $219 billion | May 2026 | CONFIRMED |
| Data-centre ASIC revenue target | >USD $1B | 2026 | CONFIRMED (mgmt guidance) |

## Related

- [[entities/nvidia-n1x]]
- [[entities/nvidia]]
- [[entities/qorvo]]
- [[entities/skyworks]]
- [[entities/win-semiconductors]]
- [[concepts/rf-front-end-module]]
- [[concepts/asic-penetration-indicator]]
- [[synthesis/phased-array-rf-frontend-supply-chain]]

## Sources

- [Qorvo press release — Wi-Fi 7 FEM for Dimensity 9400](https://www.qorvo.com/newsroom/news/2024/qorvo-selected-by-mediatek-as-key-supplier-for-the-inaugural-wave-of-wi-fi-7-fems)
- [Skyworks + MediaTek 6G MWC 2026 announcement (Stock Titan)](https://www.stocktitan.net/news/SWKS/skyworks-and-media-tek-showcase-early-6g-fr3-and-pc1-rf-front-end-i39vryzbdnez.html)
- [NVIDIA N1X architecture — ChatForest Computex 2026 preview](https://chatforest.com/reviews/nvidia-n1x-computex-2026-blackwell-laptop-ai-pc-preview/)
- [NVIDIA N1X — Laurent's Choice architecture breakdown](https://laurentschoice.com/2026/tech-news/n1x-nvidia-and-mediatek-1st-cpu/)
- [N1X confirmed for Computex — TechTimes, 2026-05-30](https://www.techtimes.com/articles/317428/20260530/nvidia-arm-laptop-chip-n1x-confirmed-computex-cuda-rtx-5070-gpu-onboard.htm)
- [MediaTek delays N1X to Q1 2026 — TrendForce, 2025-07-23](https://www.trendforce.com/news/2025/07/23/news-nvidia-and-mediatek-reportedly-delay-n1x-processor-launch-from-second-half-of-2025-to-q1-2026/)
- [MediaTek Q1 2025 earnings — 48% gross margin, ASIC revenue by 2026 (Digitimes, paywalled)](https://www.digitimes.com/news/a20250430PD242/mediatek-revenue-2025-2026-earnings.html)
- [Google Ironwood / MediaTek I/O module work — The Next Web](https://thenextweb.com/news/google-inference-chips-nvidia-challenge-supply-chain)
- [MediaTek targets billion-dollar AI ASIC — TechSpot](https://www.techspot.com/news/110798-mediatek-targets-billion-dollar-ai-asic-business-smartphone.html)
- [Gartner AI PC forecast 143 million units 2026 — Gartner newsroom, 2025-08-28](https://www.gartner.com/en/newsroom/press-releases/2025-08-28-gartner-says-artificial-intelligence-pcs-will-represent-31-percent-of-worldwide-pc-market-by-the-end-of-2025)
- [MediaTek revenue and market cap — companiesmarketcap.com](https://companiesmarketcap.com/mediatek/revenue/)

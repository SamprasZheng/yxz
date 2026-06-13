---
type: entity
tags: [nvidia, mediatek, arm, pc, soc, semis, windows-on-arm, blackwell, computex]
---

# NVIDIA N1X / N1

NVIDIA's first Arm-based SoC family for Windows PCs, co-designed with [[entities/mediatek]]. The N1X is the premium tier (up to 20-core CPU + RTX 5070-class Blackwell GPU); the N1 is the mainstream tier (10–12 CPU cores, smaller GPU). Both chips bring the CUDA software stack — previously exclusive to discrete GPUs and NVIDIA's data-center line — to thin-and-light Windows laptops for the first time.

## Background and Lineage

The N1X/N1 family is an extension of the Grace-Blackwell superchip lineage developed for NVIDIA's data-center and desktop AI products. The top-end N1X SKU is architecturally equivalent to the **GB10** chip inside the [[concepts/dgx-spark]] personal AI supercomputer: same 10+10 Arm CPU cluster, same 48-SM Blackwell GPU block, same LPDDR5X unified memory. The key difference is power envelope — DGX Spark's GB10 runs at 140 W in an actively cooled desktop enclosure; the N1X targets 45–80 W for laptop thermals.

The co-design split: MediaTek contributed the CPU chiplet (Cortex-X925 / Cortex-A725 cores and associated uncore); NVIDIA contributed the Blackwell GPU chiplet and the NVLink-C2C interconnect fabric. The two dies are integrated in a 2.5D chiplet package on **TSMC 3 nm** process.

## SKU Split: N1X vs N1

| SKU | CPU Cores | GPU SMs | CUDA Cores | Memory | TDP |
|---|---|---|---|---|---|
| N1X (top) | 10×Cortex-X925 + 10×Cortex-A725 | 48 | 6,144 | up to 128 GB LPDDR5X-8533, 16-ch | 45–80 W |
| N1X (mid) | 9×Cortex-X925 + 9×Cortex-A725 | 40 | 5,120 | up to 128 GB LPDDR5X-8533, 16-ch | 45–80 W |
| N1 (high) | 8×Cortex-X925 + 4×Cortex-A725 | 20 | 2,560 | up to 64 GB LPDDR5X, 8-ch | 18–45 W |
| N1 (base) | 7×Cortex-X925 + 3×Cortex-A725 | 16 | 2,048 | up to 64 GB LPDDR5X, 8-ch | 18–45 W |

All SKUs share Cortex-X925 performance cores and Cortex-A725 efficiency cores (Armv9.2), 5th-generation Tensor Cores (NVFP4 precision), and 4th-generation RT Cores.

The top N1X is cited by multiple sources as essentially a GB10 repackaged for the laptop power envelope. GPU compute: 31 TFLOPS FP32; up to 1,000 TOPS at NVFP4 (per techtimes.com pre-announcement data, as-of 2026-05-30 — treat as near-confirmed pre-keynote leak rather than official specification until June 1 keynote slides are published). [UNCONFIRMED: exact NPU TOPS as a discrete NPU block — reports differ on whether the 1,000 TOPS figure refers to Tensor Core AI throughput or a separate NPU; no official specification released as of 2026-06-01.]

## Architecture Details

- **Chiplet interconnect:** NVLink-C2C, 300 GB/s bidirectional bandwidth between CPU die and GPU die.
- **Memory architecture:** Unified LPDDR5X on-package; CPU and GPU share the same memory pool (similar to Apple M-series). N1X memory bandwidth: approximately 273–301 GB/s (sources vary; DGX Spark GB10 official figure is 273 GB/s).
- **Storage:** N1X supports up to 3× M.2 SSDs; N1 supports up to 2× M.2 SSDs.
- **PCIe:** N1X — 12× PCIe 5.0 + 5× PCIe 4.0; N1 — 8× PCIe 5.0 + 3× PCIe 4.0.
- **Process:** TSMC 3 nm for both chiplets (per multiple pre-launch leak sources; UNCONFIRMED officially until post-keynote datasheets).

## Launch Timeline

| Date | Event | Status |
|---|---|---|
| 2026-05-31 | Dell XPS N1X pre-Computex embargo reveal | CONFIRMED (multiple press sources) |
| 2026-06-01 | Jensen Huang GTC Taipei keynote, 11:00 Taipei time (day-1 of Computex week) | CONFIRMED — NVIDIA event page published; keynote content as of writing is in-progress or imminent |
| Late 2026 | First retail devices reach market | Per OEM leak timeline; UNCONFIRMED exact date |
| Early 2027 | Wider availability across more OEM SKUs | Per supply-chain reports; UNCONFIRMED |

Earlier reports (late 2025 through early 2026) had projected a H1 2026 retail launch; multiple supply-chain articles noted a slip to late 2026. The Computex event is a formal announcement with OEM showcases; retail availability is separately tracked.

[UNCONFIRMED: a mid-2026 Guru3D report cited a delayed launch to 2027 for some SKUs — this contradicts the majority of sources projecting late-2026 for flagship N1X devices. The discrepancy likely reflects N1 mainstream SKUs taking longer vs N1X premium arriving holiday 2026.]

## OEM Lineup

**CONFIRMED (public pre-Computex materials or accidental portal leaks):**

| OEM | Model / Line | Notes |
|---|---|---|
| Dell | XPS (unspecified model) | Embargo reveal 2026-05-31; confirmed N1X |
| Lenovo | Legion 7, Yoga, IdeaPad Slim variants | Accidentally confirmed via live portal before announcement |
| Asus | ProArt (creator-focused) | Teaser published pre-Computex |
| MSI | At least one model | Confirmed in Computex press materials |
| Microsoft | Surface (unspecified) | Microsoft co-teased "new era of PC" with matching Taipei coordinates; Surface involvement strongly implied — [UNCONFIRMED: exact Surface model or formal SKU announcement as of 2026-06-01] |

**NOT confirmed as of 2026-06-01:** HP, Samsung. Qualcomm's Snapdragon X platform currently holds design slots at HP and Samsung Surface.

Analyst pricing projections (DigiTimes, Jason Tsai, cited in trade press): N1X premium laptops at USD 1,500–2,000+; N1 mainstream targeting sub-USD 1,500 to compete with x86 midrange. [UNCONFIRMED: no official list pricing as of 2026-06-01.]

## Competitive Context

### vs Qualcomm Snapdragon X Elite/Plus

Qualcomm's Snapdragon X Elite (12-core Oryon CPU, Adreno GPU, 45 TOPS NPU, LPDDR5X 136 GB/s) is the current incumbent Windows-on-Arm platform. NVIDIA's differentiators:

- **CUDA ecosystem** — TensorRT, PyTorch CUDA backend, llama.cpp-CUDA, TensorRT-LLM all run natively; Qualcomm offers no equivalent on Windows.
- **GPU performance** — N1X top SKU (6,144 CUDA cores, RTX 5070-class) significantly outguns the integrated Adreno GPU in gaming and creative workloads.
- **AI compute** — Blackwell Tensor Cores (NVFP4) vs Qualcomm's dedicated Hexagon NPU; benchmark data pre-publication as of Computex week.
- **CPU performance** — Pre-release Geekbench prototype scores show N1X approximately 15% higher than Snapdragon X Elite single-core (UNCONFIRMED, prototype hardware, not production).

NVIDIA's GeForce Game Ready Driver for N1X is reportedly a full ARM64 native build, bypassing the Prism x86 emulation layer. Qualcomm's Snapdragon X has certain Prism optimizations that run only on Snapdragon silicon, but NVIDIA's native driver path should avoid the emulation overhead entirely.

Windows-on-Arm total market share remained below 1% of notebook shipments in Q3 2024; analysts project 30–40% arm share by 2029 as both Qualcomm and NVIDIA ramp. NVIDIA's entry is the first time a third party (non-Qualcomm) competes meaningfully on Windows Arm.

### vs x86 (Intel / AMD)

Intel's Lunar Lake and upcoming Panther Lake and AMD's competing mobile parts ("Gorgon Point" generation) remain the x86 incumbents. NVIDIA's angle is not raw CPU throughput but AI acceleration per watt plus the CUDA software moat. N1's 18–45 W TDP range overlaps with Intel Core Ultra 200V "Lunar Lake" territory; N1X at 45–80 W competes with Intel Core Ultra 200HX / AMD Ryzen AI Max+ in the high-performance laptop segment.

App compatibility risk on Windows Arm is real but narrowing: Microsoft's Prism emulation layer now handles most x86/x64 apps; ARM64-native builds of Photoshop, Chrome, VS Code, and Microsoft Office are available. The remaining gap is primarily 32-bit x86 games and legacy enterprise software.

## MediaTek's Role

MediaTek designed and fabricated the CPU chiplet for both N1X and N1, contributing:
- Core microarchitecture selection (Cortex-X925 / Cortex-A725 from Arm IP)
- Uncore (L3 cache, memory controller, PCIe fabric)
- NVLink-C2C endpoint on the CPU side

This is a co-design arrangement, not a resale of an existing MediaTek product. NVIDIA owns the GPU chiplet and the overall SoC architecture definition. The arrangement mirrors the Apple–TSMC model in that NVIDIA acts as the integrating architect while MediaTek contributes CPU-side silicon expertise. Full MediaTek company profile: [[entities/mediatek]].

## Relationship to DGX Spark / GB10

| | DGX Spark (GB10) | N1X (top SKU) |
|---|---|---|
| CPU | 10×Cortex-X925 + 10×Cortex-A725 | 10×Cortex-X925 + 10×Cortex-A725 |
| GPU | Blackwell, 48 SM | Blackwell, 48 SM |
| Memory | 128 GB LPDDR5x, 273 GB/s | up to 128 GB LPDDR5X, ~273–301 GB/s |
| TDP | 140 W | 45–80 W |
| Form factor | Desktop mini-PC ($3,999) | Laptop ($1,500–2,000 est.) |
| CUDA support | Yes | Yes |

The N1X is best understood as a laptop-power-envelope variant of the GB10, enabling consumers to carry DGX Spark-class AI acceleration in a thin-and-light notebook.

## Software and Ecosystem

- Full **CUDA** support — first Windows Arm platform offering this.
- **DLSS 4** and Frame Generation available via RTX GPU.
- **GeForce Game Ready Driver** rebuilt as ARM64 native binary.
- Windows Copilot+ PC requirements (45 TOPS threshold) met.
- NVIDIA RTX AI Toolkit and TensorRT-LLM available for local inference.

## Related

- [[entities/nvidia]]
- [[concepts/dgx-spark]]
- [[concepts/windows-on-arm]]

## Sources

- https://www.notebookcheck.net/Nvidia-s-N1X-and-N1-processors-leak-in-full-ahead-of-launch.1311497.0.html
- https://www.techtimes.com/articles/317428/20260530/nvidia-arm-laptop-chip-n1x-confirmed-computex-cuda-rtx-5070-gpu-onboard.htm
- https://www.tomshardware.com/pc-components/cpus/nvidias-long-awaited-n1-n1x-soc-specs-leak-ahead-of-computex-launch-n1-to-feature-up-to-20-arm-based-cores-standard-n1-equipped-with-12-and-10-core-configs
- https://www.tomshardware.com/laptops/nvidia-and-microsoft-tease-a-new-era-of-pc-ahead-of-computex-2026-coordinated-social-media-posts-could-indicate-that-rumored-n1x-laptops-will-be-windows-on-arm-systems
- https://www.cyberkendra.com/2026/05/nvidias-n1x-laptop-chip-leaks-on.html
- https://www.tweaktown.com/news/111806/lenovo-accidentally-confirms-it-is-working-on-laptops-powered-by-nvidias-yet-to-be-announced-n1x-chip/index.html
- https://www.guru3d.com/story/nvidia-n1x-arm-soc-leak-reveals-specs-delayed-launch-to-2027/
- https://www.pcworld.com/article/3151058/nvidias-n1x-could-be-the-jolt-windows-laptops-need-with-one-big-catch.html
- https://www.nvidia.com/en-us/products/workstations/dgx-spark/
- https://www.nvidia.com/en-tw/gtc/taipei/keynote/
- https://videocardz.com/newz/nvidia-confirms-jensen-huang-gtc-taipei-keynote-on-june-1st-day-before-computex
- https://www.gizchina.com/microsoft/microsoft-could-launch-new-surface-laptops-with-nvidia-chips-at-computex
- https://www.xda-developers.com/mere-days-before-computex-2026-information-on-the-nvidia-n1-chip-leaked-online/

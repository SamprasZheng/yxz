---
type: concept
tags: [arm, windows, pc, qualcomm, nvidia, microsoft, semis, software]
---

# Windows on Arm

Windows on Arm (WoA) is Microsoft's initiative to run the Windows operating system on processors using the Arm instruction set architecture rather than x86/x64. The platform has existed since Windows RT (2012) but became commercially significant with Qualcomm's Snapdragon X Elite launch in mid-2024 and NVIDIA's entry via the [[entities/nvidia-n1x]] at Computex 2026.

## Platform Evolution

| Era | Key Product | Notes |
|---|---|---|
| 2012–2019 | Windows RT / Windows 10 ARM | Snapdragon 835/845; niche, poor app compat |
| 2020–2023 | Snapdragon 8cx Gen 3 / 7c+ | Improved but still x86 compat gaps |
| 2024 | Qualcomm Snapdragon X Elite/Plus | Competitive CPU performance; "Copilot+ PC" launch |
| 2025–2026 | NVIDIA N1X/N1 | First WoA platform with full CUDA stack |

## App Compatibility: Prism Emulation Layer

Microsoft's **Prism** emulation layer translates x86/x64 machine code to Arm64 at runtime. As of 2025–2026:

- x64 emulation: broadly functional; most mainstream apps run.
- x86 32-bit: blocked by design (no 32-bit Arm kernel mode).
- ARM64-native builds available for Chrome, Firefox, Edge, VS Code, Photoshop, Microsoft Office, Python, Node.js.
- Key gap: legacy enterprise software and 32-bit-only games remain incompatible without vendor rebuild.

Some Prism performance features (e.g., certain cache-hint paths) are tuned specifically for Qualcomm Snapdragon silicon. NVIDIA's [[entities/nvidia-n1x]] ships a full ARM64-native GeForce Game Ready Driver, bypassing the x64 Prism path for GPU workloads entirely.

## Windows Copilot+ PC Requirement

Microsoft's **Copilot+ PC** designation requires a minimum of 40–45 TOPS from the SoC's NPU or AI accelerator. This threshold is satisfied by both Qualcomm Snapdragon X and NVIDIA N1X. Copilot+ unlocks features including Cocreator (image generation), Live Captions with real-time translation, and Recall (local AI search over history).

## Key Competitors on Windows Arm (as of 2026)

| Vendor | Platform | CPU | GPU | NPU |
|---|---|---|---|---|
| Qualcomm | Snapdragon X Elite | 12-core Oryon | Adreno (integrated) | 45 TOPS Hexagon |
| Qualcomm | Snapdragon X Plus | 10-core Oryon | Adreno | 45 TOPS |
| NVIDIA | N1X (top) | 10+10 Cortex-X925/A725 | 6,144-core Blackwell (RTX 5070 class) | 1,000 TOPS (Tensor, UNCONFIRMED official) |
| NVIDIA | N1 | 7–8+3–4 Cortex-X925/A725 | 2,048–2,560-core Blackwell | — |

x86 incumbents (Intel Core Ultra / AMD Ryzen AI) remain the dominant shipment volume as of 2026. Analyst projections (Counterpoint Research, TechInsights) put Arm at 30–40% of notebook shipments by 2029, up from under 1% in 2024.

## CUDA on Windows Arm

NVIDIA's N1X is the first Windows Arm platform to support the full CUDA software stack natively (TensorRT, PyTorch CUDA backend, llama.cpp-CUDA, TensorRT-LLM). This distinguishes it from Qualcomm's platform, which offers only OpenCL / Vulkan compute and a proprietary QNN SDK on Windows, and from Apple Silicon, which uses Metal and CoreML (no Windows). See [[entities/nvidia-n1x]] for the full NVIDIA angle.

## Market Context

Windows on Arm total market share was approximately 0.8% of notebook shipments in Q3 2024 (ITdaily). Qualcomm's Snapdragon X launch (mid-2024) drove early Copilot+ PC adoption. NVIDIA's entry in 2026 is the first time a second Arm vendor competes meaningfully on Windows, potentially accelerating OEM design diversification.

## Related

- [[entities/nvidia-n1x]]
- [[entities/nvidia]]
- [[concepts/dgx-spark]]

## Sources

- https://www.pcworld.com/article/3151058/nvidias-n1x-could-be-the-jolt-windows-laptops-need-with-one-big-catch.html
- https://counterpointresearch.com/en/reports/windows-on-arm-to-capture-over-one-third-of-the-market-in-ai-pc-era
- https://www.techinsights.com/blog/windows-arm-now-or-never
- https://itdaily.com/news/business/arm-op-windows-marktaandeel-in-q3/
- https://www.tomshardware.com/laptops/projections-show-that-arm-cpus-will-power-40-percent-of-notebooks-sold-in-2029

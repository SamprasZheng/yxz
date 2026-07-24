---
type: source
title: "Hybrid X-band phased-array ICASE source stub"
author: "RFVLSI Lab / ICASE context"
date: "2020"
ingested: "2026-05-24"
tags: [rf, phased-array, hybrid, xband, leo, transmitter, source-stub]
---

# Hybrid X-band Phased-Array ICASE Source Stub

This page exists to stabilize an existing historical backlink from the wiki log (`wiki/log.md`) into a real source node. The full source ingest is not present in the current wiki, but the log records it as part of the RF phased-array design integration alongside [[sources/thesis-aesa-modules-zheng-2021]] and [[sources/hsieh-xband-leo-transmitter-2020]].

## Graph role

- Source-side anchor for the hybrid X-band phased-array design cluster
- Companion to [[sources/hsieh-xband-leo-transmitter-2020]]
- Supports the RF concept chain: [[concepts/aesa]] -> [[concepts/hybrid-phased-array]] -> [[concepts/zero-if-transmitter]] -> [[concepts/evm-calibration]] -> [[concepts/dpd-digital-predistortion]]

> **Scope note (public repo):** the ICASE design's internal numbers are not ingested here — this is a graph anchor for the *hybrid X-band design context* only. The one publicly-cited reference figure retained on [[concepts/hybrid-phased-array]] is the "iCASE 2020" X-band hybrid array (144 TX elements 12×12, ~8.2 GHz, EIRP ~64 dBm boresight, ±65° scan, <90 W TX, 800 Mbps 16-APSK). Do not cite other unverified numbers from this source.

## Where this design class sits in 2026 (verifiable context)

This 2020 X-band hybrid array is the lab ancestor of the 2026 commercial Taiwan Ka-band hybrid terminal — [[entities/tron-future-tech|Tron Future]] **T.SpaceRouter** (1024-element TX + 1024-element RX, DL 17.8–20.2 / UL 27.5–30 GHz, EIRP >36 dBW, <100 W): the same digital-beamform-between-sub-arrays / analog-phase-within-sub-array topology, moved up in frequency (X → Ka) and out in element count (144 → 1024). The intervening enabler is exactly the silicon-beamformer economics on [[concepts/hybrid-phased-array]] — SiGe/CMOS multi-channel beamformer ICs (e.g. Qorvo Ku-band AWMF-0240/0241, 2025-03) that made high-element-count commercial terminals viable ([Tron Future — Space Tech](https://www.tronfuture.com/solutions/space-tech/), accessed 2026-07-24). Context, not an identity claim.

## Related

- [[concepts/aesa]]
- [[concepts/hybrid-phased-array]]
- [[concepts/zero-if-transmitter]]
- [[concepts/evm-calibration]]
- [[concepts/dpd-digital-predistortion]]
- [[concepts/leo-value-chain]] — LEO upstream/midstream placement of the RF front-end module
- [[entities/tron-future-tech]] — 2026 commercial Ka-band hybrid-array descendant class
- [[entities/win-semiconductors]] — GaAs/GaN MMIC PA foundry feeding the front end
- [[sources/thesis-aesa-modules-zheng-2021]]
- [[sources/hsieh-xband-leo-transmitter-2020]]
- [[synthesis/phased-array-rf-frontend-supply-chain]] — six-region beamformer/GaN supply-chain map
- [[synthesis/leo-taiwan-odc-gap]] — Taiwan strong-upstream / absent-midstream structural context

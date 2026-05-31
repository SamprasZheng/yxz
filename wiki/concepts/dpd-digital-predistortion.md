---
type: concept
tags: [rf, signal-processing, pa, linearization, 5g, transmitter, evm, calibration, xband, leo, rf-hardware]
---

# DPD — Digital Predistortion

## Problem Background

High spectral efficiency modulations (256 QAM-OFDM for 5G) have high PAPR (Peak-to-Average Power Ratio), which excites the nonlinear characteristics of the PA (Power Amplifier):
- **Nonlinearity**: PA input-output relationship is non-linear; gain compression occurs at high input levels
- **Memory Effect**: Output depends not only on the current input but also on past samples (frequency/temperature dependence)
- **Out-band Spectral Regrowth**: Interference into adjacent frequency bands, degrading neighboring channel communication quality

DPD inserts a "pre-distorter" in front of the PA, so that signals passing through DPD and then the PA produce an overall linear response.

## PA Modeling Methods

### 1. Memoryless Polynomial
$y(n) = \sum_k a_k x(n)^k$

- LS (Least Squares) coefficient estimation
- Can model nonlinearity, **cannot model memory effects** (scattered data points)

### 2. Memory Polynomial
$y(n) = \sum_k \sum_p a_{k,p} x(n-p)^k$, where P is the memory depth

- Includes memory, LS estimation
- Time alignment problem: y(n) starts from y(P-1)

### 3. Neural Network (NN)
- Architecture: 1 hidden layer, 30 neurons
- Training: Levenberg-Marquardt (LM) backpropagation, minimizing sum-of-square error
- Input: PA input (real part + imaginary part + delay line, total 2×delay length neurons)
- Performance: superior to polynomial models, but longer training time (~15 minutes)

## DPD Training Method: Indirect Learning

1. Collect PA input/output data
2. Train post-distorter (DPD input = PA output, DPD output ≈ PA input)
3. Remove post-distorter; use post-distorter coefficients as pre-distorter

Complex gain normalization must be performed before training (to prevent DPD from reducing signal power).

## Typical Measurement Results

| Metric | Improvement |
|---|---|
| NMSE (test) vs. raw PA | ~−26 dB (significant improvement in PA linearity) |
| ACPR | ~−4 dB (out-band spectral regrowth suppression) |

NN DPD performance (NMSE + ACPR) is superior to polynomial DPD.

## Hardware Complexity Comparison

| | NN DPD | Polynomial DPD |
|---|---|---|
| Multipliers | $4n + (k-1)n^2$ | $2m + 2pm + p + 3$ |
| Adders | $4n + (k-1)n^2$ | $2m + 2pm + 1$ |
| Training speed | Slow (LM ~15 min) | Fast (LS closed-form solution) |
| Performance | Better | Second |

With 1 hidden layer and a small number of neurons, NN achieves near-equivalent complexity with better performance.

## CUDA Acceleration

- NN feedforward propagation parallelized with 2 threads
- Way1: thread1/2 each handles consecutive rows; Way2: thread1/2 interleave rows

## Forward Trajectory & Compute Lineage (scenario)

DPD is one of the clearest places where the RF and AI-compute stacks converge. The arc:

- **1990s–2010s:** fixed memoryless / memory-polynomial DPD on dedicated DSP/FPGA fabric.
- **2020s:** neural-network DPD moves from research to product as PAPR rises (massive-MIMO, wideband SATCOM). Commercial example: RFHIC demonstrated GaN-on-SiC PAs with MaxLinear DPD at IMS 2024, pairing the [[concepts/hybrid-phased-array|GaN front end]] with adaptive linearization.
- **Forward (projection):** per-element *online* NN-DPD that re-trains in orbit as the PA ages and temperature swings — the calibration table ([[concepts/rf-soc-debug-taxonomy|OTP/MCN-managed]]) becomes a live model rather than a one-time factory artifact. The CUDA acceleration above is the seed of this: the same GPU compute that runs [[concepts/orbital-data-center|orbital data centers]] and [[concepts/nemotron|on-board reasoning models]] can host adaptive DPD, making linearization a software-update problem. **Label:** projection, not a fielded capability.

This is the bridge from the RF front-end cluster to the [[entities/nvidia|NVIDIA]]/ODC compute stack — see also [[concepts/cots-gpu-radiation-risk]] for what running that compute in orbit costs.

## Related Links

- [[concepts/evm-calibration]] -> EVM/ACPR metrics used to validate PA correction
- [[concepts/zero-if-transmitter]] -> upstream transmitter architecture that must coexist with PA nonlinearity
- [[concepts/rf-soc-debug-taxonomy]] -> where DPD coefficients become OTP/MCN-controlled calibration data
- [[sources/hsieh-xband-leo-transmitter-2020]] -> LEO X-band transmitter context

- [[concepts/aesa]] — parent system where DPD is applied
- [[concepts/hybrid-phased-array]] — signal path containing PA
- [[concepts/cots-gpu-radiation-risk]] — radiation cost of running adaptive-DPD compute in orbit
- [[concepts/nemotron]] / [[entities/nvidia]] — shared GPU compute lineage for on-board NN-DPD
- [[synthesis/phased-array-rf-frontend-supply-chain]] — where DPD-paired GaN PAs sit in the supply chain

## Source (accessed 2026-05-31)

- RFHIC GaN-on-SiC + MaxLinear DPD demonstration, IMS 2024: [RFHIC product demo](https://rfhic.com/product-demo/rfhics-gan-on-sic-solutions-featuring-maxlinears-dpd-at-ims-2024/)

---
type: concept
tags: [ai, quant, hft, deeplob, limit-order-book, microstructure, cnn, lstm, fi-2010, lobster]
---

# DeepLOB and Limit-Order-Book Deep Learning

The family of deep models that predict short-horizon price moves directly from the **limit order book (LOB)** — the live ladder of resting bid/ask orders. Canonical model and paper: [[sources/deeplob-limit-order-book-2019]] (Zhang/Zohren/Roberts, IEEE TSP 2019). This is the "**no-LLM**" end of the stack: pure neural networks eating raw microstructure at the tick level.

## Core idea

A LOB snapshot is a small image: rows = price levels, columns = {bid price, bid size, ask price, ask size} for the top N levels. Price formation has both **spatial** structure (queue imbalance, depth, cancellation clusters) and **temporal** structure (how the book evolves tick to tick).

- **2D-CNN** captures the spatial structure of the ladder.
- **LSTM** (or attention) captures temporal dynamics across snapshots.
- Output: direction over the next k events/ticks — up / stationary / down.

## Family members

- **DeepLOB** — the original CNN + Inception + LSTM model.
- **DeepLOB-Attention / DeepLOB-Seq2Seq** — attention/decoder variants for multi-horizon output.
- Numerous forks apply the architecture to crypto perpetuals, FX, and LSE/Nasdaq equities.

## Data: FI-2010 vs LOBSTER (don't conflate them)

- **FI-2010** — the standard *public benchmark* LOB dataset; what the DeepLOB paper reports on.
- **LOBSTER** — a *commercial* LOB-reconstruction service (rebuilds the book from Nasdaq ITCH). Licensing (ITCH/OUCH) is a real, non-trivial cost — see [[synthesis/ai-quant-trading-architecture-improvements]] §3.3 data-legality open question.
- DeepLOB can run on LOBSTER-reconstructed data, but the model and the data product are independent choices.

## Where it sits in the stack

Pure perception→signal at the microsecond/tick scale. The architecture page is explicit (§4.3) that the tick stream should be handled by LightGBM / DeepLOB / pure rules — **not** RAG, **not** an LLM. In the §5 decision table, DeepLOB + Backtrader is the high-frequency / weekend-crypto profile with the LLM deliberately removed.

## Hard requirements / cautions

- Needs genuine LOB data (top-N levels + sizes), not OHLCV bars.
- Latency-sensitive: inference must fit the trading horizon (sub-second).
- Overfits to a venue/regime; revalidate per market under CPCV.

## See Also

- [[sources/deeplob-limit-order-book-2019]] — paper + reference TF/PyTorch repo
- [[concepts/time-series-forecasting-quant]] — the lower-frequency (bar-level) counterpart
- [[synthesis/ai-quant-trading-oss-stack-selection]] — §4 ML models; §5 decision table
- [[synthesis/ai-quant-trading-architecture-improvements]] — §3.3 data legality; §4.3 don't LLM the tick stream

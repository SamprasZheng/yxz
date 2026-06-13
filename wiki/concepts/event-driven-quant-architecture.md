---
type: concept
tags: [trading, quant, architecture, event-driven, kafka, redis, backtesting, timescaledb, milvus]
---

# Event-Driven Quant Architecture

## Core Idea

An event-driven quant system replaces a linear batch pipeline (read CSV → compute signal → output trade) with an asynchronous pub/sub loop where every meaningful occurrence — a price tick, a news headline, a macro release — is published as a typed event onto a bus. Downstream handlers subscribe to exactly the event types they need, process independently, and emit new events in turn. The practical payoff is twofold: the system can handle data streams that arrive at wildly different rates (a macro release once a week vs. a tick 10,000 times a second), and — crucially — **the same handler code runs identically in backtest and in live production**, eliminating the look-ahead bias and hidden code-path divergence that plagues vectorized backtesting.

---

## Event Taxonomy

The canonical four-event model from [QuantStart's event-driven backtester series](https://www.quantstart.com/articles/Event-Driven-Backtesting-with-Python-Part-I/) defines:

| Event | Produced by | Consumed by |
|---|---|---|
| `MarketEvent` | DataHandler (each heartbeat) | Strategy |
| `SignalEvent` | Strategy | Portfolio |
| `OrderEvent` | Portfolio (after sizing) | ExecutionHandler |
| `FillEvent` | ExecutionHandler (after broker ACK) | Portfolio (update P&L) |

In a multi-signal quant system with an LLM layer you add:

| Event | Produced by | Consumed by |
|---|---|---|
| `NewsEvent` | News ingestion adapter | LLM sentiment handler |
| `MacroEvent` | Economic calendar adapter | Risk-environment classifier |
| `SentimentEvent` | LLM feature-engineer (see [[concepts/llm-as-feature-engineer]]) | Portfolio / alpha aggregator |

The bus enforces that no component can "look ahead" — it only sees events that have been published by the time it runs, which gives you look-ahead-bias freedom for free.

---

## The Canonical Property: Backtest == Live Engine

The defining architectural invariant is that **backtesting and live trading run through the identical component graph**. The only substituted part is the `DataHandler`: in backtest mode it replays a historical event stream from TimescaleDB; in live mode it receives real-time ticks from a broker feed. Every Strategy, Portfolio, and ExecutionHandler object is the same Python class in both modes.

This is formalized in:

- **QuantStart QSTrader**: abstract `DataHandler` base class; concrete `HistoricCSVDataHandler` swapped for a live feed handler at runtime.
- **NautilusTrader** (Rust-native, Python API): a single `NautilusKernel` core powers backtest, sandbox, and live contexts. The [architecture docs](https://nautilustrader.io/docs/latest/concepts/architecture/) state: "The platform has been designed to share as much common code between backtest, sandbox and live trading systems as possible."
- **Backtrader**: `Cerebro` engine abstracts over `DataFeed`; same `Strategy` subclass runs against historical or live broker data.
- **Zipline** (Quantopian lineage): pipeline API; `SimulationClock` swapped for `RealtimeClock`.

The vectorized alternative (pandas DataFrames, NumPy arrays) processes entire time-series in one shot and **cannot** share code with live trading without introducing subtle future-data leaks.

---

## Infrastructure Realization

### Message Bus

| Technology | Sweet spot | Tradeoff |
|---|---|---|
| **Redis Pub/Sub** | Ultra-low latency fanout (<1 ms); no durability | Messages lost if no subscriber is connected; no replay |
| **Redis Streams** | Low latency + persistence + consumer groups | Heavier ops than plain Pub/Sub |
| **Apache Kafka** | Durable, replayable, high-throughput; multi-consumer | Higher latency (ms range); operational complexity |
| **Python `queue.Queue`** | In-process single-machine backtest | No network; dev/test only |

A common hybrid: Redis Streams for real-time fanout to live strategies; Kafka as the durable event log that feeds the historical database and audit trail.

### Time-Series Storage

| Store | Use case |
|---|---|
| **TimescaleDB** | Structured OHLCV and tick data; SQL-accessible; hypertable auto-partitioning by time |
| **ClickHouse** | Columnar; extreme read throughput for aggregate analytics |
| **InfluxDB** | Simple metrics; less suitable for complex joins |
| Flat CSV | Cold backup only; **banned as primary store for any real-time or high-frequency feed** |

### Vector Store (RAG layer)

| Store | Use case |
|---|---|
| **Milvus** | Open-source; scales to billions of vectors; good for large news/earnings corpora |
| **Qdrant** | Simpler ops; good for mid-scale embedding stores |
| **Pinecone** | Managed; higher cost |

The vector store enables the [[concepts/llm-as-feature-engineer]] layer to do similarity-based retrieval: "find the 5 historical `NewsEvent`s most similar to this one and compare their subsequent forward returns."

---

## Event Loop Pseudocode

```python
while system_running:
    # Outer loop: heartbeat / new bar
    data_handler.update_bars()          # emits MarketEvent
    
    while not event_queue.empty():
        event = event_queue.get()
        
        if event.type == 'MARKET':
            strategy.calculate_signals(event)   # may emit SignalEvent
            news_handler.process_pending()      # may emit SentimentEvent
        
        elif event.type == 'SIGNAL':
            portfolio.update_signal(event)       # may emit OrderEvent
        
        elif event.type == 'ORDER':
            execution_handler.execute_order(event)  # may emit FillEvent
        
        elif event.type == 'FILL':
            portfolio.update_fill(event)
        
        elif event.type == 'SENTIMENT':
            alpha_aggregator.ingest(event)       # updates feature store
```

In live mode the `data_handler.update_bars()` call blocks on a real-time feed instead of advancing a cursor through historical data. Everything downstream is unchanged.

---

## Why Batch Pipelines Break in Production

| Problem | Batch/CSV pipeline | Event-driven pipeline |
|---|---|---|
| Async data arrival | Must wait for all feeds before computing | Each feed publishes independently |
| Look-ahead bias | Easy to accidentally use future rows | Architectural guarantee: only past events in queue |
| Backtest-to-live gap | Separate codebases diverge silently | Single shared codebase; only DataHandler swapped |
| Late data / gaps | Silent NaN propagation | `DataHandler` can emit explicit `GapEvent`; handler decides how to react |
| Replay for debugging | Re-run script | Replay event log from Kafka/Redis Streams |
| LLM integration latency | LLM call blocks the pipeline | LLM handler subscribes async; emits `SentimentEvent` when ready |

---

## Current Status in the `trader` Agent

> The v1 `trader` agent under `agents/src/trader/` is deliberately **batch / on-demand CLI**. It runs a single-shot: fetch news → call LLM → compute sentiment → write feature column → run Qlib backtest. The event-driven loop described above (Redis/Kafka bus, persistent DataHandler, live tick feed) is **parked** as TODO-A in [[synthesis/ai-quant-trading-architecture-improvements]]. The rationale: validate the LLM-as-feature-engineer signal quality (IC/RankIC) before building the production bus infrastructure. Batch is sufficient for signal validation; event-driven becomes necessary at live-trading or high-frequency regimes.

---

## Integration Points

- [[synthesis/ai-quant-trading-architecture-improvements]] — §1.1 and TODO-A; this concept is the architectural home for the event bus + TimescaleDB/Milvus migration items
- [[concepts/llm-as-feature-engineer]] — the `SentimentEvent` producer; plugs into the event bus as an async subscriber/publisher pair
- [[entities/qlib]] — receives the processed feature columns produced by the event pipeline; Alpha158 baseline
- [[concepts/volatility-targeting]] — the Portfolio component's sizing logic; receives `SentimentEvent` + `MarketEvent` to compute $w_i$
- [[concepts/combinatorial-purged-cross-validation]] — the backtest validation layer; replays the event stream under CPCV splits

## See Also

- [QuantStart: Event-Driven Backtesting with Python Part I](https://www.quantstart.com/articles/Event-Driven-Backtesting-with-Python-Part-I/)
- [NautilusTrader Architecture Docs](https://nautilustrader.io/docs/latest/concepts/architecture/)
- [Ashutosh Kumar Singh: Real-Time Stock Trading System Using Kafka, Redis, and TimescaleDB](https://ashutoshkumars1ngh.medium.com/how-to-design-a-real-time-stock-trading-system-using-kafka-redis-and-timescaledb-2e64ccac64b3)

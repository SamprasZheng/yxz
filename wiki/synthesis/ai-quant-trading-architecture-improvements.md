---
type: synthesis
tags: [ai, quant, trading, llm, agents, architecture, risk, todo]
sources:
  - "[[sources/finrobot-ai4finance-2024]]"
  - "[[sources/fingpt-ai4finance-2024]]"
  - "[[sources/qlib-microsoft-2020]]"
  - "[[sources/qlib-microsoft-quant-platform]]"
  - "[[sources/alpaca-markets-docs-2025]]"
  - "[[sources/polygon-io-docs-2025]]"
  - "[[sources/sec-edgar-api-2025]]"
  - "[[sources/finma-pixiu-benchmark-2023]]"
  - "[[sources/agent-frameworks-2025-snapshot]]"
  - "[[sources/deeplob-limit-order-book-2019]]"
concepts:
  - "[[concepts/llm-as-feature-engineer]]"
  - "[[concepts/volatility-targeting]]"
  - "[[concepts/combinatorial-purged-cross-validation]]"
  - "[[concepts/event-driven-quant-architecture]]"
  - "[[concepts/yfinance]]"
  - "[[concepts/calibrated-confidence-llm]]"
  - "[[concepts/agentic-provenance]]"
  - "[[concepts/small-model-ensemble]]"
  - "[[concepts/tiered-inference]]"
  - "[[concepts/domain-specific-llm-agents]]"
---

# AI 量化交易系統「三層分離式架構」改善方向 — TODO / 待考慮事項 / 模型改善路線圖

## 一句話定位

> 把 LLM 從「決策者」降級為「特徵工程師」，把數學風控與執行交回確定性程式碼，並在數據層、回測層加上抗 overfitting / 抗幻覺的硬熔斷。

這份 synthesis 是一份**內部備忘錄**，把使用者與 AI 的整輪討論收斂為四類項目：

1. **改善方向**（Improvement Directions）— 架構級的演化方向
2. **TODO**（短期可動手實作）
3. **待考慮事項**（Open Questions / 還沒做決定）
4. **模型可以改善的方向**（LLM / Agent 行為調整）

對應的原始討論涵蓋 FinRobot / FinGPT / Qlib / LOBSTER / Finviz / Backtrader 的「三層分離式架構」(感知層 → 大腦層 → 執行層)，以及該架構在**穩定度、勝率、生存率、真實績效**四個維度的工程化升級。

> frontmatter `sources:` / `concepts:` 已補齊（2026-05-29 parallel batch ingest）；對應的 entities / sources / concepts 頁面已落成；可執行的分析用 `trader` agent 已落地於 `agents/src/trader/`。

---

## 0. 原架構回顧（基準線）

```
[ 數據與感知層 ] ──> [ 決策與大腦層 ] ──> [ 執行與回測層 ]
 (LOBSTER /            (FinGPT /            (Qlib /
  Finviz)               Multi-Agent)         Backtrader)
```

* **感知層**：未結構化新聞、社群情緒、總經 + 結構化盤口 / 篩選器。
* **大腦層**：多 Agent (情報官 A / 精算師 B / 風控官 C)。
* **執行層**：回測 + 風控倉位 + 下單 API。

新手起步路徑：FinRobot 骨架 → 外掛 Finviz 篩選器當 Context → 讓 AI 做最後品管 (挑 3 檔 + 算停損)。

> 本頁專注於「**怎麼把架構穩成生產級**」。具體**每一層用哪個開源專案**（FinGPT / FinRobot / XuanYuan / FinMA / Qlib / TSlib / DeepLOB / CrewAI / LangGraph）+ **不同交易風格該選哪一套組合**，請看姊妹頁 [[synthesis/ai-quant-trading-oss-stack-selection]]。

下面四節是把這條基準線**推到生產級**所需的工程升級。

---

## 1. 改善方向（Architectural Improvement Directions）

### 1.1 系統穩定度 — 事件驅動 + 時序 / 向量資料庫

**問題**：原本線性流程假設「等 LLM 處理完新聞才抓盤口」，無法處理新聞、Tick、K 線完全不同步的真實節奏。

**方向**：

* **Event-Driven Architecture (Kafka / Redis Pub-Sub)**：感知層持續發布 `News_Event` / `Price_Tick_Event` / `Macro_Event`；大腦層與執行層各自非同步訂閱。
* **時序資料庫**：K 線與 Tick → **TimescaleDB** 或 **ClickHouse**。**禁止用 CSV 或一般 RDBMS 存高頻量價**。
* **向量資料庫**：新聞情緒、財報、研究報告的 Embedding → **Milvus** 或 **Pinecone**，讓大腦層可即時做 RAG 比對歷史相似情境（「現在這個利空 vs 2020 年 Q1 那次」）。

### 1.2 LLM 降噪 — 從「決策者」轉為「特徵工程師」

**問題**：直接讓 Agent A 輸出「利多 / 利空」太粗糙，標題黨會直接污染訊號。

**方向**：

* **強制結構化輸出**：以 Pydantic / Instructor 把 LLM Function Calling 鎖死成帶 `confidence` 的 JSON。
* **連續情緒分數**：輸出 $-1.0 \le S \le 1.0$ 的連續值 + 影響板塊（Sector）+ 預估持續時間。
* **整合進 Qlib**：把這個連續情緒當成一個新的 **Alpha Factor**，與 Qlib 內建量價因子（如 Alpha158）一起餵入 **LightGBM / XGBoost** 做監督學習。LLM 的輸出最終是「一根特徵欄位」，不是「一個按鈕」。

### 1.3 風控與部位 — 從凱利公式升級到波動率目標 + 硬熔斷

**問題**：

* 凱利公式在高波動市場（加密、財報季）容易 over-bet。
* 絕對不該讓 LLM 直接做浮點數計算（精度、幻覺）。

**方向**：

* **Volatility Targeting** — 由純 Python 模組執行：
  $$w_i = \frac{\sigma_{target}}{\sigma_i}$$
  其中 $\sigma_{target}$ 為系統目標年化波動率（例 15%），$\sigma_i$ 為該標的近期預測波動率（GARCH 或歷史標準差）。
* **LLM 角色**：只判斷「當前風險環境等級」（低 / 中 / 高 / 極端），由 $\sigma_{target}$ 映射表決定該等級下的目標波動率。
* **執行層 Circuit Breakers**（寫死在下單 SDK，非 AI 可改）：
  - 單筆訂單 > 總資金 2% → Reject
  - 1 秒內重複送單 → Reject
  - 日內累積虧損 > N% → 全系統暫停
  - 每筆進場必須同時掛**硬停損 (Hard Stop)**，否則 Reject

### 1.4 防 Overfitting — 用 CPCV 取代 Walk-Forward

**問題**：「讓大腦不斷重寫策略直到夏普達標」= p-hacking，實盤一定崩。

**方向**：

* 採用 **Combinatorial Purged Cross-Validation (CPCV)**（López de Prado）取代單一時間軸的 Walk-Forward Analysis。
* **限制 AI 改參數的自由度**：只允許在白名單超參數範圍內微調，禁止改核心邏輯。
* **強制 OOS + Monte Carlo + Regime-aware**：每個 AI 產出的策略，必須通過樣本外 + 蒙地卡羅擾動 + 不同市場狀態（牛 / 熊 / 盤整 / 高波動）四個 Gate，否則自動退回。

---

## 2. TODO（短期可動手）

> 排序原則：先動「不會弄壞既有實驗、但能立刻撐住未來規模」的事。

### TODO-A 資料管道與儲存

* [ ] 在開發機 / VPS 起一個 **Redis** 實例當訊息匯流排，先單機 Pub-Sub，不上 Kafka。
* [ ] 將現有 K 線抓取腳本改為「發布事件」而非「寫 CSV」。
* [ ] 起 **TimescaleDB**（Docker 一條 compose 指令），把所有歷史 K 線 / Tick 灌進去；保留 CSV 為冷備份。
* [ ] 起 **Milvus / Qdrant**（擇一），把新聞、研究報告 Embedding 入庫；先做 1 個月歷史。
* [ ] 寫一個 `EventBus` Python wrapper，三個下游（大腦 / 執行 / 紀錄）統一從這裡訂閱。

### TODO-B LLM 結構化輸出

* [ ] 為 Agent A（情報官）寫一份 **Pydantic Schema**：`{ event_id, sentiment: float[-1,1], confidence: float[0,1], sectors: [str], horizon: enum, rationale: str, source_urls: [str] }`。
* [ ] 用 `instructor` / `outlines` 把 Function Calling 鎖死成上面 Schema；非法輸出自動 retry，連續 3 次失敗 → 該則新聞標記 `unresolved`，由人類審。
* [ ] 把連續 sentiment 作為一個新的 Qlib expression / feature column，跑一次 baseline LightGBM，記錄 IC / RankIC 與既有 Alpha158 比較。

### TODO-C 風控與執行

* [ ] 寫純 Python 的 `volatility_target.py`：輸入近 60 日報酬率，輸出 $w_i$；附單元測試。
* [ ] 在下單 SDK 內側寫 `risk_gate.py` 三條硬規則（單筆 2% / 重複單 / 日內熔斷），且**不可由任何 AI 流程繞過**。
* [ ] 每筆下單同時送出 OCO / 硬停損；若交易所不支援 OCO，由 watchdog 程式監控並補單。

### TODO-D 回測與驗證

* [ ] 引入 / 自寫 **CPCV** 框架；先用一個既有策略跑出與 WFA 的差異報表（看夏普 / MDD / 換手率落差）。
* [ ] 把「AI 改策略」限制成「只能編輯 `params.yaml` 內的白名單欄位」；對核心 `.py` 加 `git` pre-commit hook 阻擋。
* [ ] 寫一個 `regime_classifier.py`（趨勢 / 盤整 / 高波動 / 極端），所有回測報表強制按 regime 分桶呈現。

### TODO-E 觀測 / 安全 / 治理

* [ ] 對所有 LLM 呼叫加 **trace ID**，存到向量庫 + 結構化 log（含 prompt、輸出、信心、後驗實際報酬）；用來事後算 LLM Calibration。
* [ ] 加上「**Kill Switch**」：一個外部 Webhook 可立刻把整個系統切到 flat（全平倉、暫停所有下單）。
* [ ] 引入 **Paper Trading Shadow**：實盤策略同步在模擬帳戶跑，每天比對偏差。

---

## 3. 待考慮事項（Open Questions）

這些是還沒做決定、需要先想清楚再動工的事：

### 3.1 標的與市場

* 主戰場是 **美股 / 台股 / 加密 / 期貨 / 多資產**？不同市場的微結構 / 監管 / 成本完全不同，會反過來決定資料庫與券商選擇。
* **加密** 與 **TradFi** 是否共用同一套 Agent，還是分兩條 pipeline？

### 3.2 LLM 採購策略

* 線上 SOTA（Claude / GPT / Gemini）做大腦 + 本地小模型做高頻打分，還是全本地（避免雲端供應商價格 / 隱私 / latency 問題）？
* 與既有 NemoClaw / Nemotron 路線是否整合？是否能把交易系統的「事件分類器」放進 NemoClaw 本地推論 (參考 [[concepts/nemoclaw]] 路線 + 個人 memory 的 `project_nemoclaw_local_gpu` 本地 GPU 設定)？

### 3.3 數據來源合法性

* LOBSTER / 高頻盤口的授權與費用結構（Nasdaq ITCH/OUCH licence 不便宜）。
* 新聞 / 社群（X、PTT、Telegram、Discord）的 ToS 與爬取速率限制。
* 替代資料（衛星影像、信用卡刷卡、Web traffic）的 ROI 是否值得 onboard。

### 3.4 Agent 治理

* Agent 之間用 **AutoGen** / **CrewAI** / **LangGraph** / **自寫 state machine**？四者在 debug 性、可觀測性、成本上落差大。
* Agent 是否要有「**辯論回合 (Debate)**」機制，讓兩個立場相反的子 Agent 互相挑戰再給結論？

### 3.5 法規 / 稅務 / 風險揭露

* 自動下單在台灣 / 美國的合規邊界（自動 vs 演算法交易申報）。
* 若對外提供訊號（PolkaSharks / shark persona），是否要明確區分「教育內容」與「投資建議」？需要法務檢視。

### 3.6 整合既有 `$hark` / PolkaSharks 工作流

* 與既有 `.claude/agents/polkasharks-invest-advisor.md` agent 的角色分工：那個 agent 負責**對外發文 (humor)**，這套量化系統負責**對內決策 (alpha)**，兩者共用情緒分數但輸出層完全分離？

---

## 4. 模型可以改善的方向（LLM / Agent 行為調整）

這一節聚焦在「LLM 本身怎麼用得更好」，不是架構。

### 4.1 強制結構化 + 信心校準

* 所有 LLM 輸出走 Pydantic / JSON Schema；任何「自由文字決策」一律拒收。
* 引入 **Calibrated Confidence** 機制（參考 [[concepts/calibrated-confidence-llm]] 已收錄的 temperature scaling / verbalised / P(IK) / conformal / selective prediction 工具箱）：低信心 → `abstain`；極低 → `escalate to human`。
* 事後做 Calibration Curve，把 LLM 預測的 sentiment confidence 對到實際勝率，當作模型健康度指標。

### 4.2 多模型路由 / 小模型 Ensemble

* 借用 [[concepts/tiered-inference]]：例行新聞分類 → 本地小模型；遇到「重大政策 / Fed 聲明 / 戰爭新聞」才升級到大型推理模型。
* 借用 [[concepts/small-model-ensemble]]：多顆 7–14B 小模型投票 + 不同 prompt persona（多頭 / 空頭 / 中性），用 majority + 信心加權。實證上多顆小模型可逼近單顆大模型且**成本與延遲低一個數量級**。

### 4.3 RAG 用對地方

* 對「新聞 / 政策 / 財報」用 RAG（檢索歷史相似情境）— 高價值。
* 對「即時盤口 / Tick」**不**用 RAG，也**不**用 LLM — 改用 LightGBM / DeepLOB / 純規則。
* RAG 的相似度檢索要做**時序去汙染 (Purging)**：禁止把未來資訊洩漏到當下的檢索結果。

### 4.4 Provenance + 可審計

* 每一筆 LLM 輸出 → trace 到 (a) prompt 版本，(b) 模型 ID + 溫度，(c) RAG 引用的歷史片段，(d) 最終實際盈虧。
* 對齊 [[concepts/agentic-provenance]] 的四層信任模型 (data / model / decision / system)，讓系統有事後追溯能力。

### 4.5 反 Overfitting 的 LLM 行為約束

* **禁止 LLM 在回測迴圈內微調策略參數**。LLM 只能提**新假設**，由獨立的回測 worker 在 CPCV 框架下評估。
* LLM 提出的策略必須附「**失敗條件 (kill criteria)**」— 「若連續 N 個月 IR < X 則自動下架」— 用來防止策略沉默退化。
* 對 LLM 的 prompt 加一條 system rule：「若你發現自己**已經為了好看的回測在改參數**，請主動 abstain。」這條看似戲劇化但實證上對降低 p-hacking 有幫助。

### 4.6 安全護欄（Trading-specific）

* LLM 永遠不能直接呼叫下單 API；下單必須走 `risk_gate` → `execution_sdk` 兩道。
* LLM 不能直接看到 / 寫入「帳戶餘額」「未實現損益」等可能誘發追漲殺跌行為的欄位；只能看「標準化波動率單位」(σ) 與「目前部位 vs 目標部位」。
* 凡是「我建議全壓 / 加倉 5 倍」這類輸出，自動觸發 abstain + 人類審。

---

## 5. 接下來最值得先動的一件事（個人建議）

如果只能挑一個入手點，最推薦 **TODO-B（LLM 結構化輸出 + 整合進 Qlib 當 Alpha Factor）**：

* **代價最小**：不動既有交易與風控，只加一條 feature column。
* **回饋最快**：1–2 週內就能用 IC / RankIC 量化「LLM 情緒到底有沒有 alpha」。
* **結果可二擇一**：有 alpha → 全套架構升級值得做；沒 alpha → 立刻知道哪些方向是幻覺、省下後面所有工程投資。

第二優先是 **TODO-C 的硬熔斷**（純 Python，幾百行內可完成），是「無論策略好壞、能讓你不爆倉」的保險絲。

其他項目（CPCV、向量庫、事件總線）建議等 TODO-B 的訊號驗證之後再大規模投入。

---

---

## v1 Implementation Landing — `trader` agent

A runnable analysis-only LLM equity-analyst agent now lives at `agents/src/trader/`, mirroring the Firefly agent pattern (`agents/src/firefly/`).

**Architecture decisions implemented in v1:**

- **Perception → brain split**: implements the LLM-demoted-to-feature-engineer pattern per [[concepts/llm-as-feature-engineer]]; the analyst sub-agent reads unstructured news + EDGAR filings and emits a structured Pydantic JSON (sentiment, confidence, horizon, rationale, source_url) — never an order.
- **Position sizing in σ units**: the `TradeThesis` output carries a `position_hint` in sigma units; the deterministic risk layer applies `volatility_target.py` per [[concepts/volatility-targeting]] to convert to dollar notional. LLM never sees account balance or unrealized PnL.
- **Hard Python-side abstain guardrail**: `confidence < 0.35` → `abstain: true`; items marked abstain are logged but not inserted into the Qlib feature matrix. Three consecutive schema-validation failures → item marked `unresolved`.
- **LLM_BACKEND env var**: supports `nemotron` (NemoClaw/Nemotron via OpenAI-compatible `:8642`), `anthropic` (Claude Sonnet via Anthropic SDK), or `disabled` (offline / CI mode, returns zeroed-out sentiment stubs). Switching backend requires no code change.
- **No order-execution path in v1**: `execution_hook` is reserved in `agents/src/trader/tools/alpaca_client.py` but raises `NotImplementedError`. v1 is analysis-only; paper-trading or live execution is scoped to v2.
- **Per-ticker synthesis output**: after each analysis run the agent writes `wiki/synthesis/trade-<TICKER>-<YYYYMMDD>.md` with the full trade thesis, IC baseline comparison, CPCV path count, and source citations — mirroring the Firefly `wiki/synthesis/odc-mission-<slug>.md` pattern.

---

## See Also

* [[synthesis/ai-quant-trading-oss-stack-selection]] — 姊妹頁：每一層具體用哪個開源專案 + 不同交易風格的推薦組合決策表
* [[concepts/calibrated-confidence-llm]] — temperature scaling / verbalised / P(IK) / conformal / selective prediction
* [[concepts/small-model-ensemble]] — MoA / PoLL / Constitutional AI analogues
* [[concepts/tiered-inference]] — FrugalGPT / RouteLLM / 多層次路由
* [[concepts/agentic-provenance]] — W3C PROV-DM / C2PA / NIST AI 600-1 四層信任模型
* [[synthesis/spacesharks-trust-stack]] — 同一套信任模型在 SatOps 場景的版本，可平移到 Trading
* `.claude/agents/polkasharks-invest-advisor.md` — 既有對外發文 agent；與本架構互補（對外娛樂 vs 對內決策）

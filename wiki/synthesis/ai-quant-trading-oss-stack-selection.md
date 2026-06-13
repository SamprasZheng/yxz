---
type: synthesis
tags: [ai, quant, trading, llm, agents, oss, fingpt, finrobot, qlib, deeplob, tslib, crewai, autogen, langgraph, model-selection]
sources:
  - "[[sources/qlib-microsoft-quant-platform]]"
  - "[[sources/fingpt-ai4finance-2024]]"
  - "[[sources/finrobot-ai4finance-2024]]"
  - "[[sources/finma-pixiu-benchmark-2023]]"
  - "[[sources/xuanyuan-financial-llm]]"
  - "[[sources/trademaster-ntu-2023]]"
  - "[[sources/tslib-thuml-time-series-library]]"
  - "[[sources/deeplob-limit-order-book-2019]]"
  - "[[sources/agent-frameworks-2025-snapshot]]"
concepts:
  - "[[concepts/time-series-forecasting-quant]]"
  - "[[concepts/deep-lob]]"
  - "[[concepts/calibrated-confidence-llm]]"
  - "[[concepts/small-model-ensemble]]"
  - "[[concepts/tiered-inference]]"
  - "[[concepts/agentic-provenance]]"
---

# AI 量化交易開源選型 — 每一層用什麼，不同交易風格選哪一套

## 一句話定位

> [[synthesis/ai-quant-trading-architecture-improvements]] 回答「**怎麼把架構穩成生產級**」；本頁回答「**每一層具體用哪個開源專案**」以及「**不同交易風格該選哪一套組合**」。

這是一份**選型指南 (decision guide)**，把 FinRobot / FinGPT 之外的開源金融 AI 生態盤點下來，對位到既有的「三層分離式架構」(感知層 → 大腦層 → 執行層)，並給三種交易風格各一套推薦組合。**所有選型最後都要套回架構頁的硬熔斷、CPCV、trading-specific 護欄才能進實盤**（見 §7）。

> 驗證註記：本頁 9 個 repo 已於 2026-05-29 用 WebSearch 驗證 canonical URL 與維護狀態，逐一落成 `sources/` 頁。其中 4 處與原始口述有出入，已在對應 source 頁標 `⚠️` 並在下文點出。

---

## 1. 三層架構 OSS 對位表

沿用 [[synthesis/ai-quant-trading-architecture-improvements]] §0 的三層命名，不重畫架構圖。

| 層 | 職責 | 開源選項 | 角色 |
|---|---|---|---|
| **感知層** | 把量價 / 盤口 / 新聞變成結構化訊號 | [[concepts/deep-lob|DeepLOB]] (tick / 盤口)、[[concepts/time-series-forecasting-quant|TSlib]] (K 線特徵 / 波動率)、Finviz* (篩選器，非 OSS) | 純數據 → 特徵 / 短期預測 |
| **大腦層** | 推理、規劃、把非結構化轉成因子 | [[sources/fingpt-ai4finance-2024|FinGPT]]、[[sources/finrobot-ai4finance-2024|FinRobot]]、[[sources/xuanyuan-financial-llm|XuanYuan]]、[[sources/finma-pixiu-benchmark-2023|FinMA/PIXIU]]、CrewAI / LangGraph / AutoGen† | LLM 特徵工程 + Agent 編排 |
| **執行層** | 回測、Alpha 因子、風控倉位、下單 | [[sources/qlib-microsoft-quant-platform|Qlib]]、Backtrader、[[sources/trademaster-ntu-2023|TradeMaster]]‡ | 確定性程式碼 + RL（選用） |

\* Finviz 是商業篩選器，常被掛成 Agent 的 Tool，不是 OSS。
† **AutoGen 已進 maintenance mode**（2025-04 起 Microsoft 導向新的 Agent Framework）——見 §3。
‡ **TradeMaster 是 RL-first，不是「LLM+RL 融合」**——見 §4。

新手起步路徑（同架構頁 §0）：**FinRobot 骨架 → 外掛 Finviz 篩選器當 Context → 讓 AI 做最後品管（挑 3 檔 + 算停損）**。

---

## 2. 金融專屬 LLM（大腦層）

彭博的 BloombergGPT 閉源且資本密集；開源社群走的是「**微調開放底模 + 輕量 adapter**」的便宜路線。四個值得認識的專案：

- **[[sources/fingpt-ai4finance-2024|FinGPT]]** (AI4Finance) — LoRA 微調開放底模做**金融情緒 / 分類**；設計核心是「重訓成本要低」以追上新聞漂移。單模型，是 FinRobot 的前身。
- **[[sources/finrobot-ai4finance-2024|FinRobot]]** (AI4Finance, Apache-2.0) — FinGPT 的**多 Agent 後繼**；四層架構（Financial AI Agents / LLM Algorithms / LLMOps+DataOps / Multi-source Foundation Models），可插不同底模。大腦層骨架首選。
- **[[sources/xuanyuan-financial-llm|XuanYuan 轩辕]]** (度小满) — **中英雙語**金融對話模型；XuanYuan-70B (Llama2, 8k) → XuanYuan3-70B (Llama3, 16k)。解析中文財報 / 央行政策 / 供應鏈新聞的首選，適合台/中市場 fundamental。
- **[[sources/finma-pixiu-benchmark-2023|FinMA / PIXIU]]** (The-FinAI) — 學術基準線：FinMA 模型 + 136K 指令集 (FIT) + **FLARE benchmark** (5 任務 / 9 資料集)。FLARE 的關鍵發現「文本強、數值推理弱」正是架構頁 §1.3「**別讓 LLM 算浮點數風控**」的實證背書。

> ⚠️ **修正**：PIXIU/FinMA 由 **The-FinAI** 維護，不是 AI4Finance（原口述歸錯組織）。AI4Finance 維護的是 FinGPT / FinRobot / FinNLP，另一條 lineage。

**共同鐵律**：這四個都只該輸出**結構化情緒因子**（帶 confidence 的 JSON），不該直接決策——見 [[synthesis/ai-quant-trading-architecture-improvements]] §1.2。

---

## 3. Agent / 工作流框架（大腦層編排）

這三者是**通用**多 Agent 框架，不是金融專屬；量化交易小組是在上面寫金融 Tool 疊出來的。選型 trade-off：

- **CrewAI** — role-playing「crew」：每個 Agent 有 role / backstory / goal。原口述的 Research-Agent / Risk-Agent / Portfolio-Agent 分組對 CrewAI 角色一對一。**最低門檻、最快看到自動化成果**，是 §5 上班族 profile 的推薦起點。
- **LangGraph** — 顯式**有向圖 (DAG / state machine)** + state 持久化；精準控制執行順序、分支、錯誤回復，**阻止 Agent 死循環**。原口述那條「[抓新聞]→[判利空]→[技術面篩+停損]→[風控通過:下單]」的嚴謹工作流就是 LangGraph 的 use case。
- **AutoGen** — Microsoft Research，首創多 Agent 對話模式。⚠️ **已 maintenance mode**（2025-04 起 README 導向後繼的 **Microsoft Agent Framework**，整併 AutoGen + Semantic Kernel）。新專案應選 Agent Framework 或上述兩者，不要從 vanilla AutoGen 起手。

| 需求 | 選擇 |
|---|---|
| 最快做出可動的 crew、角色隱喻直覺 | CrewAI |
| 嚴格工作流、不死循環、可審計 state | LangGraph |
| 新的 Microsoft-stack 專案 | Microsoft Agent Framework (AutoGen 後繼) |

框架的 debug 性 / 可觀測性 / 成本差異**不在本頁重述**——[[synthesis/ai-quant-trading-architecture-improvements]] §3.4 已把框架選擇列為 open governance question。本頁只給選型方向；§4.6 的鐵律（任何框架都不能直接呼叫下單 API）仍然適用。詳見 [[sources/agent-frameworks-2025-snapshot]]。

---

## 4. ML 預測模型（純數據驅動，無 LLM）

追求精確價量關係 / 主力大單跟隨時，你要的是**不需要 LLM 介入**的純數據模型：

- **[[concepts/deep-lob|DeepLOB]]** ([[sources/deeplob-limit-order-book-2019]]) — 2D-CNN + LSTM 直接吃**限價簿**，預測未來幾個 tick 往上 / 持平 / 往下。高頻 / 微觀結構的代表。
  > ⚠️ **修正**：DeepLOB canonical paper 跑在 **FI-2010** public benchmark（與 LSE 股票），**不是 LOBSTER**。LOBSTER 是另一個**商業** LOB 重建服務（Nasdaq ITCH → 重建簿），授權費 (ITCH/OUCH) 不便宜——見架構頁 §3.3。兩者別混。
- **[[concepts/time-series-forecasting-quant|TSlib]]** ([[sources/tslib-thuml-time-series-library]], 清華 THUML) — 深度時序模型動物園：**TimesNet / PatchTST / iTransformer / Autoformer / Informer**。一口氣吃過去上千天的波動率、成交量、融資融券等特徵，預測未來**價格區間與波動度**——非常適合動態倉位與期權策略。
- **[[sources/qlib-microsoft-quant-platform|Qlib]]** (Microsoft) — 不是預測模型而是**平台**：特徵工程 (Alpha158/Alpha360) + 模型動物園 + 一鍵回測 (`qrun`) + Alpha 因子挖掘 (RD-Agent)。是把 LLM 情緒當 feature column 驗證 alpha 的最佳落腳點。

**分工**：TSlib 做 bar-level 預測 → 餵進 Qlib 當 feature；DeepLOB 做 tick-level（不要拿 TSlib 吃盤口，也不要拿 DeepLOB 吃日線）。

---

## 5. 交易風格 → 推薦開源組合決策表

| 交易風格 | 核心痛點 | 推薦開源組合 | 為什麼 |
|---|---|---|---|
| **上班族低頻 / 長線**（80% 時間在上班） | 沒時間看新聞、找突破股 | **[[sources/xuanyuan-financial-llm|XuanYuan]] / [[sources/fingpt-ai4finance-2024|FinGPT]] + CrewAI** | 建新聞篩選工作流，每天 EOD 自動產報告；CrewAI 門檻最低 |
| **波段 / 量化選股**（追高盈虧比、篩 Sector） | 要強特徵工程 + 策略回測 | **[[sources/qlib-microsoft-quant-platform|Qlib]] + [[concepts/time-series-forecasting-quant|TSlib (PatchTST)]]** | 用 ML 自動挖 Alpha 因子 + 預測趨勢與波動 |
| **高頻 / 週末加密**（高勝率、盯主力大單） | 要微秒 / 秒級反應 | **[[concepts/deep-lob|DeepLOB]] + Backtrader** | 直接**放棄 LLM**，純神經網路吃盤口（見架構頁 §4.3） |

入門建議：**門檻最低、最快看到成果的方向是 CrewAI 串接 Finviz 數據**。

---

## 6. 與既有 PolkaSharks 工作流的分工

延續 [[synthesis/ai-quant-trading-architecture-improvements]] §3.6，明確兩條 pipeline 的角色：

- **對外娛樂 / 教育文字** → `.claude/agents/polkasharks-invest-advisor.md`（shark persona 發文，幽默 + 自嘲）。
- **對內量化決策 / 訊號** → 本頁的 OSS 組合 + [[synthesis/ai-quant-trading-architecture-improvements]] 的架構與風控。

兩者**可共用同一份情緒分數**（架構頁 §3.6 已預留 hook：FinGPT/XuanYuan 算出的連續情緒既可餵 Qlib 因子，也可餵 shark 發文素材），但**輸出層完全分離**——對外是內容，對內是部位。對外發文永遠不等於投資建議；任何要對外揭露訊號的內容需先過 §3.5 的法務 / 揭露邊界檢視。

---

## 7. 反向接回硬化建議（別只看選型表就動手）

上面任何選型，最後都必須套回 [[synthesis/ai-quant-trading-architecture-improvements]] 的工程護欄才能進實盤：

- **§1.3 執行層硬熔斷**（單筆 2% / 重複單 / 日內熔斷 / 強制硬停損）——寫死在下單 SDK，AI 不可繞過。
- **§1.4 CPCV 取代 Walk-Forward**——這些高容量模型（TSlib / DeepLOB / RL）overfit 極快，必過 CPCV + OOS + Monte Carlo + regime 四 Gate。
- **§4.6 trading-specific 護欄**——LLM 永遠不能直接呼叫下單 API、不能直接看帳戶餘額；只能看標準化 σ 與「目前 vs 目標部位」。

選型決定「用什麼」，架構決定「能不能不爆倉」。兩頁要一起讀。

---

## 8. See Also

- [[synthesis/ai-quant-trading-architecture-improvements]] — 姊妹頁：三層架構硬化 / TODO / 待考慮事項 / 模型改善
- [[concepts/time-series-forecasting-quant]] — TimesNet / PatchTST / iTransformer / Autoformer / Informer hub
- [[concepts/deep-lob]] — 限價簿深度學習 + FI-2010 vs LOBSTER 資料釐清
- [[concepts/calibrated-confidence-llm]] — 大腦層 LLM 的信心校準（answer / abstain / escalate）
- [[concepts/small-model-ensemble]] — 多顆小模型投票逼近單顆大模型
- [[concepts/tiered-inference]] — 例行新聞走小模型、重大事件才升級大模型
- [[concepts/agentic-provenance]] — 每筆 Agent 決策可追溯 / 可審計
- `.claude/agents/polkasharks-invest-advisor.md` — 對外發文 agent（與本頁互補：對外娛樂 vs 對內決策）

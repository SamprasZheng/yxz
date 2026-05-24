---
slug: spacesharks-mission-desk-trust-stack
title: "Spacesharks Mission Desk：我為什麼不靠『最大的 Nemotron』打 NVIDIA Agent Challenge"
authors: ["sampras"]
tags: [ai, space, rf, misc]
description: "為什麼一個四天 hackathon 的衛星營運 copilot 不該堆模型大小，而應該堆 trust stack：data / model / decision / system 四層信任架構，加上一個窄到不能再窄的 scope。"
image: /img/og/ai-agent.png
---

接著 [上一篇 Claw 堆疊筆記](/blog/exploring-claw-agent-stack) 之後，今天把 NVIDIA Agent Challenge 2026 的參賽計畫「Spacesharks Mission Desk」做了一次重要的重整。

題目沒換，stack 沒換，但我把這個 agent **要證明什麼** 重寫了一次。

原本的版本是「把現有 Jamia / Spacesharks GPT 移植到 Nemotron stack」。今天的版本是：

> 一個低成本、多模型、能拿出證據、可以連跑 24 小時的衛星營運 copilot — 它的可信任性不是來自最大的模型，而是來自一個被刻意設計過的 trust stack。

這篇筆記紀錄這次重整的原因、四層信任架構，以及我為什麼把 scope 鎖到只有四個 ingestion source。

<!-- truncate -->

## 先回到題目：這個 agent 到底在做什麼

衛星運營有一堆零碎、來源分散、但又彼此相關的訊號：

- 太空天氣（NOAA SWPC 的 Kp、X-ray、SEP）
- 軌道與物件目錄（Celestrak / Space-Track 的 TLE、CDM）
- 法規與發射窗口（FAA NOTAM、FCC IBFS）
- 衛星本身的 telemetry / press release / vendor datasheet

operator 真正需要的不是「再一個 dashboard」，而是一個會做四件事的東西：

1. **持續吸進** 這些公開訊號
2. **歸一化** 成有時間戳、有 source URL 的事件
3. **推理** 出對單一衛星有意義的決策建議
4. **記錄** 每一個推理過程，事後能 replay

Spacesharks Mission Desk 就是這個 loop 的具象化。它的 demo case 鎖在 on-orbit 階段最 demo-able 的一件事：**safe-mode trigger recommendation**（在 X-flare / SEP / SAA 條件下，建議哪顆衛星該在幾分鐘內進 safe mode）。

## 第三次重整：從「最大的模型」轉到「可校準的多模型」

第一版的 thesis 很常見：用 Nemotron Ultra 253B 跑 reasoning，配 Hermes 框架做 long-running，再裝進 NemoClaw sandbox。

問題不是這條路走不通，而是它**在 hackathon 尺度上太不獨特**。

每一隊都租得到 405B endpoint。「我們用最大的模型」幾乎是預設值，不是優勢。但下面這幾件事，是要花時間慢慢累積、不會在四天內被別隊複製的：

- schema 設計（每一條事件長什麼樣、有哪些必填欄位）
- evaluation discipline（hit rate / calibration / Brier / freshness 同時看）
- provenance 鋪管（每一條輸出能回到原始 evidence blob）
- ensemble disagreement 訊號（讓「模型互相不同意」變成輸入，而不是被 silently 平均掉）

我把這四件事打包成一個東西，叫 **trust stack**。

第三版的 thesis 因此變成：

> *A low-cost, multi-model satellite ops copilot that uses ensemble reasoning, provenance, and safe execution to produce trustworthy recommendations.*

「三個臭皮匠勝過諸葛亮」是這個架構的中文直覺，但實作上不是 majority vote — 是 specialist arbiter，下面會講。

## 四層信任架構

整個 trust stack 被刻意切成四層。每一層都有一個 fail-closed 的承諾：缺哪一層的證據，整條 pipeline 就降級，不會往上 promote。

| Layer | 保證的事 | 操作面 | Scoreboard 指標 |
|---|---|---|---|
| 1. Data trust | 每個輸入都有 source URL、timestamp、parser version、evidence hash | NemoClaw 把 ingest 限制在 4 個 allowlisted host | `source_coverage`、`freshness_p50`/`p95`、`audit_completeness` |
| 2. Model trust | 多個小模型分工，cost-aware 升級，disagreement 是訊號不是雜訊 | classifier + scorer + recommender + arbiter；T1 → T2 → T3 cascade | `calibration_per_tier`、`brier_score`、`escalation_rate_per_tier` |
| 3. Decision trust | 每個輸出都帶 (recommendation, confidence, evidence, disagreement, route)；abstain 是合法輸出 | answer / abstain / escalate 三類；低信心或高歧異 → monitor-only | `recommendation_acceptance_rate`、`abstention_rate_by_class` |
| 4. System trust | sandbox audit log 是唯一 source of truth，out-of-process 強制 | NemoClaw policy hash + denied action log | `audit_completeness`、`denied_action_count` |

四層之間是一條鏈：

```
Layer 1 (Data)            Layer 2 (Model)              Layer 3 (Decision)      Layer 4 (System)
─────────────────         ────────────────────         ─────────────────       ──────────────────
source_url                model_A.classify()           recommendation          audit_log_id
source_timestamp    ───▶  model_B.score()        ───▶  confidence       ───▶   policy_preset_hash
parser_version            model_C.recommend()          evidence_pointers       denied_actions[]
evidence_hash             arbiter.integrate()          disagreement_level
                          ensemble_disagreement        decision_route
                          tier_used
```

三條 invariant 我會寫進設計文件而不是寫在 prompt 裡：

- **沒有 provenance 就不評分**：Layer 1 欄位不全，Layer 2 直接拒絕。
- **沒有信心 + 共識就不 publish**：Layer 3 信心低或 ensemble 歧異高 → route 變成 `monitor-only` 或 `needs-review`，never `publish`。
- **沒有 audit 就不行動**：Layer 4 audit log 寫不進去，agent 必須中止動作 — out-of-process 強制。

這條鏈是 **fail-closed** 的。任何一層缺欄位都會 downgrade，不會 upgrade。

## Layer 2 的具體做法：三個臭皮匠加一個仲裁

Layer 2 的 small-model ensemble 不是花俏的 MoE — 是三個 **角色不同** 的小模型加一個確定性 arbiter：

- **Model A — classifier**（便宜，Nemotron Nano 2 9B 或同級）：判斷事件類別 + 信心
- **Model B — scorer**（便宜偏中，Hermes-4 14B）：紅 / 黃 / 綠風險分級；遇到 CDM 時還會吐 Pc 數值
- **Model C — recommender**（同級）：寫出 next-action 文字 + 信心
- **Arbiter**（rule + threshold）：把 A+B+C 整合成 `decision_route ∈ {publish / monitor-only / needs-review}` 加一個 `disagreement_score`

關鍵設計：**三個 specialist 要從不同 base-model family 來**（Nemotron、Qwen-3、Mistral 衍生），不然 correlated-error 會把整個 ensemble 變回單一模型。

## Layer 2 的成本骨架：tiered inference

ensemble 後面接的是 cost-aware 的 T1 / T2 / T3 cascade：

| Tier | 模型級別 | 穩態流量 | 升級條件 |
|---|---|---|---|
| T1 | Nemotron Nano 2 9B / Hermes-4 14B | ~80%（CDM 篩、NOTAM 解析、FCC summary） | inter-model agreement 低 或 confidence 低於門檻 |
| T2 | Nemotron Super 49B / Hermes-4 70B | ~15%（分類模糊） | 紅色 Pc 事件、高價值資產、T2 自己也吐 medium confidence |
| T3 | Nemotron Ultra 253B / Hermes-4 405B | ~5%（紅色事件、有人操作的接近、新型事件） | 人為審核 |

FrugalGPT 把成本降 98%、RouteLLM 在 MT Bench 降 75%、Together MoA 用 open-source 在 AlpacaEval 打贏 GPT-4o — 這條路有夠多 published evidence，不是我發明的，我只是把它套到衛星營運的事件流上。

## Scope discipline：第一版只接四個 source

第二輪 review 抓到一個我自己沒看出來的問題：「8+ 個 ingestor 會把四天的 budget 全部燒在 plumbing 上」。

第一版的 ingest source 因此**硬鎖**在四個：

- `celestrak.org`（軌道 / TLE）
- `swpc.noaa.gov`（太空天氣）
- `tfr.faa.gov`（NOTAM）
- 一組 case-study 衛星的 telemetry / press release

其他 — Space-Track、FCC ELS/IBFS、ITU、NextSpaceflight、arXiv、insurance feed — 全部以 **schema-conformant stub** 的形式存在。每一個 stub 只解析第一個欄位，但整條 contract 是被走過一次的。

這條規矩有個更具體的版本：**2 個完整的 ingestor + 3 個 stub**，比 **5 個半生不熟的 ingestor** 更有展示價值。理由很簡單：judge 看到 demo 的時候，能不能在事件流裡看到「contract 真的能用」，比能不能看到「source 列表很長」重要十倍。

## Publish 是有閘門的，不是 always-on

Always-on agent 最容易讓 reviewer 不安的地方，就是「它會不會半夜自己發推發 blog」。

所以 publish verb 被切成三條路：

| Confidence × Significance | 路徑 |
|---|---|
| high + above-threshold | 進入 30-min human-cancel window，過了就 auto-publish |
| high + below-threshold | 永遠 draft，等人工 promote |
| medium / low | draft 或 internal-log-only |

加上每 24h 不超過 3 條 auto-publish 的硬上限。Hackathon demo 的時候會故意展示一條 `draft → auto-published` 的 transition，讓 judge 親眼看到 cancel window 真的存在。

## 為什麼我把 RF / 熱控 / ADSP 全部留到 post-MVP

這是這次重整裡我最掙扎的決定。

我手上有：

- X-band phased-array beamformer（F5288 TX / F6212 RX、CORA-Z7、Yaskawa scan rig、校準 notebook、實測 measurement set）
- 衛星熱控設計筆記、Rosetta / Philae 失敗案例
- ADSP / DCC 信號處理材料

每一份都很想塞進 MVP，因為它們才是 Spacesharks 真正比一般 LLM-on-satellite-data 起點高的地方。

但 hackathon 是四天，judge 不會花時間理解 X-band 校準。所以這些東西被分到 **post-MVP roadmap** 的四個 phase：

- **Phase 1**：把 RF beamformer 變成 ground-segment pass-quality advisory（link margin ± σ + evidence）
- **Phase 2**：把熱控 / Rosetta lessons 變成 thermal & mechanical advisory
- **Phase 3**：用 ADSP / DCC 真正取代 ensemble 裡的 small model placeholder
- **Phase 4**：把 Philae 那條 thread 變成 lessons-learned corpus 的第一個 seed
- **Phase 5**：拓展到 ≤ 5 顆衛星的 fleet view

Roadmap 是 **roadmap**，不是 commitment。它的存在是為了讓 hackathon 結束之後，這些既有材料不會再被當作要不要塞 MVP 的反覆討論。

## 對 judge 誠實的部分

幾件事我不會包裝成是我發明的：

- **MCP-in-aerospace**：academia 才剛開始講，公開有四個 repo（IO Aerospace、STK、aerospace-mcp、NASA MCP），全部是 practitioner 在做，沒有 peer-reviewed 論文。Spacesharks 的差異化不是「我們接了 MCP」，而是「我們把 MCP tool layer 包進 NemoClaw 的 sandbox + Hermes 的 domain KB」。這是 architecture 差別，不是 research breakthrough。
- **SCNOC-Agentic**（Sun et al., Electronics 14(16), 2025）已經把 multi-agent + Graph-RAG 套到衛星 NetOps 上，benchmark 顯示 qwen2.5-70B 從 15.6% 升到 32.2%。我不是第一個想到這個方向的人。
- **MSBAI OrbitGuard / Lockheed iSpace** 在做 JEPA + Multi-Agent RL 的 SDA，這條路有公開的 DoD SBIR 合約。我的 desk 不和他們比 SDA 準確度。
- 「最大的 Nemotron」這條路沒有錯，只是不獨特。我把預算重新分配到 trust stack 上，是 trade-off，不是技術判斷上的對錯。

## Demo 的時候 judge 只會看到五件事

說到底，四天的 hackathon judge 不會讀完所有設計文件。他們會看：

1. **Live scoreboard** — 完整十個指標都在，包含 hackathon-window 自己的 miss
2. **Git history with agent-authored commits** — author 是 `spacesharks-mission-desk-bot`
3. **NemoClaw audit log** — 一條 denied action 真的可見
4. **`~/.hermes/skills/` 資料夾** — 至少兩個 agent 在 build 開始之後自己寫的 skill
5. **`lifecycle-events.jsonl` 前 100 筆** — 每一筆都帶 phase tag + source URL + timestamp
6. **Suggested-publish queue** — 30-min cancel window 是可見的

這五件事的可信度，是 trust stack 的最終 KPI。

## 下一步

今天的工作只是把這個 thesis 凍結。實作面我會這樣推：

- Day 1（5/24）：schema 先寫，policy file 鎖到四個 host，先做兩個完整 ingestor + 三個 stub
- Day 2（5/25）：safe-mode trigger 跑通，conjunction triage 做完，decay ETA 進 dataset preview
- Day 3（5/26）：故意 stage 一條 denied action，安排一場結構化 debate，把 1–2 條 draft 透過 cancel window promote 到 auto-published
- Day 4（5/27）：錄 demo 影片、寫 README、submit

如果一切順利，這個 desk 會在 2026-05-28 提交。如果不順利，我至少留下了一個比「我們用最大模型」更值得回去看的設計記錄。

—

完整的設計細節寫在 wiki 裡，這篇是給 blog 讀者的精煉版。

## Reading List

- [NVIDIA Agent Challenge 2026 — DevPost](https://www.nvidia.com/en-us/events/agent-challenge/)
- [FrugalGPT: How to Use Large Language Models While Reducing Cost and Improving Performance](https://arxiv.org/abs/2305.05176)
- [RouteLLM: Learning to Route LLMs with Preference Data](https://arxiv.org/abs/2406.18665)
- [Mixture-of-Agents Enhances Large Language Model Capabilities (Together)](https://arxiv.org/abs/2406.04692)
- [CCSDS 508.0-B-1 — Conjunction Data Message Blue Book](https://public.ccsds.org/Pubs/508x0b1e2.pdf)
- [NOAA SWPC Real-Time Solar Wind & Indices](https://services.swpc.noaa.gov/)
- [SCNOC-Agentic — Sun et al., Electronics 2025](https://doi.org/10.3390/electronics14163320)

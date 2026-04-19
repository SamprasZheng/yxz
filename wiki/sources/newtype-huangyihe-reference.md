---
type: source
title: "newtype — huangyihe Substack + 社群 (2024–2026)"
author: "huangyihe"
date: "2024-07-01"
ingested: "2026-04-19"
tags: [reference, community, ai-workflow, content-strategy, substack, claude-skills, multi-agent]
url: "https://www.newtype.pro/"
---

# newtype — huangyihe 社群與內容系統

**Purpose of ingest:** 參考社群模型、AI 內容創作系統、agent-as-content 策略，用於改進 [[entities/sampras-yxz-site]]。

## 基本資料

| 屬性 | 內容 |
|---|---|
| 主理人 | huangyihe |
| 定位 | "Transform through AI" — AI × 個人主權 × 內容創業 |
| 平台 | Substack (newtype.pro) + 知識星球 + WeChat + Patreon + YouTube |
| 社群規模 | 380+ 付費成員 (150天)、390+ 內容件、100+ Q&A (2024-07) |
| 靈感來源 | 鋼彈「新人類」——能與 AI 協作的新型人類 |

## 社群哲學

**三層定義：「想清楚，做出來，為自己活」**

1. **想清楚** — 先問方向再選工具；AI 時代的本質問題是「你想過什麼樣的生活？」
2. **做出來** — 用 AI 作為槓桿，建立個人資產（產品/內容/事業）
3. **為自己活** — 強個人主權意識；拒絕被公司/平台/系統定義

**Newtype 不適合：** 被恐懼驅動者、追求快速致富者、尋找現成答案者、追逐趨勢者

## 付費社群模型

- **週期：** 每週五發佈視頻（付費成員提早 3–7 天）
- **專屬內容：** 不適合公開格式的「輕量型」社群短片（AI / 生產力 / 自由）
- **BIG NEWS：** 每週 AI 投融資 + 技術 + 產業新聞精選（2024-03 起）
- **Q&A：** 直接向主理人提問
- **非正式分享：** 朋友圈式隨手紀錄
- **平台同步：** 知識星球 / WeChat 視頻號 / Patreon / YouTube 四平台同步

## AI 內容創作系統（技術細節）

### 學習工作流（「AI 提效學習」文章）

```
1. 問題拆解 → 先把主題拆成 2–3 個核心子問題
2. Gemini Deep Research → 生成多份報告（而非一份），冗餘利於交叉驗證
3. Google Docs → 導入 NotebookLM → 對話式學習，pin 重點筆記
4. Cursor + Gemini 2.5 Pro → 合併所有報告與筆記 → 輸出 Markdown
```

輸出選 Markdown：人類可讀 + AI 可解析 = 未來再利用率最高

### 多 Agent 內容生成系統（newtype Profile）

架構：**Chief → Deputy → Specialists**

| Agent | 模型 | 職責 |
|---|---|---|
| Chief | Opus 4.5 | 決策者：拆解任務、最終文章生成 |
| Deputy | Sonnet 4.5 | 執行長：協調 Specialists、防止 context overflow |
| Specialists | Gemini 系列 | 研究員/作者：知識庫查詢 + 網路搜索 |

**品質控制：** 0–1 評分系統
- ≥ 0.8：直接通過
- 0.5–0.79：自我優化
- < 0.5：重做

**基礎設施：** OpenCode + oh-my-opencode（超越 Claude Code sub-agent 的客製化深度）

### Claude Skill — Super Analyst

12 個分析框架（第一原理、Porter's Five Forces、設計思維、蘇格拉底法等）的「prompt router」：
- metadata 層常駐 context
- SKILL.md 觸發時載入 SOP
- MCP 連接 Prompt House 取回對應框架
- Python 腳本評分選框架（避免 AI 自行猜測）

## 內容主題

- **Agent = 新型內容：** 文章 → 服務；靜態資訊 → 主動幫用戶完成任務
- **比 GenAI 更大的機會：** 通用科學計算（原子經濟）規模遠超生成 AI（注意力經濟）；Nvidia 的真正護城河在 FP64 + Omniverse
- **AI PC 分析：** 碎片化標準是否是偽命題？
- **DeepSeek 本地部署** (llama.cpp / ollama)
- **AI Avatar / 虛擬人偶分類**

## 關鍵洞察供 yxz 參考

見 [[synthesis/site-reference-newtype]]

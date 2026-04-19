---
type: synthesis
tags: [site-design, community, content-strategy, ai-workflow, reference, sampras-site]
---

# 改進參考：newtype 社群 × yxz 目錄

**Source:** [[sources/newtype-huangyihe-reference]] | **Author:** [[entities/huangyihe]]
**目的：** 從 newtype 的社群模型、內容系統、agent 架構中提取可套用於 SamprasZheng/yxz 的方向。

---

## 核心差異一覽

| 維度 | newtype | yxz 現況 |
|---|---|---|
| 定位 | AI × 個人主權 × 內容創業 | RF工程 + Polkadot + AI (三主題) |
| 讀者關係 | 付費社群（380+ 成員）| 公開 blog，無社群機制 |
| 內容格式 | 文章 + 視頻 + 多平台同步 | MDX blog + Docusaurus docs |
| 自動化 | 多 agent 生成 + Claude Skills | living-topics 腳本 + weekly-outlook |
| 知識沉澱 | Markdown → NotebookLM → 再利用 | **Obsidian wiki ✅（yxz 優勢）** |
| Agent 實踐 | 自建 Chief/Deputy/Specialist 架構 | llm-wiki-ingest / lint skills |

---

## 改進方向 1：明確讀者身份定位（品牌定位）

newtype 的「新人類」框架是強力的身份認同召喚——讀者加入不只是訂閱內容，而是宣稱「我是這一類人」。

yxz 現況：三個主題（RF/Polkadot/AI）各自獨立，缺乏一個統一的讀者身份。

**建議：** 定義 yxz 的「目標讀者身份」——
例如：「在 AI + Web3 + 硬體交叉口工作的工程師/創業者」。
把這句話放進 hero section 和 About 頁，讓對的人一眼認出自己。

---

## 改進方向 2：「Agent = 新內容」—— 互動式工具取代靜態文章

> newtype 核心洞察：文章傳遞資訊，agent 完成任務。

yxz 有 blog 文章，但讀者只能「讀」。

**建議：**
- 在技術文章旁嵌入**互動 demo**（已有 TID/SEE 計算器先例 ✅）
- 考慮將 wiki 的部分 synthesis 頁「前端化」成**互動工具**（例如 LEO 供應鏈地圖、Polkadot 生態導覽）
- 長期：公開部分 Claude Skills / wiki 工作流作為「可用工具」，把讀者從消費者變成使用者

---

## 改進方向 3：內容 × 工作流系統化

newtype 的學習/創作工作流：
```
主題拆解 → Deep Research（多份報告）→ NotebookLM 對話 → Cursor 合併 → Markdown 輸出
```

yxz 現況：wiki ingest 已有類似邏輯（llm-wiki-ingest skill），但**輸出還沒系統性轉換為 blog 內容**。

**建議：** 建立 wiki → blog 的**發布管道**：
```
wiki/synthesis/<topic>.md
  → draft/blog/<slug>.md（精簡 + 加入讀者視角）
  → my-website/blog/<date-slug>.md（發布）
```
wiki 是原材料，blog 是成品。目前兩者是平行的，應讓 wiki 成為 blog 的上游。

---

## 改進方向 4：多平台內容同步

newtype 4 平台同步：知識星球 / WeChat / Patreon / YouTube

yxz 現況：純 GitHub Pages，無跨平台觸達。

**建議（循序漸進）：**

| 優先 | 平台 | 用途 | 難度 |
|---|---|---|---|
| ⭐⭐⭐ | Medium | 中英文文章跨發；SEO 流量 | 低（手動貼）|
| ⭐⭐ | X/Twitter | 文章摘要 + 觀點推文 | 低 |
| ⭐⭐ | YouTube | 技術解說視頻（RF / Polkadot） | 高（製作成本）|
| ⭐ | 知識星球 / Discord | 付費社群 | 高（需受眾基礎）|

**先做 Medium + X：** 用已有的 blog 內容直接跨發，零額外創作。

---

## 改進方向 5：Claude Skills 公開化

newtype 的 Super Analyst skill 是**內容本身**——不只是工具，而是展示「我是怎麼思考的」。

yxz 已建立 `llm-wiki-ingest` / `llm-wiki-lint` skills。

**建議：**
- 在 blog 寫一篇「我如何用 Claude Skill 維護 wiki」——把 skill 的設計哲學公開
- 把 skill 的 SKILL.md 放到 GitHub 公開目錄，讓讀者可以 fork 使用
- 類比 newtype 的 Super Analyst：技術輸出 = 個人品牌的一部分

---

## 改進方向 6：付費社群評估（長期）

newtype 150 天達到 380+ 付費成員，靠的是：
1. 明確的讀者身份召喚
2. 持續的視頻 + 文字雙格式輸出
3. 知識星球 + WeChat（中文市場）的高黏性社群感

yxz 現況：受眾基礎尚在建立階段。

**建議：** 付費社群是 6–12 個月後的事，現在的優先任務是：
1. 穩定發布節奏（已有 weekly-outlook ✅）
2. 建立跨平台存在感（Medium + X）
3. 定義讀者身份 → 形成「自然聚攏」效應

---

## 優先行動清單（整合 chichieh-huang + newtype 兩份參考）

| 優先 | 行動 | 參考來源 |
|---|---|---|
| ⭐⭐⭐ | About 頁加「技能分組 + 服務意向 + 讀者身份定義 + 哲學句」 | chichieh + newtype |
| ⭐⭐⭐ | Blog 分類頁：domain × type 兩層分類法 | chichieh |
| ⭐⭐⭐ | 建立 wiki → blog 發布管道（synthesis 轉文章） | newtype |
| ⭐⭐ | Medium 跨發（現有文章）+ X 推文摘要 | newtype |
| ⭐⭐ | 把 llm-wiki-ingest skill 寫成一篇 blog 技術文 | newtype |
| ⭐⭐ | 互動工具：LEO 供應鏈地圖或 Polkadot 生態導覽 | newtype |
| ⭐⭐ | RSS 圖標 + Archives 頁 | chichieh |
| ⭐ | 高質量文章雙語版（ZH + EN pair） | chichieh |
| ⭐ | YouTube 技術視頻（長期）| newtype |

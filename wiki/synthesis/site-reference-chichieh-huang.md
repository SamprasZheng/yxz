---
type: synthesis
tags: [site-design, ux, content-strategy, docusaurus, reference, sampras-site]
---

# 改進參考：chichieh-huang.com vs sampras-yxz

**Source:** [[sources/chichieh-huang-site-reference]]
**目的：** 對比分析 chichieh-huang.com 的設計與內容策略，提出可直接套用到 SamprasZheng/yxz 的改進方向。

---

## 1. 導航 & 頁面結構

| 功能 | chichieh-huang.com | yxz 現況 | 建議 |
|---|---|---|---|
| 分類瀏覽 | `/categories` 含子類 | 僅 tag 頁 | 新增 Categories 導航頁 |
| 時間軸 | `/archives` 按年月分組 | 無 | 考慮 Archives 頁 |
| 標籤索引 | `/tags` 雲狀列表 | 有但未特別推廣 | 強化 Tags 入口 |
| RSS | 有，navbar 顯眼位置 | 確認是否存在 | 確保 Docusaurus RSS 已啟用並露出 |

**Quick win:** 在 navbar 加入 `Categories` 連結（目前 yxz 的 blog 分類透過 tag 做，但 UX 不如獨立分類頁直觀）。

---

## 2. 內容分類法（Taxonomy）

chichieh-huang 的**兩層架構**值得借鑒：
```
技術領域（RF / Polkadot / AI）
  └── 內容類型（教學 Tutorial / 深析 Analysis / 速報 News）
```

yxz 現況：tag 是平的（rf, polkadot, ai, space, misc）。

**建議：** 在 `docusaurus.config.ts` 的 blog plugin 加入 category 概念，或至少在 tag 命名加前綴（如 `tutorial-rf`、`analysis-dot`）讓篩選更精確。

---

## 3. About / Portfolio 頁

chichieh-huang 的 About 頁結構更強：
1. 一句話定位 → 2. 技能分組 → 3. 實際專案 → 4. 服務項目 → 5. 個人側寫 → 6. 哲學金句

yxz 現況：有 Portfolio 頁（GitHub repo cards）+ 首頁 hero。

**建議：**
- About 頁加「技能分組」（RF/衛星通訊、Polkadot/Web3、AI工具）
- 加「服務/合作」區塊（即使只是 open to 字樣）
- 加一句 guiding philosophy——個人品牌記憶點

---

## 4. 雙語發文策略（Bilingual Post Pairs）

chichieh-huang 部分文章**同時發 ZH + EN 版本**（見 v0 → Cursor/Windsurf 和 OpenManus 文章），同一主題兩個獨立 slug，各自 SEO。

yxz 現況：部分文章是中文，但沒有系統性雙語策略。

**建議：**
- 高質量文章考慮出 EN 版，slug 加 `-en` 後綴
- 或在文章開頭加語言切換提示（即使只是手動連結）

---

## 5. Medium 跨平台同步

chichieh-huang 建立了 Medium → blog 自動同步管道（902+ followers）。

**建議：**
- 若 Sampras 有/計畫有 Medium，評估用 [medium-to-md](https://github.com/nicholasgasior/medium-to-md) 或 RSS → 腳本同步到 blog
- 反向也行：blog 首發，再 cross-post 到 Medium

---

## 6. 技術棧觀察

| | chichieh-huang | yxz |
|---|---|---|
| 框架 | Jekyll + Chirpy | **Docusaurus 3.7** |
| 部署 | GitHub Pages | GitHub Pages |
| 數學 | 未特別提 | KaTeX ✅ |
| Wiki/知識庫 | 無 | **Obsidian wiki ✅**（yxz 優勢）|
| 自動化腳本 | Medium sync | living-topics + weekly-outlook |

Docusaurus 的 MDX + KaTeX + wiki 架構比 Jekyll/Chirpy **更有擴展性**；chichieh-huang 的優勢在內容深度和分類清晰度，而非技術棧。

---

## 優先行動清單

| 優先 | 改進項 | 難度 |
|---|---|---|
| ⭐⭐⭐ | About 頁改版：加技能分組 + 服務意向 + 哲學句 | 低 |
| ⭐⭐⭐ | Blog 分類頁 `/categories`：domain × type 兩層 | 中 |
| ⭐⭐ | RSS 圖標加入 navbar | 低 |
| ⭐⭐ | Archives 頁（按年月） | 中 |
| ⭐ | 高質量文章出雙語版 | 高（內容工作量） |
| ⭐ | Medium 跨發管道 | 中 |

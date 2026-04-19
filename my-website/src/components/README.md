---
type: source
title: src/components — 可重用 React 元件
tags: [code, frontend, react, components]
---

# src/components

## `GiscusComments/`
- `index.tsx` — 使用 `@giscus/react` 在每篇部落格文底部掛載 GitHub Discussions 留言系統。
- 透過 `useColorMode()` 切換 light/dark giscus theme。
- repo 固定為 `SamprasZheng/yxz`；`GISCUS_REPO_ID` / `GISCUS_CATEGORY_ID` 需至 [giscus.app](https://giscus.app) 產生並填入（目前 `REPLACE_ME_*` 是佔位）。
- 啟用前提：GitHub repo 要先開 Discussions。
- 由 [`../theme/BlogPostItem/`](../theme/BlogPostItem/) wrapper 條件式掛入（僅 `isBlogPostPage` 時）。

## `HomepageFeatures/`
- `index.tsx` — 首頁三欄 feature 區塊元件（目前 `FeatureList` 內容已註解清空）。
- `styles.module.css` — 對應 CSS module。
- 從 `src/pages/index.tsx` import。

## `PortfolioCard/`
- `index.js` — Portfolio 頁面的單張 repo 卡片。
- props：`name`、`stars`、`forksCount`、`homepage`、`html_url`、`language`、`description`。
- 使用 `@fortawesome/react-fontawesome` (`faStar`、`faCodeFork`) 顯示 star/fork 數。
- 由 [`../pages/portfolio/index.js`](../pages/portfolio/index.js) 對每筆 `github-repo-info.json` render。
- 預設圖：`static/assets/images/default-project-image.png`。

## `RadiationCalculators/`
- `index.tsx` — 嵌入部落格的互動式輻射劑量計算器（TID 總電離劑量、SEE 單粒子事件率）。
- 軌道選項：`LEO` / `MEO` / `GEO` / `Lunar`，各自有基準 `tidBase`、`seeBase`。
- 輸出單位 krad(Si)、events/device/day，配合屏蔽厚度、任務時長參數估算。
- 被太空輻射相關部落格文以 MDX import 使用。

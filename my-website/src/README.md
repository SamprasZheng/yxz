---
type: source
title: my-website/src — Docusaurus 前端原始碼
tags: [code, frontend, docusaurus, react]
---

# my-website/src

Docusaurus 的自訂前端原始碼。Docusaurus 預設會編譯 `src/pages/*` 為獨立頁面、
`src/theme/*` 為 swizzle 覆寫、`src/components/*` 為可重用元件。

| 子目錄 | 用途 |
|---|---|
| [`pages/`](pages/) | 頂層路由頁（home、portfolio、MCP 介紹等） |
| [`components/`](components/) | 可重用 React 元件：Giscus 留言、首頁特色區塊、portfolio card、輻射計算器 |
| [`theme/`](theme/) | Swizzled 主題元件（目前只有 `BlogPostItem` wrapper） |
| [`Footer/`](Footer/) | 自訂 Footer wrapper（目前是空殼 passthrough） |
| `css/custom.css` | 全站 CSS overrides |

Docusaurus 站體設定在 [`../docusaurus.config.ts`](../docusaurus.config.ts)，側欄在 [`../sidebars.ts`](../sidebars.ts)。

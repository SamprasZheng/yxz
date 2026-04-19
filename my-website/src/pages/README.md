---
type: source
title: src/pages — Docusaurus 頂層路由頁
tags: [code, frontend, docusaurus, pages]
---

# src/pages

Docusaurus 會把此目錄的每個 `.tsx` / `.js` / `.md` 編譯為一個頁面路由。

| 檔案 / 目錄 | 路由 | 說明 |
|---|---|---|
| `index.tsx` | `/` | 首頁。`HomepageHeader` + react-bootstrap grid。搭配 `index.module.css`、`HomepageFeatures`（目前內容註解掉）。 |
| `index.module.css` | — | 首頁 CSS module |
| `mcp.md` | `/mcp` | MCP (Model Context Protocol) 介紹頁 |
| `markdown-page.md` | `/markdown-page` | Docusaurus 預設範例，未清掉 |
| `portfolio/index.js` | `/portfolio` | 從 `github-repo-info.json` 讀資料、按 star 數排序、用 `PortfolioCard` render |
| `portfolio/github-repo-info.json` | — | 手動維護的 repo metadata（新增作品集需改這個檔，而不是 `index.js`） |
| `portfolio/styles.module.css` | — | portfolio 頁 CSS module |

> `stref.txt` 是 stale 的純文字參考筆記。

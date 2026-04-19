---
type: source
title: src/Footer — 自訂 Footer wrapper
tags: [code, frontend, docusaurus, footer]
---

# src/Footer

自訂的站體 Footer。目前是一個 passthrough：從 `useThemeConfig()` 取 `footer` 設定，
組回預設的 `FooterLinks` / `FooterLogo` / `FooterCopyright` / `FooterLayout`（由
`Copyright/`、`Layout/`、`Links/`、`Logo/` 子資料夾覆寫或延用）。
若 `themeConfig.footer` 為 falsy 則回傳 `null`。

## 檔案

- `index.js` — Footer 組裝入口。
- `Copyright/` — 自訂版權顯示（swizzled）。
- `Layout/` — 外層結構。
- `Links/` — footer 連結區塊。
- `Logo/` — footer logo。

Footer 實際 links / copyright / logo 內容設定在 [`../../docusaurus.config.ts`](../../docusaurus.config.ts) 的
`themeConfig.footer`。

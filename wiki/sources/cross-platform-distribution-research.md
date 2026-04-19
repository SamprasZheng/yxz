---
type: source
title: "跨平台傳播研究：Medium 跨發 + X 推文摘要 (2025–2026)"
author: "research synthesis"
date: "2026-04-19"
ingested: "2026-04-19"
tags: [cross-posting, medium, twitter-x, distribution, automation, content-strategy]
---

# 跨平台傳播研究：Medium + X

**目的：** 為 [[entities/sampras-yxz-site]] 建立自動化跨平台內容傳播管道。

## Medium 現況（2025–2026）

| 項目 | 狀態 |
|---|---|
| Programmatic API 發文 | ❌ 已停用（2024 後不再支援） |
| Import Story 功能 | ✅ 可用：貼入原文 URL → Medium 自動抓取並設定 canonical URL |
| SEO 影響 | ✅ 無懲罰：canonical URL 指回原站，搜尋引擎認原站為正版 |
| Markdown 上傳 | ✅ 可手動上傳 .md 檔（備用方案） |

**最佳工作流：**
```
1. 文章部署到 GitHub Pages
2. 開啟 medium.com/me/stories/import
3. 貼入文章 URL → Medium 自動 import + 保留 canonical
```

**重要原則：** 每次跨發必設 canonical URL 指回原站，否則 SEO 懲罰。

## X (Twitter) API 現況（2025–2026）

| 方案 | 月費 | 發文限制 | 適用 |
|---|---|---|---|
| Free | $0 | 500 posts/月 | 個人部落格自動化 ✅ |
| Pay-per-use | $0.01/post | 無硬限制 | 低頻使用 ✅ |
| Basic | $100 | 10,000 posts/月 | 企業 |

**結論：** Free tier 500 posts/月，個人 blog 每週 1–2 篇發文完全足夠。

**技術方案：** `twitter-api-v2` Node.js 套件（v1.29.0），支援 OAuth 1.0a user context（App Key + App Secret + Access Token + Access Secret）。

## 同平台比較（Dev.to / Hashnode）

| 平台 | API | 難度 | 中文讀者 | 備註 |
|---|---|---|---|---|
| Medium | ❌ Import only | 低（手動）| 有（一定基數）| canonical 自動設定 |
| Dev.to | ✅ REST API | 低 | 少 | 技術社群，英文為主 |
| Hashnode | ✅ GraphQL | 中 | 少 | 技術社群，英文為主 |
| X/Twitter | ✅ API v2 | 中 | 中文圈活躍 | 摘要推文，引流效果佳 |

## 實作：cross-post.cjs

已建立 `my-website/scripts/cross-post.cjs`，支援：

1. **Medium markdown 生成**
   - 讀取 MDX 原始檔
   - 剝除 JSX components，解析相對圖片 URL → 絕對 URL
   - 加入 canonical footer
   - 輸出至 `scripts/cross-post-drafts/<slug>-medium.md`
   - 印出 Medium import 步驟

2. **Tweet thread 生成（Claude API）**
   - 同時生成 ZH + EN 版本
   - 2–4 則推文，hook → 洞察 → CTA + URL 結構
   - 輸出至 `scripts/cross-post-drafts/<slug>-tweet.json`

3. **X 自動發文（可選）**
   - 設定 4 個環境變數即啟用
   - 支援指定語言版本（`CROSS_POST_LANG=zh` 或 `en`）

**環境變數：**
```bash
ANTHROPIC_API_KEY=sk-...       # Claude tweet 生成（必要）
SITE_URL=https://...           # 站點 URL（選填，有預設值）
X_APP_KEY=...                  # X API（選填，不設則 dry run）
X_APP_SECRET=...
X_ACCESS_TOKEN=...
X_ACCESS_SECRET=...
```

**使用方式：**
```bash
cd my-website
yarn cross-post 2025-02-24-JAM-intro          # 用 slug 片段
yarn cross-post blog/2025-02-24-JAM-intro.md  # 或完整路徑
CROSS_POST_LANG=en yarn cross-post <slug>     # 發英文版推文
```

## 測試結果

- Medium markdown ✅：格式乾淨，canonical footer 正確，圖片 URL 解析正確
- Tweet 生成：需 ANTHROPIC_API_KEY（現有腳本已有此 key 的設定方式）
- X 發文：需設定 X Developer App 憑證

## 完整設定步驟

### X Developer 申請
1. 前往 https://developer.twitter.com/en/portal/dashboard
2. 建立新 App → 取得 App Key + App Secret
3. 在 App 設定中開啟 OAuth 1.0a，設定 Read and Write 權限
4. 生成 Access Token + Access Secret（User authentication）
5. 把 4 個值加入環境變數或 `.env.local`（不要 commit）

### Dev.to 跨發（選配）
API key 從 https://dev.to/settings/extensions 取得，後續可加進腳本。

## 相關

- 實作：`my-website/scripts/cross-post.cjs`
- 套件：`twitter-api-v2 ^1.29.0`
- 參考：[[synthesis/site-reference-newtype]]（多平台策略）、[[synthesis/site-reference-chichieh-huang]]（Medium sync 案例）

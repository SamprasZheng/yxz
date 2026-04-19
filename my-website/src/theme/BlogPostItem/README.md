---
type: source
title: theme/BlogPostItem — Swizzled 部落格文章包裝
tags: [code, frontend, docusaurus, theme, swizzle]
---

# theme/BlogPostItem

Docusaurus swizzle 過的 `@theme/BlogPostItem` wrapper（"wrap" mode，非 eject）。
作用：保留原始 `BlogPostItem` 行為，僅在單篇文章頁（`isBlogPostPage === true`）於文章下方掛入
[`GiscusComments`](../../components/GiscusComments/) 作為留言區。

## 檔案

- `index.tsx` — wrapper 本體，用 `@theme-original/BlogPostItem` import 原始元件，`useBlogPost()` 判斷是否為單篇頁。

## 注意

- 僅單篇文章頁顯示留言，blog 列表頁不會觸發 Giscus（避免每張卡片都 mount）。
- 換留言系統或要改版面時只改這個 wrapper，別把整顆 `BlogPostItem` eject。

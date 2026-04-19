---
type: source
title: my-website/scripts — 自動化腳本集合
tags: [code, automation, docusaurus, video-pipeline, content-generation]
---

# my-website/scripts

此目錄放置 Docusaurus 站外的 Node CJS 與 Python 自動化腳本，分為三類：
**部落格內容生成**、**影片發佈 pipeline**、**建置與部署**。
所有 `yarn <name>` 命令定義在 [`my-website/package.json`](../package.json) 的 `scripts` 區塊。

## 部落格內容生成

### `update-living-topics.cjs`
Docusaurus blog 「Living Tracker」系列自動更新器。抓取 Google News + DuckDuckGo，更新 5 篇追蹤文：
`live-polkadot`、`live-space`、`live-rf`、`live-ai`、`live-investing`（覆寫 `blog/live-*.md`，手動修改會被蓋掉）。
由 `yarn generate:living-topics` 與 `.github/workflows/daily-content.yml` 呼叫。最多保留 `MAX_HISTORY_ENTRIES = 12` 筆歷史。

### `generate-weekly-outlook.cjs`
每週一產生一篇 macro outlook 部落格文。`startOfNextWeekLocal()` 計算下週一日期作為文件日期。
由 `yarn generate:weekly-outlook`、`yarn weekly:publish` 與 `.github/workflows/weekly-outlook.yml` 呼叫。

### `generate-og-images.cjs`
讀取 `blog/` 每篇 post 的 frontmatter，依第一個 tag 產生主題化 SVG，經由 `sharp` 光柵化為 1200×630 PNG，
寫入 `static/img/og/<slug>.png`。由 `yarn generate:og` 呼叫，用於社群分享的 OG image。

### `deploy-github.cjs`
包裝 `GIT_USER=SamprasZheng yarn docusaurus deploy` 的 deploy helper，呼叫 `spawnSync` 並驗證 exit code。
由 `yarn deploy:auto` / `yarn weekly:publish` 呼叫，推到 `gh-pages` branch。

## 影片發佈 pipeline（部落格 → YouTube）

驅動檔 [`video-pipeline.cjs`](video-pipeline.cjs) 依序呼叫下列步驟。完整流程：
`MDX → script JSON → audio + srt → mp4 → (upload to YouTube) → (embed back into MDX)`

產物統一放在 [`video-drafts/`](video-drafts/)，檔名以部落格 slug 為基底。

### `video-pipeline.cjs`
主編排器。用法：`node scripts/video-pipeline.cjs <blog-file-or-slug> [--upload] [--public|--unlisted|--private]`。
依序呼叫 `blog-to-script` → `tts.py`（走 `D:\ai_streamer\venv\Scripts\python.exe`）→ `audio-to-video` →（可選）`youtube-upload` →（可選）`embed-video`。
會自動載入 `my-website/.env.local` 的環境變數。對應 `yarn video:publish`。

### `blog-to-script.cjs`
讀 `blog/<slug>.md` → 呼叫 Anthropic API 產生 TLDR 口播稿與章節大綱 → 輸出 `video-drafts/<slug>.json`。
需要 `ANTHROPIC_API_KEY`。對應 `yarn video:script`。

### `tts.py`
edge-tts 7.x 包裝，讀 `video-drafts/<slug>.json` 的 `script` 欄位，產出 `<slug>.mp3` 與 `<slug>.srt`。
需要 `D:\ai_streamer\venv` 裡的 `edge-tts >=7.0`。對應 `yarn video:audio`。

> 歷史遺留：`script-to-audio.cjs` 是 Azure TTS（`zh-TW-HsiaoChenNeural`）的替代實作，`AZURE_CHAR_LIMIT=4000`、`CHARS_PER_SEC=4.2`。目前 pipeline 走 `tts.py`。

### `audio-to-video.cjs`
用 ffmpeg 把 mp3 + srt 合成 1920×1080 H.264/AAC 的 mp4 到 `video-drafts/<slug>.mp4`。需要系統 PATH 有 ffmpeg。對應 `yarn video:render`。

### `youtube-upload.cjs`
YouTube Data API v3 uploader。首次執行跳瀏覽器完成 OAuth2，token 存於 `scripts/.youtube-tokens.json`。
需要 `YOUTUBE_CLIENT_ID` / `YOUTUBE_CLIENT_SECRET`。描述文字由 [`yt-description.cjs`](yt-description.cjs) 的 `buildDescription()` 組出。對應 `yarn video:upload`。

### `yt-description.cjs`
YouTube 影片描述組裝器：隨機從 `TAGS_MAIN`（繁中主題標籤：#美股 #台股 #波卡 #DOT …）挑選 hashtags，後接固定 disclaimer。被 `youtube-upload.cjs` import。

### `embed-video.cjs`
上傳成功後，把 YouTube TLDR embed 以 `:::info` admonition 區塊插入 MDX 文章 frontmatter 之後。
讀 `video-drafts/<slug>.json` 的 `blogFilePath` + `youtubeId`，冪等（可重跑不重複插入）。對應 `yarn video:embed`。

## 相關資源

- 所有 `yarn` 指令定義：[`my-website/package.json`](../package.json)
- CI workflows：[`.github/workflows/`](../../.github/workflows/)
- CLAUDE / 專案說明：[`CLAUDE.md`](../../CLAUDE.md)

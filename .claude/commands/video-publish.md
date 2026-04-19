# /video-publish

將一篇部落格 MDX 文章轉成 YouTube 影片並上傳的完整流程。

## 使用方式
```
/video-publish [blog-file-path-or-slug]
```

## 執行步驟

你是一個影片發布助手。當用戶執行此指令時，按照以下步驟進行：

### Step 0 — 確認目標文章
如果用戶沒有提供 blog 檔案路徑，列出 `my-website/blog/` 下最近 10 篇文章讓用戶選擇。
確認文章標題後再繼續。

### Step 1 — 生成口語化腳本
在 `my-website/` 目錄下執行：
```bash
ANTHROPIC_API_KEY=<from env or .env.local> node scripts/blog-to-script.cjs <blog-file>
```
執行完成後，讀取 `scripts/video-drafts/<slug>.json` 顯示腳本預覽（前 500 字）。
詢問用戶：「腳本是否滿意？是否需要修改？(y/n)」
- 如果需要修改：讓用戶說明修改方向，直接編輯 JSON 中的 `script` 欄位，再確認一次
- 滿意則繼續

### Step 2 — 生成語音 + 字幕
執行：
```bash
D:\ai_streamer\venv\Scripts\python.exe scripts/tts.py <slug>
```
完成後顯示：MP3 路徑、SRT 行數、估算時長。

### Step 3 — 合成影片
執行：
```bash
node scripts/audio-to-video.cjs <slug>
```
完成後顯示：MP4 路徑、檔案大小。
告知用戶可以先在本地播放 `scripts/video-drafts/<slug>.mp4` 確認效果。
詢問：「是否繼續上傳 YouTube？(y/n)」

### Step 4 — 上傳 YouTube
詢問隱私設定：「上傳為 private / unlisted / public？」（預設 private）
執行：
```bash
node scripts/youtube-upload.cjs <slug> --<privacy>
```
完成後顯示 YouTube URL，並提醒：
- 若上傳為 private，記得在 YouTube Studio 補充縮圖、說明、標籤
- 確認無誤後再改為 public

## 注意事項
- 所有指令在 `my-website/` 目錄下執行
- `ANTHROPIC_API_KEY` 從環境變數或 `.env.local` 讀取
- YouTube OAuth token 存於 `scripts/.youtube-tokens.json`，首次需瀏覽器授權
- 輸出檔案存於 `scripts/video-drafts/`（已加入 .gitignore）

# /video-from-draft

跳過腳本生成（Step 1），直接從現有 draft JSON 執行：語音 → 影片 → 上傳 → embed。

## 使用方式
```
/video-from-draft <slug> [--public|--unlisted|--private]
```

## 步驟

所有指令在 `my-website/` 目錄下執行。

### Step 1 — 確認 draft 存在
讀取 `my-website/scripts/video-drafts/<slug>.json`，顯示：
- title
- script 前 200 字預覽
- mp3Path / srtPath / mp4Path / youtubeId（若已有）

詢問：「確認繼續？(y/n)」

### Step 2 — 生成語音 + 字幕
```bash
D:\ai_streamer\venv\Scripts\python.exe scripts/tts.py <slug>
```

### Step 3 — 合成影片
```bash
node scripts/audio-to-video.cjs <slug>
```
完成後告知檔案大小，詢問：「本地確認影片後繼續上傳？(y/n)」

### Step 4 — 上傳 YouTube
預設 `--public`，除非使用者指定其他隱私設定。
```bash
node scripts/youtube-upload.cjs <slug> --public
```

### Step 5 — 嵌入 Blog TLDR
```bash
node scripts/embed-video.cjs <slug>
```
完成後顯示修改的 blog 檔案路徑與 YouTube URL。

### Step 6 — commit 並部署
```bash
git add my-website/blog/<blog-file>
git commit -m "feat(video): embed YouTube TLDR in <slug> post"
GIT_USER=SamprasZheng yarn deploy
```

# /auto-publish

Autonomous video publishing orchestrator. Scans for blog posts marked `video_ready: true`, produces TTS + rendered video + OG image in parallel, uploads to YouTube, embeds in the blog, deploys, and verifies live. Only pauses for human input at the script approval step.

---

## Phase 0 — Pre-flight tool checks

Run these checks before doing anything else. Abort only on hard failures.

```bash
node --version          # must be >=18
python --version        # must be 3.x
```

**ffmpeg**: Do NOT check `ffmpeg` in PATH. The `audio-to-video.cjs` script uses `findFfmpeg()` which locates ffmpeg in Anaconda envs automatically (e.g. `C:\Users\User\anaconda3\envs\env_name\Library\bin\ffmpeg.exe`). If Node and Python are present, continue.

---

## Phase 1 — Scan queue

```bash
grep -rl "video_ready: true" my-website/blog/
```

For each matched file:
1. Extract `slug` from frontmatter
2. Check `my-website/scripts/video-drafts/<slug>.json` — if it exists AND has a `youtubeId` field, **skip** (already published)
3. Build `QUEUE` list of slugs to process

If QUEUE is empty: report "No posts ready for publishing" and exit.

---

## Phase 2 — Script review (only human checkpoint)

For each slug in QUEUE:

**If `my-website/scripts/video-drafts/<slug>.json` already exists** with a `script` field → show the first ~200 words of the existing script.

**If no script JSON exists** → generate the narration script:
- Read the blog post at `my-website/blog/YYYY-MM-DD-<slug>.md`
- Write a ~750-word, conversational narration (no markdown headers, no bullet-read style)
- Saves to `my-website/scripts/video-drafts/<slug>.json` with fields:
  ```json
  {
    "title": "...",
    "slug": "<slug>",
    "blogFilePath": "D:\\DOT\\yxz\\my-website\\blog\\YYYY-MM-DD-<slug>.md",
    "ogImagePath": null,
    "ttsVoice": "en-US-GuyNeural",
    "script": "..."
  }
  ```

**Show script preview** (first 200 words) and prompt:
```
Script ready for: <slug>
────────────────────────────────
<first 200 words>
...
────────────────────────────────
[a] Approve and continue
[e] Edit script before continuing
[s] Skip this post
```

Wait for input. Proceed only after approval.

---

## Phase 3 — Parallel production (per approved slug)

Spawn three parallel subagents simultaneously:

**TTS subagent**
```bash
cd my-website && python scripts/tts.py <slug>
```
Output: `scripts/video-drafts/<slug>.mp3` + `<slug>.srt`

**Video render subagent** (depends on TTS completing first)
```bash
cd my-website && node scripts/audio-to-video.cjs <slug>
```
Output: `scripts/video-drafts/<slug>.mp4`
Updates `<slug>.json` with `mp4Path`.

**OG image subagent**
- Check if `static/img/og/<slug>.png` exists
- If yes: report "OG image already exists, skipping"
- If no: generate via `node scripts/generate-og.cjs <slug>` (or note that OG image needs manual creation)

---

## Phase 4 — YouTube upload (sequential)

```bash
cd my-website && node scripts/youtube-upload.cjs <slug> --public
```

On failure: retry once after 30s. If second attempt fails, report error and stop the pipeline for that slug (do not embed or deploy a broken video).

On success: the script updates `<slug>.json` with `youtubeId`.

---

## Phase 5 — Blog embed

```bash
cd my-website && node scripts/embed-video.cjs <slug>
```

Embeds the YouTube iframe TLDR section into the blog post frontmatter/content.

---

## Phase 6 — Deploy (3 attempts with backoff)

```bash
cd my-website && GIT_USER=SamprasZheng yarn deploy
```

- Attempt 1: run deploy
- If fails: wait 15s, attempt 2
- If fails: wait 30s, attempt 3
- If all fail: report deploy failure, stop. The YouTube upload is already done but the live site won't show the post yet — advise user to run `yarn deploy` manually.

---

## Phase 7 — Playwright live verification

After deploy succeeds, wait 20s for GitHub Pages CDN to propagate, then:

```
navigate to: https://SamprasZheng.github.io/yxz/blog/<slug>
```

Use `mcp__Claude_in_Chrome__navigate` to open the live URL, then `mcp__Claude_in_Chrome__get_page_text` or `mcp__Claude_in_Chrome__read_page` to check for:
- `<iframe` in the page source
- `youtube.com/embed` in any src attribute

If found: mark LiveVerify = ✅  
If not found: mark LiveVerify = ❌ and note that the embed may need a manual check.

---

## Phase 8 — Run report

Print a summary table:

```
┌─────────────────────────────────┬────────┬─────┬───────┬────┬────────────┐
│ Slug                            │ Script │ TTS │ Video │ YT │ LiveVerify │
├─────────────────────────────────┼────────┼─────┼───────┼────┼────────────┤
│ new-space-radiation-reality     │  ✅    │ ✅  │  ✅   │ ✅ │     ✅     │
└─────────────────────────────────┴────────┴─────┴───────┴────┴────────────┘

Timing:
  Phase 3 (TTS + Video + OG):  XX s
  Phase 4 (YouTube upload):    XX s
  Phase 6 (Deploy):            XX s
  Phase 7 (Live verify):       XX s
  Total:                       XX s

Skipped: <any slugs skipped and why>
Errors:  <any failures>
```

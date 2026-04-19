# /auto-publish

Autonomous end-to-end video publishing pipeline. Scans `my-website/blog/` for posts marked `video_ready: true`, generates scripts, synthesises audio+video, uploads to YouTube, embeds in blog, deploys, and verifies live — with minimal human interruption.

## Usage
```
/auto-publish [--dry-run] [--force <slug>]
```
- `--dry-run` — scan and report what would run; make no changes
- `--force <slug>` — skip the `video_ready` check and process one specific post by slug

---

## How to mark a post as ready

Add one line to the post's frontmatter:
```yaml
video_ready: true
```
Posts that already have a YouTube embed (`youtubeId` in their video-drafts JSON, or an `<iframe` / `YouTubeEmbed` in the body) are skipped automatically — no double-processing.

---

## Execution

You are an autonomous publishing orchestrator. Work through the steps below. Track wall-clock time for each step. At the end, print a full run report.

### Phase 0 — Setup

Record the run start time: `RUN_START = Date.now()`.

Load `.env.local` if present:
```bash
cat my-website/.env.local 2>/dev/null | grep -E "^[A-Z_]+=" || true
```
Verify required tools exist before touching any post:
```bash
node --version
D:\ai_streamer\venv\Scripts\python.exe --version
# ffmpeg: audio-to-video.cjs auto-discovers it — just verify it can run:
node -e "require('./scripts/audio-to-video.cjs')" 2>&1 | head -3 || true
```
Note: ffmpeg is not expected in PATH on Windows — `audio-to-video.cjs` finds it automatically at `C:\Users\User\anaconda3\envs\env_name\Library\bin\ffmpeg.exe`. Only abort if `node` or `python` are missing.

---

### Phase 1 — Scan for ready posts

Search `my-website/blog/` for posts with `video_ready: true` in frontmatter:
```bash
grep -rl "video_ready: true" my-website/blog/ --include="*.md" --include="*.mdx"
```

For each found file, extract:
- `slug` (from frontmatter, or derived from filename by stripping date prefix and extension)
- `title`

Then, **filter out already-processed posts**: check if `my-website/scripts/video-drafts/<slug>.json` exists AND contains a non-empty `youtubeId` field. If so, skip that post and note it in the run report as "already published".

Build a **queue** of posts that need processing. If the queue is empty, print "No posts ready." and stop.

If `--dry-run`, print the queue and stop — make no changes.

---

### Phase 2 — Script generation + approval (sequential per post)

For each post in the queue, one at a time:

**2a. Check for existing script**
If `my-website/scripts/video-drafts/<slug>.json` already exists with a non-empty `script` field, skip generation and show a 150-word preview. Ask:
> Script already exists for **<title>**. Use existing? (y) or regenerate? (r)

**2b. Generate script** (if needed)
Read the blog file. Generate a YouTube narration script following these rules:
- Conversational, flowing English — as if explaining to a smart colleague
- 3–5 sentences per paragraph, blank lines between paragraphs
- On first use, define jargon in parentheses: e.g., "TID (Total Ionizing Dose)"
- Never read out heading levels — use natural transitions
- Skip bullet markers, tables, code blocks — weave key points into spoken prose
- Opening: 1–2 hook sentences surfacing the core problem or insight
- Closing: ~25-word call-to-action inviting viewers to subscribe or comment
- Target length: 3–6 minutes of spoken audio (~400–800 words)

Save to `my-website/scripts/video-drafts/<slug>.json`:
```json
{
  "title": "<title from frontmatter>",
  "slug": "<slug>",
  "blogFilePath": "<absolute path>",
  "ogImagePath": "<absolute path to static/img/og/<slug>.png, or null if missing>",
  "ttsVoice": "en-US-GuyNeural",
  "script": "<narration script>"
}
```

**2c. Show preview and await approval**
Display the first 200 words of the script and word count. This is the **only required human checkpoint**:
> ✏️ Script for **<title>** — <word_count> words (~<minutes> min)
> [first 200 words]
> Approve (a), edit (e), or skip this post (s)?

- `a` → proceed
- `e` → user pastes revised text; update the JSON; re-display; ask again
- `s` → remove from queue, note as "skipped by user"

---

### Phase 3 — Parallel production (TTS + video + OG image)

After all scripts are approved, launch work for all queued posts **in parallel** using subagents. For each post, the subagent runs:

**3a. TTS + subtitles**
```bash
cd my-website && D:\ai_streamer\venv\Scripts\python.exe scripts/tts.py <slug>
```
Expected outputs: `scripts/video-drafts/<slug>.mp3`, `scripts/video-drafts/<slug>.srt`

**3b. Video render**
```bash
cd my-website && node scripts/audio-to-video.cjs <slug>
```
Expected output: `scripts/video-drafts/<slug>.mp4`

**3c. OG image** (if missing)
Check: does `my-website/static/img/og/<slug>.png` exist?
- If yes → skip
- If no → run: `cd my-website && node scripts/generate-og-images.cjs <slug>`

Each subagent reports back: `{ slug, tts_ok, video_ok, og_ok, mp4_size_mb, duration_s, errors[] }`

If any subagent reports an error, **skip that post** in Phase 4 and note the error in the run report. Do not abort other posts.

---

### Phase 4 — YouTube upload (sequential)

For each post where Phase 3 succeeded, upload:
```bash
cd my-website && node scripts/youtube-upload.cjs <slug> --public
```
Parse stdout for the YouTube URL (line matching `https://youtu.be/` or `https://www.youtube.com/watch?v=`). Store it.

If upload fails, retry once after 10 seconds. If it fails again, skip this post and note the error.

---

### Phase 5 — Blog embed

For each successfully uploaded post:
```bash
cd my-website && node scripts/embed-video.cjs <slug>
```
Confirm the blog file was modified (read the file and check for `youtubeId` or iframe).

---

### Phase 6 — Deploy with auto-retry

Stage and commit all modified blog files:
```bash
cd my-website
git add blog/
git commit -m "feat(video): auto-publish $(date +%Y-%m-%d) — <slugs joined by comma>"
```

Then attempt deploy — **up to 3 attempts** with exponential backoff:

```
Attempt 1: GIT_USER=SamprasZheng yarn deploy
  → if exit 0: proceed to Phase 7
  → if non-zero: wait 15s, try again

Attempt 2: wait 15s → GIT_USER=SamprasZheng yarn deploy
  → if exit 0: proceed
  → if non-zero: wait 30s, try again

Attempt 3: wait 30s → GIT_USER=SamprasZheng yarn deploy
  → if exit 0: proceed
  → if non-zero: ABORT deploy — report "Deploy failed after 3 attempts"
```

Note in the report: which attempt succeeded and total deploy time.

---

### Phase 7 — Live verification (Playwright)

For each published post, verify the deployed page:

1. Navigate to `https://SamprasZheng.github.io/yxz/blog/<slug>` using the `mcp__Claude_in_Chrome__navigate` tool (or `mcp__Claude_Preview__preview_start` if Chrome MCP unavailable)
2. Wait 3 seconds for the page to load
3. Check for YouTube embed by reading page content — look for `<iframe`, `youtube.com/embed`, or `YouTubeEmbed` in the page source/text
4. **Pass** if embed found; **Warn** if page loads but no embed; **Fail** if page returns 404

---

### Phase 8 — Run report

Print a final report table:

```
╔══════════════════════════════════════════════════════════════╗
║  AUTO-PUBLISH RUN REPORT  —  <ISO datetime>                  ║
╠══════════════╦═══════╦══════╦══════╦═════╦══════════════════╣
║  Post        ║ Script║ TTS  ║Video ║ YT  ║ Live verify      ║
╠══════════════╬═══════╬══════╬══════╬═════╬══════════════════╣
║  <slug>      ║  ✅   ║  ✅  ║  ✅  ║  ✅ ║ ✅ embed found   ║
║  <slug2>     ║  ✅   ║  ❌  ║  —   ║  —  ║ —                ║
╚══════════════╩═══════╩══════╩══════╩═════╩══════════════════╝

Skipped (already published): <slugs>
Skipped (user): <slugs>
Failed: <slugs + reason>

Timing
  Script gen:    <Xs>
  Production:    <Xs>  (parallel)
  Upload:        <Xs>
  Deploy:        <Xs>  (attempt <N>/<3>)
  Verification:  <Xs>
  Total wall:    <Xs>

YouTube URLs
  <slug>: https://youtu.be/...
```

---

## Notes

- All bash commands run from `my-website/` (or with `cd my-website &&` prefix)
- `video-pipeline.cjs` is the underlying single-post script; this orchestrator wraps it with parallelism, retry, and verification
- YouTube OAuth token is at `scripts/.youtube-tokens.json` — if missing or expired, Phase 4 will fail with an auth error; visit the OAuth URL it prints to re-authorise
- OG images: `generate-og-images.cjs` expects a slug argument; check the script's `--help` if it errors
- `video_ready: true` posts that have already been published (have a `youtubeId`) are **never** reprocessed — safe to leave the flag in the frontmatter

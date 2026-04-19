/* eslint-disable no-console */
/**
 * video-pipeline.cjs — full automated pipeline: MDX → script → audio → video → (upload)
 * Usage:
 *   node scripts/video-pipeline.cjs <blog-file-or-slug> [--upload] [--public|--unlisted|--private]
 *
 * Steps:
 *   1. blog-to-script.cjs  (requires ANTHROPIC_API_KEY)
 *   2. tts.py              (requires D:\ai_streamer\venv)
 *   3. audio-to-video.cjs  (requires ffmpeg)
 *   4. youtube-upload.cjs  (optional, requires YOUTUBE_CLIENT_ID/SECRET, pass --upload)
 *
 * Example:
 *   node scripts/video-pipeline.cjs blog/2025-06-02-debug-playbook.md --upload --private
 */
const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

const SCRIPTS = path.join(__dirname);
const WEBSITE = path.join(__dirname, "..");
const DRAFTS = path.join(SCRIPTS, "video-drafts");
const VENV_PYTHON = "D:\\ai_streamer\\venv\\Scripts\\python.exe";

// Load .env.local
const envLocal = path.join(WEBSITE, ".env.local");
if (fs.existsSync(envLocal)) {
  for (const line of fs.readFileSync(envLocal, "utf-8").split("\n")) {
    const m = line.match(/^([A-Z_]+)=(.+)$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].trim();
  }
}

function run(cmd, args, opts = {}) {
  console.log(`\n▶ ${cmd} ${args.join(" ")}`);
  const r = spawnSync(cmd, args, { stdio: "inherit", cwd: WEBSITE, ...opts });
  if (r.error) throw r.error;
  if (r.status !== 0) throw new Error(`Exit code ${r.status}`);
}

function slugFromDraft(blogArg) {
  // Try to read slug from the generated JSON
  const base = path.basename(blogArg, path.extname(blogArg))
    .replace(/^\d{4}-\d{2}-\d{2}-/, "");
  // Also try frontmatter slug via simple regex
  if (fs.existsSync(blogArg)) {
    const m = fs.readFileSync(blogArg, "utf-8").match(/^slug:\s*["']?(\S+?)["']?\s*$/m);
    if (m) return m[1];
  }
  return base;
}

async function main() {
  const args = process.argv.slice(2);
  if (!args.length) {
    console.error("Usage: node video-pipeline.cjs <blog-file-or-slug> [--upload] [--public|--unlisted|--private]");
    process.exit(1);
  }

  const blogArg = args.find((a) => !a.startsWith("--")) || "";
  const doUpload = args.includes("--upload");
  const privacy = (args.find((a) => ["--public", "--unlisted", "--private"].includes(a)) || "--public").slice(2);

  if (!blogArg) {
    console.error("Missing blog file or slug argument.");
    process.exit(1);
  }

  console.log("═".repeat(60));
  console.log(" Blog → Video Pipeline");
  console.log("═".repeat(60));
  console.log(` Input  : ${blogArg}`);
  console.log(` Upload : ${doUpload ? `yes (${privacy})` : "no"}`);
  console.log("═".repeat(60));

  // ── Step 1: Generate script ────────────────────────────────
  console.log("\n[1/4] Generating narration script...");
  if (!process.env.ANTHROPIC_API_KEY) {
    throw new Error("ANTHROPIC_API_KEY not set. Add it to my-website/.env.local");
  }
  run("node", ["scripts/blog-to-script.cjs", blogArg]);

  // Resolve slug from generated draft
  const slug = slugFromDraft(blogArg);
  const draftPath = path.join(DRAFTS, `${slug}.json`);
  if (!fs.existsSync(draftPath)) {
    throw new Error(`Draft not found after script generation: ${draftPath}`);
  }
  console.log(`   Slug: ${slug}`);

  // ── Step 2: TTS ────────────────────────────────────────────
  console.log("\n[2/4] Generating voice + subtitles...");
  if (!fs.existsSync(VENV_PYTHON)) {
    throw new Error(`edge-tts venv not found: ${VENV_PYTHON}\nInstall: pip install edge-tts in D:\\ai_streamer\\venv`);
  }
  run(VENV_PYTHON, ["scripts/tts.py", slug]);

  // ── Step 3: Render video ───────────────────────────────────
  console.log("\n[3/4] Rendering video...");
  run("node", ["scripts/audio-to-video.cjs", slug]);

  // ── Step 4: Upload ─────────────────────────────────────────
  if (doUpload) {
    console.log("\n[4/4] Uploading to YouTube...");
    run("node", ["scripts/youtube-upload.cjs", slug, `--${privacy}`]);

    console.log("\n[5/5] Embedding TLDR in blog post...");
    run("node", ["scripts/embed-video.cjs", slug]);
  } else {
    const draft = JSON.parse(fs.readFileSync(draftPath, "utf-8"));
    console.log(`\n[4/4] Skipped upload. To upload + embed:`);
    console.log(`   node scripts/youtube-upload.cjs ${slug} --public`);
    console.log(`   node scripts/embed-video.cjs ${slug}`);
    console.log(`   MP4: ${draft.mp4Path}`);
  }

  console.log("\n" + "═".repeat(60));
  console.log(" ✅ Pipeline complete!");
  console.log("═".repeat(60) + "\n");
}

main().catch((e) => {
  console.error("\n❌ Pipeline failed:", e.message);
  process.exit(1);
});

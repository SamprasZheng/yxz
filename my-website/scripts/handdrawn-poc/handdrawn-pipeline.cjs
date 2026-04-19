/* eslint-disable no-console */
/**
 * handdrawn-pipeline.cjs — Full blog → handdrawn mp4 pipeline (with audio).
 * Usage: node scripts/handdrawn-poc/handdrawn-pipeline.cjs <blog-slug>
 *
 * Steps:
 *  1. blog-to-handdrawn-scene.cjs  → scene.json + <slug>-handdrawn.json
 *  2. tts.py <slug>-handdrawn      → <slug>-handdrawn.mp3
 *  3. render-mp4.cjs               → <slug>-handdrawn-noaudio.mp4
 *  4. ffmpeg merge                 → <slug>-handdrawn.mp4
 */
const path = require("path");
const fs = require("fs");
const { spawnSync, spawn } = require("child_process");
const os = require("os");

const SCRIPTS = path.join(__dirname, "..");
const POC = __dirname;
const DRAFTS = path.join(SCRIPTS, "video-drafts");

const PYTHON = process.env.PYTHON_PATH ||
  "D:\\ai_streamer\\venv\\Scripts\\python.exe";
const FFMPEG_CANDIDATES = [
  path.join(os.homedir(), "anaconda3", "envs", "env_name", "Library", "bin", "ffmpeg.exe"),
  path.join(os.homedir(), "anaconda3", "Library", "bin", "ffmpeg.exe"),
  "C:\\ffmpeg\\bin\\ffmpeg.exe",
  "C:\\ProgramData\\chocolatey\\bin\\ffmpeg.exe",
];
function findFfmpeg() {
  const probe = spawnSync("ffmpeg", ["-version"], { encoding: "utf-8" });
  if (!probe.error) return "ffmpeg";
  for (const p of FFMPEG_CANDIDATES) if (fs.existsSync(p)) return p;
  throw new Error("ffmpeg not found");
}

function run(cmd, args, opts = {}) {
  console.log(`\n[pipeline] ${cmd} ${args.slice(0, 3).join(" ")}...`);
  const r = spawnSync(cmd, args, { stdio: "inherit", ...opts });
  if (r.error) throw r.error;
  if (r.status !== 0) throw new Error(`exit ${r.status}`);
}

async function runAsync(cmd, args, opts = {}) {
  console.log(`\n[pipeline] ${cmd} ${args.slice(0, 3).join(" ")}...`);
  return new Promise((resolve, reject) => {
    const env = { ...(opts.env || process.env) };
    delete env.CLAUDECODE;
    const proc = spawn(cmd, args, { stdio: "inherit", ...opts, env });
    proc.on("close", (code) => code === 0 ? resolve() : reject(new Error(`exit ${code}`)));
    proc.on("error", reject);
  });
}

async function main() {
  const slug = process.argv[2];
  if (!slug) {
    console.error("Usage: node handdrawn-pipeline.cjs <blog-slug>");
    process.exit(1);
  }

  const handdrawnSlug = `${slug}-handdrawn`;
  const jsonPath  = path.join(DRAFTS, `${handdrawnSlug}.json`);
  const mp3Path   = path.join(DRAFTS, `${handdrawnSlug}.mp3`);
  const videoNoAudio = path.join(DRAFTS, `${handdrawnSlug}-noaudio.mp4`);
  const finalMp4  = path.join(DRAFTS, `${handdrawnSlug}.mp4`);

  // ── Step 1: Generate scene ────────────────────────────────────────────────
  console.log("\n═══ Step 1/4: Generate scene.json ═══");
  await runAsync(
    process.execPath,
    [path.join(POC, "blog-to-handdrawn-scene.cjs"), slug]
  );

  // Read actual slug from generated scene.json (blog file slug may differ from CLI arg)
  const pocSceneJson = path.join(POC, "scene.json");
  const actualSlug = JSON.parse(fs.readFileSync(pocSceneJson, "utf-8")).slug || slug;
  const actualHanddrawnSlug = `${actualSlug}-handdrawn`;
  const actualJsonPath   = path.join(DRAFTS, `${actualHanddrawnSlug}.json`);
  const actualMp3Path    = path.join(DRAFTS, `${actualHanddrawnSlug}.mp3`);
  const actualVideoNoAudio = path.join(DRAFTS, `${actualHanddrawnSlug}-noaudio.mp4`);
  const actualFinalMp4   = path.join(DRAFTS, `${actualHanddrawnSlug}.mp4`);
  if (actualSlug !== slug) console.log(`[pipeline] slug resolved: ${slug} → ${actualSlug}`);

  // ── Step 2: TTS ──────────────────────────────────────────────────────────
  console.log("\n═══ Step 2/4: TTS → mp3 ═══");
  if (!fs.existsSync(PYTHON)) {
    console.warn(`[warn] Python not found at ${PYTHON}. Skipping TTS.`);
    console.warn("[warn] Run manually: python scripts/tts.py " + actualHanddrawnSlug);
  } else {
    run(PYTHON, [path.join(SCRIPTS, "tts.py"), actualHanddrawnSlug]);
  }

  // ── Step 3: Render visual ─────────────────────────────────────────────────
  console.log("\n═══ Step 3/4: Render visual frames → mp4 ═══");
  await runAsync(
    process.execPath,
    [path.join(POC, "render-mp4.cjs"), "--out", actualVideoNoAudio]
  );

  // ── Step 4: Merge audio + video ───────────────────────────────────────────
  console.log("\n═══ Step 4/4: Merge audio + video ═══");
  if (!fs.existsSync(actualMp3Path)) {
    console.warn("[warn] mp3 not found, copying silent video as final output.");
    fs.copyFileSync(actualVideoNoAudio, actualFinalMp4);
  } else {
    const ffmpeg = findFfmpeg();
    if (fs.existsSync(actualFinalMp4)) fs.unlinkSync(actualFinalMp4);
    run(ffmpeg, [
      "-y",
      "-i", actualVideoNoAudio,
      "-i", actualMp3Path,
      "-map", "0:v:0",
      "-map", "1:a:0",
      "-c:v", "copy",
      "-c:a", "aac",
      "-shortest",
      actualFinalMp4,
    ]);
    fs.rmSync(actualVideoNoAudio, { force: true });
  }

  const size = fs.existsSync(actualFinalMp4)
    ? (fs.statSync(actualFinalMp4).size / 1024 / 1024).toFixed(1) + " MB"
    : "?";
  console.log(`\n✅ Done → ${actualFinalMp4}  (${size})`);
}

main().catch((e) => { console.error(e); process.exit(1); });

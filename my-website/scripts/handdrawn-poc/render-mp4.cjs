/* eslint-disable no-console */
/**
 * render-mp4.cjs — Render the deterministic POC HTML to mp4 via puppeteer + ffmpeg.
 * Usage: node scripts/handdrawn-poc/render-mp4.cjs [--fps 30] [--out out.mp4] [--seconds N]
 */
const path = require("path");
const fs = require("fs");
const { spawn } = require("child_process");
const puppeteer = require("puppeteer-core");

const POC_DIR = __dirname;
const HTML_URL = "file:///" + path.join(POC_DIR, "index.html").replace(/\\/g, "/") + "?render=1";

const args = process.argv.slice(2);
function getFlag(name, def) {
  const i = args.indexOf("--" + name);
  if (i === -1) return def;
  return args[i + 1];
}
const FPS = parseInt(getFlag("fps", "30"), 10);
const OUT = path.resolve(getFlag("out", path.join(POC_DIR, "poc.mp4")));
const SECONDS = getFlag("seconds", null); // override total duration for quick tests
const os = require("os");
const { spawnSync } = require("child_process");
const CHROME = process.env.CHROME_PATH || "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

function findFfmpeg() {
  if (process.env.FFMPEG_PATH && fs.existsSync(process.env.FFMPEG_PATH)) return process.env.FFMPEG_PATH;
  const probe = spawnSync("ffmpeg", ["-version"], { encoding: "utf-8" });
  if (!probe.error) return "ffmpeg";
  const home = os.homedir();
  for (const p of [
    path.join(home, "anaconda3", "envs", "env_name", "Library", "bin", "ffmpeg.exe"),
    path.join(home, "anaconda3", "Library", "bin", "ffmpeg.exe"),
    path.join(home, "miniconda3", "Library", "bin", "ffmpeg.exe"),
    "C:\\ffmpeg\\bin\\ffmpeg.exe",
    "C:\\ProgramData\\chocolatey\\bin\\ffmpeg.exe",
  ]) if (fs.existsSync(p)) return p;
  throw new Error("ffmpeg not found");
}
const FFMPEG = findFfmpeg();

async function main() {
  console.log("[render] launching Chrome:", CHROME);
  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: "new",
    defaultViewport: { width: 1920, height: 1080, deviceScaleFactor: 1 },
    args: ["--hide-scrollbars", "--disable-web-security"],
  });
  const page = await browser.newPage();
  page.on("console", (m) => console.log("[chrome]", m.type(), m.text()));
  page.on("pageerror", (e) => console.error("[chrome:err]", e.message));

  console.log("[render] loading", HTML_URL);
  await page.goto(HTML_URL, { waitUntil: "networkidle0" });
  await page.waitForFunction("window.__POC_READY__ === true", { timeout: 30000 });

  const total = SECONDS ? parseFloat(SECONDS) : await page.evaluate(() => window.getTotalDuration());
  const totalFrames = Math.ceil(total * FPS);
  console.log(`[render] total ${total.toFixed(2)}s, ${totalFrames} frames @ ${FPS}fps → ${OUT}`);

  if (fs.existsSync(OUT)) fs.unlinkSync(OUT);
  // Pick best available H.264 encoder
  const encList = (spawnSync(FFMPEG, ["-encoders"], { encoding: "utf-8" }).stdout) || "";
  const ENC = ["libx264", "h264_mf", "h264_qsv", "h264_amf", "h264_nvenc"].find((e) => encList.includes(e));
  if (!ENC) throw new Error("No H.264 encoder available");
  console.log("[render] encoder:", ENC);
  const encArgs = ENC === "libx264"
    ? ["-c:v", "libx264", "-preset", "fast", "-crf", "20"]
    : ["-c:v", ENC, "-b:v", "6M"];

  const FRAMES_DIR = path.join(POC_DIR, "frames-tmp");
  if (fs.existsSync(FRAMES_DIR)) fs.rmSync(FRAMES_DIR, { recursive: true });
  fs.mkdirSync(FRAMES_DIR);

  const stage = await page.$("#stage");
  const t0 = Date.now();
  for (let i = 0; i < totalFrames; i++) {
    const t = i / FPS;
    await page.evaluate((tt) => window.renderAt(tt), t);
    const fp = path.join(FRAMES_DIR, `f_${String(i).padStart(6, "0")}.png`);
    await stage.screenshot({ type: "png", path: fp });
    if (i % 30 === 0) {
      const pct = ((i / totalFrames) * 100).toFixed(1);
      const fps = (i / ((Date.now() - t0) / 1000)).toFixed(1);
      process.stdout.write(`\r[render] frame ${i}/${totalFrames} (${pct}%) — ${fps} fps`);
    }
  }
  console.log("\n[render] frames done, encoding via ffmpeg...");

  const ff = spawn(
    FFMPEG,
    [
      "-y",
      "-framerate", String(FPS),
      "-i", path.join(FRAMES_DIR, "f_%06d.png"),
      ...encArgs,
      "-pix_fmt", "yuv420p",
      OUT,
    ],
    { stdio: "inherit" }
  );
  await new Promise((resolve, reject) => {
    ff.on("close", (code) => (code === 0 ? resolve() : reject(new Error("ffmpeg exit " + code))));
    ff.on("error", reject);
  });
  fs.rmSync(FRAMES_DIR, { recursive: true });
  await browser.close();
  console.log("[render] DONE →", OUT);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

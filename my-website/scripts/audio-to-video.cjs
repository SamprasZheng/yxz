/* eslint-disable no-console */
/**
 * audio-to-video.cjs
 * Usage: node scripts/audio-to-video.cjs <slug>
 * Requires: ffmpeg in PATH
 * Input:  scripts/video-drafts/<slug>.json (+ .mp3, .srt)
 * Output: scripts/video-drafts/<slug>.mp4  (1920x1080, H.264/AAC)
 */
const fs = require("fs");
const path = require("path");
const os = require("os");
const { spawnSync } = require("child_process");

const DRAFTS_DIR = path.join(__dirname, "video-drafts");

function findFfmpeg() {
  // Try system PATH first
  const inPath = spawnSync("ffmpeg", ["-version"], { encoding: "utf-8" });
  if (!inPath.error) return "ffmpeg";

  // Common Windows locations (conda, choco, manual install)
  const home = os.homedir();
  const candidates = [
    path.join(home, "anaconda3", "envs", "env_name", "Library", "bin", "ffmpeg.exe"),
    path.join(home, "anaconda3", "Library", "bin", "ffmpeg.exe"),
    path.join(home, "miniconda3", "Library", "bin", "ffmpeg.exe"),
    "C:\\ffmpeg\\bin\\ffmpeg.exe",
    "C:\\ProgramData\\chocolatey\\bin\\ffmpeg.exe",
  ];
  for (const p of candidates) {
    if (fs.existsSync(p)) {
      console.log(`   ffmpeg found: ${p}`);
      return p;
    }
  }
  throw new Error(
    "ffmpeg not found.\n" +
    "Quick fix: add to PATH → C:\\Users\\User\\anaconda3\\envs\\env_name\\Library\\bin\n" +
    "Or download from https://ffmpeg.org/download.html"
  );
}

// Sanitize text for FFmpeg drawtext — remove chars that break the filter syntax
function sanitizeDrawtext(str) {
  return str
    .replace(/['":\\]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 70);
}

// Pick best H.264 encoder available in this ffmpeg build
function detectVideoEncoder(ffmpegBin) {
  const encoders = ["libx264", "h264_mf", "h264_qsv", "h264_amf", "h264_nvenc", "libvpx-vp9"];
  const out = spawnSync(ffmpegBin, ["-encoders"], { encoding: "utf-8" }).stdout || "";
  for (const enc of encoders) {
    if (out.includes(enc)) {
      console.log(`   Video encoder: ${enc}`);
      return enc;
    }
  }
  throw new Error("No suitable video encoder found in ffmpeg build.");
}

// Build encoder args depending on codec
function encoderArgs(enc) {
  if (enc === "libx264") return ["-c:v", "libx264", "-preset", "fast", "-crf", "22"];
  if (enc === "libvpx-vp9") return ["-c:v", "libvpx-vp9", "-crf", "33", "-b:v", "0"];
  // Hardware encoders (nvenc, qsv, amf, mf) — use bitrate-based quality
  return ["-c:v", enc, "-b:v", "4M"];
}

function run(ffmpegBin, args, cwd) {
  const result = spawnSync(ffmpegBin, args, { stdio: "inherit", cwd });
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(`ffmpeg exited with code ${result.status}`);
}

async function main() {
  const slug = process.argv[2];
  if (!slug) {
    console.error("Usage: node audio-to-video.cjs <slug>");
    process.exit(1);
  }

  const ffmpegBin = findFfmpeg();
  const vEnc = detectVideoEncoder(ffmpegBin);
  const vArgs = encoderArgs(vEnc);

  const jsonPath = path.join(DRAFTS_DIR, `${slug}.json`);
  if (!fs.existsSync(jsonPath)) {
    console.error(`Draft not found: ${jsonPath}\nRun blog-to-script.cjs + script-to-audio.cjs first.`);
    process.exit(1);
  }

  const draft = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));
  const { title, ogImagePath, mp3Path, srtPath } = draft;

  if (!mp3Path || !fs.existsSync(mp3Path)) {
    console.error("MP3 not found. Run script-to-audio.cjs first.");
    process.exit(1);
  }
  if (!srtPath || !fs.existsSync(srtPath)) {
    console.error("SRT not found. Run script-to-audio.cjs first.");
    process.exit(1);
  }

  const outPath = path.join(DRAFTS_DIR, `${slug}.mp4`);
  const safeTitle = sanitizeDrawtext(title);
  // Use basename for SRT — run ffmpeg from DRAFTS_DIR to avoid Windows path issues
  const srtBasename = path.basename(srtPath);
  const mp3Abs = path.resolve(mp3Path);
  const outAbs = path.resolve(outPath);

  const hasOg = ogImagePath && fs.existsSync(ogImagePath);
  const ogAbs = hasOg ? path.resolve(ogImagePath) : null;

  console.log(`\n🎬 Rendering: ${title}`);
  console.log(`   OG image: ${hasOg ? ogAbs : "none (black bg)"}`);
  console.log(`   Audio: ${mp3Abs}`);
  console.log(`   SRT:   ${srtBasename}`);
  console.log(`   Output: ${outAbs}\n`);

  const subtitleFilter = `subtitles=${srtBasename}:force_style='Fontsize=16,PrimaryColour=&H00ffffff,OutlineColour=&H00000000,BackColour=&H80000000,Bold=1,Alignment=2,MarginV=60'`;

  if (hasOg) {
    // Layout: blurred OG fills 1920×1080 → centered OG image on top → title bar → subtitles
    const filterComplex = [
      // Blurred background from OG image
      `[0:v]scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,gblur=sigma=20[bg]`,
      // OG image scaled to fit within 1400×788
      `[0:v]scale=1400:788:force_original_aspect_ratio=decrease[fg]`,
      // Overlay fg centered on bg
      `[bg][fg]overlay=(W-w)/2:(H-h)/2[base]`,
      // Semi-transparent title bar at top
      `[base]drawbox=x=0:y=0:w=iw:h=90:color=black@0.65:t=fill[titled]`,
      // Title text
      `[titled]drawtext=text='${safeTitle}':fontsize=36:fontcolor=white:x=(w-tw)/2:y=27:shadowx=2:shadowy=2[canvas]`,
      // Subtitles
      `[canvas]${subtitleFilter}[out]`,
    ].join(";");

    run(ffmpegBin, [
        "-y",
        "-loop", "1", "-i", ogAbs,
        "-i", mp3Abs,
        "-filter_complex", filterComplex,
        "-map", "[out]",
        "-map", "1:a",
        ...vArgs, "-pix_fmt", "yuv420p",
        "-c:a", "aac", "-b:a", "128k",
        "-r", "30",
        "-shortest",
        outAbs,
      ],
      DRAFTS_DIR
    );
  } else {
    // Fallback: black background with title + subtitles
    const filterComplex = [
      `[0:v]drawbox=x=0:y=0:w=iw:h=90:color=black@0.8:t=fill[bg]`,
      `[bg]drawtext=text='${safeTitle}':fontsize=36:fontcolor=white:x=(w-tw)/2:y=27[titled]`,
      `[titled]${subtitleFilter}[out]`,
    ].join(";");

    run(ffmpegBin, [
        "-y",
        "-f", "lavfi", "-i", "color=black:s=1920x1080:r=30",
        "-i", mp3Abs,
        "-filter_complex", filterComplex,
        "-map", "[out]",
        "-map", "1:a",
        ...vArgs, "-pix_fmt", "yuv420p",
        "-c:a", "aac", "-b:a", "128k",
        "-shortest",
        outAbs,
      ],
      DRAFTS_DIR
    );
  }

  console.log(`\n✅ Video saved → ${outAbs}`);
  const stat = fs.statSync(outAbs);
  console.log(`   Size: ${(stat.size / 1024 / 1024).toFixed(1)} MB\n`);

  draft.mp4Path = outAbs;
  fs.writeFileSync(jsonPath, JSON.stringify(draft, null, 2), "utf-8");
}

main().catch((e) => {
  console.error(e.message);
  process.exit(1);
});

/* eslint-disable no-console */
/**
 * script-to-audio.cjs
 * Usage: node scripts/script-to-audio.cjs <slug>
 * Requires: AZURE_TTS_KEY, AZURE_TTS_REGION (default: eastasia) env vars
 * Input:  scripts/video-drafts/<slug>.json
 * Output: scripts/video-drafts/<slug>.mp3 + <slug>.srt
 */
const fs = require("fs");
const path = require("path");

const DRAFTS_DIR = path.join(__dirname, "video-drafts");
const VOICE = "zh-TW-HsiaoChenNeural";
const CHARS_PER_SEC = 4.2; // estimated speaking rate for zh-TW TTS
const AZURE_CHAR_LIMIT = 4000; // conservative limit for SSML text content

// Split script into sentences on Chinese/English sentence-ending punctuation
function splitSentences(text) {
  return text
    .split(/(?<=[。！？…\n])/)
    .map((s) => s.trim())
    .filter((s) => s.length > 2);
}

// Group sentences into chunks below the Azure char limit
function chunkSentences(sentences, limit) {
  const chunks = [];
  let current = "";
  for (const s of sentences) {
    if (current.length + s.length > limit) {
      if (current) chunks.push(current.trim());
      current = s;
    } else {
      current += s;
    }
  }
  if (current.trim()) chunks.push(current.trim());
  return chunks;
}

function escapeXml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function buildSsml(text) {
  return `<speak version="1.0" xml:lang="zh-TW">
  <voice name="${VOICE}">
    <prosody rate="-5%" pitch="0%">${escapeXml(text)}</prosody>
  </voice>
</speak>`;
}

async function ttsChunk(text, region, key) {
  const res = await fetch(
    `https://${region}.tts.speech.microsoft.com/cognitiveservices/v1`,
    {
      method: "POST",
      headers: {
        "Ocp-Apim-Subscription-Key": key,
        "Content-Type": "application/ssml+xml",
        "X-Microsoft-OutputFormat": "audio-24khz-96kbitrate-mono-mp3",
        "User-Agent": "yxz-blog-video/1.0",
      },
      body: buildSsml(text),
    }
  );
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Azure TTS ${res.status}: ${body}`);
  }
  return Buffer.from(await res.arrayBuffer());
}

function formatSrtTime(sec) {
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = Math.floor(sec % 60);
  const ms = Math.round((sec % 1) * 1000);
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")},${String(ms).padStart(3, "0")}`;
}

// Build SRT by estimating timing from character count
function buildSrt(sentences) {
  let t = 0.5; // small lead-in
  const lines = [];
  sentences.forEach((s, i) => {
    const duration = Math.max(s.length / CHARS_PER_SEC, 1.2);
    const end = t + duration;
    lines.push(`${i + 1}`);
    lines.push(`${formatSrtTime(t)} --> ${formatSrtTime(end)}`);
    // Wrap long sentences at ~18 chars
    if (s.length > 22) {
      const mid = Math.floor(s.length / 2);
      lines.push(s.slice(0, mid));
      lines.push(s.slice(mid));
    } else {
      lines.push(s);
    }
    lines.push("");
    t = end + 0.15;
  });
  return lines.join("\n");
}

async function main() {
  const slug = process.argv[2];
  if (!slug) {
    console.error("Usage: node script-to-audio.cjs <slug>");
    process.exit(1);
  }

  const jsonPath = path.join(DRAFTS_DIR, `${slug}.json`);
  if (!fs.existsSync(jsonPath)) {
    console.error(`Draft not found: ${jsonPath}\nRun blog-to-script.cjs first.`);
    process.exit(1);
  }

  const region = process.env.AZURE_TTS_REGION || "eastasia";
  const key = process.env.AZURE_TTS_KEY;
  if (!key) throw new Error("AZURE_TTS_KEY not set");

  const draft = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));
  const { title, script } = draft;

  console.log(`\n🔊 Generating TTS: ${title}`);
  console.log(`   Voice: ${VOICE} | Region: ${region}`);
  console.log(`   Script length: ${script.length} chars\n`);

  const sentences = splitSentences(script);
  const chunks = chunkSentences(sentences, AZURE_CHAR_LIMIT);

  console.log(`   Chunks: ${chunks.length}`);

  const buffers = [];
  for (let i = 0; i < chunks.length; i++) {
    process.stdout.write(`   Chunk ${i + 1}/${chunks.length}...`);
    buffers.push(await ttsChunk(chunks[i], region, key));
    console.log(" done");
  }

  const mp3Path = path.join(DRAFTS_DIR, `${slug}.mp3`);
  fs.writeFileSync(mp3Path, Buffer.concat(buffers));
  console.log(`\n✅ Audio → ${mp3Path}`);

  const srtContent = buildSrt(sentences);
  const srtPath = path.join(DRAFTS_DIR, `${slug}.srt`);
  fs.writeFileSync(srtPath, srtContent, "utf-8");
  console.log(`✅ SRT   → ${srtPath}`);

  const estimatedSec = sentences.reduce((acc, s) => acc + s.length / CHARS_PER_SEC, 0);
  console.log(`   Est. duration: ${Math.round(estimatedSec)}s (~${(estimatedSec / 60).toFixed(1)} min)\n`);

  draft.mp3Path = mp3Path;
  draft.srtPath = srtPath;
  fs.writeFileSync(jsonPath, JSON.stringify(draft, null, 2), "utf-8");
}

main().catch((e) => {
  console.error(e.message);
  process.exit(1);
});

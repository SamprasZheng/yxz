/* eslint-disable no-console */
/**
 * blog-to-handdrawn-scene.cjs
 * Usage: node scripts/handdrawn-poc/blog-to-handdrawn-scene.cjs <blog-file-or-slug>
 * Requires: ANTHROPIC_API_KEY env var
 * Output: scripts/handdrawn-poc/scene.json  (overwrites for preview/render)
 *         scripts/video-drafts/<slug>-handdrawn.json  (persistent copy)
 *
 * After running, render with:
 *   node scripts/handdrawn-poc/render-mp4.cjs --out scripts/video-drafts/<slug>-handdrawn.mp4
 */
const fs = require("fs");
const path = require("path");

const { spawn } = require("child_process");

const BLOG_DIR = path.join(__dirname, "..", "..", "blog");
const DRAFTS_DIR = path.join(__dirname, "..", "video-drafts");
const POC_DIR = __dirname;

function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return { meta: {}, body: content };
  const meta = {};
  for (const line of match[1].split("\n")) {
    const colonIdx = line.indexOf(":");
    if (colonIdx === -1) continue;
    const key = line.slice(0, colonIdx).trim();
    const val = line.slice(colonIdx + 1).trim().replace(/^["']|["']$/g, "");
    if (key) meta[key] = val;
  }
  return { meta, body: content.slice(match[0].length) };
}

function stripMdx(text) {
  return text
    .replace(/^import .+$/gm, "")
    .replace(/```[\s\S]*?```/g, "")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/^\|.+\|$/gm, "")
    .replace(/^\s*[-|:]+\s*$/gm, "")
    .replace(/<[^>]+>/g, "")
    .replace(/!\[.*?\]\([^)]*\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/^[-*+]\s+/gm, "")
    .replace(/^\d+\.\s+/gm, "")
    .replace(/^>\s*/gm, "")
    .replace(/<!-- truncate -->/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function resolveBlogFile(arg) {
  if (path.isAbsolute(arg) && fs.existsSync(arg)) return arg;
  const fromCwd = path.resolve(arg);
  if (fs.existsSync(fromCwd)) return fromCwd;
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md") || f.endsWith(".mdx"));
  const found = files.find((f) => f.includes(arg));
  return found ? path.join(BLOG_DIR, found) : null;
}

// ─── System prompt with schema + example ─────────────────────────────────────
const SYSTEM_PROMPT = `You are a whiteboard animation director. Given a blog post, you output a JSON scene plan for a hand-drawn educational video.

## Canvas & timing rules
- Canvas: 1920 × 1080 px. Ink: #1a1a1a. Accent: #e6007a.
- Safe area: x 80–1840, y 80–1000. Keep all elements inside.
- Total video: 45–90 seconds. Split into 3–6 scenes.
- Each scene: 8–20 seconds. Elements appear sequentially, not all at once.
- \`start\` = cumulative seconds from video start.
- \`appearAt\` = seconds after the scene's own start (NOT absolute).
- \`duration\` = animation draw time in seconds (text: 0.6–1.4, shapes: 0.8–1.6).
- Leave ≥ 0.3s gap between consecutive elements in same scene.
- Narration: 15–25 words, matches what speaker would say while elements appear.

## Element types
{ "type": "text",      "x":960, "y":400, "text":"Title",   "size":96,  "anchor":"middle", "appearAt":0.3, "duration":1.2 }
{ "type": "text",      "x":200, "y":300, "text":"Label",   "size":48,  "anchor":"start",  "color":"#e6007a", "appearAt":1.0, "duration":0.9 }
{ "type": "circle",   "cx":400, "cy":540, "r":160,                               "appearAt":1.5, "duration":1.3 }
{ "type": "rect",     "x":700,  "y":300, "w":500, "h":350,                       "appearAt":2.0, "duration":1.2 }
{ "type": "underline","x1":580, "y1":430,"x2":1340,"y2":430,                    "appearAt":1.8, "duration":0.8 }
{ "type": "arrow",    "x1":720, "y1":540,"x2":1200,"y2":540,                   "appearAt":3.0, "duration":1.0 }

## Within-scene layout
- One scene = one visual idea. Do NOT overlap elements from different scenes.
- Use all horizontal space. Don't stack everything in the center.
- For comparisons: left half vs right half. For lists: vertical columns or 3-box row.
- Circles work for concepts/nodes; rects for categories/steps; arrows for relationships.
- Title/heading text: size 72–96. Body text: size 36–52. Labels: size 28–40.

## Output format (strict JSON, no markdown)
{
  "title": "Video title",
  "slug": "blog-slug",
  "ttsVoice": "en-US-GuyNeural",
  "width": 1920,
  "height": 1080,
  "background": "#fbf8f1",
  "ink": "#1a1a1a",
  "accent": "#e6007a",
  "fps": 30,
  "scenes": [
    {
      "id": "scene-id",
      "start": 0,
      "duration": 10,
      "narration": "Short narration for TTS, 15-25 words.",
      "elements": [ ... ]
    }
  ]
}`;

function callClaude(userContent) {
  console.log("[claude] calling claude CLI (this may take 30-90s)...");
  const env = { ...process.env };
  delete env.CLAUDECODE;

  // Write full prompt (system + user) to temp file — avoids Windows CLI arg length limits
  const tmpPrompt = path.join(require("os").tmpdir(), "handdrawn-prompt.txt");
  const fullPrompt = SYSTEM_PROMPT + "\n\n---\n\n" + userContent;
  fs.writeFileSync(tmpPrompt, fullPrompt, "utf-8");

  return new Promise((resolve, reject) => {
    const proc = spawn(
      "claude",
      ["-p", `@${tmpPrompt}`, "--model", "sonnet", "--output-format", "text"],
      { env, stdio: ["ignore", "pipe", "pipe"] }
    );

    let out = "";
    let err = "";
    proc.stdout.on("data", (d) => { out += d.toString(); process.stdout.write("."); });
    proc.stderr.on("data", (d) => { err += d.toString(); });
    proc.on("close", (code) => {
      fs.rmSync(tmpPrompt, { force: true });
      console.log("");
      if (code !== 0) reject(new Error(`claude CLI exit ${code}:\n${err}`));
      else resolve(out);
    });
    proc.on("error", reject);

    // Safety timeout: 5 minutes
    setTimeout(() => { proc.kill(); reject(new Error("claude CLI timed out after 5m")); }, 300000);
  });
}

async function main() {
  const arg = process.argv[2];
  if (!arg) {
    console.error("Usage: node blog-to-handdrawn-scene.cjs <blog-file-or-slug>");
    process.exit(1);
  }

  const filePath = resolveBlogFile(arg);
  if (!filePath) {
    console.error(`Cannot find blog file: ${arg}`);
    process.exit(1);
  }

  const raw = fs.readFileSync(filePath, "utf-8");
  const { meta, body } = parseFrontmatter(raw);
  const slug = meta.slug || path.basename(filePath).replace(/\.(md|mdx)$/, "").replace(/^\d{4}-\d{2}-\d{2}-/, "");
  const title = meta.title || slug;
  const cleanBody = stripMdx(body);

  console.log(`[scene] generating for: ${title} (${slug})`);

  const userContent =
    `Blog title: ${title}\nSlug: ${slug}\nTags: ${meta.tags || ""}\n\n` +
    `Blog content (condensed):\n${cleanBody.slice(0, 6000)}\n\n` +
    `Output ONLY the JSON scene plan. No markdown fences, no explanation.`;

  const raw_json = await callClaude(userContent);

  // Extract JSON (model may wrap in backticks despite instructions)
  const jsonMatch = raw_json.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error("No JSON found in model output:\n" + raw_json.slice(0, 500));

  const sceneData = JSON.parse(jsonMatch[0]);

  // Inject runtime defaults
  sceneData.width = sceneData.width || 1920;
  sceneData.height = sceneData.height || 1080;
  sceneData.background = sceneData.background || "#fbf8f1";
  sceneData.ink = sceneData.ink || "#1a1a1a";
  sceneData.accent = sceneData.accent || "#e6007a";
  sceneData.fps = sceneData.fps || 30;
  sceneData.blogFilePath = filePath;
  // Build combined TTS script from all narrations (reused by tts.py)
  sceneData.script = sceneData.scenes.map((sc) => sc.narration).join(" ");

  // Write to poc dir (used by index.html preview + render-mp4.cjs by default)
  const pocPath = path.join(POC_DIR, "scene.json");
  fs.writeFileSync(pocPath, JSON.stringify(sceneData, null, 2));
  console.log(`[scene] written → ${pocPath}`);

  // Write persistent copy to video-drafts
  fs.mkdirSync(DRAFTS_DIR, { recursive: true });
  const draftPath = path.join(DRAFTS_DIR, `${slug}-handdrawn.json`);
  fs.writeFileSync(draftPath, JSON.stringify(sceneData, null, 2));
  console.log(`[scene] written → ${draftPath}`);

  // Print render command
  const outMp4 = path.join(DRAFTS_DIR, `${slug}-handdrawn.mp4`);
  const totalDuration = sceneData.scenes.reduce((s, sc) => s + sc.duration, 0);
  console.log(`\n[scene] ${sceneData.scenes.length} scenes, ${totalDuration}s total`);
  console.log(`[scene] render command:`);
  console.log(`  node scripts/handdrawn-poc/render-mp4.cjs --out "${outMp4}"`);
  console.log(`\n[scene] preview: open scripts/handdrawn-poc/index.html in browser`);
}

main().catch((e) => { console.error(e); process.exit(1); });

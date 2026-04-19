/* eslint-disable no-console */
/**
 * blog-to-script.cjs
 * Usage: node scripts/blog-to-script.cjs <blog-file-or-slug>
 * Requires: ANTHROPIC_API_KEY env var
 * Output: scripts/video-drafts/<slug>.json
 */
const fs = require("fs");
const path = require("path");

const BLOG_DIR = path.join(__dirname, "..", "blog");
const DRAFTS_DIR = path.join(__dirname, "video-drafts");
const STATIC_DIR = path.join(__dirname, "..", "static");

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

async function callClaude(system, user) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error("ANTHROPIC_API_KEY not set");

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model: "claude-opus-4-7",
      max_tokens: 4096,
      system,
      messages: [{ role: "user", content: user }],
    }),
  });
  if (!res.ok) throw new Error(`Claude API ${res.status}: ${await res.text()}`);
  const data = await res.json();
  return data.content[0].text;
}

function resolveBlogFile(arg) {
  // Absolute path
  if (path.isAbsolute(arg) && fs.existsSync(arg)) return arg;
  // Relative from cwd
  const fromCwd = path.resolve(arg);
  if (fs.existsSync(fromCwd)) return fromCwd;
  // Search in blog dir by partial name / slug
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md") || f.endsWith(".mdx"));
  const found = files.find((f) => f.includes(arg));
  if (found) return path.join(BLOG_DIR, found);
  return null;
}

async function main() {
  const arg = process.argv[2];
  if (!arg) {
    console.error("Usage: node blog-to-script.cjs <blog-file-or-slug>");
    process.exit(1);
  }

  const filePath = resolveBlogFile(arg);
  if (!filePath) {
    console.error(`Cannot find blog file matching: ${arg}`);
    process.exit(1);
  }

  const raw = fs.readFileSync(filePath, "utf-8");
  const { meta, body } = parseFrontmatter(raw);
  const cleanText = stripMdx(body);

  const title = meta.title || path.basename(filePath, path.extname(filePath));
  const slug = meta.slug || path.basename(filePath).replace(/^\d{4}-\d{2}-\d{2}-/, "").replace(/\.mdx?$/, "");
  const ogImageSrc = meta.image ? meta.image.replace(/^\//, "") : null;
  const ogImagePath = ogImageSrc ? path.join(STATIC_DIR, ogImageSrc) : null;

  console.log(`\n📝 Converting: ${title}`);
  console.log(`   Slug: ${slug}`);
  console.log(`   OG image: ${ogImagePath && fs.existsSync(ogImagePath) ? ogImagePath : "(not found)"}\n`);

  const systemPrompt = `You are a scriptwriter for a tech YouTube channel specialising in RF/hardware engineering and blockchain.
Task: rewrite a technical blog post into a natural spoken-word English narration script.

Rules:
- Use conversational, flowing English — sound like you're explaining to a smart colleague, not reading a paper
- 3-5 sentences per paragraph, blank line between paragraphs
- On first use, briefly define jargon in parentheses, e.g. "OTP (one-time programmable memory — write-once chip config)"
- Never read out Markdown heading levels; use natural transitions like "Let's start with the hardware layer"
- Skip bullet symbols, tables, and code blocks; weave the key points into spoken sentences
- Treat emojis like 🎯 as emphasis cues — say "The key takeaway here is..." instead
- Opening: 1-2 hook sentences that surface the core problem or value of this post
- Closing: a 20-30 word call-to-action — invite viewers to subscribe or leave a comment

Output: plain text only, paragraphs separated by blank lines, no numbering or Markdown markup`;

  const script = await callClaude(
    systemPrompt,
    `文章標題：${title}\n\n文章內容：\n${cleanText}`
  );

  if (!fs.existsSync(DRAFTS_DIR)) fs.mkdirSync(DRAFTS_DIR, { recursive: true });

  const draft = {
    title,
    slug,
    blogFilePath: filePath,
    ogImagePath: ogImagePath && fs.existsSync(ogImagePath) ? ogImagePath : null,
    script,
  };

  const outPath = path.join(DRAFTS_DIR, `${slug}.json`);
  fs.writeFileSync(outPath, JSON.stringify(draft, null, 2), "utf-8");

  console.log(`✅ Script saved → ${outPath}`);
  console.log(`\n--- 預覽前 300 字 ---`);
  console.log(script.slice(0, 300) + "...\n");
}

main().catch((e) => {
  console.error(e.message);
  process.exit(1);
});

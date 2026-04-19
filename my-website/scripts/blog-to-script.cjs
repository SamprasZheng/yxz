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

  const systemPrompt = `你是一位科技 YouTuber 的腳本撰稿人，專長是 RF 硬體工程與區塊鏈。
任務：把技術部落格文章改寫成適合口說旁白的繁體中文腳本。

撰寫規則：
- 使用口語化、流暢的繁體中文，語氣自然像在跟朋友解釋
- 每段 3-5 個句子，不超過 70 字，段落之間空一行
- 術語第一次出現時用括號加白話解釋，例如「OTP（一次性寫入的晶片設定記憶體）」
- 不要直接念出 Markdown 標題層級，改用引導語，例如「先來看硬體層面」
- 不念清單符號、表格、程式碼；把重點資訊融入口說句子
- 🎯 等 emoji 改用「重點來了」「關鍵是」等說法帶過
- 開頭：1-2 句吸引人的 hook，點出這篇文章的核心價值或痛點
- 結尾：20-30 字的 call-to-action，邀請訂閱或留言

輸出：純文字，段落之間空行分隔，不加段落編號或任何 Markdown 標記`;

  const script = await callClaude(
    systemPrompt,
    `文章標題：${title}\n\n文章內容：\n${cleanText}`
  );

  if (!fs.existsSync(DRAFTS_DIR)) fs.mkdirSync(DRAFTS_DIR, { recursive: true });

  const draft = {
    title,
    slug,
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

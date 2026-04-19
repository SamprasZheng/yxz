/* eslint-disable no-console */
/**
 * cross-post.cjs
 * Prepares a blog post for Medium import + generates an X tweet thread.
 *
 * Usage:
 *   node scripts/cross-post.cjs <blog-file-or-slug>
 *
 * What it does:
 *   1. Reads the blog MDX file, strips MDX components
 *   2. Saves a Medium-ready .md file to scripts/cross-post-drafts/
 *   3. Prints the Medium Import URL (medium.com/me/stories/import)
 *   4. Uses Claude to generate a tweet thread (ZH + EN)
 *   5. Saves tweet thread to scripts/cross-post-drafts/<slug>-tweet.json
 *   6. If X credentials are set, posts the thread via X API v2
 *
 * Env vars required:
 *   ANTHROPIC_API_KEY          — for tweet generation
 *   SITE_URL                   — your deployed site URL (default: https://SamprasZheng.github.io/yxz)
 *
 * Env vars optional (X posting):
 *   X_APP_KEY
 *   X_APP_SECRET
 *   X_ACCESS_TOKEN
 *   X_ACCESS_SECRET
 */

const fs = require("fs");
const path = require("path");

const BLOG_DIR = path.join(__dirname, "..", "blog");
const DRAFTS_DIR = path.join(__dirname, "cross-post-drafts");
const SITE_URL = process.env.SITE_URL || "https://SamprasZheng.github.io/yxz";
const MEDIUM_IMPORT_URL = "https://medium.com/me/stories/import";

// ─── helpers ────────────────────────────────────────────────────────────────

function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return { meta: {}, body: content };
  const meta = {};
  for (const line of match[1].split("\n")) {
    const colonIdx = line.indexOf(":");
    if (colonIdx === -1) continue;
    const key = line.slice(0, colonIdx).trim();
    let val = line.slice(colonIdx + 1).trim().replace(/^["']|["']$/g, "");
    if (key) meta[key] = val;
  }
  // parse tags array (simple YAML list)
  const tagsMatch = match[1].match(/^tags:\s*\[([^\]]*)\]/m);
  if (tagsMatch) {
    meta.tags = tagsMatch[1].split(",").map((t) => t.trim().replace(/^["']|["']$/g, ""));
  }
  return { meta, body: content.slice(match[0].length) };
}

function resolveImageUrls(text, postSlug) {
  // Turn relative ./img/foo.png → absolute SITE_URL/blog/<slug>/img/foo.png
  return text.replace(/!\[([^\]]*)\]\(\.\/([^)]+)\)/g, (_, alt, src) => {
    return `![${alt}](${SITE_URL}/blog/${postSlug}/${src})`;
  });
}

function stripMdxComponents(text) {
  // Remove import statements
  text = text.replace(/^import .+$/gm, "");
  // Remove JSX-style components <Component ... /> and <Component>...</Component>
  text = text.replace(/<[A-Z][A-Za-z]*[^>]*\/>/g, "");
  text = text.replace(/<[A-Z][A-Za-z]*[^>]*>[\s\S]*?<\/[A-Z][A-Za-z]*>/g, "");
  // Remove truncate comment
  text = text.replace(/\{\/\* truncate \*\/\}/g, "");
  text = text.replace(/<!-- truncate -->/g, "");
  // Clean up excessive blank lines
  text = text.replace(/\n{3,}/g, "\n\n").trim();
  return text;
}

function buildMediumMarkdown(meta, body, slug) {
  const title = meta.title || slug;
  const canonicalUrl = `${SITE_URL}/blog/${meta.slug || slug}`;
  const resolvedBody = resolveImageUrls(body, slug);
  const cleanBody = stripMdxComponents(resolvedBody);

  const footer = `\n\n---\n*Originally published at [${SITE_URL}](${canonicalUrl})*`;

  return `# ${title}\n\n${cleanBody}${footer}`;
}

// ─── Claude API ──────────────────────────────────────────────────────────────

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
      model: "claude-sonnet-4-5",
      max_tokens: 1024,
      system,
      messages: [{ role: "user", content: user }],
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Claude API error ${res.status}: ${err}`);
  }
  const data = await res.json();
  return data.content[0].text;
}

async function generateTweetThread(meta, body, canonicalUrl) {
  const cleanBody = stripMdxComponents(body).slice(0, 3000);
  const tags = (meta.tags || []).map((t) => `#${t}`).join(" ");

  const system = `You are a technical content creator writing tweet threads for a personal tech blog.
The author is Sampras Zheng — an RF/hardware engineer with deep interests in Polkadot/Web3 and AI.
Write compelling, authentic tweets. No fluff, no clickbait.`;

  const user = `Generate a tweet thread for this blog post. Return JSON with this exact shape:
{
  "zh": ["tweet1", "tweet2", "tweet3"],
  "en": ["tweet1", "tweet2", "tweet3"]
}

Rules:
- 2–4 tweets per thread (zh and en independently)
- Each tweet ≤ 280 chars including the link in the last tweet
- Thread should: hook (tweet 1) → key insight (tweet 2) → CTA with link (last tweet)
- zh: Traditional Chinese, natural tone, add relevant hashtags
- en: English, technical but accessible
- Last tweet of each thread must end with: ${canonicalUrl}
- Tags available: ${tags}

Blog post:
Title: ${meta.title || ""}
Tags: ${(meta.tags || []).join(", ")}

${cleanBody}`;

  const raw = await callClaude(system, user);

  // Extract JSON from response (Claude may wrap in markdown)
  const jsonMatch = raw.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error("Claude returned unexpected format: " + raw);
  return JSON.parse(jsonMatch[0]);
}

// ─── X posting ───────────────────────────────────────────────────────────────

async function postThreadToX(tweets) {
  const { TwitterApi } = require("twitter-api-v2");

  const appKey = process.env.X_APP_KEY;
  const appSecret = process.env.X_APP_SECRET;
  const accessToken = process.env.X_ACCESS_TOKEN;
  const accessSecret = process.env.X_ACCESS_SECRET;

  if (!appKey || !appSecret || !accessToken || !accessSecret) {
    console.log("\n⚠️  X credentials not set — skipping auto-post.");
    console.log("   Set X_APP_KEY, X_APP_SECRET, X_ACCESS_TOKEN, X_ACCESS_SECRET to enable.");
    return null;
  }

  const client = new TwitterApi({ appKey, appSecret, accessToken, accessSecret });
  const rw = client.readWrite;

  let replyToId = null;
  const postedIds = [];

  for (const tweet of tweets) {
    const payload = { text: tweet };
    if (replyToId) payload.reply = { in_reply_to_tweet_id: replyToId };

    const result = await rw.v2.tweet(payload);
    replyToId = result.data.id;
    postedIds.push(replyToId);
    console.log(`  ✅ Posted: ${tweet.slice(0, 60)}...`);
  }

  return postedIds;
}

// ─── main ────────────────────────────────────────────────────────────────────

async function main() {
  const arg = process.argv[2];
  if (!arg) {
    console.error("Usage: node scripts/cross-post.cjs <blog-file-or-slug>");
    process.exit(1);
  }

  // Resolve file path
  let filePath = arg;
  if (!fs.existsSync(filePath)) {
    // Try as slug: find matching file in blog/
    const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md") || f.endsWith(".mdx"));
    const match = files.find((f) => f.includes(arg));
    if (!match) {
      console.error(`Could not find blog post matching: ${arg}`);
      process.exit(1);
    }
    filePath = path.join(BLOG_DIR, match);
  }

  const slug = path.basename(filePath).replace(/\.(md|mdx)$/, "");
  const content = fs.readFileSync(filePath, "utf8");
  const { meta, body } = parseFrontmatter(content);
  const canonicalUrl = `${SITE_URL}/blog/${meta.slug || slug}`;

  fs.mkdirSync(DRAFTS_DIR, { recursive: true });

  // ── 1. Medium markdown ──────────────────────────────────────────────────
  console.log("\n📝 Generating Medium-ready markdown...");
  const mediumMd = buildMediumMarkdown(meta, body, slug);
  const mediumFile = path.join(DRAFTS_DIR, `${slug}-medium.md`);
  fs.writeFileSync(mediumFile, mediumMd, "utf8");
  console.log(`   Saved: ${mediumFile}`);
  console.log("\n🔗 Medium import steps:");
  console.log(`   1. Open: ${MEDIUM_IMPORT_URL}`);
  console.log(`   2. Paste URL: ${canonicalUrl}`);
  console.log(`      (Medium will auto-import + set canonical URL)`);
  console.log(`   — OR manually upload: ${mediumFile}`);

  // ── 2. Tweet thread ─────────────────────────────────────────────────────
  console.log("\n🐦 Generating tweet thread via Claude...");
  let thread;
  try {
    thread = await generateTweetThread(meta, body, canonicalUrl);
  } catch (e) {
    console.error("   Tweet generation failed:", e.message);
    process.exit(1);
  }

  const tweetFile = path.join(DRAFTS_DIR, `${slug}-tweet.json`);
  fs.writeFileSync(tweetFile, JSON.stringify(thread, null, 2), "utf8");
  console.log(`   Saved: ${tweetFile}`);

  console.log("\n── ZH Thread ──────────────────────────────────────────");
  thread.zh.forEach((t, i) => console.log(`[${i + 1}] ${t}`));
  console.log("\n── EN Thread ──────────────────────────────────────────");
  thread.en.forEach((t, i) => console.log(`[${i + 1}] ${t}`));

  // ── 3. Optionally post to X ─────────────────────────────────────────────
  const lang = process.env.CROSS_POST_LANG || "zh"; // default: post ZH thread
  const tweetsToPost = thread[lang];

  console.log(`\n🚀 Posting ${lang.toUpperCase()} thread to X...`);
  const postedIds = await postThreadToX(tweetsToPost);
  if (postedIds) {
    const firstId = postedIds[0];
    console.log(`\n✅ Thread live: https://x.com/i/web/status/${firstId}`);
  }

  console.log("\nDone.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

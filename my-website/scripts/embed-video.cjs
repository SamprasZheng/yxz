/* eslint-disable no-console */
/**
 * embed-video.cjs — insert YouTube TLDR embed into a Docusaurus blog MDX post
 * Usage: node scripts/embed-video.cjs <slug>
 * Input:  scripts/video-drafts/<slug>.json  (must have blogFilePath + youtubeId)
 * Effect: modifies the blog MDX file in-place, inserting an :::info embed block
 *         right after the frontmatter (idempotent — safe to re-run)
 */
const fs = require("fs");
const path = require("path");

const DRAFTS_DIR = path.join(__dirname, "video-drafts");

function buildEmbed(videoId) {
  return (
    `\n:::info 📺 影片版 TLDR\n` +
    `<iframe\n` +
    `  width="100%"\n` +
    `  style={{aspectRatio: '16/9'}}\n` +
    `  src="https://www.youtube.com/embed/${videoId}"\n` +
    `  title="YouTube video player"\n` +
    `  frameBorder="0"\n` +
    `  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"\n` +
    `  allowFullScreen\n` +
    `/>\n` +
    `:::\n`
  );
}

function insertEmbed(content, videoId) {
  // Idempotent: skip if already embedded
  if (content.includes(`youtube.com/embed/${videoId}`)) {
    return { content, changed: false };
  }

  const embed = buildEmbed(videoId);

  // Insert right before <!-- truncate --> if it exists
  if (content.includes("<!-- truncate -->")) {
    return {
      content: content.replace("<!-- truncate -->", `${embed}\n<!-- truncate -->`),
      changed: true,
    };
  }

  // Fallback: insert after frontmatter closing ---
  const frontmatterEnd = content.indexOf("\n---\n", 4);
  if (frontmatterEnd !== -1) {
    const insertAt = frontmatterEnd + 5; // after "\n---\n"
    return {
      content: content.slice(0, insertAt) + embed + "\n" + content.slice(insertAt),
      changed: true,
    };
  }

  console.warn("   Could not find insertion point — blog file unchanged.");
  return { content, changed: false };
}

async function main() {
  const slug = process.argv[2];
  if (!slug) {
    console.error("Usage: node embed-video.cjs <slug>");
    process.exit(1);
  }

  const jsonPath = path.join(DRAFTS_DIR, `${slug}.json`);
  if (!fs.existsSync(jsonPath)) {
    console.error(`Draft not found: ${jsonPath}`);
    process.exit(1);
  }

  const draft = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));
  const { blogFilePath, youtubeId, title } = draft;

  if (!youtubeId) {
    console.error("youtubeId not found in draft. Run youtube-upload.cjs first.");
    process.exit(1);
  }
  if (!blogFilePath || !fs.existsSync(blogFilePath)) {
    console.error(`Blog file not found: ${blogFilePath}`);
    process.exit(1);
  }

  console.log(`\n📝 Embedding video in: ${path.basename(blogFilePath)}`);
  console.log(`   Title  : ${title}`);
  console.log(`   VideoID: ${youtubeId}`);

  const original = fs.readFileSync(blogFilePath, "utf-8");
  const { content, changed } = insertEmbed(original, youtubeId);

  if (!changed) {
    console.log("   ✅ Already embedded — no changes needed.");
    return;
  }

  fs.writeFileSync(blogFilePath, content, "utf-8");
  console.log(`   ✅ TLDR embed inserted → ${blogFilePath}`);
  console.log(`   URL: https://www.youtube.com/watch?v=${youtubeId}\n`);
}

main().catch((e) => {
  console.error(e.message);
  process.exit(1);
});

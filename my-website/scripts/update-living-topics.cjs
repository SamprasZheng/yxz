/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");

const BLOG_DIR = path.join(__dirname, "..", "blog");
const RUN_DATE = new Date().toISOString().slice(0, 10);
const RUN_TIME = new Date().toISOString();
const MAX_HISTORY_ENTRIES = 12;

const TOPICS = [
  {
    key: "live-polkadot",
    title: "Living Tracker: Polkadot / Web3 Infrastructure",
    slug: "living-polkadot-tracker",
    tags: ["polkadot", "ai"],
    summary:
      "Continuous tracking of Polkadot ecosystem, protocol updates, and engineering signals.",
    webQuery:
      "Polkadot ecosystem JAM coretime parachain builders news",
    socialQuery:
      "(Polkadot OR JAM OR parachain OR coretime) (site:x.com OR site:threads.net OR site:facebook.com OR site:instagram.com)",
    seedLinks: [
      { title: "Polkadot Docs: Obtain Coretime", link: "https://docs.polkadot.com/parachains/launch-a-parachain/obtain-coretime/" },
      { title: "Polkadot Wiki: Elastic Scaling", link: "https://wiki.polkadot.com/docs/learn-elastic-scaling" },
    ],
  },
  {
    key: "live-space",
    title: "Living Tracker: Space Compute and Space Data Centers",
    slug: "living-space-compute-tracker",
    tags: ["space", "ai"],
    summary:
      "Continuous tracking of in-orbit compute, space data center initiatives, and mission infrastructure.",
    webQuery:
      "space data center in orbit edge computing satellite AI infrastructure",
    socialQuery:
      "(space data center OR satellite compute OR orbital data center) (site:x.com OR site:threads.net OR site:facebook.com OR site:instagram.com)",
    seedLinks: [
      { title: "ASCEND Project", link: "https://ascend-horizon.eu/" },
      { title: "CORDIS ASCEND Fact Sheet", link: "https://cordis.europa.eu/project/id/101082517" },
    ],
  },
  {
    key: "live-rf",
    title: "Living Tracker: RF Phased Array and SATCOM",
    slug: "living-rf-phased-array-satcom-tracker",
    tags: ["rf", "phasedarray", "space"],
    summary:
      "Continuous tracking of phased array systems, SATCOM links, and related validation technology.",
    webQuery:
      "phased array satellite communication RF beamforming validation",
    socialQuery:
      "(phased array OR SATCOM OR beamforming OR satellite communication) (site:x.com OR site:threads.net OR site:facebook.com OR site:instagram.com)",
    seedLinks: [
      { title: "NASA NTRS: Adaptive and Phased Array Antennas", link: "https://ntrs.nasa.gov/citations/20040105615" },
      { title: "NASA HPSC", link: "https://www.nasa.gov/game-changing-development-projects/high-performance-spaceflight-computing-hpsc/" },
    ],
  },
  {
    key: "live-ai",
    title: "Living Tracker: Applied AI, MCP, and AI Engineering",
    slug: "living-ai-mcp-tracker",
    tags: ["ai", "misc"],
    summary:
      "Continuous tracking of applied AI systems, MCP workflow adoption, and deployment engineering.",
    webQuery:
      "applied AI deployment MCP model context protocol engineering",
    socialQuery:
      "(MCP OR model context protocol OR applied AI engineering) (site:x.com OR site:threads.net OR site:facebook.com OR site:instagram.com)",
    seedLinks: [
      { title: "Model Context Protocol", link: "https://modelcontextprotocol.io/" },
      { title: "NVIDIA Blackwell Architecture", link: "https://www.nvidia.com/en-us/data-center/technologies/blackwell-architecture/" },
    ],
  },
  {
    key: "live-investing",
    title: "Living Tracker: Macro, Crypto, and US Equities",
    slug: "living-macro-crypto-us-equities",
    tags: ["macro", "crypto", "misc"],
    summary:
      "Continuous tracking of macro signals, cryptocurrency sentiment, and US stock market setup.",
    webQuery:
      "macro economy inflation rates bitcoin ethereum SP500 Nasdaq market outlook",
    socialQuery:
      "(inflation OR fed OR bitcoin OR ethereum OR SP500 OR Nasdaq) (site:x.com OR site:threads.net OR site:facebook.com OR site:instagram.com)",
    seedLinks: [
      { title: "Blockstream Satellite", link: "https://blockstream.com/satellite/" },
      { title: "Polkadot Docs: Coretime", link: "https://docs.polkadot.com/parachains/launch-a-parachain/obtain-coretime/" },
    ],
  },
];

function scoreTextSentiment(text) {
  const bullishWords = [
    "bull",
    "bullish",
    "breakout",
    "rally",
    "strong",
    "upgrade",
    "growth",
    "outperform",
    "surge",
    "record",
    "launch",
    "win",
  ];
  const bearishWords = [
    "bear",
    "bearish",
    "drop",
    "selloff",
    "recession",
    "downgrade",
    "cut",
    "weak",
    "crash",
    "delay",
    "risk",
    "warning",
  ];

  const lower = String(text || "").toLowerCase();
  let score = 0;
  for (const word of bullishWords) {
    if (lower.includes(word)) score += 1;
  }
  for (const word of bearishWords) {
    if (lower.includes(word)) score -= 1;
  }
  return score;
}

function stanceFromScore(score) {
  if (score >= 4) return "bullish";
  if (score <= -4) return "bearish";
  return "neutral";
}

function decodeHtml(html) {
  return String(html || "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function stripTags(html) {
  return decodeHtml(String(html || "").replace(/<[^>]*>/g, "")).trim();
}

async function fetchTextWithRetry(url, options = {}, maxRetries = 2) {
  let lastError = null;
  for (let attempt = 0; attempt <= maxRetries; attempt += 1) {
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status} ${response.statusText}`);
      }
      return await response.text();
    } catch (error) {
      lastError = error;
      if (attempt < maxRetries) {
        await new Promise((resolve) => setTimeout(resolve, 700 * (attempt + 1)));
      }
    }
  }
  throw lastError;
}

function parseGoogleNewsRss(xml, limit = 10) {
  const items = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let match = itemRegex.exec(xml);
  while (match && items.length < limit) {
    const block = match[1];
    const title = (block.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/)?.[1]
      || block.match(/<title>(.*?)<\/title>/)?.[1]
      || "").trim();
    const link = (block.match(/<link>(.*?)<\/link>/)?.[1] || "").trim();
    const pubDate = (block.match(/<pubDate>(.*?)<\/pubDate>/)?.[1] || "").trim();
    const source = (block.match(/<source[^>]*>(.*?)<\/source>/)?.[1] || "").trim();

    if (title && link) {
      items.push({
        title: stripTags(title),
        link: decodeHtml(link),
        pubDate,
        source: stripTags(source || "Google News"),
      });
    }
    match = itemRegex.exec(xml);
  }
  return items;
}

async function fetchGoogleNews(query, limit = 10) {
  const url = `https://news.google.com/rss/search?q=${encodeURIComponent(
    query
  )}&hl=en-US&gl=US&ceid=US:en`;
  const xml = await fetchTextWithRetry(url, {}, 2);
  return parseGoogleNewsRss(xml, limit);
}

function parseDuckDuckGo(html, limit = 8) {
  const items = [];
  const regex = /<a[^>]*class="[^"]*result__a[^"]*"[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g;
  let match = regex.exec(html);
  while (match && items.length < limit) {
    const href = decodeHtml(match[1]);
    const rawTitle = stripTags(match[2]);
    let link = href;
    const uddgMatch = href.match(/[?&]uddg=([^&]+)/);
    if (uddgMatch) {
      link = decodeURIComponent(uddgMatch[1]);
    }
    if (rawTitle && link) {
      items.push({
        title: rawTitle,
        link,
        source: "Search",
      });
    }
    match = regex.exec(html);
  }
  return items;
}

async function fetchDuckDuckGoSearch(query, limit = 8) {
  const url = `https://duckduckgo.com/html/?q=${encodeURIComponent(query)}`;
  const html = await fetchTextWithRetry(url, {}, 1);
  return parseDuckDuckGo(html, limit);
}

function uniqueByLink(items) {
  const seen = new Set();
  const out = [];
  for (const item of items) {
    if (!item?.link) continue;
    if (seen.has(item.link)) continue;
    seen.add(item.link);
    out.push(item);
  }
  return out;
}

function computeSentiment(items) {
  return items.reduce((acc, item) => acc + scoreTextSentiment(item.title), 0);
}

function parseHistorySections(content) {
  const timelineStart = content.indexOf("## Timeline");
  if (timelineStart === -1) return [];
  const timeline = content.slice(timelineStart);
  const parts = timeline.split(/\n### /g).slice(1);
  return parts
    .map((part) => `### ${part.trim()}`)
    .filter(Boolean);
}

function renderHistory(historyEntries) {
  if (historyEntries.length === 0) return "";
  return `\n## Timeline\n\n${historyEntries.join("\n\n")}\n`;
}

function toBulletLinks(items, count = 5) {
  if (!items.length) return "- No usable links from this source in this run.";
  return items
    .slice(0, count)
    .map((item) => `- [${item.title}](${item.link})`)
    .join("\n");
}

function buildPostMarkdown(topic, payload, existingContent = "") {
  const {webSignals, socialSignals, notes} = payload;
  const webForDisplay = webSignals.length ? webSignals : topic.seedLinks;
  const socialForDisplay = socialSignals.length
    ? socialSignals
    : [
        {
          title: `Search this query on DuckDuckGo (${topic.socialQuery})`,
          link: `https://duckduckgo.com/?q=${encodeURIComponent(topic.socialQuery)}`,
        },
      ];
  const mergedForScore = [...webForDisplay.slice(0, 12), ...socialForDisplay.slice(0, 12)];
  const sentimentScore = computeSentiment(mergedForScore);
  const stance = stanceFromScore(sentimentScore);

  const latestUpdateSection = `### ${RUN_DATE}

- Market/Sentiment stance: **${stance}** (score ${sentimentScore})
- Web signals collected: ${webSignals.length}
- Social-search signals collected: ${socialSignals.length}
- Updated at: ${RUN_TIME}

Key web signals:
${toBulletLinks(webForDisplay, 6)}

Key social-search signals (X / Threads / Instagram / Facebook via search):
${toBulletLinks(socialForDisplay, 6)}

Data quality notes:
${notes.length ? notes.map((n) => `- ${n}`).join("\n") : "- No major data-quality issue in this run."}`;

  const oldHistory = parseHistorySections(existingContent);
  const nextHistory = [latestUpdateSection, ...oldHistory].slice(0, MAX_HISTORY_ENTRIES);

  const safeTitle = topic.title.replace(/"/g, '\\"');
  return `---
slug: ${topic.slug}
title: "${safeTitle}"
authors: ["sampras"]
tags: [${topic.tags.join(", ")}]
---

${topic.summary}

This is a living post. It is designed to be continuously updated by automation.

<!-- truncate -->
${renderHistory(nextHistory)}
`;
}

async function generateTopic(topic) {
  const notes = [];
  let webSignals = [];
  let socialSignals = [];

  try {
    webSignals = await fetchGoogleNews(topic.webQuery, 10);
  } catch (error) {
    notes.push(`Web signals fetch failed: ${error.message}`);
  }

  try {
    socialSignals = await fetchDuckDuckGoSearch(topic.socialQuery, 10);
  } catch (error) {
    notes.push(`Social-search fetch failed: ${error.message}`);
  }

  if (!webSignals.length) {
    notes.push("No web news signals, fallback to empty set.");
  }
  if (!socialSignals.length) {
    notes.push("No social-search signals, fallback to empty set.");
  }

  webSignals = uniqueByLink(webSignals);
  socialSignals = uniqueByLink(socialSignals);

  const filePath = path.join(BLOG_DIR, `${topic.key}.md`);
  const existingContent = fs.existsSync(filePath)
    ? fs.readFileSync(filePath, "utf8")
    : "";

  const md = buildPostMarkdown(topic, {webSignals, socialSignals, notes}, existingContent);
  fs.writeFileSync(filePath, md, "utf8");
  console.log(`Updated living topic: ${filePath}`);
}

async function main() {
  for (const topic of TOPICS) {
    await generateTopic(topic);
  }
}

main().catch((error) => {
  console.error("Failed to generate living topic posts:", error);
  process.exit(1);
});

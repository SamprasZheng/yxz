/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");

const BLOG_DIR = path.join(__dirname, "..", "blog");
const ONE_DAY_MS = 24 * 60 * 60 * 1000;

function formatDate(date) {
  return date.toISOString().slice(0, 10);
}

function startOfNextWeekLocal() {
  const now = new Date();
  const day = now.getDay(); // 0=Sun..6=Sat
  const daysUntilNextMonday = day === 0 ? 1 : 8 - day;
  return new Date(now.getTime() + daysUntilNextMonday * ONE_DAY_MS);
}

function scoreTextSentiment(text) {
  const bullishWords = [
    "bull",
    "bullish",
    "breakout",
    "rally",
    "strong",
    "buy",
    "upside",
    "beat",
    "growth",
    "surge",
  ];
  const bearishWords = [
    "bear",
    "bearish",
    "sell",
    "drop",
    "recession",
    "risk",
    "weak",
    "cut",
    "downside",
    "crash",
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

async function fetchJsonWithRetry(url, options = {}, maxRetries = 2) {
  let lastError = null;
  for (let attempt = 0; attempt <= maxRetries; attempt += 1) {
    try {
      const res = await fetch(url, options);
      if (!res.ok) {
        throw new Error(`HTTP ${res.status} ${res.statusText}`);
      }
      return await res.json();
    } catch (error) {
      lastError = error;
      if (attempt < maxRetries) {
        await new Promise((resolve) => setTimeout(resolve, 800 * (attempt + 1)));
      }
    }
  }
  throw lastError;
}

async function fetchTextWithRetry(url, options = {}, maxRetries = 2) {
  let lastError = null;
  for (let attempt = 0; attempt <= maxRetries; attempt += 1) {
    try {
      const res = await fetch(url, options);
      if (!res.ok) {
        throw new Error(`HTTP ${res.status} ${res.statusText}`);
      }
      return await res.text();
    } catch (error) {
      lastError = error;
      if (attempt < maxRetries) {
        await new Promise((resolve) => setTimeout(resolve, 800 * (attempt + 1)));
      }
    }
  }
  throw lastError;
}

function decodeHtml(input) {
  return String(input || "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function stripTags(html) {
  return decodeHtml(String(html || "").replace(/<[^>]*>/g, "")).trim();
}

function parseDuckDuckGo(html, limit = 20) {
  const entries = [];
  const regex = /<a[^>]*class="[^"]*result__a[^"]*"[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g;
  let match = regex.exec(html);
  while (match && entries.length < limit) {
    const href = decodeHtml(match[1]);
    const rawTitle = stripTags(match[2]);
    let link = href;
    const uddgMatch = href.match(/[?&]uddg=([^&]+)/);
    if (uddgMatch) {
      link = decodeURIComponent(uddgMatch[1]);
    }
    if (rawTitle && link) {
      entries.push({title: rawTitle, link});
    }
    match = regex.exec(html);
  }
  return entries;
}

async function getSearchSentiment(label, query) {
  const url = `https://duckduckgo.com/html/?q=${encodeURIComponent(query)}`;
  try {
    const html = await fetchTextWithRetry(url, {}, 1);
    const entries = parseDuckDuckGo(html, 20);
    const score = entries.reduce((acc, item) => acc + scoreTextSentiment(item.title), 0);
    return {
      source: label,
      usedLiveData: true,
      notes: [],
      sampleCount: entries.length,
      score,
    };
  } catch (error) {
    return {
      source: label,
      usedLiveData: false,
      notes: [`${label} search fallback failed: ${error.message}`],
      sampleCount: 0,
      score: 0,
    };
  }
}

async function getMarketSnapshot() {
  const symbols = ["^GSPC", "^IXIC", "^DJI", "BTC-USD", "ETH-USD"];
  const url = `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${encodeURIComponent(
    symbols.join(",")
  )}`;

  const fallback = {
    source: "fallback",
    notes: ["Market API unavailable. Using neutral placeholders."],
    quotes: [
      { symbol: "^GSPC", name: "S&P 500", price: null, changePct: null },
      { symbol: "^IXIC", name: "NASDAQ", price: null, changePct: null },
      { symbol: "^DJI", name: "Dow Jones", price: null, changePct: null },
      { symbol: "BTC-USD", name: "Bitcoin", price: null, changePct: null },
      { symbol: "ETH-USD", name: "Ethereum", price: null, changePct: null },
    ],
  };

  try {
    const data = await fetchJsonWithRetry(url, {}, 2);
    const results = data?.quoteResponse?.result;
    if (!Array.isArray(results) || results.length === 0) {
      return fallback;
    }

    const mapped = results.map((q) => ({
      symbol: q.symbol || "unknown",
      name: q.shortName || q.longName || q.symbol || "unknown",
      price: Number.isFinite(q.regularMarketPrice) ? q.regularMarketPrice : null,
      changePct: Number.isFinite(q.regularMarketChangePercent)
        ? q.regularMarketChangePercent
        : null,
    }));

    return {
      source: "Yahoo Finance quote API",
      notes: [],
      quotes: mapped,
    };
  } catch (error) {
    return {
      ...fallback,
      notes: [
        `Market API failed: ${error.message}. Using neutral placeholders.`,
      ],
    };
  }
}

async function getXSentiment() {
  const token = process.env.X_BEARER_TOKEN;
  const query =
    process.env.X_QUERY ||
    "(macro OR economy OR inflation OR rates OR Bitcoin OR Ethereum OR SP500 OR Nasdaq) lang:en -is:retweet";

  if (!token) {
    const fallback = await getSearchSentiment(
      "X search",
      "site:x.com (macro OR inflation OR bitcoin OR ethereum OR SP500 OR Nasdaq)"
    );
    return {
      ...fallback,
      source: "X",
      notes: ["X_BEARER_TOKEN missing. Switched to search-engine signals.", ...fallback.notes],
    };
  }

  const url = `https://api.x.com/2/tweets/search/recent?max_results=20&tweet.fields=created_at,text&query=${encodeURIComponent(
    query
  )}`;

  try {
    const data = await fetchJsonWithRetry(
      url,
      { headers: { Authorization: `Bearer ${token}` } },
      1
    );
    const tweets = Array.isArray(data?.data) ? data.data : [];
    const score = tweets.reduce((acc, tweet) => acc + scoreTextSentiment(tweet.text), 0);
    return {
      source: "X",
      usedLiveData: true,
      notes: [],
      sampleCount: tweets.length,
      score,
    };
  } catch (error) {
    return {
      source: "X",
      usedLiveData: false,
      notes: [`X API failed: ${error.message}. Fallback applied.`],
      sampleCount: 0,
      score: 0,
    };
  }
}

async function getMetaSentiment() {
  const accessToken = process.env.META_ACCESS_TOKEN;
  const threadsUserId = process.env.THREADS_USER_ID;
  const instagramUserId = process.env.IG_USER_ID;
  const facebookPageId = process.env.FB_PAGE_ID;

  if (!accessToken) {
    const fallback = await getSearchSentiment(
      "Meta platforms search",
      "(site:threads.net OR site:instagram.com OR site:facebook.com) (macro OR inflation OR bitcoin OR ethereum OR SP500 OR Nasdaq)"
    );
    return {
      ...fallback,
      source: "Threads/Instagram/Facebook",
      notes: [
        "META_ACCESS_TOKEN missing. Switched to search-engine signals.",
        ...fallback.notes,
      ],
    };
  }

  const texts = [];
  const notes = [];

  async function tryFetch(endpoint, label, extractor) {
    try {
      const data = await fetchJsonWithRetry(endpoint, {}, 1);
      const items = extractor(data);
      for (const item of items) {
        texts.push(item);
      }
    } catch (error) {
      notes.push(`${label} API failed: ${error.message}`);
    }
  }

  if (threadsUserId) {
    const endpoint = `https://graph.threads.net/v1.0/${threadsUserId}/threads?fields=text,timestamp&access_token=${encodeURIComponent(
      accessToken
    )}`;
    await tryFetch(endpoint, "Threads", (data) =>
      Array.isArray(data?.data) ? data.data.map((x) => x.text || "") : []
    );
  } else {
    notes.push("THREADS_USER_ID missing.");
  }

  if (instagramUserId) {
    const endpoint = `https://graph.facebook.com/v20.0/${instagramUserId}/media?fields=caption,timestamp&access_token=${encodeURIComponent(
      accessToken
    )}`;
    await tryFetch(endpoint, "Instagram", (data) =>
      Array.isArray(data?.data) ? data.data.map((x) => x.caption || "") : []
    );
  } else {
    notes.push("IG_USER_ID missing.");
  }

  if (facebookPageId) {
    const endpoint = `https://graph.facebook.com/v20.0/${facebookPageId}/posts?fields=message,created_time&access_token=${encodeURIComponent(
      accessToken
    )}`;
    await tryFetch(endpoint, "Facebook", (data) =>
      Array.isArray(data?.data) ? data.data.map((x) => x.message || "") : []
    );
  } else {
    notes.push("FB_PAGE_ID missing.");
  }

  const score = texts.reduce((acc, text) => acc + scoreTextSentiment(text), 0);

  return {
    source: "Threads/Instagram/Facebook",
    usedLiveData: texts.length > 0,
    notes:
      texts.length > 0
        ? notes
        : [...notes, "No Meta platform samples collected. Fallback applied."],
    sampleCount: texts.length,
    score,
  };
}

function fmtNumber(value, digits = 2) {
  if (!Number.isFinite(value)) return "N/A";
  return value.toFixed(digits);
}

function marketBias(quotes) {
  const equitySymbols = new Set(["^GSPC", "^IXIC", "^DJI"]);
  const cryptoSymbols = new Set(["BTC-USD", "ETH-USD"]);
  let equity = 0;
  let crypto = 0;
  let equityCount = 0;
  let cryptoCount = 0;

  for (const q of quotes) {
    if (!Number.isFinite(q.changePct)) continue;
    if (equitySymbols.has(q.symbol)) {
      equity += q.changePct;
      equityCount += 1;
    }
    if (cryptoSymbols.has(q.symbol)) {
      crypto += q.changePct;
      cryptoCount += 1;
    }
  }

  const equityAvg = equityCount > 0 ? equity / equityCount : 0;
  const cryptoAvg = cryptoCount > 0 ? crypto / cryptoCount : 0;
  return { equityAvg, cryptoAvg };
}

function stanceFromScore(score) {
  if (score >= 4) return "bullish";
  if (score <= -4) return "bearish";
  return "neutral";
}

function buildMarkdown(payload) {
  const {
    postDate,
    nextWeekDate,
    market,
    xSentiment,
    metaSentiment,
    generatedAt,
  } = payload;
  const { equityAvg, cryptoAvg } = marketBias(market.quotes);
  const combinedSocialScore = xSentiment.score + metaSentiment.score;

  const equitiesStance = stanceFromScore(Math.round(equityAvg + combinedSocialScore * 0.05));
  const cryptoStance = stanceFromScore(Math.round(cryptoAvg + combinedSocialScore * 0.08));
  const macroStance = stanceFromScore(
    Math.round((equityAvg + cryptoAvg) * 0.5 + combinedSocialScore * 0.04)
  );

  const marketRows = market.quotes
    .map(
      (q) =>
        `| ${q.name} (${q.symbol}) | ${fmtNumber(q.price)} | ${fmtNumber(
          q.changePct
        )}% |`
    )
    .join("\n");

  const notes = [
    ...market.notes,
    ...xSentiment.notes,
    ...metaSentiment.notes,
  ]
    .filter(Boolean)
    .map((n) => `- ${n}`)
    .join("\n");

  const slug = `weekly-macro-outlook-${postDate.replace(/-/g, "")}`;
  return `---
slug: ${slug}
title: Weekly Macro Outlook (${postDate}) - US Stocks, Crypto, Social Sentiment
authors: ["sampras"]
tags: [ai, macro, misc]
description: "Auto-generated macro outlook for ${nextWeekDate} — US equities, BTC/ETH snapshot, X/Threads sentiment, and a directional bias read."
image: /img/og/${slug}.png
---

This post is automatically generated for the week starting **${nextWeekDate}**.

## Summary Prediction (Next Week)

- Macro baseline: **${macroStance}**
- US equities (S&P 500 / Nasdaq / Dow): **${equitiesStance}**
- Crypto (BTC / ETH): **${cryptoStance}**

<!-- truncate -->

## Market Snapshot

| Asset | Price | 24h Change |
| --- | ---: | ---: |
${marketRows}

Source: ${market.source}

## Social Sentiment Inputs

- X.com: ${xSentiment.usedLiveData ? "live API data" : "fallback"} (${xSentiment.sampleCount} posts, score ${xSentiment.score})
- Threads/Instagram/Facebook: ${metaSentiment.usedLiveData ? "live API data" : "fallback"} (${metaSentiment.sampleCount} posts, score ${metaSentiment.score})
- Combined social score: ${combinedSocialScore}

## Interpretation

- If equities breadth holds and macro headlines stay stable, downside can remain limited.
- If rate-sensitive data surprises to the upside in inflation, expect risk-off pressure in both growth stocks and crypto.
- Crypto typically amplifies macro beta; position sizing and volatility controls remain important.

## Risk Management Notes

- This is a directional scenario model, not investment advice.
- Use stop-loss and position sizing rules.
- Re-check CPI, labor, and Fed communication events before entering trades.

## Automation Metadata

- Generated at: ${generatedAt}
- Generator: \`scripts/generate-weekly-outlook.cjs\`

${
    notes
      ? `## Data Quality and Error Handling\n\n${notes}\n`
      : ""
  }
`;
}

async function main() {
  const postDate = formatDate(new Date());
  const nextWeekDate = formatDate(startOfNextWeekLocal());
  const generatedAt = new Date().toISOString();
  const fileName = `${postDate}-weekly-macro-outlook.md`;
  const filePath = path.join(BLOG_DIR, fileName);

  const [market, xSentiment, metaSentiment] = await Promise.all([
    getMarketSnapshot(),
    getXSentiment(),
    getMetaSentiment(),
  ]);

  const md = buildMarkdown({
    postDate,
    nextWeekDate,
    generatedAt,
    market,
    xSentiment,
    metaSentiment,
  });

  fs.writeFileSync(filePath, md, "utf8");
  console.log(`Weekly outlook written to: ${filePath}`);
}

main().catch((error) => {
  console.error("Failed to generate weekly outlook:", error);
  process.exit(1);
});

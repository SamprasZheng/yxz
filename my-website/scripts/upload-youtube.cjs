/* eslint-disable no-console */
/**
 * upload-youtube.cjs — Upload a handdrawn video to YouTube.
 * Usage: node scripts/upload-youtube.cjs <slug>
 *   Looks for: scripts/video-drafts/<slug>-handdrawn.mp4
 *              scripts/video-drafts/<slug>-handdrawn.json  (for title/description)
 * Credentials: .env.local (YOUTUBE_CLIENT_ID, YOUTUBE_CLIENT_SECRET)
 * Tokens:      scripts/.youtube-tokens.json (auto-refreshed)
 */
const fs = require("fs");
const path = require("path");
const https = require("https");

const ROOT = path.join(__dirname, "..");
const DRAFTS = path.join(__dirname, "video-drafts");
const TOKENS_PATH = path.join(__dirname, ".youtube-tokens.json");
const ENV_PATH = path.join(ROOT, ".env.local");

// ── Load env ────────────────────────────────────────────────────────────────
function loadEnv(envPath) {
  const env = {};
  if (!fs.existsSync(envPath)) return env;
  for (const line of fs.readFileSync(envPath, "utf-8").split("\n")) {
    const m = line.match(/^([A-Z_]+)=(.+)$/);
    if (m) env[m[1]] = m[2].trim();
  }
  return env;
}

// ── HTTP helpers ─────────────────────────────────────────────────────────────
function post(url, headers, body) {
  return new Promise((resolve, reject) => {
    const buf = typeof body === "string" ? Buffer.from(body) : body;
    const u = new URL(url);
    const req = https.request(
      { hostname: u.hostname, path: u.pathname + u.search, method: "POST",
        headers: { "Content-Length": buf.length, ...headers } },
      (res) => {
        const chunks = [];
        res.on("data", (d) => chunks.push(d));
        res.on("end", () => resolve({ status: res.statusCode, headers: res.headers,
          body: Buffer.concat(chunks).toString() }));
      }
    );
    req.on("error", reject);
    req.write(buf);
    req.end();
  });
}

function put(url, headers, bodyBuffer, onProgress) {
  return new Promise((resolve, reject) => {
    const u = new URL(url);
    const req = https.request(
      { hostname: u.hostname, path: u.pathname + u.search, method: "PUT",
        headers: { "Content-Length": bodyBuffer.length, ...headers } },
      (res) => {
        const chunks = [];
        res.on("data", (d) => chunks.push(d));
        res.on("end", () => resolve({ status: res.statusCode, headers: res.headers,
          body: Buffer.concat(chunks).toString() }));
      }
    );
    req.on("error", reject);

    let uploaded = 0;
    const CHUNK = 256 * 1024;
    function writeNext() {
      const slice = bodyBuffer.slice(uploaded, uploaded + CHUNK);
      if (slice.length === 0) { req.end(); return; }
      req.write(slice);
      uploaded += slice.length;
      if (onProgress) onProgress(uploaded, bodyBuffer.length);
      setImmediate(writeNext);
    }
    writeNext();
  });
}

// ── Token refresh ─────────────────────────────────────────────────────────────
async function ensureFreshToken(tokens, clientId, clientSecret) {
  const now = Date.now();
  if (tokens.expiry_date && tokens.expiry_date > now + 60000) {
    return tokens.access_token; // still valid
  }
  console.log("[auth] refreshing access token...");
  const body = new URLSearchParams({
    client_id: clientId,
    client_secret: clientSecret,
    refresh_token: tokens.refresh_token,
    grant_type: "refresh_token",
  }).toString();
  const res = await post(
    "https://oauth2.googleapis.com/token",
    { "Content-Type": "application/x-www-form-urlencoded" },
    body
  );
  if (res.status !== 200) throw new Error(`Token refresh failed ${res.status}: ${res.body}`);
  const data = JSON.parse(res.body);
  tokens.access_token = data.access_token;
  tokens.expiry_date = now + data.expires_in * 1000;
  fs.writeFileSync(TOKENS_PATH, JSON.stringify(tokens, null, 2));
  console.log("[auth] token refreshed, expires in", data.expires_in, "s");
  return tokens.access_token;
}

// ── Build description from scene JSON ────────────────────────────────────────
function buildDescription(scene) {
  const narrations = scene.scenes.map((s, i) => `[${i + 1}] ${s.narration}`).join("\n");
  return `${scene.title}\n\nGenerated from blog post: ${scene.slug}\n\nNarration:\n${narrations}\n\nHand-drawn animation created with rough.js + Claude Code.`;
}

// ── Resumable upload ─────────────────────────────────────────────────────────
async function uploadVideo(accessToken, videoPath, metadata) {
  const videoData = fs.readFileSync(videoPath);
  const size = videoData.length;
  console.log(`[upload] file: ${path.basename(videoPath)} (${(size / 1024 / 1024).toFixed(1)} MB)`);

  // Step 1: Initiate resumable upload
  const initRes = await post(
    "https://www.googleapis.com/upload/youtube/v3/videos?uploadType=resumable&part=snippet,status",
    {
      "Authorization": `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      "X-Upload-Content-Type": "video/mp4",
      "X-Upload-Content-Length": String(size),
    },
    JSON.stringify(metadata)
  );
  if (initRes.status !== 200) throw new Error(`Upload init failed ${initRes.status}: ${initRes.body}`);
  const uploadUrl = initRes.headers.location;
  if (!uploadUrl) throw new Error("No upload URL in response");
  console.log("[upload] resumable session started");

  // Step 2: Upload file
  let lastPct = -1;
  const uploadRes = await put(
    uploadUrl,
    { "Content-Type": "video/mp4", "Content-Length": String(size) },
    videoData,
    (uploaded, total) => {
      const pct = Math.floor((uploaded / total) * 100);
      if (pct !== lastPct && pct % 5 === 0) {
        process.stdout.write(`\r[upload] ${pct}% (${(uploaded / 1024 / 1024).toFixed(1)} MB / ${(total / 1024 / 1024).toFixed(1)} MB)`);
        lastPct = pct;
      }
    }
  );
  console.log();
  if (uploadRes.status < 200 || uploadRes.status >= 300) {
    throw new Error(`Upload failed ${uploadRes.status}: ${uploadRes.body}`);
  }
  const result = JSON.parse(uploadRes.body);
  return result;
}

// ── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  const arg = process.argv[2];
  if (!arg) {
    console.error("Usage: node upload-youtube.cjs <slug>  (e.g. longway-on-polkadot)");
    process.exit(1);
  }

  // Resolve slug: try as-is, then with -handdrawn suffix
  const handdrawnSlug = arg.endsWith("-handdrawn") ? arg : `${arg}-handdrawn`;
  const mp4Path  = path.join(DRAFTS, `${handdrawnSlug}.mp4`);
  const jsonPath = path.join(DRAFTS, `${handdrawnSlug}.json`);

  if (!fs.existsSync(mp4Path)) {
    console.error(`Video not found: ${mp4Path}`);
    console.error("Run: yarn handdrawn:video <slug>  first");
    process.exit(1);
  }

  const env = loadEnv(ENV_PATH);
  const clientId = env.YOUTUBE_CLIENT_ID;
  const clientSecret = env.YOUTUBE_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    console.error("Missing YOUTUBE_CLIENT_ID or YOUTUBE_CLIENT_SECRET in .env.local");
    process.exit(1);
  }

  if (!fs.existsSync(TOKENS_PATH)) {
    console.error(`Tokens not found: ${TOKENS_PATH}`);
    process.exit(1);
  }
  const tokens = JSON.parse(fs.readFileSync(TOKENS_PATH, "utf-8"));
  const accessToken = await ensureFreshToken(tokens, clientId, clientSecret);

  // Load scene metadata
  const scene = fs.existsSync(jsonPath) ? JSON.parse(fs.readFileSync(jsonPath, "utf-8")) : null;
  const title = scene ? scene.title : handdrawnSlug;
  const description = scene ? buildDescription(scene) : "";
  const tags = scene ? ["blockchain", "polkadot", "web3", "education", "animation"] : [];

  const metadata = {
    snippet: {
      title,
      description,
      tags,
      categoryId: "28", // Science & Technology
    },
    status: {
      privacyStatus: "unlisted",
      selfDeclaredMadeForKids: false,
    },
  };

  console.log(`[upload] title: "${title}"`);
  console.log(`[upload] privacy: unlisted`);

  const result = await uploadVideo(accessToken, mp4Path, metadata);
  const videoId = result.id;
  const url = `https://www.youtube.com/watch?v=${videoId}`;
  console.log(`\n✅ Uploaded → ${url}`);
  console.log(`   Title: ${result.snippet?.title}`);
  console.log(`   Status: ${result.status?.uploadStatus}`);
}

main().catch((e) => { console.error(e); process.exit(1); });

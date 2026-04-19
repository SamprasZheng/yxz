/* eslint-disable no-console */
/**
 * youtube-upload.cjs — YouTube Data API v3 uploader
 * Usage: node scripts/youtube-upload.cjs <slug> [--public|--unlisted|--private]
 * Requires: YOUTUBE_CLIENT_ID, YOUTUBE_CLIENT_SECRET env vars
 * First run: opens browser for OAuth2 consent; tokens saved to scripts/.youtube-tokens.json
 * Input:  scripts/video-drafts/<slug>.json (must have mp4Path)
 */
const fs = require("fs");
const path = require("path");
const http = require("http");
const { execSync } = require("child_process");
const { buildDescription } = require("./yt-description.cjs");

// Load .env.local from project root (my-website/)
const envLocal = path.join(__dirname, "..", ".env.local");
if (fs.existsSync(envLocal)) {
  for (const line of fs.readFileSync(envLocal, "utf-8").split("\n")) {
    const m = line.match(/^([A-Z_]+)=(.+)$/);
    if (m) process.env[m[1]] = m[2].trim();
  }
}

const DRAFTS_DIR = path.join(__dirname, "video-drafts");
const TOKEN_FILE = path.join(__dirname, ".youtube-tokens.json");
const REDIRECT_PORT = 8423;
const REDIRECT_URI = `http://localhost:${REDIRECT_PORT}/callback`;
const SCOPE = "https://www.googleapis.com/auth/youtube.upload";

// ── OAuth2 ──────────────────────────────────────────────────────────────────

function openBrowser(url) {
  try { execSync(`start "" "${url}"`, { stdio: "ignore" }); } catch {}
}

function captureAuthCode() {
  return new Promise((resolve, reject) => {
    const server = http.createServer((req, res) => {
      const u = new URL(req.url, `http://localhost:${REDIRECT_PORT}`);
      const code = u.searchParams.get("code");
      const err = u.searchParams.get("error");
      const html = code
        ? "<h2 style='font-family:sans-serif'>授權成功！可以關閉此視窗。</h2><script>window.close()</script>"
        : `<h2 style='font-family:sans-serif'>授權失敗：${err}</h2>`;
      res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
      res.end(html);
      server.close();
      if (code) resolve(code); else reject(new Error(`OAuth error: ${err}`));
    });
    server.on("error", reject);
    server.listen(REDIRECT_PORT);
  });
}

async function exchangeCode(code, clientId, clientSecret) {
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: REDIRECT_URI,
      grant_type: "authorization_code",
    }),
  });
  if (!res.ok) throw new Error(`Token exchange failed: ${await res.text()}`);
  return res.json();
}

async function refreshAccessToken(refreshToken, clientId, clientSecret) {
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      refresh_token: refreshToken,
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: "refresh_token",
    }),
  });
  if (!res.ok) throw new Error(`Token refresh failed: ${await res.text()}`);
  return res.json();
}

async function getAccessToken(clientId, clientSecret) {
  // Load stored tokens
  if (fs.existsSync(TOKEN_FILE)) {
    const stored = JSON.parse(fs.readFileSync(TOKEN_FILE, "utf-8"));
    if (stored.expiry_date > Date.now() + 60_000) {
      return stored.access_token;
    }
    if (stored.refresh_token) {
      console.log("   Refreshing access token...");
      const data = await refreshAccessToken(stored.refresh_token, clientId, clientSecret);
      const tokens = {
        access_token: data.access_token,
        refresh_token: stored.refresh_token,
        expiry_date: Date.now() + data.expires_in * 1000,
      };
      fs.writeFileSync(TOKEN_FILE, JSON.stringify(tokens, null, 2));
      return tokens.access_token;
    }
  }

  // First-time OAuth2 flow
  const authUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
  authUrl.searchParams.set("client_id", clientId);
  authUrl.searchParams.set("redirect_uri", REDIRECT_URI);
  authUrl.searchParams.set("response_type", "code");
  authUrl.searchParams.set("scope", SCOPE);
  authUrl.searchParams.set("access_type", "offline");
  authUrl.searchParams.set("prompt", "select_account consent");

  console.log("\n🔐 需要 Google 授權，正在開啟瀏覽器...");
  console.log("   若未自動開啟，請手動前往：");
  console.log("   " + authUrl.toString() + "\n");
  openBrowser(authUrl.toString());

  const code = await captureAuthCode();
  const data = await exchangeCode(code, clientId, clientSecret);
  const tokens = {
    access_token: data.access_token,
    refresh_token: data.refresh_token,
    expiry_date: Date.now() + data.expires_in * 1000,
  };
  fs.writeFileSync(TOKEN_FILE, JSON.stringify(tokens, null, 2));
  console.log("✅ 授權成功！Token 已儲存至 scripts/.youtube-tokens.json\n");
  return tokens.access_token;
}

// ── YouTube Upload ───────────────────────────────────────────────────────────

async function initResumableUpload(accessToken, fileSize, metadata) {
  const res = await fetch(
    "https://www.googleapis.com/upload/youtube/v3/videos?uploadType=resumable&part=snippet,status",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        "X-Upload-Content-Type": "video/mp4",
        "X-Upload-Content-Length": String(fileSize),
      },
      body: JSON.stringify(metadata),
    }
  );
  if (!res.ok) throw new Error(`Upload init failed ${res.status}: ${await res.text()}`);
  const uploadUrl = res.headers.get("location");
  if (!uploadUrl) throw new Error("No upload URL in response");
  return uploadUrl;
}

async function uploadChunked(uploadUrl, mp4Path) {
  const fileSize = fs.statSync(mp4Path).size;
  const CHUNK = 8 * 1024 * 1024; // 8 MB — must be multiple of 256 KB
  const buf = fs.readFileSync(mp4Path);
  let offset = 0;

  while (offset < fileSize) {
    const end = Math.min(offset + CHUNK - 1, fileSize - 1);
    const chunk = buf.subarray(offset, end + 1);
    const pct = Math.round((end + 1) / fileSize * 100);
    process.stdout.write(`\r   Uploading... ${pct}% (${(end + 1) / 1024 / 1024 | 0} / ${fileSize / 1024 / 1024 | 0} MB)`);

    const res = await fetch(uploadUrl, {
      method: "PUT",
      headers: {
        "Content-Length": String(chunk.length),
        "Content-Range": `bytes ${offset}-${end}/${fileSize}`,
        "Content-Type": "video/mp4",
      },
      body: chunk,
    });

    if (res.status === 200 || res.status === 201) {
      console.log(); // newline after progress
      return (await res.json()).id;
    }
    if (res.status === 308) {
      // Resume Incomplete — advance to next byte
      const range = res.headers.get("range");
      offset = range ? parseInt(range.split("-")[1]) + 1 : offset + chunk.length;
    } else {
      throw new Error(`Upload error ${res.status}: ${await res.text()}`);
    }
  }
  throw new Error("Upload loop ended without completion");
}

// ── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  const slug = process.argv[2];
  const privacyArg = process.argv[3] || "--private";
  const privacyStatus = privacyArg.replace("--", ""); // public | unlisted | private

  if (!slug) {
    console.error("Usage: node youtube-upload.cjs <slug> [--public|--unlisted|--private]");
    process.exit(1);
  }

  const clientId = process.env.YOUTUBE_CLIENT_ID;
  const clientSecret = process.env.YOUTUBE_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    console.error(
      "YOUTUBE_CLIENT_ID and YOUTUBE_CLIENT_SECRET must be set.\n" +
      "Get them from: https://console.cloud.google.com → APIs & Services → Credentials → OAuth 2.0 Client IDs (Desktop app)"
    );
    process.exit(1);
  }

  const jsonPath = path.join(DRAFTS_DIR, `${slug}.json`);
  if (!fs.existsSync(jsonPath)) {
    console.error(`Draft not found: ${jsonPath}`);
    process.exit(1);
  }

  const draft = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));
  const { title, script, mp4Path } = draft;

  if (!mp4Path || !fs.existsSync(mp4Path)) {
    console.error("MP4 not found. Run yarn video:render first.");
    process.exit(1);
  }

  const fileSize = fs.statSync(mp4Path).size;
  console.log(`\n📤 Uploading: ${title}`);
  console.log(`   File: ${mp4Path} (${(fileSize / 1024 / 1024).toFixed(1)} MB)`);
  console.log(`   Privacy: ${privacyStatus}\n`);

  const accessToken = await getAccessToken(clientId, clientSecret);

  const description = buildDescription(script, slug);
  console.log(`   Description: ${description.length} chars`);

  const metadata = {
    snippet: {
      title,
      description,
      tags: [],   // tags embedded in description hashtags
      categoryId: "28", // Science & Technology
    },
    status: {
      privacyStatus,
      selfDeclaredMadeForKids: false,
    },
  };

  const uploadUrl = await initResumableUpload(accessToken, fileSize, metadata);
  const videoId = await uploadChunked(uploadUrl, mp4Path);

  const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
  console.log(`\n✅ 上傳完成！`);
  console.log(`   Video ID: ${videoId}`);
  console.log(`   URL: ${videoUrl}\n`);

  draft.youtubeId = videoId;
  draft.youtubeUrl = videoUrl;
  fs.writeFileSync(jsonPath, JSON.stringify(draft, null, 2), "utf-8");
}

main().catch((e) => {
  console.error("\n❌", e.message);
  process.exit(1);
});

/* eslint-disable no-console */
/**
 * yt-description.cjs — YouTube description builder
 * Generates rich descriptions with random hashtag selection + fixed disclaimer.
 */

// ── Hashtag pools ────────────────────────────────────────────────────────────

const TAGS_MAIN = [
  "#美股","#台股","#加密貨幣","#比特幣","#以太坊","#台積電","#黃仁勳",
  "#波卡","#DOT","#ASTR","#PEAQ","#MYTH","#SOL","#USDT","#USDC",
  "#當代藝術","#AndyWarhol","#草間彌生","#當代攝影","#價值投資","#風險管理",
  "#去中心化","#Web3","#KOL","#詐騙","#監管","#牛市","#熊市",
  "#DCA","#DYOR","#區塊鏈技術","#NFT","#AI","#Gaming","#邦妮","#波卡鯊",
  "#市場情緒","#資訊爆炸","#泡沫","#交易策略","#技術分析","#基本面",
  "#資金流向","#台灣藝術家","#國際藝術家","#台北展覽","#藝文活動","#小白變高手",
];

const TAGS_ART = [
  "#CindySherman","#AndreasGursky","#JeffWall","#NanGoldin","#WolfgangTillmans",
  "#RichardPrince","#MarinaAbramovic","#AiWeiwei","#YayoiKusama","#DamienHirst",
  "#TraceyEmin","#JeffKoons","#GerhardRichter","#SallyMann","#RinekeDijkstra",
  "#MartinParr","#AlexPrager","#AlecSoth","#ContemporaryArt",
  "#ContemporaryPhotography","#Art","#Photography","#FineArtPhotography",
  "#ConceptualPhotography","#DocumentaryPhotography","#PortraitPhotography",
  "#VisualArt","#ArtWorld","#PhotographyLovers","#ArtLovers","#VideoArt","#ArtExhibition",
];

const TAGS_TAIPEI = [
  "#台北藝術展覽","#台北展覽","#台北看展","#當期展覽","#藝術活動","#藝文活動",
  "#免費展覽","#售票展覽","#臺北市立美術館","#北美館","#台北當代藝術館","#MoCATaipei",
  "#國家攝影文化中心","#國立歷史博物館","#藝廊展覽","#獨立展覽",
  "#當代藝術展","#攝影展覽","#繪畫展","#雕塑展","#裝置藝術","#新媒體藝術",
  "#台灣藝術家","#國際藝術家","#黑潮賴純純","#時代劇場","#諸神與眾生","#托瑪斯德曼",
  "#TaipeiArt","#TaipeiExhibition","#ArtInTaipei","#TaiwanArt",
  "#PhotographyExhibition","#ContemporaryArtTaiwan","#TFAM","#MoCA",
];

// ── Fixed blocks ─────────────────────────────────────────────────────────────

const DISCLAIMER = `免責聲明：我並非財務顧問或註冊會計師。這些影片僅作為記錄我思維之用。任何形式的投資都涉及風險，您的投資完全由您自行負責。我僅分享個人意見，無法保證投資獲利或虧損。請務必自行做好研究 (DYOR)。

Disclaimer: I am not a financial advisor or CPA. This content is only used to record my thoughts. Any form of investment involves risks and your investment is entirely your own responsibility. I only share my personal opinion and cannot guarantee a profit or loss on your investment. Be sure to do your own research (DYOR).`;

const ANTI_SCAM = `⚠️ 請大家小心詐騙：市場上流言與詐騙非常多，特別是在加密貨幣領域。有助記詞的留言都是詐騙。務必確認是官方推特與網站在連接錢包。不要輕信陌生人或所謂「內部消息」。`;

const ABOUT_ME = `About me / 關於我 Linktree: linktr.ee/PolkaSharks`;

// ── Helpers ───────────────────────────────────────────────────────────────────

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Pick hashtags from pool until total char length ≈ target */
function pickTags(pool, targetChars) {
  const shuffled = shuffle(pool);
  const picked = [];
  let len = 0;
  for (const tag of shuffled) {
    if (len > 0 && len + tag.length + 1 > targetChars * 1.25) break;
    picked.push(tag);
    len += tag.length + 1;
    if (len >= targetChars) break;
  }
  return picked.join(" ");
}

// ── Main export ───────────────────────────────────────────────────────────────

/**
 * Build a YouTube description.
 * @param {string} script  - Narration script text
 * @param {string} slug    - Blog post slug (used to construct blog URL)
 */
function buildDescription(script, slug) {
  const excerpt = (script || "")
    .slice(0, 500)
    .replace(/\n\n+/g, "\n")
    .trim();

  const blogUrl = slug
    ? `https://SamprasZheng.github.io/yxz/blog/${slug}`
    : null;

  const mainTags  = pickTags(TAGS_MAIN, 100);           // ~100 chars, random
  const artTags   = shuffle(TAGS_ART).join(" ");        // all, random order
  const taipeiTags = shuffle(TAGS_TAIPEI).join(" ");    // all, random order

  const parts = [
    excerpt,
    blogUrl ? `\n原文：${blogUrl}` : "",
    "",
    mainTags,
    "",
    "---",
    "",
    ANTI_SCAM,
    ABOUT_ME,
    "",
    DISCLAIMER,
    "",
    artTags,
    taipeiTags,
  ];

  const desc = parts.filter((p) => p !== null).join("\n").trim();

  // YouTube description limit is 5000 chars
  if (desc.length > 4900) {
    console.warn(`   ⚠️  Description ${desc.length} chars — truncated to 4900`);
    return desc.slice(0, 4900);
  }
  return desc;
}

module.exports = { buildDescription };

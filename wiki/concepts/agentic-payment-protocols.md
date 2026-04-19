---
type: concept
tags: [payments, ai-agents, protocols, agentic-commerce, x402, mpp, acp, ap2, l402, stablecoin, stripe, openai, google, mastercard, visa]
---

# Agentic Payment Protocols — 全景比較

## 概述

2025–2026 年間，圍繞「AI agent 如何自主付款」湧現了五個主要協議標準，形成一個分層生態系統。它們並非純粹競爭關係，而是覆蓋不同層次（授權層、結算層、流程層）的互補拼圖。

## 五大協議速覽

| 協議 | 發起方 | 發布日期 | 定位 | 支付方式 |
|---|---|---|---|---|
| **x402** | Coinbase | 2025-05 (V2: 2025-12) | HTTP-native stablecoin 結算 | USDC + 多鏈 ERC-20 |
| **ACP** | OpenAI + Stripe | 2025-09 | Merchant checkout 流程標準 | 法幣（卡/銀行轉帳）|
| **AP2** | Google + 60+ 夥伴 | 2025-09-17 | 授權信任框架（Mandate） | 支付無關（fiat + crypto）|
| **MPP** | Stripe + Tempo | 2026-03-18 | Session 式連續微支付 | stablecoin + 法幣 + BTC |
| **L402** | Lightning Labs | 2020（AI 工具 2026-02）| Bitcoin Lightning HTTP 微支付 | BTC（Lightning）|

## 各協議詳解

### 1. x402 Protocol

核心機制：HTTP 402 狀態碼觸發鏈上 USDC 支付，< 2 秒結算，每筆 ~$0.0001 手續費。

**V2（2025-12-11）重大升級：**
- 從 body-based 遷移至 **header-based** 資料傳輸
- 引入 **Session 支援**：首次付款後後續請求免重複握手，支援訂閱制 pattern
- 支援 **任意 ERC-20 代幣**（透過 Uniswap Permit2 + Coinbase Gas Sponsorship）
- CAIP 標準對齊（鏈/資產標識符標準化）
- 模組化 SDK：開發者可插件式新增鏈/資產/支付方案
- 6 個月累積：**1 億筆以上支付**、600+ 開發者 Telegram 社群

**支援鏈（V2）**：Base、Solana、其他 L2、傳統軌道（ACH / SEPA / 卡）透過 facilitator

**生態地位**：Stripe 同時支援 MPP 和 x402；AP2 將 x402 列為官方 crypto extension。

詳見 [[concepts/x402-protocol]]。

---

### 2. ACP — Agentic Commerce Protocol

**發起方**：OpenAI + Stripe 共同維護，Apache 2.0 授權

**核心設計**：定義 AI agent 與 merchant 之間完成購物的互動模型。四個 RESTful 端點：
1. `Create Checkout` — 建立結帳會話
2. `Update Checkout` — 更新購物車/選項
3. `Complete Checkout` — 完成付款
4. `Cancel Checkout` — 取消訂單

**版本演進**：
| 版本 | 日期 | 主要新增 |
|---|---|---|
| 初版 | 2025-09-29 | 基礎規格 |
| V2 | 2025-12-12 | 履行（Fulfillment）增強 |
| V3 | 2026-01-16 | 能力協商（Capability Negotiation）|
| V4 | 2026-01-30 | 擴展機制、折扣、Payment Handlers |

**真實部署**：ChatGPT 內建即時結帳（Instant Checkout，2026-02 上線），Etsy 商品可直接在 ChatGPT 內購買，Shopify 百萬商家陸續接入。

**定位**：法幣優先，面向消費者 e-commerce agent；與 x402 互補（x402 是 M2M 無帳戶場景，ACP 是有帳戶消費場景）。

---

### 3. AP2 — Agent Payments Protocol

**發起方**：Google，60+ 合作夥伴（含 Coinbase、PayPal、Mastercard、Adyen、Etsy、Salesforce 等）

**發布日期**：2025-09-17

**核心機制：Mandates（委任書）**

AP2 以密碼學簽名的「Mandate」作為核心信任原語，解決三個問題：
- **Authorization**：用戶授予 agent 多大的支付權力？
- **Authenticity**：agent 請求是否真實反映用戶意圖？
- **Accountability**：出現爭議時責任歸屬？

**兩種購物模式**：
1. **Real-time**（人在場）：Intent Mandate → agent 呈現購物車 → 用戶簽 Cart Mandate
2. **Delegated**（人不在場）：用戶事先簽 Intent Mandate（含規則）→ agent 自動生成 Cart Mandate 執行

**技術標準**：建構於 A2A Protocol + MCP 之上；使用 Verifiable Credentials（VC）+ 選擇性披露；與 FIDO Alliance 對齊。

**x402 Extension**：AP2 官方將 x402 列為 crypto 支付的標準 extension，Coinbase / Ethereum Foundation / MetaMask 共同協作。

**定位**：授權框架，支付無關（fiat + crypto 均支援）；適合需要完整審計軌跡的企業多 agent 場景。

---

### 4. MPP — Machine Payments Protocol

**發起方**：Stripe + Tempo（Stripe 投資的加密支付新創，Paradigm 參投）

**發布日期**：2026-03-18（Tempo mainnet 同步上線）

**核心創新：Session 預授權 + 連續微支付流**

MPP 與 x402 同樣復活 HTTP 402，但增加了 **Session（會話）** 層：
- 客戶端一次預授權花費上限
- 後續請求在 session 內連續串流微支付，無需每筆鏈上確認
- 顯著降低延遲與 gas 成本

**支援支付方式**：
- Stablecoin（Tempo 鏈）
- 法幣（Stripe 卡/銀行）
- Bitcoin Lightning（Lightspark 延伸）
- Visa 卡網路（透過 Visa 合作，支援受信任 agent 卡支付）

**已整合 100+ 服務**（mainnet 上線時）：Browserbase、PostalForm、Prospect Butcher Co.、Parallel Web Systems 等。

**定位**：連續微支付最佳化；適合 AI agent 長時間工作流（如持續資料訂閱、串流計算計費）。

---

### 5. L402 — Lightning HTTP 402

**發起方**：Lightning Labs

**最初發布**：2020 年（基於 Macaroon 認證 token + Lightning Network）

**AI agent 工具**：2026-02-11 開源 AI agent 工具集（7 個可組合技能模組）

**核心機制**：HTTP 402 + Lightning invoice；付款收據即為 API 存取憑證（無需帳號）

**優勢**：
- 多年生產成熟度（比 x402 早 5 年）
- Lightning Network 規模（2025 年：~1 億估計錢包用戶、每月 800 萬筆交易）
- Bitcoin 原生，無 stablecoin 監管風險

**限制**：
- 僅限 Bitcoin，無鏈無關彈性
- LN 流動性管理複雜度高於 L1/stablecoin 模式

**2026 延伸**：Lightspark 將 L402 整合進 MPP，使 MPP 也支援 Bitcoin 支付路徑。

---

## 傳統支付大廠的 Agentic 策略

### Stripe
雙軌並行：
- **MPP**：co-author，面向 stablecoin + 連續微支付
- **ACP**：co-author，面向傳統法幣 e-commerce checkout
- **Agentic Commerce Suite**：一站式方案（SPT + 詐欺保護 + ACP 整合）
- 同時宣告支援 x402

### PayPal
- **Agent Ready**（2026 early）：讓現有百萬商家無需開發即可接受 agent 付款
- **Store Sync**：商品資料同步至 AI 頻道（ChatGPT、Perplexity 等）
- 整合 ChatGPT、Perplexity、Google UCP
- 與 Mastercard Agent Pay 合作

### Visa — Intelligent Commerce + TAP
- **Visa Intelligent Commerce (VIC)**：2025 啟動，100+ 生態夥伴，30+ 在沙盒開發
- **Trusted Agent Protocol (TAP)**：2025-10-14 發布；RFC 9421 簽名 HTTP 訊息；重放攻擊防護（timestamp + nonce）；與 Cloudflare 共同開發
- 已完成「數百筆」受控真實 agent 交易
- 預測：2026 假日購物季前，數百萬消費者將使用 agent 完成購物

詳見 [[entities/visa]]。

### Mastercard — Agent Pay + Verifiable Intent
- **Agent Pay**（2025-04）：Agentic Token + Verifiable Intent 雙支柱
- **Agentic Token**：每個 AI agent（ChatGPT / Gemini / Perplexity）發一個獨立 token，可設定類別/金額/時段限制；Citi + US Bank 為首批發行行
- **Verifiable Intent**：與 Google AP2 共同開發的開放標準；基於 SD-JWT + FIDO + EMVCo + W3C；建立「用戶身份 × 指令 × 交易結果」三元不可竄改記錄
- 2025 Q4：網絡上首筆 agentic 交易完成（CEO Michael Miebach 確認）

詳見 [[entities/mastercard]]。

---

## 協議層次分析

```
[用戶授權層]    AP2 (Mandates)  ←→  Mastercard Verifiable Intent
                     ↓
[Identity層]    Mastercard Agentic Token / Visa TAP / PayPal Agent Ready
                     ↓
[結算層]    x402 (crypto) | ACP+MPP (fiat) | L402 (BTC)
```

## 與 x402 的定位對比

| | x402 | ACP | AP2 | MPP | L402 |
|---|---|---|---|---|---|
| 無帳號 M2M | ✅ | ❌ | N/A | ✅ | ✅ |
| 法幣支付 | 透過 facilitator | ✅ | ✅ | ✅ | ❌ |
| Crypto 原生 | ✅ | ❌ | Extension | ✅ | BTC only |
| 訂閱/Session | V2 起 ✅ | ✅ | N/A | ✅ 核心 | ❌ |
| 開源治理 | x402 Foundation | Apache 2.0 | 開放 | Stripe+Tempo | Lightning Labs |
| 成熟度（2026） | 中 | 早期 | 早期 | 剛上線 | 最成熟 |

## 相關頁面

- [[concepts/x402-protocol]] — x402 詳細規格與 V2 升級
- [[concepts/agentic-payments]] — AI agent 自主支付框架
- [[entities/coinbase]] — x402 發起者
- [[entities/stripe]] — MPP + ACP 共同發起者
- [[entities/visa]] — Intelligent Commerce + TAP
- [[entities/mastercard]] — Agent Pay + Verifiable Intent
- [[sources/x402-protocol-coinbase-2025]] — x402 詳細資料來源

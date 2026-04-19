---
type: concept
tags: [x402, http, payments, protocol, stablecoin, usdc, open-standard]
---

# x402 Protocol

## 定義

**x402** 是一個開放的網際網路原生支付協議，由 [[entities/coinbase]] 於 2025 年 5 月發布，復活 HTTP `402 Payment Required` 狀態碼，使其成為機器對機器（M2M）自動小額支付的觸發機制。

核心思想：**任何 HTTP 端點都可以要求付款，任何 HTTP 客戶端都可以自動付款——無需人工介入。**

## 技術規格

### 標準交換流程

```http
→ GET /api/data
← 402 Payment Required
  X-Payment-Required: { amount: "0.01", currency: "USDC", network: "base", payTo: "0x..." }

→ GET /api/data
  X-Payment: <signed_payment_receipt>
← 200 OK
  { data: ... }
```

### 核心參數

| 參數 | 說明 |
|---|---|
| `amount` | 要求金額（通常 $0.0001–$1） |
| `currency` | 支付幣種（主要為 USDC） |
| `network` | 鏈別（Base / Polygon / Solana / Stellar / Algorand）|
| `payTo` | 收款地址 |
| `X-Payment` | 付款完成後的簽名收據 header |

### 效能

- 結算時間：< 2 秒
- 每筆手續費：~$0.0001 USD
- Coinbase CDP facilitator：前 1,000 筆/月免費

## V2 升級（2025-12-11）

> ⚠️ **更新**：V1 技術細節已被 V2 部分取代，見下方說明。

x402 V2 是重大版本升級，核心改動：

| 面向 | V1 | V2 |
|---|---|---|
| 資料傳輸 | body-based | **header-based** |
| Session 支援 | 無 | ✅ 首次付款後免重複握手 |
| 代幣支援 | USDC 為主 | **任意 ERC-20**（Permit2 + Gas Sponsorship）|
| 標準對齊 | 自定 | CAIP 鏈/資產標識符；IETF header 慣例 |
| SDK 架構 | 單體 | 模組化插件（可新增鏈/資產/支付方案）|
| 傳統支付 | 無 | ACH / SEPA / 卡 via facilitator |

**V2 Session 支援**：wallet-based identity；首次付款建立 session 後，後續請求免重複付款握手，支援訂閱制及長時間 agent 工作流。Coming soon: Sign-In-With-X (SIWx) header（基於 CAIP-122）。

**採用數據（2025-12）**：6 個月累積 **1 億筆以上支付**；600+ 開發者 Telegram 社群；SDK 支援 Node.js / Python / Go。

## 治理

2025 年 12 月，Coinbase 與 Cloudflare 共同創立 **x402 Foundation**，負責維護開放規格（open spec），防止協議被單一企業壟斷。

## 支援生態

- **基礎設施**：Coinbase CDP、Cloudflare Workers、Vercel
- **鏈（V2）**：Base、Solana、任意 EVM L2（透過模組化 SDK）；Polygon / Stellar / Algorand（V1 原有）
- **傳統支付**：ACH / SEPA / 卡 透過 facilitator（V2 新增）
- **整合**：Google AP2（x402 為官方 crypto extension）、Stripe（同時支援 x402 + MPP）、Visa TAP（卡支付層）、AWS、Nous Research、World AgentKit（2026-03）

## 與現有支付的比較

| 項目 | 傳統 API Key | Stripe/訂閱制 | x402 |
|---|---|---|---|
| 開戶需求 | 是 | 是 | 否 |
| 人工設定 | 是 | 是 | 否 |
| 粒度 | session/月 | 月 | 每次請求 |
| 機器自動化 | 部分 | 否 | 完全 |
| 結算速度 | T+1~T+3 | 即時（但有中介） | < 2 秒鏈上終結 |
| 手續費 | 3% | 2.9%+$0.30 | ~$0.0001 |

## 採用現況（2026 Q1）

| 指標 | 數值 | 備註 |
|---|---|---|
| 累積支付筆數 | 1 億+ | 6 個月（2025-06～12）|
| Solana 上交易 | 3,500 萬+ 筆 / $1,000 萬+ | 2025 年中至 2026 初 |
| 每日真實交易量 | ~$28,000 | CoinDesk 2026-03；含大量測試/刷量 |
| 累積買家數 | 94,060 | eco.com 數據 |
| 賣家數 | 22,000 | eco.com 數據 |
| 開發者社群 | 600+ | Telegram 群組 |

**注意**：CoinDesk（2026-03）調查發現，約半數觀察到的 x402 交易為「gamified」活動（刷量/測試），非真實商業需求。真實 agentic commerce 需求仍待爆發。

## 限制與風險

- 真實商業需求仍在驗證中（2026/03 每日交易量僅 $28,000，部分為刷量）
- 大量 USDC 持有需要 wallet 管理基礎設施
- Agent 的 wallet 安全性（私鑰管理）是新挑戰
- 監管不確定性（stablecoin 支付法規）
- 競爭激烈：ACP / MPP / AP2 等協議爭奪同一市場，但定位有差異

## 相關頁面

- [[concepts/agentic-payments]] — 更廣義的 AI 自動支付框架
- [[concepts/agentic-payment-protocols]] — x402 vs ACP vs AP2 vs MPP vs L402 全景比較
- [[sources/x402-protocol-coinbase-2025]] — 詳細資料來源
- [[entities/coinbase]] — 協議發起者
- [[entities/stripe]] — 同時支援 x402 + MPP + ACP
- [[entities/visa]] — 透過 TAP 為 x402 添加卡支付層
- [[concepts/xcm]] — Polkadot 的跨鏈訊息（同屬自動化 M2M 範疇）

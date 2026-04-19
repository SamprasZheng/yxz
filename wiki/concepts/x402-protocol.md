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

## 治理

2025 年 12 月，Coinbase 與 Cloudflare 共同創立 **x402 Foundation**，負責維護開放規格（open spec），防止協議被單一企業壟斷。

## 支援生態

- **基礎設施**：Coinbase CDP、Cloudflare Workers、Vercel
- **鏈**：Base、Polygon、Solana、Stellar、Algorand
- **整合**：Google Agentic Payments Protocol、AWS、Nous Research

## 與現有支付的比較

| 項目 | 傳統 API Key | Stripe/訂閱制 | x402 |
|---|---|---|---|
| 開戶需求 | 是 | 是 | 否 |
| 人工設定 | 是 | 是 | 否 |
| 粒度 | session/月 | 月 | 每次請求 |
| 機器自動化 | 部分 | 否 | 完全 |
| 結算速度 | T+1~T+3 | 即時（但有中介） | < 2 秒鏈上終結 |
| 手續費 | 3% | 2.9%+$0.30 | ~$0.0001 |

## 限制與風險

- 真實商業需求仍在驗證中（2026/03 每日交易量僅 $28,000）
- 大量 USDC 持有需要 wallet 管理基礎設施
- Agent 的 wallet 安全性（私鑰管理）是新挑戰
- 監管不確定性（stablecoin 支付法規）

## 相關頁面

- [[concepts/agentic-payments]] — 更廣義的 AI 自動支付框架
- [[sources/x402-protocol-coinbase-2025]] — 詳細資料來源
- [[entities/coinbase]] — 協議發起者
- [[concepts/xcm]] — Polkadot 的跨鏈訊息（同屬自動化 M2M 範疇）

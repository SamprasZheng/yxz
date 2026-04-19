---
type: source
title: "x402: Internet-Native Payments for APIs and AI Agents"
author: Coinbase Developer Platform
date: 2025-05-01
ingested: 2026-04-19
tags: [x402, payments, ai-agents, stablecoin, usdc, http, coinbase, cloudflare]
---

# x402: Internet-Native Payments for APIs and AI Agents

## 摘要

Coinbase 於 2025 年 5 月推出 **x402**，復活了 HTTP 長期閒置的 `402 Payment Required` 狀態碼，打造成 AI agents 之間自動小額支付的開放標準協議。核心理念是：任何 HTTP 請求都可以觸發一筆機器對機器（M2M）的鏈上付款，無需帳號、訂閱或 API key，全程自動完成。

## 背景

HTTP 1.1 規範（RFC 2616, 1999）定義了 `402 Payment Required`，但保留為「未來使用」，長達 25 年從未有標準實作。Coinbase 將其重新定義為 stablecoin 微支付的觸發點，並於 2025 年 12 月與 Cloudflare 共同創立 **x402 Foundation**，推動開放標準化。

## 技術運作流程

```
1. AI Agent 送出 HTTP 請求
2. Server 回傳 402 + { amount, currency, payTo, network }
3. Agent 自動在鏈上發送 USDC 付款
4. Agent 帶著收據（payment_receipt header）重送請求
5. Server 驗收 → 資源解鎖
```

- **結算時間**：< 2 秒
- **手續費**：~$0.0001 USD/筆
- **支援鏈**：Base、Polygon、Solana、Stellar、Algorand
- **支援資產**：USDC（ERC-20 及各鏈同等）

## 產業支援

| 組織 | 角色 |
|---|---|
| Coinbase | 協議發起者、CDP facilitator 服務（每月前 1,000 筆免費）|
| Cloudflare | 共同創立 x402 Foundation；pay-per-crawl 整合 |
| Google | Google Agentic Payments Protocol 整合 x402 |
| Vercel | 平台支援 |
| AWS | 文件推廣、agentic commerce 解說 |
| Solana Foundation | 官方 x402 on Solana 推廣 |
| Stellar Foundation | x402 on Stellar 整合 |
| Algorand | x402 整合 |
| Nous Research | 用 x402 對 Hermes 4 做 per-inference 計費 |

## 主要應用場景

### 1. API 按次計費
無需訂閱或 API key，AI agent 每次呼叫 API 自動付款，開發者幾行程式碼即可實作。

### 2. 資料按需購買
- Compliance agent 購買單次法規查詢
- 交易 agent 購買即時市場快照
- 金融研究 agent 購買單篇付費文章

### 3. AI 模型推論計費
Nous Research 以 x402 對 Hermes 4 大語言模型做 per-inference 計費，是首個真實生產案例。

### 4. 內容微支付
Agent 自動付款讀取付費文章、圖片、音樂，繞過訂閱牆。

### 5. Cloudflare Pay-per-Crawl
Cloudflare 將 bot 存取從「攔截問題」轉為「定價機制」：合法爬蟲支付 x402 即可通過，取代傳統驗證碼。

### 6. Agent 市集（Agentic Marketplace）
AI agents 間 24/7 自動交易，買方/賣方均為程式，無需人工介入。

## 現況數據（2026 年初）

- Solana 上：35M+ 筆交易，$10M+ 交易量（2025 年夏至 2026 年初）
- 每日真實交易量：約 $28,000（CoinDesk 2026/03）
- 問題：大部分交易量仍為測試或刷量，真實 agentic commerce 需求尚未爆發

> ⚠️ **注意**：協議基礎設施已成熟，但商業需求驗證仍在早期。

## 市場規模預測

- McKinsey：agentic commerce 到 2030 年將媒介 $3–5 兆美元全球商業
- 美國 B2C 零售市場：最多 $1 兆美元由 AI agents 協調
- 2026 年 agentic commerce 交易額：$80 億美元，2031 年預估 $3.5 兆美元

## 相關概念

- [[concepts/x402-protocol]] — 技術細節與協議規格
- [[concepts/agentic-payments]] — AI agents 自動支付的廣義框架
- [[entities/coinbase]] — 協議發起組織
- [[concepts/xcm]] — Polkadot 跨鏈訊息協議（同屬 M2M 支付範疇）

## 來源

- [x402.org](https://www.x402.org/)
- [Coinbase Developer Docs](https://docs.cdp.coinbase.com/x402/welcome)
- [Cloudflare x402 Foundation Blog](https://blog.cloudflare.com/x402/)
- [AWS Agentic Commerce](https://aws.amazon.com/blogs/industries/x402-and-agentic-commerce-redefining-autonomous-payments-in-financial-services/)
- [Google x402 Integration](https://www.coinbase.com/developer-platform/discover/launches/google_x402)
- [CoinDesk 需求現況報告 (2026/03)](https://www.coindesk.com/markets/2026/03/11/coinbase-backed-ai-payments-protocol-wants-to-fix-micropayment-but-demand-is-just-not-there-yet)

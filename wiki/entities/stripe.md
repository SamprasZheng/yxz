---
type: entity
tags: [stripe, payments, fintech, agentic-commerce, mpp, acp, stablecoin]
---

# Stripe

## 基本資料

- **類型**：私人金融科技公司（估值 ~$650 億美元，2024）
- **創立**：2010 年，Patrick Collison & John Collison
- **總部**：美國舊金山 / 愛爾蘭都柏林
- **核心業務**：網路支付基礎設施；開發者友好 API；全球商家支付處理

## 與 Agentic Payments 相關的專案

### ACP — Agentic Commerce Protocol（共同維護）

2025-09-29，Stripe 與 OpenAI 共同發布 **Agentic Commerce Protocol (ACP)**，Apache 2.0 授權開源規格。

ACP 定義 AI agent 與 merchant 之間的 checkout 互動模型：
- **四個 RESTful 端點**：Create / Update / Complete / Cancel Checkout
- 支援實體商品、數位商品、訂閱、非同步購物
- 可實作為 RESTful 介面或 MCP server
- 已支援：ChatGPT Instant Checkout（2026-02），Etsy、Shopify 百萬商家陸續接入

**版本演進**（2025-09 → 2026-01）：能力協商 → 折扣 → Payment Handlers

### MPP — Machine Payments Protocol（共同作者）

2026-03-18，Stripe 與 Tempo（Stripe 投資的加密支付新創）共同發布 **Machine Payments Protocol (MPP)**。

MPP 同樣復活 HTTP 402，核心創新是 **Session 預授權**：
- agent 一次預授權花費上限，後續在 session 內連續串流微支付
- 支援：stablecoin（Tempo 鏈）、法幣（Stripe）、Bitcoin（Lightspark 延伸）、Visa 卡
- Mainnet 上線即整合 100+ 服務（Browserbase、PostalForm 等）

### Agentic Commerce Suite

Stripe 推出的完整 agentic 商業解決方案，包含：
- **Shared Payment Tokens (SPT)**：agent 安全傳遞買家支付憑證，可設定 seller-specific 範圍、金額/時間限制
- ACP 整合
- MCP 整合
- 詐欺保護、退款、稅務計算

**已接入品牌**（2026 年初）：Coach、Kate Spade、URBN（Anthropologie / Free People / Urban Outfitters）、Revolve、Ashley Furniture；平台：Squarespace、Wix、Etsy、WooCommerce、BigCommerce、commercetools

### x402 支援

Stripe 同時宣告支援 x402 協議，使其支付基礎設施成為 protocol-agnostic 的結算後端。

## 在 Agentic Payments 生態中的定位

Stripe 是唯一同時參與三個主要協議（ACP / MPP / x402）的玩家，戰略上試圖掌控 agentic commerce 的支付基礎設施，無論哪個前端協議勝出。

## 相關頁面

- [[concepts/agentic-payment-protocols]] — 五大協議全景比較
- [[concepts/agentic-payments]] — AI agent 自主支付框架
- [[concepts/x402-protocol]] — Coinbase 的 HTTP-native 支付標準

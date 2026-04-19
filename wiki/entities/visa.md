---
type: entity
tags: [visa, payments, card-network, agentic-commerce, tap, intelligent-commerce]
---

# Visa

## 基本資料

- **類型**：全球支付網路（NYSE: V）
- **創立**：1958 年（Bank of America 前身 BankAmericard）
- **總部**：美國加州 San Francisco
- **核心業務**：全球卡支付清算網路；數位支付；跨境結算

## Agentic Payments 策略：Visa Intelligent Commerce

### Visa Intelligent Commerce (VIC)

**VIC** 是 Visa 在 2025 年啟動的 agentic commerce 全面計劃，目標是讓 AI agent 能安全地代表用戶完成購物交易。

**2026 年初現況**：
- 100+ 生態合作夥伴
- 30+ 合作方在 VIC 沙盒中積極開發
- 20+ agent / agent enabler 直接與 VIC 整合
- 已完成**數百筆**受控真實 agent 發起交易
- 預測：2026 假日購物季前，**數百萬消費者**將使用 AI agent 完成購物

### Trusted Agent Protocol (TAP)

**TAP** 是 VIC 的核心安全框架，於 **2025-10-14** 正式發布，與 **Cloudflare** 共同開發。

**功能**：讓 AI agent 在與 merchant 進行交易每一步時，都能安全傳遞意圖、用戶身份識別及支付資訊。

**技術規格**：

| 元素 | 說明 |
|---|---|
| **Agent Intent** | AI agent 是受信任 agent、意圖取得或購買特定商品的聲明 |
| **Consumer Recognition** | 消費者是否有現有帳號或曾與 merchant 互動 |
| **Payment Information** | 支援 merchant 偏好結帳方式的支付資料 |
| **Message Signature** | 依 **RFC 9421** 標準的 HTTP 訊息簽名 |
| **重放攻擊防護** | 請求包含 timestamp（created/expires）+ nonce；server 可拒絕過期或重複簽名 |

TAP 規格已公開於 **Visa Developer Center** 及 GitHub。

### x402 整合

Visa 通過 TAP 為 x402 添加了卡支付支援，使 x402 生態可接受 Visa 卡網路作為結算選項（透過 Visa 的受信任 agent 卡支付機制）。

### Stripe 合作

Visa 支援 Stripe + Tempo 的 Machine Payments Protocol (MPP)，透過卡網路為受信任的 agent 自主支付提供基礎設施支撐。

## 與 Mastercard 對比

| 面向 | Visa (TAP / VIC) | Mastercard (Agent Pay) |
|---|---|---|
| 發布時間 | 2025-10（TAP）| 2025-04（Agent Pay）|
| 信任機制 | RFC 9421 HTTP 簽名 | SD-JWT Verifiable Intent |
| Token 管理 | VIC 框架內 | Agentic Token（per-agent 發行）|
| 開放標準 | RFC 9421 | FIDO / EMVCo / W3C / IETF |
| 合作開發方 | Cloudflare | Google |

## 相關頁面

- [[concepts/agentic-payment-protocols]] — 五大協議全景比較（含 Visa 定位）
- [[concepts/agentic-payments]] — AI agent 自主支付框架
- [[entities/mastercard]] — 競爭對手的 Agent Pay 策略
- [[entities/stripe]] — MPP 合作方（Visa 支援 MPP）
- [[concepts/x402-protocol]] — x402 生態中 Visa 提供卡支付層

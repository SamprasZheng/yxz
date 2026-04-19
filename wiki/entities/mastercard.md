---
type: entity
tags: [mastercard, payments, card-network, agentic-commerce, verifiable-intent, agent-pay]
---

# Mastercard

## 基本資料

- **類型**：全球支付網路（NYSE: MA）
- **創立**：1966 年（Interbank Card Association 前身）
- **總部**：美國紐約州帕切斯
- **核心業務**：全球卡支付清算網路；跨境支付；數位支付創新

## Agentic Payments 策略：Agent Pay

### 發布

**Mastercard Agent Pay** 於 2025-04 正式發布，由兩個技術支柱組成：**Agentic Token** 和 **Verifiable Intent**。

2025 Q4：CEO Michael Miebach 確認網絡上完成首筆 agentic 交易。

### Agentic Token

**Agentic Token** 是傳統支付 token 的 AI agent 延伸：
- 單張實體卡可為不同 AI agent 各自發行獨立 token（ChatGPT token、Gemini token、Perplexity token 各自獨立）
- 每個 token 在發行時可設定細粒度限制：
  - **類別限制**：僅限「生鮮食品」、「機票」等
  - **金額上限**：每月 $500 封頂
  - **時段限制**：僅限工作日
- 當 agent 嘗試使用 token 時，網路在 token 層執行限制，無需商家或 agent 自己判斷
- **首批發行行**：Citi、US Bank

### Verifiable Intent

**Verifiable Intent** 是與 Google 共同開發的開放標準，提供 agentic 交易的信任基礎。

**核心理念**：為每筆 AI agent 代勞的交易建立「用戶身份 × 原始指令 × 交易結果」三元不可竄改記錄。

**技術規格**：
- 格式：**SD-JWT**（Selective Disclosure JWT）+ Key Binding
- 構成分層委任鏈（delegation chain）：身份 → 意圖 → 行動
- **Layer 1**：由發行方（issuer）簽發、放入憑證提供者錢包，將用戶身份綁定公鑰（`cnf.jwk`）
- 演算法：ES256；憑證效期約一年；發行方金鑰透過 JWKS 發現
- 選擇性披露（Selective Disclosure）：各方只取得最小必要資訊
- **開放標準基礎**：FIDO Alliance、EMVCo、IETF、W3C

**對齊協議**：Google AP2 + Universal Commerce Protocol (UCP)；設計為 protocol-agnostic（不綁定特定支付 protocol）

### 生態合作

| 合作方 | 角色 |
|---|---|
| Google | Verifiable Intent 共同開發；AP2 標準對齊 |
| OpenAI | 早期合作夥伴（2025 Agent Pay 宣布時）|
| Microsoft | 初始合作夥伴 |
| IBM | 初始合作夥伴 |
| PayPal | 整合 Agent Pay（Q4 2025）|
| Citi | 首批 Agentic Token 發行行 |
| US Bank | 首批 Agentic Token 發行行 |

## 定位

Mastercard 的 agentic 策略是在現有卡網路基礎上建立 **信任與授權層**，而非取代支付結算層。Agentic Token 提供細粒度授權控制，Verifiable Intent 提供可審計的意圖記錄 — 兩者結合使傳統卡支付在 AI agent 時代依然可用，且合規性優於 crypto-native 方案。

## 相關頁面

- [[concepts/agentic-payment-protocols]] — 五大協議全景比較（含 Mastercard 定位）
- [[concepts/agentic-payments]] — AI agent 自主支付框架
- [[entities/visa]] — 競爭對手的 Intelligent Commerce / TAP 策略
- [[entities/stripe]] — 支付基礎設施夥伴

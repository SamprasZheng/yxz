---
type: concept
tags: [ai-agents, payments, automation, machine-to-machine, stablecoin, agentic-commerce]
---

# Agentic Payments（代理人自動支付）

## 定義

**Agentic payments** 指 AI agents 在無需人工授權的前提下，自主發起、完成金融交易的能力。隨著 LLM-based agents 逐漸能夠執行多步驟任務，支付能力成為 agent「真正自主行動」的關鍵缺口之一。

## 為何重要

傳統 AI agent 在遇到付費資源時必須停下來詢問人類，打斷自動化流程。Agentic payments 解決了：

1. **付費 API 存取**：agent 自動支付每次 API 呼叫
2. **計算資源購買**：agent 自主購買 GPU 時間、儲存空間
3. **跨 agent 交易**：多個 AI agents 組成的工作流中，上游 agent 自動付款給下游 agent
4. **內容與資料購買**：無需人工授權即可存取付費資料

## 技術實現方式

### 協議層（2026 年全景）

2025–2026 年間，五個主要協議湧現，各自覆蓋不同場景：

| 協議 | 發起方 | 定位 |
|---|---|---|
| [[concepts/x402-protocol]] | Coinbase | HTTP-native stablecoin M2M 支付（V2: 2025-12）|
| ACP | OpenAI + Stripe | 法幣 Merchant Checkout 流程 |
| AP2 | Google | 授權信任框架（Mandate），payment-agnostic |
| MPP | Stripe + Tempo | Session 式連續微支付（2026-03）|
| L402 | Lightning Labs | Bitcoin Lightning HTTP 微支付（2020 起）|

詳細比較見 [[concepts/agentic-payment-protocols]]。

### 帳戶/錢包層
- Agent 持有自己的 on-chain wallet（通常是 EVM 地址）
- 使用 MPC wallet 或 smart contract wallet 管理私鑰
- 以 USDC 等 stablecoin 作為記帳單位，避免價格波動

### 限制/授權層
- Spending limits：設定 agent 每日/每筆最大支出
- Allowlist：只允許對白名單地址付款
- Human-in-the-loop 閾值：超過金額需要人工確認

## 應用場景

| 情境 | 描述 |
|---|---|
| Research agent | 自動購買付費學術論文、市場報告 |
| Trading agent | 購買即時報價資料 feed，執行鏈上 swap |
| Compliance agent | 按需購買 KYC/AML 查詢 |
| Coding agent | 付費呼叫 premium LLM API（GPT-5、Claude Opus 等）|
| Content agent | 購買圖片版權、音樂授權 |
| Multi-agent pipeline | Agent A 完成任務後自動向 Agent B 付費取得結果 |

## 主要生態參與者（2025–2026）

### Crypto-native 陣營
- **Coinbase**（x402）：HTTP-native stablecoin 支付，V2 2025-12 發布，1 億筆累積
- **Lightning Labs**（L402）：Bitcoin Lightning，2020 起生產運行，2026-02 釋出 AI agent 工具集

### 傳統支付大廠
| 公司 | 方案 | 發布時間 | 核心創新 |
|---|---|---|---|
| [[entities/stripe]] | MPP + ACP + Agentic Commerce Suite | 2025-09 / 2026-03 | 同時押注 fiat + crypto |
| PayPal | Agent Ready + Store Sync | 2025-10 | 百萬商家零技術接入 |
| [[entities/visa]] | Intelligent Commerce + TAP | 2025-10 | RFC 9421 簽名 HTTP 訊息 |
| [[entities/mastercard]] | Agent Pay（Agentic Token + Verifiable Intent）| 2025-04 | Per-agent token + SD-JWT 授權記錄 |

### 科技平台
- **Google**（AP2）：60+ 夥伴，Mandate 授權框架，2025-09-17
- **OpenAI**（ChatGPT Instant Checkout via ACP）：與 Stripe 共同規格，2026-02 上線

## Agentic Commerce 規模預測

- McKinsey（2025）：agentic commerce 到 2030 年媒介 $3–5 兆美元；僅美國 B2C 零售最多 $1 兆
- 2026 年全球 agentic commerce 交易額：$80 億美元
- 2031 年預估：$3.5 兆美元
- Visa 預測：2026 假日購物季前，數百萬消費者將使用 AI agent 完成購物

## 關鍵挑戰

1. **錢包安全**：agent 持有私鑰或授權的安全模型
2. **費用失控風險**：agent 被攻擊或邏輯錯誤導致大量失控支出
3. **監管合規**：stablecoin 支付的各國法規差異
4. **需求驗證**：目前（2026 Q1）x402 真實交易量僅 $28,000/日，商業模式尚待驗證
5. **協議碎片化**：x402 / ACP / AP2 / MPP / L402 同時存在，開發者選擇複雜

## 相關頁面

- [[concepts/x402-protocol]] — 最主要的 crypto-native 技術標準
- [[concepts/agentic-payment-protocols]] — 五大協議全景比較
- [[sources/x402-protocol-coinbase-2025]] — 詳細資料來源
- [[entities/coinbase]] — x402 發起者
- [[entities/stripe]] — MPP + ACP 共同發起者
- [[entities/visa]] — Intelligent Commerce / TAP
- [[entities/mastercard]] — Agent Pay / Verifiable Intent
- [[concepts/xcm]] — Polkadot 跨鏈 M2M 訊息（相關領域）

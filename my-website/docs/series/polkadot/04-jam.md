---
sidebar_position: 4
title: 3️⃣ 下一代架構 — JAM
---

# 3️⃣ 下一代架構 — JAM

**→ 閱讀主文：[JAM — 可擴展無需信任虛擬機](/blog/JAMintro)**

## 這一篇要帶走的

1. **JAM（Join-Accumulate Machine）** 是 Polkadot 的下一代中繼鏈設計，取代目前的 Relay Chain。
2. 結合 Ethereum 的智能合約通用性與 Polkadot 的**異構分片**可擴展性。
3. 目標吞吐量 **850 MB/s**（理論 > 340 萬 TPS），遠超 Ethereum 2.0（1.3 MB/s）與 Sui/Aptos（100 MB/s）。
4. **異步交互模型**：訊息與代幣在同一個 6 秒執行週期內完成發收，但沒有即時返回路徑 — 這是換取性能的設計選擇。

## 關鍵技術點

- **Join 與 Accumulate 在鏈上執行**；**Collect 與 Refine 在鏈下完成** → 減少鏈上計算負擔
- 使用 **Coretime** 作為類似 Gas 的計算資源指標
- 規劃 **350 個 JAM 核心** × 每核 6 秒執行 × 每核輸入 5 MB

## 讀完之後再看

往上把視野拉大到整合性文章：

- [2026 Tech Roadmap](/blog/space-ai-rf-crypto-roadmap-2026) — Polkadot 在 AI × Space × RF 四個戰場的位置

或回去複習治理哲學：

- [多元宇宙 Plurality × OpenGov](/blog/Plurality)

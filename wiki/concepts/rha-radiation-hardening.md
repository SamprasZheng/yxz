---
type: concept
tags: [rf-hardware, space, radiation, cots, qualification, taiwan, leo, supply-chain]
---

# RHA — 輻射硬化保證（Radiation Hardness Assurance）

確保太空元件在任務輻射環境下維持規格性能的**系統性工程流程**，涵蓋需求定義、元件篩選、測試驗證、設計裕度管理。對台灣 LEO 供應鏈而言是進入正式星座供應鏈的隱性認證門檻。

## 輻射設計裕度（RDM，Radiation Design Margin）

RHA 最核心的安全指標：

```
RDM = 元件失效劑量 / 任務預期累積劑量
```

**範例**：元件在 100 krad(Si) 失效，任務預期劑量 60 krad(Si) → RDM = 1.67（67% 緩衝）

| 任務類型 | 最低 RDM 要求 |
|---|---|
| 一般商業 LEO | 1.5 |
| 政府/軍用 LEO | 2.0 |
| 深空探測 | 2.0–3.0 |

## 測試層級

| 層級 | 說明 |
|---|---|
| **元件級（Part Level）** | 個別元件 TID / SEE 特性測試，建立失效曲線 |
| **板級（Board Level）** | 考量元件交互效應與屏蔽效果 |
| **系統級（System Level）** | 模擬任務剖面，驗證整機表現 |

## COTS 元件挑戰與「上篩選（Upscreening）」

商業 LEO 星座（Starlink、Kuiper 等）大量採用商用現貨（COTS）元件降低成本，但 COTS 無輻射保證 → 需要**上篩選**作為中間步驟：

**上篩選流程**：
1. 採購商業元件批次（lot）
2. 執行 TID / SEE 測試（抽樣）
3. 確認批次是否符合任務 RDM 要求
4. 建立元件輻射資料庫（lot traceability 很重要，不同批次可能有差異）

**挑戰**：
- COTS 製造商不提供輻射資料，批次間差異大
- 先進製程（<28nm）節點行為複雜，傳統測試模型不適用
- 成本：每元件完整 TID + SEE 測試費用可達數千至數萬美元

## 新興替代測試源：90Sr/90Y 電子源

傳統 Co-60 設施稀少且昂貴，**90Sr/90Y β 電子源**正被評估為 TID 替代測試工具：

| 特性 | Co-60 | 90Sr/90Y |
|---|---|---|
| 輻射類型 | γ（1.2–1.3 MeV） | β 電子（最大 2.28 MeV） |
| 優勢 | 均勻穿透、標準合規 | 可方向性照射；設備小型化；成本低 |
| 特殊優勢 | — | <28nm 節點 FPGA 測試有特殊適用性 |
| 標準地位 | 現行 MIL-STD 標準 | 評估中，尚未完全標準化 |

## 台灣 LEO 供應鏈的隱性門檻

> 無論硬體設計多優，未經完整 TID/SEE 驗證，無法進入正式星座供應鏈。

**現狀**：
- 全球具備完整重離子 + Co-60 測試能力的機構極少（LBNL、TRIUMF、GANIL、GSI、HIRFL 等）
- 亞洲測試能力相對薄弱，台灣廠商需赴海外測試，增加時間與成本
- 穩懋（[[entities/win-semiconductors]]）、昇達科（[[entities/ascend-tech]]）等已進入 Starlink/Kuiper 鏈的廠商必已完成部分輻射認證，但細節屬商業機密

**機會**：建立台灣本地 TID/SEE 測試能力是台灣太空產業縱向整合的關鍵缺口，目前幾乎空白。

## 與 [[concepts/leo-value-chain]] 的連結

輻射認證是所有進入中游 A（衛星製造）的上游元件的**隱性入場券**，對台灣競爭力地圖的解讀應增補此維度：

| 環節 | 台灣存在感 | 輻射認證要求 |
|---|---|---|
| 上游 RF PA（穩懋） | ★★★★★ | 必須通過 TID；已認證（推測） |
| 上游濾波器（昇達科） | ★★★★★ | 必須通過 TID + 部分 SEE；已認證（推測） |
| 中游 A PCB（華通） | ★★★★★ | 基板材料 TID 要求；認證狀況未知 |
| **在台測試基礎設施** | **★☆☆☆☆** | **結構性空白 → 機會** |

## 相關

- [[concepts/tid-total-ionizing-dose]]
- [[concepts/see-single-event-effects]]
- [[sources/space-radiation-tid-see-2025]]
- [[concepts/leo-value-chain]]
- [[entities/win-semiconductors]]
- [[entities/ascend-tech]]

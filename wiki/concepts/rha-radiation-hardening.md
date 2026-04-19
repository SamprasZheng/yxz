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

**現狀（2025 年更新）**：

> ⚠️ **修正**：此前評估台灣測試基礎設施「幾乎空白」，實際情況已有改善。詳見 [[concepts/taiwan-radiation-test-ecosystem]]。

- 全球具備完整重離子 + Co-60 測試能力的機構極少（LBNL、TRIUMF、GANIL、GSI、HIRFL 等）
- 台灣自 **2020 年**起建立「太空輻射測試聯盟」（NSPO 主導，長庚、清大、中研院），提供質子 SEE + TID 測試
- **2022 年 9 月**：NSPO × 台大醫院癌症中心 MoU，超導回旋加速器質子束於 **2023 年**起可供 SEE 測試
- INER（核能研究所）負責 Co-60 TID 測試
- **仍缺**：重離子 SEE（LET > 10 MeV·cm²/mg）——台灣製造商此部分仍須赴 LBNL/TRIUMF
- 穩懋（[[entities/win-semiconductors]]）、昇達科（[[entities/ascend-tech]]）等已進入 Starlink/Kuiper 鏈的廠商必已完成部分輻射認證，但細節屬商業機密

## 主要商業測試實驗室（全球）

| 機構 | 地點 | 能力 | 特點 |
|---|---|---|---|
| **LBNL BASE** | 美國柏克萊 | 質子 + 全系列重離子（到鉍）| LET > 99 MeV·cm²/mg；1979 年首創 |
| **TRIUMF** | 加拿大溫哥華 | 質子 + 重離子 | 北美第二大 |
| **GANIL** | 法國卡昂 | 重離子 | ESA 主要合作夥伴 |
| **GSI/FAIR** | 德國達姆施塔特 | 重離子 | 歐洲最高能量 |
| **TRAD（Toulouse）** | 法國 | Co-60 + Cf + Am + 低能質子 + 脈衝雷射 | 1994 年成立；隸屬 3D Plus/HEICO；客戶含 Airbus DS、Thales、ESA、NASA；軟體工具 OMERE |
| **Zero-G Radiation Assurance** | 美國 | Co-60 TID + 重離子 + 質子 SEE | >6000 筆 COTS 輻射資料庫；SmallSat 生態系主力商業實驗室；>20 年 NASA 商業計畫經驗 |
| **JPL 輻射效應中心** | 美國帕薩迪納 | 全系列 | NASA 政府用；部分接受商業客戶 |
| **BNL NASA NSRL** | 美國布魯克黑文 | 重離子（太空模擬） | 生物 + 電子雙用 |

**Zero-G 的 COTS 資料庫**是商業 New Space 最重要工具之一：超過 6000 筆以 COTS 和車用級元件為主的輻射測試紀錄，可在正式測試前預篩選元件，大幅節省成本。

## 與 [[concepts/leo-value-chain]] 的連結

輻射認證是所有進入中游 A（衛星製造）的上游元件的**隱性入場券**，對台灣競爭力地圖的解讀應增補此維度：

| 環節 | 台灣存在感 | 輻射認證要求 |
|---|---|---|
| 上游 RF PA（穩懋） | ★★★★★ | 必須通過 TID；已認證（推測） |
| 上游濾波器（昇達科） | ★★★★★ | 必須通過 TID + 部分 SEE；已認證（推測） |
| 中游 A PCB（華通） | ★★★★★ | 基板材料 TID 要求；認證狀況未知 |
| **在台測試基礎設施** | **★★☆☆☆** | **TID + 質子 SEE 已建立；重離子 SEE 仍缺** |

## 相關

- [[concepts/tid-total-ionizing-dose]]
- [[concepts/see-single-event-effects]]
- [[concepts/taiwan-radiation-test-ecosystem]] — 台灣測試生態系詳細頁面
- [[sources/space-radiation-tid-see-2025]]
- [[concepts/leo-value-chain]]
- [[entities/win-semiconductors]]
- [[entities/ascend-tech]]

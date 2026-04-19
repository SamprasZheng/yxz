---
type: source
title: "太空輻射環境深度解析：TID、SEE 與 RHA 輻射硬化保證"
author: user-provided synthesis
date: 2026-04-19
ingested: 2026-04-19
tags: [rf-hardware, space, radiation, tid, see, rha, cots, taiwan, leo]
---

# 太空輻射環境深度解析：TID、SEE 與 RHA

用戶提供的系統性技術分析，涵蓋太空輻射三大來源、TID 累積損傷機制、SEE 瞬態效應分類、測試設施與方法，及商業 COTS 元件的 RHA 挑戰。關鍵結論：輻射測試認證是台灣 LEO 供應鏈進入正式星座供應鏈的隱性門檻。

---

## 一、輻射環境三大源頭

| 源頭 | 特性 | 主要威脅 |
|---|---|---|
| **GCR（銀河宇宙射線）** | 超新星加速高能重粒子；能量極高，幾乎無法屏蔽 | SEE（重粒子直接游離） |
| **范艾倫輻射帶捕獲粒子** | 內帶質子是 LEO 最重要 SEU 源；SAA（南大西洋異常區）為凹陷高暴露區 | TID 累積 + SEE |
| **太陽粒子事件（SPE）** | 爆發性、劑量率高；深空任務最大威脅 | TID 峰值 + SEL 風險 |

---

## 二、TID（總電離劑量）

見 [[concepts/tid-total-ionizing-dose]]

核心機制：高能光子/粒子穿過 SiO₂ 氧化層，產生電子-電洞對，電洞被缺陷捕獲 → 閾值電壓漂移、漏電流增大、類比元件增益下降。

**Co-60 γ 源**是標準測試選擇（1.172 / 1.332 MeV γ ray；半衰期 5.3 年；HDR 最大 150 rad(Si)/s；量測不確定度 <3%；MIL-STD-883 TM1019 合規）。

**ELDR（低劑量率增強）效應**：雙極元件在低劑量率下劣化可能比高劑量率更嚴重 → 不能只做加速 HDR 測試，必須進行任務等效的 ELDR 測試。

---

## 三、SEE（單粒子效應）分類

見 [[concepts/see-single-event-effects]]

### 軟錯誤（可恢復）

| 類型 | 全名 | 機制 | 特點 |
|---|---|---|---|
| **SEU** | Single Event Upset | 粒子翻轉記憶體位元 | SRAM 快取最脆弱（尺寸小、Qcrit 低） |
| **SET** | Single Event Transient | 粒子在類比/時序電路產生電壓脈衝 | 深次微米 CMOS 高速邏輯威脅增大 |
| **SEFI** | Single Event Functional Interrupt | 擊中 FPGA 配置記憶體 → 功能異常 | 需電源重置才能恢復 |

**現實案例（2025-10-30）**：JetBlue 客機飛行中突然下墜，Airbus 調查確認為強烈太陽輻射/宇宙射線造成位元翻轉，導致飛控系統誤動作。

### 硬錯誤（破壞性，不可恢復）

| 類型 | 全名 | 機制 |
|---|---|---|
| **SEL** | Single Event Latchup | CMOS 寄生 PNPN 結構觸發低阻抗短路 → 電流急增 → 燒毀（須立即切電）|
| **SEB** | Single Event Burnout | 功率 MOSFET 二次崩潰 → 不可逆損毀 |
| **SEGR** | Single Event Gate Rupture | 閘極氧化層擊穿 → 永久失效 |

**測試順序原則**：SEL 測試應先於 SEU 測試——若元件閂鎖即不適用，無需浪費後續測試資源。

---

## 四、SEE 測試設施與方法

**重離子優先**：游離能力遠強於質子，直接揭示元件 SEE 脆弱性。

**LBNL BASE（Berkeley Accelerator Space Effects）**：1979 年全球首次 SEE 重離子測試場地；提供質子到鉍全系列；LET 可超過 99 MeV·cm²/mg。

**核心量測參數：截面（Cross Section）**
- 定義：翻轉事件數 ÷ 粒子通量；單位 cm²
- SEU 速率計算流程：量測截面對 LET 曲線 → 確定敏感體積 → 與軌道 LET 頻譜積分

**質子的間接效應**：質子本身 LET 太低無法直接造成 SEU，透過與高 Z 材料核反應產生高 LET 次生離子間接觸發 SEE。

---

## 五、RHA 輻射硬化保證 × COTS 挑戰

見 [[concepts/rha-radiation-hardening]]

**輻射設計裕度（RDM）**：
- 公式：RDM = 元件失效劑量 / 任務預期累積劑量
- 一般任務要求：RDM ≥ 1.5（即 50% 安全緩衝）
- 深空任務要求：RDM ≥ 2.0

**台灣 LEO 供應鏈的隱性門檻**：
無論硬體設計多優，未經完整 TID / SEE 驗證，無法進入正式星座供應鏈（SpaceX、Amazon Kuiper 等）。全球具備完整測試能力的機構極少，屬高度壟斷的關鍵節點。

**新興替代測試源**：90Sr/90Y 電子源正被評估（優點：可方向性照射；設備簡化；在 <28nm 節點 FPGA 測試有特殊優勢）。

---

## 概念頁面

- [[concepts/tid-total-ionizing-dose]]
- [[concepts/see-single-event-effects]]
- [[concepts/rha-radiation-hardening]]

## 相關實體

- [[entities/win-semiconductors]] — GaAs PA，需通過 TID 驗證
- [[entities/ascend-tech]] — 濾波器/波導管，LEO 規格需輻射測試
- [[concepts/leo-value-chain]] — 輻射測試認證為進入中游 A 的隱性門檻
- [[concepts/orbital-data-center]] — COTS GPU 輻射防護是最大工程挑戰

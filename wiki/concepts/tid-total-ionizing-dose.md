---
type: concept
tags: [rf-hardware, space, radiation, semiconductor, testing, mil-std]
---

# TID — 總電離劑量效應（Total Ionizing Dose）

太空輻射對半導體造成的**累積型損傷**，是衛星元件可靠性的基礎認證項目之一。與 [[concepts/see-single-event-effects]]（瞬態型）並列為太空輻射兩大主要威脅。

## 損傷機制

高能光子或帶電粒子穿過元件的 **SiO₂ 氧化層**，產生電子-電洞對。電子移動速度快可逸出，但**電洞移動慢**，容易被氧化層中的缺陷位點捕獲，形成固定正電荷。

長期累積效應：
- **MOSFET**：閾值電壓（Vth）漂移（N-MOS 負向、P-MOS 正向）
- **類比/線性電路**：增益下降、偏置電流漂移
- **雙極元件**：放大倍數（hFE）退化；有 ELDR 特殊效應（見下）
- **介面態生成**：氧化層-矽介面產生缺陷 → 遷移率下降、1/f 雜訊增大

## 劑量單位

- **rad(Si)**：矽材料中的吸收劑量，1 rad = 0.01 J/kg
- **krad(Si)**：常用工程單位；典型 LEO 任務壽命劑量：20–100 krad(Si)（視高度、傾角、屏蔽厚度）

## 標準測試方法：Co-60 γ 源（MIL-STD-883 TM1019）

| 參數 | 規格 |
|---|---|
| 輻射源 | Co-60；γ ray 能量 1.172 / 1.332 MeV |
| 半衰期 | 5.3 年（需定期活度校正） |
| 優勢 | γ 射線穿透力強，均勻照射整個元件；樣品夾具材料幾乎不影響輻射場 |
| 劑量率（HDR） | 最大 ~150 rad(Si)/s |
| 量測不確定度 | ≤3% |
| 適用標準 | MIL-STD-883 TM1019、MIL-STD-750 TM1019 |

## ELDR 效應（Enhanced Low Dose Rate Sensitivity）

雙極（Bipolar）線性電路的特殊陷阱：

> 在**低劑量率（ELDR）**條件下，雙極元件的 TID 劣化程度可能**比高劑量率更嚴重**。

原因：低劑量率下有更多時間讓氧化層電洞擴散至 Si/SiO₂ 介面並被捕獲，造成更多介面態。

**測試含義**：不能只做加速的高劑量率（HDR）測試，必須進行任務等效劑量率（通常 0.01–10 mrad(Si)/s）的 ELDR 測試。對太空任務的線性 IC、運算放大器、比較器至關重要。

## 輻射設計裕度（RDM）

見 [[concepts/rha-radiation-hardening]]

## 與 SEE 的差異

| | TID | SEE |
|---|---|---|
| 損傷類型 | 累積 | 瞬間 |
| 觸發粒子 | 任何游離輻射（劑量積分） | 單一高能粒子 |
| 可恢復性 | 不可逆（累積） | 部分可恢復（SEU/SEFI）；部分不可逆（SEL/SEGR） |
| 主要測試源 | Co-60 γ | 重離子加速器、質子加速器 |

## 相關

- [[concepts/see-single-event-effects]]
- [[concepts/rha-radiation-hardening]]
- [[sources/space-radiation-tid-see-2025]]
- [[concepts/leo-value-chain]] — TID 認證是進入星座供應鏈的門檻

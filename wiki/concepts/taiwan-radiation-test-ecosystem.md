---
type: concept
tags: [taiwan, radiation, testing, space, leo, infrastructure, cots, qualification]
---

# 台灣太空輻射測試生態系（Taiwan Space Radiation Test Ecosystem）

台灣在 2020–2023 年間建立了初步的太空元件輻射測試能力，核心是 NSPO 主導的聯盟架構。雖仍不具備完整的重離子 SEE 測試能力，但質子 SEE 和 Co-60 TID 已在國內可行。

> ⚠️ **更新現有評估**：[[concepts/rha-radiation-hardening]] 頁面描述台灣測試基礎設施為「幾乎空白（★☆☆☆☆）」，此評估需要修正——台灣自 2020 年起已建立初步測試聯盟，並於 2023 年起新增質子治療機質子束 SEE 測試能力，正確評估應為「**部分建立中（★★☆☆☆）**，重離子仍缺」。

## 台灣太空輻射測試聯盟（Taiwan Space Radiation Testing Consortium）

**成立時間**：2020 年

**主導機構**：NSPO（國家太空中心）

**創始成員及能力**：

| 機構 | 測試能力 | 輻射源 |
|---|---|---|
| **長庚紀念醫院（Chang Gung Memorial Hospital）** | 質子 SEE 測試（主力） | 質子治療加速器 |
| **國立清華大學（NTHU）** | 材料/元件輻射特性研究 | 核反應器 + 加速器 |
| **中央研究院（Academia Sinica）** | 粒子偵測 + 分析支援 | — |

## NSPO × 台大醫院癌症中心合作備忘錄（2022）

**簽署日期**：2022 年 9 月 30 日

**合作內容**：台大醫院癌症中心提供超導回旋加速器（superconducting cyclotron）和高解析鉛筆束掃描（pencil beam scanning）技術供太空元件輻射測試。

**設備亮點**：
- 超導回旋加速器：可提供高能質子束（質子占宇宙射線高能粒子 90%）
- FLASH 超高劑量率（ultra-high dose rate）束流能力（醫療用，兼具測試加速潛力）
- 預計 **2023 年投入運作**

**戰略意義**：在此之前，台灣製造商必須將電子元件送往海外（歐洲、美國）進行輻射測試，增加時間和成本；此合作將質子 SEE 測試能力帶回台灣。

## 現有台灣測試能力地圖

| 測試類型 | 能力狀態 | 機構 |
|---|---|---|
| TID（Co-60 γ） | ✅ 具備 | INER（核能研究所） |
| 質子 SEE | ✅ 具備（2023 起） | 長庚 CGMH + 台大癌症中心 |
| 重離子 SEE | ❌ **不具備** | 需赴 LBNL、TRIUMF、GANIL |
| 電子輻照 | ⚠️ 評估中 | — |

## 結構性缺口：重離子 SEE

重離子測試（LET > 10 MeV·cm²/mg）仍是台灣**唯一不具備的關鍵能力**。完整的 SEL、SEU 截面曲線必須赴：
- **LBNL BASE**（美國柏克萊，全球最完整，LET > 99 MeV·cm²/mg）
- **TRIUMF**（加拿大溫哥華）
- **GANIL**（法國）
- **GSI/FAIR**（德國）

對於同時需要 TID + 質子 SEE + 重離子 SEE 的完整 RHA 認證，台灣廠商仍需至少一趟海外行程（重離子），但 TID 和質子部分已可在台灣完成，降低了整體測試成本和排程壓力。

## 對台灣 LEO 供應鏈的影響

1. **短期（2023–2026）**：穩懋、昇達科等已進入 Starlink/Kuiper 鏈的廠商，TID + 質子 SEE 可在台灣完成，重離子仍需外送。相比以往全部外送，成本和排程改善明顯。

2. **中期機會**：若台灣建立重離子加速器（需百億新台幣級投資），可完整本地化 RHA 認證——目前未見此投資計畫。

3. **競爭定位**：與韓國（KAERI 有重離子能力）、日本（HIMAC、RIKEN）相比，台灣質子 SEE 已追上，但重離子仍落後。

## 相關

- [[concepts/rha-radiation-hardening]] — ⚠️ 台灣基礎設施評估已更新：從空白修正為部分建立
- [[concepts/tid-total-ionizing-dose]]
- [[concepts/see-single-event-effects]]
- [[concepts/leo-value-chain]]
- [[entities/win-semiconductors]]
- [[entities/ascend-tech]]

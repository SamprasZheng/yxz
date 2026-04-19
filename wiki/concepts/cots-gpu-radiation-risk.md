---
type: concept
tags: [space, radiation, cots, gpu, leo, see, tid, ai, orbital-data-center]
---

# COTS GPU 在軌輻射風險（COTS GPU Radiation Risk in LEO）

現代 AI GPU（NVIDIA H100、Jetson AGX Orin 等）以 COTS 形式部署至 LEO，面臨兩類主要輻射威脅：TID 累積損傷和 SEE 單粒子效應。本頁匯整 2025 年已知測試數據和工程緩解策略。

## 風險概況：為何 GPU 特別脆弱

| 特性 | 輻射影響 |
|---|---|
| **先進製程節點（4–7nm）** | Qcrit 極低，SEU 截面增大；TID 閾值漂移更敏感 |
| **高密度 SRAM 快取** | L1/L2 快取是 SEU 最脆弱節點 |
| **HBM 記憶體（HBM2e/HBM3）** | DRAM 本身無內建 ECC，需依賴控制器 ECC |
| **無 SEL 保護（COTS）** | 不含 SEL guard ring；功率狀態下閂鎖即損毀 |
| **高功耗（300–700W）** | 帶電粒子激活導致 SEB 風險更高 |

## NVIDIA H100（HBM3）輻射特性

**ECC 保護（軟體層面）**：
- 架構：SEC-DED（單位元錯誤糾正、雙位元錯誤偵測）
- 覆蓋範圍：HBM3 記憶體、L2 快取、L1 快取與暫存器檔案、內部資料路徑
- 功能：可即時偵測並糾正單位元翻轉（SEU）

**致命弱點（無保護）**：
- **TID（總電離劑量）**：無硬化，4nm 製程氧化層薄，但氧化層越薄反而 TID 耐受性相對較佳（此點與直覺相反）
- **SEL（單粒子閂鎖）**：無保護，COTS CMOS 含寄生 PNPN 結構
- **SEGR（閘極破裂）**：無保護

> **2025 年分析結論**（New Space Economy）：H100 的 ECC 是針對地面低階輻射設計，不足以對抗太空輻射強度下的硬性 SEE（SEL/SEGR）事件。在無外部 SEL 偵測切斷機制下，H100 不適合直接暴露於 LEO 輻射環境。

## Aitech S-A2300：NVIDIA Orin COTS AI 超算（2025 年測試數據）

**系統架構**：
- SoC：NVIDIA Jetson AGX Orin Industrial（12 核 ARM + 2048 CUDA + 64 Tensor Core）
- 記憶體：64 GB LPDDR5 ECC RAM
- AI 效能：248 TOPS

**TID 測試結果**（MIL-STD-883 TM1019，2025 年 5 月 6 日）：

| 測試條件 | 結果 |
|---|---|
| 輻射源 | Co-60 γ 射線，2815 rad/min（HDR） |
| 累積劑量 | 0 → 10 krad(Si)（每 5 krad 遞增） |
| 裸機（無屏蔽）結果 | 全功能通過（NVMe、eMMC、乙太網、UART/GPIO、FPGA、CPU/GPU 壓力測試） |
| 帶鋁屏蔽（200–300 mil，5–7.5 mm）| 屏蔽使 TID 減半 → 等效壽命劑量 20 krad(Si)，符合典型 LEO 任務 |
| 設備溫度 | ~33°C（22V DC 供電） |

**缺口**：S-A2300 測試報告**不含 SEE（SEU/SEL）測試數據**，TID-only 認證不足以支持高可靠性任務。質子 SEE 測試尚未公開發表。

## Starcloud 系列：H100 實際在軌（2025）

**Starcloud V1（2025 年 11 月）**：全球首次 H100 GPU 送入 LEO 軌道測試。

**緩解策略（推測，未公開確認）**：
- 外部 SEL 偵測電路（監控電流，觸發閂鎖即切電）
- 氫富材料屏蔽（降低二次粒子通量）
- 浸沒式冷卻液（有機氫化合物對宇宙射線次生粒子有額外衰減）
- 軟體層 ECC + 應用層錯誤重試機制
- 任務期較短（實驗性部署，非 5 年商業任務）

> **資料缺口**：SpaceX / Starcloud 未公開在軌 SEU 率、實際 TID 劑量或 SEL 事件數量。此為 LEO AI 計算最重要的未知數。

## 軟錯誤率（SER）：地面 vs. 高空 vs. LEO

| 環境 | 宇宙射線中子通量（相對值） | SER 倍增因子（相對地面）|
|---|---|---|
| 地面（海平面） | 1× | 1× |
| 山頂（~1.6 km，Boulder CO） | ~3× | ~3× |
| 航空（10 km 高空） | 100–300× | 100–300× |
| LEO（550 km，中傾角） | GCR 仍存在；Van Allen 帶部分屏蔽 | 數百至數千倍（視傾角） |

> **關鍵補充**：在 LEO，大氣不再提供宇宙射線屏蔽，但地球磁場（磁截止剛度）仍提供保護，保護效果與傾角成反比——赤道傾角（Starlink 約 53°）比極軌（90°）暴露量低。

## 商業緩解路徑比較

| 方法 | 成本 | 保護 TID | 保護 SEU | 保護 SEL | 適用場景 |
|---|---|---|---|---|---|
| 純 COTS（無任何緩解） | 最低 | ❌ | ❌ | ❌ | 短期實驗性任務 |
| 鋁屏蔽（200–300 mil） | 低 | ✅（部分） | ❌ | ❌ | LEO <3 年，非關鍵應用 |
| ECC + 軟體重試 | 低（軟體） | ❌ | ✅（軟） | ❌ | 低可靠性 AI 推論 |
| SEL 偵測切電電路 | 中 | ❌ | ❌ | ✅ | 防止硬毀，必備 |
| 完整系統級（屏蔽+ECC+SEL保護+scrubbing） | 中高 | ✅ | ✅ | ✅ | 3–5 年 LEO 商業任務 |
| Rad-hard GPU（如 Aitech SP-A series） | 高 | ✅ | ✅ | ✅ | 政府/軍用/深空 |

## 相關

- [[concepts/see-single-event-effects]] — SEU/SEL 基礎機制
- [[concepts/tid-total-ionizing-dose]] — TID 損傷機制
- [[concepts/rha-radiation-hardening]] — RDM 要求與 COTS 上篩選
- [[concepts/orbital-data-center]] — ODC 工程挑戰整體框架
- [[concepts/solar-cycle-25-leo-radiation]] — SC25 峰值對 GPU 在軌風險的加乘
- [[sources/space-radiation-tid-see-2025]]

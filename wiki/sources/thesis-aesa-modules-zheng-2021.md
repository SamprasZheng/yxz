---
type: source
title: "Design and Verification on Modules of AESA（相位陣列內部模組設計與驗證）"
author: Yi-Xiang Zheng (鄭亦翔)
date: 2021-01-01
ingested: 2026-04-19
tags: [rf, aesa, phased-array, radiation, space, leo, dpd, nctu]
---

# Design and Verification on Modules of AESA

**作者**：鄭亦翔 (Yi-Xiang Zheng / Sampras Zheng)
**指導教授**：王毓駒、陳柏宏（國立交通大學電子研究所）
**合作機構**：創未來科技（Tron Future Tech）、國家太空中心（NSPO）
**發表**：碩士論文，NCTU，2021 年 1 月

---

## 摘要

基於 SWAP（Size, Weight and Power）限制已被突破的全數位 AESA 設計。
應用場景：風電市場鳥擊監測、LEO 衛星通訊（與 NSPO 合作）。
主要貢獻：S-band AESA 模組設計（PLL、光學轉接、電力供應）+ X-band 傳輸器可靠度測試（TID/SEE/熱測試）+ DPD PA 線性化 + 8-way power divider。

---

## Chapter 2: S-band AESA (Tron Future Tech S-Family)

產品型號：S-108A / S-116A / S-132A

**規格**：
- 頻率：2.9–3.1 GHz（S-band）
- 信號頻寬：50 MHz
- 功能：監視/追蹤（無人機、鳥類）、機場、風電場
- 架構：全數位 AESA，Frontend + Cooling + Tier-1（FPGA）+ Power Box

**模組設計：**

### PLL 模組
- 低相位雜訊頻率合成器 + 低抖動石英振盪器
- RF 中心頻率 3 GHz，輸出功率 −5 to +5 dBm
- 高速資料傳輸 5 Gbps
- 具光纖升級空間（optical-transmission ready）

### 光學轉接板（OA v2）
- 負責 T1↔T2 通訊橋接
- v2 改進：Samtec 高速傳輸線取代 UFL、power splitter 減少 balun 降低噪訊
- 所有連接器置頂（安裝友善），RF 路徑與數位路徑分離

### 電力供應模組
- 48V / 10.5A AC/DC 輸出
- Bus cap ESR < 600 mΩ @ 100Hz，85°C 時 10000 小時壽命
- EMI 對稱佈局抑制、IR drop = 0.004V（厚銅）
- 多個 MLCC 並聯實現寬頻電容特性

### AC/DC 電力板 + Power Interposer
- 4 個電力供應模組整合成電力板
- Power interposer 作為電力節點：濾波 + 過電流保護

---

## Chapter 3: X-band Transmitter (XT-144) — NSPO 合作

**規格**：
- 陣列：12×12 TX 天線 + 8 RX 天線（共 144 TX 元件）
- 應用：LEO 衛星 X-band 下行傳輸
- 模組構成：TX module、MB module、T1 module（FPGA）、UC module（up-converter）、Power module、EICD module、RX module

**散熱**：蜂巢鋁板 + 銅甲醇熱管，熱從核心向兩側散熱，由側板輻射

### 可靠度測試體系（COTS 上太空策略）

與林志勴博士（台灣輻射測試權威）合作，遵循 ISO 9001 + MIL-STD 810H 標準。

#### TID 測試（全電離劑量）
- 設施：INER 鈷-60 實驗室（非操作測試）
- DUT：Mixer + PLL
- 結果：兩顆 IC 在劑量累積後性能降解仍在可接受範圍，**不會成為系統單點故障**
- 量化方法：面積 0.9 cm × 0.9 cm 內的 TID 積分，搭配 Faraday Cup 校正束流
- 自動化：SCPI 控制電源 + BenchVue 控制功率計 + relay 模組切換 RF 開關

#### SEE 測試（單粒子效應）
- 計畫設施：長庚醫院第五實驗室（更高 LET 質子束驗證）
- 測試對象：需確保 LET 足夠高以穿透 IC 封裝及氧化層
- 涵蓋：SEU、SHE、SEFI（軟錯誤）；SEGR、SEL、SEB（硬錯誤）
- 見 [[concepts/see-single-event-effects]]、[[concepts/tid-total-ionizing-dose]]

#### 熱測試（Thermal Tests）
- CTT（恆溫測試）：TFT RFPGA，熱/冷案例，性能降解可接受
- TCT（熱循環測試）：PGA TCT（@TronFutureTech + Dekra iST）及 Frontend 4×4 TCT
- TST（熱衝擊測試）：Frontend 4×4 TST，**溫度變化率過大**導致前端模組性能急劇下降
- 結論：Frontend TCT 符合 NSPO 任務需求；TST 為極端條件驗證
- 溫度補償：Python 透過 I2C 讀取前端模組溫度感測器，進行增益最佳化（Gain Optimization Architecture）

---

## Chapter 4: PA Linearization using DPD

**動機**：5G 256 QAM-OFDM 高 PAPR 信號引起 PA 非線性及頻外散射（out-band spectral regrowth）

**PA 建模方法比較**：

| 方法 | NMSE | 備注 |
|---|---|---|
| 無記憶多項式 | 中等 | 無法模擬記憶效應（dispersion） |
| 記憶多項式（memory poly）| 較好 | LS 估測係數，有記憶長度 P |
| 神經網路（NN）| 最佳 | LM 反向傳播，1 個隱藏層 30 神經元 |

**DPD 結果**：
- NN DPD 測試 NMSE 比原始 PA 低約 **26 dB**
- ACPR 改善約 4 dB（out-band spectral regrowth 抑制）
- 訓練方法：Indirect Learning（先訓練 post-distorter，再作為 pre-distorter 使用）

**CUDA 加速**：
- NN feedforward propagation 以 2 threads 分工並行運算
- 2 種記憶體存取方式（Way1：連續列；Way2：交錯列）

---

## Chapter 5: 8-way Power Divider（SAR 應用）

- 採 Corporate feed network 架構以壓縮尺寸
- 應用：SAR（合成孔徑雷達）高密度前端天線饋電
- 三級模擬（stage1/2/3），各級 isolation、loss、phase difference 見 Table 5-1/5-2

---

## Chapter 6: 結論

本論文提出 hybrid phased array 與 orthogonal type phased array 兩種架構。
X-band 傳輸器可在解決可靠度問題後應用於 LEO 衛星。
Build-in self test 在相位陣列設計中不可或缺。

---

## 交叉連結

- [[entities/tron-future-tech]] — 論文實習機構
- [[entities/nctu-rfvlsi-lab]] — 指導教授王毓駒實驗室
- [[entities/nspo]] — X-band 傳輸器合作單位
- [[concepts/aesa]] — 論文核心系統
- [[concepts/hybrid-phased-array]] — 本論文提出之架構
- [[concepts/tid-total-ionizing-dose]] — 論文輻射測試 TID 實踐
- [[concepts/see-single-event-effects]] — 論文 SEE 測試規劃
- [[concepts/dpd-digital-predistortion]] — 論文 Chapter 4
- [[sources/hsieh-xband-leo-transmitter-2020]] — 同一 RFVLSI Lab，謝書超碩士論文：XT-144 up-converter 子系統的 Zero-IF 傳輸器設計與 EVM 校正
- [[sources/hybrid-xband-phased-array-icase-2020]] — 同一系統的 conference paper

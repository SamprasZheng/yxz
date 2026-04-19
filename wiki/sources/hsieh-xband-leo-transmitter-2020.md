---
type: source
title: "A High Data Rate X-Band Transmitter for Low-Earth Orbit Satellites"
author: Shu-Chao Hsieh (謝書超)
date: 2020-10-01
ingested: 2026-04-19
tags: [rf, phased-array, xband, leo, transmitter, evm, calibration, nctu]
---

# A High Data Rate X-Band Transmitter for Low-Earth Orbit Satellites

**作者**：謝書超 (Shu-Chao Hsieh)
**指導教授**：王毓駒、陳柏宏（國立交通大學電子研究所）
**發表**：碩士論文，NCTU，2020 年 10 月

同一研究室（RFVLSI Lab）出品，與 [[sources/thesis-aesa-modules-zheng-2021]] 有直接系統關聯 — 本論文的 X-band 傳輸器即為 XT-144 陣列的 up-converter 子系統。

---

## 系統規格

| 參數 | 規格 |
|---|---|
| 頻段 | X-band（~8.2 GHz） |
| 調變 | QPSK + 16APSK |
| 最大資料率 | 800 Mbps |
| 功耗 | ≤ 90 W |
| 架構 | Zero-IF（直接轉換） |
| 前端輸出 | 9 路分配（供 9 塊前端板） |
| 備援 | 主系統故障時切換冗餘系統 |

---

## 架構比較與選擇

四種傳送架構比較後選定 Zero-IF。見 [[concepts/zero-if-transmitter]]。

| 架構 | 優點 | 缺點 |
|---|---|---|
| Real IF | 成熟、鏡像好濾 | 需帶通濾波器，IF 太低時鏡像難分離 |
| Complex IF | 改善鏡像約 −30 dB | I/Q 不對稱仍存在 |
| Zero-IF | DAC 取樣率最低、濾波器需求少 | LO 洩漏 + IQ 不對稱（須校正） |
| Direct RF | 數位域 IQ 對稱完美 | 需超高速 DAC |

---

## 硬體組成

四板架構：
1. **FPGA 板**：產生基頻 I/Q 信號（調變、SRRC 濾波、雜訊整形）
2. **Up-converter 板**：基頻 → X-band RF，LO 校正電路，1 → 9 分路
3. **前端板**（×9）：功率放大 + 相位控制
4. **主板（Motherboard）**：電源分配 + FPGA 控制信號路由 + 備援切換

---

## EVM 校正流程

見 [[concepts/evm-calibration]]，完整方法：

### LO Leakage 校正
- 問題：IQ Offset 校正前 = −10 dB，嚴重污染傳輸頻帶
- 方法：掃描 DAC 直流偏移碼（IQ bias sweep），搜尋最小 LO 洩漏點
- 加速：**三元搜尋演算法（Ternary Search）** — 對單峰函數每次排除 1/3 搜尋空間，大幅減少掃描時間

### IQ 不對稱校正（IQ Imbalance）
- 問題：I/Q 增益差 $g$ + 相位誤差 $\phi$ 造成星座點扭曲
- 方法：Pre-distortion 矩陣校正，係數 $\alpha = \frac{1}{(1+g)\cos\phi}$，$\beta = -\tan\phi$
- 結果：16APSK 星座點明顯改善

---

## 低符號率問題（Low Symbol Rate）

- 症狀：12.5 Msps QPSK 時 EVM 升至 ~12%，error vector spectrum 在低頻端峰值
- 根因：DC block 電容（0.1 μF）+ transformer 阻抗比（2:1）造成低頻衰減
- 修正：
  1. 電容換大（0.1 μF → 1 μF），改善 1–2%
  2. Transformer 換 1:1（XFM1），操作頻率低至 0.15 MHz，EVM 改善 0.4–4.5%
  3. 基頻頻移技巧：將信號上移 8 MHz（類似 Complex IF），避開低頻響應差區

---

## 高符號率問題（High Symbol Rate）

- 症狀：三路 mixer 輸出 EVM 差異懸殊（3.41%–7.38%）
- 根因：偏壓銅線過長 → 傳輸線效應 → $Z_{in}$ 在特定頻率降低 → 基頻信號受損
- 修正：偏壓電阻（500 Ω）靠近 mixer 擺放 + 補充 AC 接地電容；或加 equalizer

---

## 頻譜發射遮罩（Spectral Emission Mask, SEM）

- 16APSK / QPSK 200–100 Msps：通過 SEM
- QPSK 50 Msps 以下：低頻雜訊超出 mask 限制
- 根因：DAC 量化雜訊（6-bit）在過取樣比低時 SQNR 不足

$$\text{SQNR} = 1.76 + 6.02N + 20\log(\text{FSR}) + 10\log(F_{os}/F_s) \quad \text{(dB)}$$

- 解法 A：Delta-sigma 雜訊整形（6-bit 仍不夠，7-bit 勉強通過）
- 解法 B：增加 DAC bits → 10-bit DAC 確認通過 SEM

---

## Future Works：Build-in Self-Test (BIST)

BIST 在相位陣列規模擴大時尤為重要（校正成本與陣列元件數成正比）。

**原理**：
- 正常模式：TX/RX 分離，SPST 開關切斷回授路徑保護 LNA
- 校正模式 A：TX(N) → RX(N)，取得相位常數 $k_1, k_2$
- 校正模式 B：TX(N) → RX(N-1)，取得 $k_3, k_4$
- 相位差計算：$\phi_{21} = 2 \times \tan^{-1}(C)$，其中 $C = \frac{k_4 - k_2}{k_3 + k_1}$
- 可逐步擴展至 N 個元件，求得所有相鄰元件相位差

---

## 交叉連結

- [[concepts/zero-if-transmitter]] — 本論文選用架構的詳細分析
- [[concepts/evm-calibration]] — LO 洩漏 + IQ 不對稱校正方法
- [[concepts/aesa]] — 本傳輸器所在的 AESA 系統
- [[sources/thesis-aesa-modules-zheng-2021]] — 同一 RFVLSI Lab，XT-144 系統整體（含本傳輸器模組）
- [[entities/tron-future-tech]] — XT-144 系統廠商
- [[entities/nspo]] — LEO 衛星應用合作單位

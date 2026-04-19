---
type: source
title: "A Hybrid X-band Phased Array Transmitter with High Downlink Speed for LEO Satellite System"
author: Li Han Chang, Yi Xiang Zheng, et al. (Tron Future Tech) + I-Young Tarn (NSPO)
date: 2020-11-14
ingested: 2026-04-19
tags: [rf, aesa, phased-array, leo, space, x-band, cmos, icase]
---

# A Hybrid X-band Phased Array Transmitter with High Downlink Speed for LEO Satellite System

**Conference**：iCASE (International Conference on Astronautics and Space Exploration)，Hsinchu, Taiwan, 2020-11-14
**主要作者**：Li Han Chang, Chien Cheng Wang, Wei Jian Paw, Shu-Chao Hsieh, Yu Chen Wang, **Yi Xiang Zheng**, Yu-Ju Chen, Ching-Min Yen, Chien Te Li, Ying-Jiun Low, Shou-Li Hsu, Doan Ngoc Giang, Yue Ming Wu, Yu Jiu Wang（以上 Tron Future Tech）；I-Young Tarn（NSPO）
**通訊作者 email domain**：@tronfuturetech.com，yxz@tronfuturetech.com = 鄭亦翔

---

## 系統概覽

### 機械結構
- **尺寸**：41.7 cm × 43.2 cm × 27.7 cm
- **陣列**：144 TX 元件（12×12）+ 8 RX 天線
- **堆疊**：TX board（前端）→ front panel（大熱容）→ motherboard → T1 board（FPGA）→ UC board（up-converter）
- **介面**：power interposer + T1 interposer（電源 + 信號分發）
- **散熱**：銅甲醇熱管 + 側面蜂巢鋁板 + 熱輻射塗層，熱流由核心向兩側

### 混合架構（Hybrid Structure）

```
DAC → Digital Phase Shift → PLL（LO）→ Mixer（up-conv）→ 2nd-stage PA → Phase Shifter → PGA → Antenna
```

- **混合**：數位相移（DAC + DSP）+ 類比相移器（Phase Shifter）
- **vs. 全數位相位陣列**：更低功耗、更低系統複雜度、更高功率效率、更長壽命
- **vs. 被動相位陣列**：可程式化增益，不依賴被動饋電損耗

### 關鍵規格

| 參數 | 值 |
|---|---|
| 頻率 | X-band（量測 8.2 GHz）|
| EIRP（正前方，single tone）| 64.30 dBm |
| EIRP 設計範圍 | 58–64 dBm，±65° 掃描角 |
| 最大掃描角 | ±65°（>130°）|
| TX 平均功耗 | < 90W |
| PGA P1dB | −8 dBm（input-referred，8.2 GHz）|
| PGA IIP3 | 0.8 dBm（8.2 GHz）|
| 下行速率 800 Mbps | 16-APSK，roll-off=0.35，EIRP 63.75 dBm，EVM 6.898% |
| 下行速率 400 Mbps | QPSK，roll-off=0.35，EIRP 63.23 dBm，EVM 6.404% |

### CMOS N65 PGA

- 台積電 N65 CMOS 製程
- Die attach on PCB + wire bond（GSG probe 量測）
- 輸出匹配網路包含 power detector 電路（監控功率）
- 片上 bandgap reference 提供溫度不敏感可程式化偏壓
- Transformer-based 輸入/輸出網路：single-ended-to-differential + 阻抗匹配
- 級間匹配：共振電路抑制帶外干擾 + 吸收寄生電容

### 冗餘架構（Redundancy）

- I/O 介面、電源、信號處理器、UC 模組均設計為雙份
- 切換電路消除不必要功耗、信號干擾、back-powering 問題
- 目標：高整合度、小尺寸、低成本、長壽命

### 量測環境

- 消音室（anechoic chamber）OTA 量測
- 轉台：360° 旋轉（電腦控制）
- 接收：標準探測天線組 + 頻譜分析儀（遠場距離）
- 資料下行測試：Keysight PXA X-series 信號分析儀（星座圖 + EVM）

---

## 結論

Hybrid 架構降低成本與硬體複雜度，符合 LEO 衛星下行通訊規格（EIRP、調變）。
未來工作：需通過輻射硬化測試 + 振動測試後方可入軌。

---

## 交叉連結

- [[entities/tron-future-tech]]
- [[entities/nspo]]
- [[concepts/hybrid-phased-array]]
- [[concepts/aesa]]
- [[sources/thesis-aesa-modules-zheng-2021]] — 同系統的碩士論文，包含完整可靠度測試章節

---
type: concept
tags: [rf, transmitter, architecture, zero-if, phased-array, xband, leo]
---

# Zero-IF 傳送架構（直接轉換）

## 定義

Zero-IF（直接轉換）架構直接將基頻 I/Q 信號上轉換至 RF 頻率，不經中間 IF 級。本振（LO）頻率等於目標 RF 頻率，因此基頻信號位於 DC（零頻）。

## 四種傳送架構比較

| 架構 | DAC 取樣率 | 濾波器需求 | 主要問題 |
|---|---|---|---|
| Real IF | 中 | 雙帶通濾波 | 鏡像頻率難分離（IF 低時） |
| Complex IF | 中 | 一道帶通濾波 | I/Q 不對稱 → −30 dB 鏡像 |
| **Zero-IF** | **最低** | **僅低通（DAC 後）** | **LO 洩漏 + IQ 不對稱** |
| Direct RF | 最高 | 低通 | 需超高速 DAC |

Zero-IF 的吸引力在於 DAC 取樣率最低，對 GHz 級 RF 系統而言這直接降低功耗與成本。

## 核心挑戰

### 1. LO 洩漏（LO Feedthrough / LO Leakage）
- 成因：LO 信號耦合至輸出端（直流偏移 + 電路洩漏）
- 影響：在 RF 中心頻率產生載波干擾，嚴重時 IQ Offset 達 −10 dB，淹沒調變信號
- 校正：DAC 直流偏置碼掃描 → 見 [[concepts/evm-calibration]]

### 2. IQ 不對稱（IQ Imbalance）
- 成因：I/Q 雙路 DAC 增益差 $g$ + 調變器相位誤差 $\phi$（IF 路或 LO 路不完全 90°）
- 影響：星座點旋轉/壓縮，EVM 上升
- 校正：Pre-distortion 矩陣補償 → 見 [[concepts/evm-calibration]]

### 3. 低頻衰減問題
- 成因：DAC 後的 DC block 電容 + 變壓器在低頻阻抗升高，導致低符號率信號能量損失
- 影響：低符號率（如 12.5 Msps）EVM 明顯高於高符號率
- 修正策略：
  - 增大 DC block 電容（0.1 μF → 1 μF）
  - 換用低頻響應更好的 transformer（1:1，低至 0.15 MHz）
  - 基頻頻移（類 Complex IF）：將信號移離 DC，避開低頻響應差區

## DAC 量化雜訊與 SEM

Zero-IF 系統中 FPGA 直接輸出數位基頻，DAC bit 數決定量化雜訊底，影響頻譜發射遮罩（SEM）合規性：

$$\text{SQNR} = 1.76 + 6.02N + 20\log(\text{FSR}) + 10\log(F_{os}/F_s) \quad \text{(dB)}$$

- $N$：DAC bits；$\text{FSR}$：操作滿量程比；$F_{os}/F_s$：過取樣率
- 對 6-bit DAC 在 12.5 Msps QPSK（過取樣 64×）：SQNR ≈ 56 dB（計算/量測吻合）
- Delta-sigma 雜訊整形可改善帶內 SQNR，但 6/7-bit 仍不足；需升至 10-bit 才穩定通過 SEM

## 典型應用

- LEO 衛星 X-band 下行傳輸器（[[sources/hsieh-xband-leo-transmitter-2020]]）
- 高資料率星間鏈路（需 800 Mbps+ 吞吐量）

## 相關連結

- [[concepts/evm-calibration]] — LO 洩漏 + IQ 不對稱實務校正
- [[concepts/aesa]] — Zero-IF 傳輸器通常嵌入 AESA 系統
- [[concepts/dpd-digital-predistortion]] — PA 非線性補償（Zero-IF 系統的另一關鍵校正）
- [[sources/hsieh-xband-leo-transmitter-2020]] — 實際 Zero-IF X-band 系統測量資料

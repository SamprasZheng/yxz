---
type: concept
tags: [rf, transmitter, evm, calibration, lo-leakage, iq-imbalance, measurement]
---

# EVM 校正技術（Error Vector Magnitude Calibration）

## 定義

EVM（Error Vector Magnitude，誤差向量幅度）量測實際接收星座點與理想位置之間的向量距離，以百分比或 dB 表示。是無線發射機信號品質最核心的量化指標。

$$\text{EVM}(\%) = \frac{|\vec{e}|_{\text{rms}}}{|A_{\text{ref}}|} \times 100$$

典型需求：1.5%–2% 以內（視調變階數而定）。

## 量測工具

**VSA（向量信號分析儀）**：Keysight 89600 VSA 軟體 + Infiniium 示波器。
示波器優點：頻寬更高（可觀察 200 Msps 信號）；缺點：動態範圍受 ADC 量化雜訊限制（≥40 dB SFDR，足夠 1.5–2% EVM）。

### VSA 六個關鍵量測視窗

| 視窗 | 用途 |
|---|---|
| **星座圖（Constellation）** | 第一眼診斷：旋轉 = 相位誤差；壓縮 = 增益壓縮；散射 = 相位雜訊 |
| **Error vector time** | 符號率錯誤診斷：符號率偏高顯示 "V" 形曲線 |
| **Spectrum** | 頻帶功率、頻率偏移確認 |
| **Error table** | EVM%、Freq Err、IQ Offset、Quad Err、Gain Imb 數值彙總 |
| **Error vector spectrum** | 頻率相關問題定位：特定頻率峰值 = 該頻率的干擾或響應劣化 |
| **Equalizer impulse response** | 多路徑/信道響應等化器係數 |

## 常見星座圖異常診斷

| 現象 | 原因 |
|---|---|
| 整體旋轉 | 相位誤差（Quadrature error）|
| I/Q 軸壓縮不均 | I/Q 增益不對稱 |
| 峰值截斷 | 增益壓縮（Gain compression）|
| 環狀散射（相位方向） | 相位雜訊過大 |
| 低頻 EVM 峰值 | DC block / transformer 低頻響應差 |

---

## 校正一：LO Leakage 校正

### 問題
Zero-IF 架構中本振信號直接耦合至 RF 輸出端（DAC 直流偏置引起），在 RF 載波頻率形成干擾。
- 未校正時：IQ Offset = −10 dB（嚴重干擾）

### 校正原理
LO 洩漏量是 I/Q DAC 直流偏置碼的單峰函數（unimodal）。目標：找最小洩漏點。

### 三元搜尋演算法（Ternary Search）
對 $[l, r]$ 區間中的單峰函數，每次取 $m_1 = l + (r-l)/3$，$m_2 = r - (r-l)/3$：
- $f(m_1) > f(m_2)$：丟棄 $[l, m_1]$
- $f(m_1) < f(m_2)$：丟棄 $[m_2, r]$
- 重複至 $|m_1 - m_2| < \xi$

優勢：相比全掃描大幅減少迭代次數（每次排除 1/3 搜尋空間）。

---

## 校正二：IQ 不對稱校正（IQ Imbalance Calibration）

### 問題
I/Q 雙路徑的增益差 $g$ 與相位誤差 $\phi$ 造成星座點扭曲。

### 數學模型
RF 輸出可寫為：

$$I(1+g)\cos(\omega_{LO}t + \phi) - Q\sin(\omega_{LO}t)$$

展開後，失真的 I'/Q' 與原始 I/Q 關係：

$$\begin{bmatrix}I'\\Q'\end{bmatrix} = \underbrace{\begin{bmatrix}(1+g)\cos\phi & 0\\ (1+g)\sin\phi & 1\end{bmatrix}}_{A}\begin{bmatrix}I\\Q\end{bmatrix}$$

### Pre-distortion 補償
在基頻前乘以 $A^{-1}$：

$$B = A^{-1} = \begin{bmatrix}\alpha & 0\\ -\tan\phi & 1\end{bmatrix}$$

其中 $\alpha = \frac{1}{(1+g)\cos\phi} \approx 1$（增益誤差小時），$\beta = -\tan\phi$（相位誤差補償係數）。

---

## 低符號率 EVM 劣化

**根因**：DC block 電容 + 變壓器在低頻阻抗升高，導致低頻基頻分量被濾除。

**修正策略（按效果排序）**：
1. 換用大容量 DC block（0.1 μF → 1 μF）：改善約 1–2%
2. 換用低頻 transformer（1:1，XFM1，操作頻率低至 0.15 MHz）：改善 0.4–4.5%（依符號率）
3. **基頻頻移**：將信號上移 8 MHz，LO 頻率對應調整，避開信道低頻響應差區 → EVM 降至 2–3%

| 方法 | QPSK 12.5 Msps EVM |
|---|---|
| 原始（XFM2, 2:1）| 12.58% |
| 換大電容 | ~11% |
| XFM1（1:1）| 8.08% |
| 頻移 8 MHz | ~2–3% |

---

## 高符號率 EVM 不一致

**根因**：偏壓銅線過長 → 傳輸線阻抗效應 → mixer 輸入端 $Z_{in}$ 在高頻降低 → 基頻信號損失。
**修正**：500 Ω 偏壓電阻靠近 mixer 放置 + AC 接地電容；或數位 equalizer 補償。

---

## 相關連結

- [[concepts/zero-if-transmitter]] — EVM 問題主要來源架構
- [[concepts/aesa]] — 相位陣列系統中 EVM 的系統級影響
- [[concepts/dpd-digital-predistortion]] — PA 非線性引起的另一類 EVM 惡化
- [[sources/hsieh-xband-leo-transmitter-2020]] — 實際量測資料來源（LO calibration: −10 dB → 通過；16APSK EVM: 8%）

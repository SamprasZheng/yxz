---
type: concept
tags: [rf, phased-array, radar, aesa, beamforming]
---

# AESA — 主動電子掃描陣列（Active Electronically Scanned Array）

## 定義

AESA 是一種每個輻射單元均有獨立 T/R（收發）模組的相位陣列雷達/通訊系統。
有別於 PESA（被動電子掃描陣列，共用單一中央收發器）及機械掃描雷達。

## 技術演進

| 世代 | 技術 | 年代 | 掃描方式 |
|---|---|---|---|
| 第一代 | 固定高增益天線 | 19世紀末 | 無 |
| 第二代 | 機械掃描雷達 | 二戰 | 機械轉動，360° |
| 第三代 | PESA | 1960s | 電子掃描，單一中央收發 |
| 第四代 | AESA | 1980s+ | 電子掃描，每元件獨立 T/R 模組 |
| 現代 | 全數位 AESA | 2010s+ | 數位波束成形，FPGA 控制 |

## 核心優勢（對比 PESA / 機械式）

- **多目標追蹤**：獨立相控可同時追蹤多個目標
- **無機械磨損**：消除機械壽命限制（SWAP 突破）
- **軟體定義**：同一硬體可重配置為雷達/通訊/電子戰
- **波束靈活性**：任意方向、任意波束形狀，切換速度微秒級

## SWAP 問題（Size, Weight and Power）

AESA 的歷史瓶頸。每元件獨立 T/R 模組導致體積、重量、功耗均高於 PESA。
現代高整合度半導體（SiGe BiCMOS、GaN MMIC、先進 CMOS）大幅縮減 SWAP，
使 AESA 可應用於可攜式（如 T-type Radar）及太空（如 XT-144）場景。

## 架構分類

### 全數位 AESA
每個元件有獨立 ADC/DAC，完全數位波束成形。
優點：最大靈活性；缺點：功耗 + 成本高。

### 混合相位陣列（Hybrid Phased Array）
數位相移 + 類比相移器組合。見 [[concepts/hybrid-phased-array]]。
優點：功耗低、複雜度低；Tron Future Tech XT-144 採此架構。

## 實際系統案例

| 系統 | 公司 | 頻段 | 應用 |
|---|---|---|---|
| S-132A | Tron Future Tech | S-band 2.9–3.1 GHz | 無人機/鳥擊偵測 |
| XT-144 | Tron Future Tech | X-band ~8.2 GHz | LEO 衛星下行 |

## 相位控制數學

相鄰天線單元相位差：

$$\Delta\Theta = \frac{2\pi d \sin\theta}{\lambda}$$

其中 $d$ 為元件間距，$\lambda$ 為波長，$\theta$ 為波束指向角。

## 相關連結

- [[concepts/hybrid-phased-array]] — 混合架構詳解
- [[concepts/dpd-digital-predistortion]] — PA 線性化（AESA 發射機必要技術）
- [[concepts/tid-total-ionizing-dose]] — 太空 AESA 輻射可靠度
- [[concepts/see-single-event-effects]] — 太空 AESA 單粒子效應
- [[entities/tron-future-tech]] — 台灣 AESA 新創
- [[sources/thesis-aesa-modules-zheng-2021]] — NCTU 碩士論文：S-band + X-band 模組
- [[sources/hsieh-xband-leo-transmitter-2020]] — NCTU 碩士論文：XT-144 用 X-band Zero-IF 傳輸器（EVM 校正、SEM、BIST）
- [[sources/hybrid-xband-phased-array-icase-2020]] — iCASE 2020 conference paper

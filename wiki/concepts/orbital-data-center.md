---
type: concept
tags: [leo, space, data-center, ai, edge-computing, energy]
---

# 軌道資料中心（Orbital Data Center, ODC）

## 定義

將雲端運算、AI 推論或訓練算力部署於低地球軌道（LEO）衛星的基礎設施模式。核心價值主張：在地球大氣層外提供獨立於地面的算力節點。

## 核心能源優勢

| 優勢 | 說明 |
|------|------|
| 7×24 太陽能 | 軌道上無雲、無雨、無天氣干擾，太陽能發電效率遠高於地面 |
| 輻射冷卻散熱 | 直接向宇宙背景輻射散熱，無需傳統壓縮機製冷系統 |
| 能源成本結構 | Jeff Bezos 判斷：數十年內 ODC 建設成本將低於地面資料中心 |

地球資料中心耗電量：2024 年 415 TWh，預計 2026 年突破 650 TWh → ODC 提供長期替代路徑。

## 三大核心要素

1. **算力**：商用 GPU（如 NVIDIA H100）需進行輻射防護或選用太空硬化元件；商用現貨（COTS）與太空硬化（Space-hardened）之間的取捨是最大工程挑戰。
2. **電信**：透過光學鏈路（如 Kepler Communications 光學中繼網）連接地面與其他節點。
3. **儲存**：低延遲在軌快取 + 批量下傳地面。

## 關鍵里程碑

| 時間 | 事件 |
|------|------|
| 2025-11 | [[entities/starcloud]] Starcloud-1 發射，搭載 NVIDIA H100，首個在太空中訓練 LLM |
| 2026-01-11 | Axiom Space 發射 ODC Node 1 & 2，依託 Kepler Communications 光學中繼網 |
| 2026 GTC | 黃仁勳宣示：「太空運算，終極前沿，已經到來」 |

## 應用場景

- **地球觀測 AI**：在軌即時處理衛星影像（野火偵測、農業監測、船隻識別），解決數據量大 × 頻寬瓶頸的矛盾
- **LLM 訓練**：利用廉價太陽能算力
- **邊緣雲端**：地球獨立的備援雲端節點

## 供應鏈位置

見 [[concepts/leo-value-chain]] 中游 C 環節。台灣目前在此環節幾乎缺席，是結構性缺口。

## 相關實體

- [[entities/starcloud]] — 首個在軌 LLM 訓練
- [[entities/ada-space]] — 中國 2800 顆衛星軌道超算星座
- [[sources/leo-space-datacenter-analysis-2025]]

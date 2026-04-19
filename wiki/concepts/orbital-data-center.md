---
type: concept
tags: [leo, space, data-center, ai, edge-computing, energy, hybrid-cloud, defense]
---

# 軌道資料中心（Orbital Data Center, ODC）

## 定義

將雲端運算、AI 推論或訓練算力部署於低地球軌道（LEO）衛星的基礎設施模式。核心價值主張：在地球大氣層外提供獨立於地面、利用免費太陽能與輻射冷卻的算力節點。

## 核心能源優勢

| 優勢 | 說明 |
|------|------|
| 7×24 太陽能 | 軌道上無雲、無雨、無天氣干擾，太陽能發電效率遠高於地面 |
| 輻射冷卻散熱 | 直接向宇宙背景輻射散熱，無需傳統壓縮機製冷系統 |
| 能源成本結構 | Jeff Bezos 判斷：數十年內 ODC 建設成本將低於地面資料中心 |

地球資料中心耗電量：2024 年 415 TWh，預計 2026 年突破 650 TWh → ODC 提供長期替代路徑。

## 三大核心要素

1. **算力**：商用 GPU（如 NVIDIA H100）需進行輻射防護或選用太空硬化元件；商用現貨（COTS）與太空硬化（Space-hardened）之間的取捨是最大工程挑戰。COTS GPU 最主要的輻射威脅是 [[concepts/see-single-event-effects]]（SEU 翻轉 SRAM 快取 + SEL 閂鎖燒毀），需通過 [[concepts/rha-radiation-hardening]] 認證流程（RDM ≥ 1.5）。
2. **電信**：透過光學鏈路（如 Kepler Communications 光學中繼網）連接地面與其他節點；ISL 光學通訊決定節點間延遲。
3. **儲存**：低延遲在軌快取 + 批量下傳地面；地空 DC 混合架構（見下）是最可行的商業落點。

## 關鍵里程碑

| 時間 | 事件 |
|------|------|
| 2025-11 | [[entities/starcloud]] Starcloud-1 發射，搭載 NVIDIA H100，首個在太空中訓練 LLM |
| 2026-01-11 | Axiom Space 發射 ODC Node 1 & 2，依託 Kepler Communications 光學中繼網 |
| 2026 GTC | 黃仁勳宣示：「太空運算，終極前沿，已經到來」 |
| TBD | [[entities/google-suncatcher]]：Google 計畫將 TPU 部署於軌道，接入光學通訊 |

## 應用場景

| 場景 | 說明 |
|------|------|
| 地球觀測 AI | 在軌即時處理衛星影像（野火偵測、農業監測、船隻識別），解決數據量大 × 頻寬瓶頸的矛盾 |
| LLM 訓練 | 利用廉價太陽能算力執行大模型訓練 |
| 邊緣雲端 | 地球獨立的備援雲端節點 |
| 國防 / 主權雲端 | 地理獨立、難以摧毀、全球覆蓋；最早期的付費場景之一 |
| 地空 DC 混合雲 | ODC 執行推論/邊緣任務 + 地面 DC 執行訓練/儲存，透過高速 Downlink 整合 |

## 地空混合架構（Hybrid Space-Ground DC）

ODC 商業化最現實的第一落點。模式：
- **太空側**：ODC 節點執行推論、實時邊緣計算、資料前處理
- **地面側**：地面資料中心執行訓練、儲存密集型任務
- **連接層**：高速光學 Downlink + 信關站

此架構讓企業無需完全遷離地面即可漸進採用 ODC，是商業推廣的關鍵橋接方案。

## 主要玩家

| 玩家 | 定位 |
|------|------|
| [[entities/starcloud]] | 商用 GPU（H100）在軌驗證先行者 |
| Axiom Space | ODC Node 1&2（2026-01），Kepler 光學中繼 |
| [[entities/ada-space]] | 中國 2800 顆衛星戰略規模化 |
| [[entities/google-suncatcher]] | 科技巨頭進場，TPU + 光學通訊 |

## 供應鏈位置

見 [[concepts/leo-value-chain]] 中游 C 環節。台灣目前在此環節幾乎缺席，是結構性缺口。

## 相關來源

- [[sources/leo-space-datacenter-analysis-2025]]

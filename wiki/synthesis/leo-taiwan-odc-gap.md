---
type: synthesis
tags: [leo, odc, taiwan, supply-chain, investment, ai]
sources:
  - "[[sources/leo-space-datacenter-analysis-2025]]"
concepts:
  - "[[concepts/orbital-data-center]]"
  - "[[concepts/leo-value-chain]]"
---

# 2026 LEO × 台灣 — 「上游很強、中游 C 缺席」的結構性缺口

## 命題

台灣在 LEO 衛星產業鏈的**上游**（RF PA、濾波器、高頻 PCB）幾乎是世界級龍頭，在**下游**（地面終端、天線）也有不錯的參與度；但在 2025–2026 年最熱的新題材 — **中游 C 太空資料中心（ODC）硬體整合** — 存在一個結構性的空白。

這不是意外，是一個**結構性機會窗口**。

## 為什麼中游 C 會起來

三條線同時撞在一起：

1. **地面資料中心能耗爆炸**：2024 年 415 TWh → 2026 年預計 650 TWh。電網與冷卻成本是天花板。
2. **太空免費能源**：7×24 小時無遮蔽太陽能 + 向宇宙背景的被動輻射冷卻。Bezos 公開說在未來數十年內 ODC 建設成本將低於地面 DC。
3. **商用 GPU 上天被驗證可行**：2025-11 [[entities/starcloud]] 把 NVIDIA H100 送上 Starcloud-1 完成首次太空 LLM 訓練；2026-01 Axiom Space ODC Node 1&2 接上 Kepler 光學中繼；2026 GTC 黃仁勳正式把「太空運算」列為終極前沿。

三件事疊起來意味著：**ODC 不再是 science fiction，而是 2026–2030 之間的 capex 戰場**。

## 台灣現況：上游王者、中游 C 缺席

| 環節 | 台灣存在感 | 代表廠商 |
|------|-----------|---------|
| 上游 RF PA | ★★★★★ 世界龍頭 | [[entities/win-semiconductors]] 穩懋 3105 |
| 上游濾波器／波導管 | ★★★★★ | [[entities/ascend-tech]] 昇達科 3491（毛利 >50%，已進 Starlink/Kuiper 供應鏈） |
| 上游高頻 PCB | ★★★★★ | [[entities/huatong-pcb]] 華通（LEO 專用 PCB 全球 ~80% 市佔） |
| 中游 A ISL 光學通訊 | ★★☆☆☆ | 精密光學非台廠強項，被 Mynaric、SA Photonics 主導 |
| **中游 C ODC 硬體整合** | **★☆☆☆☆** | **幾乎沒有主導廠商** |
| 下游地面端 | ★★★★ | 天線、LNB、電源廠商 |

中游 C 需要的是：
- 抗輻射算力晶片（COTS vs space-hardened 取捨）
- 散熱系統（無對流、只能靠輻射冷卻 + 導熱片）
- 高功率電源管理（10 kW+ 太陽能陣列 → 算力模組）
- 系統整合與在軌部署能力（這要火箭 + 地面站 + 光通訊一起打包）

前三項都是「會做、但沒做進 space grade」的狀態；第四項需要時間累積，不是靠單一公司能補完。

## 從結構性缺口看：誰有機會？

三種路徑：

### A. 上游廠商往中游 C 延伸
穩懋、昇達科這類已經「打進 Starlink 供應鏈」的廠商，技術上最接近中游 C。挑戰是商業模式從「賣元件」變成「賣子系統」，對毛利率敏感的代工廠是文化轉型。

### B. PCB 廠把板卡整合層拉高
華通、欣興這種手握 LEO PCB 的玩家，有機會往「ODC 運算板組件」延伸（GPU mezzanine、散熱板整合）。這條線最有可能出黑馬。

### C. 從國防／主權雲切入
ODC 最早期的**付費場景**不是純商業，是國防 / 主權雲端（地理獨立、難摧毀、全球覆蓋）。台灣國防採購如果往這個方向投錢，會強制長出一家中游 C 廠商。

## 對比：中國的三體計算星座

[[entities/ada-space]] 2025-05 發射首批 12 顆衛星，每顆 100 Gbps 光學鏈路 + 744 TOPS 在軌加速器。目標 2800 顆分散式軌道超算網路。

這不是一家公司在搞，是**國家級戰略規模化**。

> ⚠️ 台灣若完全沒有中游 C 的玩家，未來即便全球 LEO 市場持續成長，附加價值會從「硬體毛利」逐步轉移到「ODC 算力與資料服務」層 — 上游的高毛利元件供應可能被壓縮成 OEM/ODM 模式。

## 時程敏感度

| 時間 | 事件 |
|------|------|
| 2025-11 | Starcloud-1（H100 in orbit） |
| 2025–2026 初 | ITU 頻譜／軌道槽位分配備忘錄（500–1200 km + Ku/Ka/V 進入枯竭） |
| 2026-01 | Axiom Space ODC Node 1&2 |
| 2026 GTC | 黃仁勳「太空運算終極前沿」 |
| 2026–2028 | 中游 C 第一波商業化窗口 |

ITU 頻譜備忘錄特別重要：**先申報者先得**。SpaceX、OneWeb、Kuiper 已經卡位，晚到的玩家機會只剩 ODC 這種「新型態衛星」題材。

## 結論

1. 台灣在 LEO 上游的優勢是真的，但**不等於對中游 C 自動延伸**。
2. 2026–2028 是中游 C 商業化第一波窗口；台灣需要至少一家廠商走出去。
3. 最可能的候選：PCB 廠往 ODC 運算板整合延伸（路徑 B），或國防採購催生（路徑 C）。
4. 純上游代工廠（路徑 A）文化轉型最慢，但技術最接近 — 需要一個策略併購或合資事件才會動。

## 相關頁面

- [[sources/leo-space-datacenter-analysis-2025]]
- [[concepts/orbital-data-center]]
- [[concepts/leo-value-chain]]
- [[entities/starcloud]]、[[entities/ada-space]]、[[entities/win-semiconductors]]、[[entities/ascend-tech]]、[[entities/huatong-pcb]]

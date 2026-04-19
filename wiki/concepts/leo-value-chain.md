---
type: concept
tags: [leo, satellite, taiwan, rf-hardware, investment, supply-chain]
---

# LEO 產業價值鏈（Low Earth Orbit Value Chain）

## 概覽

LEO 衛星產業以產品生命週期可分為上游、中游（A/B/C）、下游兩段，各環節技術門檻與商業模式差異顯著。

---

## 上游：原材料與核心元件

決定衛星效能上限，台灣廠商最具競爭力的環節。

### RF 元件
- **穩懋（[[entities/win-semiconductors]]，3105）**：全球 LEO 規格 PA（功率放大器）代工龍頭
- **昇達科（[[entities/ascend-tech]]，3491）**：濾波器、波導管，已打入 Starlink 與 Amazon Kuiper 供應鏈；毛利率 >50%

### 抗輻射算力晶片
[[concepts/orbital-data-center]] 最大工程挑戰：需在商用現貨（COTS）與太空硬化（Space-hardened）之間取得平衡。目前無台廠主導。

### 太陽能電池
隨單顆衛星電力需求從 2 kW 暴增至 10 kW 以上（Starlink V3、AI 算力上天），太空級太陽能電池成剛需。

---

## 中游 A：衛星本體製造與系統整合

**[[entities/huatong-pcb]]（華通）**：低軌衛星專用 PCB 全球市佔率近八成（截至 2025 底）。2025 Q4 LEO 衛星板營收 >155 億元新台幣（歷史新高）。台灣 PCB 廠整體形成結構性優勢。

---

## 中游 B：發射服務（生命週期門檻）

- 2024 全球 LEO 投資 ~250 億美元；2025 超過 450 億美元
- 發射成本持續下降（SpaceX Falcon 9 / Starship）是整個生命週期商業可行性的關鍵槓桿

---

## 中游 C：太空資料中心（最熱新題材）

→ 詳見 [[concepts/orbital-data-center]]

核心邏輯：地球資料中心能耗暴增（2024→2026：415→650 TWh）× 太空免費太陽能 × 輻射冷卻 → 長期成本顛覆。台灣廠商目前幾乎缺席此環節。

---

## 下游 A：地面基礎設施（D2D 生態）

直連手機（D2D / NTN）服務需跨產業協作：

| 陣營 | 合作方 |
|------|-------|
| T-Mobile × SpaceX | 主要 D2D NTN 聯盟 |
| AT&T/Verizon × AST SpaceMobile | 另一大陣營 |

晶片廠（NTN 數據機）→ 終端品牌（相容設備）→ 電信業者（網路整合）三層依存。

---

## 下游 B：終端服務與應用

- 地球觀測在軌 AI：即時野火偵測、農業監測、船隻識別
- D2D 語音/數據服務
- 海事、航空連網

---

## 台灣競爭力地圖

| 環節 | 台灣存在感 | 備註 |
|------|-----------|------|
| 上游 RF PA | ★★★★★ | 穩懋全球龍頭 |
| 上游濾波器 | ★★★★★ | 昇達科 >50% 毛利 |
| 中游 A PCB | ★★★★★ | 華通八成市佔 |
| 下游地面端 | ★★★★ | 天線、LNB、電源 |
| **中游 C ODC** | **★☆☆☆☆** | **結構性缺口 → 潛在機會** |

## 相關來源

- [[sources/leo-space-datacenter-analysis-2025]]

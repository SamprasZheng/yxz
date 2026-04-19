---
type: concept
tags: [rf-hardware, space, radiation, semiconductor, testing, sram, fpga, mosfet]
---

# SEE — 單粒子效應（Single Event Effects）

單一高能粒子穿過半導體敏感體積，沿途產生的游離電荷被節點收集，若超過**臨界電荷（Qcrit）**，觸發邏輯翻轉或破壞性失效。與 [[concepts/tid-total-ionizing-dose]]（累積型）並列為太空輻射兩大主要威脅。

## 觸發機制

```
高能粒子（重離子 / 質子核反應產物）
    → 穿越敏感體積（active volume）
    → 游離電荷沿粒子徑跡沉積
    → 電場收集電荷
    → 若收集電荷 ≥ Qcrit → 觸發 SEE
```

**Qcrit（臨界電荷）**：電路節點翻轉所需最小電荷，隨製程節點縮小而降低 → 先進製程對 SEE 更敏感。

## 分類

### 軟錯誤（Soft Errors）— 可恢復

**SEU（Single Event Upset，單粒子翻轉）**
- 記憶體中的位元被翻轉（0→1 或 1→0）
- SRAM 快取最脆弱：尺寸小、Qcrit 低、高密度佈局
- 可透過 ECC（Error Correcting Code）糾正或資料重讀恢復
- **現實案例（2025-10-30）**：JetBlue 空巴客機飛行中突然下墜，Airbus 調查確認為太陽輻射/宇宙射線造成位元翻轉，飛控系統誤動作。說明 SEU 不只是太空問題，高空航空也面臨此威脅。

**SET（Single Event Transient，單粒子瞬態）**
- 粒子在類比電路或時序電路中產生短暫電壓脈衝
- 若脈衝被後級電路捕獲可造成錯誤輸出
- 深次微米 CMOS 高速邏輯的威脅日益增大（電路速度越快，越容易捕獲短暫脈衝）

**SEFI（Single Event Functional Interrupt，單粒子功能中斷）**
- 粒子擊中 FPGA 配置記憶體或控制器狀態暫存器 → 整個功能狀態異常
- 需電源重置（power cycling）才能恢復，無法靠 ECC 修正
- 對 FPGA 密集型衛星系統影響重大

### 硬錯誤（Hard Errors）— 破壞性，不可恢復

**SEL（Single Event Latchup，單粒子閂鎖）**
- CMOS 元件中的**寄生 PNPN（SCR）結構**被粒子觸發，形成低阻抗短路路徑
- 電流急增（可達數十 mA → A 量級），若不立即切斷電源會燒毀元件
- **測試原則：SEL 測試應先於 SEU 測試**——若發現閂鎖，元件根本不適用，可節省大量後續測試成本
- 緩解：電流限制電路、FPGA scrubbing、電源切換機制

**SEB（Single Event Burnout，單粒子燒毀）**
- 功率 MOSFET 在粒子打擊後進入二次崩潰（avalanche breakdown）
- 不可逆損毀；對功率管理 IC 和驅動電路威脅尤大

**SEGR（Single Event Gate Rupture，單粒子柵極破裂）**
- 閘極氧化層被粒子觸發的局部電場擊穿
- 永久失效；高電壓應用場景風險更高

## 測試方法

### 重離子加速器（首選）
- 直接游離，LET 高，能完整揭示 SEU / SEL / SEFI 脆弱性
- **LBNL BASE（Berkeley Accelerator Space Effects）**：1979 年全球首次 SEE 重離子測試場地；提供質子到鉍全系列；LET > 99 MeV·cm²/mg
- 其他主要設施：TRIUMF（加拿大）、GANIL（法國）、GSI（德國）

### 質子加速器（補充）
- 質子 LET 太低，無法直接造成 SEU/SEL
- 透過**核反應（核彈性散射）**與元件內高原子序材料（Au、W、Cu）產生高 LET 次生離子，間接觸發 SEE
- 適合驗證軌道質子環境（范艾倫內帶）下的可靠性

### 核心量測參數：截面（Cross Section）

```
截面（cm²） = 翻轉事件數 / 粒子通量（粒子/cm²）
```

**SEU 速率計算流程**：
1. 量測截面 σ 對 LET 的曲線（Weibull fit）
2. 確定元件敏感體積（Sensitive Volume）
3. 與任務軌道 LET 頻譜積分 → 得到在軌 SEU 率（events/device/day）

## 與 TID 差異

| | SEE | TID |
|---|---|---|
| 損傷特性 | 瞬間、單粒子觸發 | 累積、劑量積分 |
| 關鍵參數 | LET、截面、Qcrit | 總劑量（krad）、劑量率 |
| 測試工具 | 重離子/質子加速器 | Co-60 γ 源 |
| 主要受害元件 | SRAM、FPGA、功率 MOSFET | MOS 所有元件、雙極線性 IC |

## 相關

- [[concepts/tid-total-ionizing-dose]]
- [[concepts/rha-radiation-hardening]]
- [[sources/space-radiation-tid-see-2025]]
- [[concepts/orbital-data-center]] — COTS GPU 的 SEU/SEL 風險是 ODC 最大工程挑戰

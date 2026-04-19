---
slug: debug
title: "RF / SoC 系統除錯分析 — 從硬體到韌體到 ATE 的 Bug 分類學"
authors: ["sampras"]
tags: [rf, wifi, phasedarray]
description: 一份給無線通訊 / SoC 產品工程師的系統除錯 checklist — 從 PCB 層到 OTP 烙碼、ATE 測試腳本、再到環境相容性，每一層常見 bug 類型與根因切入點。
image: /img/og/debug.png
---

量產導入（NPI）階段的 bug，八成不是「哪一行寫錯」那種純軟體問題，而是**跨層交互**：硬體設計過關但 SMT 變異讓某個批次掛掉、ATE 測試通過但系統端因為 profile 不同踩到韌體 corner case、實驗室好好的到了客戶環境因為共存（coexistence）干擾才浮現。

這篇把我自己在 Wi-Fi / RF SoC 產品線上用來「先找分類、再找根因」的 checklist 完整寫出來，未來新 case 進來可以照著刷一輪。

<!-- truncate -->

## 第一層：硬體（HW）

### 設計階段
| 項目 | 常見 bug |
|------|---------|
| Symbol / Package / Pin | footprint 繪錯、pin swap、power/ground 拉錯層 |
| Schematic | 電源序列、clock 樹、RF matching 缺元件或誤用 |
| 模擬 | S-parameter 沒驗、antenna tuning 只靠 simulator 結果 |

🎯 **切入點**：任何新量產前，用 golden board 逐 pin 對照 BOM + layout 再跑一次 DRC。

### PCB 階段
- CAM 輸出比對原圖（Gerber / ODB++ diff）
- X-section 驗層壓結構（介電層厚度直接影響 50 Ω 阻抗）
- DRC：trace width、spacing、via-in-pad、differential pair skew
- 模組區（RF / DDR / clock）單獨審圖

🎯 **切入點**：量產板先抓 10 片做 TDR 與 VNA sweep，比對設計值。Impedance 偏移超過 ±10% 先停線。

### PCBA 階段
- SMT：爐溫 profile、回流焊缺陷、冷焊、tombstone
- BOM 管理：alternative part 換料時 datasheet 差異（尤其 capacitor ESR、inductor Q）
- Variant：同一 SoC 多變體（WiFi-only vs WiFi+BT）的料件差異

🎯 **切入點**：BOM diff + X-ray 抽檢。alt. part 換料後必須跑完整 RF 認證（不是只跑 sanity）。

### 系統整合
- 模組間干擾：WiFi 2.4G × BT × LTE B40 共存是經典
- Interconnect：FFC/FPC 長度、屏蔽接地迴路
- ESD / EMC：整機才看得見

🎯 **切入點**：用 spectrum analyzer 抓帶外雜散（spurious），對應到時間軸看是哪個子系統啟動時出現。

## 第二層：韌體（FW）

### OTP / SoC 配置
- OTP 版本 × MCN#（Mask Change Number）× variant 對照
- 寫入 register 的前後順序（啟動序列錯了，下一層就全錯）
- Calibration 資料：RX gain table、TX power table、antenna switch mapping

🎯 **切入點**：所有 FW issue 先確認 OTP version 與 MCN# 匹配。**最便宜的 root cause 就是烙錯料**。

### Platform Meta
- ADB command 腳本（Android）或 host interface 指令序列
- Code builder（compile flag、branch、tag）
- Regression screen 與 sanity check 的差異：regression 是**全量**，sanity 是**最低可接受**；別混用
- Review stage：從 RTL → FW → FW+SW → 系統的階段界線

🎯 **切入點**：把「哪個版本、哪個 branch、什麼 config、什麼 flag」四個參數記在 bug ticket 上。缺任何一個都先別 debug。

## 第三層：軟體 / 測試（SW / ATE）

### 測試 config
- Dialog：測試流程對話（DUT ↔ tester 互動）
- Profile：頻道、頻寬、調變（MCS）、天線組合
- Sequence：Pre-cal → calibration → verification → stress
- Coverage：corner case 是否有覆蓋（低溫、高溫、低 Vbat）

### 前置條件
- Library dependency（ATE 廠商提供的 DLL / .so 版本）
- Config file path（local vs network）
- Tester firmware 與 DUT firmware 的版本相容表

### ATE 本體
- Script（Python / TCL / C#）
- Extension / plug-in 與 tester SDK 版本匹配
- Package 管理（尤其團隊內多條線共用 tester 時）

### 資料 review
- Parser：raw log → structured data
- Visualize：boxplot、yield map、wafer map
- KPI：yield、Cpk、outlier 分布

🎯 **切入點**：所有 ATE 問題先問「log 看得懂嗎」。看得懂就是資料問題（script bug、config 錯），看不懂就是工具問題（parser 壞、tester 版本不匹配）。

## 第四層：環境（Environment）

這層是最坑的，因為它**看起來不是 bug，是玄學**。

| 類別 | 動作 |
|------|------|
| Comparison | 同樣 DUT 在兩個環境跑，diff 出差異（溫度、濕度、電源純淨度、鄰近設備） |
| Reproduce | 先在實驗室能 100% 重現，才算有 bug。重現不了就先記錄環境變數 |
| ATE / extension / package | 工具鏈版本再查一輪（是的，就是那個再查一輪） |
| Compatibility | 相容性：同一韌體在不同 host、不同 AP/Router、不同國家法規 region code |

🎯 **切入點**：現場 escalation 先問三件事 — (1) 幾支 DUT 有問題、(2) 隔壁測試站有沒有、(3) 上次通過是哪個 build。答不出來就回原廠重測。

## 除錯的心智模型

實務上我會跑這個 flow：

```
 1. 現象分類（HW / FW / SW / ENV 哪一層？）
         ↓
 2. 版本凍結（locked config：OTP / branch / ATE / platform）
         ↓
 3. 比對 golden（同版本 golden board 能過嗎？）
         ↓
 4. 二分法（哪個 commit / 哪個料件 / 哪個 test item 開始掛？）
         ↓
 5. Reproduce on demand（能按鈕重現才算真 bug）
         ↓
 6. Root cause + Mitigation + Prevention
```

第 5 步卡住時，通常是**跨層問題**：單層都沒事、合起來才爆。那就回到第 1 步，重新分類，這次把「上游 batch」、「下游 platform」一起放進分類樹。

## 下一步

這份清單還會延伸成兩個方向的文章：

- **相位陣列專屬的 debug checklist**（pattern measurement、calibration drift、beam steering error）— 接在 [聊聊相位陣列](/blog/PA) 後面
- **Radiation-aware debug for space silicon** — 接 [Radiation Test Playbook](/blog/radtest)，加上 TID drift / SEU 復原的 field debug 流程

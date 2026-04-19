---
type: entity
tags: [rf, aesa, phased-array, space, taiwan, startup]
---

# Tron Future Tech（創未來科技）

**類型**：台灣 RF / AESA 新創公司
**地址**：新竹市東區公道五路三段 1 號 7F-A
**網域**：tronfuturetech.com
**前身**：RFVLSI Lab（今改名 Tron Future Tech），源自國立交通大學王毓駒教授實驗室

## 主要產品

### S-Family Radar（S-band AESA）
- 型號：S-108A / S-116A / S-132A
- 頻率：2.9–3.1 GHz，50 MHz 頻寬
- 應用：無人機偵測、鳥擊監控（風電場）、機場監視、3D 追蹤
- 特色：全數位 AESA，解決 SWAP 限制

### X-band 傳輸器（XT-144）
- 與 NSPO 合作，LEO 衛星下行用
- 12×12 TX + 8 RX 天線陣列，144 元件
- X-band（~8.2 GHz），EIRP 64 dBm，±65° 掃描，<90W
- 見 [[sources/hybrid-xband-phased-array-icase-2020]] 與 [[sources/thesis-aesa-modules-zheng-2021]]

## 內部自研 IC

- **TFT RFPGA**：RF 可程式化增益放大器，X-band，已通過 CTT/TCT 熱測試
- 設計哲學：以 COTS（商業現貨）為基礎，透過嚴格測試（ISO 9001 + MIL-STD 810H）升級至太空等級

## 關鍵人物

- **王毓駒（Yu-Jiu Wang）**：創辦人 / 指導教授，NCTU
- **包偉騫（Wei-Jian Paw）**：工程主管
- **嚴敬閔（Jimmy Yen）**：ISO/生管制度，EICD 設計
- **Li Han Chang**：首席 RF 工程師，iCASE 2020 第一作者
- **Yi-Xiang Zheng（鄭亦翔 / Sampras）**：模組設計 + 可靠度測試，碩士論文作者

## 相關連結

- [[entities/nspo]] — X-band 傳輸器合作單位
- [[entities/nctu-rfvlsi-lab]] — 技術發源地
- [[concepts/aesa]] — 核心技術
- [[concepts/hybrid-phased-array]] — XT-144 架構

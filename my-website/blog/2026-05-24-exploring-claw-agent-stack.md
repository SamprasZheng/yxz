---
slug: exploring-claw-agent-stack
title: "開始探索各種 Claw：OpenClaw、NemoClaw 與安全 Agent 堆疊"
authors: ["sampras"]
tags: [ai, misc]
description: "一份來源校正過的 Claw agent stack 研究筆記：OpenClaw、NVIDIA NemoClaw、OpenShell、workspace files、daemon 與安全邊界。"
image: /img/og/ai-agent.png
---

這篇是我開始整理各種 "Claw" 工具時的第一份研究筆記。重點不是追熱點，而是先把堆疊分清楚：哪些是官方可驗證的事實，哪些是社群踩坑經驗，哪些目前只能當作待驗證線索。

截至 2026-05-24，我會把 Claw 生態先拆成三層來看：

- **OpenClaw**：個人 AI assistant / agent 的應用層，負責聊天、channels、tools、workspace、skills。
- **NemoClaw**：NVIDIA 做的 OpenClaw reference stack，把 OpenClaw 放進更可控的 OpenShell sandbox，補上 onboarding、policy、inference routing 與 lifecycle 管理。
- **OpenShell**：底層 sandbox / gateway / policy runtime，真正處理隔離、網路出口、檔案系統與推論路由。

<!-- truncate -->

## 先分清楚：不要混用兩條 onboard 路線

如果只是裝 OpenClaw，官方路徑是：

```bash
npm install -g openclaw@latest
openclaw onboard --install-daemon
```

`--install-daemon` 會走 managed gateway / service 路徑，讓 Gateway 變成常駐服務。OpenClaw 官方文件也提醒，沒有 `--install-daemon` 時，需要自己先讓 local gateway 跑起來，例如 `openclaw gateway run`。

如果目標是 NemoClaw-managed sandbox，入口就應該是 NVIDIA 的 `nemoclaw` 流程：

```bash
curl -fsSL https://www.nvidia.com/nemoclaw.sh | bash
```

NVIDIA 文件明確寫到，NemoClaw-managed 環境應使用 `nemoclaw onboard` 建立或重建 OpenShell gateway / sandbox，不要隨意直接操作底層 OpenShell lifecycle，除非你打算自己承擔整套 OpenShell 管理。

我的判斷：**OpenClaw 是 agent 應用，NemoClaw 是把它放進安全生產環境的包裝層**。兩者不是互斥，但操作命令與責任邊界不同。

## Mac 與本地環境：Docker 是第一個門檻

社群常提到的 Mac 踩坑可以用官方文件校正：NVIDIA 文件說 macOS 上 NemoClaw 使用 Docker-driver OpenShell gateway path，支援 Docker Desktop 或 Colima。也就是說，Mac 上先確保 Docker daemon 可用，再跑 NemoClaw onboarding，這個方向是合理的。

我會把 Mac 檢查順序寫成：

1. 確認 Node.js 版本符合需求。NemoClaw 文件要求 Node.js 22.16+，OpenClaw 也建議 Node 22.16+ 或更新。
2. 啟動 Docker Desktop 或 Colima，確保 CLI 可以連到 Docker。
3. 先用 `nemoclaw onboard` 走完整流程，不要跳到底層 `openshell` 指令。
4. 如果 provider key 或 model 選擇出問題，先不要急著改一堆 JSON。優先查 onboarding log、provider env var、secret reference 與官方 troubleshooting。

社群有一種說法是「先用 Ollama / Qwen / Llama 完成初始化，再回頭改 commercial API」。這可以當 workaround 思路，但我不會把它寫成標準解，因為官方更偏向用 onboarding / provider / secret reference 流程處理。

## 安全底線：預設拒絕比花哨 workflow 更重要

NemoClaw 最值得看的不是炫技，而是它把 agent 的危險面拆成四層：

| Layer | 主要風險 | 我的初始策略 |
| --- | --- | --- |
| Network | 任意對外連線、資料外洩 | 從 deny-by-default 開始，只開必要 endpoint |
| Filesystem | 改壞系統檔、偷 credential、污染 config | 保持 `/sandbox` 與 `/tmp` 以外盡量不可寫 |
| Process | privilege escalation、fork bomb、syscall abuse | 不自行放寬 container / sandbox policy |
| Inference | API key 外洩、成本失控、繞過審計 | 走 gateway-routed inference，不把 provider key 放進 agent workspace |

NVIDIA 文件寫得很直接：NemoClaw sandbox 預設是 deny-by-default egress，未知 host 會被 OpenShell 攔下並交給 operator approve / deny。這對 always-on agent 特別重要，因為 prompt injection 最大的危險不是「模型講錯話」，而是它在你沒看到時把 workspace、對話或 key 送到不該去的地方。

如果要允許 agent 打某個 API，我會偏向：

```bash
openshell policy update <sandbox-name> --add-endpoint api.example.com:443:read-only:rest:enforce
```

核心原則是 **read-only REST 優先**。能用 GET 就不要開 POST；能限制 path 就不要開整個 domain；能 session approve 就不要永久寫進 baseline policy。

## loopback、token 與 daemon：不要把 dashboard 裸露到公網

NVIDIA 文件顯示 NemoClaw 的 OpenShell gateway 預設 bind 在 `127.0.0.1`，也就是 loopback。這是合理預設。若改成 `0.0.0.0`，同一個網路或公開網路上的其他主機就可能接觸到 gateway。

我的規則：

- 本機或單人開發：保持 loopback。
- 遠端 VPS：優先用 SSH tunnel、VPN、反向代理加 TLS 與強 auth，不要只是把 dashboard port 開到公網。
- Gateway token 視為密碼，不要貼到 workspace、blog、log 或 screenshot。
- 使用 `openclaw security audit` 或 NemoClaw 的 security / policy reference 定期檢查設定。

原始素材裡提到修改 `~/.openclaw/openclaw.json` 的片段，例如 `gateway.bind`、`auth.mode`、`denyCommands`。我暫時不把這段當成 canonical config schema，因為官方文件更常透過 onboarding flags、env vars、SecretRef、security audit 與 policy pipeline 描述這些控制。實務上應以當前 OpenClaw / NemoClaw 文件與實際產生的 config schema 為準。

## Workspace files：這才是 agent 的人格與操作系統

NemoClaw 文件把 OpenClaw workspace files 放在 sandbox 內：

```text
/sandbox/.openclaw/workspace/
```

目前 NVIDIA NemoClaw 文件列出的核心檔案是：

| File | 用途 |
| --- | --- |
| `SOUL.md` | agent persona、語氣、溝通風格 |
| `USER.md` | 使用者背景、偏好、上下文 |
| `IDENTITY.md` | agent 的簡短身份卡 |
| `AGENTS.md` | 行為規則、安全規範、session workflow |
| `MEMORY.md` | 長期記憶摘要 |
| `memory/` | daily notes / session continuity |

OpenClaw 自己的 onboarding 文件也提到 `TOOLS.md`、`HEARTBEAT.md`、`BOOTSTRAP.md` 這些 bootstrap files。因此我會這樣分：

- **NemoClaw 官方 workspace core**：先按 NVIDIA 文件列出的 `SOUL.md`、`USER.md`、`IDENTITY.md`、`AGENTS.md`、`MEMORY.md`、`memory/`。
- **OpenClaw bootstrap / advanced files**：再視 OpenClaw 版本與 onboarding 選項補上 `TOOLS.md`、`HEARTBEAT.md`、`BOOTSTRAP.md`。

這些檔案不是裝飾品。真正可靠的 agent，不是靠一次 prompt 變聰明，而是靠可版本化、可審查、可回滾的 workspace policy。

## 我會採用的 AGENTS.md 原則

always-on agent 的 AGENTS.md 應該寫得像 operation manual，而不是人格作文。我的基本模板會包含：

```md
# Operating Rules

- Prefer read-only actions unless the operator explicitly approves mutation.
- Never delete, overwrite, purchase, send external messages, or change credentials without approval.
- Every repeated task must be idempotent: running twice should converge to the same final state.
- Before network access, explain target domain, method, data payload class, and reason.
- Store durable decisions in MEMORY.md; store raw daily observations in memory/YYYY-MM-DD.md.

# Workflow

1. Classify the task: read, write, external-send, credential, or destructive.
2. For write/external/destructive actions, ask for operator approval.
3. Execute in the smallest scoped workspace.
4. Report final state and any policy exceptions.
```

如果 agent 會接 Telegram / Discord / Slack，還要加上 sender allowlist、group policy、command authorization、rate limiting 的策略。不要讓「任何私訊」都能變成操作你的電腦。

## 生產環境的無聊定理

社群那句「好的 24/7 agent 應該無聊且穩定」我認同。我的版本是：

> A good always-on agent should be boring, observable, reversible, and idempotent.

我會把 production readiness 拆成四件事：

1. **Idempotency**：任務重跑不應重複扣款、重複發文、重複寫壞資料。
2. **Supervision**：用 daemon / systemd / launchd / managed service，不靠手動 terminal。
3. **Auditability**：保留 transcript、policy decision、network approval、tool execution log。
4. **Rollback**：workspace files、config、skills、policy 都要能備份與回滾。

NemoClaw 文件也提醒，workspace files 雖然會在 sandbox restart / rebuild / upgrade 中保存，但 destroy sandbox 會刪掉 persistent state volume。正式使用前一定要建立 snapshot / backup 節奏。

## Skills 與 awesome list：先當 supply-chain 風險看

像 `VoltAgent/awesome-openclaw-skills` 這類清單很適合探索能力邊界，但我不會直接把它當「可放心安裝」名單。Agent skill 的供應鏈風險比一般 npm package 更高，因為它可能同時影響：

- prompt context
- tool execution
- local files
- credentials
- external network calls

我的 skill 安裝流程會是：

1. 只從官方 registry 或可信 repo 找候選。
2. 看 `SKILL.md`、manifest、install script、postinstall script。
3. 搜尋 `exec`、`spawn`、`shell`、`eval`、network call、credential access。
4. 先在 NemoClaw restricted / balanced policy 下測。
5. 通過後才加入常駐 agent。

## 來源可信度分級

| 級別 | 來源 | 我怎麼用 |
| --- | --- | --- |
| A | NVIDIA NemoClaw docs、OpenClaw docs、OpenClaw GitHub | 可作為本文的技術依據 |
| B | OpenClaw / NemoClaw community indexes、skills lists | 適合找工具與案例，但安裝前要 code review |
| C | X、Threads、Medium、YouTube、Discord 討論 | 適合收集踩坑，不直接當標準操作 |
| D | 沒有 URL 或找不到原文的 KOL 轉述 | 暫列待驗證，不寫成結論 |

你貼的素材裡，核心安全方向大多合理；但像特定 Medium 作者、特定小型 YouTube 頻道、PDF、`openclaw.json` JSON shape，還需要逐條確認原始 URL 與版本。這類內容我會保留為 research queue，不會直接放進 hard recommendation。

## 我的下一步探索路線

1. **本地 OpenClaw**：先跑 vanilla OpenClaw onboarding，理解 workspace、channels、daemon、security audit。
2. **NemoClaw sandbox**：再跑 NemoClaw，觀察 OpenShell gateway、network policy、inference routing。
3. **Restricted policy 實驗**：建立一個只讀 API skill，測 prompt injection 與 egress approval。
4. **Workspace versioning**：把 `SOUL.md`、`USER.md`、`AGENTS.md`、`MEMORY.md` 備份進 git 或 snapshot 流程。
5. **Long-running heartbeat**：只做 read-only monitoring，先不接交易、發文、寄信、刪檔這類 mutation。

## Reading List

- [NVIDIA NemoClaw Overview](https://docs.nvidia.com/nemoclaw/latest/about/overview)
- [NVIDIA NemoClaw Architecture Overview](https://docs.nvidia.com/nemoclaw/latest/about/how-it-works)
- [NVIDIA NemoClaw Prerequisites](https://docs.nvidia.com/nemoclaw/get-started/prerequisites)
- [NVIDIA NemoClaw Quickstart with OpenClaw](https://docs.nvidia.com/nemoclaw/latest/get-started/quickstart)
- [NVIDIA NemoClaw Security Best Practices](https://docs.nvidia.com/nemoclaw/latest/security/best-practices)
- [NVIDIA NemoClaw Network Policies](https://docs.nvidia.com/nemoclaw/latest/reference/network-policies)
- [NVIDIA NemoClaw Workspace Files](https://docs.nvidia.com/nemoclaw/latest/manage-sandboxes/workspace-files.html)
- [OpenClaw Install Docs](https://docs.openclaw.ai/install/index)
- [OpenClaw Onboard CLI Docs](https://docs.openclaw.ai/cli/onboard)
- [OpenClaw GitHub Repository](https://github.com/openclaw/openclaw)
- [VoltAgent awesome-openclaw-skills](https://github.com/VoltAgent/awesome-openclaw-skills)

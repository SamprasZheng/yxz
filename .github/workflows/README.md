---
type: source
title: .github/workflows — GitHub Actions CI/CD
tags: [code, ci, github-actions, deployment, automation]
---

# .github/workflows

GitHub Actions 定義。CI/CD 全自動化：push → build → deploy；另有兩條定時產文排程。

## `main.yml` — 部署站體

- **Trigger**：push 到 `main`。
- **Job**：`ubuntu-latest` 上 checkout → install → `yarn build` → 推到 `gh-pages`。
- 站體公開網址：https://SamprasZheng.github.io/yxz/
- Node 版本目前 16（但 `package.json` 要求 `>=18` — 本機開發要用 Node ≥18，CI 有差距需留意）。

## `daily-content.yml` — 每日 Living Topics 更新

- **Schedule**：`cron: "30 22 * * *"`（UTC，≈ 台北 06:30）+ `workflow_dispatch`。
- 執行 `yarn generate:living-topics`（[`update-living-topics.cjs`](../../my-website/scripts/update-living-topics.cjs)），
  更新 5 篇 `blog/live-*.md`，auto-commit 到 `main`。
- 觸發 `main.yml` 重新部署。

## `weekly-outlook.yml` — 每週宏觀展望

- **Schedule**：`cron: "0 23 * * 0"`（UTC，週日 23:00，≈ 台北週一 07:00）+ `workflow_dispatch`。
- 執行 `yarn generate:weekly-outlook`（[`generate-weekly-outlook.cjs`](../../my-website/scripts/generate-weekly-outlook.cjs)），
  新增下週一日期的 outlook 部落格文，auto-commit。

## 相關

- 部落格內容腳本：[`my-website/scripts/`](../../my-website/scripts/)
- 手動觸發部署：本機執行 `USE_SSH=true yarn deploy` 或 `GIT_USER=SamprasZheng yarn deploy`。

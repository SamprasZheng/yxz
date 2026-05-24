---
name: kol-tracker
description: Manage the KOL tracking list and run the daily KOL/keyword digest. Use when the user wants to add/remove a KOL, edit tracked keywords, view the current watchlist, or trigger an on-demand digest. Trigger phrases include "add KOL", "track this account", "新增追蹤", "KOL list", "kol tracker", "daily digest", "run KOL digest now".
---

# KOL Tracker

Maintains the user's KOL watchlist + keyword set, and produces a daily digest of new content from those sources into the wiki.

## Files this skill owns

- `.claude/skills/kol-tracker/kol-list.yaml` — single source of truth for tracked KOLs, channels, and keywords
- `wiki/sources/kol-digest-YYYY-MM-DD.md` — daily digest report (written by the remote routine, not by hand)
- Remote routine `kol-daily-digest` on https://claude.ai/code/routines — runs the digest every day

## What to do based on user intent

### 1. Add a KOL
1. Read `.claude/skills/kol-tracker/kol-list.yaml`.
2. Ask which category (`ai`, `polkadot`, `rf_hardware`, `plurality`, `other`) if not obvious.
3. Append a new entry under `kols:` with the shape:
   ```yaml
   - name: Display Name
     handle: "@handle_or_id"
     category: ai
     channels:
       twitter: https://twitter.com/handle
       youtube: https://www.youtube.com/@handle
       blog: https://example.com/feed
     why: one-line reason this KOL is tracked
   ```
4. Only include channels the user actually provided — don't invent URLs.
5. Write the file back, confirm what was added.

### 2. Remove a KOL
1. Read the list, locate the entry by `name` or `handle`.
2. Delete it, write back, confirm.

### 3. Add / remove a keyword
- Edit `keywords:` in the same file. Keywords are matched case-insensitively by the daily routine.

### 4. Show the watchlist
- Read the file and render a compact summary (counts per category, full keyword list).

### 5. Run the digest now
- Use the `RemoteTrigger` tool: `{action: "run", trigger_id: "<kol-daily-digest id>"}`.
- If the routine ID isn't known, first call `{action: "list"}` to find it.

## What the daily routine does (for reference — runs remotely, not via this skill)

1. Reads `.claude/skills/kol-tracker/kol-list.yaml` from the repo.
2. For each KOL, uses WebFetch / WebSearch to look for content posted in the last 24h on each listed channel.
3. Runs a keyword sweep (WebSearch) for each `keywords:` term over the last 24h.
4. Writes `wiki/sources/kol-digest-YYYY-MM-DD.md` with frontmatter `type: source`, sections per KOL + per keyword, each item linked to the original URL.
5. Updates `wiki/index.md` and appends to `wiki/log.md` per `wiki/AGENTS.md` conventions.
6. Commits on a branch `wiki/kol-digest-YYYY-MM-DD` and opens a PR.

## Notes

- Never hand-edit `wiki/sources/kol-digest-*.md` — they're routine output.
- If a channel URL 404s repeatedly, mark it `disabled: true` in the YAML rather than deleting (preserves history).
- Keep the YAML small enough to fit comfortably in a single prompt — if it grows past ~100 KOLs, split by category into separate files.

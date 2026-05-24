---
name: portfolio-curator
description: Review, validate, and update the portfolio repository metadata for the yxz Docusaurus site. Use when adding/removing portfolio projects, refreshing GitHub repo metadata, correcting screenshots, or working with src/pages/portfolio/github-repo-info.json.
---

# Portfolio Curator

## Contract

The portfolio page reads from:

```text
my-website/src/pages/portfolio/github-repo-info.json
```

Add, remove, and update projects in that JSON file rather than changing the portfolio component contract.

## Required Fields

Each entry should include:

- `name`
- `stars`
- `fork`
- `forksCount`
- `homepage`
- `html_url`
- `language`
- `description`
- `screenshot`

Use `null` for absent `homepage` or `screenshot`.

## Validation

From `my-website/`, run:

```bash
yarn portfolio:check
```

If using live GitHub data, preserve hand-curated descriptions and screenshots unless the user asks for a full refresh.


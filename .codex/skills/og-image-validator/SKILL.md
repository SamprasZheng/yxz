---
name: og-image-validator
description: Generate and validate Open Graph image assets for the yxz Docusaurus site. Use when blog posts, social cards, OG metadata, generated images, or files under my-website/static/img/og are created or changed.
---

# OG Image Validator

## Commands

Run from `my-website/`:

```bash
yarn generate:og
yarn validate:og
```

`validate:og` checks files in `static/img/og/` for:

- PNG dimensions: `1200x630`
- size: at most 200 KB

Use `node scripts/validate-og.cjs --file <path>` for a single image.

## Blog Contract

Every published post should have a matching `static/img/og/<slug>.png` unless the site intentionally falls back to `default.png`.

When a blog slug changes, regenerate or rename the matching OG image and run `yarn validate:og`.


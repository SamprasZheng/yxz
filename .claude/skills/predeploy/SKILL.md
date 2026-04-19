# /predeploy

Pre-flight checklist before deploying the Docusaurus site. Checks markdown links, runs a build, and deploys only if everything is clean.

## Usage

```
/predeploy
/predeploy --fix          # attempt to auto-fix trivial issues
/predeploy --deploy-only  # skip checks, go straight to deploy
```

## Working directory

All commands run from `D:/DOT/yxz/my-website/`.

---

## Step 1 — Markdown link check

Scan `blog/` and `my-website/src/pages/` for broken internal links.

### 1a. Collect all markdown/MDX files

```bash
# blog posts
find D:/DOT/yxz/my-website/blog -name "*.md" -o -name "*.mdx"
# pages
find D:/DOT/yxz/my-website/src/pages -name "*.md" -o -name "*.mdx" -o -name "*.tsx"
```

Or use Glob patterns:
- `my-website/blog/**/*.{md,mdx}`
- `my-website/src/pages/**/*.{md,mdx,tsx}`

### 1b. Extract and check internal links

Use Grep to find all markdown links: `\[([^\]]+)\]\((/[^)]+|\.\.?/[^)]+)\)`

For each internal link found:
- **Absolute path links** (`/blog/...`, `/docs/...`): verify the corresponding source file exists in `blog/` or `docs/`
- **Relative links** (`./foo`, `../bar`): resolve relative to the file's directory and verify existence
- **Anchor links** (`#heading`): skip (too expensive to verify)
- **External links** (`http://`, `https://`): skip (not checked — too slow, flag as "unchecked")

### 1c. Check image references

Grep for `!\[.*\]\(\.\/` — relative image refs. Verify each image file exists in `static/` or next to the MDX file.

### 1d. Check blog front matter

For each blog post, verify:
- `slug` field is present (if missing, Docusaurus infers from filename — note but don't fail)
- `authors` values exist in `blog/authors.yml`
- `tags` values exist in `blog/tags.yml`

```bash
# Extract valid author keys
grep "^[a-z]" my-website/blog/authors.yml | sed 's/:.*//'
# Extract valid tag keys  
grep "^[a-z]" my-website/blog/tags.yml | sed 's/:.*//'
```

---

## Step 2 — yarn build

Run the build and capture all output:

```bash
cd D:/DOT/yxz/my-website && yarn build 2>&1
```

Parse the output for:
- **Errors** (`error` lines, exit code ≠ 0): hard blockers
- **Broken links** (Docusaurus reports these during build): lines containing `[ERROR]` or `Broken link`
- **TypeScript errors**: lines from `tsc` containing `.tsx?:` with error codes
- **Warnings** (`warn` lines): note but don't block

---

## Step 3 — Report

Present a structured report:

```
## Pre-deploy Report — <date>

### ✅ Passed / ⚠️ Warnings / ❌ Errors

#### Markdown link check
- ✅ N files scanned, M links checked
- ❌ Broken: [list each broken link with file:line]
- ⚠️ Unchecked external links: N

#### Front matter
- ❌ Unknown author `foo` in blog/2025-xx-yy-post.md
- ❌ Unknown tag `bar` in blog/2025-xx-yy-post.md

#### Build
- ✅ Build succeeded  /  ❌ Build failed
- [List any broken links Docusaurus reported]
- [List any TypeScript errors]
- ⚠️ N warnings (non-blocking)

### Summary
<CLEAN — ready to deploy> / <BLOCKED — fix N issues before deploying>
```

If there are **zero errors**, ask for confirmation:

> "Pre-deploy checks passed. Deploy now? (yarn deploy)"

Wait for explicit "yes" / "deploy" before proceeding.

---

## Step 4 — Deploy (if clean)

```bash
cd D:/DOT/yxz/my-website && yarn deploy:auto
```

`deploy:auto` calls `scripts/deploy-github.cjs` which sets `GIT_USER=SamprasZheng` and runs `yarn docusaurus deploy` (pushes to `gh-pages` branch).

After deploy completes, report:
- Exit code
- Live URL: `https://SamprasZheng.github.io/yxz/`

---

## --fix mode

If `--fix` is passed, attempt these automatic fixes before re-running checks:

| Issue | Auto-fix |
|---|---|
| Trailing whitespace in front matter | `sed -i` trim |
| Missing `slug` field | Infer from filename, insert into front matter |
| Relative image path with wrong case | Rename or update link (if unambiguous) |
| Unknown tag in post | Add the tag to `blog/tags.yml` with a stub entry |

Do NOT auto-fix: broken external links, broken internal page refs (require human judgment), TypeScript errors, build errors.

---

## Notes

- **Do not deploy if build exit code ≠ 0.** No exceptions.
- Docusaurus broken-link detection runs during `yarn build` — trust it over the manual link check for final authority.
- The manual link check in Step 1 is faster and catches issues before spending time on a full build.
- Blog posts in `draft/` are ignored (not part of the build).
- If `yarn typecheck` is slow, run it in parallel with the link check via two Bash calls.

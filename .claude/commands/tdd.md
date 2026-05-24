# /tdd — Autonomous Test-Driven Development Loop

```
/tdd <feature description> [--dry-run]
```

`--dry-run` — emit the test plan only; stop before writing any implementation.

---

## Phase 0 — Parse invocation

Extract:
- `FEATURE` — everything before any flags
- `DRY_RUN` — true if `--dry-run` is present

Print a one-line banner:

```
╔══ /tdd ══════════════════════════════════════════════
║  Feature : <FEATURE>
║  Mode    : dry-run | live
╚══════════════════════════════════════════════════════
```

---

## Phase 1 — Spec-Writer (subagent)

Spawn a **spec-writer** agent with this prompt:

```
You are a test-specification writer. Given a feature description, produce an
executable test file and nothing else. Do NOT write any implementation code.

Feature: <FEATURE>

Rules:
1. Choose the right harness automatically:
   - pytest       → Python logic, scripts, or CLI tools
   - node:test    → Node.js / Docusaurus / JS tooling (prefer .test.mjs, node --test)
   - Playwright   → observable browser behaviour (page loads, nav, visual checks)
   - bash assertions → file-system artefact checks, shell scripts, CLI exit codes
   Mixing is allowed (e.g. bash to verify files exist + node:test for logic).

2. Every test must be independently runnable (no shared mutable state).
3. Tests must FAIL before any implementation exists and PASS after correct
   implementation. Write the target behaviour, not the current behaviour.
4. Add a comment above each test explaining what it proves.
5. Emit exactly ONE test file (or a shell script). Print its intended path as
   the first line: `# FILE: <relative-path-from-repo-root>`.
6. For bash: use `set -euo pipefail`; accumulate PASS/FAIL counters; exit 1 if
   FAIL>0. For node:test: use built-in `node:test` + `node:assert/strict`.

Output ONLY the file content (no prose, no markdown fences).
```

Capture the agent's output as `TEST_FILE_CONTENT`.
Parse the `# FILE: <path>` header to get `TEST_FILE_PATH`.

**Show the test plan to the user:**

```
╔══ Phase 1 — Test Plan ══════════════════════════════
║  File: <TEST_FILE_PATH>
╠═════════════════════════════════════════════════════
<TEST_FILE_CONTENT>
╚═════════════════════════════════════════════════════
Approve? [y / edit / abort]
```

Wait for user response.
- `y` → continue
- `edit` → let user paste amended test content, replace `TEST_FILE_CONTENT`
- `abort` → stop and explain

If `--dry-run` is active: print "Dry-run complete. No files written." and exit.

---

## Phase 2 — Write Tests to Disk

Write `TEST_FILE_PATH` using the Write tool. Make shell scripts executable
(`chmod +x`) if the harness is bash.

Verify the file exists and (for bash) is executable. Print:

```
✓ Test file written: <TEST_FILE_PATH>
```

---

## Phase 3 — Implementer (subagent)

Spawn an **implementer** agent with this prompt:

```
You are a focused implementation writer operating under TDD.
Your ONLY job is to make the following tests pass — do NOT modify the tests.

Tests are at: <TEST_FILE_PATH>
<TEST_FILE_CONTENT>

Feature intent: <FEATURE>

Rules:
1. Write the minimum code needed to make every test pass.
2. Prefer editing existing files over creating new ones where reasonable.
3. For Node scripts: use 'use strict', CJS unless the project uses ESM.
4. For Python: match the project's existing style.
5. Do not add dependencies that aren't already in package.json / requirements.txt
   unless truly necessary; if you must, add them and run the installer.
6. List every file you create or modify in a final summary block:
   CREATED: path/to/file
   MODIFIED: path/to/file
```

The implementer writes all files directly. Capture its summary.

---

## Phase 4 — Test Runner + Debug Loop

Set `ITERATION=1`, `MAX_ITER=8`.

### Run tests

Determine the run command from `TEST_FILE_PATH`:
- `.test.mjs` / `.test.js`  → `node --test <TEST_FILE_PATH>`
- `_test.py` / `test_*.py`  → `python -m pytest <TEST_FILE_PATH> -v`
- `.sh`                     → `bash <TEST_FILE_PATH>`
- Playwright spec           → `npx playwright test <TEST_FILE_PATH>`

Run via `Bash` tool, capture `EXIT_CODE`, `STDOUT`, `STDERR`.

### On success (EXIT_CODE=0)

Print:

```
╔══ ✅  All tests pass (iteration <ITERATION>) ══════
<STDOUT>
╚════════════════════════════════════════════════════
```

Jump to **Phase 5**.

### On failure (EXIT_CODE≠0)

If `ITERATION >= MAX_ITER`:

```
╔══ ❌  Max iterations (<MAX_ITER>) reached ══════════
║  Feature: <FEATURE>
║  Final test output:
<STDOUT + STDERR>
╚════════════════════════════════════════════════════
```

Stop. Ask user what to do next.

Otherwise, spawn a **debugger** agent:

```
You are a debugging agent in a TDD loop (iteration <ITERATION>/<MAX_ITER>).
The tests below are failing. Diagnose the root cause and patch ONLY the
implementation files — never modify the test file.

Test file: <TEST_FILE_PATH>
<TEST_FILE_CONTENT>

Test output (failing):
<STDOUT>
<STDERR>

Rules:
1. Read all relevant implementation files before patching.
2. Make the smallest targeted fix — do not rewrite working logic.
3. After patching, print a one-line diagnosis: "FIXED: <what was wrong>"
```

Increment `ITERATION`. Re-run tests. Repeat loop.

---

## Phase 5 — Build Verification

Run:

```bash
cd my-website && yarn build 2>&1 | tail -20
```

- If exit 0 → print `✓ yarn build passed`
- If non-zero → show output and ask: "Build failed. Fix before committing? [y/n]"
  If y, spawn a quick implementer patch targeting the build error, then re-run.

---

## Phase 6 — Commit

Stage all new/modified files (test file + implementation files):

```bash
git add <all files from Phase 3 summary + TEST_FILE_PATH>
git commit -m "feat(tdd): <FEATURE>

Tests: <TEST_FILE_PATH>
Iterations: <ITERATION>
Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
```

Print:

```
╔══ 🏁  Done ════════════════════════════════════════
║  Feature : <FEATURE>
║  Tests   : <TEST_FILE_PATH>
║  Iter    : <ITERATION>/<MAX_ITER>
║  Commit  : <git hash>
╚════════════════════════════════════════════════════
```

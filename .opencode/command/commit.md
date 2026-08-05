---
description: Run the Commit pipeline (shadscan gate, biome, conventional message). Hard gate.
---

Execute the **Commit pipeline** from `.agents/pipelines.md` (Pipeline 1). This is a HARD GATE — do not commit if a stage fails.

1. **Gate**: load `shadscan-pre-commit` skill. Run its full workflow: establish baseline, set floor, re-audit immediately before commit. If score is below floor, fix in-scope issues and re-run. Do not commit without a passing audit.
2. **Hygiene**: run `pnpm lint` (biome check + write). Zero warnings allowed.
3. **Message**: load `ste100` skill (commit rules) and generate the conventional commit message (repo style: `type(scope): subject`, max 100 chars).
4. Commit. If any stage failed, stop and report — never commit past a failed gate.

Per the ask policy: fix what the gates report; if a fix is ambiguous, destructive, or requires an unsafe biome fix, ask BEFORE. If you fixed something, no report needed beyond the commit summary.

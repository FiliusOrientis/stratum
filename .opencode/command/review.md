---
description: Run the Review pipeline (code-review, ste100, review-animations) on the current diff.
---

Execute the **Review pipeline** from `.agents/pipelines.md` (Pipeline 8) against the current uncommitted diff (or `$ARGUMENTS` if a commit/branch range is given).

1. **Analysis**: load `code-review` skill. Review the diff along both axes — Standards (repo docs: AGENTS.md, docs/conventions.md, docs/architecture.md) and Spec (the originating request) — in parallel sub-agents.
2. **Context** (only if the codebase structure is unclear): load `understand-diff` and build the knowledge graph for the diff.
3. **Minimalism**: run the ponytail ladder against the diff (always-on layer) and check for over-engineering — anything that fails the existential rungs lands on a delete-list.
4. **Comments**: load `ste100` skill (review-comment rules) and write one-line actionable comments.
5. **Motion** (only if the diff touches `motion/react` or animation code): load `review-animations` and apply its craft bar.

Present the findings (including the ponytail delete-list) as a **report for judgment** (ask-after policy). Fix nothing without the user's call unless the fix is a trivial gate violation (lint/typecheck).

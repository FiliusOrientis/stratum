---
description: Run git triage — snapshot repo state, decide continuation vs new branch vs hygiene, propose plan.
---

Run the **Git Triage** pipeline from `.agents/pipelines.md` (Pipeline 0).

1. **Snapshot**: run `node scripts/git-triage.mjs` and read the report.
2. **Hygiene**: identify stale merged branches, unpushed commits, stale tracking refs, detached HEAD, or dirty `main`. Propose cleanup.
3. **Decide**: load the `git-triage` skill and classify the current task as continuation (stay) or new task (new branch). If continuation is ambiguous, ask.
4. **Propose**: present the plan as a numbered list — what to commit, push, merge, delete, or branch — and wait for approval on any destructive step.

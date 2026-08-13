---
description: Run the scoped pipelines (UI Change, Architecture, Dependency, Infra, Documentation) for the current working-tree changes.
---

Execute the **scoped pipelines** from `.agents/pipelines.md` (Pipelines 4–7 and 9) for the current working-tree changes (staged, unstaged, and untracked). `$ARGUMENTS` may name a single pipeline (`ui`, `architecture`, `dependency`, `infra`, `docs`); otherwise run every pipeline whose file-scope matches `git status --porcelain`.

1. Check `git status --porcelain -uall` and map files to pipeline scopes (components → UI Change; stores/hooks/lib/routes → Architecture; package.json/lockfile → Dependency; turbo.json/workspace/tooling → Infra; docs/.agents/.opencode/AGENTS.md/CONTEXT.md/CHANGELOG.md/BRANCHES.md → Documentation).
2. For each matching pipeline, load and run its stages in order, honoring stage conditions and the ask policy (ask BEFORE for ambiguous/destructive steps; present proposals, audits, and critiques as reports AFTER for judgment).
3. Report which pipelines ran, what they found, and anything needing the user's call.

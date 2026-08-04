---
description: Run the scoped pipelines (UI Change, Architecture, Dependency, Infra) for the current staged changes.
---

Execute the **scoped pipelines** from `.agents/pipelines.md` (Pipelines 4–7) for the current staged changes. `$ARGUMENTS` may name a single pipeline (`ui`, `architecture`, `dependency`, `infra`); otherwise run every pipeline whose file-scope matches `git diff --cached --name-only`.

1. Check `git diff --cached --name-only` and map files to pipeline scopes (components → UI Change; stores/hooks/lib/workers/routes → Architecture; package.json/lockfile → Dependency; turbo.json/workspace/tooling → Infra).
2. For each matching pipeline, load and run its stages in order, honoring stage conditions and the ask policy (ask BEFORE for ambiguous/destructive steps; present proposals, audits, and critiques as reports AFTER for judgment).
3. Report which pipelines ran, what they found, and anything needing the user's call.

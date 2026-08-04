# Stratum Skill Pipelines

Declarative event → pipeline map. **The agent executes these mechanically — it never chooses which skills run.** A skill runs only when its pipeline's trigger fired and its stage condition holds.

Triggers are real processes: git hooks (`lefthook.yml`), CI workflows (`.github/workflows/`), opencode commands (`.opencode/command/`), and the staging watcher (`.opencode/plugin/pipelines.ts`).

## Ask Policy

- **Run** — everything fires automatically on trigger + condition. No pre-approval.
- **Ask BEFORE** — only when the stage would guess wrong or act irreversibly: ambiguous requirement, destructive action (force-push, delete, unsafe biome fixes), or a choice requiring user input.
- **Ask AFTER** — report for judgment (deliverable is a proposal/critique/finding):

| Skill | Report presented for judgment |
|---|---|
| `find-animation-opportunities` | proposed motion list (before implementing) |
| `improve-animations` | prioritized fix plan (before applying) |
| `impeccable` | design critique |
| `code-review` / `caveman-review` | findings + recommended fixes |
| `thinking-tools` | decision/options produced |
| `triage` | categorized issues + briefs |
| `to-spec` / `to-tickets` | drafts (before publishing) |

## Pipelines

### 1. Commit — trigger: `pre-commit` hook + `/commit` command — HARD GATE (blocks)

| Stage | Skill / Tool | Condition |
|---|---|---|
| 1. Gate | `shadscan-pre-commit` | always (baseline + re-audit) |
| 2. Hygiene | biome lint (`pnpm lint`) | always |
| 3. Message | `caveman-commit` | always (conventional format) |

Mechanical part runs in the hook (blocking); skill stages run in `/commit`.

### 2. PR — trigger: `pre-push` hook + CI PR job — HARD GATE (blocks)

| Stage | Skill / Tool | Condition |
|---|---|---|
| 1. Verification ∥ | biome, `tsc`, vitest | always |
| 2. Audit ∥ | knip, dependency-cruiser, pnpm audit | always |
| 3. Review | `code-review` (Standards ∥ Spec) | always |
| 4. Hygiene | commitlint | always |

### 3. Post-Merge — trigger: merge to main (CI `post-merge` job)

| Stage | Skill / Tool | Condition |
|---|---|---|
| 1. Docs | documentation gate (CONTEXT, architecture, conventions, docs/code) | always |
| 2. Housekeeping | BRANCHES.md, lint-suppressions log | always |
| 3. Continuity | `triage` → `to-spec` / `to-tickets` | new issues or flagged follow-ups |

### 4. UI Change — trigger: staged files in `apps/web/src/components/**` (watcher or `/pipeline`)

| Stage | Skill / Tool | Condition |
|---|---|---|
| 1. Structure | `atomic-design` | always |
| 2. Composition | `shadcn` → `tailwind-v4` | ui/ or styling touched |
| 3. Build | `motion-react` + `react-2026` + `ai-ui-patterns` | motion / new feature / AI surface touched |
| 4. Polish | `review-animations` → `emil-design-eng` → `impeccable` | motion / UI polish |
| 5. Opportunities | `find-animation-opportunities` (proposal report) → `improve-animations` (audit report) | new components / existing animation code modified |
| 6. Convention | co-located test + story presence | new component |

### 5. Architecture — trigger: staged files in `stores/ hooks/ lib/ workers/ routes/` (watcher or `/pipeline`)

| Stage | Skill / Tool | Condition |
|---|---|---|
| 1. Boundary | dependency-cruiser (automated) | always |
| 2. Pattern | `zustand-state` (stores) / `hooks-pattern` (hooks) / `hoc-pattern` + `render-props-pattern` (components) | matching dir touched |
| 3. Decision | `thinking-tools` | an architectural decision was made |
| 4. Docs | CONTEXT.md + docs/architecture.md sync | always |

### 6. Dependency — trigger: staged `package.json` / lockfile (watcher or `/pipeline`)

| Stage | Skill / Tool | Condition |
|---|---|---|
| 1. Security | `pnpm audit` (built-in) | always |
| 2. Dead code | knip | always |
| 3. Structure | dependency-cruiser | always |

### 7. Infra — trigger: staged `turbo.json`, `pnpm-workspace.yaml`, tooling configs (watcher or `/pipeline`)

| Stage | Skill / Tool | Condition |
|---|---|---|
| 1. Workspace | `turborepo-monorepo` | always |
| 2. CI | `github-actions` | workflow files touched |
| 3. Docs | AGENTS.md / architecture.md sync | always |

### 8. Review — trigger: `/review` command or review requested

| Stage | Skill / Tool | Condition |
|---|---|---|
| 1. Analysis | `code-review` (Standards ∥ Spec) | always |
| 2. Context | `understand-diff` (knowledge graph) | graph needed for clarity |
| 3. Comments | `caveman-review` | always |
| 4. Motion | `review-animations` | motion code in diff |

## Dormant Skills (activate when feature introduced)

| Skill | Activation |
|---|---|
| `react-hook-form-zod` | validated form lands (settings BYOK keys) |
| `tanstack-query` | server-state / data-fetching lands |
| `pwa-development` | PWA / offline work starts |
| `tanstack-table` | data tables land (catalog grid) |
| `tanstack-router` | never — stack uses React Router 8 |
| `setup-matt-pocock-skills` | one-time bootstrap — already run |
| `understand-*` (chat/dashboard/domain/knowledge/onboard) | on-demand exploration, not pipelines |
| `caveman` / `caveman-help` / `caveman-compress` / `find-skills` | communication/meta — never in pipelines |

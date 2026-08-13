# Stratum Skill Pipelines

Declarative event → pipeline map. **The agent executes these mechanically — it never chooses which skills run.** A skill runs only when its pipeline's trigger fired and its stage condition holds.

Triggers are real processes: git hooks (`lefthook.yml` — pre-commit, pre-push, post-merge, post-checkout), CI workflows (`.github/workflows/`), opencode commands (`.opencode/command/`), and the working-tree watcher (`.opencode/plugin/pipelines.ts`).

## Always-On Layers

Two horizontal layers shape *how* the agent works in every pipeline — they are not pipeline stages:

- **Ponytail** (`@dietrichgebert/ponytail`, default `full`) — the existential ladder: *does it need to exist → reuse → stdlib → native → installed dep → one line → minimum that works*. Decides WHAT gets built. Never cuts validation, security, or accessibility.
- **STE100** (`ste100` skill) — ASD-STE100 Simplified Technical English. STE100 governs what the agent writes; ponytail governs what it builds. No overlap. Files are gated mechanically by Vale (`pnpm prose`).

**Balance rule (overkill × sanity):** ponytail's ladder runs FIRST — anything that fails an earlier rung (YAGNI, reuse, stdlib, native, dependency) does not reach the craft stages. Craft skills (`atomic-design`, `shadcn`, `tailwind-v4`, `motion-react`, `react-2026`, `ai-ui-patterns`, `emil-design-eng`, `impeccable`, `find-animation-opportunities`, `better-interface` coordinating the `better-*` family) apply ONLY to what survives the ladder — if it must exist, it must be excellent. `ponytail-review` then guards the other direction: anything over-built *during* polish lands on the delete-list.

## Ask Policy

- **Run** — everything fires automatically on trigger + condition. No pre-approval.
- **Ask BEFORE** — only when the stage would guess wrong or act irreversibly: ambiguous requirement, destructive action (force-push, delete, unsafe biome fixes), or a choice requiring user input.
- **Ask AFTER** — report for judgment (deliverable is a proposal/critique/finding):

| Skill | Report presented for judgment |
|---|---|
| `find-animation-opportunities` | proposed motion list (before implementing) |
| `improve-animations` | prioritized fix plan (before applying) |
| `impeccable` | design critique |
| `better-interface` | holistic interface critique (report for judgment) |
| `code-review` / `ste100` | findings + recommended fixes |
| `thinking-tools` | decision/options produced |
| `triage` | categorized issues + briefs |
| `to-spec` / `to-tickets` | drafts (before publishing) |

## Pipelines

### 0. Git Triage — trigger: session start (plugin) + `/git-triage` command — GATE (proposes, never auto-acts)

| Stage | Skill / Tool | Condition |
|---|---|---|
| 1. Snapshot | `scripts/git-triage.mjs` (read-only git report) | always |
| 2. Hygiene | proposal: push unpushed, delete stale merged branches, prune refs, fix detached HEAD, clear dirty `main` | any hygiene item present |
| 3. Classify | `git-triage` skill — continuation (stay) vs new task (new branch) | always |
| 4. Propose | numbered plan: commit/push/merge/delete/branch | always — wait for approval on destructive steps |

Never commit, push, merge, delete, or force without user approval. Runs before
any code change at session start; `/git-triage` re-runs it on demand.

### 1. Commit — trigger: `pre-commit` hook + `/commit` command — HARD GATE (blocks)

| Stage | Skill / Tool | Condition |
|---|---|---|
| 1. Gate | `shadscan-pre-commit` | always (baseline + re-audit) |
| 2. Hygiene | biome lint (`pnpm lint`) | always |
| 3. Message | `ste100` (commit rules) | always (conventional format) |

Mechanical part runs in the hook (blocking); skill stages run in `/commit`.

### 2. PR — trigger: `pre-push` hook + CI PR job — HARD GATE (blocks)

| Stage | Skill / Tool | Condition |
|---|---|---|
| 1. Verification ∥ | biome, `tsc`, vitest | always |
| 2. Audit ∥ | knip, dependency-cruiser, pnpm audit | always |
| 3. Review | `code-review` (Standards ∥ Spec) | always |
| 4. Hygiene | commitlint | always |

### 3. Post-Merge — trigger: merge to main (lefthook `post-merge` hook + CI `post-merge` job)

| Stage | Skill / Tool | Condition |
|---|---|---|
| 1. Docs | `docs-gate` script (`pnpm docs-gate`) — mechanical freshness | always (runs in hook + CI) |
| 2. Housekeeping | `housekeeping-gate` script (`pnpm housekeeping-gate`) — BRANCHES.md stale entries, suppressions log | always (runs in CI) |
| 3. Docs sync | documentation gate (CONTEXT, architecture, conventions, docs/code) — agent | always (agent-side, after gates pass) |
| 4. Minimalism audit | `ponytail-audit` (repo-wide over-engineering audit — report for judgment) | new subsystem or accumulated `ponytail:` debt |
| 5. Continuity | `triage` → `to-spec` / `to-tickets` | new issues or flagged follow-ups |

### 4. UI Change — trigger: staged files in `apps/web/src/components/**` (watcher or `/pipeline`)

| Stage | Skill / Tool | Condition |
|---|---|---|
| 0. Scope | ponytail ladder (existential gate — always-on layer) | always — anything failing rungs 1–6 is skipped |
| 1. Structure | `atomic-design` | survived scope |
| 2. Composition | `shadcn` → `tailwind-v4` | ui/ or styling touched |
| 3. Build | `motion-react` + `react-2026` + `ai-ui-patterns` | motion / new feature / AI surface touched |
| 4. Polish | `review-animations` → `emil-design-eng` → `impeccable` | motion / UI polish |
| 4b. Interface | `better-interface` (full — coords `better-ui`, `better-typography`, `better-colors`, `better-accessibility`, `better-layout`, `better-writing`) | UI/screen/flow touched (report for judgment) |
| 5. Opportunities | `find-animation-opportunities` (proposal report) → `improve-animations` (audit report) | new components / existing animation code modified |
| 6. Convention | co-located test + story presence (`pnpm check-collocated` gate in pre-commit) | new component |
| 7. Counter-guard | `ponytail-review` (delete-list report) | craft stages ran |

### 5. Architecture — trigger: staged files in `stores/ hooks/ lib/ routes/` (watcher or `/pipeline`)

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
| 2. Context | `understand-diff` (knowledge graph) | codebase structure unclear |
| 3. Minimalism | `ponytail-review` (over-engineering delete-list — report for judgment) | always |
| 4. Comments | `ste100` (review-comment rules) | always |
| 5. Interface | `better-interface` (full/quick — coords the `better-*` family) | UI/screen/feature in diff (report for judgment) |
| 6. Motion | `review-animations` | motion code in diff |

### 9. Documentation — trigger: staged files in `docs/ .agents/ .opencode/` or `AGENTS.md CONTEXT.md CHANGELOG.md BRANCHES.md` (watcher or `/pipeline`)

| Stage | Skill / Tool | Condition |
|---|---|---|
| 1. Freshness | `docs-gate` script (`pnpm docs-gate`) — version claims, skill refs | always |
| 2. Sync | documentation gate (CONTEXT, architecture, conventions, docs/code) — agent | always |
| 3. Skill map | `.agents/skills/` ↔ AGENTS.md "Skills Loaded" ↔ pipelines.md consistency | skills or pipeline refs touched |
| 4. Counter-guard | `ponytail-review` (over-engineering delete-list — report for judgment) | doc content expanded |

## Branch Trigger (post-checkout)

`scripts/pipeline-hint.mjs` (lefthook `post-checkout` hook) maps branch names to likely pipelines by keyword. It is a hint, not a gate — the watcher + `/pipeline` stay the authoritative triggers when scope files enter the working tree.

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
| `ste100` / `find-skills` | communication/meta — never in pipelines |

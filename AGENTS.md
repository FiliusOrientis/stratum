# Stratum — AI Assistant Rules

## Commands

| Command                                                                                          | What                                                                                                                         |
|--------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------|
| `pnpm dev`                                                                                       | Vite dev server (`apps/web`)                                                                                                 |
| `pnpm lint`                                                                                      | Biome check + write (only linter, NOT formatter)                                                                             |
| `pnpm typecheck`                                                                                 | `tsc --noEmit` across monorepo                                                                                               |
| `pnpm test:coverage`                                                                             | Vitest unit tests + v8 coverage (thresholds: 80% lines/funcs, 70% branches)                                                  |
| `pnpm test`                                                                                      | Vitest run (no coverage)                                                                                                     |
| `pnpm cosmos`                                                                                    | React Cosmos dev server (UI board), port 5000                                                                                |
| `pnpm build`                                                                                     | Vite build via turbo                                                                                                         |
| `pnpm clean`                                                                                     | Removes `dist/`, `.turbo/`                                                                                                   |
| `pnpm audit:all`                                                                                 | knip (dead code/deps) + dependency-cruiser (structure rules) — `pnpm audit` is pnpm's built-in security audit, do not shadow |
| `pnpm audit:deps`                                                                                | knip only                                                                                                                    |
| `pnpm audit:structure`                                                                           | dependency-cruiser only (config: `.dependency-cruiser.cjs`)                                                                  |
| `pnpm docs-gate`                                                                                 | Mechanical docs freshness: Biome version claims ↔ package.json, skill refs ↔ SKILL.md                                        |
| `pnpm housekeeping-gate`                                                                         | Post-merge: stale Active branches in BRANCHES.md, suppressions log existence                                                 |
| `pnpm check-collocated`                                                                          | Staged components need co-located `*.test.tsx`; `*.fixture.tsx` only for public (barrel-exported) components (excl. `ui/`) |
| `pnpm prose`                                                                                     | Vale prose lint: STE100 writing rules + Slop (LLM-tell). Official ASD dictionary is local-only (`pnpm extract-ste-dictionary`) |
| `node scripts/git-triage.mjs`                                                                    | Read-only git state snapshot: branch, dirty files, unpushed commits, stale merged branches                                     |
| **Verification order**: `pnpm lint` → `pnpm typecheck` → `pnpm test:coverage` → `pnpm audit:all` |

**Never call binaries directly** — `biome`, `tsc`, `turbo` are not on PATH. Use pnpm scripts.

## Skill Pipelines

Triggered by real processes, never agent discretion. Source of truth: `.agents/pipelines.md` (loaded as an instruction). Run stages mechanically; honor the ask policy (ask BEFORE only for ambiguous/destructive steps; present proposals/audits/critiques as reports AFTER for judgment).

**Always-on layers** shape every pipeline; they are not stages. **Ponytail** (default `full`; `@dietrichgebert/ponytail` plugin) decides WHAT gets built via the existential ladder. **STE100** (ASD-STE100) governs what the agent writes; Vale gates files via `pnpm prose`. Balance rule: ponytail's rungs gate everything — craft skills apply only to what survives. `ponytail-review` catches anything over-built during polish.

| Trigger                  | Mechanism                                                         | Pipeline                                                                                                     |
|--------------------------|-------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------|
| session start            | `.opencode/plugin/pipelines.ts` (one-time git triage report) + `/git-triage` command | Git Triage: snapshot → hygiene proposal → continuation vs new branch (proposes, never auto-acts) |
| `pre-commit`             | lefthook (mechanical: lint + collocation gate)                    | Commit (hard gate)                                                                                           |
| `/commit` command        | `.opencode/command/commit.md`                                     | Commit: `shadscan-pre-commit` → biome → `ste100` (commit rules)                                                |
| `pre-push`               | lefthook (mechanical: typecheck + coverage + audit + vuln scan)   | PR (hard gate)                                                                                               |
| `/review` command        | `.opencode/command/review.md`                                     | Review: `code-review` ∥ → `understand-diff` → `ponytail-review` → `ste100` (review rules) → `review-animations` |
| working-tree changes     | `.opencode/plugin/pipelines.ts` (re-scans per message) or `/pipeline` | UI Change / Architecture / Dependency / Infra / Documentation                                            |
| merge to main            | lefthook `post-merge` (docs-gate) + CI `post-merge` job (docs-gate + housekeeping-gate) | Post-Merge: docs gate → housekeeping → `ponytail-audit` → `triage`/`to-spec`/`to-tickets` |
| `post-checkout`          | lefthook → `scripts/pipeline-hint.mjs` (branch → pipeline hint)   | hint only — watcher is authoritative                                                                        |

## Monorepo

```
stratum/                   root (pnpm workspace)
├── apps/web/              only real package — React 19 SPA
├── packages/              empty (planned: 3d-engine-vendor)
```

- Only `apps/web` has code. Everything else is scaffolding.
- `src/` aliased as `@/` in tsconfig + vite (for example `@/stores`, `@/components/ui`)

## Stack (apps/web)

React 19, Vite 8, React Router 8 (createBrowserRouter), TypeScript 7, Biome 2.5.8, Tailwind v4. ShadCN/React Aria, motion/react, morphicons, Zustand 5, Vitest 4, React Cosmos, Comlink 4, pdfjs-dist 6, Turborepo.

## Toolchain Quirks

- **unplugin-auto-import** handles React hooks — never write `import { useState } from 'react'`
- **Biome force-ignores**: `components/ui/`, `auto-imports.d.ts`, `coverage/`, `dist/`
- **Biome nursery rules**: `useSortedClasses` (unsafe fix) — must get user approval before applying unsafe
- **Cognitive complexity limit**: max 15 (enforced via `noExcessiveCognitiveComplexity`)
- **Vitest**: one jsdom project with v8 coverage (thresholds: 80% lines/funcs, 70% branches). `pnpm test` runs it; no browser project.
- **React Cosmos**: UI board (`pnpm cosmos`, port 5000). Co-located `*.fixture.tsx` files with a `export default { ... }` fixture map (Cosmos reads the default export); the map keys are component names, so biome disables `useNamingConvention` for `*.fixture.tsx`. `src/cosmos.decorator.tsx` applies the dark class, imports `globals.css` (the renderer replaces the app entry, so Tailwind must enter via the decorator), and centers fixtures with `p-8` padding; depcruise exempts it from no-orphans. Root `pnpm.overrides` pin `ws`, `http-proxy-middleware`, and `qs` past high-severity advisories (react-cosmos pins vulnerable versions). Remove when react-cosmos ships patched ranges.
- **ShadCN preset**: `b8PjeSOMUc` — style=aria-mira, base=mist, icon=lucide, radius=0.45rem. CSS variables in `globals.css` are generated — do not modify.
- **ShadCN primitives** (`src/components/ui/`) are **read-only** — except `input-group.tsx` and `kbd.tsx` (custom Motion/variant code kept on top of the registry base)
- **Turborepo**: tasks defined in `turbo.json`. `lint` depends on `^build`. `test:coverage` only runs unit project.
- **TypeScript split**: root `typescript` is **v6** (dependency-cruiser cannot transpile TS≥7) — the app's TS7 lives in `apps/web` via `npm:typescript@7.0.2` alias. Never bump root TypeScript past 6.x or `pnpm audit:structure` dies.
- **Audit tools**: `knip.json` (dead code config — `ignoreBinaries: vale` + `exist` cover binaries used only in scripts: Vale's prose lint and the `if exist` Windows syntax in the `clean` script) + `.dependency-cruiser.cjs` (architecture rules mirroring `docs/architecture.md`) + `tsconfig.depcruise.json` (audit tsconfig with `@/` paths). Runs in CI `audit` job.
- **CI**: Node 24, pnpm@9, Ubuntu. Jobs: commitlint (PR only), lint, typecheck, test:coverage, audit. Runs in parallel.

## Architecture

- **State**: 4 Zustand stores — `catalogStore`, `viewerStore`, `toolbarStore`, `settingsStore`. No context, no prop drilling.
- **Hooks**: domain logic in `src/hooks/` — `use-url-import`, `use-file-import`, `use-keyboard-shortcut`. Co-located tests.
- **Storage**: OPFS (binary PDFs). Structured metadata is in-memory only — Dexie is planned, not installed. `lib/storage/opfs.ts` + `lib/storage/types.ts`
- **Workers**: Comlink RPC. PDF Worker built (`workers/pdf.worker.ts` + `workers/pdf.import.ts` client). Search Worker planned when the reader lands.
- **3D**: R3F + drei (planned — deps not installed). Single page view only. Cover types: none/plain/basic/ridge. DearFlip vendor code at `packages/3d-engine-vendor/` (does not exist yet — reference material only)
- **Styling**: Tailwind v4 CSS-first, `@theme` directive, semantic colors, `@utility text-2xs` (0.625rem), flat layout
- **Icons**: `lucide-react` for static icons — canonical PascalCase names (for example `ArrowRight`), no `Icon` suffix. `morphicons` (`MorphIcon`) for morphing transitions, consuming icon data from the vanilla `lucide` package — keep `lucide` and `lucide-react` versions aligned. `MorphIcon` passes `reducedMotion="user"` to follow the app's motion-preference policy (its default is `"never"`).
- **Animation constants**: `src/lib/animation.ts` — `easeOut`, `easeInOut`, `springPreset`. All Motion animations follow Emil Kowalski rules (skills: `emil-design-eng`, `review-animations`)
- **Data flow** (target): PDF import → OPFS (bytes) → PDF Worker → Dexie (metadata). Reader → Dexie → OPFS → Worker → textures + text items. Current: import → OPFS + PDF Worker → in-memory catalog.

## Component Conventions

- Files: kebab-case. Components in PascalCase files (`empty-state.tsx` → `EmptyState`).
- Barrel exports via `index.ts` per directory.
- Logic separated from JSX — pure functions in `.types.ts` or dedicated helpers.
- Co-located `*.test.tsx` and `*.fixture.tsx` next to source.
- Motion for UI animations. R3F for 3D. Never mix.
- `aria-hidden="true"` on all decorative icons.
- `MotionConfig reducedMotion="user"` wraps the entire app (in `app-layout.tsx`).
- **No `uppercase` styling without user approval** — ask before applying `uppercase`/`text-transform` classes.

## Testing

- **Framework**: Vitest + @testing-library/react + jsdom. userEvent from `@testing-library/user-event`.
- **Setup**: `src/test/setup.ts` — imports jest-dom matchers, runs cleanup after each test.
- **Fixtures**: React Cosmos, co-located `*.fixture.tsx`, dark mode default (via `src/cosmos.decorator.tsx`). Fixtures render visual states; interactions are covered by unit tests.
- **Coverage exclude**: `components/ui/`, `auto-imports.d.ts`, `coverage/`, `test/`.
- **Pattern**: AAA. Reset Zustand stores in `beforeEach`. Mock fetch via `vi.spyOn(globalThis, 'fetch')`.

## PRs & Labels

- Branch naming: `feat/`, `fix/`, `refactor/`, `docs/`, `chore/` prefix
- Conventional commits: `type(scope): subject` — max 100 chars, present tense
- PR must pass lint + typecheck + test:coverage before opening
- PR labels have **trailing space**: `"priority: high"`, `"type: enhancement"`, `"area: storage"`
- Always pass `--project "Stratum"` when creating PRs

## Lint Suppressions

One approved suppression: `apps/web/src/routes/catalog-page.test.tsx` line 60 — `noSecrets` false positive (CSS selector). See `docs/lint-suppressions.md` for log. New suppressions require user approval.

## Documentation Gate

After every code change, verify these docs are current. Update BEFORE running verification.

| Doc                    | Update When                                                    |
|------------------------|----------------------------------------------------------------|
| `CONTEXT.md`           | New concepts, renamed entities, new subsystems                 |
| `docs/architecture.md` | New packages, worker boundaries, state flow changes            |
| `docs/conventions.md`  | New patterns, naming rules, file structure rules               |
| `docs/code/**`         | Per-module docs — update when module exports/interfaces change |
| `AGENTS.md`            | New toolchain quirks, commands, or conventions                 |

**STE100 gate boundary**: Vale (`pnpm prose`) enforces ASD-STE100 on `AGENTS.md`, `CONTEXT.md`, `CHANGELOG.md`, `docs/architecture.md`, `docs/conventions.md`, `docs/lint-suppressions.md`, and `.agents/pipelines.md`. The Vale gate does not cover `docs/code/**`, `docs/agents/**`, `.github/**`, `.agents/skills/**`, `.opencode/**`, or the wiki — these docs must follow STE100 spirit. When the best wording cannot follow the STE100 rule (technical identifiers such as `focus`, `reduce-motion`, `reducedMotion`, semver `major`), write the best wording and log it in `.local/ste100-exceptions.md` (git-ignored — never committed).

## Skills Loaded

- Auto-trigger: `git-triage` (session start + `/git-triage` — branch/continuation decision), `thinking-tools`, `zustand-state`, `hooks-pattern`, `hoc-pattern`, `render-props-pattern`, `react-2026`, `ai-ui-patterns`, `turborepo-monorepo`, `atomic-design`, `motion-react`, `tailwind-v4`, `tanstack-query`, `react-hook-form-zod`
- Always-on: `ste100` (ASD-STE100 communication — responses, commits, reviews; files gated by Vale `pnpm prose`)
- Manual: `code-review` (load for diff review), `biome` (linter errors), `github-actions` (CI/CD), `shadcn` (UI component API)
- Interface (\`better-*\`): `better-interface` (coords the six below, full/quick mode), `better-ui`, `better-typography`, `better-colors`, `better-accessibility`, `better-layout`, `better-writing` — install: `jakubkrehel/skills`. Overlaps `impeccable`; use `better-interface` as the review entry point


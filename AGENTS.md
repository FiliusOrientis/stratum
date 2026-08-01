# Stratum — AI Assistant Rules

## Commands

| Command | What |
|---------|------|
| `pnpm dev` | Vite dev server (`apps/web`) |
| `pnpm lint` | Biome check + write (only linter, NOT formatter) |
| `pnpm typecheck` | `tsc --noEmit` across monorepo |
| `pnpm test:coverage` | Vitest unit tests + v8 coverage (thresholds: 80% lines/funcs, 70% branches) |
| `pnpm test` | Vitest run (no coverage) |
| `pnpm storybook` | Storybook 10 dev server, port 6006 |
| `pnpm build` | Vite build via turbo |
| `pnpm clean` | Removes `dist/`, `.turbo/` |
| **Verification order**: `pnpm lint` → `pnpm typecheck` → `pnpm test:coverage` |

**Never call binaries directly** — `biome`, `tsc`, `turbo` are not on PATH. Use pnpm scripts.

## Monorepo

```
stratum/                   root (pnpm workspace)
├── apps/web/              only real package — React 19 SPA
├── packages/              empty (planned: 3d-engine-vendor)
```

- Only `apps/web` has code. Everything else is scaffolding.
- `src/` aliased as `@/` in tsconfig + vite (e.g. `@/stores`, `@/components/ui`)

## Stack (apps/web)

React 19, Vite 7, React Router 8 (createBrowserRouter), TypeScript 7, Biome 2.5.5, Tailwind v4, ShadCN/React Aria, motion/react, Zustand 5, Dexie 4, Comlink 4, pdfjs-dist 6, Minisearch 7, Vitest 4, Storybook 10, Turborepo.

## Toolchain Quirks

- **unplugin-auto-import** handles React hooks — never write `import { useState } from 'react'`
- **Phosphor thin-duotone**: `scripts/build-thin-duotone.mjs` patches dist icon defs (`opacity="0.2"` bg path) — manual run after `pnpm install`
- **Biome force-ignores**: `components/ui/`, `auto-imports.d.ts`, `coverage/`, `dist/`
- **Biome nursery rules**: `useSortedClasses` (unsafe fix) — must get user approval before applying unsafe
- **Cognitive complexity limit**: max 15 (enforced via `noExcessiveCognitiveComplexity`)
- **Vitest**: two projects — `unit` (jsdom, with coverage) and `storybook` (playwright chromium, no thresholds)
- **Storybook 10.5**: focus getter bug workaround in `preview-head.html`. Dark mode via `withThemeByClassName`. `@storybook/test` v8.6 (peer dep mismatch with Storybook 10 but functional)
- **ShadCN preset**: `b8PjeSPBdi` — style=aria-mira, base=mist, icon=phosphor, radius=0.45rem. CSS variables in `globals.css` are generated — do not modify.
- **ShadCN primitives** (`src/components/ui/`) are **read-only** — except `input-group.tsx` and `kbd.tsx` which contain custom Motion/variant code
- **Turborepo**: tasks defined in `turbo.json`. `lint` depends on `^build`. `test:coverage` only runs unit project.
- **CI**: Node 24, pnpm@9, Ubuntu. Jobs: commitlint (PR only), lint, typecheck, test:coverage. Runs in parallel.

## Architecture

- **State**: 4 Zustand stores — `catalogStore`, `viewerStore`, `toolbarStore`, `settingsStore`. No context, no prop drilling.
- **Hooks**: domain logic in `src/hooks/` — `use-url-import`, `use-file-import`, `use-keyboard-shortcut`. Co-located tests.
- **Storage**: OPFS (binary PDFs) + Dexie (2 tables: `books`, `config`). `lib/storage/db.ts` + `lib/storage/opfs.ts`
- **Workers**: Comlink RPC pattern. PDF Worker + Search Worker planned, not yet built. `workers/index.ts` is empty placeholder.
- **3D**: R3F + drei (planned, not built). Single page view only. Cover types: none/plain/basic/ridge. DearFlip vendor code at `packages/3d-engine-vendor/` (doesn't exist yet — reference material only)
- **Styling**: Tailwind v4 CSS-first, `@theme` directive, semantic colors, `@utility text-2xs` (0.625rem), flat layout
- **Icons**: `@phosphor-icons/react` — PascalCase with `Icon` suffix (e.g. `ArrowRightIcon`)
- **Animation constants**: `src/lib/animation.ts` — `easeOut`, `easeInOut`, `easeDrawer`, `springPreset`. All Motion animations follow Emil Kowalski rules (skills: `emil-design-eng`, `review-animations`)
- **Data flow**: PDF import → OPFS (bytes) → PDF Worker → Dexie (metadata). Reader → Dexie → OPFS → Worker → textures + text items

## Component Conventions

- Files: kebab-case. Components in PascalCase files (`empty-state.tsx` → `EmptyState`).
- Barrel exports via `index.ts` per directory.
- Logic separated from JSX — pure functions in `.types.ts` or dedicated helpers.
- Co-located `*.test.tsx` and `*.stories.tsx` next to source.
- Motion for UI animations. R3F for 3D. Never mix.
- `aria-hidden="true"` on all decorative icons.
- `MotionConfig reducedMotion="user"` wraps the entire app (in `app-layout.tsx`).

## Testing

- **Framework**: Vitest + @testing-library/react + jsdom. userEvent from `@testing-library/user-event`.
- **Setup**: `src/test/setup.ts` — imports jest-dom matchers, runs cleanup after each test.
- **Stories**: Storybook 10, co-located `*.stories.tsx`, autodocs tag, dark mode default. Play functions use `@storybook/test` (within, userEvent).
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

| Doc | Update When |
|-----|-------------|
| `CONTEXT.md` | New concepts, renamed entities, new subsystems |
| `docs/architecture.md` | New packages, worker boundaries, state flow changes |
| `docs/conventions.md` | New patterns, naming rules, file structure rules |
| `docs/code/**` | Per-module docs — update when module exports/interfaces change |
| `AGENTS.md` | New toolchain quirks, commands, or conventions |

## Skills Loaded

- Auto-trigger: `thinking-tools`, `zustand-state`, `hooks-pattern`, `hoc-pattern`, `render-props-pattern`, `react-2026`, `ai-ui-patterns`, `turborepo-monorepo`, `atomic-design`, `motion-react`, `tailwind-v4`, `tanstack-query`, `react-hook-form-zod`
- Manual: `code-review` (load for diff review), `biome` (linter errors), `github-actions` (CI/CD), `shadcn` (UI component API)

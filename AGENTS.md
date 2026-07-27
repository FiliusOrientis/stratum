# Stratum — AI Assistant Project Rules

## Documentation Gate (BEFORE declaring done)

After EVERY code change, verify these docs are still current:

| Doc | Purpose | Update Trigger |
|-----|---------|----------------|
| `CONTEXT.md` | Domain model, ubiquitous language, glossary | New concepts, new subsystems, renamed entities |
| `docs/architecture.md` | Architecture decisions, module boundaries, data flow | New packages, new worker boundaries, state flow changes |
| `docs/conventions.md` | Code conventions not covered by biome.json | New patterns, new naming rules, new file structure rules |
| `README.md` | Project overview, setup, quickstart | New dependencies, new scripts, new environment requirements |
| `CONTRIBUTING.md` | Setup, PR process, commit conventions | New tools, changed workflow, new branch conventions |
| `SECURITY.md` | Vulnerability reporting, supported versions | New security practices, changed disclosure policy |
| `CODE_OF_CONDUCT.md` | Community standards | Policy changes (rare) |
| `LICENSE` | MIT license | Copyright year bump (annual) |
| `.github/CODEOWNERS` | Review ownership | New maintainers, new packages |
| `.github/ISSUE_TEMPLATE/*` | Bug/feature templates | New required fields, label changes |
| `.github/PULL_REQUEST_TEMPLATE.md` | PR checklist | New CI steps, changed verification commands |

**If any doc needs updating, update it BEFORE running verification. State which docs were changed. If no doc needs updating, state "Docs unchanged."**

## Self-Audit Checklist (EVERY change)

1. **Docs gate first** — check CONTEXT.md, docs/architecture.md, docs/conventions.md, README.md. Update as needed.
2. **Read before edit** — inspect existing code patterns in surrounding files before making changes. Never guess APIs or conventions.
3. **Use Context7 MCP** — when working with unfamiliar library APIs (Three.js, Dexie, Zustand, Comlink, Vercel AI SDK), use Context7 to look up real docs. Never hallucinate signatures.
4. **Use `lookup_type` / `list_types`** — before writing TypeScript that touches existing types, use the type-inject MCP tools to verify type signatures.
5. **Run verification** — after every edit: `biome check --write` then `turbo run typecheck`. Both must pass before declaring done.
6. **No placeholder/dummy code** — every implementation must be working code. If unsure about something, ask. Never use TODO stubs, mock fallbacks, or fake data.
7. **Prefer edit over create** — always prefer editing existing files rather than creating new ones.
8. **Use explore subagent** — for multi-file searches, use the explore subagent to save context tokens. Use `rg` (ripgrep) via bash for fast single-pattern searches.
9. **Caveman by default** — communicate with ultra-compressed style. Only expand when asked for detail.

## Enforcement

- **Biome only** — lint and format with Biome, never ESLint or Prettier
- **pnpm only** — use `pnpm`, never npm or yarn
- **Turborepo orchestration** — run tasks via `turbo run <task>` from root
- **No manual React imports** — `unplugin-auto-import` handles React hooks. Never write `import { useState } from 'react'`

## Architecture

- **Monorepo**: `apps/web` (React 19 SPA), `apps/api` (Vercel serverless), `packages/3d-engine-vendor` (legacy DearFlip code)
- **Legacy isolation**: never import from `packages/3d-engine-vendor` directly in `apps/web` modern React code
- **Workers via Comlink**: typed RPC for Web Workers — no raw `postMessage`
- **State via Zustand**: stores for viewer config, active toolbars, theme. No prop drilling.
- **Styling**: flat layout, zero-rounded-corners, editorial typography (Instrument Serif + Instrument Sans), high-contrast dark theme with slate-blue accents

## DX Rules

- **Node >= 20, pnpm >= 9**
- **Biome config**: 2-space indent, single quotes, no semicolons, trailing commas, 100 line width
- **Commit style**: conventional commits via caveman-commit (≤50 char subject, body only when why isn't obvious)

## Tool Usage

- When you need library docs, use `context7` tools
- When you need to verify a TypeScript type, use `type-inject` tools (`lookup_type`, `list_types`, `type_check`)
- When you need to search the codebase, use `rg` via bash or the explore subagent
- When you finish a task, run `biome check --write` and `turbo run typecheck`
- Run `/setup-matt-pocock-skills` at project start to configure workflows

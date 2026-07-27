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
| `wiki/**` | Developer wiki (separate repo: `stratum.wiki.git`) | New pages needed when architecture, conventions, or setup changes |
| `.agents/skills/*` | AI skills (thinking-tools etc.) | New skill added, existing skill content updated |
| `docs/agents/*` | Agent config (issue tracker, triage labels, domain docs) | Issue tracker change, label change, domain layout change |
| `.out-of-scope/*` | Rejected feature request records | New rejection, reopened decision |
| `.github/CODEOWNERS` | Review ownership | New maintainers, new packages |
| `.github/BRANCHES.md` | Branch tracking log | Creating or deleting any branch |
| `.github/ISSUE_TEMPLATE/*` | Bug/feature templates | New required fields, label changes |
| `.github/PULL_REQUEST_TEMPLATE.md` | PR checklist | New CI steps, changed verification commands |

**If any doc needs updating, update it BEFORE running verification. State which docs were changed. If no doc needs updating, state "Docs unchanged."**

## Self-Audit Checklist (EVERY change)

1. **Docs gate first** — check the Documentation Gate table above. Update any doc whose trigger matches the current change.
2. **Read before edit** — inspect existing code patterns in surrounding files before making changes. Never guess APIs or conventions.
3. **Use Context7 MCP** — when working with unfamiliar library APIs (Three.js, Dexie, Zustand, Comlink, Vercel AI SDK), use Context7 to look up real docs. Never hallucinate signatures.
4. **Use `lookup_type` / `list_types`** — before writing TypeScript that touches existing types, use the type-inject MCP tools to verify type signatures.
5. **Run verification** — after every edit: `pnpm lint` then `pnpm typecheck`. Both must pass before declaring done.
6. **No placeholder/dummy code** — every implementation must be working code. If unsure about something, ask. Never use TODO stubs, mock fallbacks, or fake data.
7. **Prefer edit over create** — always prefer editing existing files rather than creating new ones.
8. **Use explore subagent** — for multi-file searches, use the explore subagent to save context tokens. Use `rg` (ripgrep) via bash for fast single-pattern searches.
9. **Caveman by default** — communicate with ultra-compressed style. Only expand when asked for detail.
10. **PowerShell JSON safety** — never inline JSON in PowerShell commands. Always write JSON to `$env:TEMP\opencode\*.json` and use `gh api ... --input $env:TEMP\opencode\<file>.json`. PowerShell mangling of nested JSON causes silent failures and wastes tokens.
11. **Work state summary** — after any significant milestone, compile what was done, what's active, what's blocked, and next move. Present this unprompted when finishing a task.
12. **Skill installation audit** — when adding/modifying skills, verify every `related_skills` reference resolves to an installed skill. Verify every skill's config dependency (e.g. `docs/agents/*`) exists. Report any broken references.
13. **Cross-skill conflict scan** — when multiple skills could trigger on the same keywords, check for overlap. If two skills share trigger words, note the conflict and report which one should take priority.
14. **Pre-merge readiness** — before declaring done: (a) all docs up-to-date per gate, (b) verification passes, (c) no stale references/broken imports, (d) all new files tracked in skills-lock.json if applicable. State "Ready for next step: [what comes next]" explicitly.

## Post-Merge Audit (EVERY merge to main)

After EVERY merge to main, audit the following BEFORE starting new work:

1. **Dependabot alerts** — check `gh api /repos/FiliusOrientis/stratum/dependabot/alerts` for open vulnerabilities. Address high/critical immediately.
2. **CI/CD status** — check `gh run list --limit 5` for failures on main. Investigate and fix any red.
3. **Open PRs** — `gh pr list --state open`. Check:
   - Dependabot PRs: are they passing CI? If not, fix or merge manually.
   - Release Please PR: is it up to date with CI checks?
   - Stale PRs: close or rebase.
4. **Release Please** — check if a release PR is open and ready to merge. If CI passes, merge to ship new version.
5. **Branch log** — update `.github/BRANCHES.md` with any new branches from the merge (Dependabot, Release Please).
6. **Wiki** — check Documentation Gate: did the merge introduce changes that need wiki updates?

## Git Workflow (MANDATORY — NEVER skip)

1. **Never commit directly to `main`** — always use feature branches
2. **Branch naming**: `feat/`, `fix/`, `refactor/`, `docs/`, `chore/` prefix (e.g. `feat/pdf-import`)
3. **Conventional commits only**: `type(scope): subject` — max 100 chars, present tense
4. **Commit after verification** — `pnpm lint` + `pnpm typecheck` must pass BEFORE committing
5. **Push branch + open PR** — never push to main directly (blocked server-side)
6. **Merge only via squash** — single clean commit per feature
7. **Check CI** — lint, typecheck, test must all pass before merge

## Release Rules (MANDATORY)

1. **No release before real code** — do NOT ship a release (tag, GitHub Release, version bump) until meaningful end-user functionality exists. Config scaffolding, CI/CD setup, docs, and infrastructure do NOT count.
2. **Release Please is disabled for now** — configure it to not auto-release. If it creates a release PR, close it without merging. Only merge a release PR when explicitly instructed.
3. **Version stays at 0.x** — all versions must be 0.x until the first actual feature ship. Breaking changes in pre-1.0 are normal (semver 4.x rule).
4. **Changelog is pre-release** — maintain a rough changelog but don't treat it as final. It will be rewritten before 1.0.

Violating this is the #1 way to waste tokens. CI will reject non-conventional commits.

## Git Safety Rules (NEVER skip)

1. **Before destructive actions** — `git reset --hard`, `git clean -fd`, `git push --force`, `git rebase` — confirm there are no uncommitted changes (`git status` must be clean).
2. **Never force push** — `git push --force` is blocked to `main` server-side. Never use `--force` on any shared branch.
3. **Never amend pushed commits** — if the commit has left your machine, create a new commit instead.
4. **Never rebase shared branches** — `git rebase` rewrites history. Only rebase branches you own and haven't pushed.
5. **Always `git pull --rebase` before pushing** — avoid merge bubbles.
6. **Clean branches after merge** — delete local and remote feature branches immediately after PR merge.
7. **Prune stale refs** — run `git remote prune origin` after branch deletions to clean tracking refs.
8. **Log every branch** — update `.github/BRANCHES.md` when creating or deleting any branch.
9. **Start every task with a fresh branch from `main`** — `git checkout main && git pull && git checkout -b feat/...`
10. **Commit small, commit often** — no mega-commits spanning multiple features.

## Dependency Stewardship (Future-Proofing)

1. **Before adding ANY dependency** — pause. Check if the project already has a similar package. Check if the dep is actively maintained (>100 stars, recent commits). Ask: "Can this be done without adding a dependency?"
2. **Node version bumps** — when a new Node LTS ships, propose upgrading `engines.node` in `package.json` and CI `node-version`.
3. **pnpm version bumps** — when a new pnpm major ships, propose upgrading `packageManager` field.
4. **Dependabot** — already configured (weekly npm + actions updates). Don't blindly merge — verify changelogs.
5. **Tech radar check (monthly)** — scan Dependabot PRs. Check if any current dep has been superseded by a better alternative. Check if any Biome rule was added that should be enabled.
6. **Defer non-critical deps** — "can we build this without it for now?" If yes, add a backlog issue instead.

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
- **Commit style**: conventional commits via caveman-commit (≤100 char subject, body only when why isn't obvious)

## Strict Rules (NEVER violate)

- **Never call binaries directly** — `biome`, `tsc`, `turbo` are not on PATH. Always use pnpm scripts: `pnpm lint`, `pnpm typecheck`, `pnpm build`, `pnpm dev`. No exceptions.
- **CI must use proper packages, not workarounds** — every CI step that needs a tool must install it as a devDependency and use it via `pnpm exec`. No inline bash patterns that duplicate tool logic.
- **Link every PR to the GitHub Project** — always pass `--project "Stratum"` when creating PRs via `gh pr create`.
- **Label every PR on creation** — always pass `--label` to `gh pr create` with the appropriate labels from the set below. Apply at minimum one `type:`, one `area:`, and one `priority:` label.

  Available labels:
  - **Type** (pick one): `type:bug`, `type:enhancement`, `type:dependencies`, `type:docs`, or general `bug`, `enhancement`, `documentation`
  - **Area** (pick any matching): `area:3d-engine`, `area:ai-assistant`, `area:storage`
  - **Priority** (pick one): `priority:high`, `priority:medium`, `priority:low`
  - **Other**: `autorelease:pending`, `dependencies`, `duplicate`, `help wanted`, `wontfix`, `invalid`, `question`, `good first issue`

## Tool Usage

- When you need library docs, use `context7` tools
- When you need to verify a TypeScript type, use `type-inject` tools (`lookup_type`, `list_types`, `type_check`)
- When you need to search the codebase, use `rg` via bash or the explore subagent
- When you finish a task, run `pnpm lint` and `pnpm typecheck`

### Active Skills (auto-invoke)

| Situation | Skill | How to invoke |
|-----------|-------|--------------|
| Bug investigation, feature planning, decision, code review, system analysis | `thinking-tools` | Auto-triggers on words: decide, choose, bug, problem, feature, plan, priority, cause, complex |
| You need an agent to plan a feature for you | `/to-tickets` and `/to-spec` | Trigger via user command |
| Need to review a diff since a fixed point | `code-review` | Load via `skill load code-review` |
| State management with Zustand | `zustand-state` | Auto-triggers on zustand, create(), useStore |
| React hooks extraction / reuse | `hooks-pattern` | Auto-triggers on hooks pattern discussion |
| Higher-Order Component pattern | `hoc-pattern` | Auto-triggers on HOC pattern discussion |
| React 2026 stack questions | `react-2026` | Auto-triggers on React stack / build tooling |
| AI-powered UI patterns (chat, streaming) | `ai-ui-patterns` | Auto-triggers on AI UI / chatbot patterns |
| Turborepo monorepo management | `turborepo-monorepo` | Auto-triggers on monorepo / turborepo config |
| Triage issues through state machine | `/triage` | Trigger via user command |
| Break plans into vertical-slice tickets | `/to-tickets` | Trigger via user command |
| Synthesize conversation into spec/PRD | `/to-spec` | Trigger via user command |
| Two-axis review of diff | `/code-review` | Trigger via user command |

### Reference Skills (load manually)

| Skill | When to `skill load` |
|-------|---------------------|
| `biome` | When linter/formatter errors appear, load for fix strategies |
| `github-actions` | When creating or modifying CI/CD workflow files |

## Agent skills

### Issue tracker
Issues live in GitHub Issues. See `docs/agents/issue-tracker.md`.

### Triage labels
Five canonical labels mapped in `docs/agents/triage-labels.md`.

### Domain docs
Single-context. One CONTEXT.md at root. See `docs/agents/domain.md`.

## Code Annotations (WebStorm TODO Integration)

Use standard WebStorm-recognized tags with optional GitHub issue links:

```
// TODO: wire up Gemini streaming for AI assistant
// TODO(#14): implement zoom-to-fit after camera mode switch
// FIXME(#8): page flip flickers on Safari Mobile
// NOTE: Comlink proxy type must match worker export
// OPTIMIZE: useRequestAnimationFrame for 60fps book renders
```

Scanner patterns detected by WebStorm (View → Tool Windows → TODO):
- `TODO:` — planned feature, deferred implementation
- `FIXME:` — known bug, needs fix before merge
- `NOTE:` — important context for future readers
- `OPTIMIZE:` — performance improvement candidate

When I write code and there's a deferred concern, I use these tags. WebStorm's TODO panel lists all of them. Clicking a `TODO(#N)` link opens GitHub issue #N directly in the browser.

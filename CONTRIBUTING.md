# Contributing to Stratum

## Setup

```bash
git clone <repo-url>
cd stratum
pnpm install
pnpm dev
```

Requirements: Node >= 20, pnpm >= 9.

## Development Workflow

1. Create a branch: `git checkout -b feat/my-feature` or `fix/my-fix`
2. Make changes, following `docs/conventions.md`
3. Run verification: `pnpm lint && pnpm typecheck`
4. Commit using conventional commits (max 50 char subject)
5. Push and open a PR against `main`

## Commit Style

```
feat: add PDF drag-and-drop import
fix: correct page flip animation on edge
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`, `ci`.

## PR Guidelines

- One concern per PR
- Link related issues
- Ensure CI passes (lint, typecheck, tests)
- Request review from a maintainer

## Code Standards

- Biome for lint/format (config at root)
- TypeScript strict mode
- No manual React imports (unplugin-auto-import)
- Follow naming conventions in `docs/conventions.md`

## Architecture

See `docs/architecture.md` for module boundaries and `CONTEXT.md` for domain language.

## Questions?

Open a discussion or issue.

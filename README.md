# Stratum

Local-first 3D PDF Reader & AI Assistant.

## Quickstart

```bash
pnpm install
pnpm dev
pnpm lint
pnpm typecheck
pnpm test
pnpm test:coverage
```

## Architecture

Monorepo: `apps/web` (React 19 SPA) · `apps/api` (Vercel serverless) · `packages/3d-engine-vendor` (legacy DearFlip)

## Stack

React 19 · Vite 7 · React Router 7 · ShadCN UI (React Aria) · Tailwind CSS v4 · Three.js · Zustand · Dexie.js · Comlink · Vitest · Biome · Turborepo · pnpm

## Docs

- `CONTEXT.md` — domain model & ubiquitous language
- `docs/architecture.md` — architecture decisions & data flow
- `docs/conventions.md` — code conventions supplementing biome.json
- `AGENTS.md` — AI assistant rules (for tooling use only)
- `apps/web/components.json` — ShadCN UI component registry

## Requirements

Node >= 20 · pnpm >= 9

## License

MIT

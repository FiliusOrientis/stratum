# Stratum

Local-first 3D PDF Reader & AI Assistant.

## Quickstart

```bash
pnpm install
pnpm dev
```

## Architecture

Monorepo: `apps/web` (React 19 SPA) · `apps/api` (Vercel serverless) · `packages/3d-engine-vendor` (legacy DearFlip)

## Stack

React 19 · Vite 7 · React Router 7 · Three.js · Zustand · Dexie.js · Comlink · Biome · Turborepo · pnpm

## Docs

- `CONTEXT.md` — domain model & ubiquitous language
- `docs/architecture.md` — architecture decisions & data flow
- `docs/conventions.md` — code conventions supplementing biome.json
- `AGENTS.md` — AI assistant rules (for tooling use only)

## Requirements

Node >= 20 · pnpm >= 9

## License

MIT

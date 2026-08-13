# Stratum

Local-first 3D PDF Reader & AI Assistant.

3D-only flipbook viewer (single page). No 2D/slider/reader modes. One thing done well.

## Quickstart

```bash
pnpm install
pnpm dev              # App @ localhost:5173
pnpm cosmos           # UI board @ localhost:5000
pnpm lint
pnpm typecheck
pnpm test
pnpm test:coverage
pnpm audit:all        # knip (dead code/deps) + dependency-cruiser (structure)
pnpm audit            # pnpm security audit (vulnerabilities)
```

## Architecture

Monorepo: `apps/web` (React 19 SPA) → `apps/api` (Vercel serverless, planned) → `packages/3d-engine-vendor` (legacy DearFlip — reference only)

### Key features

- **PDF Import** — drag-and-drop + URL import, OPFS storage
- **3D Flipbook** — R3F single-page viewer (planned — deps not installed)
- **3D Bookshelf** — R3F catalog view (planned — deps not installed)
- **Projected Text Layer** — selectable text on 3D pages (planned — deps not installed)
- **PDF Pipeline** — Comlink Web Worker for pdfjs-dist parsing (planned — deps not installed)
- **Storage** — OPFS (binary PDFs); structured metadata in-memory (Dexie planned)
- **Responsive** — Desktop, tablet, mobile from day one

## Stack

React 19 → Vite 8 → React Router 8 → Motion → React Cosmos → ShadCN UI (React Aria) → Tailwind CSS v4 → Zustand → Vitest → Biome → Turborepo → pnpm

## Docs

- `CONTEXT.md` — domain model & ubiquitous language
- `docs/architecture.md` — architecture decisions & data flow
- `docs/conventions.md` — code conventions supplementing biome.json
- `docs/code/` — per-module code documentation (every function, type, and export documented)
- `AGENTS.md` — AI assistant rules (for tooling use only)
- `apps/web/components.json` — ShadCN UI component registry

## Requirements

Node >= 20 · pnpm >= 9

## License

MIT

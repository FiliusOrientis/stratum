# Stratum

Local-first 3D PDF Reader & AI Assistant.

3D-only flipbook viewer (single page). No 2D/slider/reader modes. One thing done well.

## Quickstart

```bash
pnpm install
pnpm dev              # App @ localhost:5173
pnpm storybook        # UI board @ localhost:6006
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

- **3D Flipbook** — @react-three/fiber (R3F) with Bezier-curve page-turn, cover types (none/plain/basic/ridge), zoom modes (fit/width/custom)
- **3D Bookshelf** — R3F 3D catalog view of saved books
- **Projected Text Layer** — Select/copy text on 3D pages via screen-space HTML overlay synced to mesh transforms
- **PDF Pipeline** — comlink Web Worker for pdfjs-dist parsing, OffscreenCanvas rendering
- **Storage** — Dexie.js (metadata) + OPFS (binary PDFs)
- **Responsive** — Desktop, tablet, mobile from day one

## Stack

React 19 → Vite 7 → React Router 8 → @react-three/fiber → Motion → Storybook 10 → ShadCN UI (React Aria) → Tailwind CSS v4 → Zustand → Dexie.js → Comlink → Vitest → Biome → Turborepo → pnpm

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

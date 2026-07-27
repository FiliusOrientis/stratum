# Architecture Decisions

## Monorepo Structure

```
stratum/
├── apps/
│   ├── web/          # React 19 SPA (Vite 7, React Router 7)
│   └── api/          # Vercel Serverless Functions
├── packages/
│   └── 3d-engine-vendor/  # Legacy DearFlip code (isolated)
├── docs/             # Architecture & convention docs
├── biome.json        # Linter/formatter config
├── turbo.json         # Turborepo pipeline
└── pnpm-workspace.yaml
```

## Isolation Boundary

`packages/3d-engine-vendor` is a **legacy island**. No code in `apps/web` may import from it directly. If 3D engine code is needed, it must go through a typed adapter layer within the vendor package.

## Worker Architecture

```
┌─────────────┐    Comlink RPC    ┌──────────────┐
│  apps/web   │ ◄──────────────► │  PDF Worker   │
│  (main)     │    typed proxy   │  (web worker) │
└─────────────┘                   └──────────────┘
```

- Comlink wraps worker communication as typed async function calls
- No raw `postMessage` anywhere
- Worker lives in `apps/web/src/workers/`

## State Architecture

```
Zustand stores (no context, no prop drilling):
├── viewerStore    — camera, zoom, page state, spread mode
├── toolbarStore   — active tools, panels, visibility
└── themeStore     — dark theme (always), accent colors
```

## Styling Architecture

- Flat layout, zero border-radius
- Typography: Instrument Serif (headings) + Instrument Sans (body)
- High-contrast dark theme with slate-blue accents
- CSS modules or vanilla CSS (no Tailwind decision yet)

## Data Architecture

```
┌──────────┐  raw bytes   ┌──────────┐  parsed   ┌───────────┐
│   OPFS   │ ◄────────── ► │  Worker  │ ────────► │  Dexie    │
│  (PDFs)  │               │          │           │ (9 tables)│
└──────────┘               └──────────┘           └───────────┘
```

- OPFS: Origin Private File System for binary PDF storage
- Dexie.js: 9-table IndexedDB wrapper for metadata, history, annotations
- Dual search: client IndexedDB FTS + serverless HuggingFace embeddings (apps/api/embed.ts)

## Decisions to Make (Phase 2+)

- [ ] CSS approach: CSS modules vs vanilla vs Tailwind
- [ ] Component library: shadcn/ui vs custom
- [ ] Testing framework: Vitest (likely)
- [ ] Font loading strategy

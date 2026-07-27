# Architecture Decisions

## Monorepo Structure

```
stratum/
├── apps/
│   ├── web/          # React 19 SPA (Vite 7, React Router 8)
│   │   └── src/
│   │       ├── routes/        # Route-level components (Home, Catalog, etc.)
│   │       ├── components/    # Feature components (book-viewer, ai-chat, catalog)
│   │       ├── workers/       # Comlink web workers (PDF, search)
│   │       ├── stores/        # Zustand stores (viewer, toolbar, theme)
│   │       └── lib/           # Utilities, helpers, types
│   └── api/          # Vercel Serverless Functions
├── packages/
│   └── 3d-engine-vendor/  # Legacy DearFlip code (isolated)
├── docs/             # Architecture & convention docs
├── biome.json        # Linter/formatter config
├── turbo.json        # Turborepo pipeline
├── tsconfig.json     # Root TypeScript base config
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

- **ShadCN UI** (React Aria base) — all UI from shadcn/ui primitives, never raw HTML/CSS
- **Tailwind CSS v4** — `@tailwindcss/vite` plugin, `@theme` directive for design tokens
- **Flat layout, small radius** (--radius: 0.45rem)
- **Typography**: Instrument Serif (headings) + Instrument Sans (body)
- **High-contrast dark theme** with slate-blue accents (cyan theme in shadcn preset)
- **Semantic colors only**: `bg-primary`, `text-muted-foreground`, never raw oklch values
- **Icons**: Phosphor (`@phosphor-icons/react`)

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

## Scaffolding (Phase 2)

Phase 2 established the `apps/web` skeleton:
- Vite 7 + React 19 + React Router 7 (library mode)
- `createBrowserRouter` + `RouterProvider` for routing
- TypeScript 7 root config extended by per-app configs
- Biome 2.5.5 linewidth 100 — naming convention relaxed to allow React components (PascalCase)
- Empty dirs for components, workers, stores, lib

## Decisions Made

- **Styling**: Tailwind CSS v4 + ShadCN UI (React Aria base), resolved
- **Component library**: ShadCN UI with React Aria base (b8PjchPDgw preset)
- **Testing**: Vitest + @testing-library/react + jsdom + v8 coverage, resolved
- **UI board**: Storybook 10 (react-vite), resolved
- **Font loading**: ShadCN preset handles @fontsource imports

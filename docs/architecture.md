# Architecture Decisions

## Monorepo Structure

```
stratum/
├── apps/
│   ├── web/          # React 19 SPA (Vite 8, React Router 8)
│   │   └── src/
│   │       ├── routes/        # Route-level components (Home, Catalog, etc.)
│   │       ├── components/    # Feature components (app-shell, ui, shared)
│   │       ├── stores/        # Zustand stores (viewer, toolbar, catalog, settings)
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

`packages/3d-engine-vendor` is a **legacy island**. No code in `apps/web` can import from it directly. If you need 3D engine code, route it through a typed adapter layer within the vendor package.

## Worker Architecture

```
┌─────────────┐    Comlink RPC    ┌──────────────┐
│  apps/web   │ ◄───────────────► │  PDF Worker  │
│  (main)     │    typed proxy    │ (web worker) │
└─────────────┘                   └──────────────┘
```

Planned — no worker code or deps exist yet. When built:
- Comlink wraps worker communication as typed async function calls
- No raw `postMessage` anywhere
- Worker lives in `apps/web/src/workers/`

## State Architecture

```
Zustand stores (no context, no prop drilling):
├── viewerStore    — current page, page count, zoom mode/level, cover type, fullscreen
├── toolbarStore   — edge position (top/bottom/hidden), hide/show, drawer visibility
├── catalogStore   — book list, import state
└── settingsStore  — Gemini keys, dialog state
```

## Styling Architecture

- **ShadCN UI** (React Aria base) — all UI from shadcn/ui primitives, never raw HTML/CSS
- **Tailwind CSS v4** — `@tailwindcss/vite` plugin, `@theme` directive for design tokens
- **Flat layout, small radius** (--radius: 0.45rem)
- **Typography**: Instrument Serif (headings) + Instrument Sans (body)
- **High-contrast dark theme** with slate-blue accents (cyan theme in shadcn preset)
- **Semantic colors only**: `bg-primary`, `text-muted-foreground`, never raw oklch values
- **Icons**: Lucide (`lucide-react`)
- **Animations**: Motion (`motion/react`) for component transitions (toolbar slide, panel show/hide). `AnimatePresence` handles exit animations with spring physics. 3D flipbook uses R3F's native animation system — Motion is not used for 3D.

## Data Architecture

Current: PDF import → OPFS (bytes) → in-memory catalog (no persistence layer yet).

```
┌──────────┐  raw bytes    ┌──────────┐  parsed   ┌───────────┐
│   OPFS   │ ◄───────────► │  Worker  │ ────────► │  Dexie    │
│  (PDFs)  │               │          │           │ (1 table) │
└──────────┘               └──────────┘           └───────────┘
```

Target (Dexie not installed yet):
- OPFS: Origin Private File System for binary PDF storage (current)
- Dexie.js: 1-table IndexedDB wrapper (`books`) — planned
- Dual search: client IndexedDB FTS + serverless HuggingFace embeddings (planned)

## Scaffolding (Phase 2)

Phase 2 established the `apps/web` skeleton:
- Vite 8 + React 19 + React Router 8 (library mode)
- `createBrowserRouter` + `RouterProvider` for routing
- TypeScript 7 root config extended by per-app configs
- Biome 2.5.8 linewidth 100 — naming convention relaxed to allow React components (PascalCase)

## Decisions Made

- **Styling**: Tailwind CSS v4 + ShadCN UI (React Aria base), resolved
- **Component library**: ShadCN UI with React Aria base (b8PjeSOMUc preset)
- **Testing**: Vitest + @testing-library/react + jsdom + v8 coverage, resolved
- **UI board**: React Cosmos (react-cosmos-plugin-vite), resolved
- **Font loading**: ShadCN preset handles @fontsource imports

## Architecture Audit

Two automated gates enforce the structure in this document. Run via `pnpm audit` (CI job `audit`):

### Dead code (knip — `knip.json`)

Finds unused files, dependencies, exports, and binaries. `knip.json` documents the intentional exclusions (vendored `ui/` registry, manual scripts).

### Structure rules (dependency-cruiser — `.dependency-cruiser.cjs`)

| Rule                                  | Enforces                                                                               |
|---------------------------------------|----------------------------------------------------------------------------------------|
| `not-to-unresolvable` / `no-circular` | No broken imports, no cycles                                                           |
| `no-orphans`                          | Every file is imported (placeholders/ambient files exempted)                           |
| `vendor-isolation`                    | `apps/web` never imports `packages/3d-engine-vendor` (isolation boundary)              |
| `ui-primitives-self-contained`        | `components/ui/*` only imports ui siblings + `lib/utils`                               |
| `lib-pure`                            | `lib/` never imports components/routes/stores/hooks/workers                            |
| `stores-pure`                         | `stores/` never imports components/routes/hooks/workers                                |
| `hooks-layer`                         | `hooks/` never imports components/routes/workers                                       |
| `workers-isolated`                    | `workers/` only imports `lib/`                                                         |
| `routes-use-barrels`                  | `routes/` reaches components via barrels or root shared files, never feature internals |

**TypeScript split**: dependency-cruiser cannot transpile TypeScript ≥7, so root `typescript` stays pinned at v6 and `apps/web` uses TS7 via the `npm:typescript@7.0.2` alias. `tsconfig.depcruise.json` maps `@/` for the audit run.

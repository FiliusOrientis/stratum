'use strict'
module.exports = {
  forbidden: [
    {
      name: 'not-to-unresolvable',
      comment: 'Import resolves to nothing',
      severity: 'error',
      from: {},
      to: { couldNotResolve: true },
    },
    {
      name: 'no-circular',
      comment: 'Cyclic dependency — split the module or move shared logic to lib/',
      severity: 'error',
      from: {},
      to: { circular: true },
    },
    {
      name: 'no-orphans',
      comment: 'File is never imported — dead code or misplaced',
      severity: 'warn',
      from: {
        orphan: true,
        pathNot: '^apps/web/src/(test/setup|auto-imports|vite-env)\\.(d\\.)?ts$',
      },
      to: {},
    },
    {
      name: 'vendor-isolation',
      comment:
        'apps/web must not import the legacy 3d-engine-vendor island (docs/architecture.md isolation boundary)',
      severity: 'error',
      from: { path: '^apps/web/src' },
      to: { path: '^packages/3d-engine-vendor' },
    },
    {
      name: 'ui-primitives-self-contained',
      comment:
        'components/ui/* are vendored shadcn primitives — may only import ui siblings and lib/utils',
      severity: 'error',
      from: {
        path: '^apps/web/src/components/ui',
        pathNot: '\\.(test|stories)\\.tsx?$',
      },
      to: {
        path: '^apps/web/src',
        pathNot: '^apps/web/src/components/ui|^apps/web/src/lib/utils',
      },
    },
    {
      name: 'lib-pure',
      comment:
        'lib/ is the bottom layer — may not import components, routes, stores, hooks, or workers',
      severity: 'error',
      from: {
        path: '^apps/web/src/lib',
        pathNot: '\\.(test|stories)\\.tsx?$',
      },
      to: { path: '^apps/web/src/(components|routes|stores|hooks|workers)' },
    },
    {
      name: 'stores-pure',
      comment:
        'stores/ may import lib and other stores — never components, routes, hooks, or workers',
      severity: 'error',
      from: {
        path: '^apps/web/src/stores',
        pathNot: '\\.(test|stories)\\.tsx?$',
      },
      to: { path: '^apps/web/src/(components|routes|hooks|workers)' },
    },
    {
      name: 'hooks-layer',
      comment: 'hooks/ may import lib, stores, and ui — not components, routes, or workers',
      severity: 'error',
      from: {
        path: '^apps/web/src/hooks',
        pathNot: '\\.(test|stories)\\.tsx?$',
      },
      to: { path: '^apps/web/src/(components|routes|workers)' },
    },
    {
      name: 'workers-isolated',
      comment: 'workers/ are Comlink islands — may only import lib',
      severity: 'error',
      from: {
        path: '^apps/web/src/workers',
        pathNot: '\\.(test|stories)\\.tsx?$',
      },
      to: { path: '^apps/web/src/(components|routes|stores|hooks)' },
    },
    {
      name: 'routes-use-barrels',
      comment:
        'routes/ may only reach components via barrels (feature/index.ts) or root shared components — never feature internals',
      severity: 'error',
      from: {
        path: '^apps/web/src/routes',
        pathNot: '\\.(test|stories)\\.tsx?$',
      },
      to: {
        path: '^apps/web/src/components',
        pathNot:
          '^apps/web/src/components/[^/]+/index\\.ts$|^apps/web/src/components/[^/]+\\.tsx?$',
      },
    },
  ],
  options: {
    doNotFollow: { path: 'node_modules' },
    exclude: { path: 'node_modules' },
    includeOnly: { path: '^(apps/web/src|packages)' },
    tsConfig: { fileName: 'tsconfig.depcruise.json' },
    tsPreCompilationDeps: true,
  },
}

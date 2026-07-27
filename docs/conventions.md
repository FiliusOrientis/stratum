# Code Conventions

Supplementary to `biome.json` enforcement. All Biome rules apply; these cover what the linter cannot.

## File Naming

- Directories: `kebab-case`
- Component files: `kebab-case.tsx`
- Utility files: `kebab-case.ts`
- Store files: `kebab-case.store.ts`
- Worker files: `kebab-case.worker.ts`
- Type files: `kebab-case.types.ts`
- Test files: co-located `*.test.ts` alongside source

## Directory Layout

```
src/
├── routes/        # Route-level components (1 per route)
├── components/    # Feature components (book-viewer, ai-chat, catalog)
├── workers/       # Comlink web workers
├── stores/        # Zustand stores
└── lib/           # Utilities, helpers, types
```

## Component Structure

```
src/components/book-viewer/
├── book-viewer.tsx
├── book-viewer.module.css
├── book-viewer.types.ts
├── book-viewer.test.ts
├── book-spine.tsx
├── book-page.tsx
└── index.ts          # barrel export
```

## Imports

- **Never** write `import { useState } from 'react'` — unplugin-auto-import handles React hooks
- Type-only imports: `import type { Foo } from './types'` (enforced by Biome `useImportType`)
- No relative imports beyond `../../` — use path aliases if needed

## Zustand Stores

- One store file per domain (`viewer.store.ts`, `toolbar.store.ts`, `theme.store.ts`)
- Stores exposed via typed hooks: `useViewerStore`, `useToolbarStore`, `useThemeStore`
- Never access store state directly — always through the hook

## Comlink Workers

- Worker entry file exports typed API: `export const api = { ... }`
- Main thread gets typed proxy: `const worker = wrap(new Worker(...))`
- Never `postMessage` / `onmessage` — use Comlink exclusively

## React Components

- Function components only (enforced by Biome `useArrowFunction`)
- No component definitions nested inside other components
- Props interfaces named `ComponentNameProps` and co-located in `.types.ts`
- Use `<>` fragment syntax, never `<Fragment>` (enforced by Biome `useFragmentSyntax`)
- Both `PascalCase` (components) and `camelCase` (utilities) accepted for function names

## Error Handling

- Never empty catch blocks (enforced by Biome `noEmptyBlockStatements`)
- Always chain errors with `cause`: `throw new Error('msg', { cause: originalError })`
- Never throw non-Error values (enforced by Biome `useThrowNewError`)

## TypeScript

- No explicit `any` without eslint-disable comment (Biome warns `noExplicitAny`)
- No non-null assertions `!` without explicit justification (Biome warns `noNonNullAssertion`)
- Strict equality `===` only (Biome error `noDoubleEquals`)
- Prefer `type` imports (Biome error `useImportType`)

## Promises

- Always handle promise rejections — no floating promises
- Use `await` in async functions, never ignore the result
- Prefer `Promise.all` over sequential awaits where independent

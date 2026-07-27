# Utils

**File**: `apps/web/src/lib/utils.ts`

## Exports

### `cn(...inputs: ClassValue[]): string`

Merges Tailwind CSS classes with conflict resolution. Combines `clsx` (conditional classes) with `tailwind-merge` (intelligent deduplication).

**Parameters:**
- `...inputs: ClassValue[]` — clsx-compatible class inputs (strings, objects, arrays, falsy values)

**Returns:**
- `string` — deduplicated merged class string

**Example:**
```tsx
cn('px-4 py-2', 'px-3', isActive && 'bg-blue-500')
// → 'py-2 px-3 bg-blue-500'  (px-4 overridden by px-3, isActive appended)
```

## Dependencies

- `clsx` — conditional class string builder
- `tailwind-merge` — intelligent Tailwind class conflict resolver
- `tailwind-merge` config uses default Tailwind v4 class resolution

## Usage

```tsx
import { cn } from '@/lib/utils'

<div className={cn('flex items-center', className)} />
```

## Architecture Decisions

- **Separate library** instead of inline `clsx(twMerge(...))` — single import reduces visual noise.
- **No custom `tailwind-merge` config** — default config works for Tailwind v4. Add custom class groups only if merge behavior conflicts arise.

## Testing

Covered indirectly by button component tests (className forwarding). Direct unit tests pending.

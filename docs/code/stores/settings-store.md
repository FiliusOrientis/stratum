# Settings Store

**File**: `apps/web/src/stores/settings.store.ts`

Application settings including Gemini API key management.

## Constants

| Constant   | Value | Description                             |
|------------|-------|-----------------------------------------|
| `MAX_KEYS` | `10`  | Maximum number of BYOK Gemini key slots |

## State

| Property       | Type                 | Default       | Description                      |
|----------------|----------------------|---------------|----------------------------------|
| `geminiKeys`   | `(string \| null)[]` | `[null × 10]` | Array of 10 Gemini API key slots |
| `isDialogOpen` | `boolean`            | `false`       | Settings dialog visibility       |

## Actions

| Action           | Signature                                     | Description                                                        |
|------------------|-----------------------------------------------|--------------------------------------------------------------------|
| `setGeminiKey`   | `(slot: number, key: string \| null) => void` | Set a key at a specific slot (0-9; out-of-range slots are ignored) |
| `clearGeminiKey` | `(slot: number) => void`                      | Clear a key slot (out-of-range slots are ignored)                  |
| `openSettings`   | `() => void`                                  | Open settings dialog                                               |
| `closeSettings`  | `() => void`                                  | Close settings dialog                                              |
| `toggleSettings` | `() => void`                                  | Toggle settings dialog                                             |

## Key Rotation Strategy

10 slots allow round-robin key rotation. When a request fails with 429 (rate limit), the coordinator moves to the next slot. (AI coordinator not yet built — planned.)

## Usage

```tsx
import { MAX_KEYS, useSettingsStore } from '@/stores/settings.store'

function SettingsPanel() {
  const keys = useSettingsStore(s => s.geminiKeys)
  const setKey = useSettingsStore(s => s.setGeminiKey)
  return (
    <div>
      {Array.from({ length: MAX_KEYS }, (_, i) => (
        <input key={i} value={keys[i] ?? ''} onChange={e => setKey(i, e.target.value)} />
      ))}
    </div>
  )
}
```

## Security Notes

- Keys stored in-memory only. User must re-enter on page reload unless persisted.
- Future: encrypt keys before persisting to Dexie config table.
- Never log keys or expose them in error messages.

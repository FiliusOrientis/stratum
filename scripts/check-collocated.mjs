/**
 * Collocation gate — components need co-located tests; public components
 * additionally need a co-located story.
 *
 * Pre-commit check: for every staged/added .tsx under apps/web/src/components/
 * (excluding ui/), require a sibling *.test.tsx. A sibling *.stories.tsx is
 * required only for public components: root-level files or components
 * re-exported by their directory barrel (index.ts). Internal sub-components
 * (e.g. reader-toolbar-controls) are exercised through their parent's story.
 */

import { execSync } from 'node:child_process'
import { existsSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'

const CWD = process.cwd()
const FAILURES = []
const COMPONENTS_PREFIX = 'apps/web/src/components/'

function stagedFiles() {
  const out = execSync('git diff --cached --name-only --diff-filter=ACM', {
    cwd: CWD,
    encoding: 'utf8',
  })
  return out
    .split('\n')
    .map(s => s.trim())
    .filter(Boolean)
}

function componentName(file) {
  const src = readFileSync(file, 'utf8')
  const m = src.match(/export\s+(?:function|const)\s+([A-Z]\w*)/)
  return m ? m[1] : null
}

function isPublicComponent(file) {
  const rel = file.slice(COMPONENTS_PREFIX.length)
  if (!rel.includes('/')) {
    return true
  }
  const barrel = join(CWD, dirname(file), 'index.ts')
  if (!existsSync(barrel)) {
    return false
  }
  const name = componentName(file)
  return !!name && readFileSync(barrel, 'utf8').includes(name)
}

for (const file of stagedFiles()) {
  if (!file.endsWith('.tsx')) {
    continue
  }
  if (!file.startsWith(COMPONENTS_PREFIX)) {
    continue
  }
  if (/\/ui\//.test(file)) {
    continue
  }
  if (file.endsWith('.test.tsx') || file.endsWith('.stories.tsx')) {
    continue
  }
  const base = file.replace(/\.tsx$/, '')
  const abs = join(CWD, file)
  if (!existsSync(abs)) {
    continue
  }
  if (!existsSync(join(CWD, `${base}.test.tsx`))) {
    FAILURES.push(`${file}: missing co-located test (${base}.test.tsx)`)
  }
  if (isPublicComponent(file) && !existsSync(join(CWD, `${base}.stories.tsx`))) {
    FAILURES.push(`${file}: missing co-located story (${base}.stories.tsx)`)
  }
}

if (FAILURES.length > 0) {
  console.error(`collocation gate: ${FAILURES.length} failure(s)`)
  for (const f of FAILURES) {
    console.error(`  - ${f}`)
  }
  process.exit(1)
}
console.log('collocation gate OK')

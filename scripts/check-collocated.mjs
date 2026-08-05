/**
 * Collocation gate — new components need co-located test + story.
 *
 * Pre-commit check: for every staged/added .tsx under apps/web/src/components/
 * (excluding ui/), require a sibling *.test.tsx and *.stories.tsx.
 * Mirrors the "Convention" stage of the UI Change pipeline.
 */

import { execSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import { join } from 'node:path'

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
  for (const [kind, suffix] of [
    ['test', '.test.tsx'],
    ['story', '.stories.tsx'],
  ]) {
    if (!existsSync(join(CWD, `${base}${suffix}`))) {
      FAILURES.push(`${file}: missing co-located ${kind} (${base}${suffix})`)
    }
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

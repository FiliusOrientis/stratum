/**
 * Post-merge housekeeping gate — mechanical checks for Pipeline 3 stage 2.
 *
 * Fails when:
 *  - a branch listed as "Active" in .github/BRANCHES.md is already merged
 *    into the current branch (should be moved to "Merged (Cleaned)" + deleted)
 *  - docs/lint-suppressions.md (referenced by conventions) is missing
 */

import { execSync } from 'node:child_process'
import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

const CWD = process.cwd()
const FAILURES = []

function mergedBranches() {
  let current = ''
  try {
    current = execSync('git branch --show-current', {
      cwd: CWD,
      encoding: 'utf8',
    }).trim()
  } catch {
    // no branch (detached HEAD) — nothing to exclude
  }
  try {
    return execSync('git branch --merged HEAD --format=%(refname:short)', {
      cwd: CWD,
      encoding: 'utf8',
    })
      .split('\n')
      .map(s => s.trim())
      .filter(Boolean)
      .filter(b => b !== 'main' && b !== current)
  } catch {
    return []
  }
}

const branchLog = join(CWD, '.github', 'BRANCHES.md')
const logRaw = readFileSync(branchLog, 'utf8')
const activeSection = logRaw.split('## Merged')[0] ?? ''
for (const branch of mergedBranches()) {
  if (new RegExp(`^\\| \\\`?${branch}\\\`? `, 'm').test(activeSection)) {
    FAILURES.push(
      `BRANCHES.md: \`${branch}\` is merged but still listed as Active — move to "Merged (Cleaned)" and delete`,
    )
  }
}

const suppressions = join(CWD, 'docs', 'lint-suppressions.md')
if (!existsSync(suppressions)) {
  FAILURES.push('docs/lint-suppressions.md missing (referenced by docs/conventions.md)')
}

if (FAILURES.length > 0) {
  console.error(`housekeeping gate: ${FAILURES.length} failure(s)`)
  for (const f of FAILURES) {
    console.error(`  - ${f}`)
  }
  process.exit(1)
}
console.log('housekeeping gate OK')

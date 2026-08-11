/**
 * Git triage — read-only snapshot of the repository state.
 *
 * Emits a compact machine-readable report (one key per line, "key: value"):
 * branch, detached HEAD, dirty files, unpushed commits, merged-but-existing
 * branches, tracking drift, last commit. No command mutates anything — the
 * agent reads this report and decides (via the git-triage skill) whether the
 * task is a continuation, needs a new branch, or needs hygiene first.
 *
 * Usage: node scripts/git-triage.mjs
 */

import { execSync } from 'node:child_process'

const CWD = process.cwd()

function run(cmd) {
  try {
    return execSync(cmd, { cwd: CWD, encoding: 'utf8' }).trim()
  } catch {
    return ''
  }
}

function report() {
  const branch = run('git branch --show-current')
  const detached = branch ? 'no' : 'yes'
  const status = run('git status --porcelain')
    .split('\n')
    .map(s => s.trim())
    .filter(Boolean)
  const staged = status.filter(s => !s.startsWith('??')).length
  const untracked = status.filter(s => s.startsWith('??')).length
  const unpushed = run('git log origin/main..HEAD --oneline')
    .split('\n')
    .map(s => s.trim())
    .filter(Boolean)
  const merged = run('git branch --merged main --format=%(refname:short)')
    .split('\n')
    .map(s => s.trim())
    .filter(Boolean)
    .filter(b => b !== 'main' && b !== branch)
  const lastCommit = run('git log -1 --oneline')
  const hasRemote = run('git rev-parse --verify --quiet origin/main') ? 'yes' : 'no'

  const out = [
    `branch: ${branch || '(detached HEAD)'}`,
    `detached: ${detached}`,
    `has_remote_main: ${hasRemote}`,
    `dirty_files: ${staged + untracked}`,
    `staged_files: ${staged}`,
    `untracked_files: ${untracked}`,
    `unpushed_commits: ${unpushed.length}`,
    `last_commit: ${lastCommit}`,
  ]
  if (staged > 0) {
    out.push(`uncommitted: ${status.slice(0, 10).join(' | ')}`)
  }
  if (unpushed.length > 0) {
    out.push(`unpushed: ${unpushed.slice(0, 5).join(' | ')}`)
  }
  if (merged.length > 0) {
    out.push(`merged_stale_branches: ${merged.join(', ')}`)
  }
  return out.join('\n')
}

console.log(report())

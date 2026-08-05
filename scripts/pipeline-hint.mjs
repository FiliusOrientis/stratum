/**
 * Branch-trigger hint — maps the current branch name to likely pipelines.
 *
 * Runs in lefthook post-checkout: after switching branches, tell the agent
 * which pipeline scope the branch implies (keyword heuristics only).
 */

import { execSync } from 'node:child_process'

const BRANCH_PIPELINES = [
  { re: /ui|component|view|screen/, pipeline: 'UI Change' },
  { re: /(^|\/)(store|hook|worker|route|lib|arch)/, pipeline: 'Architecture' },
  { re: /dep|dependabot|lockfile|package/, pipeline: 'Dependency' },
  { re: /infra|tooling|ci|workflow|lefthook|turbo/, pipeline: 'Infra' },
  { re: /docs|agents|opencode/, pipeline: 'Documentation' },
]

function currentBranch() {
  try {
    return execSync('git branch --show-current', { encoding: 'utf8' }).trim()
  } catch {
    return ''
  }
}

const branch = currentBranch()
if (!branch || branch === 'main') {
  process.exit(0)
}
const hit = BRANCH_PIPELINES.find(({ re }) => re.test(branch))
console.log(
  hit
    ? `branch hint: \`${branch}\` -> ${hit.pipeline} pipeline. Run stages from .agents/pipelines.md when scope files are staged.`
    : `branch hint: \`${branch}\` matches no pipeline scope.`,
)

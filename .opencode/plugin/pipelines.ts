import { execSync } from 'node:child_process'
import type { Plugin } from '@opencode-ai/plugin'

/**
 * Stratum pipeline watcher.
 *
 * Process-triggered: on every chat message, scan working-tree changes
 * (staged, unstaged, and untracked) plus branch hints; when paths match a
 * scoped pipeline, inject a system instruction so the agent runs the
 * pipeline from `.agents/pipelines.md` mechanically — never by discretion.
 *
 * Re-scans each message so mid-session edits that match a new scope inject
 * their pipeline; each scope injects at most once per session.
 */

const PIPELINE_SCOPES: Array<{ name: string; patterns: RegExp[] }> = [
  {
    name: 'UI Change',
    patterns: [/^apps\/web\/src\/components\//],
  },
  {
    name: 'Architecture',
    patterns: [
      /^apps\/web\/src\/stores\//,
      /^apps\/web\/src\/hooks\//,
      /^apps\/web\/src\/lib\//,
      /^apps\/web\/src\/workers\//,
      /^apps\/web\/src\/routes\//,
    ],
  },
  {
    name: 'Dependency',
    patterns: [/^package\.json$/, /^pnpm-lock\.yaml$/, /^apps\/web\/package\.json$/],
  },
  {
    name: 'Infra',
    patterns: [
      /^turbo\.json$/,
      /^pnpm-workspace\.yaml$/,
      /^lefthook\.yml$/,
      /^\.github\/workflows\//,
      /^knip\.json$/,
      /^\.dependency-cruiser\.cjs$/,
      /^biome\.json$/,
    ],
  },
  {
    name: 'Documentation',
    patterns: [
      /^docs\//,
      /^\.agents\//,
      /^\.opencode\//,
      /^AGENTS\.md$/,
      /^CONTEXT\.md$/,
      /^CHANGELOG\.md$/,
      /^\.github\/BRANCHES\.md$/,
    ],
  },
]

const injectedScopes = new Set<string>()

function matchScopes(files: string[]): string[] {
  const matched = new Set<string>()
  for (const file of files) {
    for (const scope of PIPELINE_SCOPES) {
      if (scope.patterns.some(re => re.test(file))) {
        matched.add(scope.name)
      }
    }
  }
  return [...matched]
}

function workingTreeScopes(): string[] {
  try {
    const stdout = execSync('git status --porcelain -uall', {
      cwd: process.cwd(),
      encoding: 'utf8',
    })
    const files = stdout
      .split('\n')
      .filter(Boolean)
      .map(line => line.slice(3).trim())
    return matchScopes(files)
  } catch {
    return []
  }
}

export default (() => {
  return {
    'experimental.chat.messages.transform': (
      messages: Array<{ role?: string; content?: string }>,
    ) => {
      const scopes = workingTreeScopes().filter(scope => !injectedScopes.has(scope))
      if (scopes.length === 0) {
        return messages
      }
      for (const scope of scopes) {
        injectedScopes.add(scope)
      }
      return [
        ...messages,
        {
          role: 'system',
          content: `Pipeline trigger (process event: working-tree changes match scope). Run pipeline(s) ${scopes.join(
            ', ',
          )} from .agents/pipelines.md mechanically. Execute every stage whose condition holds, honor the ask policy (ask BEFORE only for ambiguous/destructive steps; present proposals/audits/critiques as reports AFTER for judgment).`,
        },
      ]
    },
  }
}) satisfies Plugin

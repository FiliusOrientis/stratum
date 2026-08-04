import { execSync } from 'node:child_process'
import type { Plugin } from '@opencode-ai/plugin'

/**
 * Stratum pipeline watcher.
 *
 * Process-triggered: when a session starts with staged changes whose paths
 * match a scoped pipeline (UI Change / Architecture / Dependency / Infra),
 * inject a system instruction so the agent runs the pipeline from
 * `.agents/pipelines.md` mechanically — never by discretion.
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
]

let injected = false

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

function stagedScopes(): string[] {
  try {
    const stdout = execSync('git diff --cached --name-only', {
      cwd: process.cwd(),
      encoding: 'utf8',
    })
    return matchScopes(stdout.split('\n').filter(Boolean))
  } catch {
    return []
  }
}

export default (() => {
  return {
    'experimental.chat.messages.transform': (
      messages: Array<{ role?: string; content?: string }>,
    ) => {
      if (injected) {
        return messages
      }
      const scopes = stagedScopes()
      if (scopes.length === 0) {
        injected = true
        return messages
      }
      injected = true
      return [
        ...messages,
        {
          role: 'system',
          content: `Pipeline trigger (process event: staged changes match scope). Run pipeline(s) ${scopes.join(
            ', ',
          )} from .agents/pipelines.md mechanically. Execute every stage whose condition holds, honor the ask policy (ask BEFORE only for ambiguous/destructive steps; present proposals/audits/critiques as reports AFTER for judgment).`,
        },
      ]
    },
  }
}) satisfies Plugin

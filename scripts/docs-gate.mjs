/**
 * Documentation gate — mechanical freshness checks.
 *
 * Fails when docs drift from reality:
 *  - Biome version claims (AGENTS.md, biome.json $schema, docs/architecture.md)
 *    disagree with package.json
 *  - a skill listed in AGENTS.md "Skills Loaded" is missing from
 *    repo .agents/skills/ (and, on a dev machine, user .agents/skills/)
 *
 * Runs in lefthook post-merge, CI post-merge job, and the Documentation
 * pipeline (Pipeline 9) when docs/.agents/.opencode are staged.
 */

import { existsSync, readFileSync } from 'node:fs'
import { homedir } from 'node:os'
import { join } from 'node:path'

const CWD = process.cwd()
const HOME = homedir()
const FAILURES = []
const SCHEMA_RE = /"\$?schema"?\s*:\s*"([^"]*biomejs[^"]*)"/
const BIOME_CLAIM_RE = /Biome\s+(\d+\.\d+\.\d+)/g
const SKILL_REF_RE = /`([a-z0-9][a-z0-9-]*)`/g

const fail = msg => {
  FAILURES.push(msg)
  console.error(`FAIL  ${msg}`)
}

function biomeVersionFromPackageJson() {
  const { devDependencies } = JSON.parse(readFileSync(join(CWD, 'package.json'), 'utf8'))
  return (devDependencies['@biomejs/biome'] ?? '').replace(/[^\d.]/g, '')
}

function biomeSchemaFromJson() {
  const raw = readFileSync(join(CWD, 'biome.json'), 'utf8')
  const m = raw.match(SCHEMA_RE)
  return m ? m[1] : ''
}

function auditBiomeVersion() {
  let expected = ''
  try {
    expected = biomeVersionFromPackageJson()
  } catch {
    fail('package.json unreadable or missing @biomejs/biome')
    return
  }
  const schema = biomeSchemaFromJson()
  if (schema && !schema.includes(`/schemas/${expected}/schema.json`)) {
    fail(`biome.json $schema is ${schema}, expected /schemas/${expected}/schema.json`)
  }
  for (const file of ['AGENTS.md', 'docs/architecture.md']) {
    const raw = readFileSync(join(CWD, file), 'utf8')
    for (const m of raw.matchAll(BIOME_CLAIM_RE)) {
      if (m[1] !== expected) {
        fail(`${file}: claims Biome ${m[1]}, package.json has ${expected}`)
      }
    }
  }
}

function auditSkillRefs() {
  const repoSkills = join(CWD, '.agents', 'skills')
  const homeSkills = join(HOME, '.agents', 'skills')
  const homeExists = existsSync(homeSkills)
  const Tools = new Set([
    'biome',
    'tsc',
    'knip',
    'turbo',
    'pnpm',
    'git',
    'commitlint',
    'vitest',
    'npm',
    'node',
  ])
  // Only the "Skills Loaded" section is a canonical skill list; other backticks
  // in AGENTS.md/pipelines.md are hooks, commands, files, or globs.
  const raw = readFileSync(join(CWD, 'AGENTS.md'), 'utf8')
  const section = raw.split('## Skills Loaded')[1] ?? ''
  const seen = new Set()
  for (const m of section.matchAll(SKILL_REF_RE)) {
    const name = m[1]
    if (seen.has(name) || Tools.has(name) || name.endsWith('-')) {
      continue
    }
    seen.add(name)
    const repoSkill = existsSync(join(repoSkills, name, 'SKILL.md'))
    const homeSkill = homeExists && existsSync(join(homeSkills, name, 'SKILL.md'))
    if (repoSkill || homeSkill) {
      continue
    }
    if (!homeExists) {
      // CI has no user skills dir — global-only skills can't be verified here
      continue
    }
    fail(`AGENTS.md Skills Loaded: \`${name}\` has no SKILL.md in repo or user skills`)
  }
}

auditBiomeVersion()
auditSkillRefs()

if (FAILURES.length > 0) {
  console.error(`\ndocs-gate: ${FAILURES.length} failure(s)`)
  process.exit(1)
}
console.log('docs-gate OK')

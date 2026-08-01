#!/usr/bin/env node

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const pkgDir = path.resolve(
  root,
  'node_modules',
  '.pnpm',
  '@phosphor-icons+react@2.1.10_react-dom@19.2.8_react@19.2.8__react@19.2.8',
  'node_modules',
  '@phosphor-icons',
  'react',
)
const defsDir = path.resolve(pkgDir, 'dist', 'defs')
const typesFile = path.resolve(pkgDir, 'dist', 'lib', 'types.d.ts')

let modified = 0
let skipped = 0

// 1. Patch TypeScript types
if (fs.existsSync(typesFile)) {
  let content = fs.readFileSync(typesFile, 'utf-8')
  const oldType =
    'export type IconWeight = "thin" | "light" | "regular" | "bold" | "fill" | "duotone";'
  const newType =
    'export type IconWeight = "thin" | "light" | "regular" | "bold" | "fill" | "duotone" | "thin-duotone";'
  if (content.includes('"thin-duotone"')) {
    console.log('ℹ  types.d.ts already patched')
  } else if (content.includes(oldType)) {
    content = content.replace(oldType, newType)
    fs.writeFileSync(typesFile, content, 'utf-8')
    console.log('✓  patched types.d.ts')
  } else {
    console.log('⚠  types.d.ts: unexpected format — skipping type patch')
    skipped++
  }
} else {
  console.log('⚠  types.d.ts not found — skipping type patch')
  skipped++
}

// 2. Patch each defs file
if (!fs.existsSync(defsDir)) {
  console.error(`✗  defs directory not found: ${defsDir}`)
  process.exit(1)
}

const files = fs.readdirSync(defsDir).filter(f => f.endsWith('.es.js'))

for (const file of files) {
  const filePath = path.join(defsDir, file)
  let content = fs.readFileSync(filePath, 'utf-8')

  // Strip existing thin-duotone entry if present (from a previous run)
  const tdEntryRe = /,\n {2}\[\n {4}"thin-duotone",[\s\S]*?\n {2}\]\n\]\);/
  content = content.replace(tdEntryRe, '\n]);')

  // Extract the React import var name (could be 'a', 'e', etc.)
  const importMatch = content.match(/import \* as (\w+) from "react"/)
  if (!importMatch) {
    console.log(`⚠  ${file}: no React import found — skipping`)
    skipped++
    continue
  }
  const r = importMatch[1] // React variable name

  // Split the Map entries: pattern matches each full entry
  const entryPattern = /\n {2}\[(?:\n {4}"[^"]+",\n {4}.*?\n {2}\])/gs
  const entries = [...content.matchAll(entryPattern)]

  if (entries.length === 0) {
    console.log(`⚠  ${file}: no Map entries found — skipping`)
    skipped++
    continue
  }

  let duotoneEntry = null
  let thinEntry = null

  for (const [entry] of entries) {
    if (entry.includes('"duotone"')) {
      duotoneEntry = entry
    } else if (entry.includes('"thin"')) {
      thinEntry = entry
    }
  }

  if (!(duotoneEntry && thinEntry)) {
    console.log(`⚠  ${file}: missing duotone or thin entry — skipping`)
    skipped++
    continue
  }

  // Extract the createElement(Fragment, null, ...) body from each entry
  // The body ends with `)` followed by newline + spaces + `]`
  const bodyRe = new RegExp(`${r}\\.createElement\\(${r}\\.Fragment, null, (.+)\\)\n  \\]`, 's')

  const thinBodyMatch = thinEntry.match(bodyRe)
  const duotoneBodyMatch = duotoneEntry.match(bodyRe)

  if (!(thinBodyMatch && duotoneBodyMatch)) {
    console.log(`⚠  ${file}: could not parse entry body — skipping`)
    skipped++
    continue
  }

  const thinBodyText = thinBodyMatch[1]
  const duotoneBodyText = duotoneBodyMatch[1]

  // Extract individual path createElement calls
  // Path format: /* @__PURE__ */ r.createElement("path", { d: "...", ... })
  // Some icons have multiline path attrs (newlines between "path" and {,
  // and between } and )). Allow optional whitespace in both gaps.
  const pathRe = new RegExp(
    `\\/\\* @__PURE__ \\*\\/ ${r}\\.createElement\\(\\s*"path",\\s*\\{[^}]+\\}\\s*\\)`,
    'gs',
  )

  const duotonePathEls = [...duotoneBodyText.matchAll(pathRe)]
  const thinPathEls = [...thinBodyText.matchAll(pathRe)]

  if (duotonePathEls.length === 0 || thinPathEls.length === 0) {
    console.log(`⚠  ${file}: no path elements found — skipping`)
    skipped++
    continue
  }

  // Duotone first path = background (has opacity="0.2")
  const duotoneBgPath = duotonePathEls[0][0]
  // All thin paths = foreground outline
  const thinFgPaths = thinPathEls.map(m => m[0]).join(', ')

  // Build merged entry — insert after the thin entry
  const mergedEntry = `\n  [\n    "thin-duotone",\n    /* @__PURE__ */ ${r}.createElement(${r}.Fragment, null, ${duotoneBgPath}, ${thinFgPaths})\n  ]`

  const insertPos = content.indexOf(thinEntry) + thinEntry.length
  content = `${content.slice(0, insertPos)},${mergedEntry}${content.slice(insertPos)}`

  fs.writeFileSync(filePath, content, 'utf-8')
  modified++
}

console.log(`\nDone. Modified: ${modified}, Skipped: ${skipped}`)

/**
 * Extract the ASD-STE100 Issue 9 approved-vocabulary rule from the official PDF.
 *
 * The official dictionary is ASD-copyrighted — this script generates the Vale
 * rule LOCALLY from the user's licensed copy. Output is gitignored.
 *
 * Usage:
 *   node scripts/extract-ste-dictionary.mjs [path-to-pdf] [output.yml]
 *
 * Parsing: the word list pages (Part 2, "Word list") are a 5-column table.
 * Column x≈50 = the WORD (UPPERCASE = approved, lowercase = NOT approved),
 * column x≈159 = approved ALTERNATIVES. For each non-approved word, emit a
 * substitution entry non-approved → approved alternative.
 */

import { existsSync } from 'node:fs'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

// Anchor to the repo root via this file's own location (scripts/), so the
// script works regardless of the cwd (pdfjs-dist resolves from apps/web).
const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const DEFAULT_PDF = join(ROOT, 'styles', 'ste100', 'ASD-STE100_ISSUE9.pdf')
const DEFAULT_OUT = join(ROOT, 'styles', 'DictionaryFull', 'DictionaryFull.yml')
const SOURCE_URL = 'https://www.asd-ste100.org/assets/files/ASD-STE100_ISSUE9.pdf'

const POS_TAG = ['adj', 'adv', 'conj', 'n', 'prep', 'pron', 'v', 'TN'].join('|')
const POS_TOKEN_RE = new RegExp(`([A-Za-z][A-Za-z-]*)\\s*\\((${POS_TAG})\\)`, 'g')
const SINGLE_WORD_RE = /^[a-zA-Z][a-zA-Z-]*$/
const UPPER_ALT_RE = new RegExp(`^(?:[A-Z0-9]+\\s*)+(?:\\((${POS_TAG})\\))?$`)
const STRIP_POS_RE = new RegExp(`\\s*\\((${POS_TAG})\\)\\s*$`, 'i')

// Words whose STE dictionary meaning is aerospace-specific and misleads on
// software prose (e.g. "port" = LEFT side of a ship, "branch" = road fork).
// STE100 itself cannot express meaning in lint rules; these are the
// documented ceiling. Keep the approved-word exclusion for POS, this list
// for domain. Add here, never to the generated rule.
const DOMAIN_BLOCKLIST = new Set([
  'abaft',
  'aft',
  'ahead',
  'aircraft',
  'airscrew',
  'aileron',
  'altitude',
  'amidships',
  'armament',
  'ascent',
  'aviation',
  'ballast',
  'beam',
  'bearing',
  'bow',
  'cabin',
  'carrier',
  'chord',
  'cockpit',
  'compass',
  'cowl',
  'elevator',
  'flap',
  'fore',
  'fuse',
  'fuselage',
  'gear',
  'hangar',
  'hatch',
  'hold',
  'keel',
  'landing',
  'latch',
  'port',
  'pitch',
  'propeller',
  'rudder',
  'seam',
  'spar',
  'starboard',
  'stern',
  'strut',
  'throttle',
  'thrust',
  'turret',
  'wing',
  'yaw',
  'bolt',
  'nut',
  'rivet',
  'weld',
  'lubricate',
  'grease',
  'pipe',
  'valve',
  'pump',
  'manifold',
  'cylinder',
  'piston',
  'crank',
  'cam',
  'clutch',
  'brake',
  'axle',
  'wheel',
  'tire',
  'tyre',
  'bracket',
  'flange',
  'gasket',
  'lathe',
  'boring',
  'ream',
  'file',
  'hone',
  'tap',
  'die',
  'milling',
  'fixture',
  'jig',
  'gage',
  'gauge',
  'vernier',
  'caliper',
  'torque',
  'tensile',
  'compressive',
  'fatigue',
  'corrosion',
  'erosion',
  'rust',
  'abrasive',
  'solvent',
  'thinner',
  'primer',
  'varnish',
  'enamel',
  'dope',
  'adhesive',
  'sealant',
  'putty',
  'shim',
  'spacer',
  'washer',
  'grommet',
  'bushing',
  'sleeve',
  'collar',
  'coupling',
  'adapter',
  'branch',
  'real',
  'ask',
  'via',
  'need',
  'order',
  'never',
  'run',
  'build',
  'code',
  'log',
  'main',
  'fix',
  'file',
  'call',
  'case',
  'motion',
  'load',
  'pass',
  'past',
  'per',
  'present',
  'quick',
  'reference',
  'require',
  'review',
  'scan',
  'search',
  'security',
  'split',
  'state',
  'trigger',
  'unsafe',
  'verify',
  'preset',
  'bump',
  'exclude',
  'exist',
  'force',
  'job',
  'reset',
  'cover',
  'within',
  'yet',
  'entire',
  'every',
  'over',
  'base',
  'modify',
  'conventional',
  'running',
  'component',
  '0',
  '1',
  'action',
  'allow',
  'already',
  'application',
  'appropriate',
  'arrange',
  'attempt',
  'beyond',
  'choice',
  'concern',
  'create',
  'cross',
  'delete',
  'demand',
  'design',
  'detail',
  'enforce',
  'event',
  'excluding',
  'expect',
  'explain',
  'extract',
  'feature',
  'filter',
  'finding',
  'form',
  'graph',
  'guard',
  'handle',
  'hook',
  'improve',
  'independent',
  'inside',
  'isolation',
  'key',
  'land',
  'list',
  'mesh',
  'note',
  'origin',
  'outline',
  'presence',
  'proper',
  'raise',
  'reach',
  'reading',
  'reason',
  'remain',
  'render',
  'reuse',
  'rotation',
  'route',
  'similar',
  'situation',
  'slide',
  'speech',
  'spread',
  'spring',
  'stage',
  'store',
  'support',
  'thread',
  'unused',
  'would',
  'wrong',
  'zero',
  'annotation',
  'both',
  'true',
  'false',
  'absence',
  'additional',
  'advance',
  'alternate',
  'anchor',
  'any',
  'arise',
  'avoid',
  'aware',
  'bounds',
  'center',
  'clamp',
  'collapse',
  'conflict',
  'consistent',
  'convert',
  'danger',
  'detect',
  'direct',
  'don',
  'drag',
  'drift',
  'either',
  'enable',
  'enter',
  'evaluate',
  'exact',
  'expose',
  'extra',
  'faint',
  'gap',
  'identical',
  'idle',
  'impact',
  'implementation',
  'including',
  'instead',
  'join',
  'just',
  'label',
  'later',
  'link',
  'match',
  'may',
  'mount',
  'once',
  'outside',
  'partial',
  'persist',
  'pop',
  'press',
  'proceed',
  'ready',
  'relevant',
  'request',
  'restore',
  'return',
  'reusable',
  'right-hand',
  'round',
  'save',
  'separate',
  'several',
  'should',
  'size',
  'spacing',
  'specific',
  'submit',
  'swap',
  'transition',
  'uniform',
  'usage',
  'visible',
  'whether',
  'whole',
])

// pdfjs-dist is a dep of apps/web — resolve it from there, not from scripts/
import { createRequire } from 'node:module'
import { pathToFileURL } from 'node:url'

const requireFromWeb = createRequire(join(ROOT, 'apps', 'web', 'package.json'))
const PDFJS = pathToFileURL(requireFromWeb.resolve('pdfjs-dist/legacy/build/pdf.mjs')).href

const pdfPath = resolve(process.argv[2] ?? DEFAULT_PDF)
const outPath = resolve(process.argv[3] ?? DEFAULT_OUT)

async function ensurePdf() {
  if (existsSync(pdfPath)) {
    return
  }
  console.log(`PDF missing at ${pdfPath} — downloading from ${SOURCE_URL}`)
  const res = await fetch(SOURCE_URL)
  if (!res.ok) {
    throw new Error(`download failed: HTTP ${res.status}`)
  }
  const buf = Buffer.from(await res.arrayBuffer())
  await mkdir(dirname(pdfPath), { recursive: true })
  await writeFile(pdfPath, buf)
}

function parseRow(word, alt) {
  const entries = []
  // A word cell can list base + inflections: "USE (v), USES, USED, USED".
  // Extract every POS-tagged token; each is a word form with an approval
  // status. Inflections without a POS tag are ignored (base form suffices).
  POS_TOKEN_RE.lastIndex = 0
  for (let match = POS_TOKEN_RE.exec(word); match; match = POS_TOKEN_RE.exec(word)) {
    const wordKey = match[1]
    if (!SINGLE_WORD_RE.test(wordKey)) {
      continue
    }
    const approved = wordKey === wordKey.toUpperCase()
    // Non-approved entries need an approved UPPERCASE alternative in col 2.
    // (Approved entries put a plain-English meaning there instead.)
    if (!(approved || UPPER_ALT_RE.test(alt))) {
      continue
    }
    entries.push({
      pattern: wordKey,
      wordKey,
      alt: alt.replace(STRIP_POS_RE, ''),
      approved,
    })
  }
  return entries
}

function parseWordList(text) {
  // Items are [str, x, y]. Words sit at x≈50 (col 1), alternatives at x≈159
  // (col 2). Group by y-row, then join same-x fragments.
  const items = text
    .map(({ str, transform }) => ({
      str,
      x: transform[4],
      y: transform[5],
    }))
    .filter(i => i.str.trim().length > 0)

  const rows = new Map()
  for (const item of items) {
    const key = Math.round(item.y / 5) * 5
    if (!rows.has(key)) {
      rows.set(key, { word: [], alt: [] })
    }
    const row = rows.get(key)
    if (item.x < 100) {
      row.word.push(item.str)
    } else if (item.x < 230) {
      row.alt.push(item.str)
    }
  }

  const entries = []
  for (const [, row] of rows) {
    const word = row.word.join(' ').trim()
    const alt = row.alt.join(' ').trim()
    if (!(word && alt)) {
      continue
    }
    entries.push(...parseRow(word, alt))
  }
  return entries
}

async function collectEntries(doc) {
  // Two passes: first collect every word that is APPROVED in some form
  // (UPPERCASE entries in column 1), then emit substitutions only for words
  // that are NEVER approved. STE restricts POS/meaning per word — a word
  // approved in one POS must not be flagged in another.
  const approvedWords = new Set()
  const rawEntries = []
  for (let p = 1; p <= doc.numPages; p++) {
    const page = await doc.getPage(p)
    const tc = await page.getTextContent()
    if (!tc.items.some(i => i.str === 'STE EXAMPLE')) {
      continue
    }
    for (const e of parseWordList(tc.items.map(i => ({ str: i.str, transform: i.transform })))) {
      if (e.approved) {
        approvedWords.add(e.wordKey.toLowerCase())
      } else {
        rawEntries.push(e)
      }
    }
  }
  return { approvedWords, rawEntries }
}

async function main() {
  await ensurePdf()
  const { getDocument } = await import(PDFJS)
  const data = new Uint8Array(await readFile(pdfPath))
  const doc = await getDocument({
    data,
    disableWorker: true,
    disableFontFace: true,
  }).promise
  console.log(`pages: ${doc.numPages}`)

  const { approvedWords, rawEntries } = await collectEntries(doc)

  const seen = new Map()
  for (const e of rawEntries) {
    if (approvedWords.has(e.wordKey.toLowerCase())) {
      continue // approved in another POS/meaning — cannot lint mechanically
    }
    if (DOMAIN_BLOCKLIST.has(e.wordKey.toLowerCase())) {
      continue // aerospace sense that misleads on software prose
    }
    if (!seen.has(e.pattern)) {
      seen.set(e.pattern, e)
    }
  }
  const entries = [...seen.values()]
  console.log(`approved forms: ${approvedWords.size}, substitutions: ${entries.length}`)
  const yaml = [
    '# Auto-generated from the official ASD-STE100 Issue 9 dictionary.',
    '# Copyright: ASD. Generated locally, do not commit, do not redistribute.',
    '# Non-approved word -> approved STE alternative.',
    'extends: substitution',
    "message: \"STE: use '%s' instead of '%s'.\"",
    'level: error',
    'ignorecase: true',
    'swap:',
    ...entries.map(e => `  ${e.pattern}: ${e.alt}`),
    '',
  ].join('\n')

  await mkdir(dirname(outPath), { recursive: true })
  await writeFile(outPath, yaml)
  console.log(`wrote ${outPath} (${entries.length} substitutions)`)
  for (const e of entries.slice(0, 12)) {
    console.log(`  ${e.wordKey} -> ${e.alt}`)
  }
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})

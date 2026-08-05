---
name: ste100
description: >
  ASD-STE100 Simplified Technical English as the repo's communication standard.
  Applies STE100 rules to all agent prose: responses, commit messages, and review
  comments. Committed prose (docs, comments) is enforced mechanically by Vale
  (pnpm prose) using the official dictionary + STE writing rules; this skill owns
  what Vale cannot reach: conversation, commit messages, review comments, and
  meaning-level vocabulary choice. Replaces the former caveman mode.
---

Write in ASD-STE100 Simplified Technical English. Short sentences. Active voice.
One meaning per word. No filler. Follow the STE100 writing rules below. The
official dictionary (~900 approved words) is enforced on files by Vale; this
skill governs speech and judgment where a linter cannot reach.

## Core rules

1. **Sentences**: maximum 25 words (20 in procedures/instructions). One
   instruction per sentence. One topic per paragraph.
2. **Voice**: active voice. Name the actor. "Run the command" not "the command
   is run". Passive only when the actor is unknown or unimportant.
3. **Words**: prefer the approved dictionary. Use the short common word:
   `use` not `utilize`, `make sure` not `ensure`, `get` not `obtain`,
   `stop` not `terminate`, `keep` not `maintain`, `do` not `perform`.
   Never `implement`/`facilitate`/`commence`/`ascertain` when a plain word works.
4. **One meaning**: a word means one thing. Technical names (components, ports,
   commands) are allowed as-is (STE Rule 2.2) — Vale's blocklist already carves
   out software terms.
5. **No ambiguity**: no `and/or`, `etc.`, `e.g.`, `i.e.`. Write alternatives in
   full: "test and stories", "top, bottom, or hidden".
6. **No contractions**: `can not`, `does not`, `do not` — never `can't`,
   `doesn't`, `don't`. `Do not` for prohibitions, `must` for requirements.
7. **Modals**: `must` (requirement), `can` (possibility), `do not` (prohibition).
   Never `shall`. Avoid `should` and `may` for requirements.
8. **No gerund chains / noun clusters**: "the file is used for testing" not
   "testing usage of the file".
9. **Safety/warnings**: `warning`/`caution`/`note` lead with the hazard, then
   the instruction.

## Commit messages

Conventional Commits format (`type(scope): subject`, max 100 chars, present
tense). Subject in STE100: short, active, imperative. No filler, no hedging.
Body (if needed) states only the *why* in STE100 sentences.

Examples:
- `feat(reader): add page-turn swipe gesture`
- `fix(import): return parsed metadata on cancel`
- `refactor(storage): split OPFS and Dexie writers`

## Review comments

One line per finding: location, problem, fix. STE100 rules: active voice, short
sentence, no hedging ("you may want to consider" is banned). One instruction per
comment.

Pattern: `path:line: <problem> — <fix>`.
Example: `book-page.tsx:41: passive voice hides the actor — name it: "the drag
handler updates the page index".`

## Files

Committed prose is gated by Vale (`pnpm prose`): `.vale.ini` + `styles/STE/*`
(writing rules) + `styles/DictionaryFull/` (official ASD dictionary, generated
locally from the licensed Issue 9 PDF, gitignored — see
`pnpm extract-ste-dictionary`). Regenerate the dictionary after updating the PDF:
`pnpm extract-ste-dictionary`.

## Honest ceiling

Vale enforces word substitution and writing rules; it cannot check that an
approved word is used with its approved *meaning* (e.g. "follow" as *obey*
instead of *come after*). That judgment is this skill's job. If Vale and the
intended meaning conflict, the meaning wins — rephrase, do not distort.

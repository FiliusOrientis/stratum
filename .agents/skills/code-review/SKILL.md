---
name: code-review
description: Review the changes since a fixed point (commit, branch, tag, or merge-base) along two axes — Standards (does the code follow this repo's documented coding standards?) and Spec (does the code match what the originating issue/PRD asked for?). Runs both reviews in parallel sub-agents and reports them side by side.
disable-model-invocation: true
---

# Code Review

Two-axis review of the diff between `HEAD` and a fixed point the user supplies:
- **Standards** — does the code conform to this repo's documented coding standards?
- **Spec** — does the code faithfully implement the originating issue / PRD / spec?

Both axes run as **parallel sub-agents** so they don't pollute each other's context, then this skill aggregates their findings.

The issue tracker should have been provided to you — run `/setup-matt-pocock-skills` if `docs/agents/issue-tracker.md` is missing.

## Process

### 1. Pin the fixed point

Whatever the user said is the fixed point — a commit SHA, branch name, tag, `main`, `HEAD~5`, etc. If they didn't specify one, ask for it.

Capture the diff command once: `git diff <fixed-point>...HEAD` (three-dot, so the comparison is against the merge-base). Also note the list of commits via `git log <fixed-point>..HEAD --oneline`.

Before going further, confirm the fixed point resolves (`git rev-parse <fixed-point>`) and the diff is non-empty.

### 2. Identify the spec source

Look for the originating spec, in this order:
1. Issue references in the commit messages (`#123`, `Closes #45`) — fetch via the workflow in `docs/agents/issue-tracker.md`.
2. A path the user passed as an argument.
3. A PRD/spec file under `docs/`, `specs/`, or `.scratch/` matching the branch name or feature.
4. If nothing is found, ask the user where the spec is. If they say there isn't one, the **Spec** sub-agent will skip and report "no spec available".

### 3. Identify the standards sources

Anything in the repo that documents how code should be written, such as `CODING_STANDARDS.md` or `CONTRIBUTING.md`.

On top of whatever the repo documents, the Standards axis always carries the **smell baseline** — Fowler code smells from _Refactoring_, ch.3:
- Mysterious Name, Duplicated Code, Feature Envy, Data Clumps, Primitive Obsession
- Repeated Switches, Shotgun Surgery, Divergent Change, Speculative Generality
- Message Chains, Middle Man, Refused Bequest

The repo overrides: a documented standard always wins over the baseline.

### 4. Spawn both sub-agents in parallel

**Standards sub-agent** — receives the full diff, standards sources, and smell baseline. Reports per-file/hunk violations.
**Spec sub-agent** — receives the diff and spec. Reports missing/partial implementation, scope creep, wrong implementation.

### 5. Aggregate

Present the two reports under `## Standards` and `## Spec` headings. Do **not** merge or rerank. End with a one-line summary per axis.

## Why two axes

A change can pass one axis and fail the other:
- Code that follows every standard but implements the wrong thing → **Standards pass, Spec fail**
- Code that does exactly what was asked but breaks conventions → **Spec pass, Standards fail**

Separating them prevents one axis from masking the other.

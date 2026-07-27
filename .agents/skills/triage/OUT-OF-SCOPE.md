# Out-of-Scope Knowledge Base

The `.out-of-scope/` directory in a repo stores persistent records of rejected feature requests.

## Directory structure

```
.out-of-scope/
├── dark-mode.md
└── plugin-system.md
```

One file per **concept**, not per issue. Multiple issues requesting the same thing are grouped under one file.

## File format

```markdown
# Dark Mode

This project does not support dark mode or user-facing theming.

## Why this is out of scope

The rendering pipeline assumes a single color palette defined in
`ThemeConfig`. Supporting multiple themes would require significant
architectural changes.

## Prior requests

- #42 — "Add dark mode support"
- #87 — "Night theme for accessibility"
```

## When to check `.out-of-scope/`

During triage (Step 1: Gather context), read all files in `.out-of-scope/`. When evaluating a new issue, check if the request matches an existing out-of-scope concept by concept similarity, not keyword.

## When to write to `.out-of-scope/`

Only when an **enhancement** (not a bug) is *rejected* as `wontfix`. Do **not** write here when something is closed as `wontfix` because it's **already implemented**.

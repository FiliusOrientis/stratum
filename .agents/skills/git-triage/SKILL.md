---
name: git-triage
description: >
  Git state triage before any code change. Runs `scripts/git-triage.mjs` to
  snapshot the repository, then decides: is this task a continuation of the
  current branch (stay), a new task (new branch), or does the tree need
  hygiene first (commit/push/merge/delete). The plan is a proposal — commit,
  push, merge, and delete always wait for user approval (ask-before).
  Triggers on session start (plugin), `/git-triage`, or when starting a task
  with uncommitted changes.
---

Decide before editing: stay, branch, or clean up first.

## 1. Snapshot

Run `node scripts/git-triage.mjs`. Read these keys:

- `branch` — current branch, or detached HEAD
- `dirty_files` / `staged_files` / `untracked_files` — uncommitted work
- `unpushed_commits` + `unpushed` — commits ahead of `origin/main`
- `merged_stale_branches` — branches merged to main but still present
- `last_commit` — recency signal

## 2. Hygiene first (always propose, never act without OK)

| Condition | Proposal |
|---|---|
| `merged_stale_branches` non-empty | delete each (local + remote) |
| `unpushed_commits` > 0 and branch is a feature branch | push to origin |
| stale remote tracking refs | `git remote prune origin` |
| detached HEAD | checkout a real branch first |
| dirty tree on `main` | do not start new work on main — commit or stash first, then branch |

Present these as a numbered proposal. Ask before any push/delete/merge/force.

## 3. Continuation or new task?

Continuation if ALL hold:

1. branch is not `main` and is a feature/fix/docs branch (prefix `feat/`, `fix/`,
   `refactor/`, `docs/`, `chore/`), AND
2. task topic matches the branch name — compare the task subject words against
   the branch segment after the prefix (e.g. task "fix reader zoom on mobile"
   matches branch `fix/reader-zoom`); fuzzy match: shared nouns or the task
   refers to a subsystem already changed on the branch, AND
3. the branch has uncommitted work or recent commits (last_commit is not the
   merge-base state), AND
4. the task is not a destructive/global change (dependency-wide bump, infra
   rework, docs sweep) — those start fresh even on a matching branch.

Smarter signals that also count as continuation:

- task says "continue", "finish", "follow-up", "as discussed" about this topic
- task references the branch name or a PR/issue already linked to the branch
- the working tree holds uncommitted changes for the same subsystem the task
  names

If continuation: stay. Do not create a branch. Commit existing work only when
the user asks or the Commit pipeline fires.

## 4. New task → branch

New branch if: on `main` with a new task, OR task does not match the current
branch, OR the current branch was already merged.

Naming: `type/subject` — type from task kind (feat/fix/refactor/docs/chore),
subject = 1-3 words of the core topic, kebab-case. Check it does not exist:
`git branch --list <name>`.

Create it only after the tree is clean (commit/stash first, per section 2).

## 5. Report

One block, before any code change:

```
git: <branch> — [continue | new branch <name>]
hygiene: [none | 1. push X  2. delete Y ...] (awaiting approval)
```

If anything is ambiguous (branch name unrelated, tree dirty in two
subsystems), ask the user before deciding.

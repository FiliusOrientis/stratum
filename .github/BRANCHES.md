# Branch Log

Active and past branches. Delete stale ones after merge.

| Branch | Status | Purpose |
|--------|--------|---------|
| `main` | Active | Production |
| `dependabot/npm_and_yarn/react-router-8.3.0` | Open | Dependabot: bump react-router 7.18.1→8.3.0 |
| `chore/post-merge-audit` | PR #21 | Post-merge audit, commitlint 72-char, CI PR-only |

## Merged (Cleaned)

| Branch | Merged | Purpose |
|--------|--------|---------|
| `chore/git-workflow` | PR #1 | Git hooks, commitlint CI |
| `chore/future-proofing` | PR #2 | Node 24, git safety, dependency stewardship |
| `chore/upgrade-deps` | PR #3 | Biome 2.5.5, TypeScript 7.0.2 |
| `chore/branch-log` | PR #4 | Branch tracking log, prune enforcement |
| `chore/update-branch-log` | PR #5 | Update branch log |
| `fix/ci-failures` | PR #6 | CodeQL triggers, release-please version |
| `fix/release-please` | PR #7 | Remove invalid package-name param |
| `docs/branch-log-update` | PR #9 | Add PRs #6, #7 to branch log |
| `docs/fix-agents-md` | PR #10 | Add BRANCHES.md to gate, fix duplicate numbering |
| `chore/webstorm-config` | PR #11 | Shared code styles and run configs |
| `chore/webstorm-todo-tasks` | PR #12 | Tasks config and TODO conventions |
| `fix/tasks-gitignore` | PR #13 | Allow tasks.xml in gitignore |
| `docs/branch-log` | PR #14 | Update branch log |
| `chore/cleanup` | PR #15 | Cleanup stale branches, format opencode.json |
| `docs/wiki-gate` | PR #16 | Add wiki to documentation gate |
| `chore/disable-codeql` | PR #17 | Disable CodeQL schedule |
| `feat/app-web-scaffold` | PR #18 | Scaffold Vite 7 + React 19 + Router 7 |
| `chore/ci-governance` | PR #20 | Harden CI and governance rules |

## Closed

| Branch | Closed | Purpose |
|--------|--------|---------|
| `release-please--branches--main--components--stratum` | PR #8 | Stale release PR (recreated on next merge) |

## Procedure

1. After PR merge: `git branch -D <branch>` (local) — done by `--delete-branch` on merge
2. After PR merge: `git remote prune origin` (stale tracking refs)
3. Update this log for every new branch created

# Branch Log

Active and past branches. Delete stale ones after merge.

| Branch | Status | Purpose |
|--------|--------|---------|
| `main` | Active | Production |
| `release-please--branches--main--components--stratum` | Active | Release Please auto-tracker |

## Merged (Cleaned)

| Branch | Merged | Purpose |
|--------|--------|---------|
| `chore/git-workflow` | PR #1 | Git hooks, commitlint CI |
| `chore/future-proofing` | PR #2 | Node 24, git safety, dependency stewardship |
| `chore/upgrade-deps` | PR #3 | Biome 2.5.5, TypeScript 7.0.2 |
| `chore/branch-log` | PR #4 | Branch tracking log, prune enforcement |

## Procedure

1. After PR merge: `git branch -D <branch>` (local) — done by `--delete-branch` on merge
2. After PR merge: `git remote prune origin` (stale tracking refs)
3. Update this log for every new branch created

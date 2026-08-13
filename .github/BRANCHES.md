# Branch Log

Active and past branches. Delete stale ones after merge.

| Branch | Status | Purpose |
|--------|--------|---------|
| `main` | Active | Production |

## Merged (Cleaned)

| Branch | Merged | Purpose |
|--------|--------|---------|
| `feat/lucide-icons-morph` | PR #86 | Lucide migration, shadcn primitives reinstall, morphicons theme toggle, git-triage tooling |
| `fix/nanoid-advisory` | PR #87 | nanoid security pin (removed later — fixed natively by vite 8) |
| `chore/major-dep-upgrades` | PR #88 | vite 8, motion 13, react-dropzone 20 |
| `chore/dep-sweep` | PR #89 | Prune unused deps and scaffolding, bump patch releases |
| `feat/app-shell` | PR #36 | App shell layout, import UI, reader toolbar, theme toggle, FAB |
| `chore/git-workflow` | PR #1 | Git hooks, commitlint CI |
| `chore/future-proofing` | PR #2 | Node 24, git safety, dependency stewardship |
| `chore/upgrade-deps` | PR #3 | Biome 2.5.5, TypeScript 7.0.2 |
| `chore/branch-log` | PR #4 | Branch tracking log, prune enforcement |
| `chore/update-branch-log` | PR #5 | Update branch log |
| `fix/ci-failures` | PR #6 | CodeQL triggers, release-please version |
| `fix/release-please` | PR #7 | Remove invalid package-name param |
| `release-please--branches--main--components--stratum` | PR #8 | Stale release PR (closed) |
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
| `dependabot/npm_and_yarn/react-router-8.3.0` | PR #19 | Dependabot: bump react-router 7.18.1→8.3.0 |
| `chore/ci-governance` | PR #20 | Harden CI and governance rules |
| `chore/post-merge-audit` | PR #21 | Post-merge audit, commitlint 72-char, CI PR-only |
| `release-please--branches--main--components--stratum` | PR #22 | chore(main): release 1.0.0 (reverted) |
| `chore/workflow-dispatch` | PR #23 | Add workflow_dispatch trigger |
| `chore/commitlint-100` | PR #24 | Raise commitlint header limit to 100 chars |
| `docs/branch-log-update-2` | PR #25 | Update branch log with PRs 19-24 |
| `chore/codeql-labels` | PR #26 | Re-enable CodeQL, add label rules |
| `docs/branch-log-final` | PR #27 | Update branch log with PR 25-26 |
| `fix/post-merge-cleanup-3` | PR #28 | Merged — revert v1.0.0, CI perms, rm codeql.yml, release rules |
| `feat/thinking-tools-and-skills-setup` | PR #31 | Integrate untools thinking frameworks, install Matt Pocock skills |
| `feat/shadcn-testing-infra` | PR #33 (closed) | Superseded by PR #34 |
| `feat/storybook-ui-board` | PR #34 | ShadCN UI + Vitest + Storybook 10 + auto-imports + stores + docs |

## Procedure

1. After PR merge: `git branch -D <branch>` (local) — done by `--delete-branch` on merge
2. After PR merge: `git remote prune origin` (stale tracking refs)
3. Update this log for every new branch created

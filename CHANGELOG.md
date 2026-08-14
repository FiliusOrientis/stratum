# Changelog

## Unreleased

### Features

* **app-shell:** import UI, toolbar, theme toggle, FAB, mobile fixes
* **web:** replace Storybook with React Cosmos UI board
* **web:** Storybook 10 + ShadCN UI board with full testing infra and foundation stores
* integrate untools thinking tools, install Matt Pocock engineering skills

### Bug Fixes

* **web:** fix AGENTS.md — Dexie 1 table, remove easeDrawer, update Storybook claims
* revert v1.0.0, fix CI perms, remove codeql.yml, add release rules

### Miscellaneous

* **deps:** bump pnpm/action-setup, shadcn, @storybook/addon-docs, react-dropzone, playwright, @biomejs/biome, @storybook/addon-a11y, @types/three, pdfjs-dist, @types/react-dom, turbo, @storybook/react-vite, motion, react-aria-components, @types/react, jsdom, @react-three/fiber, @storybook/addon-vitest, actions/setup-node, release-please-action, actions/checkout
* **deps:** raise dependabot open-pull-requests-limit to 15
* update branch log after PR #36 merge

## [1.1.0](https://github.com/FiliusOrientis/stratum/compare/v1.0.0...v1.1.0) (2026-08-14)


### Features

* **app-shell:** import UI, toolbar, theme toggle, FAB, mobile fixes ([#36](https://github.com/FiliusOrientis/stratum/issues/36)) ([5c73ce4](https://github.com/FiliusOrientis/stratum/commit/5c73ce434b99075c18b629d4a621d91df41a8649))
* automate pipelines, add interface skills, enforce STE100 prose ([9f22f73](https://github.com/FiliusOrientis/stratum/commit/9f22f735b4c0260424a94bc6c477e6fbb428ea3a))
* automate pipelines, add interface skills, enforce STE100 prose ([c112fd0](https://github.com/FiliusOrientis/stratum/commit/c112fd0a386f9336e916af74fb9cba3962903648))
* **cosmos:** center fixtures in the showcase decorator ([4226635](https://github.com/FiliusOrientis/stratum/commit/4226635ec893a330f5a91a4619be5cd80dbddfc8))
* **icons:** migrate to lucide, reinstall shadcn primitives, morph theme toggle ([678fd9b](https://github.com/FiliusOrientis/stratum/commit/678fd9b5ae720e5160aa34b5e63051eac7e0392d))
* **icons:** switch to lucide and reinstall shadcn primitives ([f93782a](https://github.com/FiliusOrientis/stratum/commit/f93782a20d74cbca278514eed4686a04230b8fd9))
* initialize monorepo with config, docs, and CI/CD ([72a8374](https://github.com/FiliusOrientis/stratum/commit/72a8374e3533c893d9d86405fc78379dd37052b1))
* integrate untools thinking tools, install Matt Pocock engineering skills, wire all 16 skills ([#31](https://github.com/FiliusOrientis/stratum/issues/31)) ([4e79b9f](https://github.com/FiliusOrientis/stratum/commit/4e79b9fcc9573d61f2e7b2d7d27db1ba10e168bf))
* storybook 10 + shadcn ui board with full testing infra and foundation stores ([5658ddb](https://github.com/FiliusOrientis/stratum/commit/5658ddb532b9d791a2889c37834d17b483efa823))
* **theme-toggle:** morph sun to moon with morphicons ([188c98f](https://github.com/FiliusOrientis/stratum/commit/188c98fc7bbe1a8e4946724e0f7c0965b725e555))
* **web:** scaffold Vite 7 + React 19 + Router 7 ([#18](https://github.com/FiliusOrientis/stratum/issues/18)) ([21c3196](https://github.com/FiliusOrientis/stratum/commit/21c319622b482d92fe66bc545cfab470827e9651))


### Bug Fixes

* allow tasks.xml in gitignore for WebStorm config ([#13](https://github.com/FiliusOrientis/stratum/issues/13)) ([0996580](https://github.com/FiliusOrientis/stratum/commit/0996580e4beaf1a28621d6cc9f8ec60e0f51cbcc))
* **ci:** disable CodeQL on PRs, add package version ([#6](https://github.com/FiliusOrientis/stratum/issues/6)) ([fffae6d](https://github.com/FiliusOrientis/stratum/commit/fffae6d8896b776372caedcaa935c1f52066ec10))
* **ci:** remove invalid package-name from release-please ([#7](https://github.com/FiliusOrientis/stratum/issues/7)) ([66c6ba8](https://github.com/FiliusOrientis/stratum/commit/66c6ba83cb81cda46fdbeedf192dd49bcc5694fe))
* **cosmos:** default-export fixture maps, tailwind via decorator, css scope ([4ad5860](https://github.com/FiliusOrientis/stratum/commit/4ad5860365562279d782e2540a7b133bbd552992))
* **cosmos:** pin patched dev-server transitives past advisories ([87ffa23](https://github.com/FiliusOrientis/stratum/commit/87ffa2368dd9e15642cdc7b175f01bffb101506a))
* **deps:** bump nanoid past high severity advisory ([72708c5](https://github.com/FiliusOrientis/stratum/commit/72708c5fbe5aa43e4c2e8ed15c349e2e8d512638))
* **deps:** bump nanoid past high severity advisory ([64edfc4](https://github.com/FiliusOrientis/stratum/commit/64edfc4eb03e1e601e463b2510e7a3c7d1e283f2))
* revert v1.0.0, fix CI perms, remove codeql.yml, add release rules ([cf144ff](https://github.com/FiliusOrientis/stratum/commit/cf144ff9c820c20a9e628d6dabe8de1a85e2a295))
* **storybook:** theme docs environment, prune redundant controls story ([876fd8d](https://github.com/FiliusOrientis/stratum/commit/876fd8dcca853fc38b091a9e8d01ec6f3abadb5c))
* **storybook:** theme preview frame chrome and remaining docs surfaces ([13a1ef3](https://github.com/FiliusOrientis/stratum/commit/13a1ef3962d65b31659f1be9c5ec25eba190f1d8))
* **test:** disambiguate stratum wordmark light image query ([13ba5ec](https://github.com/FiliusOrientis/stratum/commit/13ba5ec2daac0ee60b3c25999bd5a41549affd85))

## 0.1.0 (2026-07-27)

### Features

* initialize monorepo with config, docs, and CI/CD
* **web:** scaffold Vite 7 + React 19 + Router 7

### Bug Fixes

* allow tasks.xml in gitignore for WebStorm config
* **ci:** disable CodeQL on PRs, add package version
* **ci:** remove invalid package-name from release-please

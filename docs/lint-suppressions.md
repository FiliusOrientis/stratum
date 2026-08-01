# Lint Suppressions

Log of every approved `biome-ignore` comment in the codebase.

| File | Rule | Reason | Date | Approver |
|------|------|--------|------|----------|
| `apps/web/src/routes/catalog-page.test.tsx` | `lint/security/noSecrets` | False positive: CSS selector `'input[type="file"]'` flagged as high-entropy string | 2026-07-29 | User |
| `apps/web/src/test/setup.ts` | `lint/style/useNamingConvention` | Mock key `ThemeProvider` must match next-themes PascalCase export name | 2026-07-29 | User |

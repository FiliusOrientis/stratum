import path from 'node:path'
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { playwright } from '@vitest/browser-playwright'
import AutoImport from 'unplugin-auto-import/vite'
import { defineConfig } from 'vitest/config'

const alias = { '@': path.resolve(__dirname, './src') }
const plugins = [
  tailwindcss(),
  react(),
  AutoImport({
    imports: ['react'],
    dts: './src/auto-imports.d.ts',
    defaultExportByFilename: false,
  }),
]

export default defineConfig({
  plugins,
  resolve: { alias },
  test: {
    setupFiles: ['./src/test/setup.ts'],
    css: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        '**/components/ui/**',
        '**/auto-imports.d.ts',
        '**/coverage/**',
        '**/test/**',
        '**/stores/index.ts',
      ],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 70,
        statements: 80,
      },
    },
    projects: [
      {
        extends: true,
        test: {
          name: 'unit',
          environment: 'jsdom',
        },
      },
      {
        extends: true,
        plugins: [...plugins, storybookTest({ configDir: path.join(__dirname, '.storybook') })],
        resolve: { alias },
        test: {
          name: 'storybook',
          environment: 'node',
          browser: {
            enabled: true,
            headless: true,
            provider: playwright(),
            instances: [{ browser: 'chromium' }],
          },
        },
      },
    ],
  },
})

import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import AutoImport from 'unplugin-auto-import/vite'
import { defineConfig } from 'vitest/config'

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
  resolve: { alias: { '@': path.resolve(__dirname, './src') } },
  test: {
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
    setupFiles: ['./src/test/setup.ts'],
    css: true,
    environment: 'jsdom',
  },
})

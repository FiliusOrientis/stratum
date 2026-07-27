import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import AutoImport from 'unplugin-auto-import/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    AutoImport({
      imports: ['react'],
      dts: './src/auto-imports.d.ts',
      defaultExportByFilename: false,
    }),
  ],
  resolve: {
    alias: { '@': '/src' },
  },
})

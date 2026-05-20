import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
    css: false,
    include: ['**/*.test.{ts,tsx}'],
    exclude: ['node_modules', '.next', 'e2e', 'tests-e2e'],
    coverage: {
      reporter: ['text', 'html', 'lcov'],
      include: ['app/**', 'components/**', 'lib/**', 'hooks/**'],
      exclude: ['**/*.test.*', 'components/ui/**', '**/__mocks__/**'],
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./', import.meta.url)),
    },
  },
})

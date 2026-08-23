import { readFile } from 'node:fs/promises'
import postcss from 'postcss'
import tailwindcss from '@tailwindcss/postcss'

// Compiles the real popup stylesheet (Tailwind + theme.css) through the
// same PostCSS pipeline the bundler uses.
const compile = async () => {
  const css = await readFile('src/popup/styles.css', 'utf8')
  return postcss([tailwindcss()]).process(css, { from: 'src/popup/styles.css' })
}

describe('setup', () => {
  describe('TailwindCSS theme (Graphite design document)', () => {
    test('loads the light and dark themes', async () => {
      const { css } = await compile()

      // Light — semantic variables on :root (paper surfaces, ink text)
      expect(css).toContain('--yl-page: #fafaf8')
      expect(css).toContain('--yl-ink: #191a1c')

      // Dark — .dark re-points them to the dark mapping
      expect(css).toMatch(/\.dark\s*\{[^}]*--yl-page: #191a1c/)
      expect(css).toMatch(/\.dark\s*\{[^}]*--yl-ink: #f4f4f2/)
    })
  })
})

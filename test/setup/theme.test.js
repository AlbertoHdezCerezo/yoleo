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
    test('defines the design document palette', async () => {
      const { css } = await compile()

      expect(css).toContain('--tw-color-paper-50: #fafaf8')
      expect(css).toContain('--tw-color-gray-900: #191a1c')
      expect(css).toContain('--tw-color-teal-600: #1f6f5e')
      expect(css).toContain('--tw-color-red-400: #e07a6b')
    })

    test('replaces the default Tailwind palette entirely', async () => {
      const { css } = await compile()

      // Assembled at runtime so the content scanner doesn't pick the
      // literal up and emit the utility, defeating the assertion.
      const defaultColor = ['--tw', 'color', 'blue', '500'].join('-')
      expect(css).not.toContain(defaultColor)
    })

    test('defines the typography: Space Grotesk / IBM Plex Mono and the type scale', async () => {
      const { css } = await compile()

      expect(css).toMatch(/--tw-font-sans: ["']Space Grotesk["']/)
      expect(css).toMatch(/--tw-font-mono: ["']IBM Plex Mono["']/)
      expect(css).toContain('--tw-text-h1: 28px')
      expect(css).toContain('--tw-text-body: 14px')
    })

    test('emits semantic utilities that re-point under .dark', async () => {
      const { css } = await compile()

      expect(css).toContain('.tw\\:bg-page')
      expect(css).toContain('.tw\\:text-ink')
      expect(css).toContain('--yl-page: #fafaf8')
      expect(css).toMatch(/\.dark\s*\{[^}]*--yl-page: #191a1c/)
      expect(css).toMatch(/\.dark\s*\{[^}]*--yl-accent: #5fb4a2/)
    })

    test('drops border radius tokens — radius 0 everywhere', async () => {
      const { css } = await compile()

      const radiusToken = ['--tw', 'radius', 'md'].join('-')
      expect(css).not.toContain(radiusToken)
    })

    test('defines the hard offset shadows and control heights', async () => {
      const { css } = await compile()

      expect(css).toContain('4px 4px 0 var(--tw-shadow-color, var(--yl-shadow-color))')
      expect(css).toContain('--tw-spacing-control-md: 38px')
    })
  })
})

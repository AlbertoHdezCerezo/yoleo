import postcss from 'postcss'
import tailwindcss from '@tailwindcss/postcss'

// Runs the same PostCSS + Tailwind pipeline Extension.js runs when
// bundling, against the real source tree. Mirrors src/popup/styles.css,
// including the tw prefix.
const compile = async () =>
  postcss([tailwindcss()]).process('@import "tailwindcss" prefix(tw);', {
    from: 'src/popup/styles.css'
  })

describe('setup', () => {
  describe('TailwindCSS', () => {
    test('compiles tw-prefixed utility classes used in the source files', async () => {
      const { css } = await compile()

      expect(css).toContain('.tw\\:text-2xl')
      expect(css).toContain('.tw\\:font-bold')
      expect(css).toContain('.tw\\:text-gray-500')
    })

    test('emits the Tailwind v4 layered stylesheet with prefixed theme variables', async () => {
      const { css } = await compile()

      expect(css).toContain('@layer')
      expect(css).toContain('--tw-color-gray-500')
    })

    test('does not emit unprefixed utilities', async () => {
      const { css } = await compile()

      expect(css).not.toMatch(/^\s*\.text-2xl\b/m)
    })

    test('does not emit utilities that no source file uses', async () => {
      const { css } = await compile()

      // Class name assembled at runtime — a literal would be picked up by
      // Tailwind's content scanner (it scans this test file too) and the
      // utility would then be emitted, defeating the assertion.
      const unusedUtility = ['min', 'w', '48'].join('-')
      // Prefixed selectors are emitted as `.tw\:<utility>` in the CSS.
      expect(css).not.toMatch(new RegExp(`\\.tw\\\\:${unusedUtility}\\b`))
    })
  })
})

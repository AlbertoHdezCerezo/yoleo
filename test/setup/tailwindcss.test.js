import postcss from 'postcss'
import tailwindcss from '@tailwindcss/postcss'

// Runs the same PostCSS + Tailwind pipeline Extension.js runs when
// bundling, against the real source tree.
const compile = async () =>
  postcss([tailwindcss()]).process('@import "tailwindcss";', {
    from: 'src/popup/styles.css'
  })

describe('setup', () => {
  describe('TailwindCSS', () => {
    test('compiles utility classes used in the source files', async () => {
      const { css } = await compile()

      expect(css).toContain('.text-2xl')
      expect(css).toContain('.font-bold')
      expect(css).toContain('.text-gray-500')
    })

    test('emits the Tailwind v4 layered stylesheet with theme variables', async () => {
      const { css } = await compile()

      expect(css).toContain('@layer')
      expect(css).toContain('--color-gray-500')
    })

    test('does not emit utilities that no source file uses', async () => {
      const { css } = await compile()

      // Class name assembled at runtime — a literal would be picked up by
      // Tailwind's content scanner (it scans this test file too) and the
      // utility would then be emitted, defeating the assertion.
      const unusedUtility = ['min', 'w', '48'].join('-')
      expect(css).not.toMatch(new RegExp(`\\.${unusedUtility}\\b`))
    })
  })
})

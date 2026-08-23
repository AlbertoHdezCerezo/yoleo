// Global styles for every story: the same Tailwind entry point the
// extension popup uses (Vite runs it through postcss.config.js).
import '../src/popup/styles.css'

/** @type {import('@storybook/html-vite').Preview} */
export default {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    }
  }
}

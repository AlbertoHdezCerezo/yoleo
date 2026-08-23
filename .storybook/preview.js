// Global styles for every story: the same bundled fonts and Tailwind
// entry point the extension popup uses (Vite runs the stylesheet
// through postcss.config.js).
import '../src/styles/fonts.js'
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

// Global styles for every story: the same bundled fonts and Tailwind
// entry point the extension popup uses (Vite runs the stylesheet
// through postcss.config.js).
import '../src/styles/fonts.js'
import '../src/popup/styles.css'
import { definitionsFromModules, startApplication } from '../lib/utils/StimulusLoader.js'

// Vite counterpart of the extension's import.meta.webpackContext
// auto-loading: register every *_controller.js under components/ so
// component stories are interactive in Storybook.
startApplication(
  definitionsFromModules(
    import.meta.glob('../components/**/*_controller.js', { eager: true })
  )
)

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

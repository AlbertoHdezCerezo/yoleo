// Global styles for every story: the same Tailwind entry point the
// extension popup uses (Vite runs it through postcss.config.js).
import '../src/popup/styles.css'
import { startApplication, identifierForPath } from '../src/popup/scripts.js'

// Vite counterpart of the extension's import.meta.webpackContext
// auto-loading: register every *_controller.js under components/ so
// component stories are interactive in Storybook. Same identifier
// conventions via the shared identifierForPath.
const controllerModules = import.meta.glob('../components/**/*_controller.js', { eager: true })

startApplication(
  Object.entries(controllerModules).map(([path, module]) => ({
    identifier: identifierForPath(path.replace('../components/', './')),
    controllerConstructor: module.default
  }))
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

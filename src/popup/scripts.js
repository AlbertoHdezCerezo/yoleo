import './styles.css'
import { definitionsFromContext, startApplication } from '../../lib/utils/StimulusLoader.js'

// Auto-discovers every *_controller.js under components/ (recursively)
// at build time.
const autoLoadedDefinitions = () => {
  try {
    const context = import.meta.webpackContext('../../components', {
      recursive: true,
      regExp: /_controller\.js$/
    })

    return definitionsFromContext(context)
  } catch {
    // import.meta.webpackContext only exists inside the Rspack build; in
    // other runtimes there is nothing to auto-load.
    return []
  }
}

startApplication(autoLoadedDefinitions())

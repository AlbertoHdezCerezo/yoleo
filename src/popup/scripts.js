import '../styles/fonts.js'
import './styles.css'
import { Application } from '@hotwired/stimulus'

// Derives a Stimulus identifier from a controller path relative to the
// components folder, following the usual Stimulus conventions:
//   ./hello_controller.js            -> hello
//   ./reader/toolbar_controller.js   -> reader--toolbar
//   ./read_mode_controller.js        -> read-mode
export const identifierForPath = (path) =>
  path
    .replace(/^\.\//, '')
    .replace(/_controller\.js$/, '')
    .replace(/_/g, '-')
    .replace(/\//g, '--')

// Builds Stimulus controller definitions from a webpack/Rspack context
// (import.meta.webpackContext) covering the components folder.
export const definitionsFromContext = (context) =>
  context.keys().map((key) => ({
    identifier: identifierForPath(key),
    controllerConstructor: context(key).default
  }))

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
    // other runtimes (Jest) callers pass definitions explicitly.
    return []
  }
}

export const startApplication = (controllerDefinitions = autoLoadedDefinitions()) => {
  const application = Application.start()
  application.load(controllerDefinitions)
  return application
}

startApplication()

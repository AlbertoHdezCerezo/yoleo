import { definitionsFromContext } from './registry.js'

// Auto-loads every *_controller.js under components/ (recursively) at
// build time. Bundler-only: import.meta.webpackContext is provided by
// Rspack; tests discover the same files from the filesystem instead
// (see test/support/controller_definitions.js).
const context = import.meta.webpackContext('.', {
  recursive: true,
  regExp: /_controller\.js$/
})

export const controllerDefinitions = definitionsFromContext(context)

import { Application } from '@hotwired/stimulus'

// Shared Stimulus controller loading logic. Controller discovery itself
// stays in the entry points — import.meta.webpackContext (extension,
// Rspack) and import.meta.glob (Storybook, Vite) must be written
// literally in the file their bundler compiles — but everything after
// discovery funnels through here.

// Derives a Stimulus identifier from a controller path, following the
// usual Stimulus conventions. Any leading path up to the components
// folder is ignored:
//   ./hello_controller.js                      -> hello
//   ../components/reader/toolbar_controller.js -> reader--toolbar
//   ./read_mode_controller.js                  -> read-mode
export const identifierForPath = (path) =>
  path
    .replace(/^.*components\//, '')
    .replace(/^\.\//, '')
    .replace(/_controller\.js$/, '')
    .replace(/_/g, '-')
    .replace(/\//g, '--')

// Builds controller definitions from a webpack/Rspack context
// (import.meta.webpackContext) covering the components folder.
export const definitionsFromContext = (context) =>
  context.keys().map((key) => ({
    identifier: identifierForPath(key),
    controllerConstructor: context(key).default
  }))

// Builds controller definitions from a path → module map, e.g. Vite's
// import.meta.glob(..., { eager: true }).
export const definitionsFromModules = (modulesByPath) =>
  Object.entries(modulesByPath).map(([path, module]) => ({
    identifier: identifierForPath(path),
    controllerConstructor: module.default
  }))

// Starts a Stimulus application with the given controller definitions
// ([{ identifier, controllerConstructor }]).
export const startApplication = (controllerDefinitions = []) => {
  const application = Application.start()
  application.load(controllerDefinitions)
  return application
}

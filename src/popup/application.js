import { Application } from '@hotwired/stimulus'

// Starts a Stimulus application with the given controller definitions
// ([{ identifier, controllerConstructor }]). The popup passes the
// bundler-discovered definitions from components/; tests pass
// filesystem-discovered ones — both go through the same loading path.
export const startApplication = (controllerDefinitions = []) => {
  const application = Application.start()
  application.load(controllerDefinitions)
  return application
}

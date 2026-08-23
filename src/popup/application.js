import { Application } from '@hotwired/stimulus'
import HelloController from './controllers/hello_controller.js'

export const startApplication = () => {
  const application = Application.start()
  application.register('hello', HelloController)
  return application
}

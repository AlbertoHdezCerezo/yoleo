/**
 * @jest-environment jsdom
 */
import { Controller } from '@hotwired/stimulus'
import {
  startApplication,
  identifierForPath,
  definitionsFromContext
} from '../../src/popup/scripts.js'

const nextFrame = () => new Promise(resolve => setTimeout(resolve, 0))

class GreeterController extends Controller {
  static targets = ['output']

  greet () {
    this.outputTarget.textContent = '¡Yo leo!'
  }
}

// Mimics the import.meta.webpackContext object the bundler hands to
// definitionsFromContext when auto-loading controllers from components/.
const fakeContext = (modulesByKey) => {
  const context = (key) => modulesByKey[key]
  context.keys = () => Object.keys(modulesByKey)
  return context
}

describe('setup', () => {
  describe('StimulusJS', () => {
    describe('controller auto-loading from components/', () => {
      test('derives identifiers from controller paths following Stimulus conventions', () => {
        expect(identifierForPath('./hello_controller.js')).toBe('hello')
        expect(identifierForPath('reader/toolbar_controller.js')).toBe('reader--toolbar')
        expect(identifierForPath('./read_mode_controller.js')).toBe('read-mode')
      })

      test('builds controller definitions from the bundler context', () => {
        const context = fakeContext({
          './greeter_controller.js': { default: GreeterController },
          './reader/toolbar_controller.js': { default: GreeterController }
        })

        expect(definitionsFromContext(context)).toEqual([
          { identifier: 'greeter', controllerConstructor: GreeterController },
          { identifier: 'reader--toolbar', controllerConstructor: GreeterController }
        ])
      })
    })

    describe('running application', () => {
      let application

      beforeEach(async () => {
        document.body.innerHTML = `
          <main data-controller="greeter">
            <p data-greeter-target="output">A browser extension for reading.</p>
            <button data-action="greeter#greet">Greet</button>
          </main>
        `
        const context = fakeContext({
          './greeter_controller.js': { default: GreeterController }
        })
        application = startApplication(definitionsFromContext(context))
        await nextFrame()
      })

      afterEach(() => {
        application.stop()
      })

      test('connects loaded controllers to the DOM', () => {
        const main = document.querySelector('main')

        expect(application.getControllerForElementAndIdentifier(main, 'greeter')).not.toBeNull()
      })

      test('actions wired via data-action respond to events', async () => {
        document.querySelector('button').click()
        await nextFrame()

        expect(document.querySelector('p').textContent).toBe('¡Yo leo!')
      })
    })
  })
})

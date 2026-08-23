/**
 * @jest-environment jsdom
 */
import { Controller } from '@hotwired/stimulus'
import {
  startApplication,
  identifierForPath,
  definitionsFromContext,
  definitionsFromModules
} from '../../lib/utils/StimulusLoader.js'

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
        // Vite glob keys carry the path down to components/ — it is ignored
        expect(identifierForPath('../components/reader/toolbar_controller.js')).toBe('reader--toolbar')
      })

      test('builds controller definitions from a bundler context (extension / Rspack)', () => {
        const context = fakeContext({
          './greeter_controller.js': { default: GreeterController },
          './reader/toolbar_controller.js': { default: GreeterController }
        })

        expect(definitionsFromContext(context)).toEqual([
          { identifier: 'greeter', controllerConstructor: GreeterController },
          { identifier: 'reader--toolbar', controllerConstructor: GreeterController }
        ])
      })

      test('builds controller definitions from a module map (Storybook / Vite glob)', () => {
        expect(definitionsFromModules({
          '../components/greeter_controller.js': { default: GreeterController },
          '../components/reader/toolbar_controller.js': { default: GreeterController }
        })).toEqual([
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
        application = startApplication(definitionsFromModules({
          './greeter_controller.js': { default: GreeterController }
        }))
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

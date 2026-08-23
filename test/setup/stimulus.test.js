/**
 * @jest-environment jsdom
 */
import { startApplication } from '../../src/popup/application.js'
import { loadControllerDefinitions } from '../support/controller_definitions.js'

const nextFrame = () => new Promise(resolve => setTimeout(resolve, 0))

describe('setup', () => {
  describe('StimulusJS', () => {
    let application

    beforeEach(async () => {
      document.body.innerHTML = `
        <main data-controller="hello">
          <p data-hello-target="output">A browser extension for reading.</p>
          <button data-action="hello#greet">Greet</button>
        </main>
      `
      application = startApplication(await loadControllerDefinitions())
      await nextFrame()
    })

    afterEach(() => {
      application.stop()
    })

    test('connects the hello controller to the DOM', () => {
      const main = document.querySelector('main')

      expect(application.getControllerForElementAndIdentifier(main, 'hello')).not.toBeNull()
    })

    test('actions wired via data-action respond to events', async () => {
      document.querySelector('button').click()
      await nextFrame()

      expect(document.querySelector('p').textContent).toBe('¡Yo leo!')
    })
  })
})

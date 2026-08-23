/**
 * @jest-environment jsdom
 */
import { Controller } from '@hotwired/stimulus'
import { startApplication } from '../../src/popup/application.js'
import { loadControllerDefinitions } from '../support/controller_definitions.js'
import { identifierForPath } from '../../components/registry.js'

const nextFrame = () => new Promise(resolve => setTimeout(resolve, 0))

describe('setup', () => {
  describe('Stimulus controller auto-loading', () => {
    test('derives identifiers from paths following Stimulus conventions', () => {
      expect(identifierForPath('./hello_controller.js')).toBe('hello')
      expect(identifierForPath('reader/toolbar_controller.js')).toBe('reader--toolbar')
      expect(identifierForPath('./read_mode_controller.js')).toBe('read-mode')
    })

    test('discovers every controller defined under components/', async () => {
      const definitions = await loadControllerDefinitions()
      const identifiers = definitions.map(({ identifier }) => identifier)

      expect(identifiers).toContain('hello')
      expect(identifiers.length).toBeGreaterThan(0)

      definitions.forEach(({ controllerConstructor }) => {
        expect(controllerConstructor.prototype).toBeInstanceOf(Controller)
      })
    })

    test('connects every discovered controller to the DOM', async () => {
      const definitions = await loadControllerDefinitions()

      document.body.innerHTML = definitions
        .map(({ identifier }) => `<div data-controller="${identifier}"></div>`)
        .join('')

      const application = startApplication(definitions)
      await nextFrame()

      try {
        definitions.forEach(({ identifier }) => {
          const element = document.querySelector(`[data-controller="${identifier}"]`)

          expect(application.getControllerForElementAndIdentifier(element, identifier)).not.toBeNull()
        })
      } finally {
        application.stop()
      }
    })
  })
})

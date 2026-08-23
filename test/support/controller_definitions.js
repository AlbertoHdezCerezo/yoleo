import { readdir } from 'node:fs/promises'
import { join, relative } from 'node:path'
import { pathToFileURL } from 'node:url'
import { identifierForPath } from '../../components/registry.js'

const COMPONENTS_DIR = join(process.cwd(), 'components')

// Filesystem counterpart of components/index.js: discovers every
// *_controller.js under components/ and builds the same definitions the
// bundler context produces, reusing identifierForPath for parity.
export const loadControllerDefinitions = async () => {
  const entries = await readdir(COMPONENTS_DIR, { recursive: true })
  const controllerPaths = entries.filter((entry) => entry.endsWith('_controller.js'))

  return Promise.all(
    controllerPaths.map(async (path) => {
      const absolutePath = join(COMPONENTS_DIR, path)
      const module = await import(pathToFileURL(absolutePath))

      return {
        identifier: identifierForPath(relative(COMPONENTS_DIR, absolutePath)),
        controllerConstructor: module.default
      }
    })
  )
}

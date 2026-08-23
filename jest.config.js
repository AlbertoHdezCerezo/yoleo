/** @type {import('jest').Config} */
export default {
  testEnvironment: 'node',
  // Pure ESM project ("type": "module") — no transform, tests run natively
  // via NODE_OPTIONS=--experimental-vm-modules (see the npm test script).
  transform: {},
  testMatch: ['**/test/**/*.test.js'],
  // scripts.js imports its stylesheet; Jest has no CSS pipeline, so map
  // style imports to an empty stub.
  moduleNameMapper: {
    '\\.css$': '<rootDir>/test/support/styles_stub.js'
  }
}

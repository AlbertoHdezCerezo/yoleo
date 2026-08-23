/** @type {import('jest').Config} */
export default {
  testEnvironment: 'node',
  // Pure ESM project ("type": "module") — no transform, tests run natively
  // via NODE_OPTIONS=--experimental-vm-modules (see the npm test script).
  transform: {},
  testMatch: ['**/test/**/*.test.js']
}

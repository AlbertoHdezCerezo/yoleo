export default {
  title: 'Yoleo/Welcome'
}

// Mirrors the extension popup markup — proves Tailwind (with the tw
// prefix) is applied inside Storybook previews.
export const Popup = {
  render: () => `
    <main class="tw:flex tw:min-w-64 tw:flex-col tw:items-center tw:gap-2 tw:p-6">
      <h1 class="tw:text-2xl tw:font-bold">Yoleo</h1>
      <p class="tw:text-sm tw:text-gray-500">A browser extension for reading.</p>
    </main>
  `
}

// Design document preview — mirrors the Claude Design "Graphite"
// document (2a dark / 2b light) using the theme tokens themselves, so
// this page is always the truth of what the Tailwind setup provides.

// Class names are written out in full (never assembled from pieces)
// so Tailwind's content scanner picks every one of them up.
const PALETTE = [
  { name: 'paper', note: 'text & light surfaces', steps: ['tw:bg-paper-50', 'tw:bg-paper-100', 'tw:bg-paper-200'] },
  { name: 'gray', note: 'neutrals, chrome & dark surfaces', steps: ['tw:bg-gray-200', 'tw:bg-gray-300', 'tw:bg-gray-400', 'tw:bg-gray-600', 'tw:bg-gray-700', 'tw:bg-gray-800', 'tw:bg-gray-900'] },
  { name: 'teal', note: 'accent, sync', steps: ['tw:bg-teal-100', 'tw:bg-teal-400', 'tw:bg-teal-600', 'tw:bg-teal-800'] },
  { name: 'green', note: 'success, on device', steps: ['tw:bg-green-100', 'tw:bg-green-400', 'tw:bg-green-600', 'tw:bg-green-800'] },
  { name: 'yellow', note: 'warning, pending', steps: ['tw:bg-yellow-100', 'tw:bg-yellow-400', 'tw:bg-yellow-600', 'tw:bg-yellow-800'] },
  { name: 'red', note: 'danger, destructive', steps: ['tw:bg-red-100', 'tw:bg-red-400', 'tw:bg-red-600', 'tw:bg-red-800'] }
]

const SEMANTIC = [
  'tw:bg-page', 'tw:bg-surface', 'tw:bg-surface-hover',
  'tw:bg-ink', 'tw:bg-ink-secondary', 'tw:bg-ink-hint',
  'tw:bg-border-passive', 'tw:bg-border-interactive',
  'tw:bg-accent', 'tw:bg-accent-soft', 'tw:bg-success', 'tw:bg-success-soft',
  'tw:bg-warning', 'tw:bg-warning-soft', 'tw:bg-danger', 'tw:bg-danger-soft'
]

const TYPE_SPECIMENS = [
  ['tw:text-h1', 'H1 · 28/34 · 600 · -0.02em'],
  ['tw:text-h2', 'H2 · 22/28 · 600 · -0.015em'],
  ['tw:text-h3', 'H3 · 18/24 · 500 · -0.01em'],
  ['tw:text-h4', 'H4 · 15/20 · 600'],
  ['tw:text-h5 tw:font-mono tw:uppercase', 'H5 · 12/16 · 600 · +0.1em · caps · mono'],
  ['tw:text-body', 'Body · 14/22 · 400'],
  ['tw:text-small tw:text-ink-secondary', 'Secondary · 12.5/19'],
  ['tw:text-meta tw:font-mono tw:text-ink-hint', 'Meta · mono 12']
]

const SPACING = [
  ['tw:w-1', '4 · p-1 · icon↔label gaps'],
  ['tw:w-2', '8 · p-2 · compact rows, chip gaps'],
  ['tw:w-3', '12 · p-3 · list row padding'],
  ['tw:w-4', '16 · p-4 · card padding, popup gutter'],
  ['tw:w-6', '24 · p-6 · section gaps'],
  ['tw:w-8', '32 · p-8 · page gutter (options page)'],
  ['tw:w-12', '48 · p-12 · hero / empty states']
]

const sectionTitle = (label) => `
  <div class="tw:font-mono tw:text-h5 tw:uppercase tw:tracking-widest tw:text-ink-hint tw:border-t-2 tw:border-border-interactive tw:pt-3 tw:mb-6">${label}</div>
`

const swatch = (bgClass) => `
  <div>
    <div class="tw:h-12 ${bgClass} tw:border tw:border-border-passive"></div>
    <div class="tw:font-mono tw:text-meta tw:text-ink-hint tw:mt-1">${bgClass.replace('tw:bg-', '')}</div>
  </div>
`

const paletteSection = () => `
  ${sectionTitle('01 · Color palette')}
  <div class="tw:flex tw:flex-col tw:gap-5">
    ${PALETTE.map(({ name, note, steps }) => `
      <div>
        <div class="tw:text-small tw:font-semibold tw:text-ink tw:mb-2">${name}
          <span class="tw:font-mono tw:text-meta tw:text-ink-hint tw:font-normal">— ${note}</span>
        </div>
        <div class="tw:grid tw:grid-cols-7 tw:gap-3">${steps.map(swatch).join('')}</div>
      </div>
    `).join('')}
    <div>
      <div class="tw:text-small tw:font-semibold tw:text-ink tw:mb-2">semantic
        <span class="tw:font-mono tw:text-meta tw:text-ink-hint tw:font-normal">— use these in components</span>
      </div>
      <div class="tw:grid tw:grid-cols-8 tw:gap-3">${SEMANTIC.map(swatch).join('')}</div>
    </div>
  </div>
`

const typographySection = () => `
  ${sectionTitle('02 · Typography · Space Grotesk + IBM Plex Mono')}
  <div class="tw:flex tw:flex-col tw:gap-4">
    ${TYPE_SPECIMENS.map(([classes, label]) => `
      <div class="tw:flex tw:items-baseline tw:gap-5">
        <span class="tw:font-mono tw:text-meta tw:text-ink-hint tw:w-56 tw:shrink-0">${label}</span>
        <span class="${classes}">Send anything to your reMarkable</span>
      </div>
    `).join('')}
  </div>
`

const spacingSection = () => `
  ${sectionTitle('03 · Spacing · Borders · Shadows')}
  <div class="tw:grid tw:grid-cols-2 tw:gap-6">
    <div class="tw:flex tw:flex-col tw:gap-2">
      ${SPACING.map(([w, label]) => `
        <div class="tw:flex tw:items-center tw:gap-3">
          <div class="${w} tw:h-3.5 tw:bg-accent"></div>
          <span class="tw:font-mono tw:text-meta tw:text-ink-secondary">${label}</span>
        </div>
      `).join('')}
    </div>
    <div class="tw:text-small tw:text-ink-secondary tw:leading-relaxed">
      Corners: <strong class="tw:text-ink">radius 0 everywhere</strong><br>
      Section &amp; card rule: <strong class="tw:text-ink">2px solid border-interactive</strong> (top edge)<br>
      Interactive border: <strong class="tw:text-ink">1px solid border-interactive</strong><br>
      Passive border: 1px solid border-passive<br>
      Shadow: <strong class="tw:text-ink">tw:shadow-hard</strong> · 4px 4px 0 · no blur<br>
      Press: translate(2px,2px) + <strong class="tw:text-ink">tw:shadow-hard-press</strong><br>
      Controls: lg 44 · md 38 · sm 32 px tall
    </div>
  </div>
`

const button = (classes, label) => `
  <button class="tw:h-control-md tw:px-4 tw:font-sans tw:font-semibold tw:text-body tw:border tw:shadow-hard tw:cursor-pointer tw:active:translate-x-0.5 tw:active:translate-y-0.5 tw:active:shadow-hard-press ${classes}">${label}</button>
`

const buttonsSection = () => `
  ${sectionTitle('04 · Buttons')}
  <div class="tw:flex tw:flex-col tw:gap-4">
    <div class="tw:flex tw:flex-wrap tw:items-center tw:gap-4">
      ${button('tw:bg-border-interactive tw:text-page tw:border-border-interactive', 'Primary')}
      ${button('tw:bg-surface tw:text-ink tw:border-border-interactive', 'Outline')}
      ${button('tw:bg-accent tw:text-page tw:border-accent', 'Accent')}
      ${button('tw:bg-surface tw:text-danger tw:border-danger', 'Danger')}
      <button class="tw:h-control-md tw:px-3.5 tw:font-sans tw:font-semibold tw:text-body tw:text-ink-secondary tw:border tw:border-transparent tw:cursor-pointer tw:hover:bg-surface-hover">Ghost</button>
    </div>
    <div class="tw:flex tw:flex-wrap tw:items-center tw:gap-4">
      <button class="tw:h-control-lg tw:px-5 tw:font-sans tw:font-semibold tw:bg-border-interactive tw:text-page tw:border tw:border-border-interactive tw:shadow-hard tw:cursor-pointer">lg 44</button>
      <button class="tw:h-control-md tw:px-4 tw:font-sans tw:font-semibold tw:bg-border-interactive tw:text-page tw:border tw:border-border-interactive tw:shadow-hard tw:cursor-pointer">md 38</button>
      <button class="tw:h-control-sm tw:px-3 tw:font-sans tw:font-semibold tw:text-small tw:bg-border-interactive tw:text-page tw:border tw:border-border-interactive tw:shadow-hard tw:cursor-pointer">sm 32</button>
    </div>
    <div class="tw:flex tw:flex-wrap tw:items-center tw:gap-3">
      <span class="tw:font-mono tw:text-h5 tw:uppercase tw:px-2 tw:py-1 tw:bg-success-soft tw:text-success">on device</span>
      <span class="tw:font-mono tw:text-h5 tw:uppercase tw:px-2 tw:py-1 tw:bg-warning-soft tw:text-warning">pending</span>
      <span class="tw:font-mono tw:text-h5 tw:uppercase tw:px-2 tw:py-1 tw:bg-danger-soft tw:text-danger">failed</span>
      <span class="tw:font-mono tw:text-h5 tw:uppercase tw:px-2 tw:py-1 tw:bg-accent-soft tw:text-accent">syncing</span>
    </div>
  </div>
`

const document_ = (variant) => `
  <div class="${variant === 'dark' ? 'dark ' : ''}tw:bg-page tw:text-ink tw:font-sans tw:p-10">
    <div class="tw:mb-10">
      <div class="tw:font-mono tw:text-h5 tw:uppercase tw:tracking-widest tw:text-ink-hint tw:mb-2">Design document · Graphite · ${variant}</div>
      <div class="tw:text-h1">Graphite</div>
    </div>
    <div class="tw:flex tw:flex-col tw:gap-12">
      ${paletteSection()}
      ${typographySection()}
      ${spacingSection()}
      ${buttonsSection()}
    </div>
  </div>
`

export default {
  title: 'Yoleo/Design Document'
}

export const Light = { render: () => document_('light') }
export const Dark = { render: () => document_('dark') }

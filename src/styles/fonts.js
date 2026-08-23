// Bundled fonts (Fontsource) — shipped with the extension, no runtime
// requests to Google Fonts. Latin subset, weights per the design
// document. Imported from JS (not from styles.css) so each bundler
// (Rspack for the extension, Vite for Storybook) resolves the woff2
// URLs itself — Tailwind's CSS import inlining does not rebase them.
import '@fontsource/space-grotesk/latin-400.css'
import '@fontsource/space-grotesk/latin-500.css'
import '@fontsource/space-grotesk/latin-600.css'
import '@fontsource/space-grotesk/latin-700.css'
import '@fontsource/ibm-plex-mono/latin-400.css'
import '@fontsource/ibm-plex-mono/latin-500.css'
import '@fontsource/ibm-plex-mono/latin-600.css'

<a href="https://extension.js.org" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/badge/Powered%20by%20%7C%20Extension.js-0971fe" alt="Powered by Extension.js" align="right" /></a>

# yoleo

> Yoleo — a browser extension for reading.

## Commands

### dev

Run the full development environment: the extension (hot reload in a
fresh browser profile) plus Storybook component previews on
[localhost:6006](http://localhost:6006):

```bash
npm run dev
```

Each side can also run alone. Target a browser with `--browser`:

```bash
npm run dev:extension
npm run dev:extension -- --browser=firefox
npm run dev:storybook
```

### build

Build for production. Convenience scripts target each browser:

```bash
npm run build           # Chromium (default)
npm run build:firefox
npm run build:edge
```

### test

Run the Jest test suite:

```bash
npm test
```

### lint

Run [StandardJS](https://standardjs.com) over the codebase:

```bash
npm run lint
npm run lint:fix   # autofix
```

### preview

Preview the production build in the browser:

```bash
npm run preview
```

## Learn more

[Extension.js docs](https://extension.js.org).

## Ship it

Building and running your extension is local and free. When you are ready to share a build or submit it to the stores, [extension.dev](https://docs.extension.dev/publish/overview?utm_source=create-readme) does that side and sponsors Extension.js.

# EmBuddy Documentation Site

This directory contains the [Docusaurus](https://docusaurus.io/) documentation site for
EmBuddy. It is deployed to GitHub Pages at https://darbotlm.github.io/embuddy/.

## Local development

```bash
npm install
npm run start      # dev server with hot reload at http://localhost:3000/embuddy/
```

## Build

```bash
npm run build      # static site into ./build
npm run serve      # preview the production build locally
```

## Deployment

Pushing changes under `website/` to `main` triggers the
`.github/workflows/deploy-docs.yml` workflow, which builds the site and deploys it to GitHub
Pages.

## Structure

- `docs/` — documentation content (Markdown)
- `src/pages/index.js` — landing page
- `src/components/HomepageFeatures/` — landing-page feature cards
- `src/css/custom.css` — theme variables
- `docusaurus.config.js` — site configuration
- `sidebars.js` — sidebar structure
- `static/img/` — logo and favicon (SVG)

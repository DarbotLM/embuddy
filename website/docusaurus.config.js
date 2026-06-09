// @ts-check
// Docusaurus configuration for the EmBuddy documentation site.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'EmBuddy',
  tagline: 'Text embeddings for local data analysis — cache, search, and project, all in one buddy.',
  favicon: 'img/favicon.svg',

  future: {
    v4: true,
  },

  // Production URL and base path for GitHub Pages (https://darbotlm.github.io/embuddy/)
  url: 'https://darbotlm.github.io',
  baseUrl: '/embuddy/',
  trailingSlash: false,

  organizationName: 'DarbotLM',
  projectName: 'embuddy',

  onBrokenLinks: 'throw',

  // Treat .md as CommonMark (so `{#heading-id}` anchors and literal `{}`/`<>` in prose are
  // not parsed as MDX/JSX expressions). .mdx files still use full MDX.
  markdown: {
    format: 'detect',
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          editUrl: 'https://github.com/DarbotLM/embuddy/tree/main/website/',
          showLastUpdateTime: true,
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/logo.svg',
      colorMode: {
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: 'EmBuddy',
        logo: {
          alt: 'EmBuddy Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'docsSidebar',
            position: 'left',
            label: 'Docs',
          },
          {
            to: '/docs/api/embuddy',
            label: 'API',
            position: 'left',
          },
          {
            to: '/docs/roadmap',
            label: 'Roadmap',
            position: 'left',
          },
          {
            href: 'https://github.com/DarbotLM/embuddy',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {label: 'Introduction', to: '/docs/intro'},
              {label: 'Installation', to: '/docs/installation'},
              {label: 'Quickstart', to: '/docs/quickstart'},
              {label: 'API Reference', to: '/docs/api/embuddy'},
            ],
          },
          {
            title: 'Guides',
            items: [
              {label: 'Embedding', to: '/docs/guides/embedding'},
              {label: 'Nearest Neighbors', to: '/docs/guides/nearest-neighbors'},
              {label: 'UMAP Projection', to: '/docs/guides/umap'},
              {label: 'Persistence', to: '/docs/guides/persistence'},
            ],
          },
          {
            title: 'More',
            items: [
              {label: 'Roadmap', to: '/docs/roadmap'},
              {label: 'Contributing', to: '/docs/contributing'},
              {label: 'Changelog', to: '/docs/changelog'},
              {label: 'GitHub', href: 'https://github.com/DarbotLM/embuddy'},
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} DarbotLM. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ['python', 'bash', 'json', 'toml'],
      },
    }),
};

export default config;

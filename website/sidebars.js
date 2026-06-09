// @ts-check
// Sidebar for the EmBuddy documentation.
// Hand-authored to control ordering and grouping.

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docsSidebar: [
    'intro',
    'installation',
    'quickstart',
    {
      type: 'category',
      label: 'Guides',
      collapsed: false,
      items: [
        'guides/embedding',
        'guides/nearest-neighbors',
        'guides/search-by-vector',
        'guides/umap',
        'guides/persistence',
      ],
    },
    {
      type: 'category',
      label: 'Concepts',
      collapsed: false,
      items: [
        'concepts/architecture-intelligence',
        'concepts/architecture',
        'concepts/caching',
        'concepts/ann-and-umap',
      ],
    },
    {
      type: 'category',
      label: 'API Reference',
      collapsed: false,
      items: [
        'api/embuddy',
        'api/errors',
      ],
    },
    {
      type: 'category',
      label: 'Integrations',
      collapsed: false,
      items: [
        'integrations/3dkg',
      ],
    },
    'roadmap',
    'contributing',
    'changelog',
  ],
};

export default sidebars;

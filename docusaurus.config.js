const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'Memocast',
  tagline: '又一个优雅的为知笔记客户端',
  url: 'https://www.tanknee.cn',
  baseUrl: '/Memocast/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'TankNee', // Usually your GitHub org/user name.
  projectName: 'Memocast', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: 'Memocast',
      logo: {
        alt: 'Memocast Logo',
        src: 'img/Memocast-logo.svg',
      },
      items: [
        {
          type: 'doc',
          docId: 'intro',
          position: 'left',
          label: '指南',
        },
        {to: '/blog', label: '开发博客', position: 'left'},
        {
          href: 'https://github.com/TankNee/Memocast',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: '文档',
          items: [
            {
              label: 'Tutorial',
              to: '/docs/intro',
            },
          ],
        },
        {
          title: '社区',
          items: [
            {
              label: 'Github Discussion',
              href: 'https://github.com/TankNee/Memocast/discussions',
            },
            {
              label: 'Author Github',
              href: 'https://github.com/TankNee',
            },
            {
              label: 'Author Site',
              href: 'https://www.tanknee.cn',
            }
          ],
        },
        {
          title: '更多',
          items: [
            {
              label: 'Blog',
              to: '/blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/TankNee/Memocast',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Memocast, Inc. Built with Docusaurus.`,
    },
    prism: {
      theme: lightCodeTheme,
      darkTheme: darkCodeTheme,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl:
            'https://github.com/facebook/docusaurus/edit/master/website/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/facebook/docusaurus/edit/master/website/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};

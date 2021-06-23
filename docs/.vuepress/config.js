const config = {
  title: 'Neeto Vue',
  description: 'An Awesome Wiz Note Client',
  plugins: [],
  theme: 'yuu',
  themeConfig: {
    yuu: {
      defaultDarkTheme: true
    },
    repo: 'TankNee/Neeto-Vue',
    docsBranch: 'docs',
    editLinks: true,
    sidebarDepth: 3,
    lastUpdated: true,
    locales: {
      '/': {
        // 多语言下拉菜单的标题
        selectText: '选择语言',
        // 该语言在下拉菜单中的标签
        label: '简体中文',
        // 编辑链接文字
        editLinkText: '在 GitHub 上编辑此页',
        // 当前 locale 的 algolia docsearch 选项
        algolia: {},
        nav: [
          {
            text: '主页',
            link: '/'
          },
          {
            text: '文档',
            link: '/document/'
          },
          {
            text: '项目主页',
            link: 'https://www.tanknee.cn/Neeto-Vue-Page/'
          }
        ],
        sidebar: {
          '/en/': [
            /* ... */
          ],
          '/en/document/': [
            /* ... */
          ]
        }
      },
      '/en/': {
        selectText: 'Languages',
        label: 'English',
        ariaLabel: 'Languages',
        editLinkText: 'Edit this page on GitHub',
        algolia: {},
        nav: [
          {
            text: 'Home',
            link: '/en/'
          },
          {
            text: 'Document',
            link: '/en/document/'
          },
          {
            text: 'Homepage',
            link: 'https://www.tanknee.cn/Neeto-Vue-Page/'
          }
        ],
        sidebar: {
          '/': [
            /* ... */
          ],
          '/document/': [
            /* ... */
          ]
        }
      }
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@alias': '.vuepress/public'
      }
    }
  },
  locales: {
    // 键名是该语言所属的子路径
    // 作为特例，默认语言可以使用 '/' 作为其路径。
    '/': {
      lang: 'zh-CN', // 将会被设置为 <html> 的 lang 属性
      title: 'Neeto-Vue',
      description: 'Yet another elegant Wiz Note Client.'
    },
    '/en/': {
      lang: 'en-US',
      title: 'Neeto-Vue',
      description: '又一个优雅的为知笔记客户端'
    }
  }
}

module.exports = config

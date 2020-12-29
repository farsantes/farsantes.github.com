const removeMd = require('remove-markdown')
const path = require('path')

module.exports = () => {

  // PLUGINS
  const plugins = [
    ['@vuepress/blog', {
      directories: [
        {
          id: 'sources',
          dirname: 'sources',
          path: '/',
          itemPermalink: '/:slug'
        },
        {
          id: 'explanations',
          dirname: 'explanations',
          path: '/explanations/',
          itemPermalink: '/explanations/:slug'
        },
      ],
      frontmatters: [
        {
          id: 'tag',
          keys: ['tags'],
          path: '/tag/',
        },
      ],
      // globalPagination: {
      //   lengthPerPage: 5,
      // },
      feed: {
        feeds: {
          rss2: { enable: true },
          atom1: { enable: false },
          json1: { enable: false },
        },
      },
    }],
    ['@vuepress/google-analytics', { ga: 'UA-55973471-7' }],
    '@vuepress/search',
    '@vuepress/medium-zoom',
    '@vuepress/plugin-nprogress',
    'smooth-scroll'
  ]

  return {
    title: "Farsantes",
    description: '',
    base: "/blog/",
    dest: "blog",
    summary: true,
    pwa: true,
    themeConfig: {
      nav: [
        { text: "Fuentes", link: "/" },
        { text: "Explicaciones", link: "/explanations/" },
        { text: "Tags", link: "/tag/" }
      ]
    },
    plugins,
    define: {
      THEME_BLOG_PAGINATION_COMPONENT: 'Pagination',
    },
    alias: {
      fonts: path.resolve(__dirname, 'fonts'),
    },
    extendPageData(pageCtx) {
      const strippedContent = pageCtx._strippedContent
      if (!strippedContent) return

      pageCtx.summary =
        removeMd(
          strippedContent
            .trim()
            // .replace(/^#+\s+(.*)/, '')
            // .replace(/\s+(.*)/, '')
            // .slice(0, 200)
            .slice(0, 100)
        ) + ' ...'
      pageCtx.frontmatter.description = pageCtx.summary

      if (pageCtx.frontmatter.summary) {
        pageCtx.frontmatter.description = pageCtx.frontmatter.summary
      }
    },
  }
}

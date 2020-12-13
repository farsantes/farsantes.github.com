module.exports = {
  title: "ConspiraFuentes",
  description: '',
  theme: '@vuepress/blog',
  base: "/blog/",
  dest: "blog",
  themeConfig: {
    nav: [
      { text: "Home", link: "/" },
      // { text: "Posts", link: "/posts/" }
    ]
  },
  plugins: [
    [
      '@vuepress/blog',
      {
        directories: [
          {
            id: 'sources',
            path: '/sources/'
          },
          {
            id: 'source',
            dirname: 'sources',
            layout: 'Post',
            itemLayout: 'Post',
            itemPermalink: '/sources/:slug'
          },
          {
            id: 'explanations',
            path: '/explanations/'
          },
          {
            id: 'explanation',
            dirname: 'explanations',
            layout: 'Post',
            itemLayout: 'Post',
            itemPermalink: '/explanations/:slug'
          }
        ],
        frontmatters: [
          {
            id: 'tag',
            keys: ['tag', 'tags'],
            path: '/tag/'
          }
        ]
      }
    ]
  ]
}  

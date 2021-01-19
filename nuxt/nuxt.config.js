export default {
  srcDir: "./src",
  // target: 'static',
  generate: {
    dir: '../blog'
  },
  router: {
    base: "/blog"
  },
  store: false,
  css: [
    '@mdi/font/css/materialdesignicons.min.css',
    "@/assets/css/style.css"
  ],
  buildModules: [
    "@nuxt/typescript-build",
    "@nuxtjs/vuetify",
    // https://github.com/logaretm/nuxt-serverless-demo/blob/master/nuxt.config.js
    "@nuxtjs/pwa",
    "@nuxtjs/svg"
  ],
  vuetify: {
    defaultAssets: false,
    icons: {
      iconfont: "mdi"
    },
    theme: {
      themes: {
        light: {
          //
        },
        dark: false
      },
      options: { variations: false }
    },
    // treeShake: isProduction || isHotfix || isBeta
    treeShake: true
  },
  build: {
    analyze: {
      excludeAssets: /lang-/
    },
    extend(config) {
      config.resolve.alias["vue"] = "vue/dist/vue.common";
      config.stats = "minimal";
      config.devtool = "#source-map";
      config.node = { fs: "empty" };
    },
  },
}
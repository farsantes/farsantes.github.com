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
  modules: [
    [
      "nuxt-i18n",
      {
        locales: [{ code: "es", file: "es.js" }],
        strategy: "no_prefix",
        defaultLocale: "es",
        lazy: true,
        langDir: "lang/",
        vueI18n: {
          // silentTranslationWarn: true,
          fallbackLocale: "es"
        },
        detectBrowserLanguage: false,
      }
    ]
  ],
  buildModules: [
    "@nuxt/typescript-build",
    "@nuxtjs/vuetify",
    "@nuxtjs/pwa",
    '@/modules/generator',
    '@nuxtjs/sitemap',
    '@nuxtjs/google-analytics',
  ],
  googleAnalytics: { id: 'UA-55973471-7' },
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
  sitemap: {
    hostname: 'https://farsantes.github.io',
    path: '../sitemap.xml',
    gzip: true,
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
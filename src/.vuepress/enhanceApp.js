// import pageComponents from '@internal/page-components'
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader

import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";

export default ({
  Vue, // the version of Vue being used in the VuePress app
  options, // the options for the root Vue instance
  router, // the router instance for the app
  siteData // site metadata
}) => {

  // // https://github.com/vuejs/vuepress/issues/1173
  // for (const [name, component] of Object.entries(pageComponents)) {
  //     Vue.component(name, component)
  // }

  Vue.use(Vuetify);
  options.vuetify = new Vuetify({
    icons: {
      iconfont: 'mdi',
    }
  })
};
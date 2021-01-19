import "nuxt-i18n/types";

// https://github.com/wagerfield/nuxt-typescript/issues/6

import Vue from 'vue';
import { Route } from "vue-router";
import { MetaInfo } from 'vue-meta';
// import { NuxtI18nSeo } from 'nuxt-i18n/types/nuxt-i18n'

// ComponentOptions is declared in types/options.d.ts
declare module 'vue/types/options' {

  interface NuxtContext<V extends Vue> {
    app: V,
    isClient: boolean,
    isServer: boolean,
    isStatic: boolean,
    isDev: boolean,
    // store: Store<any>, // Consider vuex-typex in future
    env: object,
    route: Route,
    params: { [key: string]: string },
    query: object
  }

  interface ComponentOptions<V extends Vue> {
    scrollToTop?: boolean;
    asyncData?(context: NuxtContext<V>): Promise<object> | object;
    fetch?(context: NuxtContext<V>): Promise<object> | object;
    // head?: MetaInfo | (() => MetaInfo);
    head?(context: NuxtContext<V>): MetaInfo;
    // $nuxtI18nSeo(): NuxtI18nSeo;
  }
}
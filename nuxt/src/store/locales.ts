import Vue from "@/libraries/vue";
import LocalStorage from "@/libraries/LocalStorage";
import { languageFlags, DEFAULT_COUNTRY, getLocale } from '@/plugins/i18n';
import { routerReplace } from "@/plugins/router";

import { localeMatch } from "@/assets/js/utils";

import routesStore from "@/store/routes";

const localesStore = new Vue({
  name: "LocalesStore",
  data() {
    const country = LocalStorage.getItem("country") || "";

    return {
      routeLocale: undefined as string | undefined,
      lang: "",
      country
    };
  },
  computed: {
    routeParams: () => routesStore.params,
    locale(): string {
      const routeLocale = this.routeLocale;
      const defaultLocale = getLocale();
      console.log("locales locale", routeLocale, ":", defaultLocale);

      if ("undefined" == typeof routeLocale) return "";

      // VALIDATE
      if (!localeMatch(routeLocale)) {
        return defaultLocale;
      }

      return routeLocale || "";
    },
  },
  watch: {
    routeParams: {
      immediate: true,
      handler(routeParams) {
        console.log("locales watch route", routeParams);
        this.updateRoute(routeParams);
      }
    },
    locale: {
      immediate: true,
      handler(locale?: string) {
        console.log("locales watch locale", locale);
        if (!locale) return;
        // const lang = locale.split("-")[0];
        // setLocale(lang);
        this.updateLocale(locale);
      }
    },
    routeLocale: {
      // immediate: true, // LET i18n FIRST
      async handler(routeLocale: string | undefined) {
        const route = routesStore.route;
        const defaultLocale = getLocale();

        if ("undefined" == typeof routeLocale) return;

        if (!localeMatch(routeLocale)) {
          const fullPath = route.fullPath;
          const path = "/" + defaultLocale + fullPath
          routerReplace(path);
        }
      }
    }
  },
  methods: {
    updateRoute(routeParams): void {
      if (!routeParams) return;
      const routeLocale = routeParams.locale;
      if (routeLocale === this.routeLocale) return;
      this.routeLocale = routeLocale;
    },
    updateLocale(locale: string): void {
      console.log("locales updateLocale", locale);

      const localeArr = locale.split("-");
      const lang = localeArr[0];
      const country = localeArr.length > 1 ? locale.split("-")[1] : "";

      if (this.lang != lang) {
        this.lang = lang;
      }

      if (country && this.country != country) {
        this.country = country;
      }
    },
    localePath(path: string, locale?: string): string {
      locale = locale || this.locale || "es-CL";
      const pathname = "/" == path[0] ? path : "/" + path;
      return "/" + locale + pathname;
    },
    localeFlag(locale?: string): string {
      locale = locale || localesStore.locale || "";

      if (languageFlags[locale]) {
        return languageFlags[locale].flag;
      }

      const lang = localesStore.lang;
      const country = localesStore.country;

      // LANG ONLY ('es' NOT EXISTS)
      if (languageFlags[lang]) {
        return languageFlags[lang].flag;
      }

      // COUNTRY ONLY
      if (country) {
        return country.toLowerCase();
      }

      return DEFAULT_COUNTRY.toLowerCase();
    }
  }
});

export default localesStore;
import _window from "@/libraries/window";
import Vue from "@/libraries/vue";
import { languageFlags } from "@/plugins/i18n";

import { DOMContentLoaded, windowLoad, isType } from '@/assets/js/utils';

import localesStore from "@/store/locales";

declare global {
  interface Window {
    __NUXT__?: {
      data: any[]
    }
  }
}

const indexStore = new Vue({
  name: "Store",
  data() {
    const data = {
      drawerDialog: {
        model: false
      },
      loginDialog: {
        model: false,
        reload: false,
        social: ""
      },
      feedbackDialog: {
        model: false
      },
      languageDialog: {
        locale: "",
        model: false
      },
      alerts: {
        favorite: { visible: false },
        planning: { visible: false }
      },
    };

    return data as typeof data & {
      DOMContentLoaded: true | null;
      windowLoad: true | null;
      webpSupport: boolean
    };
  },
  computed: {
    locale: () => localesStore.locale,
    metaSufix(): string {
      const locale = this.locale;
      const location = locale && (languageFlags[locale]);
      const locationName = location ? location.name : "";

      return ` - Como Quiero ${locationName}`;
    }
  },
  asyncComputed: {
    async DOMContentLoaded() {
      await DOMContentLoaded();
      console.log("DOMContentLoaded!!!");
      return true;
    },
    async windowLoad(): Promise<true> {
      await windowLoad();
      console.log("windowLoad!!!");
      return true;
    },
    webpSupport: {
      async get(): Promise<boolean> {
        return new Promise(resolve => {
          if (!process.client) return true;

          // https://developers.google.com/speed/webp/faq#how_can_i_detect_browser_support_for_webp
          const img = new Image();
          img.onload = function () {
            resolve(img.width > 0 && img.height > 0);
          };
          img.src = "data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA";
        });
      },
      default(): boolean {
        const document = _window.document;
        if (!document) return true;

        // https://stackoverflow.com/questions/5573096/detecting-webp-support
        const elem = document.createElement('canvas');
        if (!!(elem.getContext && elem.getContext('2d'))) {
          return elem.toDataURL('image/webp').indexOf('data:image/webp') == 0;
        } else {
          return false;
        }
      }
    }
  },
  methods: {
    getAsyncData(key: string, type) {
      const nuxtData = _window.__NUXT__?.data;
      const asyncData = (nuxtData && nuxtData.length ? nuxtData[0] : null);
      const data = asyncData && asyncData[key];
      if (isType(data, type)) return data;
    }
  }
});

export default indexStore;

export function metaSufix(txt): string {
  return txt + " - " + indexStore.metaSufix;
}
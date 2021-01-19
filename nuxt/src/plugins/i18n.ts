import _window from "@/libraries/window";

import { parse, localeMatch } from "@/assets/js/utils";
import { isCrawler } from '@/assets/js/device';
import { persistent } from "@/assets/js/requests/storage";

declare global {
  interface Navigator {
    browserLanguage?: string;
    userLanguage?: string;
  }
}

export default function ({ app, params }) {

  // OVERRIDE
  const i18n = app.i18n;

  i18n.setLocale(params.locale);
  app.router.afterEach((to) => {
    i18n.setLocale(to.params.locale);
  })

  i18n.missing = () => {
    return "";
  };
}

//////////////////////////////////////////////////////////////////////////////

export const DEFAULT_COUNTRY = "CL";

const location = _window.location;
const pathLevel1 = location && location.pathname.split("/")[1] || "";
const pathLocaleData = getLocaleData(pathLevel1);

export let LANGUAGE = pathLocaleData.language;
export let COUNTRY = pathLocaleData.country;

//////////////////////////////////////////////////////////////////////////////
// LANGUAGE
if (process.client) {
  (async function () {

    const persistentLanguage = await persistent.getItem("language", false);
    if (persistentLanguage && localeMatch(persistentLanguage)) {

      // DIFERENT LANGUAGE
      if (LANGUAGE && 0 != persistentLanguage.indexOf(LANGUAGE)) {
        if ("es" == LANGUAGE) LANGUAGE = "es-" + DEFAULT_COUNTRY;
        import("@/store").then((store) => {
          store.default.languageDialog.locale = LANGUAGE;
          store.default.languageDialog.model = true;
        });
        return;
      }

      LANGUAGE = persistentLanguage;
      if ("es" == LANGUAGE) LANGUAGE = "es-" + DEFAULT_COUNTRY;
      updateRouteLocale();
      return;
    }

    if (!LANGUAGE) {
      // DISABLE UNTIL ENABLE OTHER LANGUAGES INSTEAD OF "es"
      const LOCALE = getNavigatorLanguage();
      console.log("LOCALE", LOCALE)
      if (LOCALE) {
        const localeData = getLocaleData(LOCALE);
        console.log("localeData", localeData)
        LANGUAGE = localeData.language;
        COUNTRY = COUNTRY || localeData.country;
      }

      if (!LANGUAGE) {
        LANGUAGE = "es";
      }
    }

    console.log("LANGUAGE", LANGUAGE);

    ////////////////////////////////////////////////////////////////////////////

    // LOCALSTORAGE:
    if (!COUNTRY) {
      const country = await persistent.getItem("country", false);
      if (country && (2 == country.length || 3 == country.length)) {
        COUNTRY = country;
      }
    }

    (async function () {
      if (isCrawler()) return;

      let asyncCountry = COUNTRY;

      // IF 'COUNTRY' NOT ON LODED URL OR PERSISTENT DATA:
      if (!asyncCountry && "es" == LANGUAGE) {

        // BY 'geoiplookup'
        let geoiplookup;

        const geoiplookupJSON = await persistent.getItem("geoiplookup");
        if (geoiplookupJSON) {
          geoiplookup = parse(geoiplookupJSON);
        } else {
          // try {
          //   // https://stackoverflow.com/questions/391979/how-to-get-clients-ip-address-using-javascript
          //   const geoiplookupResponse = await axios.get("https://json.geoiplookup.io");
          //   geoiplookup = geoiplookupResponse.data;
          //   geoiplookup && persistent.setItem("geoiplookup", stringify(geoiplookup));
          // } catch (e) {
          //   console.error(e);
          // }
        }

        const geoCountry = geoiplookup && geoiplookup.country_code && geoiplookup.country_code.toUpperCase();
        if (geoCountry) {
          asyncCountry = geoCountry
        }
      }

      if ("CL" == asyncCountry) {
        if ("CL" != COUNTRY) setCountry("CL");

      } else {
        import("@/store").then((store) => {
          // DEFAULT "CL"
          if ("es" == LANGUAGE && !asyncCountry) {
            asyncCountry = "CL";
          }

          const locale = LANGUAGE + (asyncCountry ? "-" + asyncCountry : "");
          console.log("COUNTRY locale", locale)
          store.default.languageDialog.locale = locale;
          store.default.languageDialog.model = true;
        })
      }
    })();

    console.log("COUNTRY", COUNTRY);

    updateRouteLocale();
  })();
}

//////////////////////////////////////////////////////////////////////////////

export async function updateRouteLocale(locale?: string) {
  if (!process.client || !location) return;

  console.log("updateRouteLocale()", locale);

  // UPDATE LocalStorage
  if (locale) {
    LANGUAGE = locale;

    persistent.setItem("language", locale);
    const localeArr = locale.split("-");

    if (localeArr.length > 1) {
      COUNTRY = localeArr[1];
      persistent.setItem("country", COUNTRY);
    }
  }

  locale = locale || getLocale();

  let fullPath = location.pathname + location.search + location.hash;

  const pathArr = fullPath.replace(/^\/|\/$/g, '').split("/");
  const currLocale = pathArr[0];

  if (currLocale && currLocale == locale) return;

  if (localeMatch(currLocale)) {
    fullPath = "/" + pathArr.slice(1).join("/");
  }

  const routerImport = await import("@/plugins/router");
  const router = routerImport.router;

  const redirect = "/" + locale + fullPath;
  if (router) {
    if (router.currentRoute.path != redirect) router.push(redirect);
  } else {
    if (location.pathname != redirect) location.href = redirect;
  }
}

export function setCountry(iso: string): void {
  iso = iso || "";

  // UPDATE LOCATION (LATIN AMERICA COUNTRIES TRANSLATIONS)
  console.log("setCountry", iso);

  // UPDATES
  COUNTRY = iso;
  persistent.setItem("country", iso);

  updateRouteLocale();
}

export function getLocale(): string {
  // console.log("getLocale", LANGUAGE, COUNTRY);

  const languageArr = LANGUAGE.split("-");
  const lang = languageArr[0];
  let country = COUNTRY;

  if (languageArr.length > 1) {
    country = languageArr[1];
  }

  if ("es" == lang) {
    const locale = lang.toLowerCase() + (country ? "-" + country.toUpperCase() : "");
    return locale;
  }

  return lang;
};

////////////////////////////////////////////////////////////////////////////////
// PRIVATE FUNCTIONS

function getNavigatorLanguage(): string | undefined {
  const _navigator = "undefined" != typeof navigator ? navigator : null;
  if (!_navigator) return;

  // navigator.languages
  const languages = _navigator.languages;
  if (languages
    && Object.prototype.toString.call(languages) === '[object Array]'
    && languages.length) {

    const languagesArr = languages.slice();

    // ES LOCALE
    const esLocales = languagesArr
      .find(language => 0 == language.indexOf("es-") && "es-es" != language.toLowerCase());
    if (esLocales) return esLocales;

    // ES LANGUAGE (PREVENT es-ES, IS TOO COMMON IN OTHER 'es-*' COUNTRIES)
    if (languagesArr.includes("es") || languagesArr.includes("es-ES")) {
      return "es";
    }
  }

  return _navigator.language || _navigator.browserLanguage || _navigator.userLanguage;
}

// RECONSTRUCT 'locale' TO PREVENT BUGS (/-ES/)
function getLocaleData(locale?: string): { locale: string, language: string, country: string } {
  let language = "";
  let country = "";

  if (locale) {
    const match = localeMatch(locale)
    if (match) {
      language = match[1] ? match[1].toLowerCase() : language;
      country = match[2] ? match[2].toUpperCase() : country;
    }
  }

  // FIX LANGUAGE 'iso'
  if ("fil" == language) {
    language = "tl";
  }
  // https://en.wikipedia.org/wiki/Romansh_language#/media/File:English-language_version_of_Linguistic_map_of_Switzerland.png
  if ("rm" == language) { //Romansh - Swiss (not close to any latin language)
    language = "it";
  }

  locale = language + (country ? "-" + country : "");

  return {
    locale,
    language,
    country
  };
}

///////////////////////////////////////////////////////////////////////////////
// DATA

export const languageFlags = {
  // en: { flag: "us", name: "english" },
  es: {flag: "es", name: "Español"},
};
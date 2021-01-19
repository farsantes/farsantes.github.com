/*
ONLY STANDALONE METHODS AND node_modules IMPORTS
*/

import axios from "axios";
import _window from "@/libraries/window";
import LocalStorage from "@/libraries/LocalStorage";

////////////////////////////////////////////////////////////////////////////////

export const API_URL = process.env.API_URL;
console.log("process.env.API_URL", API_URL);
export function apiUrl(): string {
  let apiUrl = API_URL;

  // HOTFIX PRODUCTION
  const location = _window.location;
  if (!API_URL && location && location.host.includes("comoquiero\.")) {
    const protocol = location.host.includes("comoquiero\.net") ? "https:" : location.protocol;
    apiUrl = protocol + "//api.comoquiero" + location.host.split("comoquiero")[1];
  }

  return apiUrl || "https://api.comoquiero.net";
}

export const API_V2_URL = process.env.API_V2_URL || "https://api-v2.comoquiero.net";
console.log("process.env.API_V2_URL", API_V2_URL);

////////////////////////////////////////////////////////////////////////////////

export function formatNumber(value: string | number, maxDecimals?: number): string {
  if (!value) {
    return "" + value;
  }

  const parts = value.toString().split(/\.|,/);

  // WRONG NUMBER
  if (parts.length > 2) {
    return "" + value;
  }

  const integer = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  let decimal = parts[1] || "";
  if (decimal && "number" === typeof maxDecimals) {
    decimal = (parts[1] || "").substring(0, maxDecimals);
  }
  decimal = decimal ? "," + decimal : "";

  return integer + decimal;
}

export function formatPrice(value: string | number, maxDecimals?: number) {
  // TODO: HANDLE DECIMALS BY CURRENCY
  maxDecimals = 2;
  return formatNumber(value, maxDecimals);
}

export function isType(value: any, type) {
  // if (!type) {
  //   return true;
  // }
  if (!value) {
    return true;
  }
  const isType = "[object " + type + "]" === Object.prototype.toString.call(value);
  if (!isType) {
    console.warn("!isType", type, value);
  }
  return isType;
}

export async function windowLoad() {
  const document = _window.document;
  const addEventListener = _window.addEventListener;

  // if (isCrawler()) {
  //   // NEVER RESOLVED
  //   return new Promise(function () { });
  // }

  if (document && document.readyState !== "complete") {
    return new Promise(function (resolve) {
      // const onloadPrev = _window.onload;
      // _window.onload = function (ev) {
      addEventListener && addEventListener("load", function (event) {
        // if (onloadPrev) {
        //   // @ts-ignore
        //   onloadPrev(ev);
        // }
        resolve("");
      });
    });
  }

  await timeout(1);
}

// https://stackoverflow.com/questions/33289726/combination-of-async-function-await-settimeout/33292942
export function timeout(ms = 0) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function eventCallback(event: string) {
  const addEventListener = _window.addEventListener;
  if (!addEventListener) return;
  return new Promise(resolve => addEventListener(event, resolve, false));
}

// Not all browsers support the same date formats
//https://stackoverflow.com/questions/5324178/javascript-date-parsing-on-iphone
export function timestampDate(date: string): Date | undefined {
  if (!date) return;
  const arr = date.split(/[- :]/);
  return new Date(
    Number(arr[0]),
    Number(arr[1]) - 1,
    Number(arr[2]),
    Number(arr[3]),
    Number(arr[4]),
    Number(arr[5])
  );
}

// https://stackoverflow.com/questions/5129624/convert-js-date-time-to-mysql-datetime
export function dateTimestamp(date) {
  const year = date.getUTCFullYear();

  // REMOVE SAME YEAR
  let yearString = year + "-";
  if (new Date().getFullYear() == year) {
    yearString = "";
  }

  return yearString +
    ('00' + (date.getUTCMonth() + 1)).slice(-2) + '-' +
    ('00' + date.getUTCDate()).slice(-2) + ' ' +
    ('00' + date.getUTCHours()).slice(-2) + ':' +
    ('00' + date.getUTCMinutes()).slice(-2);
  // ':' + ('00' + date.getUTCSeconds()).slice(-2);
}

export function DOMContentLoaded(): Promise<void> {
  return new Promise(function (resolve) {
    const document = _window.document;
    if (!document) {
      return;
    }

    // ON DOMContentLoaded
    document.addEventListener("DOMContentLoaded", () => {
      resolve();
    });

    // IF ALREADY LOADED
    // if ("loading" != _window.document.readyState) {
    // if (_window.document.readyState === "complete" || _window.document.readyState === "loaded" || _window.document.readyState === "interactive") {
    if (document.readyState === "complete" || document.readyState === "interactive") {
      resolve();
    }
  });
}

export function push(arr: any[], push) {
  if (!Array.isArray(push)) {
    push = [push];
  }

  const jsonArr = arr.map(function (el) {
    return stringify(el);
  });
  // console.log("jsonArr", jsonArr);

  for (const el of push) {
    if (!jsonArr.includes(stringify(el))) {
      arr.push(el);
    }
  }

  return arr;
}

const SCRIPTS = {}; // PREVENT LOAD MULTIPLE TIMES
export function getScript(src: string): Promise<any> {
  if (SCRIPTS[src]) return SCRIPTS[src];

  SCRIPTS[src] = new Promise(function (resolve, reject) {
    const document = _window.document;
    if (!document) return false;

    const script = document.createElement("script");
    script.type = "text/javascript";

    script.onload = function () {
      resolve("");
    };
    script.onerror = function () {
      delete SCRIPTS[src];
      reject();
    };

    script.src = src;
    document.getElementsByTagName("body")[0].appendChild(script);
  });

  return SCRIPTS[src];
}

export function markdown(txt: string): string {
  if (!txt) return "";
  return txt.replace(/\*\*([^*]*)\*\*/g, "<b>$1</b>");
};

// https://stackoverflow.com/questions/49634850/javascript-convert-plain-text-links-to-clickable-links
export function linkify(inputText: string): string {

  // //URLs starting with http://, https://, or ftp://
  // const replacePattern1 = /(^| (https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
  // inputText = inputText.replace(replacePattern1, '<a href="$1" target="_system">$1</a>');

  // //URLs starting with "www." (without // before it, or it'd re-link the ones done above).
  // const replacePattern2 = /(^|[^\/])(^| www\.[\S]+(\b|$))/gim;
  // inputText = inputText.replace(replacePattern2, '$1<a href="http://$2" target="_system">$2</a>');

  const replacePattern = /((^| )(https?:\/\/)?(www\.)?([a-z\.]*\.[a-z]{2,3}[a-z\/-_]*)(\?[a-z-_&=]*)?( |\. |\.$|$))/gim;

  inputText = inputText.replace(replacePattern,
    `$2<a
      href="http://$4$5$6" target="_blank"
      onclick="linkifyOpen('http://$4$5$6'); return false;"
    >$5</a>`
  );

  return inputText;
}

export function imagefy(inputText: string): string {
  const replacePattern = /(^| )([a-zA-Z0-9\:\/\.\-\_]+(\.jpg|\.jpeg|\.png|\.svg))( |$)/gim;
  return inputText.replace(replacePattern, '$1<img src="$2"/>$4');
}

export function scalefy(str: string, scale: number): string {
  const regex = /(^| )~([0-9]+(\.[0-9]+)?)/gim;
  return str.replace(regex, function (match, $1, $2, $3) {
    return $1 + ($2 * scale) + $3;
  });
}

export function headerAttr(headers?: Headers, headerName?: "cache-control", attr?: "max-age"): string | undefined {
  if (!headers || !headerName || !attr) {
    return;
  }

  const header = headers[headerName];
  if (!header) {
    return;
  }

  const regeEx = new RegExp(".*max-age=([0-9]+).*");
  const match = header.match(regeEx);
  if (match) {
    return match[1];
  }
}

export function deepCopy(data) {
  return JSON.parse(stringify(data));
}

// https://stackoverflow.com/questions/5072136/javascript-filter-for-objects/37616104
export function objectFilter(obj, predicate) {
  return Object.keys(obj)
    .filter(key => predicate(obj[key]))
    .reduce((res, key) => (res[key] = obj[key], res), {});
}

export function capitalize(str: string) {
  if (!str) { return ""; }
  str = str.toString().toLowerCase();
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function stringify(data, ...args): string {
  if ("undefined" === typeof data) {
    return "";
  }

  if ("string" == typeof data) {
    return "" + data;
  }

  try {
    return JSON.stringify(data, ...args) || "";
  } catch (e) {
    console.warn("!stringify", data);
  }

  return "";
}

export function parse(str: any): any {
  if (!str) {
    return;
  }
  try {
    return JSON.parse(str);
  } catch (e) {
    //
  }
}

let ONLINE: any = false;
export async function online(): Promise<boolean> {
  // if (isCrawler()) return true;

  // let response;
  // try {
  // response = await axios.get("/ping.json?" + Math.random());
  // console.log(http.get);

  if (ONLINE) {
    return ONLINE;
  }

  ONLINE = new Promise(async function (resolve) {
    let data;
    try {
      const response = await axios.get("/ping.json", {
        headers: {
          "cache-control": "max-age=0, no-cache, no-store, private"
        }
      });
      data = response.data;
    } catch (e) {
      // PREVENT STATUS ERROR "Network Errror"
    }

    const pingResolved = !!data && 1 == data;
    resolve(pingResolved);

    if (pingResolved) {
      setTimeout(function () {
        ONLINE = false;
      }, 1000); //1s
    }
  });

  return ONLINE;
}

// RESOLVES MULTIPLE TIMES
export function fakePromise(promise): Promise<any> {
  return {
    then(thenCallback) {
      let error;
      try {
        promise(thenCallback);
      } catch (e) {
        error = e;
      }
      return {
        catch(callback) {
          if (callback && error) {
            callback(error);
          }
        }
      };
    }
  } as Promise<any>;
}

export function appendLink(href: string, callback?: () => void) {
  const document = _window.document;
  if (!document) {
    return;
  }

  const link = document.createElement("link");
  const head = document.getElementsByTagName("head")[0];

  link.addEventListener("load", function () {
    if (callback) {
      callback();
    }
  });

  link.type = "text/css";
  link.rel = "stylesheet";
  link.href = href;
  head.appendChild(link);

  return link;
}

export function appendLinkContent(content: string): HTMLStyleElement | undefined {
  const document = _window.document;
  if (!document) {
    return;
  }

  const link = document.createElement("style");
  const head = document.getElementsByTagName("head")[0];

  link.type = "text/css";
  link.innerHTML = content;
  head.appendChild(link);

  return link;
}

// https://stackoverflow.com/questions/1060008/is-there-a-way-to-detect-if-a-browser-window-is-not-currently-active
// Chrome 13+
// Internet Explorer 10+
// Firefox 10+
// Opera 12.10+ [read notes]
export function visibilityUpdate(callback): void {
  const doc = _window.document as any;
  if (!doc) {
    return;
  }

  let hidden = "hidden";

  // Standards:
  if ("hidden" in doc) {
    doc.addEventListener("visibilitychange", onchange);
  } else if ("mozHidden" in doc) {
    hidden = "mozHidden";
    doc.addEventListener("mozvisibilitychange", onchange);
  } else if ("webkitHidden" in doc) {
    hidden = "webkitHidden";
    doc.addEventListener("webkitvisibilitychange", onchange);
  } else if ("msHidden" in doc) {
    hidden = "msHidden";
    doc.addEventListener("msvisibilitychange", onchange);
  } else if ("onfocusin" in doc) {
    doc.onfocusin = doc.onfocusout = onchange;
  } else {
    _window.onpageshow = _window.onpagehide = _window.onfocus = _window.onblur = onchange;
  }

  function onchange(evt) {
    const evtMap = {
      focus: false, focusin: false, pageshow: false, blur: true, focusout: true, pagehide: true
    };

    evt = evt || _window.event;
    if (evt.type in evtMap) {
      // console.log("evt.type in evtMap");
      const isHidden = evtMap[evt.type];
      callback(!isHidden);
    } else {
      const isHidden = doc[hidden];
      callback(!isHidden);
    }
  }

  // // set the initial state (but only if browser supports the Page Visibility API)
  // if (_window.document[hidden] !== undefined) {
  //   onchange({ type: _window.document[hidden] ? "blur" : "focus" });
  // }
};

// ONCE
export async function pageShow(): Promise<void> {
  return new Promise(function (resolve) {
    visibilityUpdate(function (visible: boolean) {
      if (visible) {
        resolve();
      }
    });
  });
}

export function apiUploads(): string {
  const location = _window.location;
  if (!location) {
    return "";
  }
  const hostArr = location.host.split(".");
  return location.protocol + "//uploads." + hostArr.slice(hostArr.length - 2).join(".");
}

export function normalize(txt: string): string {
  let normalized = txt;

  try {
    normalized = txt.normalize("NFD")
  } catch (e) {
    //
  }

  return normalized.replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase()
    .replace(/[ |-|(|)|'|"|,]+/gi, "_");
}

export async function reload(all?: boolean): Promise<boolean> {
  const location = _window.location;

  if (!location) return false;
  const time = 10000; // < 10sec.

  const reload = Number(LocalStorage.getItem("reload"));
  const now = (new Date()).getTime();

  if (reload && now - reload < time) {
    return false;
  }

  LocalStorage.setItem("reload", "" + now);
  await timeout(1);

  all = "undefined" == typeof all ? true : all;
  location.reload(all);
  return true;
}

export function localeMatch(locale: string): RegExpMatchArray | undefined {
  if (!locale) return;

  const match = locale.match(/^([a-zA-Z]{2,3})(?:-([a-zA-Z]{2}))?$/);
  if (!match) return;

  const localeArr = locale.split("-");
  const lang = localeArr[0];
  if ("adm" == lang) return;

  return match;
}

export function isProduction(): boolean {
  const location = _window.location;

  const host = location && location.host;
  if (!host) return ["production", "hotfix"].includes(process.env.NODE_ENV || "");

  if ((!host.includes("comoquiero.cl") && !host.includes("comoquiero.net"))
    || 0 === host.indexOf("dev.")
    || 0 === host.indexOf("v2.")
    || 0 === host.indexOf("beta.")
    || 0 === host.indexOf("testing.")) {
    return false;
  }

  return true;
}

// https://stackoverflow.com/questions/26150232/resolve-javascript-promise-outside-function-scope
export class Deferred {
  constructor() {
    (this as any).promise = new Promise((resolve, reject) => {
      (this as any).reject = reject;
      (this as any).resolve = resolve;
    })
  }
}

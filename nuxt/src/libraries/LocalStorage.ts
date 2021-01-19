/*
PREVENT THROW ERRORS IF NOT ENOUGH AVAILABLE SPACE ON 'setItem()'
*/

import _window from "@/libraries/window";

export default {
  getItem(key: string): string | null | undefined {
    const localStorage = _window.localStorage;
    try {
      return localStorage && localStorage.getItem(key);
    } catch (e) {
      // do nothing
    }
  },
  setItem(key: string, value: string): void {
    const localStorage = _window.localStorage;
    try {
      localStorage && localStorage.setItem(key, value);
    } catch (e) {
      // DYNAMIC IMPORT, PREVENT LOOP IMPORTS
      // import("@/assets/js/report").then(function(report) {
      //   report.silentReport(e, { key, value });
      // });
    }
  },
  removeItem(key: string): void {
    const localStorage = _window.localStorage;
    try {
      localStorage && localStorage.removeItem(key);
    } catch (e) {
      // do nothing
    }
  }
};
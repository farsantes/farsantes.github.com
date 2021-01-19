// HANDLE LOCAL DATA

import localForage from 'localforage';
import _window from '@/libraries/window';
import LocalStorage from "@/libraries/LocalStorage";

import { headerAttr, isType, windowLoad, stringify } from "@/assets/js/utils";

declare global {
  interface Window {
    onNuxtReady?: (callback: () => Promise<void>) => void;
    NativeStorage?: any;
  }
}

export let BROKEN_STORAGE = false;
export const ONLINE_CACHE_TIME = 120; //2h (ONLINE CACHE)
export const EDITED_CACHE_TIME = 1440; //24h (ONLINE CACHE)
export const OFFLINE_CACHE_TIME = 40000; //< 1 month (OFFLINE CACHE)

// ADD MEMORY DRIVER FOR FALLBACK CONSOLE ERRORS
try {
  localForage.defineDriver({
    _driver: 'none',
    _initStorage: async () => { },
    iterate: async () => { return {}[0] },
    getItem: async () => { return {}[0] },
    setItem: async () => { return {}[0] },
    removeItem: async () => { },
    clear: async () => undefined,
    length: async () => 0,
    key: async () => "",
    keys: async () => [],
  });
} catch (e) {
  BROKEN_STORAGE = true;
}

try {
  localForage.setDriver([localForage.INDEXEDDB, localForage.WEBSQL, localForage.LOCALSTORAGE, "none"]);
} catch (e) {
  BROKEN_STORAGE = true;
}

async function getLocalForage(): Promise<typeof import("localforage") | undefined> {
  if (!process.client || BROKEN_STORAGE) return;

  // await timeout(1);
  // return (Vue as any).$localforage;
  return localForage;
}

// CLEAR ALL INACTIVE (ASYNC - NOT DISTURB LOADING)
getLocalForage().then(async function (localForage) {
  if (!localForage) return;

  let keys;
  try {
    keys = await localForage.keys();
  } catch (e) {
    return;
  }

  // CLEAN LOCAL CACHE ON RELOAD
  for (const key of keys) {
    if (key.startsWith("http")) removeItem(key);
  }

  await windowLoad();
  const timeNow = now();

  console.log("storage keys", keys.length);
  for (const key of keys) {

    // EXPIRATION KEYS
    if (/-time$/.test(key)) {
      const plainKey = key.replace(/-time$/, "");

      // CLEAN EXPIRATION ALONE KEYS
      if (!keys.includes(plainKey)) {
        await removeItem(key);
        continue;
      }

      // OFFLINE_CACHE_TIME
      let time;
      try {
        time = await localForage.getItem(key);
      } catch (e) {
        continue;
      }

      if (timeNow - Number(time) > OFFLINE_CACHE_TIME) {
        console.log("remove cache", plainKey);
        await removeItem(plainKey);
      }
    }

    // DATA KEYS
    if (!/-time$/.test(key)) {
      const expiration = key + "-time";

      // CLEAN NOT EXPIRATION DATA KEYS
      if (!keys.indexOf(expiration)) {
        await removeItem(key);
        continue;
      }
    }
  }
})

export default {
  async set(key: string, value: any, options?: any): Promise<void> {
    const localForage = await getLocalForage();
    if (!localForage) {
      console.log("!localForage", key);
      return;
    }

    //const edited = namedId(key) && (!options || !options.original);
    const edited = !options || !options.original;

    if (edited) {
      const current = await localForage.getItem(key);
      if (stringify(current) == stringify(value)) {
        return;
      }
    }

    try {
      if (edited) {
        localForage.setItem(key + "-edited", 1);
      }
      localForage.setItem(key + "-time", now());
      localForage.setItem(key, value);
    } catch (e) {
      console.log("storage set error", e);
    }
  },
  async get(key: string, type, headers?: Headers, httpFallback?: true): Promise<any> {
    const localForage = await getLocalForage();
    if (!localForage) {
      console.log("!localForage", key);
      return;
    }

    // NO CACHE WHEN ADMIN
    if (LocalStorage.getItem("admin")) {
      console.log("NO CACHE ADMIN");
      return;
    }

    let data;
    try {
      data = await localForage.getItem(key);
    } catch (e) {
      //do nothing
    }
    if ("undefined" === typeof data || null === data) return;

    // TYPE
    const wrongType = !isType(data, type);
    if (wrongType) {
      removeItem(key);
      return;
    }

    // CACHE TIME OVER
    const cacheTimeOver = await this.cacheTimeOver(key, headers);
    if (cacheTimeOver) return;

    return data;
  },
  async cacheTimeOver(key: string, headers?: Headers): Promise<boolean> {
    const localForage = await getLocalForage();
    if (!localForage) return false;

    let keyTime;
    let keyEdited;
    try {
      keyTime = await localForage.getItem(key + "-time");
      keyEdited = await localForage.getItem(key + "-edited");
    } catch (e) {
      return false;
    }

    const CACHE_TIME = (keyEdited && namedId(key)) ? EDITED_CACHE_TIME : ONLINE_CACHE_TIME;

    const creationTime = Number(keyTime);
    const timeNow = now();
    const overrideTime = Number(headerAttr(headers, "cache-control", "max-age"));
    const cacheTime = (overrideTime / 60) || CACHE_TIME;
    // console.log("cacheTimeOver", key, !creationTime || (timeNow - creationTime) > cacheTime, timeNow, creationTime, timeNow - creationTime, cacheTime);
    return !creationTime || (timeNow - creationTime) > cacheTime;
  },
  // IGNORE CACHE TIME
  async stale(key: string, type): Promise<any> {
    const localForage = await getLocalForage();
    if (!localForage) return;

    let data;
    try {
      data = await localForage.getItem(key);
    } catch (e) {
      return;
    }

    if ("undefined" === typeof data || null === data) {
      return;
    }

    // TYPE
    const wrongType = !isType(data, type);
    if (wrongType) {
      removeItem(key);
      return;
    }

    return data;
  },
  async remove(key: string): Promise<void> {
    return removeItem(key);
  },
  async edited(key: string): Promise<1 | null> {
    const localForage = await getLocalForage();
    if (!localForage) {
      return null;
    }

    return await localForage.getItem(key + "-edited");
  }
};

// NEEDED PERSISTENT STORAGE
export const persistent = {
  async getItem(key: string, safe = true): Promise<string> {

    // LOCALSTORAGE
    const localStorageValue = LocalStorage.getItem(key);
    if (localStorageValue) {
      return localStorageValue;
    }

    // LOCALFORAGE
    const storage = await persistentLocalForage();
    const localForageValue = storage && await storage.getItem(key);
    if (localForageValue) {
      return "" + localForageValue;
    }

    // NATIVESTORAGE
    if (false !== safe) {
      await windowLoad();
    }

    if (_window.NativeStorage) {
      const nativeStorageValue = await new Promise((resolve, reject) => {
        _window.NativeStorage.getItem(key, resolve, reject);
      }).catch((e) => {
        console.log(e);
      });
      if (nativeStorageValue) {
        return "" + nativeStorageValue;
      }
    }

    return "";
  },
  async setItem(key: string, value: string): Promise<void> {

    // LOCALSTORAGE
    LocalStorage.setItem(key, value);

    // LOCALFORAGE
    const storage = await persistentLocalForage();
    storage && await storage.setItem(key, value);

    // NATIVESTORAGE
    await windowLoad();
    _window.NativeStorage && await _window.NativeStorage.setItem(key, value);
  },
  async removeItem(key: string): Promise<void> {

    // LOCALSTORAGE
    LocalStorage.removeItem(key);

    // LOCALFORAGE
    const storage = await persistentLocalForage();
    storage && await storage.removeItem(key);

    // NATIVESTORAGE
    _window.NativeStorage && await _window.NativeStorage.remove(key);
  }
}

////////////////////////////////////////////////////////////////////////////////
// HELPERS

let PERSISTENT_LOCAL_FORAGE;
async function persistentLocalForage(): Promise<typeof import("localforage") | undefined> {
  if (!process.client) return;
  if (PERSISTENT_LOCAL_FORAGE) return PERSISTENT_LOCAL_FORAGE;

  const localForage = await getLocalForage();
  if (!localForage) return;

  try {
    PERSISTENT_LOCAL_FORAGE = await localForage.createInstance({ name: "persistent" });
  } catch (e) {
    //ignore
  }

  return PERSISTENT_LOCAL_FORAGE;
}

async function removeItem(key: string): Promise<void> {
  const localForage = await getLocalForage();
  if (!localForage) {
    return;
  }

  try {
    const removes = [localForage.removeItem(key)];
    if (!/-time$/.test(key)) {
      removes.push(localForage.removeItem(key + "-time"));
      removes.push(localForage.removeItem(key + "-edited"));
    }
    await Promise.all(removes);
  } catch (e) {
    //
  }
}

function now(): number {
  return Math.round(+new Date() / 60000); //mins.
}

function namedId(key: string): boolean {
  const keyArr = key.split("/");
  const keyId = 2 == keyArr.length ? keyArr[1].split("?")[0] : null;
  return !!keyId && !Number(keyId);
}
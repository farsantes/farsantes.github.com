import VueRouter from "vue-router";

import _window from "@/libraries/window";

import { timeout } from '@/assets/js/utils';

import routesStore from '@/store/routes';
import localesStore from '@/store/locales';

export let router: VueRouter;

// let appLocalPath;
// let appSwitchLocalePath;

// let switchLocalePath = function (...args) {
//   return appSwitchLocalePath(...args);
// };

export default (ctx) => {
  console.log("plugin router");
  // console.log("router default ctx", JSON.stringify(Object.keys(ctx)));
  // console.log("router default app", JSON.stringify(Object.keys(ctx.app)));

  const app = ctx.app;
  router = app.router;
  // appLocalPath = app.localePath;
  // appSwitchLocalePath = app.switchLocalePath;

  // PREVENT REPORT "Navigation cancelled from"
  router.onError(function (e) {
    console.log("router, onError", e);
  });

  const route = ctx.route;
  routesStore.updateRoute(route);

  routesStore.router = router;
  // routesStore.route = route;
  localesStore.updateRoute(route);
};

export async function routerReplace(path, ...args) {
  await timeout(0); // WAIT ROUTER IDLE
  return router.replace(path, ...args);
}

export async function routerPush(path, ...args) {
  await timeout(1); // WAIT ROUTER IDLE
  if (router) {
    return router.push(path, ...args);
  }

  // TRY AGAIN
  await timeout(1000);
  return routerPush(path, ...args);
}
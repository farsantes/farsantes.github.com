import Vue from "vue";
import AsyncComputed from "vue-async-computed";

import { capitalize, formatNumber, formatPrice } from "@/assets/js/utils";

Vue.config.productionTip = false;
Vue.config.devtools = true; //DEBUG
// Vue.config.performance = true; //DEBUG

Vue.use(AsyncComputed);

Vue.filter("capitalize", function (str) {
  return capitalize(str);
});
Vue.filter("formatNumber", function (value) {
  return formatNumber(value);
});
Vue.filter("formatPrice", function (value) {
  return formatPrice(value);
});
Vue.filter("lowerCase", function (txt) {
  return txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase();
});
Vue.filter("datetime", function (txt) {
  if (!txt) {
    return "";
  }
  return new Date(txt * 1000).toLocaleString("default", { hour12: false });
});
Vue.filter("date", function (txt) {
  if (txt < 10) {
    return "";
  }
  const datetme = new Date(txt * 1000).toLocaleString("default", { hour12: false });
  return datetme.split(" ")[0];
});

Vue.directive("focus", {
  inserted(el) {
    Vue.nextTick(function () {
      el.focus();
    });
  }
});

export default Vue;
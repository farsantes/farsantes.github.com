import { Route } from 'vue-router';
import Vue from "vue"; //ORIGINAL LIB HERE, PREVENT CIRCULAR IMPORTS
import { stringify, deepCopy } from "@/assets/js/utils";

const routesStore = new Vue({
  name: "RoutesStore",
  data() {
    return {
      router: {} as any,
      route: {} as Route,
      fullPath: "",
      path: "",
      name: "",
      page: "",
      query: {} as any,
      params: {} as any,
    };
  },
  computed: {
    homePage(): boolean | undefined {
      const page = this.page;
      return !page || "index" == page;
    }
  },
  watch: {
    // "$router.currentRoute"(route): void {
    //   console.log("router.currentRoute watch");
    //   this.updateRoute(route);
    //   this.route = route;
    // },
    "router.currentRoute"(route): void {
      this.updateRoute(route);
      this.route = route;
    },
    route: {
      deep: true,
      handler(route): void {
        console.log("route watch");
        this.updateRoute(route);
      }
    }
  },
  methods: {
    // setRouter(router) {
    //   this.router = router;
    //   this.updateRoute(router.currentRoute);
    // },
    updateRoute(route: Route | null): void {
      if (!route) {
        console.warn("!route");
        return;
      }

      if (this.fullPath != route.fullPath) {
        this.fullPath = route.fullPath;
      }

      if (this.path != route.path) {
        this.path = route.path;
      }

      console.log("updateRoute", this.name, "->", route.name);
      if (this.name != route.name) {
        this.name = route.name || "";
      }

      if (route.name) {
        const pageArr = route.name.split("_")[0].split("-");
        let page = pageArr.length > 1 ? pageArr[1] : "index";
        if (this.page != page) {
          console.log("this.page = ", page)
          this.page = page;
        }
      }

      const query = route.query;
      if (stringify(this.query) != stringify(query)) {
        this.query = deepCopy(query);
      }

      const params = route.params;
      if (JSON.stringify(this.params) != JSON.stringify(params)) {
        this.params = params;
      }
    }
  }
});

export default routesStore;
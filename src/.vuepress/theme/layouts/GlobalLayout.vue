<template>
  <v-app>
    <v-app-bar style="flex: 0">
      <v-toolbar-title>
        <v-btn plain to="/">
          <div>
            farsantes
            <div style="color: gray; line-height: 1; font-size: 15px">
              .github.io
            </div>
          </div>
        </v-btn>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-autocomplete
        hide-details
        outlined
        rounded
        dense
        v-model="page"
        :items="pages"
        item-text="title"
        item-value="regularPath"
        placeholder="buscar.."
        style="flex: 1; flex-grow: 9"
      />

      <v-toolbar-items v-if="!$vuetify.breakpoint.xs" style="margin-left: 10px">
        <v-btn
          text
          v-for="item in $themeConfig.nav"
          :key="item.text"
          :to="item.link"
        >
          {{ item.text }}
        </v-btn>
      </v-toolbar-items>

      <v-app-bar-nav-icon v-else @click="dialog = true" />
    </v-app-bar>

    <v-main>
      <v-container style="margin-top: 10px; max-width: 900px">
        <GlobalLayout />
      </v-container>
    </v-main>

    <v-footer>
      <div style="display: inline-block; margin: auto">
        <v-btn plain to="/about">About Me</v-btn>
        <v-btn
          plain
          href="https://github.com/farsantes/farsantes.github.com"
          target="_blank"
        >
          Colabora
          <v-icon>mdi-github</v-icon>
        </v-btn>
      </div>
    </v-footer>

    <!-- MENU DIALOG: -->
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar flat>
          <!-- <v-toolbar-title>Menu</v-toolbar-title> -->
          <v-spacer></v-spacer>
          <v-btn icon @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>

        <v-list>
          <v-list-item
            v-for="item in $themeConfig.nav"
            :key="item.link"
            :to="item.link"
            @click="dialog = false"
          >
            <v-list-item-content>
              <v-list-item-title>{{ item.text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import GlobalLayout from "@app/components/GlobalLayout.vue";

export default {
  components: {
    GlobalLayout,
  },
  data() {
    return {
      dialog: false,
      page: "",
    };
  },
  computed: {
    pages() {
      return this.$site.pages
        .filter((p) => !!p.title)
        .sort((a, b) => {
          return b.title.localeCompare(a.title);
        });
    },
  },
  watch: {
    page(page) {
      if (page) {
        this.page = "";
        console.log("push", page);
        this.$router.push(page);
      }
    },
  },
};
</script>

<style lang="stylus">
#vuepress-theme-blog__global-layout {
  word-wrap: break-word;
}

.content-wrapper {
  padding: 160px 15px 80px 15px;
  min-height: calc(100vh - 80px - 60px - 160px);
  max-width: $contentWidth;
  margin: 0 auto;

  @media (max-width: $MQMobile) {
    & {
      padding: 100px 15px 20px 15px;
      min-height: calc(100vh - 20px - 60px - 100px);
    }
  }
}
</style>

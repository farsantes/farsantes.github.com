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

      <v-spacer />

      <v-autocomplete
        ref="search"
        hide-details
        outlined
        rounded
        dense
        v-model="page"
        :items="names"
        item-text="text"
        item-value="value"
        placeholder="buscar.."
        style="flex: 1; flex-grow: 9"
      />

      <v-toolbar-items v-if="!xs" style="margin-left: 10px">
        <v-btn text v-for="item in nav" :key="item.text" :to="item.link">
          {{ item.text }}
        </v-btn>
      </v-toolbar-items>

      <v-app-bar-nav-icon v-else @click="dialog = true" />
    </v-app-bar>

    <v-main>
      <v-container style="margin-top: 10px; max-width: 900px">
        <nuxt keep-alive />
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
          <!-- Colabora -->
          Github
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
            v-for="item in nav"
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

<script lang="ts">
import Vue from "@/libraries/vue";
import { timeout } from "@/assets/js/utils";
import postsStore from "@/store/posts";

export default Vue.extend({
  name: "LayoutDefault",
  data() {
    return {
      dialog: false,
      page: "",
    };
  },
  computed: {
    posts: () => postsStore.posts,
    xs(): boolean {
      const vuetify = (this as any).$vuetify;
      return !!vuetify && !!vuetify.breakpoint.xs;
    },
    nav() {
      return [
        { text: "fuentes", link: "/fuentes" },
        { text: "explicaciones", link: "/explicaciones" },
        { text: "tags", link: "/tags" },
      ];
    },
    names(): string[] {
      const posts = this.posts;
      const name: any[] = [];

      for (const group in posts) {
        for (const post of posts[group]) {
          if (!post.id) continue;
          name.push({
            text: post.name,
            value: postsStore.postLink(post, group),
          });
        }
      }

      return [...new Set(name)];
    },
  },
  watch: {
    async page(page: string) {
      if (page) {
        await timeout(1);
        this.$refs.search.blur();
        this.page = "";
        this.$router.push(page);
      }
    },
  },
});
</script>
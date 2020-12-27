<template>
  <div class="component--sources scrollmenu">
    <div class="post" v-for="page in sources">
      <router-link :to="page.path">
        <div class="img">
          <img v-if="page.frontmatter.image" :src="$withBase(page.frontmatter.image)" alt />
          <img
            v-if="page.frontmatter.score"
            style="position: absolute; left: -5px; top: -5px; width: 35px; height: 35px;"
            :src="$withBase(page.frontmatter.score) + '.png'"
          />
        </div>
        <div style="overflow: hidden;">{{page.frontmatter.title}}</div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "HorizontalScroll",
  props: ["page"],
  computed: {
    pages() {
      return this.$site.pages;
    },
    filteredPages() {
      const pages = this.pages;
      const page = this.page;

      return pages.filter((x) => {
        return x.regularPath.match(new RegExp("(" + page + ")(?=.*html)"));
      });
    },
    sources() {
      const filteredPages = this.filteredPages;
      const page = this.page;

      let sources = filteredPages.sort((a, b) => {
        return (b.frontmatter.audience || 0) - (a.frontmatter.audience || 0);
      });

      return sources;
    },
  },
};
</script>

<style>
.component--sources .post {
  width: 120px;
}

.component--sources .img {
  position: relative;
  height: 120px;
  background: gainsboro;
}

.component--sources .img img {
  height: 100%;
  width: 100%;
  object-fit: cover;
}
</style>
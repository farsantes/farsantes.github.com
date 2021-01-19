<template>
  <!-- style="max-width: 600px; margin: auto" -->
  <div>
    <article
      v-for="post in posts"
      :key="post.name"
      itemscope
      itemtype="https://schema.org/BlogPosting"
    >
      <v-row style="display: flex; flex-direction: row; padding: 12px">
        <meta
          itemprop="mainEntityOfPage"
          :content="'/' + group + '/' + post.id"
        />

        <div style="width: 100px; height: 100px; margin-right: 10px">
          <router-link v-if="post.image" :to="'/' + group + '/' + post.id">
            <v-img
              :src="post.image"
              width="100px"
              height="100px"
              style="max-width: 100%; max-height: 100%"
            />
          </router-link>
        </div>

        <!-- style="width: 100%" -->
        <div style="flex: 1; overflow: hidden; margin-top: 2px">
          <div v-show="'fuentes' == group" class="audience">
            Audiencia: {{ post.audience || "?" }}
          </div>

          <header
            class="ui-post-title"
            style="line-height: 1"
            itemprop="name headline"
          >
            <router-link :to="'/' + group + '/' + post.id">{{
              post.name
            }}</router-link>
          </header>

          <div class="ui-post-summary" itemprop="description">
            {{ post.description }}
          </div>

          <footer>
            <!-- v-if="post.tags && post.tags.length" -->
            <div class="ui-post-meta ui-post-tag" itemprop="keywords">
              <!-- <TagIcon /> -->
              <v-icon small>mdi-tag-outline</v-icon>
              <router-link
                v-for="tag in post.tags"
                :key="tag"
                :to="'/tag/' + tag"
              >
                {{ tag }}
              </router-link>
            </div>
          </footer>
        </div>
      </v-row>

      <v-divider style="margin: 20px 0" />
    </article>
  </div>
</template>

<script lang="ts">
import Vue from "@/libraries/vue";
import postsStore from "@/store/posts";

export default Vue.extend({
  name: "Index",
  computed: {
    group(): string {
      return this.$route.params.group || "fuentes";
    },
    posts(): any[] {
      const group = this.group;

      const tag = this.$route.params.tag;
      if (tag) {
        const posts: any[] = [];
        for (const g in postsStore.posts) {
          const gPosts = postsStore.posts[g].filter(
            (p) => p.id && p.tags.includes(tag)
          );
          posts.push(...gPosts);
        }
        return posts;
      }

      const posts = postsStore.posts[group];
      if (!posts) {
        // this.$router.push("/");
        return [];
      }

      return posts
        .filter((p) => p.id)
        .sort((a, b) => {
          // BY TAGS
          const tagsA = a.tags || [];
          const tagsB = b.tags || [];
          if (tagsA.length != tagsB.length) {
            return tagsB.length - tagsA.length;
          }

          // BY AUDIENCE
          const audienceA = parseInt(a.audience) || 0;
          const audienceB = parseInt(b.audience) || 0;
          if (audienceA != audienceB) {
            return audienceB - audienceA;
          }

          // BY NAME
          return (a.name || "").localeCompare(b.name || "");
        });
    },
  },
});
</script>

<style scoped>
.common-layout .content-wrapper {
  padding-bottom: 80px;
}

.ui-post {
  padding-bottom: 25px;
  margin-bottom: 25px;
}
.ui-post:last-child {
  border-bottom: 0px;
  margin-bottom: 0px;
}

.ui-post-title {
  font-family: PT Serif, Serif;
  font-size: 28px;
  border-bottom: 0;
}
ui-post-title a {
  cursor: pointer;
  /* color: $darkTextColor; */
  transition: all 0.2s;
  text-decoration: none;
}
ui-post-title a:hover {
  text-decoration: underline;
}

.ui-post-summary {
  font-size: 14px;
  color: rgb(120, 120, 120);
  font-weight: 200;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.ui-post-meta {
  display: inline-flex;
  align-items: center;
  font-size: 12px;
  line-height: 12px;
}

.ui-post-meta:not(:last-child) {
  margin-bottom: 3px;
  margin-right: 20px;
}

svg {
  margin-right: 5px;
  width: 14px;
  height: 14px;
}

/* @media (max-width: $MQMobile) {
    display: flex;

    &:not(:last-child) {
      margin-bottom: 10px;
    }
  } */

.ui-post-author {
  /* color: rgba($darkTextColor, 0.84); */
  font-weight: 400;
}

.ui-post-date {
  /* color: rgba($darkTextColor, 0.54); */
  font-weight: 200;
}

.ui-post-tag {
  /* color: rgba($darkTextColor, 0.54); */
  font-weight: 200;
}
.ui-post-tag a {
  color: inherit;
  font-weight: 200;
  text-decoration: none;
  margin-right: 5px;
}
/* .ui-post-tag a :hover {
  color: $accentColor;
} */

.audience {
  color: grey;
  font-size: 13px;
  margin-top: -3px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.page_tag .post_explanations {
  background-color: #e6e6e6;
}
</style>
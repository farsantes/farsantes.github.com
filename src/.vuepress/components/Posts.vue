<template>
  <!-- <div class="posts" v-if="posts.length">
    <div class="post" v-for="page in posts">
      <div>
        <img v-if="page.frontmatter.image" :src="$withBase(page.frontmatter.image)" alt />
      </div>
      <router-link :to="page.path">
        <h2>{{page.frontmatter.title}}</h2>
      </router-link>
      <p v-if="page.excerpt" class="ui-post-summary" itemprop="description" v-html="page.excerpt" />
      <div v-if="page.frontmatter.tags" class="ui-post-meta ui-post-tag" itemprop="keywords">
        <router-link v-for="tag in page.frontmatter.tags" :key="tag" :to="'/tag/' + tag">{{ tag }}</router-link>
      </div>
    </div>
  </div>-->
  <div id="base-list-layout">
    <div class="ui-posts" itemscope itemtype="http://schema.org/Blog">
      <div
        v-for="page in pages"
        :key="page.key"
        class="ui-post"
        itemprop="blogPost"
        itemscope
        itemtype="https://schema.org/BlogPosting"
      >
        <meta itemprop="mainEntityOfPage" :content="page.path" />

        <header class="ui-post-title" itemprop="name headline">
          <NavLink :link="page.path">{{ page.title }}</NavLink>
        </header>
        <!-- eslint-disable vue/no-v-html -->
        <p
          v-if="page.excerpt"
          class="ui-post-summary"
          itemprop="description"
          v-html="page.excerpt"
        />
        <!-- eslint-enable vue/no-v-html -->
        <p v-else class="ui-post-summary" itemprop="description">
          {{ page.frontmatter.summary || page.summary }}
        </p>

        <footer>
          <!-- <div v-if="page.frontmatter.date" class="ui-post-meta ui-post-date">
            <ClockIcon />
            <time
              pubdate
              itemprop="datePublished"
              :datetime="page.frontmatter.date"
            >{{ resolvePostDate(page.frontmatter.date) }}</time>
          </div>-->

          <div
            v-if="page.frontmatter.tags"
            class="ui-post-meta ui-post-tag"
            itemprop="keywords"
          >
            <TagIcon />
            <router-link
              v-for="tag in resolvePostTags(page.frontmatter.tags)"
              :key="tag"
              :to="'/tag/' + tag"
              >{{ tag }}</router-link
            >
          </div>
        </footer>
      </div>
    </div>

    <!-- disqus:
    <Disqus shortname="farsantes" /> -->
    <script src="https://embedd.io/embedd.min.js"></script>
  </div>
</template>

<script>
/* global THEME_BLOG_PAGINATION_COMPONENT */
import Vue from "vue";
import { Disqus } from "vue-disqus";

import dayjs from "dayjs";
import { NavigationIcon, ClockIcon, TagIcon } from "vue-feather-icons";
import {
  Pagination,
  SimplePagination,
} from "@vuepress/plugin-blog/lib/client/components";

export default {
  components: { NavigationIcon, ClockIcon, TagIcon },
  props: ["page"],
  components: {
    Disqus,
  },
  computed: {
    pages() {
      let currentPage = this.page ? this.page : this.$page.path;

      let posts = this.$site.pages
        .filter((x) => {
          return x.path.match(new RegExp(`(${currentPage})(?=.*html)`));
        })
        .sort((a, b) => {
          return (
            new Date(b.frontmatter.date) - new Date(a.frontmatter.date) ||
            (b.frontmatter.audience || 0) - (a.frontmatter.audience || 0)
          );
        });

      return posts;
    },
  },
  methods: {
    resolvePostDate(date) {
      return dayjs(date).format(
        this.$themeConfig.dateFormat || "ddd MMM DD YYYY"
      );
    },
    resolvePostTags(tags) {
      if (!tags || Array.isArray(tags)) return tags;
      return [tags];
    },
  },
};
</script>

<style lang="stylus">
.common-layout {
  .content-wrapper {
    padding-bottom: 80px;
  }
}

.ui-post {
  padding-bottom: 25px;
  margin-bottom: 25px;
  border-bottom: 1px solid $borderColor;

  &:last-child {
    border-bottom: 0px;
    margin-bottom: 0px;
  }
}

.ui-post-title {
  font-family: PT Serif, Serif;
  font-size: 28px;
  border-bottom: 0;

  a {
    cursor: pointer;
    color: $darkTextColor;
    transition: all 0.2s;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
}

.ui-post-summary {
  font-size: 14px;
  color: rgba($darkTextColor, 0.54);
  font-weight: 200;
}

.ui-post-meta {
  display: inline-flex;
  align-items: center;
  font-size: 12px;
  line-height: 12px;

  &:not(:last-child) {
    margin-bottom: 3px;
    margin-right: 20px;
  }

  svg {
    margin-right: 5px;
    width: 14px;
    height: 14px;
  }

  @media (max-width: $MQMobile) {
    display: flex;

    &:not(:last-child) {
      margin-bottom: 10px;
    }
  }
}

.ui-post-author {
  color: rgba($darkTextColor, 0.84);
  font-weight: 400;
}

.ui-post-date {
  color: rgba($darkTextColor, 0.54);
  font-weight: 200;
}

.ui-post-tag {
  color: rgba($darkTextColor, 0.54);
  font-weight: 200;

  a {
    color: inherit;
    font-weight: 200;
    text-decoration: none;
    margin-right: 5px;

    &:hover {
      color: $accentColor;
    }
  }
}
</style>
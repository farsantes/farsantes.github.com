<template>
  <div
    class="ui-posts"
    :class="'page_' + title"
    itemscope
    itemtype="http://schema.org/Blog"
  >
    <article
      v-for="page in pages"
      :key="page.key"
      class="ui-post"
      itemprop="blogPost"
      itemscope
      itemtype="https://schema.org/BlogPosting"
    >
      <v-row
        :class="'post_' + page.id"
        style="display: flex; flex-direction: row; padding: 12px"
      >
        <meta itemprop="mainEntityOfPage" :content="page.path" />

        <router-link :to="page.path">
          <v-img
            :src="$withBase(page.frontmatter.image)"
            width="100px"
            height="100px"
            style="margin-right: 10px"
          />
        </router-link>

        <!-- style="width: 100%" -->
        <div style="flex: 1; overflow: hidden">
          <div v-show="page.frontmatter.audience" class="audience">
            Audiencia: {{ page.frontmatter.audience }}
          </div>

          <header
            class="ui-post-title"
            style="line-height: 1"
            itemprop="name headline"
          >
            <router-link :to="page.path">{{ page.title }}</router-link>
          </header>

          <client-only v-if="page.excerpt">
            <!-- eslint-disable vue/no-v-html -->
            <div
              class="ui-post-summary"
              itemprop="description"
              v-html="page.excerpt"
            />
            <!-- eslint-enable vue/no-v-html -->
          </client-only>
          <div v-else class="ui-post-summary" itemprop="description">
            {{ page.frontmatter.summary || page.summary }}
          </div>

          <footer>
            <div
              v-if="page.frontmatter.author"
              class="ui-post-meta ui-post-author"
              itemprop="publisher author"
              itemtype="http://schema.org/Person"
              itemscope
            >
              <NavigationIcon />
              <span itemprop="name">{{ page.frontmatter.author }}</span>
              <span v-if="page.frontmatter.location" itemprop="address">
                &nbsp; in {{ page.frontmatter.location }}
              </span>
            </div>

            <div v-if="page.frontmatter.date" class="ui-post-meta ui-post-date">
              <ClockIcon />
              <time
                pubdate
                itemprop="datePublished"
                :datetime="page.frontmatter.date"
              >
                {{ resolvePostDate(page.frontmatter.date) }}
              </time>
            </div>

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
              >
                {{ tag }}
              </router-link>
            </div>
          </footer>
        </div>
      </v-row>
    </article>

    <component
      :is="paginationComponent"
      v-if="$pagination.length > 1 && paginationComponent"
    ></component>
  </div>
</template>

<script>
/* global THEME_BLOG_PAGINATION_COMPONENT */

import Vue from "vue";
import dayjs from "dayjs";
import dayjsPluginUTC from "dayjs/plugin/utc";
import { NavigationIcon, ClockIcon, TagIcon } from "vue-feather-icons";
import {
  Pagination,
  SimplePagination,
} from "@vuepress/plugin-blog/lib/client/components";

dayjs.extend(dayjsPluginUTC);

export default {
  components: { NavigationIcon, ClockIcon, TagIcon },
  data() {
    return {
      paginationComponent: null,
    };
  },
  computed: {
    title() {
      const currentTag = this.$currentTag;
      return (currentTag && currentTag.scope) || "";
    },
    pages() {
      // return this.$pagination.pages;
      return this.$pagination.pages
        .filter((p) => !!p.title)
        .sort((a, b) => {
          if (a.id != b.id) {
            return ("explanations" == b.id) - ("explanations" == a.id);
          }

          const tagsA = a.frontmatter.tags || [];
          const tagsB = b.frontmatter.tags || [];
          if (tagsA.length != tagsB.length) {
            return tagsB.length - tagsA.length;
          }

          if (a.frontmatter.audience || b.frontmatter.audience) {
            return (
              (b.frontmatter.audience || "" + "").replace(/[^0-9]+/g, "") -
              (a.frontmatter.audience || "" + "").replace(/[^0-9]+/g, "")
            );
          }

          return b.title.localeCompare(a.title);
        });
    },
  },
  created() {
    this.paginationComponent = this.getPaginationComponent();
  },
  methods: {
    number(str) {
      if (!str) return "";
      const num = str.replace(/[^0-9]+/g, "");
      return new Intl.NumberFormat().format(num);
    },
    getPaginationComponent() {
      const n = THEME_BLOG_PAGINATION_COMPONENT;
      if (n === "Pagination") {
        return Pagination;
      }

      if (n === "SimplePagination") {
        return SimplePagination;
      }

      return Vue.component(n) || Pagination;
    },
    resolvePostDate(date) {
      return dayjs
        .utc(date)
        .format(this.$themeConfig.dateFormat || "ddd MMM DD YYYY");
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

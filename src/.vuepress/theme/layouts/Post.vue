<template>
  <div id="vuepress-theme-blog__post-layout">
    <article
      class="vuepress-blog-theme-content"
      itemscope
      itemtype="https://schema.org/BlogPosting"
    >
      <PostMeta
        :tags="$frontmatter.tags"
        :author="$frontmatter.author"
        :date="$frontmatter.date"
        :location="$frontmatter.location"
      />

      <header>
        <h1 class="post-title" itemprop="name headline">
          {{ $frontmatter.title }}
        </h1>
      </header>

      <img
        v-if="$frontmatter.image"
        :src="$withBase($frontmatter.image)"
        onerror="this.style.display='none'"
      />

      <Content itemprop="articleBody" />

      <v-divider />

      <br />
      <Comments />

      <!-- <div>
        <iframe
          class="frame"
          src='data:text/html;charset=utf-8,<head><base target="_blank"></head><body><script type="text/javascript" src="https://www.reddit.com/r/politics/comments/kteyie/megathread_twitter_permanently_suspends.embed"></script></body>'
          scrolling="yes"
          frameborder="0"
        >
        </iframe>
      </div> -->

      <v-divider style="margin-top: 30px; margin-bottom: 5px" />

      <v-btn text @click="$router.back()">
        <v-icon small style="margin-top: -3px; margin-right: 5px">
          mdi-arrow-left
        </v-icon>
        volver
      </v-btn>
    </article>
  </div>
</template>

<script>
import PostMeta from "@theme/components/PostMeta.vue";
import Comments from "@theme/components/Comments.vue";
// import reddit from "@theme/embedd/reddit";

export default {
  components: {
    PostMeta,
    Comments,
  },
  // async mounted() {
  //   const embedd = reddit({
  //     url:
  //       "https://www.psypost.org/2020/12/study-links-regular-use-of-fox-news-twitter-and-facebook-to-reduced-knowledge-about-covid-19-58702",
  //   });
  //   console.log("embedd", embedd);

  //   const comments = embedd.getComments((err, data) => {
  //     console.log("data", data);
  //   });
  //   console.log("comments", comments);
  // },
};
</script>

<style lang="stylus">
@require '../styles/wrapper.styl';

.vuepress-blog-theme-content {
  @extend $wrapper;
  font-size: 16px;
  letter-spacing: 0px;
  font-family: PT Serif, Serif;
  color: $textColor;
  position: relative;

  // @media (min-width: $MQNarrow)
  // box-shadow 0 10px 20px rgba(0, 0, 0, 0.05), 0 6px 6px rgba(0, 0, 0, 0.07)
  .post-title {
    padding-top: 0;
  }
}

@media (max-width: $MQMobile) {
  .vuepress-blog-theme-content {
    padding-top: 0;
  }

  .post-title {
    margin-top: 0;
  }
}

.frame {
  width: 100%;
  border: none;
}
</style>

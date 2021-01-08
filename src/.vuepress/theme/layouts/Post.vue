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

      <br />
      <div id="supercomments"></div>

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

export default {
  components: {
    PostMeta,
  },
  mounted() {
    // https://github.com/supercomments/supercomments
    var code = window.location.href.match(/.*#access_token=(.[^&]+)/);
    var csrf = window.location.href.match(/.*&state=(.[^&]+)/);
    var expires = window.location.href.match(/.*&expires_in=(.[^&]+)/);
    if (code && csrf) {
      window.opener.postMessage(
        {
          type: "RedditAuthenticated",
          token: code[1],
          state: csrf[1],
          expires: expires[1],
        },
        "*"
      );
      window.close();
    }

    window.supercommentsConfig = {
      url: window.location.href,
      reddit: {
        consumerKey: "3LNiyg9eV6L60g",
        redirectUri: window.location.origin,
      },
      disqus: {
        // identifier: [your_disqus_id_(optional)],
        shortName: "farsantes",
      },
    };

    var script = document.createElement("script");
    if (script) {
      // script.type = "text/javascript";
      script.src = this.$withBase("/supercomments-embed.min.js");
      document.head.appendChild(script);
    }
  },
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
</style>

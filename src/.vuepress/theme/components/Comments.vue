<template>
  <section>
    <!-- class=" {{#config.both}}hasBtns{{/config.both}}" -->

    <div class="buttons">
      <div style="cursor: pointer" @click="openReddit">
        <img src="//i.imgur.com/I3JS7Ew.gif" />
        Reddit
      </div>
    </div>

    <div class="info">
      <a
        v-if="!comments.length"
        target="_blank"
        href="#"
        class="no-comments"
        @click="firstComment"
      >
        <h3>Postéalo en reddit para poder comentar!</h3>
      </a>
    </div>

    <div class="comments">
      <div v-for="comment in comments">
        <Comment :comment="comment" />
      </div>
    </div>
  </section>
</template>

<script>
import Comment from "@theme/components/Comment.vue";
import reddit from "@theme/embedd/reddit";

const origin = "https://farsantes.github.io";

export default {
  name: "Comments",
  components: {
    Comment,
  },
  data() {
    return {
      data: null,
    };
  },
  computed: {
    comments() {
      const data = this.data;
      return (data && data.comments) || [];
    },
    score() {
      const data = this.data;
      return (data && data.score) || "";
    },
    threads() {
      const data = this.data;
      return (data && data.threads) || "";
    },
    openRedditLink() {
      const comments = this.comments;
      if (!comments || !comments.length) return "";
      return comments[0].permalink;
    },
  },
  mounted() {
    const self = this;
    const url = origin + location.pathname;

    const embedd = reddit({ url });
    console.log("embedd", embedd);

    embedd.getComments((err, data) => {
      console.log("err", err);
      console.log("data", data);
      if (data) self.data = data;
    });
  },
  methods: {
    firstComment() {
      const href = origin + location.pathname;
      const title = document.querySelector("title").innerText;
      const url = `https://reddit.com/r/Conspiraciones/submit?url=${href}&title=${title}`;
      window.open(url);
    },
    openReddit() {
      const openRedditLink = this.openRedditLink;
      window.open(openRedditLink);
    },
  },
};
</script>

<style lang="scss">
@import "bourbon";
// @import "neat";

// @include keyframes(embeddFadeIn) {
//   from {
//     opacity: 0;
//   }
//   to {
//     opacity: 1;
//   }
// }

.embedd-container {
  padding: 20px 0 40px 0;

  section {
    // @include outer-container;
    // @include animation(embeddFadeIn 500ms ease-in);
    max-width: none;

    p,
    b,
    h3,
    h5,
    button {
      color: #333;
    }

    a {
      color: #369;
      text-decoration: none;
    }

    .info {
      display: inline-block;
      text-align: center;
      width: 100%;

      h3,
      h5 {
        float: none;
      }
    }

    .buttons {
      button {
        background: #fff;
        border: 1px solid #f2f2f2;
        border-bottom: none;
        padding: 1px 6px;
        padding-top: 2px;
        cursor: pointer;
        opacity: 0.7;
        line-height: 22px;
        border-top-left-radius: 3px;
        border-top-right-radius: 3px;
        border-bottom-left-radius: 0px;
        border-bottom-right-radius: 0px;
      }

      img {
        position: relative;
        top: 3px;
      }

      .active {
        opacity: 1;
      }
    }

    .more-btn-container {
      text-align: center;
    }

    .more-btn {
      border: 1px solid #f2f2f2;
      border-radius: 3px;
      background-color: #f5f5f5;
      padding: 5px 10px;
      margin: 10px 0;
      cursor: pointer;
      font: inherit !important;
    }

    article {
      // @include span-columns(12);
      padding: 10px;
      padding-top: 10px;
      margin-bottom: 10px;
      border: 1px solid #f2f2f2;
      border-radius: 3px;
      background-color: #f5f5f5;

      p {
        margin: 10px 0;
      }

      span {
        margin-right: 5px;
      }

      .hideChildrenBtn::before {
        content: "[ - ]";
        font-style: normal;
      }

      blockquote {
        margin: 0;
        opacity: 0.7;

        p {
          padding-left: 15px;
          border-left: 1px solid #333;
        }
      }

      .viewMore {
        text-align: center;
      }

      .children {
        padding-top: 15px;
      }
    }
    article article:nth-of-type(n + 4) {
      display: none;
    }
    article.evenDepth {
      background-color: #fff;
    }

    article.closed {
      .md,
      .links,
      .children,
      p {
        display: none;
      }
      .hideChildrenBtn::before {
        content: "[ + ]";
      }
      span {
        font-style: italic;
        opacity: 0.7;
      }
    }

    @media only screen and (min-width: 640px) {
      article {
        padding: 20px;
      }
      .info {
        text-align: left;
        h3 {
          float: left;
        }
        h5 {
          float: right;
        }
      }
    }
  }
  .hasBtns .comments > article:first-of-type {
    border-top-left-radius: 0;
  }
  // .dark {
  //   img {
  //     @include filter(invert(100%));
  //   }

  //   @include filter(invert(90%));
  // }
}
</style>
<template>
  <article :class="{ evenDepth: isEven }">
    <!-- class="{{#isEven}}evenDepth{{/isEven}} {{#lowScore}}closed{{/lowScore}}" -->

    <aside>
      <span>
        <a :href="author_link" target="_blank">
          {{ author }}
        </a>
      </span>

      <span v-show="score">
        <b>
          {{ score }}
          puntos
        </b>
      </span>

      <span v-show="permalink">
        <a :href="permalink">
          {{ subreddit }}
        </a>
      </span>

      <span>
        {{ created }}
      </span>
    </aside>

    <div v-html="body_html"></div>

    <aside class="links">
      <span>
        <a :href="thread" target="_blank">
          ver en reddit
        </a>
      </span>
    </aside>

    <div v-show="replies">
      <div v-for="reply of replies" class="children">
        <Comment :comment="reply" :isEven="!isEven" />
      </div>
    </div>
  </article>
</template>

<script>
import Comment from "@theme/components/Comment.vue";

export default {
  name: "Comment",
  components: {
    Comment,
  },
  props: {
    comment: Object,
    isEven: Boolean,
  },
  computed: {
    author() {
      const comment = this.comment;
      return (comment && comment.author) || "";
    },
    author_link() {
      const comment = this.comment;
      return (comment && comment.author_link) || "";
    },
    score() {
      const comment = this.comment;
      return (comment && comment.score) || "";
    },
    permalink() {
      const comment = this.comment;
      return (comment && comment.permalink) || "";
    },
    subreddit() {
      const comment = this.comment;
      return (comment && comment.subreddit) || "";
    },
    created() {
      const comment = this.comment;
      return (comment && comment.created) || "";
    },
    body_html() {
      const comment = this.comment;
      return (comment && comment.body_html) || "";
    },
    thread() {
      const comment = this.comment;
      return (comment && comment.thread) || "";
    },
    replies() {
      const comment = this.comment;
      return (comment && comment.replies) || "";
    },
  },
};
</script>

<style scoped lang="scss">
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
}

section {
  // @include outer-container;
  // @include animation(embeddFadeIn 500ms ease-in);
  max-width: none;
}

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

.hasBtns .comments > article:first-of-type {
  border-top-left-radius: 0;
}
// .dark {
//   img {
//     @include filter(invert(100%));
//   }

//   @include filter(invert(90%));
// }
</style>
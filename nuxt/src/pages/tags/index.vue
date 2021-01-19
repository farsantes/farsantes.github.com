<template>
  <div>
    <span v-for="tag in tags" :key="tag" style="padding: 10px">
      <v-btn outlined :to="'/tags/' + tag">{{ tag }}</v-btn>
    </span>
  </div>
</template>

<script lang="ts">
import Vue from "@/libraries/vue";
import postsStore from "@/store/posts";

export default Vue.extend({
  name: "Tags",
  computed: {
    tags: () => postsStore.tags
  },
});
</script>
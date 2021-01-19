<template>
  <div>
    <Posts />
  </div>
</template>

<script lang="ts">
import Vue from "@/libraries/vue";
import Posts from "@/components/Posts.vue";

export default Vue.extend({
  name: "Group",
  components: {
    Posts,
  },
});
</script>
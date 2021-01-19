<template>
  <div>
    <div class="intro">
      <b>Bienvenido a farsantes.github.io</b><br />
      No sabemos si una élite oculta nos domina,<br />
      pero sí que las mentiras tienen patas muy cortas.<br />
      Aquí añadimos a farsantes de la conspiración para que no pierdas el tiempo
      con ellos.

      <v-divider style="margin-top: 20px" />
    </div>

    <Posts />
  </div>
</template>

<script lang="ts">
import Vue from "@/libraries/vue";
import Posts from "@/components/Posts.vue";

export default Vue.extend({
  name: "Index",
  components: {
    Posts,
  },
});
</script>

<style scoped>
.intro {
  text-align: center;
  margin: 30px 0;
  color: grey;
}
</style>
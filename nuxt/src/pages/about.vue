<template>
  <v-container id="page--about">
    <h1>Motivación</h1>

    <p>
      Con las redes sociales y la guerra por la atención, la desinformación se
      ha conviertido en un santo grial de captar atención.
    </p>

    <p>
      Hoy cualquier investigación seria y objetiva queda eclipsada por un monton
      de teorias mucho mas locas.
    </p>

    <p>
      La época del covid-19 nos permite dejar en evidencia a esos falsos
      "portadores de la verdad", y descartarlos fácilmente del periodismo de
      investigación.
    </p>

    <h2>Donde encuentro a estas fuentes de desinformación?</h2>

    <p>
      Todas las fuentes las obtengo de las teorías que cree y comparte mi
      família en sus chats (sí, todas!).
    </p>

    <h2>Quien soy?</h2>

    <p>
      Mi nombre es Oscar Gardiazabal, Arquitecto e Ingeniero de Software. Puedes
      encontrar más sobre mí en
      <a @click="open('https://reddit.com/r/trollderiu/comments/kuf3aw/about')">
        reddit.com
      </a>
    </p>

    <h2>Código Abierto</h2>

    <p>
      Quieres saber como está hecha esta página? Realizada con Vue y Vuetify el
      código lo puedes encontrar en:
      <a
        style="display: block"
        @click="open('https://github.com/farsantes/farsantes.github.com')"
      >
        github.com/farsantes/farsantes.github.com
      </a>
    </p>
  </v-container>
</template>

<script lang="ts">
import Vue from "@/libraries/vue";
export default Vue.extend({
  name: "About",
  methods: {
    open(url: string) {
      if ("undefined" != typeof open) {
        open(url);
      }
    },
  },
});
</script>

<style>
#page--about {
  text-align: justify;
}
</style>
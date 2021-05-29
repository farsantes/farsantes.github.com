<template>
  <div>
    <v-layout class="social-icons">
      <template v-show="!native">
        <v-flex v-show="isMobile">
          <v-btn
            icon
            depressed
            v-bind="btnSize"
            style="background-color: #319ce5"
            @click="telegram()"
          >
            <v-icon color="white">mdi-telegram</v-icon>
          </v-btn>
        </v-flex>

        <v-flex v-show="isMobile">
          <v-btn
            icon
            depressed
            v-bind="btnSize"
            style="background-color: #71d568"
            @click="whatsapp()"
          >
            <v-icon color="white">mdi-whatsapp</v-icon>
          </v-btn>
        </v-flex>

        <v-flex>
          <v-btn
            icon
            depressed
            v-bind="btnSize"
            style="background-color: #1777f2"
            @click="facebook()"
          >
            <v-icon color="white">mdi-facebook</v-icon>
          </v-btn>
        </v-flex>

        <v-flex>
          <v-btn
            icon
            depressed
            v-bind="btnSize"
            style="background-color: #31a2f2"
            @click="twitter()"
          >
            <v-icon color="white">mdi-twitter</v-icon>
          </v-btn>
        </v-flex>
      </template>

      <v-flex v-show="native">
        <v-btn
          icon
          depressed
          v-bind="btnSize"
          style="background-color: darkgrey"
          @click="share()"
        >
          <v-icon small color="white">mdi-share</v-icon>
        </v-btn>
      </v-flex>
    </v-layout>
  </div>
</template>

<script lang="ts">
import _window from "@/libraries/window";
import Vue from "@/libraries/vue";

import { isMobile } from "@/assets/js/device";

import shareStore from "@/store/share";

export default Vue.extend({
  props: {
    shareData: Object,
    size: String,
  },
  data() {
    const data = {
      isMobile: isMobile(),
    };
    return data as typeof data & {};
  },
  computed: {
    navigatorShare(): boolean {
      const navigator = _window.navigator;
      return !!navigator && !!navigator.share;
    },
    native(): boolean {
      return this.navigatorShare;
    },
    btnSize(): any {
      const size = this.size || "x-large";
      return { [size]: true };
    },
    url(): string {
      const shareData = this.shareData;
      const location = _window.location;
      return (shareData && shareData.url) || (location && location.href) || "";
    },
    message(): string {
      const shareData = this.shareData;
      return (shareData && shareData.message) || "";
    },
    image(): string {
      const shareData = this.shareData;
      return (shareData && shareData.image) || "";
    },
  },
  methods: {
    share(): void {
      const url = this.url;
      const message = this.message;
      const image = this.image;

      shareStore.share(message, "", image, url);
    },
    whatsapp(): void {
      const isMobile = this.isMobile;
      const url = this.url;
      const message = this.message;

      const open = _window.open;
      open &&
        open(
          (isMobile ? "whatsapp://send" : "https://wa.me/") +
            "?text=" +
            message +
            "%20" +
            url
        );
    },
    telegram(): void {
      const url = this.url;
      const message = this.message;

      const open = _window.open;
      open &&
        open(
          "https://telegram.me/share/url?text=" + message + "&amp;url=" + url
        );
    },
    facebook(): void {
      const url = this.url;

      const open = _window.open;
      open && open("https://facebook.com/sharer/sharer.php?u=" + url);
    },
    twitter(): void {
      const url = this.url;
      const message = this.message;

      const open = _window.open;
      open &&
        open(
          "https://twitter.com/intent/tweet/?text=" +
            message +
            "&amp;url=" +
            url
        );
    },
  },
});
</script>

<style lang="scss" scoped>
.social-icons {
  // text-align: center;
  // max-width: 440px;
  margin: 10px auto;
}
.social-icons > * {
  margin-left: 10px;
}
</style>
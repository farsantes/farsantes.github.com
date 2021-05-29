<template>
  <v-bottom-sheet v-model="socialDialog.model" style="max-width: 560px">
    <v-sheet class="bottom-sheet">
      <v-container>
        <div>{{ $t("share_title") || "Share" }}:</div>

        <v-divider class="v-divider-down"></v-divider>

        <Share :shareData="shareData" />
      </v-container>
    </v-sheet>
  </v-bottom-sheet>
</template> 

<script lang="ts">
import _window from "@/libraries/window";
import Vue from "@/libraries/vue";

import Share from "@/components/Share.vue";

import shareStore from "@/store/share";

export default Vue.extend({
  name: "BottomSheetShare",
  components: {
    Share,
  },
  computed: {
    socialDialog: () => shareStore.socialDialog,
    shareData(): any {
      const socialDialog = this.socialDialog;
      return socialDialog.data;
    },
  },
});
</script>

<style lang="scss" scoped>
h2 {
  font-size: 24px;
  text-align: left;
}
.v-divider-down {
  margin: 16px 0 11px;
}
</style>
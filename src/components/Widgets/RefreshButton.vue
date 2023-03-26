<script lang="ts" setup>
import { PropType } from "vue";
import { PlaylistOverviewEnum } from "@/enums/playlistOverviewEnums";
import { useDisplay } from "vuetify/lib/framework.mjs";

const { xs } = useDisplay();

defineProps({
  refreshState: String as PropType<PlaylistOverviewEnum>,
  onRefresh: {
    type: Function,
    required: true,
  },
});
</script>

<template>
  <div :class="xs ? 'd-flex justify-center' : 'd-flex justify-center'">
    <div v-if="xs" class="d-flex justify-center refresh-button-mobile">
      <v-btn
        v-if="refreshState == PlaylistOverviewEnum.FINNISHED"
        variant="text"
        icon="mdi-refresh"
        @click="onRefresh()"
      ></v-btn>
      <div v-else>
        <v-progress-circular indeterminate size="20" width="3" color="pink"></v-progress-circular>
      </div>
    </div>
    <v-btn v-else variant="text" @click="onRefresh()">
      <v-icon v-if="refreshState == PlaylistOverviewEnum.FINNISHED" start icon="mdi-refresh" size="x-large"></v-icon>
      <v-progress-circular v-else indeterminate size="17" width="3" color="pink" class="mr-3"></v-progress-circular>
      Refresh playlists
    </v-btn>
  </div>
</template>

<style scoped>
.refresh-button-mobile {
  width: 50px;
}
</style>

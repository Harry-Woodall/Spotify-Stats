<script lang="ts" setup>
import { PlaylistOverview } from "@/interfaces/playlistCardInterfaces";
import { onMounted, PropType } from "vue";
import ImagesLoaded from "imagesloaded";
import Masonry from "masonry-layout";

const props = defineProps({
  playlistData: { type: Object as PropType<PlaylistOverview>, required: true },
});

// ImagesLoaded(`.${props.playlistData.id}-card-image`, () => {});

onMounted(() => {
  new Masonry(".card-grid", {
    columnWidth: ".playlist-card",
    fitWidth: true,
  });
});
</script>

<template>
  <v-card
    width="300"
    class="playlist-card rounded-lg ma-2"
    elevation="6"
    :to="'/playlist?id=' + props.playlistData.id"
  >
    <v-img
      :id="props.playlistData.id + '-card-image'"
      class="align-end text-white playlist-card-image"
      height="300"
      :src="props.playlistData.image"
      cover
    >
    </v-img>
    <v-col justify="space-between" align="left" class="px-3 py-3">
      <v-card-title
        class="playlist-card-title text-h4 font-weight-bold"
        max-width="100%"
        >{{ props.playlistData.title }}</v-card-title
      >
      <v-card-subtitle class="font-weight-light"
        ><span class="font-weight-bold">{{ props.playlistData.owner }}</span>
      </v-card-subtitle>
    </v-col>

    <v-card-text class="mx-3">
      <div class="font-weight-light">
        <span class="font-weight-bold">{{
          props.playlistData.trackCount
        }}</span>
        Tracks
      </div>
    </v-card-text>
  </v-card>
</template>

<style scoped>
.playlist-card-title {
  max-width: 100%;
  white-space: pre-wrap;
}
.playlist-card {
  background-color: rgba(0, 0, 0, 0.3);
}
</style>

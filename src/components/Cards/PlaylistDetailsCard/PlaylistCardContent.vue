<script lang="ts" setup>
import ProgressBar from "@/components/Widgets/progressBar.vue";
import { PlaylistData } from "@/interfaces/playlistCardInterfaces";
import { PropType } from "vue";
import ImagesLoaded from "imagesloaded";
import Masonry from "masonry-layout";

const props = defineProps({
  playlistData: { type: Object as PropType<PlaylistData>, required: true },
});

ImagesLoaded(`${props.playlistData.id}-card-image`, () => {
  new Masonry(".card-grid", {
    columnWidth: ".playlist-card",
  });
});
</script>

<template>
  <v-card width="300" class="playlist-card rounded-lg ma-2" elevation="6">
    <v-img
      :id="props.playlistData.id + '-card-image'"
      class="align-end text-white playlist-card-image"
      height="300"
      :src="props.playlistData.image"
      cover
    >
    </v-img>
    <v-col justify="space-between" align="center" class="px-3 py-3">
      <v-card-title
        class="playlist-card-title text-h4 font-weight-bold"
        max-width="100%"
        >{{ props.playlistData.title }}</v-card-title
      >
      <v-card-subtitle class="font-weight-light"
        ><span class="font-weight-bold">{{
          props.playlistData.trackCount
        }}</span>
        Tracks</v-card-subtitle
      >
    </v-col>

    <v-card-text>
      <div class="font-weight-light">
        Average Tempo:
        <span class="font-weight-bold">{{
          Math.round(props.playlistData.analysis!.tempo)
        }}</span>
      </div>

      <div class="font-weight-light">
        Average Duration:
        <span class="font-weight-bold"
          >{{
            Math.floor(props.playlistData.analysis!.duration / 1000 / 60)
          }}:{{
            (
              "0" +
              Math.round(
                ((props.playlistData.analysis!.duration / 1000 / 60) % 1) * 60
              )
            ).slice(-2)
          }}</span
        >
      </div>
    </v-card-text>
    <v-card-item>
      <ProgressBar
        :ammount="props.playlistData.analysis!.energy"
        :id="props.playlistData.title + '-energy'"
        label="Energy"
        :range="[0, 1]"
      />
      <ProgressBar
        :ammount="props.playlistData.analysis!.danceability"
        :id="props.playlistData.title + '-dancability'"
        label="Dancibility"
        :range="[0, 1]"
      />
      <ProgressBar
        :ammount="props.playlistData.analysis!.instrumentalness"
        :id="props.playlistData.title + '-vocals'"
        label="Vocals"
        :range="[1, 0]"
      />
      <ProgressBar
        :ammount="props.playlistData.analysis!.valence"
        :id="props.playlistData.title + '-happiness'"
        label="Happiness"
        :range="[0, 1]"
      />
    </v-card-item>
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

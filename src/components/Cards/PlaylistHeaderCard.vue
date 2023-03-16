<script lang="ts" setup>
import { PropType } from "vue";
import { PlaylistData } from "@/interfaces/playlistCardInterfaces";
import ProgressBar from "@/components/Widgets/progressBar.vue";
import ComponentHelper from "@/helpers/ComponentHelper";
import { useDisplay } from "vuetify/lib/framework.mjs";

const { xs } = useDisplay();

defineProps({
  playlistData: { type: Object as PropType<PlaylistData>, required: true },
});
</script>

<template>
  <v-card max-width="500px" width="100%" class="playlist-card rounded-lg ma-2" elevation="4">
    <v-img width="100%" :src="playlistData.image" cover> </v-img>
    <v-col justify="space-between" align="center" class="px-3 py-3">
      <v-card-title class="playlist-card-title text-h4 font-weight-bold" max-width="100%">{{
        playlistData.name
      }}</v-card-title>
      <v-card-subtitle class="font-weight-light text-body-1"
        ><span class="font-weight-bold">{{ playlistData.trackCount }}</span> Tracks</v-card-subtitle
      >
      <v-card-subtitle :class="xs ? 'my-3 font-italic text-h6 genre-text' : 'my-5 font-italic text-h5 genre-text'">{{
        playlistData.stats?.genreFrequency?.map((genre) => genre.name).join(" • ")
      }}</v-card-subtitle>
    </v-col>

    <v-card-text>
      <div class="font-weight-light text-h6">
        Average Tempo:
        <span class="font-weight-bold">{{ Math.round(playlistData.stats!.analysis!.tempo) }}</span>
      </div>

      <div class="font-weight-light text-h6">
        Average Duration:
        <span class="font-weight-bold">{{ ComponentHelper.convertTime(playlistData.stats!.analysis!.duration) }}</span>
      </div>
    </v-card-text>
    <v-card-item>
      <div class="mb-5">
        <ProgressBar
          :ammount="playlistData.stats!.analysis!.energy"
          :id="playlistData.name + '-energy'"
          label="Energy"
          :range="[0, 1]"
          icon="mdi-lightning-bolt"
        />
      </div>
      <div class="mb-5">
        <ProgressBar
          :ammount="playlistData.stats!.analysis!.danceability"
          :id="playlistData.name + '-dancability'"
          label="Dancibility"
          :range="[0, 1]"
          icon="mdi-human-female-dance"
        />
      </div>
      <div class="mb-5">
        <ProgressBar
          :ammount="playlistData.stats!.analysis!.instrumentalness"
          :id="playlistData.name + '-vocals'"
          label="Vocals"
          :range="[1, 0]"
          icon="mdi-microphone"
        />
      </div>
      <div class="mb-5">
        <ProgressBar
          :ammount="playlistData.stats!.analysis!.valence"
          :id="playlistData.name + '-happiness'"
          label="Positivity"
          :range="[0, 1]"
          icon="mdi-emoticon-happy"
        />
      </div>
    </v-card-item>
  </v-card>
</template>

<style scoped>
.playlist-card-title,
.genre-text {
  max-width: 100%;
  overflow: visible;
  white-space: pre-wrap;
}
.playlist-card {
  background-color: rgba(0, 0, 0, 0.3);
}
</style>

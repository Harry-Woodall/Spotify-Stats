<script lang="ts" setup>
import ProgressBar from "../Widgets/progressBar.vue";
import { useDisplay } from "vuetify/lib/framework.mjs";
import { TrackData } from "@/interfaces/trackInterfaces";
import { PropType } from "vue";
import { useRouter } from "vue-router";

const { xs } = useDisplay();

defineProps({
  closeDialog: Function,
  trackData: Object as PropType<TrackData>,
  linkToPlaylist: {
    type: Function,
    required: true,
  },
});

const formatArtists = (artists: string[]): string | null => {
  return artists.join(", ");
};

const baseColor = [255, 23, 170];
</script>

<template>
  <v-card class="pa-1">
    <v-btn
      icon="mdi-close"
      size="small"
      variant="text"
      position="absolute"
      location="top right"
      @click="closeDialog"
    ></v-btn>
    <v-card-item>
      <div v-if="trackData?.playlistName" class="text-overline playlist-title">{{ trackData?.playlistName }}</div>
    </v-card-item>
    <div class="d-flex justify-center mb-5">
      <v-avatar :size="xs ? 200 : 300" :rounded="0">
        <v-img :src="trackData?.image"></v-img>
      </v-avatar>
    </div>
    <div>
      <v-card-title :class="xs ? 'pb-0 pt-0 text-h5' : 'pb-0 pt-0 text-h4'">{{ trackData?.trackName }}</v-card-title>
      <v-card-subtitle v-if="trackData?.trackArtists" class="">{{
        formatArtists(trackData?.trackArtists)
      }}</v-card-subtitle>
      <v-card-text :class="xs ? 'text-h6 pb-1' : 'font-weight-bold text-h6'">{{
        trackData?.trackReleaseDate
      }}</v-card-text>
    </div>
    <v-card-item v-if="trackData?.analysis" class="mb-2">
      <div class="mb-3">
        <ProgressBar
          :ammount="trackData!.analysis!.energy"
          :id="'-energy'"
          label="Energy"
          :range="[0, 1]"
          icon="mdi-lightning-bolt"
          :condensed="xs"
          :colors="baseColor"
        />
      </div>
      <div class="mb-3">
        <ProgressBar
          :ammount="trackData!.analysis!.danceability"
          :id="'-danceability'"
          label="Danceability"
          :range="[0, 1]"
          icon="mdi-human-female-dance"
          :condensed="xs"
          :colors="baseColor"
        />
      </div>
      <div class="mb-3">
        <ProgressBar
          :ammount="trackData!.analysis!.vocals"
          :id="'-vocals'"
          label="Vocals"
          :range="[1, 0]"
          icon="mdi-microphone"
          :condensed="xs"
          :colors="baseColor"
        />
      </div>
      <div class="mb-3">
        <ProgressBar
          :ammount="trackData!.analysis!.positivity"
          :id="'-happiness'"
          label="Positivity"
          :range="[0, 1]"
          icon="mdi-emoticon-happy"
          :condensed="xs"
          :colors="baseColor"
        />
      </div>
    </v-card-item>
    <v-card-actions v-if="trackData?.playlistId" class="d-flex justify-center">
      <v-btn @click="() => linkToPlaylist(trackData?.playlistId)" variant="tonal" class="mb-2"
        >Full playlist details</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<style scoped>
.playlist-title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>

<script lang="ts" setup>
import ProgressBar from "@/components/Widgets/progressBar.vue";

const props = defineProps({
  title: String,
  image: String,
  trackCount: Number,
  analysis: Object,
});
</script>

<template>
  <v-card max-width="400" class="playlist-card rounded-lg" elevation="6">
    <v-img
      class="align-end text-white"
      height="200"
      src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
      cover
    >
    </v-img>
    <v-row justify="space-between" align="center" class="px-3 py-3">
      <v-card-title
        class="playlist-card-title text-h4 font-weight-bold"
        max-width="100%"
        >{{ title }}</v-card-title
      >
      <v-card-subtitle>{{ trackCount }} Tracks</v-card-subtitle>
    </v-row>

    <v-card-text>
      <div>Average Tempo: {{ Math.round(analysis!.tempo) }}</div>

      <div>
        Average Duration: {{ Math.floor(analysis!.duration / 1000 / 60) }}:{{
          ("0" + Math.round(((analysis!.duration / 1000 / 60) % 1) * 60)).slice(
            -2
          )
        }}
      </div>
    </v-card-text>
    <v-card-item>
      <ProgressBar
        :ammount="analysis!.energy"
        :id="title + '-energy'"
        label="Energy"
        :range="[0, 1]"
      />
      <ProgressBar
        :ammount="analysis!.danceability"
        :id="title + '-dancability'"
        label="Dancibility"
        :range="[0, 1]"
      />
      <ProgressBar
        :ammount="analysis!.instrumentalness"
        :id="title + '-vocals'"
        label="Vocals"
        :range="[1, 0]"
      />
      <ProgressBar
        :ammount="analysis!.valence"
        :id="title + '-happiness'"
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

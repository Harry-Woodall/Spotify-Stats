<script lang="ts" setup>
import { PropType } from "vue";
import { PlaylistData } from "@/interfaces/playlistCardInterfaces";
import TrackCard from "@/components/Cards/Tracks/TrackMainCard.vue";

const props = defineProps({
  playlistData: { type: Object as PropType<PlaylistData>, required: true },
});
</script>

<template>
  <div class="d-flex flex-row flex-wrap justify-space-evenly details-container">
    <TrackCard
      title="Biggest Energy"
      :track="playlistData.stats?.highestEnergy?.name"
      :artist="playlistData.stats?.highestEnergy?.artists"
      :value="playlistData.stats?.highestEnergy!.energy.toString()"
      :image="playlistData.stats?.highestEnergy?.image.url"
      statColor="#db4fe0"
    />
    <TrackCard
      title="Highest Danceability"
      :track="playlistData.stats?.highestDanceability?.name"
      :artist="playlistData.stats?.highestDanceability?.artists"
      :value="playlistData.stats?.highestDanceability!.danceability.toString()"
      :image="playlistData.stats?.highestDanceability?.image.url"
      statColor="#db4fe0"
    />
    <TrackCard
      title="Most Positive"
      :track="playlistData.stats?.highestValence?.name"
      :artist="playlistData.stats?.highestValence?.artists"
      :value="playlistData.stats?.highestValence!.valence.toString()"
      :image="playlistData.stats?.highestValence?.image.url"
      statColor="#db4fe0"
    />
  </div>
</template>

<style scoped>
.details-container {
  width: 100%;
  max-width: 1200px;
  gap: 25px;
}
</style>

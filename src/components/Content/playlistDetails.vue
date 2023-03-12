<script lang="ts" setup>
import { PropType } from "vue";
import { PlaylistData } from "@/interfaces/playlistCardInterfaces";
import TrackCard from "@/components/Cards/TrackCard.vue";

const props = defineProps({
  playlistData: { type: Object as PropType<PlaylistData>, required: true },
});
</script>

<template>
  <div class="d-flex flex-row flex-wrap justify-space-evenly details-container">
    <!-- <TrackCard
      title="Longest Track"
      :track="playlistData.longestTrack?.name"
      :artist="playlistData.longestTrack?.artists"
      :value="ComponentHelper.convertTime(playlistData.longestTrack!.duration_ms!)"
      :image="playlistData.longestTrack?.image.url"
    />
    <TrackCard
      title="Shortest Track"
      :track="playlistData.shortestTrack?.name"
      :artist="playlistData.shortestTrack?.artists"
      :value="ComponentHelper.convertTime(playlistData.shortestTrack!.duration_ms!)"
      :image="playlistData.shortestTrack?.image.url"
    /> -->
    <TrackCard
      title="Biggest Energy"
      :is-numeric="true"
      :track="playlistData.highestEnergy?.name"
      :artist="playlistData.highestEnergy?.artists"
      :value="playlistData.highestEnergy!.energy.toString()"
      :image="playlistData.highestEnergy?.image.url"
    />
    <TrackCard
      title="Highest Danceability"
      :is-numeric="true"
      :track="playlistData.highestDanceability?.name"
      :artist="playlistData.highestDanceability?.artists"
      :value="playlistData.highestDanceability!.danceability.toString()"
      :image="playlistData.highestDanceability?.image.url"
    />
    <TrackCard
      title="Most Positive"
      :is-numeric="true"
      :track="playlistData.highestValence?.name"
      :artist="playlistData.highestValence?.artists"
      :value="playlistData.highestValence!.valence.toString()"
      :image="playlistData.highestValence?.image.url"
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

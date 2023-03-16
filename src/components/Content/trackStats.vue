<script lang="ts" setup>
import { PropType } from "vue";
import { PlaylistData } from "@/interfaces/playlistCardInterfaces";
import TrackCard from "@/components/Cards/Tracks/TrackDetailsCard.vue";
import ComponentHelper from "@/helpers/ComponentHelper";
import { useDisplay } from "vuetify/lib/framework.mjs";

const { xs } = useDisplay();

const props = defineProps({
  playlistData: { type: Array as PropType<PlaylistData>, required: true },
});

const baseHeaderClass = "font-weight-light ";
const headerClasses = [baseHeaderClass + "mt-8", baseHeaderClass + "mt-15 text-h4"];
</script>

<template>
  <div style="width: 100%" class="d-flex flex-row flex-wrap justify-center details-container mt-10">
    <h2 :class="xs ? headerClasses[0] : headerClasses[1]">Track Duration</h2>
    <TrackCard
      v-if="playlistData.stats?.longestTrack"
      title="Longest track"
      :track="playlistData.stats?.longestTrack?.name"
      :artist="playlistData.stats?.longestTrack?.artists"
      :value="ComponentHelper.convertTime(playlistData.stats!.longestTrack!.duration_ms)"
      :hasBorder="true"
    />
    <TrackCard
      v-if="playlistData.stats?.shortestTrack"
      title="Shortest track"
      :track="playlistData.stats?.shortestTrack?.name"
      :artist="playlistData.stats?.shortestTrack?.artists"
      :value="ComponentHelper.convertTime(playlistData.stats!.shortestTrack!.duration_ms)"
    />
    <h2
      v-if="playlistData.stats?.earliestTrack && playlistData.stats?.latestTrack"
      :class="xs ? headerClasses[0] : headerClasses[1]"
    >
      Playlist activity
    </h2>
    <TrackCard
      v-if="playlistData.stats?.earliestTrack"
      title="Earliest added"
      :track="playlistData.stats?.earliestTrack?.name"
      :artist="playlistData.stats?.earliestTrack?.artists"
      :value="new Date(playlistData.stats!.earliestTrack!.addedAt).toLocaleDateString(undefined, {day: 'numeric', month: 'numeric', year: '2-digit'})"
      :hasBorder="true"
    />
    <TrackCard
      v-if="playlistData.stats?.latestTrack"
      title="Latest added"
      :track="playlistData.stats?.latestTrack?.name"
      :artist="playlistData.stats?.latestTrack?.artists"
      :value="new Date(playlistData.stats!.latestTrack!.addedAt).toLocaleDateString(undefined, {day: 'numeric', month: 'numeric', year: '2-digit'})"
    />
    <h2 :class="xs ? headerClasses[0] : headerClasses[1]">Track stats</h2>
    <TrackCard
      v-if="playlistData.stats?.oldestTrack"
      title="Earliest release"
      :track="playlistData.stats?.oldestTrack?.name"
      :artist="playlistData.stats?.oldestTrack?.artists"
      :value="new Date(playlistData.stats!.oldestTrack!.releaseDate).toLocaleDateString(undefined, {year: 'numeric'})"
      :hasBorder="true"
    />
    <TrackCard
      v-if="playlistData.stats?.newestTrack"
      title="Lastest release"
      :track="playlistData.stats?.newestTrack?.name"
      :artist="playlistData.stats?.newestTrack?.artists"
      :value="new Date(playlistData.stats!.newestTrack!.releaseDate).toLocaleDateString(undefined, {year: 'numeric'})"
      :hasBorder="true"
    />
    <TrackCard
      v-if="playlistData.stats?.lowestEnergy"
      title="Lowest energy"
      :track="playlistData.stats?.lowestEnergy?.name"
      :artist="playlistData.stats?.lowestEnergy?.artists"
      :value="Math.round(playlistData.stats!.lowestEnergy!.energy * 100).toString() + '%'"
      :hasBorder="true"
    />
    <TrackCard
      v-if="playlistData.stats?.lowestValence"
      title="Most negative"
      :track="playlistData.stats?.lowestValence?.name"
      :artist="playlistData.stats?.lowestValence?.artists"
      :value="Math.round(playlistData.stats!.lowestValence!.valence * 100).toString() + '%'"
      :hasBorder="true"
    />
    <TrackCard
      v-if="playlistData.stats?.lowestDanceability"
      title="Least danceabile"
      :track="playlistData.stats?.lowestDanceability?.name"
      :artist="playlistData.stats?.lowestDanceability?.artists"
      :value="Math.round(playlistData.stats!.lowestDanceability!.danceability * 100).toString() + '%'"
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

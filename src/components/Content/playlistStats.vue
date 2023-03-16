<script lang="ts" setup>
import { PropType } from "vue";
import { PlaylistData } from "@/interfaces/playlistCardInterfaces";
import TrackCard from "@/components/Cards/Tracks/TrackDetailsCard.vue";
import ComponentHelper from "@/helpers/ComponentHelper";
import { useDisplay } from "vuetify/lib/framework.mjs";
import PlaylistStatCard from "../Cards/PlaylistStatCard.vue";

const { xs } = useDisplay();

const props = defineProps({
  playlistData: { type: Array as PropType<PlaylistData>, required: true },
});

const baseHeaderClass = "font-weight-light ";
const headerClasses = [baseHeaderClass + "mt-8", baseHeaderClass + "mt-15 text-h4"];
</script>

<template>
  <div style="width: 100%" class="d-flex flex-row flex-wrap justify-center details-container mt-10">
    <h2 :class="xs ? headerClasses[0] : headerClasses[1]">Playlist stats</h2>
    <PlaylistStatCard
      title="Unique artists"
      :value="playlistData.stats?.artistFrequency?.length.toString()"
      :hasBorder="true"
    />
    <PlaylistStatCard
      title="Unique albums"
      :value="playlistData.stats?.albumFrequency?.length.toString()"
      :hasBorder="true"
    />
    <PlaylistStatCard
      title="Most common artist"
      :value="playlistData.stats?.artistFrequency?.at(0)?.artist.name"
      :text="'with ' + playlistData.stats?.artistFrequency?.at(0)?.frequency + ' tracks'"
      :hasBorder="true"
    />
    <PlaylistStatCard
      title="Most common album"
      :value="
        playlistData.stats?.albumFrequency?.at(0)?.name +
        ' by ' +
        playlistData.stats?.albumFrequency?.at(0)?.artists.join(', ')
      "
      :text="'with ' + playlistData.stats?.albumFrequency?.at(0)?.frequency + ' tracks'"
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

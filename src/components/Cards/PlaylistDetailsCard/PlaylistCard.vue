<script lang="ts" setup>
import ProgressBar from "@/components/Widgets/progressBar.vue";
import AnimatedPlaceholder from "@/components/Support/AnimatedPlaceholder.vue";
import PlaceholderPlaylistCard from "./PlaceholderPlaylistCard.vue";
import { onMounted, reactive } from "vue";
import Api from "@/lib/api";
import PlaylistCardContent from "./PlaylistCardContent.vue";
import { PlaylistData } from "@/interfaces/playlistCardInterfaces";

const props = defineProps({
  playlistId: {
    type: String,
    required: true,
  },
});

const playlistData = reactive<PlaylistData>({});

onMounted(async () => {
  const response = await Api.getPlaylistData(props.playlistId);

  playlistData.title = response.name;
  playlistData.image = response.images[0].url;
  playlistData.trackCount = response.trackCount;
  playlistData.analysis = response.analysis;
});
</script>

<template>
  <div v-if="playlistData.title != undefined">
    <PlaylistCardContent :playlistData="playlistData" />
  </div>
  <div v-else>
    <PlaceholderPlaylistCard />
  </div>
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

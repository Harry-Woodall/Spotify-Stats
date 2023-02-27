<script lang="ts" setup>
import { onMounted, reactive } from "vue";
import Api from "@/lib/api";
import PlaceholderPlaylistOverviewCard from "@/components/Cards/PlaylistOverviewCard/PlaceholderPlaylistOverviewCard.vue";
import PlaylistOverviewCardContent from "@/components/Cards/PlaylistOverviewCard/PlaylistOverviewCardContent.vue";
import { PlaylistOverview } from "@/interfaces/playlistCardInterfaces";

const props = defineProps({
  playlistId: {
    type: String,
    required: true,
  },
});

const testButton = () => {
  console.log("Click");
};

const playlistData = reactive<PlaylistOverview>({});

onMounted(async () => {
  const response = await Api.getPlaylistOverview(props.playlistId);
  console.log(response);

  playlistData.id = props.playlistId;
  playlistData.title = response.name;
  playlistData.image = response.images[0].url;
  playlistData.trackCount = response.trackCount;
  playlistData.owner = response.owner;
});
</script>

<template>
  <div v-if="playlistData.title != undefined">
    <PlaylistOverviewCardContent :playlistData="playlistData" />
  </div>
  <div v-else>
    <PlaceholderPlaylistOverviewCard />
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
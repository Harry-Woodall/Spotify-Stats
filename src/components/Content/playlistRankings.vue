<script lang="ts" setup>
import ArtistCard from "@/components/Cards/ArtistCard.vue";
import { PlaylistData } from "@/interfaces/playlistCardInterfaces";
import { PropType, onMounted } from "vue";
import { useDisplay } from "vuetify/lib/framework.mjs";

const { xs } = useDisplay();

const props = defineProps({
  playlistData: { type: Object as PropType<PlaylistData>, required: true },
});

onMounted(() => {
  console.log(props.playlistData.stats?.earliestTrack);
});

const baseHeaderClass = "font-weight-light mb-5 ";
const headerClasses = [baseHeaderClass + "mt-8", baseHeaderClass + "mt-5 text-h4"];
</script>

<template>
  <div class="d-flex flex-wrap my-10 justify-space-around artist-cards-container">
    <h2 :class="xs ? headerClasses[0] : headerClasses[1]">Common artists</h2>
    <ArtistCard v-for="(item, index) in playlistData.stats!.artistFrequency!.slice(0, 5)" :Artist="item" :key="index" />
  </div>
</template>

<style scoped>
.artist-cards-container {
  gap: 15px;
  max-width: 800px;
}
</style>

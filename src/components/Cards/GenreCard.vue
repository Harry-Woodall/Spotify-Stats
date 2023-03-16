<script lang="ts" setup>
// import { PropType } from "vue";
// import { PlaylistData } from "@/interfaces/playlistCardInterfaces";

// defineProps({
//   playlistData: { type: Object as PropType<PlaylistData>, required: true },
// });
</script>

<template>
  <v-card class="d-flex align-center genre-card" width="100%" height="70px" rounded="xl">
    <v-card-title class="text-h5"> Genre </v-card-title>
  </v-card>
</template>

<style scoped>
.genre-card {
  background-color: rgba(0, 0, 0, 0.3);
}
</style>

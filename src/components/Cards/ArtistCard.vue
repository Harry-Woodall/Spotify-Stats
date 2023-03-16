<script lang="ts" setup>
import { ArtistFrequencyObject } from "@/interfaces/playlistCardInterfaces";
import { PropType } from "vue";
import { useDisplay } from "vuetify/lib/framework.mjs";

const { xs } = useDisplay();

defineProps({
  Artist: { type: Object as PropType<ArtistFrequencyObject>, required: true },
});
</script>

<template>
  <v-card class="d-flex align-center justify-center artist-card" rounded="xl" width="100%">
    <v-avatar class="ma-2" :size="xs ? '64' : '128'">
      <v-img v-if="!xs && Artist.artist.largeImage" :src="Artist.artist.largeImage"></v-img>
      <v-img v-else :src="Artist.artist.smallImage"></v-img>
    </v-avatar>
    <v-card-subtitle :class="xs ? 'text-h6 artist-card-text ml-10' : 'text-h4 artist-card-text ml-15'">{{
      Artist.artist.name
    }}</v-card-subtitle>
  </v-card>
</template>

<style scoped>
.artist-card {
  background-color: rgba(0, 0, 0, 0.3);
}

.artist-card-text {
  white-space: pre-wrap;
  flex: auto;
  line-height: normal;
}
</style>

<script lang="ts" setup>
import AnimatedPlaceholder from "@/components/Support/AnimatedPlaceholder.vue";
import Masonry from "masonry-layout";
import { onMounted } from "vue";

onMounted(() => {
  new Masonry(".card-grid", {
    columnWidth: ".playlist-card",
    fitWidth: true,
  });
});
</script>

<template>
  <v-card width="300" class="playlist-card rounded-lg ma-2" elevation="6">
    <AnimatedPlaceholder width="100%" height="200px" borderRadius="0" />

    <div class="px-3 py-3">
      <AnimatedPlaceholder width="100%" height="30px" borderRadius="5px" />
    </div>

    <div class="py-2">
      <div class="px-3 py-1">
        <AnimatedPlaceholder width="150px" height="20px" borderRadius="5px" />
      </div>
    </div>
    <v-card-item>
      <div class="py-1">
        <AnimatedPlaceholder width="100px" height="10px" borderRadius="5px" />
      </div>
      <div class="py-1">
        <AnimatedPlaceholder width="100%" height="10px" borderRadius="5px" />
      </div>
      <div class="py-1">
        <AnimatedPlaceholder width="100px" height="10px" borderRadius="5px" />
      </div>
      <div class="py-1">
        <AnimatedPlaceholder width="100%" height="10px" borderRadius="5px" />
      </div>
      <div class="py-1">
        <AnimatedPlaceholder width="100px" height="10px" borderRadius="5px" />
      </div>
      <div class="py-1">
        <AnimatedPlaceholder width="100%" height="10px" borderRadius="5px" />
      </div>
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

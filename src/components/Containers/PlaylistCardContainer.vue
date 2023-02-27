<script lang="ts" setup>
import PlaylistOverviewCard from "@/components/Cards/PlaylistOverviewCard/PlaylistOverviewCard.vue";
import { PropType } from "vue";

const props = defineProps({
  itemCount: Number,
  returnedItemCount: Number,
  items: Array as PropType<string[]>,
});
</script>

<template>
  <div class="card-grid">
    <div v-for="(item, index) in props.items" :key="index">
      <PlaylistOverviewCard :playlistId="item" />
    </div>
  </div>
</template>

<style scoped>
.card-grid {
  margin: 0 auto;
}
</style>

<script lang="ts" setup>
import { DataObject } from "@/interfaces/playlistCardInterfaces";
import { onMounted, PropType, reactive } from "vue";
import { useDisplay } from "vuetify/lib/framework.mjs";

const { xs } = useDisplay();

const props = defineProps({
  title: String,
  text: String,
  value: String,
  hasBorder: Boolean,
});

const mobileValueClass = () => {
  if (props.value && props.value?.length < 7) return "text-end text-h6 font-weight-bold card-value pa-0";
  if (props.value && props.value?.length < 20) return "text-end text-body-1 font-weight-bold card-value pa-0";
  return "text-end text-body-2 font-weight-bold card-value pa-0";
};
</script>

<template>
  <v-card
    elevation="0"
    :class="xs ? 'pb-3 ' + (hasBorder ? 'details-card' : '') : 'mx-15 pb-3 ' + (hasBorder ? 'details-card' : '')"
    width="100%"
    :rounded="0"
  >
    <div class="d-flex align-center justify-space-between playlist-stat-card-container">
      <v-card-title :class="xs ? 'text-h5 pa-0 playlist-stat-card-title' : 'text-h4 pa-1 playlist-stat-card-title'">{{
        title
      }}</v-card-title>
      <v-card-text :class="xs ? mobileValueClass() : 'text-end text-h4 font-weight-bold card-value pa-0'">
        {{ value }}
      </v-card-text>
    </div>
    <div class="ml-3 mt-1" v-if="text">
      <v-card-subtitle :class="xs ? 'pa-0 pr-2 text-body-2 track-name' : 'pa-0 text-body-1 '">{{
        text
      }}</v-card-subtitle>
    </div>
  </v-card>
</template>

<style scoped>
.track-card-container {
  width: 100%;
}

.playlist-stat-card-container {
  gap: 5px;
}

.playlist-stat-card-title {
  flex: 1 1 auto;
  hyphens: none;
}

.card-value {
  color: #bb86fc !important;
  flex: 1 2 auto;
  line-height: normal;
}

.details-card {
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  margin: 0;
}

.numeric-card-value h2 {
  text-align: center;
}

.track-name,
.track-artist {
  line-height: 1rem;
}

.v-card-title {
  white-space: break-spaces;
}

.v-card-subtitle {
  white-space: pre-wrap;
}
</style>

<script lang="ts" setup>
import { onMounted } from "vue";
import Api from "@/lib/api";

const props = defineProps({
  drawVisible: {
    type: Object,
    required: true,
  },
  updateDrawState: {
    type: Function,
    required: true,
  },
});

const test = (val: boolean) => {
  props.updateDrawState(val);
};
</script>

<template>
  <v-navigation-drawer
    color="rgba(0,0,0,0.4)"
    elevation="8"
    border="false"
    order="-1"
    :floating="true"
    :model-value="drawVisible.value"
    @update:model-value="test"
  >
    <v-list>
      <v-list-item prepend-avatar="https://randomuser.me/api/portraits/men/1.jpg" title="[[USERNAME]]"></v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list density="compact" nav>
      <v-list-item prepend-icon="mdi-album" title="Favourite Tracks" value="tracks"></v-list-item>
      <v-list-item prepend-icon="mdi-account-music" title="Favourite Artists" value="artists"></v-list-item>
      <v-list-item prepend-icon="mdi-playlist-music" title="Playlist Breakdown" value="playlist"></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts" setup>
defineProps({
  toggleVisibility: {
    type: Function,
    required: true,
  },
});
</script>

<template>
  <v-app-bar flat>
    <v-app-bar-title>
      <v-btn
        variant="text"
        height="40px"
        size="small"
        @click="toggleVisibility"
      >
        <v-icon icon="mdi-arrow-left" size="x-large" />
        <p class="mx-2">Back to playlists</p>
      </v-btn>
    </v-app-bar-title>
  </v-app-bar>
</template>

<style scoped>
.v-icon {
  /* font-size: 2rem; */
}
</style>

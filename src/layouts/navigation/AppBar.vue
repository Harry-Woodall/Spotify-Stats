<script lang="ts" setup>
import { useRouter } from "vue-router";
import { useDisplay } from "vuetify/lib/framework.mjs";

const router = useRouter();
const { xs } = useDisplay();

defineProps({
  toggleVisibility: {
    type: Function,
    required: true,
  },
});
</script>

<template>
  <v-app-bar flat :class="xs ? 'app-bar-mobile' : ''">
    <v-app-bar-title>
      <v-btn variant="text" height="40px" size="small" @click="router.back()">
        <v-icon icon="mdi-arrow-left" size="x-large" />
        <p class="mx-2">Back to playlists</p>
      </v-btn>
    </v-app-bar-title>
  </v-app-bar>
</template>

<style scoped>
.app-bar-mobile {
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.75), rgba(255, 255, 255, 0)) !important;
}
</style>

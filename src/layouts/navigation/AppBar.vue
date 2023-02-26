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
        class="d-xs-flex d-sm-flex d-md-flex d-lg-none d-xl-none"
        variant="tonal"
        minWidth="40px"
        height="40px"
        @click="toggleVisibility"
      >
        <v-icon icon="mdi-menu" size="x-large" />
      </v-btn>
    </v-app-bar-title>
  </v-app-bar>
</template>

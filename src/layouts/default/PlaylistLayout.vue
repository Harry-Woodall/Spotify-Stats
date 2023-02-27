<template>
  <v-app>
    <AppBar :toggle-visibility="toggleVisibility" />
    <default-view />
  </v-app>
</template>

<script lang="ts" setup>
import { reactive } from "vue";

import DefaultView from "./View.vue";
import AppBar from "@/layouts/navigation/AppBar.vue";

const drawVisible = reactive({ value: false });

const toggleVisibility = () => {
  drawVisible.value = true;
};
</script>

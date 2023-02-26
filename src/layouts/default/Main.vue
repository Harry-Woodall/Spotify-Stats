<template>
  <v-app>
    <navigation-draw
      :draw-visible="drawVisible"
      :update-draw-state="updateVisibility"
    />
    <app-bar :toggle-visibility="toggleVisibility" />
    <default-view />
  </v-app>
</template>

<script lang="ts" setup>
import { reactive } from "vue";

import DefaultView from "./View.vue";
import AppBar from "../navigation/AppBar.vue";
import NavigationDraw from "../navigation/NavigationDraw.vue";

const drawVisible = reactive({ value: false });

const updateVisibility = (val: boolean) => {
  console.log("Value: ", val);
  drawVisible.value = val;
};

const toggleVisibility = () => {
  drawVisible.value = true;
};
</script>

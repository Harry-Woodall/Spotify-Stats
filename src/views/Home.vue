<script lang="ts" setup>
import Home from "@/components/PageComponents/HomeComponent.vue";
import { ref } from "vue";

const showLoading = ref<boolean>(false);

const toggleLoading = (value: boolean) => {
  showLoading.value = value;
};
</script>

<template>
  <v-progress-linear
    absolute
    :active="showLoading"
    :indeterminate="showLoading"
    color="pink"
    class="loading-bar"
  ></v-progress-linear>
  <Home @is-validating="toggleLoading" />
</template>

<style scoped>
.loading-bar {
  position: absolute;
}
</style>

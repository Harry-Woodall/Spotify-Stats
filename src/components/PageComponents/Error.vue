<script lang="ts" setup>
import StorageHelpers from "@/helpers/StorageHelper";
import { useRouter } from "vue-router";

const router = useRouter();

const backToLogin = () => {
  router.removeRoute(router.currentRoute.value.name!);
  StorageHelpers.DestroyLocalStorage();
  router.push("/");
};
</script>

<template>
  <v-container class="fill-height">
    <v-responsive class="d-flex align-center justify-center text-center fill-height">
      <v-sheet elevation="4" color="rgba(0,0,0,0.25)" rounded="xl" class="pa-10 text-center mx-auto" max-width="500">
        <h1 class="text-h4 font-weight-bold hidden-sm-and-down">Error</h1>
        <h1 class="text-h5 font-weight-bold hidden-md-and-up">Error</h1>

        <p class="text-h3 font-weight-bold mt-10">{{ router.currentRoute.value.query.status }}</p>
        <p class="text-overline font-weight-bold">{{ router.currentRoute.value.query.message }}</p>

        <v-btn variant="tonal" class="mt-10" @click="backToLogin">Back to login</v-btn>
      </v-sheet>
    </v-responsive>
  </v-container>
</template>

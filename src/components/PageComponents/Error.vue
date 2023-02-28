<script lang="ts" setup>
import { useRouter } from "vue-router";

const router = useRouter();
</script>

<template>
  <v-container class="fill-height">
    <v-responsive class="d-flex align-center justify-center text-center fill-height">
      <v-sheet elevation="4" color="rgba(0,0,0,0.25)" :rounded="'xl'" class="py-10 text-center mx-auto" max-width="500">
        <h1 class="text-h2 font-weight-bold hidden-sm-and-down">Error</h1>
        <h1 class="text-h3 font-weight-bold hidden-md-and-up">Error</h1>

        <h2 class="text-h4">Something went wrong</h2>

        <p class="text-body-1 font-weight-bold mt-10">{{ router.currentRoute.value.query.status }}</p>
        <p class="text-overline font-weight-bold">{{ router.currentRoute.value.query.message }}</p>
      </v-sheet>
    </v-responsive>
  </v-container>
</template>

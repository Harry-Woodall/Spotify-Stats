<script lang="ts" setup>
import StorageHelpers from "@/helpers/StorageHelper";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useDisplay } from "vuetify/lib/framework.mjs";
import RateLimit from "../Errors/Content/RateLimit.vue";
import Unauthorized from "../Errors/Content/Unauthorized.vue";

const router = useRouter();
const { xs } = useDisplay();

const backToLogin = () => {
  router.removeRoute(router.currentRoute.value.name!);
  StorageHelpers.DestroyLocalStorage();
  router.push("/");
};

const backToPreviousPage = () => {
  router.removeRoute(router.currentRoute.value.name!);
  router.back();
};

onMounted(() => {
  console.log("sdasd");
});
</script>

<template>
  <v-container class="fill-height">
    <v-responsive class="d-flex align-center justify-center text-center fill-height">
      <v-sheet elevation="4" color="rgba(0,0,0,0.25)" rounded="xl" class="pa-10 text-center mx-auto" max-width="500">
        <h1 :class="xs ? 'text-h6' : 'text-h4'">Error</h1>

        <!-- <p class="text-h3 font-weight-bold mt-10">{{ router.currentRoute.value.query.status }}</p> -->
        <p :class="xs ? 'text-h4 font-weight-bold mt-5' : 'text-h3 font-weight-bold mt-5'">
          {{ router.currentRoute.value.query.message }}
        </p>

        <Unauthorized v-if="router.currentRoute.value.query.status == '403'" />
        <RateLimit v-if="router.currentRoute.value.query.status == '429'" />

        <v-btn
          v-if="router.currentRoute.value.query.status != '429'"
          variant="tonal"
          class="mt-10"
          @click="backToLogin"
        >
          Back to login
        </v-btn>
        <v-btn v-else variant="tonal" class="mt-10" @click="backToPreviousPage">Try again</v-btn>
      </v-sheet>
    </v-responsive>
  </v-container>
</template>

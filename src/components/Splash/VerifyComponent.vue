<script lang="ts" setup>
import Api from "../../lib/api";
import AppSettings from "../../config/appsettings";
import { onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

onMounted(async () => {
  const res = await Api.verifyToken();

  if (res) router.push("/home");
});
</script>

<template>
  <v-container class="fill-height">
    <v-responsive
      class="d-flex align-center justify-center text-center fill-height"
    >
      <v-sheet
        elevation="4"
        color="rgba(0,0,0,0.25)"
        :rounded="'xl'"
        class="py-10 text-center mx-auto"
        max-width="500"
      >
        <p class="text-body-2 font-weight-light mb-1">Welcome to</p>

        <h1 class="text-h2 font-weight-bold hidden-sm-and-down">
          Playlist breakdown
        </h1>
        <h1 class="text-h3 font-weight-bold hidden-md-and-up">
          Playlist breakdown
        </h1>

        <div class="py-5" />

        <v-row class="d-flex align-center justify-center">
          <v-col>
            <h2 class="text-h5 font-weight-light mb-5">
              Verifying Spotify Login
            </h2>
            <v-progress-circular
              indeterminate
              size="large"
            ></v-progress-circular>
          </v-col>
        </v-row>
      </v-sheet>
    </v-responsive>
  </v-container>
</template>

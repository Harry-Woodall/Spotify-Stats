<script lang="ts" setup>
import Api from "@/lib/api";
import AppSettings from "@/config/appsettings";
import { onMounted, onBeforeMount, ref } from "vue";
import { useRouter } from "vue-router";
import StorageHelpers from "@/helpers/StorageHelper";
import LoginEnum from "@/enums/LoginEnum";

const router = useRouter();

let currentState = ref(LoginEnum.CHECKING_TOKEN);

onBeforeMount(async () => {
  if (!StorageHelpers.TokenExists()) {
    currentState.value = LoginEnum.INVALID_TOKEN;
    return;
  }

  currentState.value = LoginEnum.CHECKING_TOKEN;

  try {
    const isValid = await Api.verifyToken();

    currentState.value = isValid ? LoginEnum.VALID_TOKEN : LoginEnum.INVALID_TOKEN;

    if (isValid) {
      router.push("/home");
      return;
    }

    StorageHelpers.DestroyLocalStorage();
  } catch (error) {
    currentState.value = LoginEnum.INVALID_TOKEN;
    StorageHelpers.DestroyLocalStorage();
  }
});
</script>

<template>
  <v-container class="fill-height">
    <v-responsive class="d-flex align-center justify-center text-center fill-height">
      <v-sheet elevation="4" color="rgba(0,0,0,0.25)" :rounded="'xl'" class="py-10 text-center mx-auto" max-width="500">
        <p class="text-body-2 font-weight-light mb-1">Welcome to</p>

        <h1 class="text-h2 font-weight-bold hidden-sm-and-down">Playlist breakdown</h1>
        <h1 class="text-h3 font-weight-bold hidden-md-and-up">Playlist breakdown</h1>

        <div class="py-10" />

        <v-row v-if="currentState == LoginEnum.INVALID_TOKEN" class="d-flex align-center justify-center">
          <v-col cols="auto">
            <v-btn min-width="228" size="x-large" variant="tonal" :href="AppSettings.baseEndpoint + '/login'">
              <v-icon icon="mdi-spotify" size="x-large" start />
              Login with Spotify
            </v-btn>
          </v-col>
        </v-row>
        <v-row v-else-if="currentState == LoginEnum.CHECKING_TOKEN" class="d-flex align-center justify-center">
          <v-col>
            <h2 class="text-h5 font-weight-light mb-5">Verifying Spotify Login</h2>
            <v-progress-circular indeterminate size="large"></v-progress-circular>
          </v-col>
        </v-row>
      </v-sheet>
    </v-responsive>
  </v-container>
</template>

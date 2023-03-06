<script lang="ts" setup>
import { onBeforeMount, ref } from "vue";
import { useRouter } from "vue-router";
import { PlaylistData } from "@/interfaces/playlistCardInterfaces";
import ProgressBar from "@/components/Widgets/progressBar.vue";
import Api from "@/lib/api";
import RouterHelper from "@/helpers/RouterHelper";
import ErrorHelper from "@/helpers/ErrorHelper";
import { PlaylistDetailsState } from "@/enums/PlaylistDetailsEnums";
import ErrorEnum from "@/enums/ErrorEnum";

const router = useRouter();

const playlistData = ref<PlaylistData>({});
const playlistId = ref("");
const pageState = ref<PlaylistDetailsState>(PlaylistDetailsState.LOADING);
const errorType = ref<ErrorEnum>(ErrorEnum.NONE);

onBeforeMount(async () => {
  const query = router.currentRoute.value.query;
  playlistId.value = query.id as string;

  if (query.id) {
    try {
      const response = await Api.getPlaylistData(query.id as string);

      if (!response.ok) {
        if (response.status == 401) {
          await Api.refreshToken();
          router.go(0);
          return;
        }

        throw {
          response: response,
        };
      }

      const playlistDataResult = await response.json();

      playlistData.value.id = playlistDataResult.id;
      playlistData.value.title = playlistDataResult.name;
      playlistData.value.image = playlistDataResult.images[0].url;
      playlistData.value.trackCount = playlistDataResult.trackCount;
      playlistData.value.analysis = playlistDataResult.analysis;

      pageState.value = PlaylistDetailsState.SUCCESS;
    } catch (error) {
      console.log(error);

      if (ErrorHelper.isResponseError(error)) {
        if (error.response.status == 404) {
          pageState.value = PlaylistDetailsState.ERROR;
          errorType.value = ErrorEnum.MISSING_TRACK_IDS;
        } else RouterHelper.HandleErrorResponse(router, error.response);
        return;
      }

      if (ErrorHelper.isAbortError(error)) {
        pageState.value = PlaylistDetailsState.ERROR;
        errorType.value = ErrorEnum.TIMEOUT;
        return;
      }

      if (ErrorHelper.isGenericError(error) && error.message == ErrorEnum.NO_TOKEN) {
        router.push("/");
        return;
      }

      router.push(`/error?status=Unknown Error&message=${error}`);
    }
  }
});
</script>

<template>
  <v-container class="fill-height">
    <v-responsive class="align-center">
      <div class="d-flex justify-center">
        <v-card
          v-if="pageState == PlaylistDetailsState.SUCCESS"
          max-width="500px"
          width="100%"
          class="playlist-card rounded-lg ma-2"
          elevation="4"
        >
          <v-img width="100%" :src="playlistData.image" cover> </v-img>
          <v-col justify="space-between" align="center" class="px-3 py-3">
            <v-card-title class="playlist-card-title text-h4 font-weight-bold" max-width="100%">{{
              playlistData.title
            }}</v-card-title>
            <v-card-subtitle class="font-weight-light text-body-1"
              ><span class="font-weight-bold">{{ playlistData.trackCount }}</span> Tracks</v-card-subtitle
            >
          </v-col>

          <v-card-text>
            <div class="font-weight-light text-h6">
              Average Tempo:
              <span class="font-weight-bold">{{ Math.round(playlistData.analysis!.tempo) }}</span>
            </div>

            <div class="font-weight-light text-h6">
              Average Duration:
              <span class="font-weight-bold"
                >{{ Math.floor(playlistData.analysis!.duration / 1000 / 60) }}:{{
                  ("0" + Math.round(((playlistData.analysis!.duration / 1000 / 60) % 1) * 60)).slice(-2)
                }}</span
              >
            </div>
          </v-card-text>
          <v-card-item>
            <div class="mb-5">
              <ProgressBar
                :ammount="playlistData.analysis!.energy"
                :id="playlistData.title + '-energy'"
                label="Energy"
                :range="[0, 1]"
                icon="mdi-lightning-bolt"
              />
            </div>
            <div class="mb-5">
              <ProgressBar
                :ammount="playlistData.analysis!.danceability"
                :id="playlistData.title + '-dancability'"
                label="Dancibility"
                :range="[0, 1]"
                icon="mdi-human-female-dance"
              />
            </div>
            <div class="mb-5">
              <ProgressBar
                :ammount="playlistData.analysis!.instrumentalness"
                :id="playlistData.title + '-vocals'"
                label="Vocals"
                :range="[1, 0]"
                icon="mdi-microphone"
              />
            </div>
            <div class="mb-5">
              <ProgressBar
                :ammount="playlistData.analysis!.valence"
                :id="playlistData.title + '-happiness'"
                label="Happiness"
                :range="[0, 1]"
                icon="mdi-emoticon-happy"
              />
            </div>
          </v-card-item>
        </v-card>
        <div v-else-if="pageState == PlaylistDetailsState.LOADING">
          <v-progress-circular :size="70" :width="7" color="purple" indeterminate></v-progress-circular>
        </div>
        <v-sheet
          v-else-if="pageState == PlaylistDetailsState.ERROR"
          rounded="lg"
          color="rgba(0,0,0,0.25)"
          elevation="4"
          class="d-flex flex-column justify-center pa-5"
        >
          <h2 v-if="errorType == ErrorEnum.MISSING_TRACK_IDS" class="text-center">
            Unfortunately, this playlist is unable to be anylised
          </h2>
          <h2 v-else-if="errorType == ErrorEnum.TIMEOUT" class="text-center">Error: Server timeout</h2>
          <h2 v-else class="text-center">Something went wrong</h2>
          <v-btn href="#/home" max-width="200px" class="mx-auto mt-5" variant="tonal">Back to playlists</v-btn>
        </v-sheet>
      </div>
    </v-responsive>
  </v-container>
</template>

<style scoped>
.playlist-card-title {
  max-width: 100%;
  white-space: pre-wrap;
}
.playlist-card {
  background-color: rgba(0, 0, 0, 0.3);
}
</style>

<script lang="ts" setup>
import { onBeforeMount, ref, onMounted, onUpdated } from "vue";
import { Router, useRouter } from "vue-router";
import { PlaylistData } from "@/interfaces/playlistCardInterfaces";
import ProgressBar from "@/components/Widgets/progressBar.vue";
import Api from "@/lib/api";
import RouterHelper from "@/helpers/RouterHelper";
import ErrorHelper from "@/helpers/ErrorHelper";
import { PlaylistDetailsState } from "@/enums/PlaylistDetailsEnums";
import ErrorEnum from "@/enums/ErrorEnum";
import activityChart from "@/components/Charts/activityChart.vue";
import PlaylistHeaderCard from "@/components/Cards/PlaylistHeaderCard.vue";
import PlaylistRankings from "@/components/Content/playlistRankings.vue";
import PlaylistMainDetails from "@/components/Content/playlistMainDetails.vue";
import PlaylistStats from "@/components/Content/playlistStats.vue";
import TrackStats from "@/components/Content/trackStats.vue";
import { useDisplay } from "vuetify/lib/framework.mjs";

const router = useRouter();
const { xs } = useDisplay();

const playlistData = ref<PlaylistData>({});
const playlistId = ref("");
const pageState = ref<PlaylistDetailsState>(PlaylistDetailsState.LOADING);
const errorType = ref<ErrorEnum>(ErrorEnum.NONE);

onBeforeMount(async () => {
  await populatePlaylistData();
});

const populatePlaylistData = async () => {
  console.log("doing stuff");
  const query = router.currentRoute.value.query;
  playlistId.value = query.id as string;

  if (query.id) {
    try {
      const response = await Api.getPlaylistData(query.id as string);
      if (!response.ok) throw { response: response };

      const playlistDataResult = await response.json();
      console.log(playlistDataResult);

      playlistDataResult.image = playlistDataResult.images[0].url;
      playlistData.value = playlistDataResult;

      pageState.value = PlaylistDetailsState.SUCCESS;
    } catch (error) {
      handleErrors(error, router);
    }
  }
};

const handleErrors = (error: any, router: Router) => {
  if (ErrorHelper.isResponseError(error)) {
    if (error.response.status == 404) {
      pageState.value = PlaylistDetailsState.ERROR;
      errorType.value = ErrorEnum.MISSING_TRACK_IDS;
    } else RouterHelper.HandleErrorResponse(router, error.response, populatePlaylistData);
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
};
</script>

<template>
  <v-container class="fill-height">
    <v-responsive class="align-center">
      <div class="d-flex justify-center">
        <div
          class="w-100 d-flex justify-center align-center flex-column"
          v-if="pageState == PlaylistDetailsState.SUCCESS"
        >
          <v-alert
            v-if="!playlistData.isFullyComplete"
            :class="xs ? 'text-body-2 pa-2 mb-3' : 'mb-5 text-body-2'"
            closable
            color="rgba(0,0,0, 0.75)"
            max-width="500px"
            type="warning"
            title="Large playlist"
            text="Not all data could be analyzed, results may be inaccurate."
          >
          </v-alert>
          <PlaylistHeaderCard :playlistData="playlistData" />

          <v-divider :class="xs ? 'my-10' : 'my-15'"></v-divider>

          <PlaylistMainDetails :playlistData="playlistData" />
          <PlaylistRankings :playlistData="playlistData" />
          <PlaylistStats :playlistData="playlistData" />
          <TrackStats :playlistData="playlistData" />

          <v-divider :class="xs ? 'my-8' : 'my-15'"></v-divider>

          <activityChart
            v-if="playlistData.stats!.activity!.length > 3"
            :activity-data="playlistData.stats!.activity"
          />
        </div>

        <div
          v-else-if="pageState == PlaylistDetailsState.LOADING"
          class="d-flex flex-column align-center justify-center"
        >
          <v-progress-circular
            :size="xs ? 70 : 150"
            :width="xs ? 7 : 15"
            color="pink"
            indeterminate
            class="mb-5"
          ></v-progress-circular>
          <h1 :class="xs ? 'text-h6' : 'text-h4'">Gathering Data...</h1>
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

<style scoped></style>

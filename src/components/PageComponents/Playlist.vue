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
      console.log(playlistDataResult);

      playlistDataResult.image = playlistDataResult.images[0].url;
      playlistData.value = playlistDataResult;

      pageState.value = PlaylistDetailsState.SUCCESS;
    } catch (error) {
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
        <div
          class="w-100 d-flex justify-center align-center flex-column"
          v-if="pageState == PlaylistDetailsState.SUCCESS"
        >
          <PlaylistHeaderCard :playlistData="playlistData" />
          <v-divider :class="xs ? 'my-10' : 'my-15'"></v-divider>
          <PlaylistMainDetails :playlistData="playlistData" />
          <PlaylistRankings :playlistData="playlistData" />

          <PlaylistStats :playlistData="playlistData" />
          <TrackStats :playlistData="playlistData" />
          <activityChart
            v-if="playlistData.stats!.activity!.length > 3"
            :activity-data="playlistData.stats!.activity"
          />
        </div>

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

<script lang="ts" setup>
import PlaylistCardContainer from "@/components/Containers/PlaylistCardContainer.vue";
import Api from "@/lib/api";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { PlaylistsData } from "@/interfaces/playlistDataInterface";
import ErrorHelper from "@/helpers/ErrorHelper";
import RouterHelper from "@/helpers/RouterHelper";
import RefreshButton from "../Widgets/RefreshButton.vue";
import ValidationHelper from "@/helpers/ValidationHelper";
import ErrorEnum from "@/enums/ErrorEnum";
import { getPlaylistOverviewStore, getOverviewIds, clearOverviewData } from "@/state/store";
import StorageHelpers from "@/helpers/StorageHelper";
import { useDisplay } from "vuetify/lib/framework.mjs";
import { PlaylistOverviewEnum } from "@/enums/playlistOverviewEnums";

const { xs } = useDisplay();
const router = useRouter();

const emit = defineEmits<{
  (e: "isValidating", value: boolean): void;
}>();

const playlistItems = ref<string[]>([]);
const nextPlaylists = ref({
  hasNext: false,
  nextOffset: 0,
  gettingPlaylists: false,
});

const refreshState = ref<PlaylistOverviewEnum>(PlaylistOverviewEnum.FINNISHED);

onMounted(async () => {
  loadPage();
});

const loadPage = async (clearCache: boolean = false) => {
  try {
    emit("isValidating", true);
    await ValidationHelper.validatePage();
    emit("isValidating", false);

    if (clearCache) {
      clearOverviewData();
      StorageHelpers.ClearOverviewData();
    } else if (getPlaylistOverviewStore().overviewData.length > 0) {
      playlistItems.value = getOverviewIds();
      nextPlaylists.value = getPlaylistOverviewStore().nextPlaylists;
      return;
    }

    const playlistData = await getPlaylistsData(0, clearCache);

    nextPlaylists.value.hasNext = playlistData.nextOffset != null;
    if (playlistData.nextOffset) nextPlaylists.value.nextOffset = playlistData.nextOffset;

    getPlaylistOverviewStore().nextPlaylists = nextPlaylists.value;

    playlistItems.value.push(...playlistData.items!);
  } catch (error) {
    if (ErrorHelper.isResponseError(error)) RouterHelper.HandleErrorResponse(router, error.response);
    else if (ErrorHelper.isGenericError(error) && error.message == ErrorEnum.NO_TOKEN) router.push("/");
    else router.push(`/error?status=Unknown Error&message=${error}`);
  }
};

const getPlaylistsData = async (offset?: number, clearCache: boolean = false): Promise<PlaylistsData> => {
  const playlistDataResponse = await Api.getAllPlaylists(offset, clearCache);
  if (!playlistDataResponse.ok)
    throw {
      respose: playlistDataResponse,
    };

  return (await playlistDataResponse.json()) as PlaylistsData;
};

const getMorePlaylists = async () => {
  nextPlaylists.value.gettingPlaylists = true;

  try {
    const playlists = await getPlaylistsData(nextPlaylists.value.nextOffset);

    playlistItems.value.push(...playlists.items!);
    nextPlaylists.value.hasNext = playlists.nextOffset != null;
    if (playlists.nextOffset) nextPlaylists.value.nextOffset = playlists.nextOffset!;

    nextPlaylists.value.gettingPlaylists = false;
  } catch (error) {
    if (ErrorHelper.isResponseError(error)) RouterHelper.HandleErrorResponse(router, error.response);
    else router.push(`/error?status=Unknown Error&message=${error}`);
  }
};

const refreshPlaylists = async () => {
  refreshState.value = PlaylistOverviewEnum.LOADING;
  playlistItems.value = [];
  await loadPage(true);
  refreshState.value = PlaylistOverviewEnum.FINNISHED;
};

const handleError = () => {
  router.push(`/error?message=Failed to load playlists`);
};
</script>

<template>
  <v-container class="fill-height d-flex justify-center">
    <v-responsive class="d-flex fill-height justify-center" :max-width="xs ? '100%' : '85%'">
      <div class="d-flex align-center justify-space-between">
        <h1>My Playlists</h1>
        <RefreshButton :onRefresh="refreshPlaylists" :refreshState="refreshState" />
      </div>

      <v-divider class="my-5"></v-divider>

      <PlaylistCardContainer
        :items="playlistItems"
        @error="handleError"
        @finalized="() => StorageHelpers.StoreOverviewData(getPlaylistOverviewStore())"
      />
      <div v-if="nextPlaylists.hasNext" class="d-flex justify-center">
        <v-btn v-if="!nextPlaylists.gettingPlaylists" variant="tonal" class="my-8" @click="getMorePlaylists"
          >More playlists...</v-btn
        >
        <v-progress-circular v-else class="my-8" indeterminate color="pink"></v-progress-circular>
      </div>
    </v-responsive>
  </v-container>
</template>

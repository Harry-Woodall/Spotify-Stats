<script lang="ts" setup>
import PlaylistCardContainer from "@/components/Containers/PlaylistCardContainer.vue";
import Api from "@/lib/api";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import PlaylistsData from "@/interfaces/playlistDataInterface";
import ErrorHelper from "@/helpers/ErrorHelper";
import RouterHelper from "@/helpers/RouterHelper";
import ValidationHelper from "@/helpers/ValidationHelper";
import ErrorEnum from "@/enums/ErrorEnum";

const router = useRouter();

const playlistItems = ref<string[]>([]);
const nextPlaylists = ref({
  hasNext: false,
  nextOffset: 0,
  gettingPlaylists: false,
});
// const playlistData: PlaylistData = ref<PlaylistsData>({});

onMounted(async () => {
  try {
    await ValidationHelper.validatePage();

    const playlistData = await getPlaylistsData();

    nextPlaylists.value.hasNext = playlistData.nextOffset != null;
    if (playlistData.nextOffset) nextPlaylists.value.nextOffset = playlistData.nextOffset;

    playlistItems.value.push(...playlistData.items!);
  } catch (error) {
    if (ErrorHelper.isResponseError(error)) RouterHelper.HandleErrorResponse(router, error.response);
    if (ErrorHelper.isGenericError(error) && error.message == ErrorEnum.NO_TOKEN) router.push("/");
    else router.push(`/error?status=Unknown Error&message=${error}`);
  }
});

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

const getPlaylistsData = async (offset?: number): Promise<PlaylistsData> => {
  const playlistDataResponse = await Api.getAllPlaylists(offset);
  if (!playlistDataResponse.ok)
    throw {
      respose: playlistDataResponse,
    };

  return (await playlistDataResponse.json()) as PlaylistsData;
};

const handleError = () => {
  router.push(`/error?message=Failed to load playlists`);
};
</script>

<template>
  <v-container class="fill-height">
    <v-responsive class="d-flex fill-height">
      <h1>My Playlists</h1>
      <v-divider class="my-5"></v-divider>
      <PlaylistCardContainer :items="playlistItems" @error="handleError" />
      <div v-if="nextPlaylists.hasNext" class="d-flex justify-center">
        <v-btn v-if="!nextPlaylists.gettingPlaylists" variant="tonal" class="my-8" @click="getMorePlaylists"
          >More playlists...</v-btn
        >
        <v-progress-circular v-else indeterminate></v-progress-circular>
      </div>
    </v-responsive>
  </v-container>
</template>

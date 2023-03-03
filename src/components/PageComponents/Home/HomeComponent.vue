<script lang="ts" setup>
import PlaylistCardContainer from "@/components/Containers/PlaylistCardContainer.vue";
import localStorageEnums from "@/enums/LocalStorageEnums";
import Api from "@/lib/api";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import PlaylistsData from "@/interfaces/playlistDataInterface";
import ErrorHelper from "@/helpers/ErrorHelper";
import RouterHelper from "@/helpers/RouterHelper";
import StorageHelpers from "@/helpers/StorageHelper";
// import { PlaylistData } from "@/interfaces/playlistCardInterfaces";

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
    const res = await Api.verifyToken();

    if (!res) {
      StorageHelpers.DestroyLocalStorage();
      router.push("/");
      return;
    }

    const response: PlaylistsData = await Api.getAllPlaylists();
    console.log(response);

    nextPlaylists.value.hasNext = response.nextOffset != null;
    if (response.nextOffset) nextPlaylists.value.nextOffset = response.nextOffset;

    playlistItems.value.push(...response.items!);
  } catch (error) {
    if (ErrorHelper.isResponseError(error)) RouterHelper.HandleErrorResponse(router, error.response);
    else router.push(`/error?status=Unknown Error&message=${error}`);
  }
});

const getMorePlaylists = async () => {
  nextPlaylists.value.gettingPlaylists = true;

  const morePlaylistResponse: PlaylistsData = await Api.getAllPlaylists(nextPlaylists.value.nextOffset);

  playlistItems.value.push(...morePlaylistResponse.items!);

  nextPlaylists.value.hasNext = morePlaylistResponse.nextOffset != null;
  if (morePlaylistResponse.nextOffset) nextPlaylists.value.nextOffset = morePlaylistResponse.nextOffset!;

  console.log(morePlaylistResponse.nextOffset);

  nextPlaylists.value.gettingPlaylists = false;
};
</script>

<template>
  <v-container class="fill-height">
    <v-responsive class="d-flex fill-height">
      <h1>My Playlists</h1>
      <v-divider class="my-5"></v-divider>
      <PlaylistCardContainer :items="playlistItems" />
      <div v-if="nextPlaylists.hasNext" class="d-flex justify-center">
        <v-btn v-if="!nextPlaylists.gettingPlaylists" variant="tonal" class="my-8" @click="getMorePlaylists"
          >More playlists...</v-btn
        >
        <v-progress-circular v-else indeterminate></v-progress-circular>
      </div>
    </v-responsive>
  </v-container>
</template>

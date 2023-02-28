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

const router = useRouter();

const playlistData = ref<PlaylistsData>({});

onMounted(async () => {
  try {
    const res = await Api.verifyToken();

    if (!res) {
      StorageHelpers.DestroyLocalStorage();
      router.push("/");
      return;
    }

    playlistData.value = await Api.getAllPlaylists();
  } catch (error) {
    if (ErrorHelper.isResponseError(error)) RouterHelper.HandleErrorResponse(router, error.response);
    else router.push(`/error?status=Unknown Error&message=${error}`);
  }
});
</script>

<template>
  <v-container class="fill-height">
    <v-responsive class="d-flex fill-height">
      <h1>My Playlists</h1>
      <v-divider class="my-5"></v-divider>
      <PlaylistCardContainer
        :itemCount="playlistData.itemCount"
        :returnedItemCount="playlistData.returnedItemCount"
        :items="playlistData.items"
      />
    </v-responsive>
  </v-container>
</template>

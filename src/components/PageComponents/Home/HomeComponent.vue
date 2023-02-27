<script lang="ts" setup>
import PlaylistCardContainer from "@/components/Containers/PlaylistCardContainer.vue";
import localStorageEnums from "@/enums/LocalStorageEnums";
import Api from "@/lib/api";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import PlaylistsData from "@/interfaces/playlistDataInterface";

const router = useRouter();

const playlistData = ref<PlaylistsData>({});

onMounted(async () => {
  const res = await Api.verifyToken();

  if (!res) {
    localStorage.removeItem(localStorageEnums.ACCESS_TOKEN);
    localStorage.removeItem(localStorageEnums.REFRESH_TOKEN);
    router.push("/");
  }

  playlistData.value = await Api.getPlaylistDetails();
  console.log(playlistData.value);
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

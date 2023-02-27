<script lang="ts" setup>
import { onBeforeMount, ref } from "vue";
import { useRouter } from "vue-router";
import { PlaylistData } from "@/interfaces/playlistCardInterfaces";
import ProgressBar from "@/components/Widgets/progressBar.vue";
import Api from "@/lib/api";

const router = useRouter();

const playlistData = ref<PlaylistData>({});
const Id = ref("");

const imageUrl =
  "https://mosaic.scdn.co/640/ab67616d0000b27309e9e2c7d79521350bd3c7ccab67616d0000b27318913da3b1abd70e45ea4771ab67616d0000b27394025aa54be4980ff1401169ab67616d0000b273a6adf25b511eabdcbfd87339";

onBeforeMount(async () => {
  const query = router.currentRoute.value.query;
  Id.value = query.id as string;

  if (query.id) {
    const response = await Api.getPlaylistData(query.id as string);
    console.log(response);
    playlistData.value.id = response.id;
    playlistData.value.title = response.name;
    playlistData.value.image = response.images[0].url;
    playlistData.value.trackCount = response.trackCount;
    playlistData.value.analysis = response.analysis;
  }
});
</script>

<template>
  <v-container class="fill-height">
    <v-responsive class="align-center">
      <div class="d-flex justify-center">
        <v-card
          v-if="playlistData.id != undefined"
          max-width="500px"
          width="100%"
          class="playlist-card rounded-lg ma-2"
          elevation="4"
        >
          <v-img width="100%" :src="playlistData.image || imageUrl" cover>
          </v-img>
          <v-col justify="space-between" align="center" class="px-3 py-3">
            <v-card-title
              class="playlist-card-title text-h4 font-weight-bold"
              max-width="100%"
              >{{ playlistData.title }}</v-card-title
            >
            <v-card-subtitle class="font-weight-light text-body-1"
              ><span class="font-weight-bold">{{
                playlistData.trackCount
              }}</span>
              Tracks</v-card-subtitle
            >
          </v-col>

          <v-card-text>
            <div class="font-weight-light text-h6">
              Average Tempo:
              <span class="font-weight-bold">{{
                Math.round(playlistData.analysis!.tempo)
              }}</span>
            </div>

            <div class="font-weight-light text-h6">
              Average Duration:
              <span class="font-weight-bold"
                >{{
                  Math.floor(playlistData.analysis!.duration / 1000 / 60)
                }}:{{
                  (
                    "0" +
                    Math.round(
                      ((playlistData.analysis!.duration / 1000 / 60) % 1) * 60
                    )
                  ).slice(-2)
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
        <div v-else>
          <v-progress-circular
            :size="70"
            :width="7"
            color="purple"
            indeterminate
          ></v-progress-circular>
        </div>
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

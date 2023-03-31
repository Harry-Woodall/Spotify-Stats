<script lang="ts" setup>
import { CurrentTrackResponse, TrackAnalysis, TrackData } from "@/interfaces/trackInterfaces";
import Api from "@/lib/api";
import router from "@/router";
import { onMounted, onUnmounted, ref, watch } from "vue";
import { useDisplay } from "vuetify/lib/framework.mjs";
import CurrentTrackDialog from "../Dialogs/CurrentTrackDialog.vue";

const { xs } = useDisplay();

const showCurrentTrack = ref(false);
const dialog = ref(false);
const trackData = ref<TrackData>();
const isPolling = ref(false);

let pollTimer: ReturnType<typeof setTimeout>;

onMounted(() => {
  checkPlaybackState();
  isPolling.value = true;
});

onUnmounted(() => {
  clearInterval(pollTimer);
});

watch(dialog, async (newValue) => {
  toggleBackground(!newValue);
  isPolling.value = !newValue;

  if (!newValue) checkPlaybackState();
});

watch(isPolling, async (newValue) => {
  if (newValue)
    pollTimer = setInterval(() => {
      console.log("polling timer with id: ", pollTimer);

      checkPlaybackState();
    }, 10000);
  else {
    clearInterval(pollTimer);
  }
});

const checkPlaybackState = async () => {
  const trackObject = await pollForCurrentTrack();

  if (trackObject) {
    await getTrackAnalysis(trackObject.trackId);
    await getPlaylistTitle(trackObject.isPlaylist, trackObject.playlistId);
  }
};

const pollForCurrentTrack = async () => {
  console.log("polling server ", new Date(Date.now()).toTimeString());

  const response = await Api.pollForCurrentTrack();
  if (!response.ok || response.status == 204) {
    trackData.value = undefined;
    await handleBadResponse(response, pollForCurrentTrack);
    return null;
  }

  const trackResponse: CurrentTrackResponse = await response.json();

  trackData.value = {
    trackName: trackResponse.track.name,
    trackArtists: trackResponse.track.artists,
    trackReleaseDate: trackResponse.track.releaseDate.toString(),
    image: trackResponse.track.image,
    playlistId: trackResponse.playlistId,
  };

  return {
    trackId: trackResponse.track.id,
    playlistId: trackResponse.playlistId,
    isPlaylist: trackResponse.isPlaylist,
  };
};

const getTrackAnalysis = async (trackId: string) => {
  const analysisResponse = await Api.getTrackAnalysis(trackId);
  if (!analysisResponse.ok) {
    await handleBadResponse(analysisResponse, getTrackAnalysis);
    return null;
  }

  const analysisData: TrackAnalysis = await analysisResponse.json();
  if (analysisData) trackData.value!.analysis = analysisData;
};

const getPlaylistTitle = async (isPlaylist: boolean, playlistId: string) => {
  if (isPlaylist) {
    const nameResponse = await Api.getPlaylistName(playlistId);
    if (!nameResponse.ok) {
      await handleBadResponse(nameResponse, getPlaylistTitle);
      return;
    }

    const playlistName = await nameResponse.json();
    trackData.value!.playlistName = playlistName.name;
  }
};

const handleBadResponse = async (response: Response, refreshCallBack: Function) => {
  if (response.status == 401) {
    await Api.refreshToken();
    refreshCallBack();
  }
};

const closeDialog = () => {
  dialog.value = false;
};

const showTrack = () => {
  showCurrentTrack.value = !showCurrentTrack.value;
};

const toggleBackground = (show: boolean) => {
  show
    ? (document.querySelectorAll<HTMLElement>(".__background")[0].style.display = "block")
    : (document.querySelectorAll<HTMLElement>(".__background")[0].style.display = "none");
};

const goToPlaylist = (id: string) => {
  closeDialog();
  router.push(`/playlist?id=${id}`);
};
</script>

<template>
  <v-container v-if="trackData">
    <v-scroll-y-transition>
      <v-btn
        v-if="!showCurrentTrack && xs"
        location="bottom right"
        position="fixed"
        @click="showTrack"
        class="current-track-reveal-button-mobile"
        color="#bc39c1"
        size="large"
        icon="mdi-cellphone-sound"
      >
      </v-btn>
    </v-scroll-y-transition>
    <v-scroll-y-transition>
      <v-banner
        v-if="showCurrentTrack || !xs"
        lines="two"
        icon="mdi-speaker-wireless"
        location="bottom center"
        position="fixed"
        rounded
        :stacked="false"
        :class="xs ? 'current-track-banner banner-animated pa-3 pb-4' : 'current-track-banner pa-2 pb-3'"
        max-width="1500px"
        elevation="4"
      >
        <div class="bottom-banner">
          <div @click="dialog = true" class="banner-content">
            <h3 class="text-body-2">Currently Playling:</h3>
            <p class="playlist-text text-body-1 font-weight-bold">{{ trackData.trackName }}</p>
            <p class="playlist-text text-caption font-weight-light font-italic">
              {{ trackData.trackArtists?.join(", ") }}
            </p>
          </div>
          <v-btn v-if="xs" class="dismiss-button" variant="text" @click="showTrack" icon="mdi-close"></v-btn>
        </div>
      </v-banner>
    </v-scroll-y-transition>
  </v-container>
  <v-dialog v-model="dialog" width="75%" max-width="400px" rounded elevation="0">
    <current-track-dialog :closeDialog="closeDialog" :track-data="trackData" :linkToPlaylist="goToPlaylist" />
  </v-dialog>
</template>

<style scoped>
.bottom-banner {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  grid-template-areas: "content button";
  grid-template-rows: auto 1fr;
}
.dismiss-button {
  grid-area: button;
  align-self: center;
  overflow: auto;
}
.banner-content {
  grid-area: content;
  cursor: pointer;
}

.playlist-text {
  grid-column-start: 1;
  grid-area: sidebar;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.dismiss-button {
  grid-column-start: 2;
}

.current-track-banner {
  background-color: #bc39c1;
  bottom: -10px !important;
}

.current-track-reveal-button-mobile {
  bottom: 50px !important;
  right: 30px !important;
}

.banner-animated {
  animation: nowPlayingMoveUp 0.2s linear;
}

@keyframes nowPlayingMoveUp {
  0% {
    transform: translate(-50%, 100%);
  }
  100% {
    transform: translate(-50%, 0);
  }
}
</style>

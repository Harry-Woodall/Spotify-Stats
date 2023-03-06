<script lang="ts" setup>
import { onMounted, reactive, ref } from "vue";
import Api from "@/lib/api";
import PlaceholderPlaylistOverviewCard from "@/components/Cards/PlaylistOverviewCard/PlaceholderPlaylistOverviewCard.vue";
import PlaylistOverviewCardContent from "@/components/Cards/PlaylistOverviewCard/PlaylistOverviewCardContent.vue";
import { PlaylistOverview } from "@/interfaces/playlistCardInterfaces";
import ErrorHelper from "@/helpers/ErrorHelper";
import ErrorEnum from "@/enums/ErrorEnum";
import Masonry from "masonry-layout";

const props = defineProps({
  playlistId: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["error"]);

const playlistData = reactive<PlaylistOverview>({});
const errorType = ref<ErrorEnum>(ErrorEnum.NONE);

onMounted(async () => {
  try {
    const response = await Api.getPlaylistOverview(props.playlistId);

    playlistData.id = props.playlistId;
    playlistData.title = response.name;
    playlistData.trackCount = response.trackCount;
    playlistData.owner = response.owner;

    if (response.images.length) playlistData.image = response.images[0].url;
    else playlistData.image = "/images/ImagePlaceholder.svg";
  } catch (error) {
    errorType.value = ErrorEnum.UNKNOWN;

    if (ErrorHelper.isAbortError(error)) {
      errorType.value = ErrorEnum.TIMEOUT;
    } else if (ErrorHelper.isResponseError(error)) {
      if (error.response.status == 404) errorType.value = ErrorEnum.NOT_FOUND;
    }

    new Masonry(".card-grid", {
      columnWidth: ".playlist-card",
      fitWidth: true,
    });

    emit("error", [errorType]);
  }
});
</script>

<template>
  <div v-if="playlistData.title != undefined">
    <PlaylistOverviewCardContent :playlistData="playlistData" />
  </div>
  <div v-else-if="errorType == ErrorEnum.NONE">
    <PlaceholderPlaylistOverviewCard />
  </div>
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

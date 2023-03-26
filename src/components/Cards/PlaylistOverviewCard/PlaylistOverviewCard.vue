<script lang="ts" setup>
import { onMounted, PropType, reactive, ref } from "vue";
import Api from "@/lib/api";
import PlaceholderPlaylistOverviewCard from "@/components/Cards/PlaylistOverviewCard/PlaceholderPlaylistOverviewCard.vue";
import PlaylistOverviewCardContent from "@/components/Cards/PlaylistOverviewCard/PlaylistOverviewCardContent.vue";
import { PlaylistOverview } from "@/interfaces/playlistCardInterfaces";
import ErrorHelper from "@/helpers/ErrorHelper";
import ErrorEnum from "@/enums/ErrorEnum";
import Masonry from "masonry-layout";
import { addOverviewData, getOverviewData } from "@/state/store";

const props = defineProps({
  playlistId: {
    type: String,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits(["error", "success"]);

const playlistData = ref<PlaylistOverview>({ id: props.playlistId });
const errorType = ref<ErrorEnum>(ErrorEnum.NONE);

onMounted(async () => {
  const overviewData = getOverviewData(props.playlistId);
  if (overviewData) {
    playlistData.value = overviewData;
    emit("success");
    return;
  }

  try {
    const response = await Api.getPlaylistOverview(props.playlistId);

    if (!response.ok)
      throw {
        response: response,
      };

    const playlistOverview = await response.json();

    playlistData.value.title = playlistOverview.name;
    playlistData.value.trackCount = playlistOverview.trackCount;
    playlistData.value.owner = playlistOverview.owner;

    if (playlistOverview.images.length) playlistData.value.image = playlistOverview.images[0].url;
    else playlistData.value.image = "images/ImagePlaceholder.svg";

    addOverviewData(playlistData.value, props.index);
    emit("success");
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

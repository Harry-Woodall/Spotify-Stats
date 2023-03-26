<script lang="ts" setup>
import PlaylistOverviewCard from "@/components/Cards/PlaylistOverviewCard/PlaylistOverviewCard.vue";
import ErrorEnum from "@/enums/ErrorEnum";
import { PropType, ref } from "vue";
import PlaylistContainerError from "@/components/Errors/PlaylistContainerError.vue";
import { PlaylistOverview } from "@/interfaces/playlistCardInterfaces";

const showError = ref(false);
const errorType = ref(ErrorEnum.NONE);
const errorCount = ref(0);
const successCount = ref(0);

let hasErrored = false;

const props = defineProps({
  items: Array as PropType<string[]>,
});

const emit = defineEmits(["error", "finalized"]);

const handleError = (params: any) => {
  errorCount.value++;

  if (!hasErrored) {
    hasErrored = true;
    showError.value = true;
    errorType.value = params[0].value || ErrorEnum.NONE;
  }

  if (errorCount.value == props.items?.length) {
    emit("error", ErrorEnum.NOT_FOUND);
  }

  if (successCount.value + errorCount.value == props.items?.length) emit("finalized");
};

const handleSuccess = () => {
  successCount.value++;
  if (successCount.value + errorCount.value == props.items?.length) emit("finalized");
};
</script>

<template>
  <div class="card-grid">
    <div v-for="(item, index) in props.items" :key="index" :id="'playlist-' + item">
      <PlaylistOverviewCard :index="index" :playlistId="item" @error="handleError" @success="handleSuccess" />
    </div>
    <PlaylistContainerError v-if="showError" :type="errorType" />
  </div>
</template>

<style scoped>
.card-grid {
  margin: 0 auto;
}
</style>

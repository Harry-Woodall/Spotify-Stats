<script lang="ts" setup>
import PlaylistOverviewCard from "@/components/Cards/PlaylistOverviewCard/PlaylistOverviewCard.vue";
import ErrorEnum from "@/enums/ErrorEnum";
import { PropType, ref } from "vue";
import PlaylistContainerError from "@/components/Errors/PlaylistContainerError.vue";

const showError = ref(false);
const errorType = ref(ErrorEnum.NONE);
const errorCount = ref(0);

let hasErrored = false;

const props = defineProps({
  items: Array as PropType<string[]>,
});

const emit = defineEmits(["error"]);

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
};
</script>

<template>
  <div class="card-grid">
    <div v-for="(item, index) in props.items" :key="index">
      <PlaylistOverviewCard :playlistId="item" @error="handleError" />
    </div>
    <PlaylistContainerError v-if="showError" :type="errorType" />
  </div>
</template>

<style scoped>
.card-grid {
  margin: 0 auto;
}
</style>

<script lang="ts" setup>
import { onUpdated, onMounted, PropType } from "vue";
import Helpers from "@/helpers/componentHelper";

const props = defineProps({
  ammount: {
    required: true,
    type: Number,
  },
  id: {
    required: true,
    type: String,
  },
  range: Array as PropType<number[]>,
  label: String,
  icon: String,
  condensed: {
    type: Boolean,
    default: false,
  },
  colors: Array as PropType<number[]>,
});

const baseColor = props.colors || [227, 60, 233];

const colors = [
  `background-color: rgba(${baseColor[0]}, ${baseColor[1]}, ${baseColor[2]}, 0.3)`,
  `background-color: rgb(${baseColor[0]}, ${baseColor[1]}, ${baseColor[2]}, 0.45)`,
  `background-color: rgb(${baseColor[0]}, ${baseColor[1]}, ${baseColor[2]}, 0.6)`,
  `background-color: rgb(${baseColor[0]}, ${baseColor[1]}, ${baseColor[2]}, 0.75)`,
  `background-color: rgb(${baseColor[0]}, ${baseColor[1]}, ${baseColor[2]})`,
];

onMounted(() => {
  if (props.id) {
    let normalizedAmmount = props.ammount;
    if (props.range) normalizedAmmount = Helpers.mapRange(props.ammount, props.range[0], props.range[1], 0, 1);

    const percentAmmount = Math.round(normalizedAmmount * 100);

    let progressEnd = percentAmmount == 0;
    for (let i = 0; i < 5; i++) {
      if (!progressEnd) {
        const segment = document.getElementById(`${props.id}-segment-${i}`);
        const segmentMax = (i + 1) * 20;

        const segmentInner = document.createElement("div");
        segmentInner.className = `progress-bar-inner segment-${i + 1}`;

        let width = 0;
        if (percentAmmount / segmentMax < 1) {
          const segmentMin = i * 20;
          width = ((percentAmmount - segmentMin) / 20) * 100;
          progressEnd = true;
        }

        segmentInner.setAttribute("style", `width: ${width || 100}%; ${colors[i]}`);

        segment!.appendChild(segmentInner);
      }
    }
  }
});
</script>

<template>
  <div class="progress-bar-container">
    <label
      :class="condensed ? 'progress-bar-label text-subtitle-2' : 'progress-bar-label text-subtitle-1 font-weight-bold'"
      v-if="label"
    >
      <v-icon v-if="icon" :icon="icon" :size="condensed ? 'small' : 'large'" start />
      {{ label }}</label
    >
    <div class="progress-bar-segment-container" :id="id">
      <div class="progress-bar-segment" :id="id + '-segment-0'"></div>
      <div class="progress-bar-segment" :id="id + '-segment-1'"></div>
      <div class="progress-bar-segment" :id="id + '-segment-2'"></div>
      <div class="progress-bar-segment" :id="id + '-segment-3'"></div>
      <div class="progress-bar-segment" :id="id + '-segment-4'"></div>
    </div>
  </div>
</template>

<style>
.progress-bar-segment-container {
  display: flex;
  height: 5px;
  margin: 3px;
  border-radius: 10px;
}

.progress-bar-segment {
  position: relative;
  border-radius: 10px;
  width: 19%;
  margin: 0 1% 0 1%;
  /* border: 2px solid rgb(255, 255, 255, 0.15); */
  background-color: rgba(0, 0, 0, 0.5);
}

.progress-bar-inner {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  border-radius: 10px;
}

/* .segment-1 {
  background-color: rgba(216, 58, 221, 0.25);
}

.segment-2 {
  background-color: rgb(227, 60, 233, 0.4);
}
.segment-3 {
  background-color: rgb(227, 60, 233, 0.6);
}
.segment-4 {
  background-color: rgb(227, 60, 233, 0.8);
}
.segment-5 {
  background-color: rgb(227, 60, 233);
} */
</style>

<script lang="ts" setup>
import { DataObject } from "@/interfaces/playlistCardInterfaces";
import { onMounted, PropType, reactive } from "vue";
import { useDisplay } from "vuetify/lib/framework.mjs";

const { xs } = useDisplay();

const props = defineProps({
  title: String,
  track: String,
  artist: Array as PropType<DataObject[]>,
  value: String,
  hasBorder: Boolean,
});

const convertArtists = () => {
  if (props.artist?.length == 1) {
    return props.artist[0].name;
  }

  let artistsString = props.artist![0].name;
  props.artist?.forEach((artist, index) => {
    if (index != 0) artistsString += ", " + artist;
  });

  return artistsString;
};

onMounted(() => {
  console.log(props.hasBorder);
});
</script>

<template>
  <v-card
    elevation="0"
    :class="xs ? 'mx-3 pb-3 ' + (hasBorder ? 'details-card' : '') : 'mx-15 pb-3 ' + (hasBorder ? 'details-card' : '')"
    width="100%"
    :rounded="0"
  >
    <div class="d-flex align-center justify-space-between">
      <v-card-title :class="xs ? 'text-h5 pa-0 ' : 'text-h4 pa-1 '">{{ title }}</v-card-title>
      <div>
        <v-card-text
          :class="xs ? 'text-h6 font-weight-bold card-value pa-0' : 'text-h4 font-weight-bold card-value pa-0'"
        >
          {{ value }}
        </v-card-text>
      </div>
    </div>
    <div class="ml-3 mt-1">
      <v-card-title :class="xs ? 'pa-0 pr-2 text-body-2 track-name' : 'pa-0 text-h6 '">{{ track }}</v-card-title>
      <v-card-subtitle class="pa-0 text-subtitle-2 font-italic"> {{ convertArtists() }} </v-card-subtitle>
    </div>
  </v-card>
</template>

<style scoped>
.track-card-container {
  width: 100%;
}

.details-card {
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}
.card-value {
  color: #bb86fc !important;
}

.numeric-card-value h2 {
  text-align: center;
}

.track-name,
.track-artist {
  line-height: 1rem;
}

.v-card-title {
  white-space: pre-wrap;
}

.v-card-subtitle {
  white-space: pre-wrap;
}
</style>

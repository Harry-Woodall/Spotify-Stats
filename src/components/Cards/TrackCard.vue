<script lang="ts" setup>
import { PropType, reactive } from "vue";
import { useDisplay } from "vuetify/lib/framework.mjs";

const { xs } = useDisplay();

const props = defineProps({
  title: String,
  track: String,
  artist: Array as PropType<string[]>,
  image: String,
  value: String,
  isNumeric: Boolean,
  rightAlign: Boolean,
});

const convertArtists = () => {
  if (props.artist?.length == 1) {
    return props.artist[0];
  }

  let artistsString = props.artist![0];
  props.artist?.forEach((artist, index) => {
    if (index != 0) artistsString += ", " + artist;
  });

  return artistsString;
};
</script>

<template>
  <v-card :width="xs ? '250px' : '300px'" variant="text" :class="xs ? 'mb-10' : 'mb-5'">
    <div v-if="!isNumeric">
      <v-card-title class="text-h1 font-weight-light card-value">{{ value }}</v-card-title>
      <v-card-subtitle
        ><h2 class="text-body-1">{{ title }}</h2></v-card-subtitle
      >
    </div>
    <div v-else class="d-flex flex-column justify-center align-center numeric-card-value">
      <v-progress-circular
        :size="xs ? 150 : 200"
        :width="xs ? 10 : 15"
        :model-value="Math.round(parseFloat(value!) * 100)"
        color="#bb86fc"
        class="mb-3"
      >
        <v-card-title :class="xs ? 'text-h3' : 'text-h2'">{{ Math.round(parseFloat(value!) * 100) }}</v-card-title>
      </v-progress-circular>
      <v-card-subtitle
        ><h2 :class="xs ? 'text-h5 font-weight-light' : 'text-h5 font-weight-light'">{{ title }}</h2></v-card-subtitle
      >
    </div>

    <v-card-item>
      <v-card elevation="12" :class="xs ? 'mt-0' : 'mt-2'" background="blue">
        <v-img :src="image" width="100%"></v-img>
      </v-card>
      <v-card-title class="text-h5 mt-2"> {{ track }} </v-card-title>
      <v-card-subtitle>{{ convertArtists() }}</v-card-subtitle>
    </v-card-item>
  </v-card>
</template>

<style scoped>
.track-card-container {
  width: 100%;
}
.card-value {
  line-height: 4rem;
  color: #bb86fc !important;
}

.numeric-card-value h2 {
  text-align: center;
}

.track-name,
.track-artist {
  padding: 5px;
}

.v-card-title {
  white-space: pre-wrap;
}

.v-card-subtitle {
  white-space: pre-wrap;
}
</style>

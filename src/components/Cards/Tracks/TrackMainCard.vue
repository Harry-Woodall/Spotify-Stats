<script lang="ts" setup>
import { DataObject } from "@/interfaces/playlistCardInterfaces";
import { PropType } from "vue";
import { useDisplay } from "vuetify/lib/framework.mjs";

const { xs } = useDisplay();

const props = defineProps({
  title: String,
  track: String,
  artist: Array as PropType<DataObject[]>,
  image: String,
  value: String,
  statColor: String,
});

const convertArtists = () => {
  if (props.artist?.length == 1) {
    return props.artist[0].name;
  }

  let artistsString = props.artist![0].name;
  props.artist?.forEach((artist, index) => {
    if (index != 0) artistsString += ", " + artist.name;
  });

  return artistsString;
};
</script>

<template>
  <v-card :width="xs ? '135px' : '300px'" variant="text" :class="xs ? 'mb-0' : 'mb-5'">
    <div class="d-flex flex-column justify-center align-center numeric-card-value">
      <v-progress-circular
        :size="xs ? 90 : 200"
        :width="xs ? 5 : 15"
        :model-value="Math.round(parseFloat(value!) * 100)"
        :color="statColor || '#bb86fc'"
        :class="xs ? 'mb-0' : 'mb-1'"
      >
        <v-card-title :class="xs ? 'text-h4 stat-title heading-mobile' : 'text-h2 stat-title'">{{
          Math.round(parseFloat(value!) * 100)
        }}</v-card-title>
      </v-progress-circular>
      <v-card-title class="pa-0"
        ><h2
          :class="
            xs ? 'text-h6 mt-1 main-track-card-title heading-mobile' : 'text-h5 font-weight-bold main-track-card-title'
          "
        >
          {{ title }}
        </h2></v-card-title
      >
    </div>

    <v-card-item :class="xs ? 'mt-0 pt-0' : ''">
      <v-card elevation="12" :class="xs ? 'mt-2' : 'mt-2'" background="blue">
        <v-img :src="image" width="100%"></v-img>
      </v-card>
      <v-card-title :class="xs ? 'text-body-2 mt-2 track-name-mobile' : 'text-h5 mt-2'"> {{ track }} </v-card-title>
      <v-card-subtitle :class="xs ? 'mt-1' : ''">{{ convertArtists() }}</v-card-subtitle>
    </v-card-item>
  </v-card>
</template>

<style scoped>
.track-card-container {
  width: 100%;
}

.main-track-card-title,
.track-name-mobile {
  line-height: normal;
}
.card-value {
  line-height: 4rem;
  color: #bb86fc !important;
}

.stat-title {
  color: #bb86fc;
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

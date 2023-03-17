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
  border: Boolean,
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

const containerClass = () => {
  return props.border
    ? "d-flex justify-space-around align-center py-8 track-main-card-mobile"
    : "d-flex justify-space-around align-center py-8";
};
</script>

<template>
  <div width="100%" :class="containerClass()">
    <div>
      <div class="d-flex flex-column justify-center align-center numeric-card-value">
        <v-progress-circular
          size="100"
          width="10"
          :model-value="Math.round(parseFloat(value!) * 100)"
          :color="statColor || '#bb86fc'"
          :class="xs ? 'mb-0' : 'mb-1'"
        >
          <v-card-title :class="xs ? 'text-h4 stat-title heading-mobile' : 'text-h2 stat-title'">{{
            Math.round(parseFloat(value!) * 100)
          }}</v-card-title>
        </v-progress-circular>
        <v-card-title class="pa-0"
          ><h2 class="text-h6 mt-1 main-track-card-title heading-mobile">
            {{ title }}
          </h2></v-card-title
        >
      </div>
    </div>
    <div>
      <v-card-item class="pa-0">
        <v-card elevation="4" width="150px">
          <v-img :src="image" width="70%" class="mx-auto" cover></v-img>
          <v-card-title :class="xs ? 'text-body-2 mt-2 track-name-mobile' : 'text-h5 mt-2'"> {{ track }} </v-card-title>
          <v-card-subtitle :class="xs ? 'mt-1' : ''">{{ convertArtists() }}</v-card-subtitle>
        </v-card>
      </v-card-item>
    </div>
  </div>
</template>

<style scoped>
.main-track-card-title,
.track-name-mobile {
  line-height: normal;
}

.track-main-card-mobile {
  gap: 30px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.card-value {
  line-height: 4rem;
  color: #bb86fc !important;
}

.stat-title {
  color: #bb86fc;
}

.numeric-card-value {
  width: 100px;
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

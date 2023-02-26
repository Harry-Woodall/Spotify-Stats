<script lang="ts" setup>
import PlaylistCard from "@/components/Cards/playlistCard.vue";

const analysis = {
  tempo: 100,
  duration: 13026,
  energy: 0.7,
  danceability: 0.35,
  instrumentalness: 0.6,
  valence: 0.9,
};

// eslint-disable-next-line no-undef
var msnry = new Masonry(".masonry", {
  // options
  itemSelector: "[class*='col-']",
});
</script>

<template>
  <v-container class="fill-height">
    <v-responsive class="d-flex align-center fill-height">
      <h1>Home</h1>
      <v-divider class="my-5"></v-divider>
      <PlaylistCard
        title="This is quite a long title and some more"
        image="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
        :trackCount="100"
        :analysis="analysis"
      />
    </v-responsive>
  </v-container>
</template>

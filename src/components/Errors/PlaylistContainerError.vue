<script lang="ts" setup>
import ErrorEnum from "@/enums/ErrorEnum";
import { PropType, ref } from "vue";

let showSnack = ref(true);

const props = defineProps({
  type: String as PropType<ErrorEnum>,
});

const mapType = (): string => {
  switch (props.type) {
    case ErrorEnum.TIMEOUT:
      return "1 or more playlist(s) have failed to load";
    default:
      return "Unkown error";
  }
};
</script>

<template>
  <div>
    <v-snackbar v-model="showSnack" timeout="5000" color="error" location="bottom left">
      <p class="text-caption">{{ mapType() }}</p>
    </v-snackbar>
  </div>
</template>

<template>
  <Splash v-if="!tokenExists" />
  <Verify v-else />
</template>

<script lang="ts" setup>
import Splash from "@/components/Splash/SplashComponent.vue";
import Verify from "@/components/Splash/VerifyComponent.vue";
import localStorageEnums from "@/enums/localStorageEnums";

const tokenExists = localStorage.getItem(localStorageEnums.ACCESS_TOKEN);
</script>

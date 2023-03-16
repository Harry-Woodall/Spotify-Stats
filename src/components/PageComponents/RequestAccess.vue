<script lang="ts" setup>
import StorageHelpers from "@/helpers/StorageHelper";
import { useRouter } from "vue-router";
import { reactive, ref } from "vue";
import Api from "@/lib/api";
import ErrorHelper from "@/helpers/ErrorHelper";
import RouterHelper from "@/helpers/RouterHelper";
import ErrorEnum from "@/enums/ErrorEnum";
import FormEnum from "@/enums/FormEnum";
import { useDisplay } from "vuetify/lib/framework.mjs";

const router = useRouter();
const { xs } = useDisplay();

const state = ref(FormEnum.NONE);

const form = reactive({ name: "", email: "" });
const formValidation = reactive({
  name: [
    (value: string) => {
      if (value) return true;
      return "You must enter a name";
    },
  ],
  email: [
    (value: string) => {
      if (value) return true;
      return "You must enter an email";
    },
    (value: string) => {
      if (
        String(value)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          )
      )
        return true;
      return "Your email must be valid";
    },
  ],
});

const backToLogin = () => {
  router.removeRoute(router.currentRoute.value.name!);
  StorageHelpers.DestroyLocalStorage();
  router.push("/");
};

const submit = async (event: any) => {
  const validation = await event;
  if (validation.valid) {
    try {
      state.value = FormEnum.SUBMITTING;
      const response = await Api.postUserDetails({ name: form.name, email: form.email });
      if (!response.ok) throw { response };

      state.value = FormEnum.SUBMITTED;
    } catch (error) {
      if (ErrorHelper.isResponseError(error)) RouterHelper.HandleErrorResponse(router, error.response);
      else if (ErrorHelper.isGenericError(error) && error.message == ErrorEnum.NO_TOKEN) router.push("/");
      else router.push(`/error?status=Unknown Error&message=${error}`);
    }
  }
};
</script>

<template>
  <v-container class="fill-height">
    <v-responsive class="d-flex align-center justify-center text-center fill-height">
      <v-sheet elevation="4" color="rgba(0,0,0,0.25)" rounded="xl" class="pa-10 text-center mx-auto" max-width="500">
        <h1 :class="xs ? 'text-h6 font-weight-bold' : 'text-h4 font-weight-bold'">Request Access</h1>

        <div v-if="state !== FormEnum.SUBMITTED" class="w-100 py-5">
          <p class="text-left py-2">Please give your name and the email linked to your spotify account</p>
          <p class="text-left py-2">
            Your linked email can be found in your
            <a href="https://www.spotify.com/account/" target="_blank" class="basic-anchor">spotify account profile</a>
          </p>
        </div>

        <v-form v-if="state == FormEnum.NONE" validate-on="submit" @submit.prevent="submit" class="mt-5">
          <v-text-field v-model="form.name" :rules="formValidation.name" label="Name"></v-text-field>
          <v-text-field v-model="form.email" :rules="formValidation.email" label="Email"></v-text-field>
          <v-btn variant="elevated" color="#cc2396" type="submit" class="mt-2">Submit</v-btn>
        </v-form>

        <div v-if="state == FormEnum.SUBMITTING" class="mt-5">
          <v-progress-circular indeterminate color="purple" :size="50"></v-progress-circular>
        </div>

        <div v-if="state == FormEnum.SUBMITTED" class="mt-5" siz>
          <h2 class="text-h5 font-weight-light">Thank you</h2>
          <p class="text-caption">Your request has been recieved</p>
        </div>

        <v-btn variant="tonal" class="mt-10" @click="backToLogin">Back to login</v-btn>
      </v-sheet>
    </v-responsive>
  </v-container>
</template>

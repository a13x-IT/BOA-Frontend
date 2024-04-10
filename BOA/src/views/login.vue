<script setup lang="ts">
import {
  IonPage,
  IonContent,
  IonButton,
  IonInput,
  toastController,
} from "@ionic/vue";
import { credentials } from "@/services/login/types";
import { API } from "@/services";
import { AxiosError } from "axios";
import router from "@/router";
import { ref } from "vue";
import { Browser } from "@capacitor/browser";

const emailLogin = ref<string>();
const APIKeyLogin = ref<string>();
const emptyFields = ref<boolean>();
const loginFailure = ref<boolean>(false);
const apiSet = ref<boolean>(false);
const testFailure = ref<boolean>(false);

const setCompleteSetupFlag = () => {
  // Set the flag in localStorage when setup is completed
  localStorage.setItem("isSetupComplete", "true");
};
const setAPIKey = (key: string) => {
  localStorage.setItem("APIKey", key);
};

const navigateToHome = () => {
  router.push("/");
};

const naviateToApiKeyHelp = async () => {
  await Browser.open({
    url: "https://capybarra-studios.gitbook.io/reversing-device/common-problems/forgot-api-key",
  });
};
const navigateToEndpointSetupHelp = async () => {
  await Browser.open({
    url: "https://capybarra-studios.gitbook.io/reversing-device/common-problems/where-to-find-ip-and-port",
  });
};
const doLogin = async () => {
  if (emailLogin.value === "" || APIKeyLogin.value === "") {
    emptyFields.value = true;
  } else {
    try {
      const cred: credentials = {
        email: emailLogin.value?.trim() || "",
        apikey: APIKeyLogin.value?.trim() || "",
      };
      const { status } = await API.login.login(cred);
      if (status === 200) {
        setCompleteSetupFlag();
        setAPIKey(cred.apikey);
        navigateToHome();
      }
    } catch (error) {
      const _error = error as AxiosError<string>;
      console.error(_error);
      loginFailure.value = true;
    }
  }
};
const doApiTest = async () => {
  try {
    const { status } = await API.setup.testParameters();
    if (status === 200) {
      apiSet.value = true;
      const toast = toastController.create({
        message: "IP configuration was confirmed",
        duration: 5000,
        position: "bottom",
      });
      (await toast).present();
    } else {
      testFailure.value = true;
    }
  } catch (error) {
    const _error = error as AxiosError;
    console.error(_error);
    testFailure.value = true;
  }
};
</script>
<template>
  <ion-page>
    <ion-content>
      <div class="flex items-center justify-center h-screen pl-2 pr-2">
        <div class="container outline outline-1 rounded-md">
          <div class="row">
            <div class="col-lg-4 col-md-6 col-sm-8 mx-auto p-5">
              <template v-if="apiSet">
                <h1>Log In</h1>
                <div class="pb-1.5">
                  <ion-input
                    v-model="emailLogin"
                    type="email"
                    class="form-control"
                    placeholder="Email"
                    fill="outline"
                    required
                  />
                </div>
                <div class="pb-2">
                  <ion-input
                    v-model="APIKeyLogin"
                    type="text"
                    class="form-control"
                    placeholder="API-Key"
                    fill="outline"
                    required
                  ></ion-input>
                </div>
                <p v-if="loginFailure" class="text-red-600">
                  Invalid Credentials
                </p>
                <ion-button
                  type="submit"
                  @click="doLogin"
                  class="justify-center align-middle text-white"
                  fill="outline"
                  expand="block"
                >
                  Log in
                </ion-button>
                <p
                  @click="naviateToApiKeyHelp"
                  class="underline text-slate-200 pb-3"
                >
                  Forgot your API-Key?
                </p>
              </template>
              <template v-else>
                <h1>Endpoint Confirmation</h1>

                <p v-if="testFailure" class="text-red-600">
                  Incorrect Pi-Config
                </p>
                <ion-button
                  type="submit"
                  @click="doApiTest"
                  class="justify-center align-middle text-white"
                  fill="outline"
                  expand="block"
                >
                  Confirm Configuration
                </ion-button>
                <p
                  @click="navigateToEndpointSetupHelp"
                  class="underline text-slate-200 pb-3"
                >
                  How to access this information?
                </p>
              </template>
            </div>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

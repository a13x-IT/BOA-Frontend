<script setup lang="ts">
import {
  IonPage,
  IonContent,
  IonButton,
  IonItem,
  IonList,
  IonIcon,
  IonToolbar,
  IonTitle,
  IonHeader,
  IonButtons,
  IonBackButton,
} from "@ionic/vue";
import {
  phoneLandscapeOutline,
  phonePortraitOutline,
  swapVerticalOutline,
  sendOutline,
  closeOutline,
} from "ionicons/icons";
import { onBeforeMount, onMounted, onUnmounted, ref } from "vue";
import { ScreenOrientation } from "@capacitor/screen-orientation";
import { API } from "@/services";
import { AxiosError } from "axios";
import { useWebSocket } from "@/composables/useWebsocket";
const sensorAmout = ref();
const { connectWebSocket, closeWebSocket, messages, errors } = useWebSocket(
  localStorage.getItem("WSEndpoint")
);

const forceLandscape = async () => {
  await ScreenOrientation.lock({ orientation: "landscape" });
};
const forcePortrait = async () => {
  await ScreenOrientation.lock({ orientation: "portrait" });
};

const getSensorAmount = async () => {
  try {
    const { status, data } = await API.sensors.getDistanceSingle();
    if (status === 200) {
      sensorAmout.value = data.distance;
    }
  } catch (error) {
    const _error = error as AxiosError<string>;
    console.log(_error);
  }
};
</script>
<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/tabs/config"></ion-back-button>
        </ion-buttons>
        <ion-title>Status & Tests</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <!-- TODO: v0.0.2 Display Status of each sensor (if connected or not)  -->
      <!-- TODO: v0.0.2 Display Status of Licence Server if exists -> Licence Server just local, no global licences Planned -->
      <!-- TODO: Display Status of PI -->

      <ion-list>
        <ion-item>
          Force Landscape Mode
          <ion-button @click="forceLandscape" slot="end" fill="outline">
            <ion-icon
              :icon="phoneLandscapeOutline"
              color="black"
              size="large"
            ></ion-icon
          ></ion-button>
        </ion-item>
        <ion-item>
          Force Portrait Mode
          <ion-button @click="forcePortrait" slot="end" fill="outline">
            <ion-icon
              :icon="phonePortraitOutline"
              color="black"
              size="large"
            ></ion-icon
          ></ion-button>
        </ion-item>
        <!-- FIXME: actual audio test -->
        <!-- <ion-item>
          Play Audio
          <ion-button @click="playAudio" slot="end" fill="outline">
            <ion-icon :icon="musicalNoteOutline" size="large"></ion-icon>
          </ion-button>
        </ion-item> -->
        <ion-item>
          <div class="flex, items-center w-full">
            <div>
              Test-Websocket
              <ion-button @click="connectWebSocket" slot="end" fill="outline">
                <ion-icon :icon="swapVerticalOutline" size="large"></ion-icon>
              </ion-button>

              <ion-button @click="closeWebSocket" slot="end" fill="outline">
                <ion-icon :icon="closeOutline" size="large"></ion-icon>
              </ion-button>
            </div>
            <div v-if="messages.length > 0">
              <h3>Received Messages:</h3>
              <ul>
                <li v-for="(message, index) in messages" :key="index">
                  {{ message.distance }} {{ message.unit }}
                </li>
              </ul>

              <div v-if="errors">
                <h3>Error:</h3>
                <p>{{ errors }}</p>
              </div>
            </div>
          </div>
        </ion-item>

        <ion-item>
          Get Sensors
          <ion-button @click="getSensorAmount" slot="end" fill="outline">
            <ion-icon :icon="swapVerticalOutline" size="large"></ion-icon>
          </ion-button>
        </ion-item>
        <ion-item>
          {{ sensorAmout }}
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

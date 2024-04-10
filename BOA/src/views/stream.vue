<template>
  <ion-page>
    <ion-content class="flex">
      <ion-grid>
        <ion-row class="justify-center align-middle">
          <h1 v-if="toggleStore.getUseStream() === false">Classic Mode</h1>
          <h1 v-if="toggleStore.getUseStream() === true">Video Mode</h1>
        </ion-row>

        <ion-row class="justify-center align-middle">
          <rounded-distance-display
            :distance="min_distance(lastMessage?.distance) || 0"
            :unit="lastMessage?.unit || 'cm'"
            :useAudio="toggleStore.getUseAudio() || false"
          ></rounded-distance-display>
        </ion-row>

        <template v-if="toggleStore.getUseStream() === false">
          <!-- <template> -->
          <ion-row class="justify-center align-middle mt-2">
            <traktor />
          </ion-row>

          <ion-row class="mt-6 justify-center align-middle">
            <distance3 :distance="min_distance(lastMessage?.distance) || 0">
            </distance3>
          </ion-row>
        </template>
        <template v-if="toggleStore.getUseStream() === true">
          <img
            :src="mjpegUrl"
            content-type="multipart/x-mixed-replace; boundary=FRAME"
            class="rounded"
          />
          <ion-button @click="toggleStream">Stooooop</ion-button>
        </template>

        <ion-row class="mt-6 justify-center align-middle">
          <ion-button @click="toggleWebsocket()">Toggle WS</ion-button>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
} from "@ionic/vue";
import RoundedDistanceDisplay from "@/components/RoundedDistanceDisplay.vue";
import Traktor from "@/components/Traktor.vue";
import Distance3 from "@/components/Distance3.vue";
import { useWebSocket } from "@/composables/useWebsocket";

import { useToggleStore } from "@/stores/toggleStore";
const url: URL = new URL("ws://pi.local:8200/sensor/get-distance");
const { connectWebSocket, closeWebSocket, lastMessage, errors } =
  useWebSocket(url);

import { onMounted, ref } from "vue";
import { API } from "@/services";

const toggleStore = useToggleStore();

const webSocketActive = ref(false);
const imageSource = ref<string | null>(null);
const mjpegUrl = ref("http://pi.local:8200/stream/mjpeg");

const toggleStream = () => {
  if (mjpegUrl.value == "http://pi.local:8200/stream/mjpeg") {
    mjpegUrl.value = "http://pi.local:8200/stream/stop";
  } else {
    mjpegUrl.value = "http://pi.local:8200/stream/mjpeg";
  }
};

const toggleWebsocket = () => {
  if (webSocketActive.value) {
    webSocketActive.value = false;
    closeWebSocket();
  } else {
    webSocketActive.value = true;
    connectWebSocket();
  }
};

const min_distance = (arr: number[] | undefined) => {
  if (arr === undefined) {
    return 0;
  }
  return Math.min(...arr);
};
const startStream = async () => {
  try {
    const { status, data } = await API.stream.mjpeg();
    if (status === 200) {
      console.log(data);
      handleFrames(data);
    }
  } catch (error) {
    console.error("Error fetching streaming frames:", error);
  }
};

const handleFrames = (frameData: ArrayBuffer) => {
  const base64Image = btoa(
    new Uint8Array(frameData).reduce(
      (data, byte) => data + String.fromCharCode(byte),
      ""
    )
  );
  imageSource.value = "data:image/jpeg;base64," + base64Image;
};
onMounted(() => {
  // toggleWebsocket();
});
</script>
<style scoped>
.bg-custom {
  background: #0f2027; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #2c5364,
    #203a43,
    #0f2027
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #2c5364,
    #203a43,
    #0f2027
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
</style>

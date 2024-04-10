<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Einstellungen</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-list class="ion-padding">
        <ion-item>
          <ion-toggle
            v-model="useAudio"
            @click="toggleStore.toggleUseAudio()"
            :checked="true"
            >Audio-Alerts</ion-toggle
          >
          <ion-icon :icon="musicalNoteOutline" slot="start"></ion-icon>
        </ion-item>
        <ion-item>
          <ion-toggle
            v-model="useStream"
            @click="toggleStore.toggleUseStream()"
            :checked="false"
            >Stream benutzen</ion-toggle
          >
          <ion-icon :icon="apertureOutline" slot="start"></ion-icon>
        </ion-item>

        <ion-item>
          <ion-toggle @click="toggleExperimental()"
            >Experimentelle Einstellungen</ion-toggle
          >
          <ion-icon :icon="sparklesOutline" slot="start"></ion-icon>
        </ion-item>

        <ion-item v-if="experimentalsettings == false">
          <ion-grid>
            <ion-row>
              <!-- <ion-col>
                <ion-input
                  label="Entfernung in cm"
                  label-placement="stacked"
                  placeholder="200"
                  v-model="referenceVal"
                  class="w-3/4"
                >
                </ion-input>
              </ion-col>
              <ion-col size="auto" class="align-middle justify-center">
                <ion-button @click="handleSubmit" fill="clear" id="openToast"
                  ><ion-icon :icon="saveOutline"></ion-icon
                ></ion-button>
              </ion-col> -->
            </ion-row>

            <ion-row>
              <ion-toggle
                @click="toggleSensorSmoothing()"
                v-model="smoothingAlgorithm"
                :checked="true"
                >Glättung Sensordaten
              </ion-toggle>
              <ion-icon :icon="statsChartOutline" slot="start"></ion-icon>
            </ion-row>
          </ion-grid>
        </ion-item>

        <ion-item @click="navigateToStatus">
          Systemstatus und Testing
          <ion-icon :icon="pulseOutline" slot="start"></ion-icon>
          <ion-icon :icon="chevronForwardOutline" slot="end"></ion-icon>
        </ion-item>

        <ion-item @click="navigateToDocumentation">
          Online Handbuch
          <ion-icon :icon="informationCircleOutline" slot="start"></ion-icon>

          <ion-icon :icon="openOutline" slot="end"></ion-icon>
        </ion-item>
        <!-- TODO: v0.0.2 change to Component-->
        <ion-item @click="logOut">
          Log Out <ion-icon :icon="logOutOutline" slot="start"></ion-icon>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonContent,
  IonInput,
  IonButton,
  IonList,
  IonItem,
  IonIcon,
  IonToggle,
  IonToolbar,
  IonTitle,
  IonHeader,
  IonGrid,
  IonRow,
  IonCol,
  toastController,
} from "@ionic/vue";
import {
  saveOutline,
  musicalNoteOutline,
  pulseOutline,
  apertureOutline,
  chevronForwardOutline,
  informationCircleOutline,
  sparklesOutline,
  statsChartOutline,
  flask,
  openOutline,
  swapVerticalOutline,
  logOutOutline,
} from "ionicons/icons";
import { ref } from "vue";
import { useToggleStore } from "@/stores/toggleStore";
import { useSmoothingStore } from "@/stores/dataSmoothingStore";
import { useRouter } from "vue-router";
import { Browser } from "@capacitor/browser";
import { API } from "@/services";
import { AxiosError } from "axios";
import { Correction } from "@/services/setup/types";

const toggleStore = useToggleStore();
const smoothingStore = useSmoothingStore();
const router = useRouter();

const { useStream, useAudio } = toggleStore;
const { smoothingAlgorithm } = smoothingStore;
const referenceVal = ref<number>();
const experimentalsettings = ref(true);

const handleSubmit = async () => {
  //Depricated
  if (referenceVal.value) {
    try {
      const corr: Correction = { measured_distance_cm: referenceVal.value };
      const { status } = await API.setup.setCorrection(corr);
      if (status === 200) {
        const toast = toastController.create({
          message: "Correction Distance updated",
          duration: 5000,
          position: "bottom",
        });
        (await toast).present();
      }
    } catch (error) {
      const _error = error as AxiosError;
      console.error(_error);
      const toast = toastController.create({
        message: "Error in Correction Distance input",
        duration: 5000,
        position: "bottom",
      });
      (await toast).present();
    }
    referenceVal.value = 0;
  }
};

const navigateToStatus = () => {
  router.push("/status");
};
const navigateToDocumentation = async () => {
  await Browser.open({
    url: "https://capybarra-studios.gitbook.io/reversing-device/",
  });
};
const toggleExperimental = () => {
  experimentalsettings.value = !experimentalsettings.value;
};
const toggleSensorSmoothing = () => {
  smoothingStore.toggleSmoothingalgorithm();
};
const logOut = () => {
  localStorage.clear();
  window.location.reload();
};
</script>

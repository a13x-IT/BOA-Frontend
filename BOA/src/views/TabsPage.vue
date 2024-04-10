<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button
          tab="stream"
          @click="setOrientation"
          href="/tabs/stream"
        >
          <ion-icon aria-hidden="true" :icon="videocamOutline" />
          <ion-label>Stream</ion-label>
        </ion-tab-button>

        <ion-tab-button
          tab="config"
          @click="ScreenOrientation.lock({ orientation: 'portrait' })"
          href="/tabs/config"
        >
          <ion-icon aria-hidden="true" :icon="settingsOutline" />
          <ion-label>Config</ion-label>
        </ion-tab-button>

        <!-- <ion-tab-button
          tab="logs"
          @click="ScreenOrientation.lock({ orientation: 'portrait' })"
          href="/tabs/logs"
        >
          <ion-icon aria-hidden="true" :icon="fileTrayStackedOutline" />
          <ion-label>Logs</ion-label>
        </ion-tab-button> -->
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonLabel,
  IonIcon,
  IonPage,
  IonRouterOutlet,
} from "@ionic/vue";
import {
  fileTrayStackedOutline,
  settingsOutline,
  videocamOutline,
} from "ionicons/icons";
import { ScreenOrientation } from "@capacitor/screen-orientation";
import { useToggleStore } from "@/stores/toggleStore";

const toggleStore = useToggleStore();
const setOrientation = async () => {
  if (toggleStore.getUseStream() === true) {
    await ScreenOrientation.lock({ orientation: "landscape" });
  } else {
    await ScreenOrientation.lock({ orientation: "portrait" });
  }
};
</script>

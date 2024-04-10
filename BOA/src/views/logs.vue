<template>
  <ion-page>
    <ion-content>
      <template v-for="log of logs" :key="log.id">
        <logentry :title="log.title" :content="log.content"></logentry>
      </template>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from "@ionic/vue";
import logentry from "@/components/logentry.vue";
import { ref } from "vue";

type log = {
  id: number;
  title: string;
  content: string;
};

const logs = ref<log[]>([
  { id: 0, title: "Title test", content: "test" },
  { id: 1, title: "test 2", content: "more test" },
]);
</script>

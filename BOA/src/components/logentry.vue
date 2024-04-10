<template>
  <ion-card class="ion-padding">
    <ion-card-title>{{ title }}</ion-card-title>
    <ion-card-content>{{ content }}</ion-card-content>
  </ion-card>
</template>

<script setup lang="ts">
import { IonCard, IonCardTitle, IonCardContent } from "@ionic/vue";

const prop = defineProps({ title: String, content: String });
</script>

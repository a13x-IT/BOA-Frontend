<script setup lang="ts">
import { IonChip } from "@ionic/vue";
import { watch } from "vue";
import { useAudio } from "@/composables/useAudio";
//Variables for changing the sound of the "pieps"
const baseFrequency = 200; // Adjust this value as needed
const maxDistance = 100; // Maximum distance for minimal frequency
const multiplier = 5;

const props = defineProps({
  distance: Number,
  unit: String,
  useAudio: Boolean,
});

const audio = useAudio(maxDistance, baseFrequency, multiplier);

watch(
  () => props.distance,
  () => {
    if (props.useAudio) {
      audio.playSound(props.distance || maxDistance + 1);
    }
  }
);
</script>
<style scoped>
[size="large"] {
  height: 50px;
  padding: 25px;
  border-radius: 25px;
  font-size: xx-large;
  z-index: 10;
}
</style>
<template>
  <ion-chip color="primary" size="large">
    <p>{{ props.distance }} {{ props.unit }}</p>
  </ion-chip>
</template>

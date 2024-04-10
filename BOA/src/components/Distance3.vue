<template>
  <svg
    width="227"
    height="92"
    viewBox="0 0 227 92"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M26 14.0044C26 14.0021 26 14 30 14C34 14 34 13.9983 34 13.9967L34 13.9945L34.0001 14.0037C34.0002 14.0162 34.0004 14.04 34.0009 14.0745C34.002 14.1436 34.0044 14.2559 34.0093 14.4086C34.0193 14.7139 34.0398 15.1799 34.082 15.7834C34.1666 16.9918 34.3374 18.7435 34.6821 20.8557C35.3747 25.0995 36.7523 30.6952 39.4676 36.2411C42.176 41.7733 46.1718 47.1715 52.0793 51.1936C57.9575 55.1958 65.9674 58 77 58V66C64.5326 66 54.9175 62.8042 47.577 57.8064C40.2657 52.8285 35.449 46.2267 32.2824 39.7588C29.1227 33.3048 27.5628 26.9005 26.7866 22.1443C26.3969 19.7565 26.2006 17.7582 26.1015 16.3416C26.052 15.6326 26.0266 15.0673 26.0136 14.6695C26.0071 14.4706 26.0037 14.3134 26.0019 14.2009C26.001 14.1446 26.0006 14.0995 26.0003 14.0659L26.0001 14.0242L26 14.0099L26 14.0044Z"
      :fill="colorInner"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M200 14.0044C200 14.0021 200 14 196 14C192 14 192 13.9983 192 13.9967L192 13.9945L192 14.0037C192 14.0162 192 14.04 191.999 14.0745C191.998 14.1436 191.996 14.2559 191.991 14.4086C191.981 14.7139 191.96 15.1799 191.918 15.7834C191.833 16.9918 191.663 18.7435 191.318 20.8557C190.625 25.0995 189.248 30.6952 186.532 36.2411C183.824 41.7733 179.828 47.1715 173.921 51.1936C168.042 55.1958 160.033 58 149 58V66C161.467 66 171.083 62.8042 178.423 57.8064C185.734 52.8285 190.551 46.2267 193.718 39.7588C196.877 33.3048 198.437 26.9005 199.213 22.1443C199.603 19.7565 199.799 17.7582 199.898 16.3416C199.948 15.6326 199.973 15.0673 199.986 14.6695C199.993 14.4706 199.996 14.3134 199.998 14.2009C199.999 14.1446 199.999 14.0995 200 14.0659L200 14.0242L200 14.0099L200 14.0044Z"
      :fill="colorInner"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M140 66H87V58H140V66Z"
      :fill="colorInner"
    />
    <path d="M87 75H140" :stroke="colorMiddle" stroke-width="8" />
    <path
      d="M78 74C18 72.75 18 14 18 14"
      :stroke="colorMiddle"
      stroke-width="8"
    />
    <path
      d="M149 74C209 72.75 209 14 209 14"
      :stroke="colorMiddle"
      stroke-width="8"
    />
    <path d="M87 88L140 88" :stroke="colorOuter" stroke-width="8" />
    <path
      d="M150 88C223 86.4583 223 14 223 14"
      :stroke="colorOuter"
      stroke-width="8"
    />
    <path
      d="M78 88C3.99998 86.4583 4 14 4 14"
      :stroke="colorOuter"
      stroke-width="8"
    />
  </svg>
</template>
<script setup lang="ts">
import { onMounted, ref, watch } from "vue";

// TODO: v0.0.2 Change from hex to proper colors
const colorInner = ref<string>("#737373");
const colorMiddle = ref<string>("#737373");
const colorOuter = ref<string>("#737373");

//TODO v0.0.2 change to array --> change Graphics depending on amount of sensors
const props = defineProps({
  distance: Number,
});

const setColour = () => {
  if (props.distance >= 100) {
    // console.log("Greater than 100");
    colorInner.value = "#737373";
    colorMiddle.value = "#737373";
    colorOuter.value = "#737373";
  } else if (props.distance > 50) {
    // console.log("Greater than 50");
    colorInner.value = "#737373";
    colorMiddle.value = "#737373";
    colorOuter.value = "white";
  } else if (props.distance <= 50 && props.distance > 20) {
    // console.log("Greater than 50 and smaller 20");
    colorInner.value = "#737373";
    colorMiddle.value = "white";
    colorOuter.value = "white";
    // far_away.play();
  } else if (props.distance <= 20) {
    // console.log("Smaller than 20");
    colorInner.value = "red";
    colorMiddle.value = "#737373";
    colorOuter.value = "#737373";
    // middle_away.play();
  }
};

onMounted(() => {
  // console.log(props.distance);
  setColour();
});
watch(
  () => props.distance,
  () => {
    setColour();
  }
);
</script>

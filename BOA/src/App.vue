<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script setup lang="ts">
import { IonApp, IonRouterOutlet } from "@ionic/vue";
import router from "./router";

const navigateToHome = () => {
  router.push("/");
};

const navigateToLogin = () => {
  router.push("/login");
};

const checkFirstTimeUser = () => {
  // Retrieve the flag from localStorage
  const isSetupComplete = localStorage.getItem("isSetupComplete");

  if (isSetupComplete === "true") {
    // The setup has been completed, proceed to the main app
    navigateToHome();
  } else {
    // The setup is not completed, show the setup page
    navigateToLogin();
  }
};

// Call this function when the app component is initialized
checkFirstTimeUser();
</script>

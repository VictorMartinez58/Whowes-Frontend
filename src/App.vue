<template>
  <div id="app">
    <HeaderComponent />
    <slider />
    <router-view />

    <FooterComponent />
  </div>
</template>

<script>
import HeaderComponent from "./components/HeaderComponent.vue";
import FooterComponent from "./components/FooterComponent.vue";
import Slider from "./components/Slider.vue";

export default {
  name: "App",
  components: {
    HeaderComponent,
    FooterComponent,
    Slider
  }
};
</script>

<style>
@import "./assets/css/styles.css";
</style>

<template>
  <div id="app">
    <HeaderComponent v-bind:user='user' />

    <router-view v-on:iscoming="gotUser" />

    <FooterComponent />
  </div>
</template>

<script>
import HeaderComponent from "./components/HeaderComponent.vue";
import FooterComponent from "./components/FooterComponent.vue";

export default {
  name: "App",
  components: {
    HeaderComponent,
    FooterComponent
  },
  data(){
    return {
      user: {}
    }
  },
  methods: {
    gotUser(usu){
      this.user = usu;
    }
  },
  updated(){
    alert("UPDATED")
  }
};
</script>

<style>
@import "./assets/css/styles.css";
</style>

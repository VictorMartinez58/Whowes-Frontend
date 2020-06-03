<template>
  <div id="app">
    <HeaderComponent v-bind:isLogged='isLogged' v-bind:user='user' v-on:logout="logUserOut" />

    <router-view v-on:iscoming="gotUser" v-bind:user='user' />

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
      user: {},
      isLogged: false,
    }
  },
  methods: {
    gotUser(usu){
      this.user = usu;
    },
    logUserOut(){
       localStorage.removeItem("jwt");
       this.user = null;
    },
  },
  updated(){
    if (this.user != null){
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }
};
</script>

<style>
@import "./assets/css/styles.css";
</style>

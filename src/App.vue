<template>
  <div id="app">
    <HeaderComponent v-bind:isLogged="isLogged" v-bind:user="user" v-on:logout="logUserOut" />

    <router-view v-on:iscoming="gotUser" v-bind:user="user" />
    

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
  data() {
    return {
      user: {},
      isLogged: false
    };
  },
  methods: {
    /* get user from Login component */
    gotUser(usu){
      this.user = usu;
    },
    /* get event from header component*/
    logUserOut() {
      localStorage.removeItem("jwt");
      this.user = false;
    },
    checkUser() {
      if (this.user && this.user != false) {
        this.isLogged = true;
      } else {
        this.isLogged = false;
      }
    }
  },
  created(){
    this.checkUser();
  },
  updated() {
    this.checkUser();
  }
};
</script>

<style>
@import "./assets/css/styles.css";
</style>

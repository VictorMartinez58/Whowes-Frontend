<template>
  <header id="header">
    <div class="center">
      <!-- LOGO -->
      <div id="logo">
        <img src="../assets/images/logo.png" class="app-logo" alt="Logotipo" />
        <strong>Wh</strong>
        <span>O</span>wes
      </div>

      <!-- MENU -->
      <nav id="menu">
        <ul>
          <li>
            <router-link to="/home" active-class="active">Home</router-link>
          </li>
          <li v-if="!isLogged">
            <router-link to="/login" active-class="active">Login</router-link>/
            <router-link to="/register" active-class="active">Register</router-link>
          </li>
          <template v-else>
            <li>
              <router-link to="/user-details" v-if="user" active-class="active">{{user.name}}</router-link>
            </li>
            <li>
              <router-link to="/login">
                <span @click="emitLogUserOut">Logout</span>
              </router-link>
            </li>
          </template>
        </ul>
      </nav>

      <!--LIMPIAR FLOTADOS-->
      <div class="clearfix"></div>
    </div>
  </header>
</template>

<script>
export default {
  name: "HeaderComponent",
  props: ["isLogged", "user"],
  data() {
    return {};
  },
  methods: {
    /* Creates an event to logout from the father component */
    emitLogUserOut() {
      this.$emit("logout");
    }
  }
};
</script>

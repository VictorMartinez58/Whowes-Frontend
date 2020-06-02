<template>
  <header id="header">
    <div class="center">
      <!-- LOGO -->
      <div id="logo">
        <img src="../assets/images/logo.png" class="app-logo" alt="Logotipo" />
        <strong>Wh</strong><span>O</span>wes
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
              <router-link to="/Login" active-class="active">{{user.name}}</router-link>
            </li>
            <li>
              <router-link to="/login">
                <span @click="logUserOut">Logout</span>
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
  props: ['user'],
  data() {
    return {
      isLogged: null
    }
  },
  methods: {
    logUserOut() {
      localStorage.removeItem("jwt");
      this.isLogged=false;
      this.user = null;
    }
  },
  mounted(){
    if (this.user){
      alert(this.user);
      this.isLogged = true;
    } else {
      alert("no hay usuario")
    }
  }
};
</script>

<template>
  <div>
    <Slider text="Please Login before starting" />
    <div class="container">
      <div class="row">
        <div class="col-lg-6 offset-lg-3 col-sm-10 offset-sm-1">
          <form
            class="text-center border border-primary p-5"
            style="margin-top:70px;height:auto;padding-top:100px !important;"
            @submit.prevent="loginUser"
          >
            <input
              type="text"
              id="email"
              class="form-control mb-5"
              placeholder="Email"
              v-model="login.email"
            />
            <!-- Password -->
            <input
              type="password"
              id="password"
              class="form-control mb-5"
              placeholder="Password"
              v-model="login.password"
            />
            <p>
              Dont have an account??
              <router-link to="/register">click here</router-link>
            </p>
            <!-- Sign in button -->
            <center>
              <button class="btn btn-primary btn-block w-75 my-4" type="submit">Sign in</button>
            </center>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import VueJwtDecode from "vue-jwt-decode";
import Slider from "../Slider";
import Global from "../../Global";

export default {
  name: "Login",
  props: ["senduser"],
  components: {
    Slider
  },
  data() {
    return {
      login: {
        email: "",
        password: ""
      },
      user: {},
      url: Global.url,
    };
  },
  methods: {
    async loginUser() {
      try {
        let response = await this.$http.post(this.url+"user/login", this.login);
        let token = response.data.token;
        localStorage.setItem("jwt", token);
        if (token) {
          this.$swal("Success", "Login Successful", "success");
          this.getUserDetails();
          this.sendUserToFather(this.user);
          this.$router.push("/home");
        }
      } catch (err) {
        this.$swal(
          "Error",
          "Incorrect Email or Password,  please check them again.",
          "error"
        );
        console.log(err.response);
      }
    },
    getUserDetails() {
      let token = localStorage.getItem("jwt");
      let decoded = VueJwtDecode.decode(token);
      this.user = decoded;
    },
    sendUserToFather(usu) {
      this.$emit("iscoming", usu);
    }
  },
  created() {
    localStorage.removeItem("jwt");
    this.user = false;
    this.sendUserToFather(this.user);
  }
};
</script>
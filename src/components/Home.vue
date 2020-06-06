<template>
  <div>
    <Slider text="Home" />

    <section v-if="results.length > 0 ">
      <router-link to="/results-create">
        <button class="btn btn-primary floatingright mt-5">Add NEW</button>
      </router-link>

      <div class="clearfix"></div>

      <div class="container">
        <ul type="none" class="home">
          <h3 class="adapt">My bills:</h3>

          <li
            v-for="(x,i) in results"
            :key="i"
            class="border border-primary rounded p-3 m-3 text-center"
            :class="{
              'alert-danger': x.closed == true,
              'alert-success': x.closed != true,
            }"
          >
            <router-link :to="{name: 'show', params: { id: x._id }}">
              <div>
                <h6>{{ x.title }}</h6>
              </div>
            </router-link>
          </li>
        </ul>
      </div>
    </section>

    <section v-else>
      <div class="container mt-5">
      <h3 class="adapt">You don't have any Bill yet.</h3>
      <router-link to="/results-create">
        <h5 class="ml-5">Create your first right now</h5>
      </router-link>
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";
import Global from "../Global";

import Slider from "./Slider";

export default {
  name: "Home",
  props: ["user"],

  components: {
    Slider
  },
  data() {
    return {
      url: Global.url,
      results: []
    };
  },
  methods: {
    getResults() {
      axios
        .get(this.url + "result/results-user/" + this.user._id, {
          headers: { Authorization: "Bearer " + localStorage.getItem("jwt") }
        })
        .then(res => {
          if (res.data.status == "success") {
            this.results = res.data.results;
          }
        });
    }
  },
  mounted() {
    this.getResults();
  }
};
</script>

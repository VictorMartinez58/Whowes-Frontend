<template>
  <div>
      <Slider text="Home" />
    
    <section>
      <div class="container mt-5">

     <router-link to="/results-create"> <button class="btn btn-primary">+</button></router-link>


        <ul v-if="results.length > 0 " class="home"><li v-for="(x,i) in results" :key="i"> <router-link :to="{name: 'show', params: { id: x._id }}" >  {{ x.title }}{{  x._id }} </router-link> </li></ul>
        <p v-else> empty</p>
      </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios';
import Global from '../Global';


import Slider from "./Slider";

export default {
  name: "Home",
  props: ['user'],
  
  components: {
      Slider
  },
  data() {
    return { 
      url: Global.url,
      results: [],
    };
  },
  methods: {
    getResults(){
      axios.get(this.url+"result/results-user/"+this.user._id,
       { headers: { 'Authorization': 'Bearer ' + localStorage.getItem("jwt") } }).then(res => {
        if(res.data.status == "success"){
          this.results = res.data.results;
        }
      });
    }
  },
  mounted(){
    this.getResults();
  }
};
</script>

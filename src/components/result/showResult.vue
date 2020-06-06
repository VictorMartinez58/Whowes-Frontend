<template>
  <div>
    <Slider :text="result.title" />

    <section>
      <div class="container mt-5">
        <h6>{{result.totalPrice }}</h6>
        <ul>
          <li v-for="(x,i) in result.products" :key="i">{{ x }}</li>
        </ul>

        <ul>
          <li v-for="(x,i) in aux" :key="i">{{ x.name }}, con valor de {{ x.price }}€ a pagar entre <strong v-for=" (z,i) in x.toPayBetween" :key="i">  {{ z }}  </strong> </li>
        </ul>

      </div>
    </section>
  </div>
</template>



<script>
import axios from "axios";
import Global from "../../Global";

import Slider from "../Slider";

export default {
  name: "Show",
  props: ["user", "id"],

  components: {
    Slider
  },
  data() {
    return {
      url: Global.url,
      result: [],
      aux: []
    };
  },
  methods: {
    getResult(id) {
      axios
        .get(this.url + "result/result/" + id, {
          headers: { Authorization: "Bearer " + localStorage.getItem("jwt") }
        })
        .then(res => {
          if (res.data.status == "success") {
            this.result = res.data.result;

        this.result.products.forEach(x => {
          this.aux.push(JSON.parse(x));
        });

          }
        });
    },
    parseProducts() {
      //TODO
        var testigo = false;
      do {

      
      if (this.result.length > 0) {
          testigo = true;
        this.aux = [];
        this.result.products.forEach(x => {
          this.aux.push(JSON.parse(x));
        });
        console.log(this.aux);
        console.log(this.result);
      } 
      } while(testigo)

      
    }
  },
  created() {
    var id = this.$route.params.id;
    this.getResult(id);
  },
  mounted() {
    this.parseProducts();
  }
};
</script>

<template>
  <div>
    <Slider :text="result.title" />

    <section>
      <div class="container mt-5">
        <table class="alert alert-secondary table-striped rounded showResults">
          <thead class="alert-primary">
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>to Pay Between</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(x,i) in productsArray" :key="i">
              <td>{{ x.name }}</td>
              <td>{{ x.price }}€</td>
              <td>
                <ul type="none">
                  <li v-for=" (z,i) in x.toPayBetween" :key="i">{{ z }}</li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>

        <div class="alert alert-primary">
          <h6>Total Price: {{ result.totalPrice }} €</h6>
          <ul class="px-5">
            <li v-for="(x,i) in usersArray" :key="i">{{ x.name }} {{ x.amountToPay }} €</li>
          </ul>
        </div>
      </div>

      <button class="btn bg-danger floatingright" @click="deleteResult(iid)">DELETE</button>
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
      productsArray: [],
      usersArray: [],
      iid: this.$route.params.id
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
              this.productsArray.push(JSON.parse(x));
            });

            this.result.users.forEach(x => {
              this.usersArray.push(JSON.parse(x));
            });
          }
        });
    },

    deleteResult(id) {
      this.$swal({
        title: "Are you sure?",
        text:
          "Once deleted, you will not be able to recover this imaginary file!",
        icon: "warning",
        buttons: true,
        dangerMode: true
      }).then(willDelete => {
        if (willDelete) {
          axios
            .delete(this.url + "result/result/" + id, {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("jwt")
              }
            })
            .then(() => {
              this.$swal("Success", "Deleted Successfully", "success");
              this.$router.push("/home");
            });
        } else {
          this.$swal("Operation Canceled");
        }
      });
    }
  },

  created() {
    this.getResult(this.iid);
  },
  mounted() {}
};
</script>

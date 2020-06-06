<template>
  <div>
    <Slider text="Create" />

    <form class="container mt-5" v-on:submit.prevent="save()">
      <h2>
        Set Title:
        <input
          type="text"
          v-model="resultToSave.title"
          v-on:keydown.enter.prevent
          required
        />
      </h2>

      <p>
        Add Users:
        <input type="text" v-model="newName" v-on:keydown.enter.prevent="addUser" />
        <button @click.prevent="addUser">+</button>
      </p>

      <!-- ADD PRODUCTS -->
      <template v-if="users.length > 0">
        <div class="alert alert-success container mt-5">
          <p>
            Add Product:
            <input v-on:keydown.enter.prevent type="text" v-model="newProduct" />
            <input v-on:keydown.enter.prevent type="number" v-model="newPrice" /> €
          </p>
          <ul>
            <p>To Pay between</p>
            <li v-for="(x,i) in users" :key="i">
              <input
                v-model="topay"
                v-bind:value="x.name"
                type="checkbox"
                v-on:keydown.enter.prevent
              />
              {{ x.name }}
              <button
                v-on:click.prevent="removeUser(i)"
                class="btn-danger"
              >🗑️</button>
            </li>
          </ul>
          <button @click.prevent="addProduct" v-bind:disabled="!restrictBtn()">Add Product</button>
        </div>
      </template>

      <template v-else>
        <h6>Please add some users before adding products</h6>
      </template>

      <template v-if="products.length > 0">
        <div class="alert alert-secondary">
          <h6>Product List:</h6>
          <ul>
            <li v-for="(x,i) in products" :key="i">
              {{ x.name }} {{ x.price }} {{ x.toPayBetween }}
              <button
                v-on:click.prevent="removeProduct(i)"
                class="btn-danger"
              >🗑️</button>
            </li>
          </ul>
        </div>
      </template>

      <template v-if="products.length > 0">
        <div class="alert alert-primary">
          <h6>Result List:</h6>
          <ul>
            <li>
              <h6>Total Price {{ totalPrice }} €</h6>
            </li>
            <li v-for="(x,i) in users" :key="i">{{ x.name }} {{ x.amountToPay }}€</li>
          </ul>
        </div>
      </template>
      <button class="btn btn-danger" @click.prevent="reset">RESET</button>
      <input type="submit" value="Save" class="btn btn-primary" />
    </form>
  </div>
</template>

<script>
import Slider from "../Slider";
import axios from "axios";
import Global from "../../Global";
import Result from "../../models/Result";

export default {
  name: "Create",
  components: {
    Slider
  },
  props: ["user"],
  data() {
    return {
      resultToSave: new Result("", "", "", [], []),

      url: Global.url,

      users: [],
      products: [],
      productsStringified: [],
      usersStringified: [],

      newName: "",
      newProduct: "",
      newPrice: 0,
      totalPrice: 0,
      topay: [],
      submitted: false,
      ableToSave: false,
      firstTime: true
    };
  },
  methods: {
    reset() {
      this.$swal({
        title: "Are you sure to Reset?",
        icon: "warning",
        buttons: true,
        dangerMode: true
      }).then(willDelete => {
        if (willDelete) {
          this.users = [];
          this.products = [];
          this.$swal("Reset Successfully!", {
            icon: "success"
          });
        } else {
          this.$swal("operation cancelled!");
        }
      });
    },
    addUser() {
      this.users.push({ name: this.newName, amountToPay: 0 });
    },

    addProduct() {
      var save = this.topay.slice(0, this.topay.length);
      this.products.push({
        name: this.newProduct,
        price: this.newPrice,
        toPayBetween: save
      });
      this.getAmountEachUser();
      this.stringifyArrays();
    },
    restrictBtn() {
      if (
        this.newProduct != "" &&
        this.newPrice != "" &&
        this.topay.length > 0
      ) {
        return true;
      }
    },
    removeUser(i) {
      if (!this.topay.includes(this.users[i].name)) {
        this.$swal({
          title: "Are you sure?",
          text: "Deleting an user will delete all the products",
          icon: "warning",
          buttons: true,
          dangerMode: true
        }).then(willDelete => {
          if (willDelete) {
            this.users.splice(i, 1);
            this.products = [];

            this.$swal("Product Removed Successfully!", {
              icon: "success"
            });
          } else {
            this.$swal("Operation Cancelled!");
          }
        });
      } else {
        this.$swal("Error", "Please, Uncheck the user before delete", "error");
      }
    },
    removeProduct(i) {
      this.$swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this product!",
        icon: "warning",
        buttons: true,
        dangerMode: true
      }).then(willDelete => {
        if (willDelete) {
          this.products.splice(i, 1);
          this.getAmountEachUser();

          this.$swal("Product Removed Successfully!", {
            icon: "success"
          });
        } else {
          this.$swal("Operation Cancelled!");
        }
      });
    },
    clearAmountEachUser() {
      this.users.forEach(x => {
        x.amountToPay = 0;
      });
    },
    getAmountEachUser() {
      this.clearAmountEachUser();

      var amount = 0;
      var total = 0;

      this.products.forEach(product => {
        amount = product.price / product.toPayBetween.length;
        total += parseInt(product.price, 10);

        this.users.forEach(user => {
          if (product.toPayBetween.includes(user.name)) {
            user.amountToPay += amount;
          }
        });
      });
      this.totalPrice = total;

      if (this.products.length > 0) {
        this.ableToSave = true;
      } else {
        this.ableToSave = false;
      }
    },
    stringifyArrays() {
      this.productsStringified = [];
      this.usersStringified = [];

      this.products.forEach(x => {
        this.productsStringified.push(JSON.stringify(x));
      });

      this.users.forEach(x => {
        this.usersStringified.push(JSON.stringify(x));
      });
    },
    save() {
      if (this.ableToSave) {
        this.getAmountEachUser();

        this.resultToSave.user_id = this.user._id;
        this.resultToSave.totalPrice = this.totalPrice;
        this.resultToSave.products = this.productsStringified;
        this.resultToSave.users = this.usersStringified;

        axios
          .post(this.url + "result/save", this.resultToSave, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("jwt")
            }
          })
          .then(response => {
            if (response.data.status == "success") {
              this.$swal("Success", "Created Successfully", "success");
            }
          })
          .catch(error => {
            this.$swal("Error", "Something went wrong", error);
          });
      } else {
        this.$swal("Error", "Need at least one product to save", "error");
      }
    }
  },
  computed: {},
  mounted() {}
};
</script>
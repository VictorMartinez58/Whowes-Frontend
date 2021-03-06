<template>
  <div>
    <Slider text="Edit" />
    <div class="container mt-3">
      <router-link :to="'/results-show/'+iid" class="btn btn-primary">🠘</router-link>

      <form
        class="container mt-3 mb-5 form-group alert-dark border border-primary p-1 rounded"
        v-on:submit.prevent="save(iid)"
      >
        <h2>
          Set Title:
          <input
            type="text"
            v-model="resultToSave.title"
            v-on:keydown.enter.prevent
            required
          />
        </h2>

        <div class="container mt-5 mb-5">
          <p>
            Add Users:
            <input type="text" v-model="newName" v-on:keydown.enter.prevent="addUser" />
            <button class="alert-primary" @click.prevent="addUser">+</button>
          </p>
        </div>

        <!-- ADD PRODUCTS -->
        <template v-if="users.length > 0">
          <div class="alert alert-success container mt-5">
            Add Product:
            <input v-on:keydown.enter.prevent type="text" v-model="newProduct" />
            <input v-on:keydown.enter.prevent type="number" v-model="newPrice" />
            €
            <ul>
              <p>To Pay between:</p>
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
                  class="alert-danger rounded"
                >🗑️</button>
              </li>
            </ul>
            <button
              class="btn alert-primary"
              @click.prevent="addProduct"
              v-bind:disabled="!restrictBtn()"
            >Add Product</button>
          </div>
        </template>

        <template v-else>
          <h6>Please add some users before adding products</h6>
        </template>

        <template v-if="products.length > 0">
          <table class="alert alert-secondary table-striped rounded showResults">
            <thead class="alert-primary">
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>to Pay Between</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(x,i) in products" :key="i">
                <td>{{ x.name }}</td>
                <td>{{ x.price }}€</td>
                <td>
                  <ul type="none">
                    <li v-for=" (z,i) in x.toPayBetween" :key="i">{{ z }}</li>
                  </ul>
                </td>
                <td>
                  <button v-on:click.prevent="removeProduct(i)" class="alert-danger rounded">🗑️</button>
                </td>
              </tr>
            </tbody>
          </table>
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
          <input type="submit" value="SAVE" class="btn btn-primary floatingrightextra" />
        
      </form>
    </div>
  </div>
</template>

<script>
import Slider from "../Slider";
import axios from "axios";
import Global from "../../Global";
import Result from "../../models/Result";

export default {
  name: "Edit",
  components: {
    Slider
  },
  props: ["user", "id"],
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
      iid: this.$route.params.id
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
      if (this.newName != "") {
        this.users.push({ name: this.newName, amountToPay: 0 });
      }
    },

    addProduct() {
      var save = this.topay.slice(0, this.topay.length);
      this.products.push({
        name: this.newProduct,
        price: this.newPrice,
        toPayBetween: save
      });
      this.getAmountEachUser();
      this.newPrice = 0;
      this.newProduct = "";
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
        total += parseFloat(product.price, 10);

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
      this.stringifyArrays();
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
    save(id) {
      if (this.ableToSave) {
        this.getAmountEachUser();

        this.resultToSave.user_id = this.user._id;
        this.resultToSave.totalPrice = this.totalPrice;
        this.resultToSave.products = this.productsStringified;
        this.resultToSave.users = this.usersStringified;

        axios
          .put(this.url + "result/result-update/" + id, this.resultToSave, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("jwt")
            }
          })
          .then(response => {
            if (response.data.status == "success") {
              this.$swal("Success", "Created Successfully", "success");
              this.$router.push("/results-show/" + id);
            }
          })
          .catch(error => {
            this.$swal("Error", "Something went wrong" + error, "error");
          });
      } else {
        this.$swal("Error", "Need at least one product to save", "error");
      }
    },
    getResult(id) {
      axios
        .get(this.url + "result/result/" + id, {
          headers: { Authorization: "Bearer " + localStorage.getItem("jwt") }
        })
        .then(res => {
          if (res.data.status == "success") {
            this.result = res.data.result;
            this.resultToSave.title = res.data.result.title;

            this.result.products.forEach(x => {
              this.products.push(JSON.parse(x));
            });

            this.result.users.forEach(x => {
              this.users.push(JSON.parse(x));
            });

            this.ableToSave = true;
            this.stringifyArrays();
          }
        });
    }
  },
  computed: {},
  mounted() {
    this.getResult(this.iid);
  }
};
</script>
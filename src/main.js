import Vue from 'vue';
import App from './App.vue';
import router from './router';
import Vuelidate from 'vuelidate';
import VueSwal from 'vue-swal';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";


Vue.config.productionTip = false

Vue.use(Vuelidate);
Vue.use(VueSwal);

const base = axios.create({
  baseURL: "http://localhost:5858"
});
Vue.prototype.$http = base;


new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

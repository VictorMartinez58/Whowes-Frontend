import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import Vuelidate from 'vuelidate';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import VueSwal from 'vue-swal';


import Login from './components/auth/login.vue';
import Register from './components/auth/register.vue';

Vue.config.productionTip = false

Vue.use(VueRouter);
Vue.use(Vuelidate);
Vue.use(VueSwal);

const routes = [
  
  {path: '/login', component: Login},
  {path: '/register', component: Register},

];

const router = new VueRouter({
  routes,
  mode: 'history',
  base: process.env.BASE_URL,
});


const base = axios.create({
  baseURL: "http://localhost:5858"
});
Vue.prototype.$http = base;


new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import Vuelidate from 'vuelidate';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import VueSwal from 'vue-swal';


import Login from './components/auth/login.vue';
import Register from './components/auth/register.vue';
import Home from './components/Home.vue';
import UserDetails from './components/user/UserDetails.vue';
import ErrorComponent from './components/ErrorComponent.vue';

Vue.config.productionTip = false

Vue.use(VueRouter);
Vue.use(Vuelidate);
Vue.use(VueSwal);

const routes = [
  
  {path: '/', component: Home},
  {path: '/login', component: Login},
  {path: '/register', component: Register},
  {path: '/home', component: Home,  meta: {
    requiresAuth: true
  }},
  {path: '/user-details', component: UserDetails,  meta: {
    requiresAuth: true
  }},
  {path: '*', component: ErrorComponent},


];

const router = new VueRouter({
  routes,
  mode: 'history',
 
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem("jwt") == null) {
      next({
        path: "/login"
      });
    } else {
      next();
    }
  } else {
    next();
  }
});



const base = axios.create({
  baseURL: "http://localhost:5858"
});
Vue.prototype.$http = base;


new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

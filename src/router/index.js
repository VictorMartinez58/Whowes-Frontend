import Vue from "vue";
import VueRouter from 'vue-router';


import Login from '../components/auth/login.vue';
import Register from '../components/auth/register.vue';
import Home from '../components/Home.vue';
import showResults from '../components/result/showResult.vue';
import createResult from '../components/result/createResult.vue';
import UserDetails from '../components/user/UserDetails.vue';
import ErrorComponent from '../components/ErrorComponent.vue';


Vue.use(VueRouter);



const routes = [
  
    {path: '/', component: Home,  meta: {
      requiresAuth: true
    }},
    {path: '/login', component: Login},
    {path: '/register', component: Register},
    {path: '/home', component: Home,  meta: {
      requiresAuth: true
    }},
    {path: '/user-details', component: UserDetails,  meta: {
      requiresAuth: true
    }},
    {path: '/results-create', component: createResult,  meta: {
      requiresAuth: true
    }},
    {path: '/results-show/:id', name:'show', component: showResults,  meta: {
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

export default router;

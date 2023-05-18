import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App";

// router setup
import routes from "./routes/routes";

// Plugins
import GlobalComponents from "./globalComponents";
import GlobalDirectives from "./globalDirectives";

// MaterialDashboard plugin
import MaterialDashboard from "./material-dashboard";

import Chartist from "chartist";

import store from './store';

import DaySpanVuetify from 'dayspan-vuetify'
import Vuetify from 'vuetify'


// configure router
const router = new VueRouter({
  routes, // short for routes: routes
  linkExactActiveClass: "nav-item active",
});

// Add a beforeEach navigation guard
router.beforeEach((to, from, next) => {
  // Check if the route requires authentication
  if (to.meta.requiresAuth) {
    // Check if the groomer is logged in
    if (store.state.loggedIn) {
      // The groomer is logged in, allow access to the route
      next();
    } else {
      // The groomer is not logged in, redirect to the login page
      next('/login');
    }
  } else {
    // The route does not require authentication, allow access
    next();
  }
});

Vue.prototype.$Chartist = Chartist;

Vue.use(Vuetify);
Vue.use(DaySpanVuetify, {
  methods: {
    getDefaultEventColor: () => '#1976d2'
  }
});
Vue.use(VueRouter);
Vue.use(MaterialDashboard);
Vue.use(GlobalComponents);
Vue.use(GlobalDirectives);

/* eslint-disable no-new */
new Vue({
  el: "#app",
  render: (h) => h(App),
  router,
  store,
  data: {
    Chartist: Chartist,
  },
});
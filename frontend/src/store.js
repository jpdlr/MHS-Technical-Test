// store.js
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    sidebarColor: 'green', // Default color
    loggedIn: false,
    loggedGroomer: null,
  },
  mutations: {
    setSidebarColor(state, color) {
      state.sidebarColor = color;
    },
    setLoggedIn(state, value) {
      state.loggedIn = value;
    },
    setLoggedGroomer(state, groomer) {
      state.loggedGroomer = groomer;
    }
  },
});

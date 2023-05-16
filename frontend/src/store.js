// store.js
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    sidebarColor: 'green', // Default color
  },
  mutations: {
    setSidebarColor(state, color) {
      state.sidebarColor = color;
    },
  },
});

<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <notifications></notifications>

    <side-bar :sidebar-item-color="sidebarBackground" :sidebar-background-image="sidebarBackgroundImage">
      <mobile-menu slot="content"></mobile-menu>
      <sidebar-link to="/calendar">
        <md-icon>today</md-icon>
        <p>Calendar</p>
      </sidebar-link>
      <sidebar-link to="/customerlist">
        <md-icon>content_paste</md-icon>
        <p>Customer List</p>
      </sidebar-link>
      <sidebar-link to="/petlist">
        <md-icon>pets</md-icon>
        <p>Pet List</p>
      </sidebar-link>
      <sidebar-link to="/user">
        <md-icon>person</md-icon>
        <p>User Profile</p>
      </sidebar-link>
    </side-bar>

    <div class="main-panel">
      <top-navbar></top-navbar>

      <fixed-plugin :color.sync="sidebarBackground" :image.sync="sidebarBackgroundImage">
      </fixed-plugin>

      <dashboard-content> </dashboard-content>

      <content-footer v-if="!$route.meta.hideFooter"></content-footer>
    </div>
  </div>
</template>

<script>
import TopNavbar from "./TopNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import DashboardContent from "./Content.vue";
import MobileMenu from "@/pages/Layout/MobileMenu.vue";
import FixedPlugin from "./Extra/FixedPlugin.vue";
import store from "@/store";

export default {
  components: {
    TopNavbar,
    DashboardContent,
    ContentFooter,
    MobileMenu,
    FixedPlugin,
  },
  data() {
    return {
      sidebarBackground: "",
      sidebarBackgroundImage: require("@/assets/img/sidebar-2.jpg"),
    };
  },
  mounted() {
    this.sidebarBackground = store.state.sidebarColor; // Set the initial value from the Vuex store

    // Watch for changes in the sidebarColor Vuex store and update sidebarBackground accordingly
    this.$watch(
      () => store.state.sidebarColor,
      (newColor) => {
        this.sidebarBackground = newColor;
      }
    );
  },
};
</script>

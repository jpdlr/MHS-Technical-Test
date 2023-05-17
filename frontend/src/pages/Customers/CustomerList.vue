<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
        <md-card class="md-card-plain">
          <md-card-header :data-background-color="sidebarBackground">
            <h3 class="title">Customer List</h3>
            <p class="category">A List of all the customers for the groomer</p>
          </md-card-header>
          <md-card-content>
            <customer-table></customer-table>
          </md-card-content>
        </md-card>
      </div>
    </div>
  </div>
</template>


<script>
import { CustomerTable } from "@/components";
import store from "@/store.js"; // Import your Vuex store

export default {
  components: {
    CustomerTable,
  },
  data() {
    return {
      sidebarBackground: "", // Initialize as empty string
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


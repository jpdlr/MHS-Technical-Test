<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
        <md-card class="md-card-plain">
          <md-card-header :data-background-color="sidebarBackground">
            <h3 class="title">Pet List</h3>
            <p class="category">A List of all the pets for the groomer</p>
          </md-card-header>
          <md-card-content>
            <pet-table></pet-table>
          </md-card-content>
        </md-card>
      </div>
    </div>
  </div>
</template>
  
<script>
import { PetTable } from "@/components";
import store from "@/store.js"; 

export default {
  components: {
    PetTable,
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
  
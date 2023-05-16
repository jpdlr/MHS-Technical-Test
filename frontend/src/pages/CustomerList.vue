<template>
  <div class="content">
    <div class="md-layout">
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
      >
        <md-card class="md-card-plain">
          <md-card-header data-background-color="green">
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

export default {
  components: {
    CustomerTable,
  },
};
</script>

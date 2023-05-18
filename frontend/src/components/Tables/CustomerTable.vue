<template>
  <div>
    <!-- Search bar -->
    <md-field>
      <label>Search Customer Name</label>
      <md-input v-model="searchQuery" @input="search"></md-input>
    </md-field>

    <!-- Customer table -->
    <md-table v-model="customers" :table-header-color="tableHeaderColor">
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="Name">{{ item.customer_name }}</md-table-cell>
        <md-table-cell md-label="Pet Name">{{ item.pet_name }}</md-table-cell>
        <md-table-cell md-label="Email">{{ item.email }}</md-table-cell>
        <md-table-cell md-label="Contact Number">{{ item.contactno }}</md-table-cell>
        <md-table-cell md-label="Customer Since Date">{{ item.cust_since_date }}</md-table-cell>
        <md-table-cell md-label="Groom Day">{{ item.groom_day }}</md-table-cell>
        <md-table-cell md-label="Groom Frequency">{{ item.groom_frequency }}</md-table-cell>
        <md-table-cell md-label="Actions">
          <md-button @click="deleteCustomer(item.id)">Delete</md-button>
        </md-table-cell>
      </md-table-row>
    </md-table>

    <!-- Create customer button -->
    <div class="md-layout-item md-size-100 text-right">
      <md-button class="md-raised md-success" @click="createNewCustomer">Create New Customer</md-button>
    </div>
  </div>
</template>

<script>
import api from '@/CustomerApiService.js';

export default {
  name: "customer-table",
  props: {
    tableHeaderColor: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      loading: false,
      customers: [],
      model: {
        id: "",
        customer_name: "",
        pet_name: "",
        email: "",
        contactno: "",
        cust_since_date: "",
        groom_day: "",
        groom_frequency: ""
      },
      searchQuery: "",
    };
  },
  async created() {
    await this.getAll();
  },
  methods: {
    async getAll() {
      this.loading = true;

      try {
        this.customers = await api.getAllCustomers();
      } finally {
        this.loading = false;
      }
    },
    createNewCustomer() {
      this.$router.push('/new_customer');
    },
    async deleteCustomer(id) {
      if (confirm("Are you sure you want to delete this record?")) {
        await api.deleteCustomer(id);

        // Remove the deleted customer from the list
        this.customers = this.customers.filter((customer) => customer.id !== id);

        // Clear the model if the deleted customer was being edited
        if (this.model.id === id) {
          this.clearModel();
        }
      }
    },
    clearModel() {
      this.model = {
        id: "",
        customer_name: "",
        pet_name: "",
        email: "",
        contactno: "",
        cust_since_date: "",
        groom_day: "",
        groom_frequency: ""
      };
    },
    search() {
      const query = this.searchQuery.toLowerCase().trim();

      if (query === "") {
        // If the search query is empty, show all customers
        this.getAll();
      } else {
        // Otherwise, show only the customers that match the search query

        // Filter the customers by name
        this.customers = this.customers.filter((customer) => {
          return customer.customer_name.toLowerCase().includes(query);
        });
      }
    },
  }
};
</script>

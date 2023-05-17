<template>
  <div>
    <md-table v-model="customers" :table-header-color="tableHeaderColor">
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="ID">{{ item.id }}</md-table-cell>
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
      }
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
    async createCustomer() {
      await api.createCustomer(this.model);
      this.clearModel();
      await this.getAll();
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
    }
  }
};
</script>

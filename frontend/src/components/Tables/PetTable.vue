<template>
  <div>
    <!-- Search bar -->
    <md-field>
      <label>Search...</label>
      <md-input v-model="searchQuery" @input="search"></md-input>
    </md-field>

    <!-- Customer table -->
    <md-table v-model="pets" :table-header-color="tableHeaderColor">
      <md-table-row slot="md-table-row" slot-scope="{ item }" @click="editCustomer(item)">
        <md-table-cell md-label="Customer Name">{{ item.customer_name }}</md-table-cell>
        <md-table-cell md-label="Pet Name">{{ item.pet_name }}</md-table-cell>
        <md-table-cell md-label="Tag Serial Number">{{ item.tag_serial_number }}</md-table-cell>
        <md-table-cell md-label="Breed">{{ item.breed }}</md-table-cell>
        <md-table-cell md-label="Visual Description">{{ item.visual_desc }}</md-table-cell>
        <md-table-cell md-label="Allergies">{{ item.allergies }}</md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
import api from '@/PetApiService.js';
import customer_api from '@/CustomerApiService.js';

export default {
  name: "pet-table",
  props: {
    tableHeaderColor: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      loading: false,
      pets: [],
      model: {
        id: "",
        customer_name: "",
        pet_name: "",
        tag_serial_number: "",
        breed: "",
        visual_desc: "",
        allergies: ""
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
        this.pets = await api.getAllPets();
      } finally {
        this.loading = false;
      }
    },
    async editCustomer(pet) {
      // Get Customer from Pet
      const customer = await customer_api.getCustomerFromPet(pet);
      customer[0].cust_since_date = customer[0].cust_since_date.replace(/T.*$/, "");
      this.$router.push({
        path: "/customer",
        query: {
          customerData: customer[0],
          newCustomer: false
        }
      });
    },
    clearModel() {
      this.model = {
        id: "",
        customer_name: "",
        pet_name: "",
        tag_serial_number: "",
        breed: "",
        visual_desc: "",
        allergies: ""
      };
    },
    search() {
      const query = this.searchQuery.toLowerCase().trim();

      if (query === "") {
        // If the search query is empty, show all customers
        this.getAll();
      } else {
        // Otherwise, show only the customers that match the search query

        // Filter by pet name, breed and tag serial number
        this.pets = this.pets.filter((pet) => {
          return (
            pet.pet_name.toLowerCase().includes(query) ||
            pet.breed.toLowerCase().includes(query) ||
            pet.tag_serial_number.toLowerCase().includes(query)
          );
        });
      }
    },
  }
};
</script>

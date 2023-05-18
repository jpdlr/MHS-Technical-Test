<template>
  <div>
    <!-- Search bar -->
    <md-field>
      <label>Search...</label>
      <md-input v-model="searchQuery" @input="search"></md-input>
    </md-field>

    <!-- Customer table -->
    <md-table v-model="pets" :table-header-color="tableHeaderColor">
      <md-table-row slot="md-table-row" slot-scope="{ item }">
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
    async deletePet(id) {
      if (confirm("Are you sure you want to delete this record?")) {
        await api.deletePet(id);

        // Remove the deleted pet from the list
        this.pets = this.pets.filter((pet) => pet.id !== id);

        // Clear the model if the deleted pet was being edited
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

<template>
  <div>
    <md-table v-model="pets" :table-header-color="tableHeaderColor">
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="ID">{{ item.id }}</md-table-cell>
        <md-table-cell md-label="Pet Name">{{
          item.pet_name
        }}</md-table-cell>
        <md-table-cell md-label="Pet Name">{{ item.pet_name }}</md-table-cell>
        <md-table-cell md-label="Tag Serial Number">{{
          item.tag_serial_number
        }}</md-table-cell>
        <md-table-cell md-label="Breed">{{ item.breed }}</md-table-cell>
        <md-table-cell md-label="Visual Description">{{
          item.visual_desc
        }}</md-table-cell>
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
        pet_name: "",
        pet_name: "",
        tag_serial_number: "",
        breed: "",
        visual_desc: "",
        allergies: ""
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
        this.pets = await api.getAllPets();
      } finally {
        this.loading = false;
      }
    },
    async createPet() {
      await api.createPet(this.model);
      this.clearModel();
      await this.getAll();
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
        pet_name: "",
        pet_name: "",
        tag_serial_number: "",
        breed: "",
        visual_desc: "",
        allergies: ""
      };
    }
  }
};
</script>

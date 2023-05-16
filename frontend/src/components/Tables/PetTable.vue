<template>
  <div>
    <md-table v-model="users" :table-header-color="tableHeaderColor">
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="ID">{{ item.id }}</md-table-cell>
        <md-table-cell md-label="Customer Name">{{
          item.customer_name
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
      selected: [],
      users: [
        {
          id: 1,
          customer_name: "Dakota Rice",
          pet_name: "Fluffy",
          tag_serial_number: "123456789",
          breed: "Shih Tzu",
          visual_desc: "White",
          allergies: "None",
        },
      ],
    };
  },
};
</script>

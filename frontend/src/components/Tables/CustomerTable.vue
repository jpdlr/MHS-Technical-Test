<template>
  <div>
    <md-table v-model="users" :table-header-color="tableHeaderColor">
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="ID">{{ item.id }}</md-table-cell>
        <md-table-cell md-label="Name">{{ item.customer_name }}</md-table-cell>
        <md-table-cell md-label="Pet Name">{{ item.pet_name }}</md-table-cell>
        <md-table-cell md-label="Email">{{ item.email }}</md-table-cell>
        <md-table-cell md-label="Contact Number">{{ item.contactno }}</md-table-cell>
        <md-table-cell md-label="Customer Since Date">{{ item.cust_since_date }}</md-table-cell>
        <md-table-cell md-label="Groom Day">{{ item.groom_day }}</md-table-cell>
        <md-table-cell md-label="Groom Frequency">{{ item.groom_frequency }}</md-table-cell>
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
          email: "dakota@gmail.com",
          contactno: "09123456789",
          cust_since_date: "2020-01-01",
          groom_day: "Monday",
          groom_frequency: "Weekly",
        },
      ],
    };
  },
};
</script>

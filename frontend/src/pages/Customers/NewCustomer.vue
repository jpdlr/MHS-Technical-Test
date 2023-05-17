<template>
    <md-card>
        <md-card-header :data-background-color="sidebarBackground">
            <h4 class="title">Create A New Customer</h4>
        </md-card-header>

        <md-card-content>
            <form @submit.prevent="createCustomer">
                <div class="md-layout">
                    <!-- Customer form fields -->
                    <div class="md-layout-item md-small-size-100 md-size-50">
                        <md-field>
                            <label for="customer_name">Customer Name</label>
                            <md-input type="text" id="customer_name" v-model="customerData.customer_name"
                                required></md-input>
                        </md-field>
                    </div>

                    <div class="md-layout-item md-small-size-100 md-size-50">
                        <md-field>
                            <label for="pet_name">Pet Name</label>
                            <md-input type="text" id="pet_name" v-model="customerData.pet_name" required></md-input>
                        </md-field>
                    </div>

                    <div class="md-layout-item md-small-size-100 md-size-50">
                        <md-field>
                            <label for="email">Email</label>
                            <md-input type="email" id="email" v-model="customerData.email" required></md-input>
                        </md-field>
                    </div>

                    <div class="md-layout-item md-small-size-100 md-size-50">
                        <md-field>
                            <label for="contactno">Contact Number</label>
                            <md-input type="tel" id="contactno" v-model="customerData.contactno" required></md-input>
                        </md-field>
                    </div>

                    <div class="md-layout-item md-small-size-100 md-size-100">
                        <label for="cust_since_date">Customer Since Date</label>
                        <md-field>
                            <md-input type="date" v-model="customerData.cust_since_date" required></md-input>
                        </md-field>
                    </div>

                    <div class="md-layout-item md-small-size-100 md-size-100">
                        <label for="groom_day">Groom Day</label>
                        <div class="checkbox-row">
                            <div v-for="day in daysOfWeek" :key="day">
                                <md-radio v-model="customerData.groom_day" :value="day" @change="updateFrequency(day)">
                                    {{ day }}
                                </md-radio>
                            </div>
                        </div>
                    </div>



                    <div class="md-layout-item md-small-size-100 md-size-100">
                        <label for="groom_frequency">Groom Frequency</label>
                        <div class="checkbox-row">
                            <div v-for="frequency in frequencies" :key="frequency">
                                <md-radio v-model="customerData.groom_frequency" :value="frequency">
                                    {{ frequency }}
                                </md-radio>
                            </div>
                        </div>
                    </div>

                    <div class="md-layout-item md-size-100 text-right">
                        <md-button type="submit" class="md-raised md-success">Create User</md-button>
                    </div>
                </div>
            </form>
        </md-card-content>
    </md-card>
</template>
  
  
  
<script>
import api from '@/CustomerApiService.js';
import store from "@/store.js";

export default {
    name: 'NewCustomer',
    data() {
        return {
            sidebarBackground: "",
            customerData: {
                customer_name: '',
                pet_name: '',
                email: '',
                contactno: '',
                cust_since_date: '',
                groom_day: '',
                groom_frequency: '',
            },
            daysOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            frequencies: ['Weekly', 'EveryOtherWeek', 'Monthly'],
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
    methods: {
        async createCustomer() {
            try {
                await api.createCustomer(this.customerData);
                // show success dialog
                this.$root.$emit('showSnackbar', 'Customer created successfully');
                // Redirect to the customer list page after successful creation.
                this.$router.push('/customerlist');
            } catch (error) {
                // Handle any error that occurred during customer creation.
                console.error(error);
                // Optionally, show an error message to the user.
                this.$root.$emit('showSnackbar', 'Error creating customer');
            }
        },
        updateFrequency(day) {
            if (day === 'Monday' || day === 'Friday') {
                this.customerData.groom_frequency = 'Weekly';
            } else if (day === 'Wednesday') {
                this.customerData.groom_frequency = 'EveryOtherWeek';
            } else if (day === 'Tuesday' || day === 'FirstFriday') {
                this.customerData.groom_frequency = 'Monthly';
            }
        },
    },
};
</script>
  
<style scoped>
.checkbox-row {
    display: flex;
}

.checkbox-item {
    margin-right: 10px;
    /* Adjust the margin as needed */
}
</style>

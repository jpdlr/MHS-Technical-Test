<template>
    <md-card>
        <md-card-header :data-background-color="sidebarBackground">
            <h4 class="title">Create A New Customer</h4>
        </md-card-header>

        <md-card-content>
            <form @submit.prevent="createCustomer">
                <div class="md-layout">
                    <!-- Customer form fields -->
                    <div class="md-layout-item md-small-size-100 md-size-100">
                        <md-field>
                            <label for="customer_name">Customer Name</label>
                            <md-input type="text" id="customer_name" v-model="customerData.customer_name"
                                required></md-input>
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

                    <!-- Create pet button -->
                    <div class="md-layout-item md-size-100 text-left">
                        <md-button v-if="!showAddPetForm" class="md-raised md-success" @click="toggleAddPetForm">Add
                            Pet</md-button>
                    </div>

                    <form v-if="showAddPetForm" class="add-pet">
                        <div class="md-layout">

                            <div class="md-layout-item md-small-size-100 md-size-100">
                                <md-field>
                                    <label for="pet_name">Pet Name</label>
                                    <md-input type="text" id="pet_name" v-model="petData.pet_name" required></md-input>
                                </md-field>
                            </div>

                            <div class="md-layout-item md-small-size-100 md-size-50">
                                <md-field>
                                    <label for="tag_serial_number">Tag Serial Number</label>
                                    <md-input type="text" id="tag_serial_number" v-model="petData.tag_serial_number"
                                        required></md-input>
                                </md-field>
                            </div>

                            <div class="md-layout-item md-small-size-100 md-size-50">
                                <md-field>
                                    <label for="breed">Breed</label>
                                    <md-input type="text" id="breed" v-model="petData.breed" required></md-input>
                                </md-field>
                            </div>

                            <div class="md-layout-item md-small-size-100 md-size-50">
                                <md-field>
                                    <label for="visual_desc">Visual Description</label>
                                    <md-input type="text" id="visual_desc" v-model="petData.visual_desc"
                                        required></md-input>
                                </md-field>
                            </div>

                            <div class="md-layout-item md-small-size-100 md-size-50">
                                <md-field>
                                    <label for="allergies">Allergies</label>
                                    <md-input type="text" id="allergies" v-model="petData.allergies" required></md-input>
                                </md-field>
                            </div>
                        </div>
                    </form>
                    <div class="md-layout-item md-size-100 text-right">
                        <md-button type="submit" class="md-raised md-success">
                            {{ newCustomer === 'true' ? 'Create Customer' : 'Update Customer' }}
                        </md-button>
                    </div>
                </div>
            </form>
        </md-card-content>
    </md-card>
</template>
  
  
  
<script>
import api from '@/CustomerApiService.js';
import pet_api from '@/PetApiService.js';
import store from "@/store.js";

export default {
    name: 'NewCustomer',
    data() {
        return {
            sidebarBackground: "",
            customerData: {
                id: '',
                customer_name: '',
                email: '',
                contactno: '',
                cust_since_date: '',
                groom_day: '',
                groom_frequency: '',
                groomer_id: '',
            },
            petData: {
                customer_name: '',
                pet_name: '',
                tag_serial_number: '',
                breed: '',
                visual_desc: '',
                allergies: '',
            },
            newCustomer: true,
            daysOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            frequencies: ['Weekly', 'EveryOtherWeek', 'Monthly'],
            showAddPetForm: false
        };
    },
    mounted() {
        this.customerData = this.$route.query.customerData; // Get the customer data from the query string
        this.newCustomer = this.$route.query.newCustomer; // Get the newCustomer flag from the query string
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
        toggleAddPetForm() {
            this.showAddPetForm = !this.showAddPetForm; // Toggle the value of the flag
        },

        async createCustomer() {
            try {
                // Get Logged In Groomer
                const loggedGroomer = store.state.loggedGroomer;
                this.customerData.groomer_id = loggedGroomer.email;

                console.log("Create Customer" + this.newCustomer);
                // Create the customer
                if (this.newCustomer === 'true') {
                    console.log("Creating Customer");
                    await api.createCustomer(this.customerData);
                }
                else {
                    console.log("Updating Customer");
                    await api.updateCustomer(this.customerData.id, this.customerData);
                }


                // Create the pet
                if (this.showAddPetForm) {
                    if (this.petData.tag_serial_number.length < 12) {
                        window.alert('Tag Serial Number must be greater than 12 characters');
                        return; // Stop the method execution
                    }
                    // Add Pet to Customer
                    this.petData.customer_name = this.customerData.customer_name;

                    await pet_api.createPet(this.petData);
                }

                this.$router.push({
                    path: '/customerlist',
                });
            } catch (error) {
                // Handle any error that occurred during customer creation.
                console.error(error);
                window.alert('Error Creating Customer');
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

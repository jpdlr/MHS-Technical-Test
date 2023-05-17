<template>
    <md-card>
        <md-card-header :data-background-color="sidebarBackground">
            <h4 class="title">Create A New Pet</h4>
        </md-card-header>

        <md-card-content>
            <form @submit.prevent="createPet">
                <div class="md-layout">
                    <!-- Pet form fields -->
                    <div class="md-layout-item md-small-size-100 md-size-50">
                        <md-field>
                            <label for="customer_name">Customer Name</label>
                            <md-input type="text" id="customer_name" v-model="petData.customer_name"
                                required></md-input>
                        </md-field>
                    </div>

                    <div class="md-layout-item md-small-size-100 md-size-50">
                        <md-field>
                            <label for="pet_name">Pet Name</label>
                            <md-input type="text" id="pet_name" v-model="petData.pet_name" required></md-input>
                        </md-field>
                    </div>

                    <div class="md-layout-item md-small-size-100 md-size-50">
                        <md-field>
                            <label for="tag_serial_number">Pet Name</label>
                            <md-input type="text" id="pet_name" v-model="petData.tag_serial_number" required></md-input>
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
                            <md-input type="text" id="visual_desc" v-model="petData.visual_desc" required></md-input>
                        </md-field>
                    </div>

                    <div class="md-layout-item md-small-size-100 md-size-50">
                        <md-field>
                            <label for="allergies">Allergies</label>
                            <md-input type="text" id="allergies" v-model="petData.allergies" required></md-input>
                        </md-field>
                    </div>

                    <div class="md-layout-item md-size-100 text-right">
                        <md-button type="submit" class="md-raised md-success">Create Pet</md-button>
                    </div>
                </div>
            </form>
        </md-card-content>
    </md-card>
</template>
  
  
  
<script>
import api from '@/PetApiService.js';
import store from "@/store.js";

export default {
    name: 'NewPet',
    data() {
        return {
            sidebarBackground: "",
            petData: {
                customer_name: '',
                pet_name: '',
                tag_serial_number: "",
                breed: "",
                visual_desc: "",
                allergies: ""
            },
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
        async createPet() {
            try {
                await api.createPet(this.petData);
                // show success dialog
                this.$root.$emit('showSnackbar', 'Pet created successfully');
                // Redirect to the pet list page after successful creation.
                this.$router.push('/petlist');
            } catch (error) {
                // Handle any error that occurred during pet creation.
                console.error(error);
                // Optionally, show an error message to the user.
                this.$root.$emit('showSnackbar', 'Error creating pet');
            }
        },
    },
};
</script>
  
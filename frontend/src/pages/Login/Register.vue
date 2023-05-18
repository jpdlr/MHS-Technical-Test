<template>
    <div class="register-container">
        <img src="@/assets/img/logo.jpg" alt="Logo" class="logo-image" />
        <h1>Register New Groomer</h1>
        <form @submit.prevent="register" class="register-form">
            <div class="md-layout-item md-small-size-100 md-size-50">
                <md-field>
                    <label>Groomer Name</label>
                    <md-input v-model="groomer_data.groomer_name" type="groomer_name"></md-input>
                </md-field>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-50">
                <md-field>
                    <label>Email Address</label>
                    <md-input v-model="groomer_data.email" type="email"></md-input>
                </md-field>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-50">
                <md-field>
                    <label>Password</label>
                    <md-input v-model="groomer_data.password" type="password"></md-input>
                </md-field>
            </div>
            <div class="form-field">
                <button type="submit" class="register-button">Register Groomer</button>
            </div>
        </form>
    </div>
</template>
  
  
<script>
import api from "@/GroomerApiService.js"

export default {
    name: "register",
    data() {
        return {
            groomer_data: {
                groomer_name: "",
                email: "",
                password: "",
            },
        };
    },
    methods: {
        async register() {
            try {
                await api.createGroomer(this.groomer_data);
                this.$router.push('/login');
            } catch (error) {
                // Handle any error that occurred during customer creation.
                console.error(error);
                window.alert('Error Creating Groomer');
            }
        },
    },
};
</script>
  
<style scoped>
.register-container {
    max-width: 80%;
    margin: 0 auto;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 80vh;
}

.logo-image {
    max-width: 150px;
    /* Adjust the width as needed */
    max-height: 150px;
    margin-bottom: 20px;
    border-radius: 100%;
}

h1 {
    text-align: center;
    margin-bottom: 50px;
}

.register-form {
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
}

.form-field {
    align-items: center;
    display: flex;
    width: 100%;
    margin-bottom: 20px;
    flex-direction: column;
    justify-content: center;
}

label {
    margin-bottom: 10px;
}

.register-button {
    margin-top: 50px;
    width: 48%;
    padding: 10px;
    background-color: #686868;
    color: #fff;
    border: none;
    border-radius: 6px;
    cursor: pointer;
}

.register-button:hover {
    background-color: #3b3b3b;
}

.register-container {
    margin-top: 5px;
}
</style>
  
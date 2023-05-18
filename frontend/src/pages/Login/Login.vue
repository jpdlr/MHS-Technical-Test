<template>
  <div class="login-container">
    <img src="@/assets/img/logo.jpg" alt="Logo" class="logo-image" />
    <h1>Groomer Login</h1>
    <form @submit.prevent="login" class="login-form">
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
        <button type="submit" class="login-button">Login</button>
      </div>
    </form>
    <div class="register-container">
      <button class="register-button" @click="register()">Register</button>
    </div>
  </div>
</template>


<script>
import api from "@/GroomerApiService.js"
import store from '@/store';


export default {
  name: "Login",
  data() {
    return {
      groomer_data: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    async login() {
      try {
        await api.loginGroomer(this.groomer_data);
        store.commit('setLoggedGroomer', this.groomer_data);
        store.commit('setLoggedIn', true);
        this.$router.push('/calendar');
      } catch (error) {
        // Handle any error that occurred during customer creation.
        console.error(error);
        window.alert('Error Logging In');
      }
    },
    register() {
      this.$router.push("/register");
    },
  },
};
</script>

<style scoped>
.login-container {
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

.login-form {
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

.login-button {
  margin-top: 50px;
  width: 48%;
  padding: 10px;
  background-color: #686868;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.login-button:hover {
  background-color: #3b3b3b;
}

.register-container {
  margin-top: 5px;
}

.register-button {
  background-color: transparent;
  color: #000000;
  border: none;
  cursor: pointer;
}

.register-button:hover {
  text-decoration: underline;
}
</style>

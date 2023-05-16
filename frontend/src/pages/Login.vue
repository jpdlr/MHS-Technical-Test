<template>
  <div class="login-container">
    <img src="@/assets/img/logo.jpg" alt="Logo" class="logo-image" />
    <h1>Groomer Login</h1>
    <form @submit.prevent="login" class="login-form">
      <div class="form-field">
        <input type="text" id="email" v-model="username" required placeholder="Email" />
      </div>
      <div class="form-field">
        <input type="password" id="password" v-model="password" required placeholder="Password" />
      </div>
      <div class="form-field">
        <button type="submit" class="login-button">Login</button>
      </div>
    </form>
    <div class="register-container">
      <button class="register-button">Register</button>
    </div>
  </div>
</template>


<script>
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
  max-width: 150px; /* Adjust the width as needed */
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

input {
  padding: 10px;
  background-color: #d6d6d6;
  border: 2px solid #bababa;
  border-radius: 6px;
  width: 50%;
}

input:focus {
  border-color: #007bff;
}

.login-button {
  margin-top: 50px;
  width: 50%;
  padding: 10px;
  background-color: #686868;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
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
</style>

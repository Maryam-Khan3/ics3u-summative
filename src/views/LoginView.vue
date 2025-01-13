<script setup>
import { RouterLink, useRouter } from 'vue-router';
import { ref } from 'vue';
import logo from '@/assets/blacklogo.jpg';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase"

const store = useStore();
const email = ref('');


const loginByEmail = async () => {
  try {
    const user = (await signInWithEmailAndPassword(auth, email.value, password.value)).user;
    store.user = user;
    router.push("/movies/all");
  } catch (error) {
    console.log(error);
    alert("There was an error signing in with email!");
  }
};

const loginByGoogle = async () => {
  try {
    const user = (await signInWithPopup(auth, new GoogleAuthProvider())).user;
    store.user = user;
    router.push("/movies/all");
  } catch (error) {
    alert("There was an error signing in with Google!");
  }
};
const router = useRouter();
const password = ref('');

const handleLogin = () => {
  if (password.value === "1234") {
    router.push("/movies");
  } else {
    alert("Invalid Password");
  }
};

</script>
<template>
  <div class="hero">
    <div class="overlay">
      <div class="navbar">
        <RouterLink to="/register" class="button register">Create an Account</RouterLink>
      </div>
      <div class="form-container">
        <h2>Sign in to Your Account</h2>
        <form @submit.prevent="handleLogin">
          <input type="email" placeholder="Email" class="input-field" required />
          <input v-model="password" type="password" placeholder="Password" class="input-field" required />
          <button type="submit" class="button login">Sign in</button>
        </form>
      </div>
    </div>
    <div class="logo-container">
      <img :src="logo" width="160" height="160" alt="Black Logo" />
    </div>
  </div>
</template>

<style scoped>
.hero {
  background-color: black;
  height: 100vh;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  margin: 0;
  position: relative;
}

.overlay {
  background-color: black;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  padding: 20px;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}

.navbar .register {
  background-color: #571295;
  color: white;
  padding: 10px 20px;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s;
  position: absolute;
  top: 20px;
  right: 20px;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
}

.form-container {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: rgb(0, 0, 0);
  border-radius: 10px;
  width: 300px;
  margin-top: 50px;
}

.form-container h2 {
  font-size: 2rem;
  margin-bottom: 20px;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
}


.input-field {
  padding: 15px;
  width: 100%;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-bottom: 15px;
  transition: border-color 0.3s;
}

.input-field:focus {
  border-color: #571295;
  outline: none;
}

.login {
  background-color: #571295;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
  width: 100%;
  margin-top: 20px;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
}

.logo-container {
  position: absolute;
  top: 20px;
  left: 20px;
}


</style>
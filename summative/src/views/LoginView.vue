<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, fetchSignInMethodsForEmail } from "firebase/auth";
import { auth } from "../firebase";
import { useUserStore } from '../stores';

const email = ref('');
const password = ref('');
const userStore = useUserStore();
const router = useRouter();


function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


async function loginByEmail() {
  try {

    const signInMethods = await fetchSignInMethodsForEmail(auth, email.value);
    if (signInMethods.length === 0) {
      alert("No account found with this email. Please register first.");
      router.push("/register"); 
      return;
    }

   
    const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value);
    const user = userCredential.user;

    userStore.setUserInfo({
      firstName: user.displayName?.split(' ')[0] || '',
      lastName: user.displayName?.split(' ')[1] || '',
      email: user.email,
    });

    
    router.push("/movies");
  } catch (error) {
    if (error.code === "auth/user-not-found") {
     
      await delay(1000); 
      loginByEmail(); 
    } else if (error.code === "auth/wrong-password") {
      alert("Incorrect password. Please try again.");
    } else {
      alert(`Error: ${error.message}`);
    }
  }
}


async function loginByGoogle() {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;


    userStore.setUserInfo({
      firstName: user.displayName?.split(' ')[0] || '',
      lastName: user.displayName?.split(' ')[1] || '',
      email: user.email,
    });

   
    router.push("/movies");
  } catch (error) {
    alert(`Google Sign-In Error: ${error.message}`);
  }
}
</script>



<template>
  <div class="hero">
    <div class="overlay">
      <div class="navbar">
        <RouterLink to="/register" class="button register">Create an Account</RouterLink>
      </div>
      <div class="form-container">
        <h2>Sign in to Your Account</h2>
        <form @submit.prevent="loginByEmail">
          <input v-model="email" type="email" placeholder="Email" class="input-field" required />
          <input v-model="password" type="password" placeholder="Password" class="input-field" required />
          <button type="submit" class="button login">Sign in</button>
        </form>
        <button @click="loginByGoogle" class="button google-login">
          Sign in with Google
        </button>
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

.login,
.google-login {
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
</style>

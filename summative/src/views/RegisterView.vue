<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { createUserWithEmailAndPassword, updateProfile, signInWithPopup, GoogleAuthProvider, getAuth } from "firebase/auth";
import { auth } from "../firebase";
import { useUserStore } from '../stores';

const firstName = ref('');
const lastName = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const userStore = useUserStore();
const router = useRouter();

// Register with Email and Password
async function registerByEmail() {
  if (!firstName.value || !lastName.value || !email.value || !password.value || !confirmPassword.value) {
    alert("All fields are required.");
    return;
  }
  if (password.value !== confirmPassword.value) {
    alert("Passwords do not match.");
    return;
  }

  try {
    // Attempt to create a new user
    const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value);
    const user = userCredential.user;

    // Update user profile with first and last name
    await updateProfile(user, { displayName: `${firstName.value} ${lastName.value}` });

    // Store user in Pinia store
    userStore.setUserInfo({
      firstName: firstName.value,
      lastName: lastName.value,
      email: user.email,
    });

    // Redirect to /movies
    router.push("/movies");
  } catch (error) {
    if (error.code === "auth/email-already-in-use") {
      console.error("Email registration error: ", error.message); // Optional for debugging
      alert("This email is already registered. Please login or use a different email.");
    } else {
      alert(`Error: ${error.message}`);
    }
  }
}

// Register with Google
async function registerByGoogle() {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // Store user in Pinia store
    userStore.setUserInfo({
      firstName: user.displayName?.split(' ')[0] || '',
      lastName: user.displayName?.split(' ')[1] || '',
      email: user.email,
    });

    // Redirect to /movies
    router.push("/movies");
  } catch (error) {
    alert(`Google Sign-Up Error: ${error.message}`);
  }
}
</script>




<template>
  <div class="hero">
    <div class="overlay">
      <div class="navbar">
        <RouterLink to="/login" class="button login">Sign in</RouterLink>
      </div>
      <div class="form-container">
        <h2>Create an Account</h2>
        <form @submit.prevent="registerByEmail">
          <input v-model="firstName" type="text" placeholder="First Name" class="input-field" required />
          <input v-model="lastName" type="text" placeholder="Last Name" class="input-field" required />
          <input v-model="email" type="email" placeholder="Email" class="input-field" required />
          <input v-model="password" type="password" placeholder="Password" class="input-field" required />
          <input v-model="confirmPassword" type="password" placeholder="Re-enter Password" class="input-field" required />
          <button type="submit" class="button register">Create an Account</button>
        </form>
        <button @click="registerByGoogle" class="button google-register">
          Sign up with Google
        </button>
      </div>
    </div>
    <div class="logo-container">
      <img :src="logo" width="160" height="160" alt="Black Logo" />
    </div>
  </div>
</template>

<style scoped>
/* Same styling as before */
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
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 10;
}

.navbar .login {
  background-color: #571295;
  color: white;
  padding: 10px 20px;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s;
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
  margin-top: 100px;
}

.form-container h2 {
  font-size: 2rem;
  margin-bottom: 20px;
}

.input-field {
  padding: 15px;
  width: 100%;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-bottom: 15px;
  transition: border-color 0.3s;
}

.register,
.google-register {
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
}
</style>

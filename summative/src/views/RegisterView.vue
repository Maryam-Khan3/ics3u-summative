<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { createUserWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase';
import { useStore } from '../stores'; 
import logo from '@/assets/blacklogo.jpg';

const firstName = ref('');
const lastName = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const store = useStore(); 
const router = useRouter();

const registerByEmail = async () => {
  if (password.value !== confirmPassword.value) {
    alert('Passwords do not match');
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value);
    const user = userCredential.user;

    await updateProfile(user, {
      displayName: `${firstName.value} ${lastName.value}`,
    });

  
    store.user = user;
    router.push('/movies'); 
  } catch (error) {
    alert(error.message);
  }
};

const registerByGoogle = async () => {
  const provider = new GoogleAuthProvider();
  
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    store.user = user;
    router.push('/movies'); 
  } catch (error) {
    alert(error.message);
  }
};
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
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
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
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
}

.form-container {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px 20px; 
  background-color: rgb(0, 0, 0);
  border-radius: 10px;
  width: 300px;
  margin-top: 100px;
}

.form-container h2 {
  font-size: 1.8rem; 
  margin-bottom: 10px; 
}

.input-field {
  padding: 10px; 
  width: 100%;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-bottom: 10px; 
  transition: border-color 0.3s;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
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
  margin-top: 15px; 
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
}

.navbar .login:hover,
.register:hover,
.google-register:hover {
  background-color: #7a1fdd; /* Change to a slightly darker shade */
  transform: scale(1.05); /* Optional: Add a slight scaling effect */
  transition: background-color 0.3s, transform 0.2s;
}
.logo-container {
  position: absolute;
  top: 4px;
  left: 1100px;
  z-index: 10;
}
</style>

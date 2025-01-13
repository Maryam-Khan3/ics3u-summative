
<script setup>
import logo from '@/assets/blacklogo.jpg';
import { ref } from 'vue';
import { useUserStore } from '@/stores';
import { useRouter } from 'vue-router'; 
import { createUserWithEmailAndPassword, updateProfile, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase";


const firstName = ref('');
const lastName = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');

const store = useStore();

async function registerByEmail() {
  try {
    const user = (await createUserWithEmailAndPassword(auth, email.value, password.value)).user;
    await updateProfile(user, { displayName: `${firstName.value} ${lastName.value}` });
    store.user = user;
    router.push("/movies/all");
  } catch (error) {
    alert("There was an error creating a user with email!");
  }
}

async function registerByGoogle() {
  try {
    const user = (await signInWithPopup(auth, new GoogleAuthProvider())).user;
    store.user = user;
    router.push("/movies/all");
  } catch (error) {
    alert("There was an error creating a user with Google!");
  }
}

const userStore = useUserStore();


const router = useRouter();

const handleSubmit = (e) => {
  e.preventDefault();

  if (!firstName.value || !lastName.value || !email.value || !password.value || !confirmPassword.value) {
    alert('All fields are required.');
    return;
  }

 
  if (password.value !== confirmPassword.value) {
    alert('Passwords do not match.');
    return;
  }

  userStore.setUserInfo({
  firstName: firstName.value,
  lastName: lastName.value,
  email: email.value,
});


  router.push('/movies');

 
  firstName.value = '';
  lastName.value = '';
  email.value = '';
  password.value = '';
  confirmPassword.value = '';
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
        <form @submit="handleSubmit">
          <input v-model="firstName" type="text" placeholder="First Name" class="input-field" required>
          <input v-model="lastName" type="text" placeholder="Last Name" class="input-field" required>
          <input v-model="email" type="email" placeholder="Email" class="input-field" required>
          <input v-model="password" type="password" placeholder="Password" class="input-field" required>
          <input v-model="confirmPassword" type="password" placeholder="Re-enter Password" class="input-field" required>
          <button type="submit" class="button register">Create an Account</button>
        </form>
      </div>
    </div>
    <div class="logo-container">
      <img :src="logo" width="160" height="160" alt="Black Logo" />
    </div>
  </div>
</template>

<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html, body {
  height: 100%;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}

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
  font-family: inherit; 
}

.navbar .login:hover {
  background-color: #460a85; 
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

.register {
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

img {
  border-radius: 5%;
}

.logo-container {
  position: fixed; 
  top: 20px;
  left: 20px;
  z-index: 10;
}
</style>
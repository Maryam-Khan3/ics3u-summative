<template>
  <div class="header">
    <div class="navbar">
      <!-- If the user is not logged in -->
      <div class="nav-buttons" v-if="!isUserLoggedIn">
        <RouterLink to="/login" class="button">Sign in</RouterLink>
        <RouterLink to="/register" class="button">Create an Account</RouterLink>
      </div>

      <!-- If the user is logged in -->
      <div class="top-buttons" v-if="isUserLoggedIn">
        <button @click="logout" class="button logout-button">Logout</button>
        <button @click="goToSettings" class="button settings-button">Settings</button>
        <button @click="goToCart" class="button cart-button">Go to Cart</button>
      </div>
    </div>

    <img :src="logo" class="logo-container" width="160" height="160" alt="Black Logo" />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useUserStore } from '@/stores'; // Adjust to your file structure
import { useRouter } from 'vue-router';
import { signOut } from 'firebase/auth';
import { auth } from '@/firebase'; // Assuming Firebase is initialized

const userStore = useUserStore();
const router = useRouter();

const isUserLoggedIn = computed(() => {
  return userStore.user !== null; // Check if user exists
});

// Logout method
async function logout() {
  try {
    await signOut(auth); // Sign out from Firebase
    userStore.clearUserInfo(); // Clear user data in the store
    router.push('/login'); // Redirect to login page
  } catch (error) {
    console.error('Error signing out:', error);
  }
}

// Navigate to settings
function goToSettings() {
  router.push('/settings');
}

// Navigate to cart
function goToCart() {
  if (isUserLoggedIn.value) {
    router.push('/cart');
  } else {
    console.warn("User not logged in, redirecting to login.");
    router.push('/login'); // Optionally redirect to login if not logged in
  }
}
</script>


<style scoped>
.logo-container {
  position: absolute;
  top: 4px;
  left: 1100px;
  z-index: 10;
}

.navbar {
  position: absolute;
  top: 20px;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  padding: 0 20px;
}

.nav-buttons .button {
  background-color: #571295;
  color: white;
  padding: 10px 20px;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s;
  margin: 5px 0;
  z-index: 10;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
}

.top-buttons {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
}

.button {
  background-color: #571295;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  transition: background-color 0.3s;
  font-size: 1rem;
  cursor: pointer;
}

.button:hover {
  background-color: rgb(65, 23, 94);
}
</style>
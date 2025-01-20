<template>
  <div class="cart">
    <div class="cart-items" v-if="store.cart.size > 0">
      <div class="cart-item" v-for="([key, value], index) in store.cart" :key="index">
        <img :src="`https://image.tmdb.org/t/p/w500${value.poster_path}`" class="movie-poster" alt="Movie Poster" />
        <h1 class="cart-title">{{ value.title }}</h1>
        <button class="remove-button" @click="handleRemoveFromCart(key)">Remove</button>
      </div>
      <button class="checkout-button" @click="handleCheckout">Checkout</button>
    </div>
    <p class="empty-cart" v-else>Your cart is empty.</p>
    <p v-if="message" class="checkout-message">{{ message }}</p>
  </div>
  <div class="logo-container">
      <img :src="logo" width="160" height="160" alt="Black Logo" />
    </div>
</template>

<script setup>
import { useStore } from '@/stores';
import { ref } from 'vue';
import logo from '@/assets/blacklogo.jpg';
const store = useStore();
const message = ref("");

function handleRemoveFromCart(movieId) {
  store.removeFromCart(movieId);
}

function handleCheckout() {
  const successMessage = store.checkout();
  if (successMessage) {
    message.value = successMessage;
    setTimeout(() => {
      message.value = ""; 
    }, 3000);
  }
}
</script>

<style scoped>
.cart {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  color: white;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  background-color: black;
  min-height: 100vh; 
}

.cart-items {
  width: 100%;
  max-width: 800px;
}

.cart-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #333;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 15px;
}

.movie-poster {
  width: 120px;
  height: 180px;
  border-radius: 8px;
}

.cart-title {
  flex-grow: 1;
  margin-left: 15px;
  color: white;
}

.remove-button,
.checkout-button {
  background-color: #571295;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.checkout-button {
  margin-top: 20px;
  padding: 12px 20px;
}

.remove-button:hover,
.checkout-button:hover {
  background-color: #7242d5;
}

.empty-cart {
  font-size: 3rem;
  margin-top: 20px;
  color: white;
  text-align: center;
}

.checkout-message {
  margin-top: 20px;
  color: white;
  font-size: 1.2rem;
}

.logo-container {
  position: absolute;
  top: 4px;
  left: 1100px;
  z-index: 10;
}
</style>

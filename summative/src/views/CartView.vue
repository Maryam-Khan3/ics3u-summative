<template>

  <div class="cart-container">
    <h1>Your Cart</h1>

    <div v-if="cartItems.length" class="cart-items">
      <div v-for="movie in cartItems" :key="movie.id" class="cart-item">
        <!-- Movie Poster -->
        <img
          :src="movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '/path/to/fallback-image.jpg'"
          alt="Movie Poster"
          class="movie-poster"
        />
        <p class="cart-title">{{ movie.title }}</p>
        <button @click="removeFromCart(movie.id)" class="remove-button">Remove</button>
      </div>
    </div>

    <div v-else>
      <p class="empty-cart">Your cart is empty</p>
    </div>
    <button @click="checkout" class="checkout-button" :disabled="!cartItems.length">
      Checkout
    </button>
  </div>
  <Footer />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useMainStore } from '@/stores';
import axios from 'axios';
import Footer from "../components/Footer.vue";

// Using the main store to manage the cart
const store = useMainStore();
const cartItems = computed(() => store.cartItems);  // Using the store's computed cartItems

// Remove item from cart


function removeFromCart(movieId) {
  console.log('Removing movie with ID:', movieId);
  store.removeFromCart(movieId);
}
console.log(cartItems.value);
// Handle Checkout
function checkout() {
  store.clearCart();  // Clear the cart in the store
  localStorage.removeItem('cart');  // Remove from localStorage
  // You might want to show a confirmation message or redirect the user
  alert("Thank you for your purchase!");
}
</script>

<style scoped>
  body {
    background-color: black;
    font-family: 'Trebuchet MS', Arial, sans-serif;
  }

  .cart-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    min-height: 100vh;
    color: white;
  }

  h1 {
    font-size: 2.5rem;
    margin-bottom: 20px;
  }

  .cart-items {
    display: flex;
    flex-direction: column;
    gap: 20px;
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
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
    transition: transform 0.2s ease;
  }

  .cart-item:hover {
    transform: scale(1.05);
  }

  .movie-poster {
    width: 120px;
    height: 180px;
    border-radius: 8px;
  }

  .cart-title {
    flex-grow: 1;
    font-size: 1.2rem;
    margin-left: 15px;
    color: white;
    font-family: 'Trebuchet MS', Arial, sans-serif;
  }

  .remove-button {
    background-color: #571295;
    color: white;
    padding: 8px 15px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    font-family: 'Trebuchet MS', Arial, sans-serif;
  }

  .remove-button:hover {
    background-color: rgb(47, 56, 120);
  }

  .empty-cart {
    font-size: 2.1rem;
    color: black;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  }
</style>

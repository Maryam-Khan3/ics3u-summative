<template>
  <Header />
  <div class="cart-container">
    <h1>Your Cart</h1>

    <div v-if="cartItems.length" class="cart-items">
      <div v-for="movie in cartItems" :key="movie.id" class="cart-item">
        <img
          :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
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
    <button @click="checkout" class="checkout-button">Checkout</button>
  </div>
  <Footer />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useMainStore } from '../../../ics3u/src/stores';
import axios from 'axios';
import Footer from "../components/Footer.vue";

// Store & Reactive Variables
const mainStore = useMainStore();
const cartItems = ref([]);

// Fetch Movie Details for Cart
async function fetchMovieDetails() {
  const apiKey = import.meta.env.VITE_API_KEY;
  const movieDetails = [];

  for (const movieId of mainStore.cart.keys()) {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`);
    movieDetails.push(response.data);
  }

  cartItems.value = movieDetails;
}

// Remove item from cart & local storage
function removeFromCart(movieId) {
  mainStore.removeFromCart(movieId);
  // Update local storage after removal
  localStorage.setItem('cart', JSON.stringify(Array.from(mainStore.cart.entries())));
}

// Handle Checkout
function checkout() {
  // Clear the cart in the store
  mainStore.cart.clear();
  // Clear local storage
  localStorage.removeItem('cart');
  // Show thank you message
  alert("Thank you for your purchase!");
  // Optionally redirect to another page like the home page
  // router.push('/');
}

onMounted(() => {
  fetchMovieDetails();
});
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
  
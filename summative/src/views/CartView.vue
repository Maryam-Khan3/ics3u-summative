<script setup>
import { useMainStore } from '@/stores';
const store = useStore();
</script>

<template>
    <div class="cart">
        <h1>Shopping Cart</h1>
        <div class="item" v-for="([key, value]) in store.cart">
            <img :src="`https://image.tmdb.org/t/p/w500${value.url}`" />
            <h1>{{ value.title }}</h1>
            <button @click="store.cart.delete(key)">Remove</button>
        </div>
    </div>
</template>



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

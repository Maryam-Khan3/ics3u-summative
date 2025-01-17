<template>
  <Header />
  <div class="cart-container">
    <h1>Your Cart</h1>

    <div class="cart-items" v-if="cartItems.length">
      <div v-for="([id, movie]) in cartItems" :key="id" class="cart-item">
        <img 
          :src="movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://via.placeholder.com/120x180'" 
          alt="Movie Poster" 
          class="movie-poster" 
        />
        <p class="cart-title">{{ movie.title }}</p>
        <button @click="removeFromCart(id)" class="remove-button">Remove</button>
      </div>
    </div>

    <div v-else>
      <p class="empty-cart">Your cart is empty</p>
    </div>

    <div v-if="cartItems.length">
      <button @click="checkout" class="checkout-button">Checkout</button>
    </div>
    <div v-if="isCheckoutComplete">
      <p class="thank-you-message">Thank you for your purchase!</p>
    </div>
  </div>
  <img :src="logo" class="logo-container" width="160" height="160" alt="Black Logo" />
  <Footer />

</template>

<script setup>
import { useStore } from '@/stores';
import { computed, ref } from 'vue';
import logo from '@/assets/blacklogo.jpg';


const store = useStore();
const isCheckoutComplete = ref(false);

const cartItems = computed(() => Array.from(store.cart.entries()));

const removeFromCart = (id) => {
  store.removeFromCart(id);
};

const checkout = () => {
  if (store.checkout()) { 
    isCheckoutComplete.value = true; 
  }
};
</script>


<style scoped>
.cart-container {
  padding: 20px;
  text-align: center;
}

.cart-items {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.cart-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #333;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
}

.movie-poster {
  width: 120px;
  height: 180px;
  border-radius: 8px;
}

.cart-title {
  flex-grow: 1;
  color: white;
  font-size: 1.2rem;
}

.remove-button {
  background-color: #571295;
  color: white;
  padding: 8px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.remove-button:hover {
  background-color: rgb(47, 56, 120);
}

.empty-cart {
  font-size: 1.5rem;
  margin-top: 20px;
  color: gray;
}

.checkout-button {
  background-color: #571295;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 20px;
}

.checkout-button:hover {
  background-color: rgb(47, 56, 120);
}

.thank-you-message {
  font-size: 1.5rem;
  margin-top: 20px;
  color: green;
}
</style>

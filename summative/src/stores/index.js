import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

// User Store
export const useUserStore = defineStore('userStore', () => {
  // Store only the Firebase user object
  const user = ref(null); // Initially null until user is authenticated

  // Set user information (Firebase user object)
  const setUserInfo = (firebaseUser) => {
    user.value = firebaseUser;
  };

  // Clear user information
  const clearUserInfo = () => {
    user.value = null;
  };

  // Get the user's full name (if displayName exists)
  const fullName = computed(() => {
    return user.value?.displayName || '';  // Just using displayName from Firebase
  });

  return {
    user,
    setUserInfo,
    clearUserInfo,
    fullName,
  };
});

// Main Store (e.g., for cart, movies, etc.)
export const useMainStore = defineStore('mainStore', () => {
  const cart = ref(new Map());

  // Add an item to the cart
  const addToCart = (id, movieData) => {
    cart.value.set(id, movieData);
  };

  // Remove an item from the cart
  const removeFromCart = (id) => {
    cart.value.delete(id);
  };

  // Get all cart items as an array
  const cartItems = computed(() => Array.from(cart.value.values()));

  return {
    cart,
    addToCart,
    removeFromCart,
    cartItems,
  };
});

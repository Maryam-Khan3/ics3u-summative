import { ref, watchEffect, onMounted } from "vue";
import { defineStore } from "pinia";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

export const useStore = defineStore('store', () => {
  const user = ref(null);
  const cart = ref(new Map());

  function saveCartToLocalStorage() {
    if (user.value && user.value.email) {
      localStorage.setItem(`cart_${user.value.email}`, JSON.stringify(Object.fromEntries(cart.value)));
    }
  }

  function loadCartFromLocalStorage() {
    if (user.value && user.value.email) {
      const storedCart = localStorage.getItem(`cart_${user.value.email}`);
      if (storedCart) {
        cart.value = new Map(Object.entries(JSON.parse(storedCart)));
      }
    }
  }

  function saveUserToLocalStorage() {
    if (user.value) {
      localStorage.setItem('user', JSON.stringify(user.value));
    }
  }

  function loadUserFromLocalStorage() {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      user.value = JSON.parse(storedUser);
    }
  }

  function addToCart(movieId, movieData) {
    cart.value.set(movieId, movieData);
    saveCartToLocalStorage();
  }

  function removeFromCart(movieId) {
    cart.value.delete(movieId);
    saveCartToLocalStorage();
  }

  function checkout() {
    if (cart.value.size === 0) {
      console.error("Cart is empty. Cannot proceed with checkout.");
      return false;
    }

    console.log("Checking out with items:", Array.from(cart.value.entries()));

    cart.value.clear();
    saveCartToLocalStorage();
    return true;
  }

  onMounted(() => {
    loadUserFromLocalStorage();
    loadCartFromLocalStorage();
  });

  watchEffect(() => {
    if (user.value) {
      saveUserToLocalStorage();
      saveCartToLocalStorage();
    }
  });

  return {
    user,
    cart,
    addToCart,
    removeFromCart,
    checkout, 
    saveCartToLocalStorage,
    loadCartFromLocalStorage,
  };
});

export const userAuthorized = new Promise((resolve, reject) => {
  onAuthStateChanged(auth, user => {
    const store = useStore();
    try {
      if (user) {
        store.user = user;
        saveUserToLocalStorage();
        loadCartFromLocalStorage();
      } else {
        user.value = null;
        cart.value = new Map();
        localStorage.removeItem('user');
      }
      resolve();
    } catch (error) {
      reject();
    }
  })
})
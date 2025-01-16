import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { auth } from '@/firebase'; 


export const useUserStore = defineStore('userStore', () => {
  const user = ref(null); 


  const setUserInfo = (firebaseUser) => {
    user.value = firebaseUser;
  };

 
  const clearUserInfo = () => {
    user.value = null;
  };

  const fullName = computed(() => {
    return user.value?.displayName || '';
  });

 
  const syncUserFromFirebase = () => {
    auth.onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        setUserInfo(firebaseUser); 
      }
    });
  };

  return {
    user,
    setUserInfo,
    clearUserInfo,
    fullName,
    syncUserFromFirebase,
  };
});


export const useMainStore = defineStore('mainStore', () => {
  const cart = ref(new Map(JSON.parse(localStorage.getItem('cart') || '[]'))); 

  const saveCartToLocalStorage = () => {
    localStorage.setItem('cart', JSON.stringify(Array.from(cart.value.entries())));
  };

 
  const addToCart = (id, movieData) => {
    cart.value.set(id, movieData);
    saveCartToLocalStorage(); 
  };


  const removeFromCart = (id) => {
    cart.value.delete(id);
    saveCartToLocalStorage(); 
  };

  const clearCart = () => {
    cart.value.clear();
    saveCartToLocalStorage(); 
  };

  const cartItems = computed(() => {
    return Array.from(cart.value.values());  
  });

  return {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    cartItems,
  };
});

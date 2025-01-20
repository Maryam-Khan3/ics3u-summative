import { ref, watch, onUnmounted } from "vue";
import { defineStore } from "pinia";
import { onAuthStateChanged, updateProfile, updatePassword } from "firebase/auth";
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

    return "Thank you for your purchase!";
  }
  async function updateUserProfile(firstName, lastName) {
    if (user.value) {
      try {
        user.value.firstName = firstName;
        user.value.lastName = lastName;
        saveUserToLocalStorage();

        const currentUser = auth.currentUser;

        if (currentUser) {
          await updateProfile(currentUser, {
            displayName: `${firstName} ${lastName}`,
          });
        } else {
          throw new Error("No current user found.");
        }
      } catch (error) {
        console.error("Error updating user profile:", error.message);
        throw new Error(`Failed to update profile: ${error.message}`);
      }
    } else {
      throw new Error("No user logged in.");
    }
  }

  async function updateUserPassword(newPassword) {
    if (auth.currentUser) {
      try {
        await updatePassword(auth.currentUser, newPassword);
      } catch (error) {
        console.error("Error updating password:", error.message);
        throw new Error(`Failed to update password: ${error.message}`);
      }
    } else {
      throw new Error("No user logged in.");
    }
  }

  loadUserFromLocalStorage();
  loadCartFromLocalStorage();

  const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
    if (firebaseUser) {
      user.value = firebaseUser;
      saveUserToLocalStorage();
      loadCartFromLocalStorage();
    } else {
      user.value = null;
      cart.value = new Map();
      localStorage.removeItem('user');
    }
  });

 

  watch(user, saveUserToLocalStorage);

  return {
    user,
    cart,
    addToCart,
    removeFromCart,
    checkout,
    updateUserProfile,
    updateUserPassword,
    saveCartToLocalStorage,
    loadCartFromLocalStorage,
  };
});

import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import axios from 'axios';


export const useUserStore = defineStore('userStore', () => {
  const user = ref({
    firstName: '',
    lastName: '',
    email: '',
  });

  const firstName = ref('');
  const lastName = ref('');
  const email = ref('');
  const password = ref('');
  const rePassword = ref('');

  const setUserInfo = (userInfo) => {
    user.value = userInfo;
  };

  const setRegistrationData = (data) => {
    firstName.value = data.firstName;
    lastName.value = data.lastName;
    email.value = data.email;
    password.value = data.password;
  };

  return {
    user,
    setUserInfo,
    firstName,
    lastName,
    email,
    password,
    rePassword,
    setRegistrationData,
  };
});


export const useMainStore = defineStore('main', () => {
  const cart = ref(new Map()); 
  const fetchMovieDetails = async () => {
    const apiKey = import.meta.env.VITE_API_KEY; 
    const movieIds = Array.from(cart.value.keys()); 
    
    for (const movieId of movieIds) {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`);
        const movieData = response.data;
        addToCart(movieData.id, movieData); 
      } catch (error) {
        console.error("Failed to fetch movie data:", error);
      }
    }
  };

  /**
 
   * @param {Number} id 
   * @param {Object} movieData 
   */
  const addToCart = (id, movieData) => {
    cart.value.set(id, movieData); 
  };

  /**
  
    @param {Number} id 
   */
  const removeFromCart = (id) => {
    console.log("Removing movie with ID:", id); 
    cart.value.delete(id); 
  };

  /**

    @returns {Array} 
   */
  const cartItems = computed(() => {
    return Array.from(cart.value.values()); 
  });

  return {
    cart,
    addToCart,
    removeFromCart,
    cartItems,
    fetchMovieDetails,
  };
});

export const useStore = defineStore('store', () => {
  const cart = ref(new Map());

  function addToCart(id, movieData) {
    cart.value.set(id, movieData);
  }

  function removeFromCart(id) {
    cart.value.delete(id);
  }

  return {
    cart,
    addToCart,
    removeFromCart,
  };
});
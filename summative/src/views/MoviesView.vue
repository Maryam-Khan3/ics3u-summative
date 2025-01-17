<template>
  <div>
    <h1>Welcome, {{ userStore.user ? userStore.user.displayName : 'Guest' }}!</h1>

    <h2>Now Playing</h2>
    <Genres 
      :genres="genresList" 
      :selected-genre="selectedGenre" 
      @update-genre="handleGenreChange" 
    />
    
    <div v-if="movies.length" class="movie-list">
      <div 
        v-for="movie in movies" 
        :key="movie.id" 
        class="movie-card" 
        @click="goToMovieDetails(movie.id)"
      >
        <img :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" alt="Movie Poster" class="movie-poster" />
        <p class="movie-title">{{ movie.title }}</p>
        <button 
          :class="['buy-button', userStore.cart.has(movie.id) ? 'added' : '']" 
          @click.stop="toggleCart(movie.id, movie)"
        >
          {{ userStore.cart.has(movie.id) ? 'Added' : 'Buy' }}
        </button>
      </div>
    </div>

    <Footer />
    <Header />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import Genres from '@/components/Genres.vue';
import { useRouter } from 'vue-router';
import Footer from '@/components/Footer.vue';
import Header from '@/components/Header.vue';
import { useStore } from '@/stores';

const userStore = useStore(); 
const genresList = [
  { id: 35, genreName: 'Comedy' },
  { id: 12, genreName: 'Adventure' },
  { id: 28, genreName: 'Action' },
  { id: 80, genreName: 'Crime' },
  { id: 14, genreName: 'Fantasy' },
];
const movies = ref([]);
const selectedGenre = ref(35);
const router = useRouter();

async function getMovies() {
  const apiKey = import.meta.env.VITE_API_KEY;
  const url = selectedGenre.value
    ? `https://api.themoviedb.org/3/discover/movie?with_genres=${selectedGenre.value}&api_key=${apiKey}`
    : `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}`;

  try {
    const response = await axios.get(url);
    movies.value = response.data.results; 
  } catch (error) {
    console.error("Error fetching movies:", error);
  }
}

function handleGenreChange(newGenre) {
  selectedGenre.value = newGenre;
  getMovies();
}

function toggleCart(movieId, movieData) {
  if (userStore.cart.has(movieId)) {
    userStore.removeFromCart(movieId);
  } else {
    userStore.addToCart(movieId, movieData);
  }
}

function goToMovieDetails(movieId) {
  router.push(`/detailsview/${movieId}`);
}

onMounted(() => {
  getMovies(); 
});
</script>

<style scoped>
body{
  background-color:black;
}
.buy-button {
  background-color: #571295;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.buy-button.added {
  background-color:rgb(47, 56, 120); 
  cursor: not-allowed;
}

.buy-button:hover {
  background-color: #6a1b9a; 
}

.movie-list {
  max-width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  padding: 0 10px;
  box-sizing: border-box;
  background-color:black;
}

.movie-card {
  background-color: #222;
  border-radius: 10px;
  overflow: hidden;
  transition: transform 0.2s;
  width: 200px;
}

.movie-card:hover {
  transform: scale(1.05);
}

.movie-poster {
  width: 100%;
  height: auto;
}

.movie-title {
  padding: 10px;
  text-align: center;
  font-size: 1.1rem;
  color: white;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
}

h1 {
  font-size: 2.5rem;
  color: white;
  text-align: center;
  padding-top: 40px;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  background-color: black;
}

h2{
  font-size: 2.1rem;
  color: white;
  text-align: center;
  padding-top: 70px;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  background-color: black;
}
</style>

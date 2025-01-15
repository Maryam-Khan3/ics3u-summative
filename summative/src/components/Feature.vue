<template>
    <div v-if="moviePosters.length" class="movies-container">
      <div v-for="(poster, index) in moviePosters" :key="index" class="movie-poster">
        <img :src="poster" alt="Movie Poster" />
      </div>
    </div>
    <div>
      <h1>Now Playing</h1>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  
  const moviePosters = ref([]);
  const movieIds = ref([]);
  
  const fetchNowPlayingMovies = async () => {
    const apiKey = import.meta.env.VITE_API_KEY;
    const apiUrl = 'https://api.themoviedb.org/3/movie/now_playing';
    const language = 'en-US';
    const page = 1;
  
    const response = await axios.get(apiUrl, {
      params: {
        api_key: apiKey,
        language: language,
        page: page,
      },
    });
  
    const posters = response.data.results
      .map((movie) => `https://image.tmdb.org/t/p/w500${movie.poster_path}`)
      .filter((path) => path !== 'https://image.tmdb.org/t/p/w500null');
    
    const randomNumbers = new Set();
    while (randomNumbers.size < 6) {
      randomNumbers.add(Math.floor(Math.random() * posters.length));
    }
  
   
    moviePosters.value = [...randomNumbers].map((index) => posters[index]);
    movieIds.value = [...randomNumbers].map((index) => response.data.results[index].id);
  };
  
  
  onMounted(() => {
    fetchNowPlayingMovies();
  });
  </script>
  
  <style scoped>
  .movies-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr); 
    gap: 60px;
    justify-content: center;
    padding: 20px;
  }
  
  .movie-poster {
    margin:10px;
    display: flex;
    justify-content: center;
  }
  
  img {
    width: 310px;
    height: 440px;
    object-fit: cover;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
  }
  
  img:hover {
    transform: scale(1.1);
  }
  
  h1 {
    position: absolute;
    top: 425px;
    color: white;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    font-size: 30px;
    left: 540px;
  }
  </style>
  
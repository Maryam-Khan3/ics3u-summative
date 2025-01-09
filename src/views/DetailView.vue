<template>
    <div v-if="movie" class="movie-detail">
      <h1 class="movie-title">{{ movie.original_title }}</h1>
      <p class="movie-overview">{{ movie.overview }}</p>
      <p class="movie-release-date">Release Date: {{ movie.release_date }}</p>
      <p class="movie-language">Language: {{ movie.original_language.toUpperCase() }}</p>
      <p class="movie-runtime">Runtime: {{ movie.runtime }} minutes</p>
      <a class="movie-site" :href="movie.homepage" target="_blank">Official Movie Site</a>
      <img :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" alt="Movie Poster" class="movie-poster" />
      <h2 class="trailers-title">Trailers</h2>
      <div class="trailers-container">
        <div v-for="trailer in movie.videos.results" :key="trailer.id" class="trailer-tile">
          <a :href="`https://www.youtube.com/watch?v=${trailer.key}`" target="_blank">
            <img :src="`https://img.youtube.com/vi/${trailer.key}/hqdefault.jpg`" alt="Trailer" class="trailer-thumbnail" />
          </a>
        </div>
      </div>
    </div>
    <div class="footer-container">
      <Footer />
    </div>
    <div class="header-container">
      <Header />
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import axios from 'axios';
  import Footer from '@/components/Footer.vue';
  import Header from '@/components/Header.vue';
  
  const route = useRoute();
  const movie = ref(null); 
    const fetchMovieDetails = async () => {
    const apiKey = import.meta.env.VITE_API_KEY; 
    const movieId = route.params.id;
    const apiUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&append_to_response=videos`;
  
    const response = await axios.get(apiUrl);
    movie.value = response.data; 
  };
  
  onMounted(() => {
    fetchMovieDetails();
  });
  </script>
  
  <style scoped>
  .movie-detail {
    padding: 20px;
    color: white;
    background-color: black; 
    display: flex;
    flex-direction: column;
    align-items: center; 
    justify-content: flex-start;
    text-align: center;
    margin-top: 0; 
  }
  
  .movie-title {
    font-size: 3rem; 
    font-weight: 700;
    margin-top: 10px; 
    margin-bottom: 15px; 
    color: #f4f4f4; 
  }
  
  .movie-overview {
    font-size: 1.2rem;
    margin-top:70px;
    line-height: 1.6; 
    color: white; 
    max-width: 700px; 
  
  }
  
  .movie-release-date {
    font-size: 1rem;
    margin-bottom: 15px;
    color: #bbb; 
  }
  
  .movie-site {
    display: inline-block;
    margin-bottom: 20px;
    padding: 12px 20px;
    background-color: #571295; 
    color: white;
    text-decoration: none;
    border-radius: 30px; 
    font-weight: 600; 
    text-transform: uppercase; 
    transition: background-color 0.3s ease, transform 0.3s ease;
  }
  
  .movie-site:hover {
    background-color: #571295; 
    transform: translateY(-3px); 
  }
  
  .movie-poster {
    width: 30%;
    margin-bottom: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5); 
    border-radius: 15px; 
    transition: transform 0.3s ease;
  }
  
  .movie-poster:hover {
    transform: scale(1.05); 
  }
  
  .trailers-title {
    font-size: 2.5rem;
    margin-top: 40px;
    margin-bottom: 25px;
    text-align: center;
    font-weight: 600;
    color: #f4f4f4; 
  }
  
  .trailers-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px; 
    margin-bottom: 40px; 
  }
  
  .trailer-tile {
    background-color: #222;
    overflow: hidden;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    width: 250px; 
    border-radius: 0; 
  }
  
  .trailer-tile:hover {
    transform: scale(1.05); 
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.6); 
  }
  
  .trailer-thumbnail {
    width: 100%; 
    height: auto; 
    border-bottom: 3px solid #571295; 
  }
  
  .movie-language,
  .movie-runtime {
    font-size: 1rem;
    margin-bottom: 15px;
    color: #bbb; 
  }
  
  
  ::v-deep(.nav-buttons) {
    display: flex;
    flex-direction: column; 
    align-items: center;   
    gap: 5px;              
    margin-left: 25px;  
  }
  
  ::v-deep(.nav-buttons .button) {
    font-size: 16px; 
    width: 180px;    
    text-align: center; 
    white-space: nowrap; 
  }
  </style>
  
<template>
    <div class="movie-gallery">
      <select :value="selectedGenre" @change="handleGenreChange">
        <option v-for="genre of genres" :value="genre.id" :key="genre.id">
          {{ genre.genreName }}
        </option>
      </select>
    </div>
  </template>
  
  <script setup>
  import { defineProps, defineEmits } from 'vue';
  
  
  const { genres, selectedGenre } = defineProps({
    genres: Array,
    selectedGenre: Number,
  });
  
  
  const emit = defineEmits();
  
  function handleGenreChange(event) {
    const newGenre = event.target.value;
    emit('update-genre', newGenre); 
  }
  </script>
  
  <style scoped>
.movie-gallery {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  color: white;
  background-color: black;
  padding: 20px;
}

select {
  background-color: #333;
  color: white;
  padding: 12px 20px;
  border: 2px solid #444;
  border-radius: 5px;
  font-size: 1rem;
  width: 200px;
  transition: border-color 0.3s;
}

select:focus {
  border-color: #571295;
  outline: none;
}
</style>

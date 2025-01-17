<script setup>
import Header from '@/components/Header.vue';
import Hero from '@/components/Hero.vue';
import NowPlayingMovies from '@/components/Feature.vue';  
import Footer from '@/components/Footer.vue';
const heroText = "Stream Our Movies,<br/>Whenever, Wherever";
</script>

<template>
  <div>
    <div class="hero">
      <Header />
      <Hero :text="heroText" />
    </div>
    <div class="movies-container">
      <NowPlayingMovies />
    </div>
    <Footer />
  </div>
</template>

<style scoped>
body {
  background-color: black;
  margin: 0;
  font-family: Arial, sans-serif;
}
.hero {
  background-color: rgb(0, 0, 0);
  background-size: cover;
  height: 480px; 
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow-x: hidden; 
  overflow-y: visible; 
  padding: 0 20px;
}

.hero-content {
  text-align: center;
  margin: 0;
}
.movies-container {
  background-color: black;
  padding: 15px;
  display: grid; 
  grid-template-columns: repeat(4, 1fr); 
  gap: 1px; 
  justify-content: center; 
}

.footer-container{
background-color: #1a1919;
}

::v-deep(.nav-buttons) {
  display: flex;
  flex-direction: column; 
  align-items: center;   
  gap: 5px;              
  margin-left: -600px;  
  margin-top:250px;
}

::v-deep(.nav-buttons .button) {
  font-size: 16px; 
  width: 180px;    
  text-align: center; 
  white-space: nowrap; 
}
</style>
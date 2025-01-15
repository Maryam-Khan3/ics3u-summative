<template>
    <div>
      <h2 v-html="text"></h2>
    <img :src="heroImage" class='heroimage'alt="Hero Image"width="665" height="365">
      </div>
      
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const props = defineProps({
  text: {
    type: String,
    required: true
  }
  });
  import heroImage from '@/assets/herosection.jpg';
  const heroImageRef = ref(heroImage);
  </script>
  
  <style scoped>
  h2 {
    position: absolute;
    top: 50%; 
    left: 25px; 
    transform: translateY(-50%); 
    color: white; 
    text-align: left; 
    z-index: 10; 
    margin-left: 20px;
    margin-top: -50px; 
    color: white;
      font-size: 35px;
      font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif
  }
  .heroimage{
  position:absolute;
    top:10px;
    left:350px;
  }
  
  </style>
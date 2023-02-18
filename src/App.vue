<script setup>
import NavBar from './components/NavBar.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <div>
    <div>
      <NavBar />
    </div>
    <RouterView class="main"/>
  </div>
</template>

<style>
@import "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css";
body {
  height: 100vh;
  background-color: rgb(35, 20, 104);
}

.main {
  height: 86vh;
  margin: 0em;
  overflow: auto;
}

</style>
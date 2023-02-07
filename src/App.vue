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

.main-container {
  display: flex;
  padding-top: 0.6em;
  align-items: stretch;
  min-height: 100%;
}
.container {
  margin: 0.6em;
  flex-grow: 1;
  background-color: #028ea7;
  border-radius: 5px;
  padding: 0.8em;
  padding-top: 0em;
  overflow: auto;
  min-width: 180px;
  text-align: center;
}

.container1 {
  margin: 0.6em;
  flex-grow: 1;
  background-color: #028ea7;
  border-radius: 5px;
  padding: 0.8em;
  padding-top: 0em;
  overflow: auto;
  min-width: 180px;
  text-align: center;
}
.container2 {
  margin: 0.6em;
  flex-grow: 1;
  background-color: #028ea7;
  border-radius: 5px;
  padding: 0.8em;
  padding-top: 0em;
  overflow: auto;
  max-width: 300px;
  min-width: 220px;
}
.container3 {
  margin: 0.6em;
  flex-grow: 3;
  background-color: #028ea7;
  border-radius: 5px;
  padding: 0.8em;
  padding-top: 0em;
  overflow: auto;
  max-width: 550px;
}

.card {
  background-color: #262b64;
  border-radius: 5px;
  padding: 0.6em;
  margin-bottom: 0.9em;
}

.link {
  background-color: #262b64;
  border-radius: 5px;
  padding: 0.6em;
  margin-bottom: 0.9em;
  outline: 2px auto -webkit-focus-ring-color;
}
.link1 {
  background-color: #262b64;
  border-radius: 5px;
  padding: 0.6em;
  margin-bottom: 0.9em;
  outline: 2px auto -webkit-focus-ring-color;
}
.link2 {
  background-color: #262b64;
  border-radius: 5px;
  padding: 0.6em;
  margin-bottom: 0.9em;
  outline: 2px auto -webkit-focus-ring-color;
}

@media (max-width: 1300px) {
  .main-container {
    flex-wrap: wrap;
  }
  .container2 {
    max-width: 1300px;
  }
  .container3 {
    max-width: 1300px;
  }
}


</style>
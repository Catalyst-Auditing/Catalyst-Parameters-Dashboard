<template>
  <nav class="navbar">
    <div class="navbar-links">
      <nuxt-link to="/" class="nav-link">Home</nuxt-link>
      <nuxt-link to="/parameters" class="nav-link">Parameters</nuxt-link>
      <nuxt-link v-if="user" to="/submitparameter" class="nav-link">Submit a Parameter Change</nuxt-link>
      <nuxt-link to="/contact" class="nav-link">Contact</nuxt-link>
    </div>
    <nuxt-link to="/account" class="user" v-if="user"> 
      <img
          v-if="user"
          :src="user.user_metadata.avatar_url"
          alt="Avatar"
          class="Avatar"
          :style="{ height: 2 + 'em', width: 2 + 'em' }"
      />
      <img
        v-else
        src='https://live.staticflickr.com/5204/5281085864_614284bbd0.jpg'
        alt="Avatar"
        class="Avatar"
        :style="{ height: 2 + 'em', width: 2 + 'em' }"
      />
      <p>
        {{ username }} 
      </p>  </nuxt-link>
    <div class="user" v-else> <button class="nav-link"> <Auth /> </button>  </div>
  </nav>
</template>

<script setup>
const user = useSupabaseUser()
const username = ref()
const picture = ref()
if (user) {
  username.value = user.value.user_metadata.full_name
  picture.value = user.value.user_metadata.avatar_url
  console.log(user.value)
}

</script>

<style scoped>
.navbar {
  position: sticky;
  top: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #101010;
  padding: 20px 0;
}

.navbar-links {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

button.nav-link {
  text-transform: none;
}
.Avatar {
  border-radius: 50%;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  margin: 0.7em;
}

.Avatar:hover {
  filter: brightness(1.2);
  transform: scale(1.2);
  border: 2px solid #65b5f6;
}

.nav-link {
  margin-left: 20px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  min-width: 150px; 
  max-width: 250px; 
  height: 30px; 
  padding: 10px 20px;
  text-decoration: none;
  color: white;
  border: 1px solid #333;
  border-radius: 5px;
  transition: background-color 0.3s ease, color 0.3s ease;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.nav-link:hover {
  background-color: #333;
  color: #f8f9fa;
}

.user {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
</style>


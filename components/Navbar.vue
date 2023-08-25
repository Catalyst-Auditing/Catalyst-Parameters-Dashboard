<template>
  <nav class="navbar">
    <div class="navbar-links">
      <nuxt-link to="/" class="nav-link">Home</nuxt-link>
      <nuxt-link to="/cps" class="nav-link">Parameters</nuxt-link>
      <nuxt-link v-if="signedIn" to="/submitparameter" class="nav-link">Submit a Parameter Change</nuxt-link>
      <nuxt-link to="/contact" class="nav-link">Contact</nuxt-link>
    </div>
    <nuxt-link to="/account" class="user" v-if="signedIn"> 
      <img
          v-if="signedIn"
          :src="picture"
          alt="Avatar"
          class="Avatar"
          :style="{ height: 2 + 'em', width: 2 + 'em' }"
      />
      <p class="username">
        {{ username }} 
      </p>  </nuxt-link>
      <Auth v-else/> 
  </nav>
</template>

<script setup>
const supabase = useSupabaseClient()
const user = useSupabaseUser()
const signedIn = ref(false)
const username = ref()
const picture = ref()

supabase.auth.onAuthStateChange(async (event, session) => {
  signedIn.value = event === 'SIGNED_IN'
  let sess = await supabase.auth.getSession()
  if (sess && sess.data && sess.data.session && sess.data.session.user) {
  username.value = sess.data.session.user.user_metadata.full_name
  picture.value = sess.data.session.user.user_metadata.avatar_url
  signedIn.value = true;
}
})

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
.username{
  margin-right: 20px;
}
</style>


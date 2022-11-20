<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '../supabase'
import { RouterLink, RouterView } from 'vue-router'

const loading = ref(true)
const full_name = ref('')
const website = ref('')
const avatar_url = ref('')
const src = ref('')

async function getProfile() {
    try {
      loading.value = true
      const { user } = session.value
        full_name.value = user.user_metadata.full_name
        avatar_url.value = user.user_metadata.avatar_url
    } catch (error) {
      alert(error.message)
    } finally {
      loading.value = false
    }
  }


const session = ref()

  onMounted(() => {
    supabase.auth.getSession().then(({ data }) => {
      session.value = data.session
      if (session.value) {
        getProfile()
        //downloadImage()
        console.log(data.session.user.user_metadata.full_name)
      }
    })

    supabase.auth.onAuthStateChange((_, _session) => {
      session.value = _session
    })
  })
</script>

<template>
  <div>
  <nav>
    <RouterLink class="is-pulled-left button m-3" to="/">Home</RouterLink>
    <RouterLink class="button m-3" to="/dashboard">Dashboard</RouterLink>
    <RouterLink to="/profile">
      <img
          v-if="session"
          :src="session.user.user_metadata.avatar_url"
          alt="Avatar"
          class="Avatar is-pulled-right m-4"
          :style="{ height: 2 + 'em', width: 2 + 'em' }"
        />
    </RouterLink>
        <p class="is-pulled-right mt-4 has-text-light" v-if="session"> {{ full_name }}</p>
        <p class="is-pulled-right m-4 has-text-light" v-else >Please sign in</p>
  </nav>
  </div>
</template>

<style>

.Avatar {
  border-radius: 50%;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
}

.Avatar:hover {
  filter: brightness(1.2);
  transform: scale(1.2);
  border: 2px solid #65b5f6;
}

nav {
  color: blue;
}
</style>
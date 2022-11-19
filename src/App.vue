<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { supabase } from './supabase'

const loading = ref(true)
const username = ref('')
const website = ref('')
const avatar_url = ref('')
const src = ref('')

async function getProfile() {
    try {
      loading.value = true
      const { user } = session.value

      let { data, error, status } = await supabase
        .from('profiles')
        .select(`username, website, avatar_url`)
        .eq('id', user.id)
        .single()

      if (error && status !== 406) throw error

      if (data) {
        username.value = data.username
        website.value = data.website
        avatar_url.value = data.avatar_url
      }
    } catch (error) {
      alert(error.message)
    } finally {
      loading.value = false
    }
  }

  const downloadImage = async () => {
    await getProfile()
    try {
      const { data, error } = await supabase.storage
        .from('avatars')
        .download(avatar_url.value)
      if (error) throw error
      src.value = URL.createObjectURL(data)
    } catch (error) {
      console.error('Error downloading image: ', error.message)
      src.value = 'https://xstifexxnerucprahwzg.supabase.co/storage/v1/object/public/testapi/defaultprofile.png'
    }
  }

const session = ref()

  onMounted(() => {
    supabase.auth.getSession().then(({ data }) => {
      session.value = data.session
      if (session.value) {
        getProfile()
        //downloadImage()
        console.log(data.session.user.user_metadata.avatar_url)
      }
    })

    supabase.auth.onAuthStateChange((_, _session) => {
      session.value = _session
    })
  })
</script>

<template>
  <div>
    <img
          v-if="session"
          :src="session.user.user_metadata.avatar_url"
          alt="Avatar"
          class="Avatar is-pulled-right m-4"
          :style="{ height: 2 + 'em', width: 2 + 'em' }"
        />
        <p class="is-pulled-right mt-4 has-text-light" v-if="session"> {{username}}</p>
        <p class="is-pulled-right m-4 has-text-light" v-else >Please sign in</p>
    <RouterLink class="is-pulled-left button m-3" to="/">Home</RouterLink>
    <RouterLink class="is-pulled-left button m-3" to="/dashboard">Dashboard</RouterLink>
    <RouterView></RouterView>
  </div>
</template>

<style>
@import "https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css";
@import "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css";
body {
  background-color: rgb(35, 20, 104);
  height: 100vh;
}
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
</style>
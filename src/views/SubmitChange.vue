<script setup>
import { onMounted, ref } from 'vue'
import { supabase } from '../supabase'
import { useStore } from '../store/index'
import Auth from '../components/Auth.vue'

const store = useStore()
const session = ref()

  onMounted(() => {
    supabase.auth.getSession().then(({ data }) => {
      session.value = data.session
    })

    supabase.auth.onAuthStateChange((_, _session) => {
      session.value = _session
    })
  })
</script>

<template>
  <div>
    <div v-if="session" :session="session">
        {{ store.name }}{{ store.number }}
        <button @click="store.changeName('Roberto')">Change name to Roberto</button>
        <button @click="store.changeNumber(2)">Change number to 2</button>
        <button @click="store.$reset">reset store</button>
    </div>
    <Auth v-else />
  </div>
</template>